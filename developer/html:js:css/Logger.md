logger.js

```javascript
function Logger()
{
}

Logger.IS_DEBUG = true;
Logger.BASE_TAG = "Zeno";
Logger.LEVELS   = {
  VERBOSE: 1,
  DEBUG: 2,
  INFO: 3,
  WARNING: 4,
  ERROR: 5
};
Logger.LEVEL    = Logger.LEVELS.DEBUG;

/**
 * 设置是否为 Debug
 * @param {boolean} isDebug
 */
Logger.setDebug = function (isDebug)
{
  if (typeof isDebug == "boolean") {
    Logger.IS_DEBUG = isDebug;
  }
};


/**
 * @param {Logger.LEVELS} level
 * @param {object|string} content
 * @param {string} tag
 * @param {boolean} console
 */
Logger.alert = function (level, content, tag, console)
{
  if (level < Logger.LEVEL || !Logger.IS_DEBUG) {
    return;
  }

  var levelStr = null;
  switch (level) {
    case Logger.LEVELS.VERBOSE:
      levelStr = "V";
      break;
    case Logger.LEVELS.DEBUG:
      levelStr = "D";
      break;
    case Logger.LEVELS.INFO:
      levelStr = "I";
      break;
    case Logger.LEVELS.WARNING:
      levelStr = "W";
      break;
    case Logger.LEVELS.ERROR:
      levelStr = "E";
      break;
  }

  var subTag = tag == null ? "" : ("_" + tag);
  var t      = levelStr + "/" + Logger.BASE_TAG + subTag + "\r\n";
  t += "----------------------------------------\r\n";

  if (console) {
    switch (level) {
      case Logger.LEVELS.VERBOSE:
      case Logger.LEVELS.DEBUG:
        window.console.log(t + content);
        break;
      case Logger.LEVELS.INFO:
        window.console.info(t + content);
        break;
      case Logger.LEVELS.WARNING:
        window.console.warn(t + content);
        break;
      case Logger.LEVELS.ERROR:
        window.console.error(t + content);
        break;
    }
  } else {
    if (typeof content == "object") {
      content = JSON.stringify(content);
    }
    //noinspection JSDuplicatedDeclaration
    alert(t + content);
  }
};

Logger.v = function (content, tag)
{
  Logger.alert(Logger.LEVELS.VERBOSE, content, tag, false);
};

Logger.cv = function (content, tag)
{
  Logger.alert(Logger.LEVELS.VERBOSE, content, tag, true);
};

Logger.d = function (content, tag)
{
  Logger.alert(Logger.LEVELS.DEBUG, content, tag, false);
};

Logger.cd = function (content, tag)
{
  Logger.alert(Logger.LEVELS.DEBUG, content, tag, true);
};

Logger.i = function (content, tag)
{
  Logger.alert(Logger.LEVELS.INFO, content, tag, false);
};

Logger.ci = function (content, tag)
{
  Logger.alert(Logger.LEVELS.INFO, content, tag, true);
};

Logger.w = function (content, tag)
{
  Logger.alert(Logger.LEVELS.WARNING, content, tag, false);
};

Logger.cw = function (content, tag)
{
  Logger.alert(Logger.LEVELS.WARNING, content, tag, true);
};

Logger.e = function (content, tag)
{
  Logger.alert(Logger.LEVELS.ERROR, content, tag, false);
};

Logger.ce = function (content, tag)
{
  Logger.alert(Logger.LEVELS.ERROR, content, tag, true);
};```