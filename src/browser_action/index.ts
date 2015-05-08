import {Parse} from 'parse';
import {PARSE_CONFIG} from '../constants';

// Parse.com
Parse.initialize(PARSE_CONFIG.APPLICATION_ID, PARSE_CONFIG.JAVASCRIPT_KEY);

// TODO temporary test code
let targetMethods: string[] = [
  'averageOfFetchStart',
  'averageOfFirstByte',
  'averageOfFirstPaint',
  'averageOfDOMContentLoaded',
  'averageOfWindowLoaded'
];

let results: any[] = [];

targetMethods.forEach((methodName) => {
  Parse.Cloud.run(methodName, {}, {
    success: function(result) {
      results.push({
        func: methodName,
        time: result,
      });
      if (results.length === targetMethods.length) {
        (<any> console).table(results);
      }
    },
    error: function(error) {
      targetMethods.splice(targetMethods.indexOf(methodName), 1);
      console.error(`${methodName} is failed...`);
    }
  });
});
