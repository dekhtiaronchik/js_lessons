#!/usr/bin/env node

const fs = require("fs/promises");
const { lstatSync } = require("fs");
const path = require("path");
const yargs = require("yargs");
const inquirer = require("inquirer");
const readline = require("readline");

let currentDirectory = process.cwd();

const options = yargs
  .positional("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

class ListItem {
  constructor(fileName, path) {
    this.fileName = fileName;
    this.path = path;
  }
  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fs.readdir(currentDirectory);
  const listItems = list.map((fileName) => {
    return new ListItem(fileName, path.join(currentDirectory, fileName));
  });

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Choose ${currentDirectory}`,
        choices: listItems.map((item) => ({
          name: item.fileName,
          value: item,
        })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, "utf-8");
    if (!options.p) {
      console.log(data);
    } else {
      const regExp = new RegExp(options.p, "igm");
      if (!data.match(regExp)) {
        console.log("No match!");
      } else {
        console.log(data.match(regExp));
      }
    }
  }
};
run();
