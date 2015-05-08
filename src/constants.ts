export enum NAVIGATION_TYPE {
  NAVIGATENEXT = 0,
  RELOAD       = 1,
  BACK_FORWARD = 2,
  UNDEFINED    = 99
}

export enum OBSERVABLE_TYPE {
  TRACKING          = 0,
  NAVIGATION_TIMING = 1,
  CHROME_LOAD_TIMES = 2,
  WEB_PAGE_CONTEXT  = 3
}

export const PARSE_CONFIG = {
  APPLICATION_ID : '',
  JAVASCRIPT_KEY : ''
};

export const INDEXEDDB_CONFIG = {
  DB_NAME    : 'webperf-collector',
  DB_VERSION : 5
};
