"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const TypeORMWatcher_1 = require("../watchers/TypeORMWatcher");
const Telescope_1 = require("../Telescope");
class TypeORMLogger extends typeorm_1.AbstractLogger {
    constructor(options = true) {
        console.log('TypeORMLogger');
        super(options);
        this.eventEmitter = Telescope_1.eventEmitter;
    }
    logQuery(query, parameters, queryRunner) {
        console.log('log query');
        this.eventEmitter.emit('query', TypeORMWatcher_1.LogType.LOG, query, parameters);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        console.log('log slow query');
        this.eventEmitter.emit('query', TypeORMWatcher_1.LogType.QUERY_SLOW, query, parameters, time);
    }
    logQueryError(error, query, parameters, queryRunner) {
        console.log('log query error');
        this.eventEmitter.emit('query', TypeORMWatcher_1.LogType.QUERY_ERROR, query, parameters, error);
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, message, queryRunner) {
        console.log('write log');
        // Do nothing
    }
}
exports.default = TypeORMLogger;
