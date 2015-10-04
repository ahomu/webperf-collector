import IDBStoreBase from './idb-store-base';
import { WebPageContext, NavigationTiming, ChromeLoadTimes } from '../interfaces';

interface ItemSchema extends WebPageContext {
  _id              : string;
  navigationTiming : NavigationTiming;
  chromeLoadTimes  : ChromeLoadTimes;
}

export default class RecordStore extends IDBStoreBase<ItemSchema> {
  dbVersion = 2;
  storeName = 'WebPerfCollector';
  keyPath   = '_id';
  indexes   = [
    {
      name       : 'origin',
      keyPath    : 'origin',
      unique     : false,
      multiEntry : false
    },
    {
      name       : 'href',
      keyPath    : 'href',
      unique     : false,
      multiEntry : false
    }
  ];
}
