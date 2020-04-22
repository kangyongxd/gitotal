const git = require('simple-git')
const chalk = require('chalk');
const glob = require('glob');

function getAllGitDir() {
  // 找到当前目录下一级 具有 .git 子文件夹的 目录
  let files = glob.sync('*/.git', { dot: true, ignore: 'node_modules' });
  files = files.map(file => file.split('/.git')[0])
  return files;
}

function getAllGit() {
  const files = getAllGitDir();

  if(!files.length) {
    console.log(chalk.blue(`当前目录下无 git 项目`));
    return;
  }

  console.log(files);
}

function getAllStatus() {
  const files = getAllGitDir();

  if(!files.length) {
    console.log(chalk.blue(`当前目录下无 git 项目`));
    return;
  }

  files.forEach(file => {
    git(file).status((err, log) => {
      console.log(chalk.blue(`--- about ${file} ---`));
      console.log();
      console.log(log);
      console.log();
    })
  })
}

function submitAll(origin, branch) {
  const files = getAllGitDir();

  if(!files.length) {
    console.log(chalk.blue(`当前目录下无 git 项目`));
    return;
  }

  console.log(chalk.blue(`total: ${files.length}`));
  console.log();
  files.forEach(file => {
    git(file)
      .add('./*')
      .commit(`feat: submit by gitotal`)
      .push(origin, branch, () => {
        console.log(chalk.blue(`commit and push success: ${file}`));
      })
  })
}

module.exports = {
  getAllGit,
  getAllStatus,
  submitAll,
}