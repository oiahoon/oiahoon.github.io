import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const postsDir = path.join(root, "src/content/posts");

const API_BASE = "https://api.unsplash.com";
const DEFAULT_USERNAME = "onice";
const PER_PAGE = 30;
const TAGS = ["摄影", "Unsplash"];

function parseArgs(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  const limitArg = argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.slice("--limit=".length)) : Infinity;

  if (!Number.isFinite(limit) && limit !== Infinity) {
    throw new Error("`--limit` must be a positive integer.");
  }
  if (limit !== Infinity && (!Number.isInteger(limit) || limit < 1)) {
    throw new Error("`--limit` must be a positive integer.");
  }

  return {
    dryRun: args.has("--dry-run"),
    help: args.has("--help") || args.has("-h"),
    limit,
  };
}

function printHelp() {
  console.log(`Sync new photographs from an Unsplash profile into Astro content.

Usage:
  npm run photos:unsplash:sync -- --dry-run
  npm run photos:unsplash:sync
  npm run photos:unsplash:sync -- --limit=5

Environment:
  UNSPLASH_ACCESS_KEY  Required Unsplash API access key
  UNSPLASH_USERNAME    Optional profile username (default: ${DEFAULT_USERNAME})

The command is manual and incremental. It never deletes or overwrites existing posts.`);
}

function normalizeText(value) {
  const text = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text || ["null", "undefined", "untitled"].includes(text.toLowerCase()))
    return "";
  return text;
}

function withPeriod(value) {
  const text = normalizeText(value);
  if (!text) return "";
  return /[.!?。！？]$/.test(text) ? text : `${text}.`;
}

function titleize(value) {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

function imageBase(src) {
  try {
    const url = new URL(String(src || ""));
    if (url.hostname !== "images.unsplash.com") return "";
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

function buildImageUrl(rawUrl, width = 1600) {
  const url = new URL(rawUrl);
  if (url.hostname !== "images.unsplash.com") {
    throw new Error(`Unexpected Unsplash image host: ${url.hostname}`);
  }

  // Preserve API-provided parameters such as ixid so image views remain attributable.
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", "80");
  return url.toString();
}

function titleFromPhoto(photo) {
  const description =
    normalizeText(photo.description) || normalizeText(photo.alt_description);
  return description || titleize(photo.id);
}

function locationFromPhoto(photo) {
  const location = photo.location || {};
  const namedLocation = normalizeText(location.name);
  if (namedLocation) return namedLocation;

  const parts = [location.city, location.country]
    .map(normalizeText)
    .filter(Boolean);
  if (parts.length > 0) return [...new Set(parts)].join(", ");
  return "Unsplash Archive";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

function yamlString(value) {
  return JSON.stringify(String(value || ""));
}

function yamlBlockUrl(value) {
  return `>-\n      ${value}`;
}

function cameraBlock(photo) {
  const exif = photo.exif || {};
  const model =
    normalizeText(exif.name) ||
    [exif.make, exif.model].map(normalizeText).filter(Boolean).join(", ");
  const settings = [
    exif.iso ? `ISO ${exif.iso}` : "",
    exif.aperture ? `f/${exif.aperture}` : "",
    exif.exposure_time ? `${exif.exposure_time}s` : "",
    exif.focal_length ? `${exif.focal_length}mm` : "",
  ].filter(Boolean);

  if (!model && settings.length === 0) return "";
  return (
    [
      "camera:",
      model ? `  model: ${yamlString(model)}` : "",
      settings.length > 0
        ? `  settings: ${yamlString(settings.join(", "))}`
        : "",
    ]
      .filter(Boolean)
      .join("\n") + "\n"
  );
}

function frontmatterFor(photo) {
  const date = new Date(photo.created_at);
  const title = titleFromPhoto(photo);
  const sourceText =
    normalizeText(photo.description) ||
    normalizeText(photo.alt_description) ||
    title;
  const caption = withPeriod(sourceText);
  const alt = normalizeText(photo.alt_description) || sourceText || title;
  const location = locationFromPhoto(photo);
  const imageUrl = buildImageUrl(photo.urls?.raw);
  const photoUrl =
    photo.links?.html || `https://unsplash.com/photos/${photo.id}`;
  const profileUrl =
    photo.user?.links?.html ||
    `https://unsplash.com/@${photo.user?.username || DEFAULT_USERNAME}`;
  const photographer = normalizeText(photo.user?.name) || "Joey Huang";

  return `---
title: ${yamlString(title)}
subtitle: ${yamlString(sourceText)}
author: Joey
date: ${date.toISOString()}
tags:
${TAGS.map((tag) => `  - ${tag}`).join("\n")}
lang: zh
type: photography
gallery:
  - src: ${yamlBlockUrl(imageUrl)}
    alt: ${yamlString(alt)}
    caption: ${yamlString(caption)}
    width: ${Number(photo.width) || 0}
    height: ${Number(photo.height) || 0}
${cameraBlock(photo)}location: ${yamlString(location)}
publishedDate: ${yamlString(formatDate(date))}
unsplash:
  id: ${yamlString(photo.id)}
  photoUrl: ${yamlString(photoUrl)}
  profileUrl: ${yamlString(profileUrl)}
  photographer: ${yamlString(photographer)}
draft: true
description: ${yamlString(caption)}
---

<!-- Unsplash source: ${photoUrl} -->
`;
}

function existingUnsplashImageBases() {
  const bases = new Set();
  const files = fs.readdirSync(postsDir).filter((file) => /\.mdx?$/.test(file));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(raw);
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    for (const item of gallery) {
      const base = imageBase(item?.src);
      if (base) bases.add(base);
    }
  }

  return bases;
}

async function apiRequest(pathname, accessKey) {
  const response = await fetch(`${API_BASE}${pathname}`, {
    headers: {
      Accept: "application/json",
      "Accept-Version": "v1",
      Authorization: `Client-ID ${accessKey}`,
      "User-Agent": "joeys-notes-unsplash-sync/2.0",
    },
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    throw new Error(
      `Unsplash API request failed: ${response.status} ${response.statusText}` +
        (remaining ? ` (remaining: ${remaining})` : ""),
    );
  }

  return response;
}

async function fetchProfilePhotos(username, accessKey) {
  const photos = [];
  let page = 1;

  while (true) {
    const query = new URLSearchParams({
      page: String(page),
      per_page: String(PER_PAGE),
      order_by: "latest",
    });
    const response = await apiRequest(
      `/users/${encodeURIComponent(username)}/photos?${query}`,
      accessKey,
    );
    const batch = await response.json();

    if (!Array.isArray(batch) || batch.length === 0) break;
    photos.push(...batch);
    if (batch.length < PER_PAGE) break;
    page += 1;
  }

  return photos;
}

async function fetchPhotoDetails(photoId, accessKey) {
  const response = await apiRequest(
    `/photos/${encodeURIComponent(photoId)}`,
    accessKey,
  );
  return response.json();
}

async function triggerDownload(photo, accessKey) {
  if (!photo.links?.download_location) return false;
  const downloadUrl = new URL(photo.links.download_location);
  if (downloadUrl.origin !== API_BASE) {
    throw new Error(`Unexpected Unsplash download host: ${downloadUrl.origin}`);
  }
  await apiRequest(`${downloadUrl.pathname}${downloadUrl.search}`, accessKey);
  return true;
}

async function main() {
  const options = parseArgs();
  if (options.help) {
    printHelp();
    return;
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  const username = process.env.UNSPLASH_USERNAME?.trim() || DEFAULT_USERNAME;
  if (!accessKey) {
    throw new Error(
      "UNSPLASH_ACCESS_KEY is required. Add it to `.env` before syncing.",
    );
  }

  const existingBases = existingUnsplashImageBases();
  const profilePhotos = await fetchProfilePhotos(username, accessKey);
  const validPhotos = profilePhotos.filter((photo) =>
    imageBase(photo.urls?.raw),
  );
  const allMissingPhotos = validPhotos.filter(
    (photo) => !existingBases.has(imageBase(photo.urls?.raw)),
  );
  const missingPhotos = allMissingPhotos.slice(0, options.limit);
  const created = [];
  let downloadEvents = 0;

  for (const photo of missingPhotos) {
    const date = new Date(photo.created_at);
    const target = path.join(
      postsDir,
      `${ymd(date)}-photography-${photo.id}.md`,
    );
    if (fs.existsSync(target)) continue;

    if (options.dryRun) {
      created.push(`${path.relative(root, target)} (dry-run)`);
      continue;
    }

    const detailedPhoto = await fetchPhotoDetails(photo.id, accessKey);
    if (await triggerDownload(detailedPhoto, accessKey)) downloadEvents += 1;
    fs.writeFileSync(target, frontmatterFor(detailedPhoto), {
      encoding: "utf8",
      flag: "wx",
    });
    created.push(path.relative(root, target));
  }

  console.log(
    JSON.stringify(
      {
        source: `https://unsplash.com/@${username}`,
        mode: options.dryRun ? "dry-run" : "write",
        fetched: profilePhotos.length,
        existing: validPhotos.length - allMissingPhotos.length,
        invalid: profilePhotos.length - validPhotos.length,
        pending: allMissingPhotos.length,
        created: created.length,
        downloadEvents,
        files: created,
      },
      null,
      2,
    ),
  );
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

export { buildImageUrl, frontmatterFor, imageBase, parseArgs };
