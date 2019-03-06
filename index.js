'use strict';

const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const inDirectory = 'src';
const exec = require('child_process').exec;
const defaultOutDir = 'dist';

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (stderr) {
        return reject(stderr);
      }
      return resolve();
    })
  });
}

class ServerlessPluginTypescriptExpress {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.appPath = this.serverless.config.servicePath;
    this.tsConfigPath = `${this.appPath}\\tsconfig.json`;
    this.hooks = {
      'before:offline:start:init': this.startLocal.bind(this),
      'before:package:createDeploymentArtifacts': this.startDeploy.bind(this)
    }
  }

  async startLocal () {
    const files = this.listPaths(path.join(this.appPath, inDirectory));
    this.watchFiles(files);
    this.changeFunctions();
    await this.runBuild(this.tsConfigPath);
  }

  async startDeploy () {
    this.changeFunctions();
    await this.runBuild(this.tsConfigPath);
  }

  watchFiles (files) {
    const watcher = chokidar.watch(files);
    this.serverless.cli.log('Serverless offline is running. Watching is enabled!');
    watcher.on('change', async (file, stats) => {
      if (stats) {
        await this.runBuild(this.tsConfigPath);
      }
    });
  }

  loadOutDir () {
    const tsConfig = JSON.parse(fs.readFileSync(this.tsConfigPath, 'utf8'));
    const outDir = tsConfig.compilerOptions.outDir || defaultOutDir;
    return outDir.replace(/[^\w\s]/gi, '');
  }

  changeFunctions () {
    const functions = this.serverless.service.functions;
    const newFunctions = {};
    const outDir = this.loadOutDir();
    Object.keys(functions).forEach(fn => {
      newFunctions[fn] = {
        ...functions[fn],
        handler: functions[fn].handler.replace(`${inDirectory}/`,`${outDir}/`)
      }
    });
    this.serverless.service.functions = newFunctions;
  }

  async runBuild (tsConfigPath = '.') {
    this.serverless.cli.log('Compiling ...');
    const pathConfig = path.join('./node_modules', '/.bin', 'tsc');
    return execPromise(`${pathConfig} -pretty -p ${tsConfigPath}`);
  }

  listPaths (dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = this.listPaths(dir + '/' + file, filelist);
      }
      else {
        const filePath = path.join(dir, file);
        filelist.push(filePath);
      }
    });
    return filelist.filter(file => file.indexOf('.ts') >= 0);
  }
}

module.exports = ServerlessPluginTypescriptExpress;
