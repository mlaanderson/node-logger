var Logger = require('./');

var logger = new Logger("syslog", "info", "testing", true);

logger.log("It works!!!");
