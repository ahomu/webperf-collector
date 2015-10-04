import * as Rx from 'rx';

export interface IPCMessage {
  type: number|string;
  body: any;
}

export default class IPC<T> {

  static broadcast(type: number|string, body: any, tabId?: number, callback?: (response: any) => void) {
    const message: IPCMessage = {
      type: type,
      body: body
    };

    if (tabId == null) {
      chrome.runtime.sendMessage(message, callback);
    } else {
      chrome.tabs.sendMessage(tabId, message, callback);
    }
  }

  context: chrome.events.Event;

  observable$: Rx.Observable<T>;

  constructor(eventType: number|string, eventSubject: chrome.events.Event) {

    const subject$: Rx.Subject<IPCMessage> = new Rx.Subject<IPCMessage>();

    this.observable$ = subject$
      .filter((message: IPCMessage) => message.type === eventType)
      .map((message: IPCMessage) => message.body);

    eventSubject.addListener(
      (message: IPCMessage, sender: chrome.runtime.MessageSender, responder: Function) => {
        subject$.onNext(message);
        if (responder) {
          responder(this.observable$);
        }
      }
    );

    this.context = eventSubject;

  }

}
