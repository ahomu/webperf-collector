var convert = require('convert-source-map');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

function readFileAsString(path) {
  return fs.readFileSync(path, {encoding: 'utf-8'});
}

glob('build/**/*.map', function (err, files) {

  files.forEach(function(mapFilePath) {

    var sourceMap = convert.fromJSON(readFileAsString(mapFilePath));
    var translatedJsPath = mapFilePath.replace('.map', '');
    var originalSrcPath = path.resolve(mapFilePath, '../' + sourceMap.getProperty('sources')[0]);

    if (!fs.existsSync(originalSrcPath)) {
      return;
    }

    sourceMap
        .setProperty('file', originalSrcPath)
        .setProperty('sourcesContent', [readFileAsString(originalSrcPath)]);

    var base64Map = '//# sourceMappingURL=data:application/json;base64,' + sourceMap.toBase64();
    var content = readFileAsString(mapFilePath.replace('.map', ''));

    fs.writeFileSync(translatedJsPath, content.replace(/\/\/# sourceMappingURL.*$/, base64Map));
    fs.unlinkSync(mapFilePath);
  });
});
