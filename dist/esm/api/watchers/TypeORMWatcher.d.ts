import WatcherEntry, { WatcherEntryCollectionType } from "../WatcherEntry.js";
import Telescope from "../Telescope.js";
export declare enum LogType {
    LOG = "log",
    SCHEMA_BUILD = "schema-build",
    MIGRATION = "migration",
    INFO = "info",
    QUERY = "query",
    WARN = "warn",
    QUERY_SLOW = "query-slow",
    ERROR = "error",
    QUERY_ERROR = "query-error"
}
export interface TypeORMWatcherData {
    level: LogType;
    data: undefined;
}
export declare class TypeORMWatcherEntry extends WatcherEntry<TypeORMWatcherData> {
    constructor(data: TypeORMWatcherData, batchId?: string);
}
export default class TypeORMWatcher {
    static entryType: WatcherEntryCollectionType;
    private data;
    private batchId?;
    constructor(data: any, level: LogType, batchId?: string);
    static capture(telescope: Telescope): void;
    save(): Promise<void>;
}
