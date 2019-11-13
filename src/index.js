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
  console.log(files);
}

function getAllStatus() {
  const files = getAllGitDir();
  files.forEach(file => {
    git(file).status((err, log) => {
      console.log(chalk.blue(`--- about ${file} ---`));
      console.log();
      console.log(log.not_added);
      console.log();
    })
  })
}

function commitAll(message) {
  const files = getAllGitDir();
  console.log(chalk.blue(`total: ${files.length}`));
  console.log();
  files.forEach(file => {
    git(file)
      .add('./*')
      .commit(`feat: ${message} && commit by gitotal`)
      .push('kang', 'master', () => {
        console.log(chalk.blue(`commit and push success: ${file}`));
      })
  })
}

module.exports = {
  getAllGit,
  getAllStatus,
  commitAll,
}