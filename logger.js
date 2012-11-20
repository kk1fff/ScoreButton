function applyTag(tag, level, msg) {
  var prefix = level + "/" + tag + "/";
  return prefix + msg.replace('\n', '\n' + prefix);
}

exports = module.exports = function(tag, showDebug) {
  var logger = {};

  logger.l = function log(msg) {
    if (!showDebug) return;
    console.log(applyTag(tag, 'L', msg));
  };

  logger.w = function warn(msg) {
    if (!showDebug) return;
    console.log(applyTag(tag, 'W', msg));
  };

  logger.e = function error(msg) {
    console.log(applyTag(tag, 'E', msg));
  }

  return logger;
}
