"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const TypeORMWatcher_1 = require("../watchers/TypeORMWatcher");
class TypeORMLogger extends typeorm_1.AbstractLogger {
    constructor() {
        super(...arguments);
        this.logger = console;
    }
    logQuery(query, parameters, queryRunner) {
        this.logger.query(TypeORMWatcher_1.LogType.LOG, query, parameters);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.logger.query(TypeORMWatcher_1.LogType.QUERY_SLOW, query, parameters, time);
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.logger.query(TypeORMWatcher_1.LogType.QUERY_ERROR, query, parameters, error);
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, message, queryRunner) {
        // Do nothing
    }
}
exports.default = TypeORMLogger;
