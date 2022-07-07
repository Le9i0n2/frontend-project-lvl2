// difference generator between two .json files

import _ from 'lodash';
import * as fs from 'node:fs';

// this function opens file, read it, close file and returns data from it
const readFile = (filepath) => {
  const descriptor = fs.openSync(filepath, 'r');
  const data = fs.readFileSync(descriptor, 'ascii');
  fs.closeSync(descriptor);
  return data;
};

const genDiff = (filepath1, filepath2) => {
  // get Data from files as object
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));

  // get the sorted array of all unique keys from both objects
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  // check each file for the presence of each key and generate the difference between the files
  const diff = keys.reduce(
    (acc, key) => {
      // condition 1: file1 has this key and file2 does not
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        const diffResult1 = `  - ${key}: ${data1[key]}`;
        acc.push(diffResult1);
        return acc;
      }

      // condition 2: file2 has this key and file1 does not
      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        const diffResult2 = `  + ${key}: ${data2[key]}`;
        acc.push(diffResult2);
        return acc;
      }

      // condition 3: both files have this key and their values are the same
      if (
        Object.hasOwn(data1, key) &&
        Object.hasOwn(data2, key) &&
        data1[key] === data2[key]
      ) {
        const diffResult3 = `    ${key}: ${data2[key]}`;
        acc.push(diffResult3);
        return acc;
      }

      // condition 4: both files have this key and their values are different
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

export default genDiff;
