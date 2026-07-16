import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const docsReadme = path.join(root, 'docs/README.md');

function parseBuildOutput(output) {
  const normalizedOutput = output.replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, '');
  const match = normalizedOutput.match(/\[build\]\s+(\d+) page\(s\) built in ([0-9.]+(?:ms|s))/);
  if (!match) throw new Error('Could not parse build summary line from `npm run build` output.');
  return {
    pages: Number(match[1]),
    time: match[2],
  };
}

function parseDocsBaseline(docText) {
  const pagesMatch = docText.match(/\|\s*Pages Generated\s*\|\s*(\d+)\s*\|/i);
  const timeMatch = docText.match(/\|\s*Build Time\s*\|\s*([0-9.]+s)\s*\|/i);

  if (!pagesMatch || !timeMatch) {
    throw new Error('Could not find Build Time / Pages Generated rows in docs/README.md baseline table.');
  }

  return {
    pages: Number(pagesMatch[1]),
    time: timeMatch[1],
  };
}

function main() {
  console.log('Running build for baseline verification...');
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(command, ['run', 'build'], {
    cwd: root,
    encoding: 'utf8',
  });
  const output = [result.stdout, result.stderr].filter(Boolean).join('\n');

  if (result.error) throw result.error;
  if (result.status !== 0) {
    console.error(output);
    throw new Error(`Build failed with exit code ${result.status}.`);
  }

  const build = parseBuildOutput(output);
  const docs = parseDocsBaseline(fs.readFileSync(docsReadme, 'utf8'));

  const errors = [];
  if (build.pages !== docs.pages) {
    errors.push(`Pages mismatch: docs=${docs.pages}, build=${build.pages}`);
  }

  if (errors.length > 0) {
    console.error('Documentation baseline check failed:');
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`Baseline OK: ${build.pages} pages`);
  console.log(`Build time reference: docs=${docs.time}, current=${build.time}`);
}

main();
