import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from "typeorm";
import { LoggerOptions } from "typeorm/logger/LoggerOptions";
export default class TypeORMLogger extends AbstractLogger {
    private eventEmitter;
    constructor(options?: LoggerOptions | undefined);
    logQuery(query: string, parameters?: any[], queryRunner?: any): void;
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: any): void;
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): void;
    /**
     * Write log to specific output.
     */
    writeLog(level: LogLevel, message: LogMessage | string | number | (LogMessage | string | number)[], queryRunner?: QueryRunner): void;
}
