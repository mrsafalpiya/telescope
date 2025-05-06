import { AbstractLogger } from "typeorm";
import { LogType } from "../watchers/TypeORMWatcher";
export default class TypeORMLogger extends AbstractLogger {
    constructor() {
        super(...arguments);
        this.logger = console;
    }
    logQuery(query, parameters, queryRunner) {
        this.logger.query(LogType.LOG, query, parameters);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.logger.query(LogType.QUERY_SLOW, query, parameters, time);
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.logger.query(LogType.QUERY_ERROR, query, parameters, error);
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, message, queryRunner) {
        // Do nothing
    }
}
