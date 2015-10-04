import * as IDBWrapper from 'idb-wrapper';
import * as Rx from 'rx';

export default class IDBStoreBase<T> {
  store: IDBWrapper;

  open() {
    this.store = new IDBWrapper(this);
  }

  put(dataObj: T): Rx.Subject<string> {
    const subject: Rx.Subject<string> = new Rx.Subject<string>();
    this.store.put(dataObj, (id)=> {
      subject.onNext(id);
      subject.onCompleted();
    }, (error: any) => {
      subject.onError(error);
      subject.onCompleted();
    });
    return subject;
  }
}
