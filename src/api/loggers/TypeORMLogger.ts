import {AbstractLogger, LogLevel, LogMessage, QueryRunner} from "typeorm"
import {LogType} from "../watchers/TypeORMWatcher";
import {eventEmitter} from "../Telescope";
import EventEmitter from "node:events";
import {LoggerOptions} from "typeorm/logger/LoggerOptions";


export default class TypeORMLogger extends AbstractLogger {

    private eventEmitter: EventEmitter;

    constructor(options: LoggerOptions | undefined = true) {
        super(options);
        this.eventEmitter = eventEmitter
    }

    public logQuery(query: string, parameters?: any[], queryRunner?: any): void {
        this.eventEmitter.emit('query', LogType.LOG, query, parameters);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: any): void {
        this.eventEmitter.emit('query', LogType.QUERY_SLOW, query, parameters, time);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.eventEmitter.emit('query', LogType.QUERY_ERROR, query, parameters, error);
    }

    /**
     * Write log to specific output.
     */
    public writeLog(level: LogLevel, message: LogMessage | string | number | (LogMessage | string | number)[], queryRunner?: QueryRunner) {
        // Do nothing since they are saving to the database
    }
}