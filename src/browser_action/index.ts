import IPC from '../shared/ipc';
import * as Rx from 'rx';
import { MESSAGE_TYPE } from '../constants';
import { StatRequestBundle } from '../interfaces';

chrome.tabs.query({
  active   : true,
  windowId : chrome.windows.WINDOW_ID_CURRENT
}, (tabs: chrome.tabs.Tab[])=> {

  const currentTab = tabs[0];
  const statRequestBundle: StatRequestBundle = {
    origin : currentTab.url,
    href   : currentTab.url
  };
  IPC.broadcast(MESSAGE_TYPE.STAT_REQUEST, statRequestBundle);

  console.log(currentTab);
});
