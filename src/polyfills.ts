// Browsers
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

// Functions
// @ts-ignore
if (!global || !global._babelPolyfill) {
  require("babel-polyfill");
}
