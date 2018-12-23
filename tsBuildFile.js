
const includeDefault = ["src/**/*"];
const excludeDefault = ["node_modules"];

const compilerOptionsDefault = {
  target: "es6",
  module: "commonjs",
  outDir: "dist",
  sourceMap: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  isolatedModules: false,
  lib: ["es6","dom"]
}
const tsConfigBuild = (options) => {
  let compilerOptions = compilerOptionsDefault;

  if (options.compilerOptions) {
    compilerOptions = {
      lib: returnWithoutDuplicate(compilerOptions.lib, options.compilerOptions.lib || []),
      ...compilerOptions,
      ...options.compilerOptions
    }
  }
  return {
    compilerOptions,
    include: returnWithoutDuplicate(includeDefault, options.include = []),
    exclude: returnWithoutDuplicate(excludeDefault, options.exclude = []),
    outDir: compilerOptions.outDir || 'dist'
  }
}

const returnWithoutDuplicate = (array1, array2) => {
  return new Set(array1.concat(array2)).toJSON();
}

module.exports = tsConfigBuild;