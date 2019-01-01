
const includeDefault = ["src/**/*"];
const excludeDefault = ["node_modules"];
const libsDefault = ["es6","dom"];
const compilerOptionsDefault = {
  target: "es6",
  module: "commonjs",
  outDir: "dist",
  sourceMap: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  isolatedModules: false
}
const tsConfigBuild = (options = compilerOptionsDefault) => {

  const compilerOptions = {
    ...options,
    compilerOptions: {
      ...options,
      lib: returnWithoutDuplicate(libsDefault, options.compilerOptions.lib || [])
    }
  }

  return {
    ...compilerOptions,
    include: returnWithoutDuplicate(includeDefault, options.include = []),
    exclude: returnWithoutDuplicate(excludeDefault, options.exclude = []),
    outDir: compilerOptions.outDir || 'dist',
    listEmittedFiles: true,
  }
}

const returnWithoutDuplicate = (array1, array2) => {
  return new Set(array1.concat(array2)).toJSON();
}

module.exports = tsConfigBuild;