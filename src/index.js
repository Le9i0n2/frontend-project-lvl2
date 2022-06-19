// difference generator between two .json files

import _ from 'lodash';
import * as fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';

// this function opens file, read it, close file and returns data from it
const readFile = (filepath) => {
  const descriptor = fs.openSync(filepath, 'r');
  const data = fs.readFileSync(descriptor, 'ascii');
  fs.closeSync(descriptor);
  return data;
};

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const diff = keys.reduce(
    (acc, key) => {
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        const diffResult1 = `  - ${key}: ${data1[key]}`;
        acc.push(diffResult1);
        return acc;
      }

      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        const diffResult2 = `  + ${key}: ${data2[key]}`;
        acc.push(diffResult2);
        return acc;
      }

      if (
        Object.hasOwn(data1, key) &&
        Object.hasOwn(data2, key) &&
        data1[key] === data2[key]
      ) {
        const diffResult3 = `    ${key}: ${data2[key]}`;
        acc.push(diffResult3);
        return acc;
      }

      const diffResult4 = `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
      acc.push(diffResult4);
      return acc;
    },
    ['{'],
  );

  diff.push('}');
  const diffString = diff.join('\n');
  return diffString;
};
