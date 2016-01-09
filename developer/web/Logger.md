logger.js

```javascript
function Logger() {
}

Logger.IS_DEBUG = true;
Logger.BASE_TAG = "Zeno";
Logger.Levels = {
    VERBOSE: 1,
    DEBUG: 2,
    INFO: 3,
    WARNING: 4,
    ERROR: 5
};
Logger.level = Logger.Levels.DEBUG;

/**
 * 设置是否为 Debug
 * @param {boolean} isDebug
 */
Logger.setDebug = function (isDebug) {
    if (typeof isDebug == "boolean") {
        Logger.IS_DEBUG = isDebug;
    }
};

Logger.alert = function (level, content, tag) {
    if (level < Logger.level || !Logger.IS_DEBUG) {
        return;
    }

    var levelStr = null;
    switch (level) {
        case Logger.Levels.VERBOSE:
            levelStr = "V";
            break;
        case Logger.Levels.DEBUG:
            levelStr = "D";
            break;
        case Logger.Levels.INFO:
            levelStr = "I";
            break;
        case Logger.Levels.WARNING:
            levelStr = "W";
            break;
        case Logger.Levels.ERROR:
            levelStr = "E";
            break;
    }

    if (typeof content == "object") {
        content = JSON.stringify(content);
    }
    //noinspection JSDuplicatedDeclaration
    var subTag = tag == null ? "" : ("_" + tag);
    var t = levelStr + "/" + Logger.BASE_TAG + subTag + "\r\n";
    t += "----------------------------------------\r\n";
    alert(t + content);
};

Logger.v = function (content, tag) {
    Logger.alert(Logger.Levels.VERBOSE, content, tag);
};

Logger.d = function (content, tag) {
    Logger.alert(Logger.Levels.DEBUG, content, tag);
};

Logger.i = function (content, tag) {
    Logger.alert(Logger.Levels.INFO, content, tag);
};

Logger.w = function (content, tag) {
    Logger.alert(Logger.Levels.WARNING, content, tag);
};

Logger.e = function (content, tag) {
    Logger.alert(Logger.Levels.ERROR, content, tag);
};
```