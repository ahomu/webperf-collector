///<reference path="../../typings/parse/parse.d.ts" />
///<reference path="../common.d.ts" />

import {Parse} from 'parse';
import {PARSE_CONFIG} from '../constants';
import {INDEXEDDB_CONFIG} from '../constants';
import {WebPageContext, TrackingBundle} from '../interfaces';
import RecordStore from '../shared/idb-record';
import * as assign from 'object-assign';
import * as Rx from 'rx';

// Parse.com
Parse.initialize(PARSE_CONFIG.APPLICATION_ID, PARSE_CONFIG.JAVASCRIPT_KEY);

// IndexedDB
let recordStore = new RecordStore();
recordStore.open();

export default class Tracker {

  context: WebPageContext;

  parseContext: Parse.Object;

  parseEnabled: boolean;

  constructor(context: WebPageContext) {
    this.context = context;

    if (true) {
      this.enableParse();
      this.parseContext = new (Parse.Object.extend('WebPageContext'))();
      this.parseContext.save(context);
    }
  }

  enableParse() {
    this.parseEnabled = true;
  }

  saveParse<T>(objectName: string, objectData: any): Rx.Subject<T> {
    if (!this.parseEnabled) {
      return;
    }

    let subject: Rx.Subject<T> = new Rx.Subject<T>();
    let parseData = new (Parse.Object.extend(objectName))();
    objectData.context = this.parseContext;

    parseData.save(objectData, {
      success: function(data: T) {
        subject.onNext(data);
        subject.onCompleted();
      },
      error: function(data: T, error) {
        subject.onError(error);
        subject.onCompleted();
      }
    });

    return subject;
  }

  saveLocal(data: TrackingBundle): Rx.Subject<string> {
    return recordStore.put(assign({
      _id              : `${data.context.timestamp}-${data.context.href}`,
      navigationTiming : data.navigationTiming,
      chromeLoadTimes  : data.chromeLoadTimes
    }, data.context))
  }
}
