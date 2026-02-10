/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Two arguments required: source and destination');

    return;
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    console.error(error.message);
  }
}

main();
