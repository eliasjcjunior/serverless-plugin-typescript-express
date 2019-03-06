'use strict';

const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const inDirectory = 'src';
const exec = require('child_process').exec;

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
    this.hooks = {
      'before:offline:start:init': this.start.bind(this),
      'before:package:createDeploymentArtifacts': this.changeFunctions.bind(this)
    }
  }

  async start () {
    const appPath = this.serverless.config.servicePath;
    const files = this.listPaths(path.join(appPath, inDirectory));
    this.tsConfigPath = `${appPath}\\tsconfig.json`;
    this.watchFiles(files);
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

  changeFunctions () {
    const functions = this.serverless.service.functions;
    const newFunctions = {};
    Object.keys(functions).forEach(fn => {
      newFunctions[fn] = {
        ...functions[fn],
        handler: functions[fn].handler.replace(`${inDirectory}/`,'dist/')
      }
    });
    this.serverless.service.functions = newFunctions;
  }

  async runBuild (tsConfigPath = '.') {
    this.serverless.cli.log('Compiling ...');
    return execPromise(`tsc -pretty -p ${tsConfigPath}`);
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
