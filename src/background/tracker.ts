import { INDEXEDDB_CONFIG } from '../constants';
import { WebPageContext, TrackingBundle } from '../interfaces';
import RecordStore from '../shared/idb-record';
import * as assign from 'object-assign';
import * as Rx from 'rx';

// IndexedDB
const recordStore = new RecordStore();
recordStore.open();

export default class Tracker {

  static saveLocal(data: TrackingBundle): Rx.Subject<string> {
    return recordStore.put(assign({
      _id              : `${data.context.timestamp}-${data.context.href}`,
      navigationTiming : data.navigationTiming,
      chromeLoadTimes  : data.chromeLoadTimes
    }, data.context))
  }
}
