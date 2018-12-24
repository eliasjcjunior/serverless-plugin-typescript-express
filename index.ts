import * as path from "path";
import * as fs from "fs";
import chokidar from "chokidar";
import { Serverless, Options } from "./types";
const TypeScript = require("./typescript");
const tsConfigBuild = require("./tsBuildFile");
class ServerlessPluginTypescriptExpress {

    private inDirectory = 'src';
    private tsConfigName = 'tsconfig.json';
    private serverless: Serverless;
    private applicationPath: string;
    private files: Array<string>;

  constructor(serverless: Serverless, options: Options) {
    this.serverless = serverless;
    this.buildVariables();

    if (this.verifyCommands()) {
      this.watchFiles(this.files);
    }
    this.changeFunctions(this.tsConfig.outDir);
    this.runBuild(this.tsConfig);
  }

  buildVariables() {
    this.ts = new TypeScript();
    this.applicationPath = this.serverless.config.servicePath;
    this.files = this.listPaths(path.join(this.applicationPath, inDirectory));
    const tsConfigFile = JSON.parse(fs.readFileSync(path.join(this.applicationPath, tsConfigName), 'utf8'));
    this.tsConfig = tsConfigBuild(tsConfigFile);
  }

  watchFiles() {
    const watcher = chokidar.watch(this.files);
    this.serverless.cli.log('Serverless offline is running. Watching is enabled!');
    watcher.on('change', (file, stats) => {
      if (stats) {
        this.runBuild(this.tsConfig);
      }
    });
  }

  changeFunctions(pathOut) {
    const functions = this.serverless.service.functions;
    const newFunctions = {};
    Object.keys(functions).forEach(fn => {
      newFunctions[fn] = {
        ...functions[fn],
        handler: functions[fn].handler.replace(`${inDirectory}/`,`${pathOut}/`)
      }
    });
    this.serverless.service.functions = newFunctions;
  }

  verifyCommands() {
    const commands = this.serverless.cli.serverless.processedInput.commands;
    const test = commands.filter(cmd => cmd.indexOf('offline') >= 0);
    return test.length > 0 ? true : false;
  }

  async runBuild(options) {
    await this.ts.run(this.files, options);
  }

  listPaths(dir: string, filelist: Array<string> = []) {
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
  };
}

module.exports = ServerlessPluginTypescriptExpress;
