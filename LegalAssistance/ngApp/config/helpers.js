var path = require('path');

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

const src = "./src";

function getDocPath(name) {
  return src + "/app/documents/" + name + "/main.ts";
}

exports.root = root;
exports.src = src;
exports.getDocPath = getDocPath;