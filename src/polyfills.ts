// Functions
if (!global || !global._babelPolyfill) {
  require("babel-polyfill");
}

// Language
if (!global.Intl) {
  global.Intl = require("intl");
  require("intl/locale-data/jsonp/nb.js");
}
