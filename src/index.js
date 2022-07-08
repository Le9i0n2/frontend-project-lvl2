// difference generator between two .json files

import _ from 'lodash';
import * as fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';

// this function opens file, read it, close file and returns data from it
const readFile = (filepath) => {
  const descriptor = fs.openSync(filepath, 'r');
  const data = fs.readFileSync(descriptor, 'ascii');
  fs.closeSync(descriptor);
  return data;
};

const genDiff = (filepath1, filepath2) => {
  // get file extension
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);

  // get data from files
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  // parse data to object format
  const parsedData1 = parse(data1, ext1);
  const parsedData2 = parse(data2, ext2);

  // get the sorted array of all unique keys from both objects
  const keys = _.union(_.keys(parsedData1), _.keys(parsedData2)).sort();

  // check each file for the presence of each key and generate the difference between the files
  const diff = keys.reduce(
    (acc, key) => {
      // condition 1: file1 has this key and file2 does not
      if (Object.hasOwn(parsedData1, key) && !Object.hasOwn(parsedData2, key)) {
        const diffResult1 = `  - ${key}: ${parsedData1[key]}`;
        acc.push(diffResult1);
        return acc;
      }

      // condition 2: file2 has this key and file1 does not
      if (!Object.hasOwn(parsedData1, key) && Object.hasOwn(parsedData2, key)) {
        const diffResult2 = `  + ${key}: ${parsedData2[key]}`;
        acc.push(diffResult2);
        return acc;
      }

      // condition 3: both files have this key and their values are the same
      if (
        Object.hasOwn(parsedData1, key) &&
        Object.hasOwn(parsedData2, key) &&
        parsedData1[key] === parsedData2[key]
      ) {
        const diffResult3 = `    ${key}: ${parsedData2[key]}`;
        acc.push(diffResult3);
        return acc;
      }

      // condition 4: both files have this key and their values are different
      const diffResult4 = `  - ${key}: ${parsedData1[key]}\n  + ${key}: ${parsedData2[key]}`;
      acc.push(diffResult4);
      return acc;
    },
    ['{'],
  );

  diff.push('}');
  const diffString = diff.join('\n');
  return diffString;
};

export default genDiff;
