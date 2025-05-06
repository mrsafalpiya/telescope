import DB from "../DB.js"
import WatcherEntry, {WatcherEntryCollectionType, WatcherEntryDataType} from "../WatcherEntry.js"
import Telescope from "../Telescope.js"

export enum LogType {
    LOG = "log",
    SCHEMA_BUILD = "schema-build",
    MIGRATION = "migration",
    INFO = "info",
    QUERY = "query",
    WARN = "warn",
    QUERY_SLOW = "query-slow",
    ERROR = "error",
    QUERY_ERROR = "query-error",
}

export interface TypeORMWatcherData
{
    type: LogType,
    prefix: string,
    query: string
}

export class TypeORMWatcherEntry extends WatcherEntry<TypeORMWatcherData>
{
    constructor(data: TypeORMWatcherData, batchId?: string)
    {
        super(WatcherEntryDataType.queries, data, batchId)
    }
}

export default class TypeORMWatcher
{
    public static entryType = WatcherEntryCollectionType.log

    private data: TypeORMWatcherData
    private batchId?: string

    constructor(data: any[], level: LogType, batchId?: string)
    {
        this.batchId = batchId

        this.data = {
            type: level,
            prefix: data[0],
            query: data[1]
        }
    }

    public static capture(telescope: Telescope)
    {

    }

    public save()
    {
        const entry = new TypeORMWatcherEntry(this.data, this.batchId)

        DB.logs().save(entry)
    }
}