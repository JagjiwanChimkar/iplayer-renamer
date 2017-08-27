#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const Confirm = require("prompt-confirm");
const fs = require("fs");
const meow = require("meow");
const path = require("path");
const { createNewFilenames } = require("./lib/iplayer-renamer");
const { promisify } = require("util");

const renameFileAsync = promisify(fs.rename);

// s/regexp/replacement/flags
const cli = meow(
  `
  Usage
    $ iplayer-renamer <files>
    $ iplayer-renamer --substitute foo/bar <files>

  Options
    --substitute, -s  Substitute string
    --help, -h  This help
    --version, -v  Version information

  Examples
    $ iplayer-renamer *
    $ iplayer-renamer test/*
    $ iplayer-renamer -s "Foo Bar/Foo - Bar" *
`,
  {
    alias: {
      h: "help",
      v: "version",
      s: "substitute",
    }
  }
);

function init() {
  if (cli.flags.substitute && /^[^\/]+\/[^\/]+$/.test(cli.flags.substitute) === false) {
    console.log("Invalid substitute option format");
    return;
  }

  const filePaths = cli.input.map(filePath => {
    return path.normalize(filePath);
  });

  if (filePaths.length === 0) {
    console.log("A list of files is required");
    return;
  }

  let files = createNewFilenames(filePaths).filter(Boolean);

  if (cli.flags.substitute) {
    const substituteParts = cli.flags.substitute.split(/\//);
    const oldString = substituteParts[0];
    const newString = substituteParts[1];

    files = files.map(file => {
      return {
        directory: file.directory,
        oldFilename: file.oldFilename,
        newFilename: file.newFilename.replace(oldString, newString)
      };
    });
  }

  prompt(files);
}

function prompt(files) {
  if (files.length === 0) {
    console.log(chalk.red("No valid iPlayer files found"));
    return;
  }

  for (const file of files) {
    const oldPath = path.join(file.directory, file.oldFilename);
    const newPath = path.join(file.directory, file.newFilename);

    console.log(chalk.red("- " + oldPath));
    console.log(chalk.green("+ " + newPath));
  }

  console.log();
  const prompt = new Confirm({
    message: "Rename files?",
    default: false
  });

  prompt.ask(function(answer) {
    if (answer === true) {
      renameFiles(files);
    }
  });
}

function renameFiles(files) {
  const renamePromises = files.map(file => {
    const oldPath = path.join(file.directory, file.oldFilename);
    const newPath = path.join(file.directory, file.newFilename);
    return renameFileAsync(oldPath, newPath);
  });

  Promise.all(renamePromises)
    .then(function() {
      console.log(
        chalk.green(
          `${files.length} ${files.length === 1 ? "file" : "files"} renamed`
        )
      );
    })
    .catch(function(err) {
      console.log(chalk.red("Error while renaming:", err));
    });
}

init();
