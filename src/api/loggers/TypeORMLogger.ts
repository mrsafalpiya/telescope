import {AbstractLogger, LogLevel, LogMessage, QueryRunner} from "typeorm"
import {LogType} from "../watchers/TypeORMWatcher";
import {eventEmitter} from "../Telescope";
import EventEmitter from "node:events";


export default class TypeORMLogger extends AbstractLogger {

    private eventEmitter: EventEmitter;

    constructor() {
        console.log('TypeORMLogger');
        super();
        this.eventEmitter = eventEmitter
    }

    public logQuery(query: string, parameters?: any[], queryRunner?: any): void {
        console.log('log query');
        this.eventEmitter.emit('query', LogType.LOG, query, parameters);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: any): void {
        console.log('log slow query');
        this.eventEmitter.emit('query', LogType.QUERY_SLOW, query, parameters, time);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('log query error');
        this.eventEmitter.emit('query', LogType.QUERY_ERROR, query, parameters, error);
    }

    /**
     * Write log to specific output.
     */
    public writeLog(level: LogLevel, message: LogMessage | string | number | (LogMessage | string | number)[], queryRunner?: QueryRunner) {
        console.log('write log');
        // Do nothing
    }
}