/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function ensureNode20Plus() {
  const major = Number(process.versions.node.split('.')[0]);

  if (!Number.isFinite(major) || major < 20) {
    fail(`Node.js >= 20 is required. Current: ${process.versions.node}`);
  }
}

function main() {
  ensureNode20Plus();

  const args = process.argv.slice(2);

  if (args.length !== 2) {
    fail('Exactly two arguments required: <source> <destination>');
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  let stat;

  try {
    stat = fs.statSync(sourcePath);
  } catch (e) {
    fail(`Source does not exist or is not accessible: ${sourcePath}`);
  }

  if (!stat.isFile()) {
    fail('Source must be a file');
  }

  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    fail(error.message);
  }
}

main();
