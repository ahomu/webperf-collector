import { NAVIGATION_TYPE } from './constants';

export interface StatRequestBundle {
  origin : string;
  href   : string;
}

export interface TrackingBundle {
  context          : WebPageContext;
  navigationTiming : NavigationTiming;
  chromeLoadTimes  : ChromeLoadTimes
}

export interface WebPageContext {
  navigationType : NAVIGATION_TYPE;
  redirectCount  : number;
  resourceCount  : number;
  speedIndex     : number;
  connectionType : string;
  origin         : string;
  href           : string;
  timestamp      : number;
}

export interface ChromeLoadTimes {
  commitLoadTime          : number;
  connectionInfo          : string;
  finishDocumentLoadTime  : number;
  finishLoadTime          : number;
  firstPaintAfterLoadTime : number;
  firstPaintTime          : number;
  navigationType          : string;
  npnNegotiatedProtocol   : string;
  requestTime             : number;
  startLoadTime           : number;
  wasAlternateProtocolAvailable : boolean;
  wasFetchedViaSpdy       : boolean;
  wasNpnNegotiated        : boolean;
}

export interface NavigationTiming {
  navigationStart   : number;
  unloadEventStart  : number;
  unloadEventEnd    : number;
  redirectStart     : number;
  redirectEnd       : number;
  fetchStart        : number;
  domainLookupStart : number;
  domainLookupEnd   : number;
  connectStart      : number;
  connectEnd        : number;
  secureConnectionStart : number;
  requestStart      : number;
  responseStart     : number;
  responseEnd       : number;
  domLoading        : number;
  domInteractive    : number;
  domContentLoadedEventStart : number;
  domContentLoadedEventEnd : number;
  domComplete       : number;
  loadEventStart    : number;
  loadEventEnd      : number;
}
