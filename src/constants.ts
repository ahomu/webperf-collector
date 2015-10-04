export enum NAVIGATION_TYPE {
  NAVIGATENEXT = 0,
  RELOAD       = 1,
  BACK_FORWARD = 2,
  UNDEFINED    = 99
}

export enum MESSAGE_TYPE {
  TRACKING     = 0,
  STAT_REQUEST = 1
}

export const INDEXEDDB_CONFIG = {
  DB_NAME    : 'webperf-collector',
  DB_VERSION : 5
};
