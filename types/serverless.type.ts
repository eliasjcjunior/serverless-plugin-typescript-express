export interface Provider {
    state: string;
    region: string;
    variableSyntax: string;
    name: string;
    runtime: string;
    versionsFunctions: boolean;
    remoteFunctionData: any;
}

export interface Plugins {
    localPath: string;
    modules: []
}

export interface Functions {
    [key: string]: []
}

export interface PromiseTracker {
    promiseList: [],
    promiseMap: any;
    startTime: number;
}

export interface Service {
    serverless: Serverless;
    service: string;
    serviceObject: { name: string };
    provider: Provider;
    custom: any;
    plugins: Plugins
    pluginsData: any;
    functions: Functions;
    resources: any;
    package: any;
    app: any;
    tenant: any;
    layers: any;
}

export interface Options {
    stage: any;
    region: any;
}

export interface CommandsValues {
    usage: string;
    configDependent: boolean;
    commands: any;
    key: string;
    pluginName: string;
    lifecycleEvents: []
}

export interface Commands {
    [key: string]: CommandsValues;
}

export interface Hooks {
    [key: string]: [];
}

export interface DeprecatedEvents {
    [key: string]: string;
}

export interface PluginManager {
    serverless: Serverless;
    cliOptions: Options;
    cliCommands: Array<string>;
    plugins: [];
    commands: Commands;
    aliases: any;
    hooks: Hooks;
    deprecatedEvents: DeprecatedEvents;
}

export interface Variables {
    serverless: Serverless;
    service: Service;
    tracker: PromiseTracker;
    depp: [];
    deepRefSyntax: string;
    overwriteSyntax: string;
    fileRefSyntax: string;
    envRefSyntax: string;
    optRefSyntax: string;
    selfRefSyntax: string;
    stringRefSyntax: string;
    cfRefSyntax: string;
    s3RefSyntax: string;
    ssmRefSyntax: string;
}

export interface Config {
    serverless: Serverless;
    serverlessPath: string;
    interactive: boolean;
    servicePath: string;
}

export interface ProcessedInput {
    commands: Array<string>;
    options: Options;
}


export interface Serverless {
    providers: any;
    version: string;
    yamlParser: any;
    utils: any;
    service: Service;
    variables: Variables;
    pluginManager: PluginManager;
    config: Config;
    serverlessDirPath: string;
    invocationId: string;
    processedInput: ProcessedInput;
    cli: any;
}