#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function ensureNode20Plus() {
  const major = Number(String(process.versions.node).split('.')[0]);

  if (!Number.isFinite(major) || major < 20) {
    console.error('Node.js v20 or higher is required to run this CLI.');
    process.exit(1);
  }
}

function die(message) {
  console.error(message);
  process.exit(1);
}

function main() {
  ensureNode20Plus();

  const args = process.argv.slice(2);

  if (args.length !== 2) {
    die('Two arguments required: source and destination');
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  let sourceStat;

  try {
    sourceStat = fs.statSync(sourcePath);
  } catch {
    die('Source file does not exist');
  }

  if (!sourceStat.isFile()) {
    die('Source must be a file');
  }

  try {
    const destStat = fs.statSync(destinationPath);

    if (destStat.isDirectory()) {
      die('Destination must be a file');
    }
  } catch (e) {
    // if destination doesn't exist -> OK
    // other errors are rare; we treat them as fatal:
    if (e && e.code && e.code !== 'ENOENT') {
      die(e.message);
    }
  }

  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (e) {
    die(e && e.message ? e.message : 'Copy failed');
  }
}

main();
