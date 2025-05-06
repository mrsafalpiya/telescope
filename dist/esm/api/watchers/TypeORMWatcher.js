import DB from "../DB.js";
import WatcherEntry, { WatcherEntryCollectionType, WatcherEntryDataType } from "../WatcherEntry.js";
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
        this.data = {
            type: level,
            prefix: data[0],
            query: data[1]
        };
    }
    static capture(telescope) {
    }
    save() {
        const entry = new TypeORMWatcherEntry(this.data, this.batchId);
        DB.logs().save(entry);
    }
}
TypeORMWatcher.entryType = WatcherEntryCollectionType.log;
