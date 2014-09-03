var browserify = require('browserify');
var es6ify = require('es6ify');

es6ify.traceurOverrides = { blockBinding: true };

browserify()
  .add(es6ify.runtime)
  .transform(es6ify)
  .require(require.resolve('./demo/web.js'), { entry: true })
  .bundle()
  .pipe(process.stdout);
