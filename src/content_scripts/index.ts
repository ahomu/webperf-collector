///<reference path="../../typings/chrome/chrome.d.ts" />

import IPC from '../shared/ipc';
import validity from './validity';
import RUMSpeedIndex from './rum-speedindex';
import {OBSERVABLE_TYPE} from '../constants';
import {TrackingBundle, NavigationTiming, ChromeLoadTimes, WebPageContext} from '../interfaces';

if (validity()) {
  (<any> window).onload = function() {
    // defer for `performance.navigation.loadEventEnd`
    setTimeout(tracking, 4);
  };
}

function tracking() {
  const global: any = (<any> window);
  const performance: Performance = global.performance;
  const navigator: any = global.navigator;
  const location: Location = global.location;

  // `chrome.loadTimes()`
  const loadTimes: ChromeLoadTimes = global.chrome.loadTimes();

  // if firstPainting not yet, retry to next event loop
  if (!loadTimes.firstPaintTime) {
    setTimeout(tracking, 4);
    return;
  }

  // `performance.navigation`
  // FIXME <any> cast because "Property 'secureConnectionStart' is missing in type 'PerformanceTiming'."
  const navTiming: NavigationTiming = <any> performance.timing;

  // context
  const webPageCtx: WebPageContext = {
    navigationType : performance.navigation.type,
    redirectCount  : performance.navigation.redirectCount,
    resourceCount  : performance.getEntries().length,
    speedIndex     : RUMSpeedIndex(global),
    connectionType : navigator.connection ? navigator.connection.type : 'unknown',
    origin         : `${location.protocol}//${location.host}`,
    href           : location.href,
    timestamp      : performance.timing.navigationStart
  };

  // pass to tracking background
  const trackingBundle: TrackingBundle = {
    context          : webPageCtx,
    navigationTiming : navTiming,
    chromeLoadTimes  : loadTimes
  };
  IPC.broadcast(OBSERVABLE_TYPE.TRACKING, trackingBundle);
}
