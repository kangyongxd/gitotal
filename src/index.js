const git = require('simple-git')
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const glob = require('glob');

const curDir = process.cwd();

function getAllGitDir() {
  // 找到当前目录下一级 具有 .git 子文件夹的 目录
  let files = glob.sync('*/.git', { dot: true, ignore: 'node_modules' });
  files = files.map(file => file.split('/.git')[0])
  return files;
}

function loopAllGit(cb) {
  const files = getAllGitDir();
  files.forEach(file => {
    cb(file);
  })
}

function getAllGit() {
  const files = getAllGitDir();
  console.log(files);
}

function getAllStatus() {
  loopAllGit(file => {
    git(file).status((err, log) => {
      console.log(chalk.blue(`--- about ${file} ---`));
      console.log();
      console.log(log.not_added);
      console.log();
    })
  })
}

function commitAll(message) {
  loopAllGit(file => {
    git(file)
      .add('./*')
      .commit(`${message}-commit by gitotal`)
      .push('kang', 'master', () => {
        console.log(`${file} commit and push success`);
      })
  })
}

module.exports = {
  getAllGit,
  getAllStatus,
  commitAll,
}