///<reference path="../../typings/chrome/chrome.d.ts" />
///<reference path="../../typings/rx/rx.d.ts" />

import * as Rx from 'rx';

export interface IPCMessage {
  type: number|string;
  body: any;
}

export default class IPC<T> {

  static broadcast(type: number|string, body: any, tabId?: number) {
    const message: IPCMessage = {
      type: type,
      body: body
    };

    if (tabId == null) {
      chrome.runtime.sendMessage(message);
    } else {
      chrome.tabs.sendMessage(tabId, message);
    }
  }

  context: chrome.events.Event;

  observable$: Rx.Observable<T>;

  constructor(eventType: number|string, eventSubject: chrome.events.Event) {

    const subject$: Rx.Subject<IPCMessage> = (new Rx.Subject<IPCMessage>());

    eventSubject.addListener(
      (message: IPCMessage, sender: chrome.runtime.MessageSender, responder: Function) => {
        subject$.onNext(message);
      }
    );

    this.context = eventSubject;

    this.observable$ = subject$
      .filter((message: IPCMessage) => message.type === eventType)
      .map((message: IPCMessage) => message.body);
  }

}
