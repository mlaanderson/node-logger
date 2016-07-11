const util = require("util");
const child_process = require("child_process");


class Logger {
    constructor(facility, priority, tag, echo) {
        this._facility = facility ? facility.toString() : "syslog";
        this._priority = priority ? priority.toString() : "info";
        this._tag = tag ? tag.toString() : null;
        this._echo = echo || false;
        
        try {
            this._logger = child_process.execSync('which logger').toString().replace(/[\r\n]*/g, '');
        } catch(err) {
            throw "ERROR: Cannot find logger binary";
        }
    }
    
    log() {
        var message;
        var args = Array.from(arguments);
        for (var n = 0; n < args.length; n++) {
            if (util.isPrimitive(args[n]) == false) {
                args[n] = JSON.stringify(args[n]);
            }
        }
        message = args.join(" ");
        
        child_process.exec(this._logger + " -p " +
            this._facility + "." + this._priority + " " +
            (this._tag != null ? "-t " + this._tag + " " : "") +
            message
        );
        if (this._echo == true) {
            console.log(this._facility + "." + this._priority + 
            (this._tag != null ? " " + this._tag : "") + ": " +
            message
            );
        }
    }
}

module.exports = Logger;