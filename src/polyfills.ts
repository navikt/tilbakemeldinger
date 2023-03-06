import "core-js";

// Language
if (!global.Intl) {
    global.Intl = require("intl");
    require("intl/locale-data/jsonp/nb.js");
}