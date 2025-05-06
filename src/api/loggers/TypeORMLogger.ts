import {AbstractLogger, LogLevel, LogMessage, QueryRunner} from "typeorm"
import {LogType} from "../watchers/TypeORMWatcher";


export default class TypeORMLogger extends AbstractLogger {
    protected logger: any = console;

    public logQuery(query: string, parameters?: any[], queryRunner?: any): void {
        this.logger.query(LogType.LOG, query, parameters);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: any): void {
        this.logger.query(LogType.QUERY_SLOW, query, parameters, time);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.query(LogType.QUERY_ERROR, query, parameters, error);
    }

    /**
     * Write log to specific output.
     */
    public writeLog(level: LogLevel, message: LogMessage | string | number | (LogMessage | string | number)[], queryRunner?: QueryRunner) {
        // Do nothing
    }
}