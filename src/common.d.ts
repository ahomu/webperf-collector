/**
 * IDBWrapper
 */

declare class IDBWrapper {
  constructor(options: any);
  put(dataObj: any, success?: (id: string) => void, error?: Function): void;
}

declare module IDBWrapper {
}

declare module 'idb-wrapper' {
  export = IDBWrapper;
}

/**
 * Object.assign
 */
declare var oa: ObjectAssign;

declare module 'object-assign' {
  export = oa;
}

interface ObjectAssign {
  (target: Object, ...source: Object[]): any;
}
