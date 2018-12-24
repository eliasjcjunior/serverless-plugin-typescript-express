# Serverless Plugin Typescrict Express

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


## Features

   * Integrates with serverless-offline
   * It's not necessary complementary configuration

## Instalation and use

```sh
yarn add --dev serverless-plugin-typescript-express
```
or
```
npm install --save-dev serverless-plugin-typescript-express
```

Add the following plugin to your `serverless.yml`:

```yaml
plugins:
  - 'serverless-plugin-typescript-express'
```

### `tsconfig.json`

The default `tsconfig.json` file used by the plugin looks like this:

```json
{
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "outDir": "dist",
      "sourceMap": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "isolatedModules": false,      
      "lib": [ 
        "es6", 
        "dom" 
      ]
    },
    "include": [
      "src/**/*"
    ],
    "exclude": [
      "node_modules"
    ]
  } 
```

### The input folder src cannot be overwritten
License
----
MIT

   [serverless-plugin-typescript]: https://github.com/hewmen/serverless-plugin-typescript
