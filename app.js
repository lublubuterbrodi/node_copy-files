#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const { copyFileCli } = require('./src/app');

function ensureNode20Plus() {
  const major = Number(String(process.versions.node).split('.')[0]);

  if (!Number.isFinite(major) || major < 20) {
    console.error('Node.js v20 or higher is required to run this CLI.');
    process.exit(1);
  }
}

function main() {
  ensureNode20Plus();

  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Two arguments required: source and destination');
    process.exit(1);
  }

  const [source, destination] = args;

  try {
    copyFileCli(source, destination);
  } catch (error) {
    console.error(error && error.message ? error.message : String(error));
    process.exit(1);
  }
}

main();
