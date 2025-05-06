import DB from "../DB.js";
import WatcherEntry, { WatcherEntryCollectionType, WatcherEntryDataType } from "../WatcherEntry.js";
import { eventEmitter } from "../Telescope.js";
export var LogType;
(function (LogType) {
    LogType["LOG"] = "log";
    LogType["SCHEMA_BUILD"] = "schema-build";
    LogType["MIGRATION"] = "migration";
    LogType["INFO"] = "info";
    LogType["QUERY"] = "query";
    LogType["WARN"] = "warn";
    LogType["QUERY_SLOW"] = "query-slow";
    LogType["ERROR"] = "error";
    LogType["QUERY_ERROR"] = "query-error";
})(LogType || (LogType = {}));
export class TypeORMWatcherEntry extends WatcherEntry {
    constructor(data, batchId) {
        super(WatcherEntryDataType.queries, data, batchId);
    }
}
export default class TypeORMWatcher {
    constructor(data, level, batchId) {
        this.batchId = batchId;
        this.data = { level, data };
        console.log(this.data);
    }
    static capture(telescope) {
        console.log('capture called');
        eventEmitter.on('query', async (type, query, parameters, ...args) => {
            console.log('event caught');
            const watcher = new TypeORMWatcher({ query, parameters, args }, type, telescope.batchId);
            await watcher.save();
        });
    }
    async save() {
        console.log('save called');
        const entry = new TypeORMWatcherEntry(this.data, this.batchId);
        await DB.logs().save(entry);
    }
}
TypeORMWatcher.entryType = WatcherEntryCollectionType.log;
