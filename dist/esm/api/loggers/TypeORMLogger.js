import { AbstractLogger } from "typeorm";
import { LogType } from "../watchers/TypeORMWatcher";
import { eventEmitter } from "../Telescope";
export default class TypeORMLogger extends AbstractLogger {
    constructor() {
        console.log('TypeORMLogger');
        super();
        this.eventEmitter = eventEmitter;
    }
    logQuery(query, parameters, queryRunner) {
        console.log('log query');
        this.eventEmitter.emit('query', LogType.LOG, query, parameters);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        console.log('log slow query');
        this.eventEmitter.emit('query', LogType.QUERY_SLOW, query, parameters, time);
    }
    logQueryError(error, query, parameters, queryRunner) {
        console.log('log query error');
        this.eventEmitter.emit('query', LogType.QUERY_ERROR, query, parameters, error);
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, message, queryRunner) {
        console.log('write log');
        // Do nothing
    }
}
