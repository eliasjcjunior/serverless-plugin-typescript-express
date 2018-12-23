const ts = require('typescript');

module.exports = class Typescript {

    async run(files, options = tsConfigDefault()) {
        options.listEmittedFiles = true;
        const program = ts.createProgram(files, options);

        const emitResult = program.emit()
  
        const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
      
        allDiagnostics.forEach(diagnostic => {
          if (!diagnostic.file) {
            console.log(diagnostic)
          }
          const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
          const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
          console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
        })
      
        if (emitResult.emitSkipped) {
          throw new Error('Typescript compilation failed')
        }
      
        return emitResult.emittedFiles.filter(filename => filename.endsWith('.js'))
    }

}