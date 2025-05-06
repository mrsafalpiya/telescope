import { AbstractLogger } from "typeorm";
import { LogType } from "../watchers/TypeORMWatcher";
import { eventEmitter } from "../Telescope";
export default class TypeORMLogger extends AbstractLogger {
    constructor(options = true) {
        super(options);
        this.eventEmitter = eventEmitter;
    }
    logQuery(query, parameters, queryRunner) {
        this.eventEmitter.emit('query', LogType.LOG, query, parameters);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.eventEmitter.emit('query', LogType.QUERY_SLOW, query, parameters, time);
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.eventEmitter.emit('query', LogType.QUERY_ERROR, query, parameters, error);
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, message, queryRunner) {
        // Do nothing since they are saving to the database
    }
}
