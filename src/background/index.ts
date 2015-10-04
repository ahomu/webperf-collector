import IPC from '../shared/ipc';
import Tracker from './tracker';
import * as Rx from 'rx';
import { MESSAGE_TYPE } from '../constants';
import { TrackingBundle, StatRequestBundle } from '../interfaces';

function duration(from: number, to: number) {
  // if high resolution time
  from % 1 !== 0 && (from = Math.round(from * 1000));
  to % 1   !== 0 && (to = Math.round(to * 1000));

  return from - to;
}

const tracking = new IPC<TrackingBundle>(MESSAGE_TYPE.TRACKING, chrome.runtime.onMessage);
const statRequest = new IPC<StatRequestBundle>(MESSAGE_TYPE.STAT_REQUEST, chrome.runtime.onMessage);

statRequest.observable$.subscribe(function(data: StatRequestBundle) {
  console.log(data);
});

tracking.observable$.subscribe(function(data: TrackingBundle) {

  Tracker.saveLocal(data).subscribe(function() {
    //console.info('success', arguments);
  }, function() {
    //console.error('error', arguments);
  });

  //console.log('NavigationTiming', n);
  //console.log('ChromeLoadTimes', l);
  //console.log('WebPageContext', c);
  //
  //console.log('unloadEventDuration', duration(n.unloadEventEnd, n.unloadEventStart));
  //console.log('redirectDuration', duration(n.redirectEnd, n.redirectStart));
  //console.log('dnsLookupDuration', duration(n.domainLookupEnd, n.domainLookupStart));
  //console.log('initialConnectionDuration', duration(n.connectEnd, n.connectStart));
  //console.log('sslConnectionDuration', duration(n.connectEnd, n.secureConnectionStart));
  //console.log('requestSentDuration', duration(n.requestStart, n.connectEnd));
  //console.log('waitingDuration', duration(n.responseStart, n.requestStart));
  //console.log('contentDownloadDuration', duration(n.responseEnd, n.responseStart));
  //
  //console.log('fetchStart', duration(n.fetchStart, n.navigationStart));
  //console.log('firstByte', duration(n.responseStart, n.navigationStart));
  //console.log('domContentLoaded', duration(n.domContentLoadedEventEnd, n.navigationStart));
  //console.log('domComplete', duration(n.domComplete, n.navigationStart));
  //console.log('documentLoaded', duration(n.loadEventEnd, n.navigationStart));
  //
  //console.log('firstPaintTime', duration(l.firstPaintTime, l.startLoadTime));
  //console.log('documentLoadTime', duration(l.finishDocumentLoadTime, l.startLoadTime));
  //console.log('loadTime', duration(l.finishLoadTime, l.startLoadTime));
});
