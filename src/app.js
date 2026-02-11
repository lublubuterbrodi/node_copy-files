/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function copyFileCli(source, destination) {
  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  let sourceStat;

  try {
    sourceStat = fs.statSync(sourcePath);
  } catch (e) {
    throw new Error('Source file does not exist');
  }

  if (!sourceStat.isFile()) {
    throw new Error('Source must be a file');
  }

  try {
    const destStat = fs.statSync(destinationPath);

    if (destStat.isDirectory()) {
      throw new Error('Destination must be a file');
    }
  } catch (e) {
    if (e && e.message === 'Destination must be a file') {
      throw e;
    }
  }

  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    throw new Error(error && error.message ? error.message : 'Copy failed');
  }
}

module.exports = { copyFileCli };
