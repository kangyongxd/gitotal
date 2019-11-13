#!/usr/bin/env node
const commander = require('commander');
const pkg = require('../package.json');
const { getAllGit, getAllStatus, submitAll } = require('../src');

commander.version(pkg.version);

commander
  .command('ls')
  .description('list all the git program under current directory')
  .action(() => {
    getAllGit()
  })

commander
  .command('status')
  .description('list all the git program under current directory')
  .action(() => {
    getAllStatus()
  })

commander
  .command('submit <origin> <branch>')
  .description('list all the git program under current directory')
  .action((origin, branch) => {
    submitAll(origin, branch)
  })
commander.parse(process.argv);