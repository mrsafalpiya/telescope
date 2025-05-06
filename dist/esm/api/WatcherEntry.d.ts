import { RequestWatcherData } from "./watchers/RequestWatcher.js";
import { ErrorWatcherData } from "./watchers/ErrorWatcher.js";
import { DumpWatcherData } from "./watchers/DumpWatcher.js";
import { LogWatcherData } from "./watchers/LogWatcher.js";
import { ClientRequestWatcherData } from "./watchers/ClientRequestWatcher.js";
import { TypeORMWatcherData } from "./watchers/TypeORMWatcher";
export declare enum WatcherEntryDataType {
    requests = "request",
    exceptions = "exception",
    dumps = "dump",
    logs = "log",
    queries = "query",
    clientRequests = "client-request"
}
export declare enum WatcherEntryCollectionType {
    request = "requests",
    exception = "exceptions",
    dump = "dumps",
    log = "logs",
    query = "queries",
    clientRequest = "client-requests"
}
export type WatcherType = RequestWatcherData | ErrorWatcherData | DumpWatcherData | ClientRequestWatcherData | LogWatcherData | TypeORMWatcherData;
export default abstract class WatcherEntry<T extends WatcherType> {
    content: any;
    created_at: string;
    family_hash: string;
    id: string;
    batchId?: string;
    sequence: number;
    tags: string[];
    type: WatcherEntryDataType;
    protected constructor(name: WatcherEntryDataType, data: T, batchId?: string);
}
