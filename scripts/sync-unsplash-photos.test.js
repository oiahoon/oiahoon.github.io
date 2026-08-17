import assert from "node:assert/strict";
import test from "node:test";
import {
  buildImageUrl,
  cameraData,
  frontmatterFor,
  imageBase,
  parseArgs,
  summarizeExifCoverage,
  upsertCameraBlock,
} from "./sync-unsplash-photos.js";

const samplePhoto = {
  id: "abc_DEF-123",
  created_at: "2026-08-17T03:00:00Z",
  description: "Morning light in Shanghai",
  alt_description: "Sunlight falling across a quiet street",
  width: 6000,
  height: 4000,
  urls: {
    raw: "https://images.unsplash.com/photo-123?ixid=test-view-token",
  },
  links: {
    html: "https://unsplash.com/photos/morning-light-abc_DEF-123",
    download_location: "https://api.unsplash.com/photos/abc_DEF-123/download",
  },
  user: {
    name: "Joey Huang",
    username: "onice",
    links: { html: "https://unsplash.com/@onice" },
  },
  exif: {
    name: "Leica M11",
    iso: 200,
    aperture: "2.8",
    exposure_time: "1/250",
    focal_length: "35",
  },
};

test("buildImageUrl preserves attribution parameters and adds responsive defaults", () => {
  const value = buildImageUrl(samplePhoto.urls.raw);
  const url = new URL(value);

  assert.equal(url.searchParams.get("ixid"), "test-view-token");
  assert.equal(url.searchParams.get("auto"), "format");
  assert.equal(url.searchParams.get("fit"), "max");
  assert.equal(url.searchParams.get("w"), "1600");
  assert.equal(url.searchParams.get("q"), "80");
  assert.equal((value.match(/\?/g) || []).length, 1);
});

test("imageBase ignores transformations when matching existing photos", () => {
  assert.equal(
    imageBase(buildImageUrl(samplePhoto.urls.raw)),
    "https://images.unsplash.com/photo-123",
  );
});

test("frontmatter creates a draft with source metadata and dimensions", () => {
  const content = frontmatterFor(samplePhoto);

  assert.match(content, /draft: true/);
  assert.match(content, /width: 6000/);
  assert.match(content, /height: 4000/);
  assert.match(content, /ixid=test-view-token/);
  assert.match(content, /id: "abc_DEF-123"/);
  assert.match(content, /profileUrl: "https:\/\/unsplash\.com\/@onice"/);
  assert.match(content, /model: "Leica M11"/);
  assert.match(content, /settings: "ISO 200, f\/2\.8, 1\/250s, 35mm"/);
  assert.match(
    content,
    /Unsplash source: https:\/\/unsplash\.com\/photos\/morning-light-abc_DEF-123/,
  );
});

test("parseArgs supports dry-run and bounded imports", () => {
  assert.deepEqual(parseArgs(["--dry-run", "--limit=3"]), {
    auditExif: false,
    backfillExif: false,
    dryRun: true,
    help: false,
    limit: 3,
  });
  assert.throws(() => parseArgs(["--limit=0"]), /positive integer/);
});

test("cameraData formats detail endpoint EXIF values", () => {
  assert.deepEqual(cameraData(samplePhoto), {
    model: "Leica M11",
    settings: "ISO 200, f/2.8, 1/250s, 35mm",
  });
});

test("upsertCameraBlock preserves existing model and fills settings", () => {
  const source = `---\ntitle: Test\ncamera:\n  model: "Leica M11"\nlocation: Wetzlar\n---\n`;
  const updated = upsertCameraBlock(source, {
    model: "Leica Camera AG, Leica M11",
    settings: "ISO 200, f/2.8, 1/250s, 35mm",
  });

  assert.match(updated, /model: "Leica M11"/);
  assert.match(updated, /settings: "ISO 200, f\/2\.8, 1\/250s, 35mm"/);
  assert.match(updated, /location: Wetzlar/);
});

test("summarizeExifCoverage reports partial archive coverage", () => {
  assert.deepEqual(
    summarizeExifCoverage([
      { camera: { model: "Leica M11", settings: "ISO 200" } },
      { camera: { model: "Leica M11" } },
      { camera: {} },
    ]),
    {
      total: 3,
      withModel: 2,
      withLens: 0,
      withSettings: 1,
      missingModel: 1,
      modelCoverage: "66.7%",
      models: { "Leica M11": 2 },
    },
  );
});
