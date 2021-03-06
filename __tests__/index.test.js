// test for genDiff

import path from 'node:path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const rightAnswer =
  '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('genDiff .json', () => {
  expect(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')),
  ).toBe(rightAnswer);
});

test('genDiff .yaml', () => {
  expect(
    genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml')),
  ).toBe(rightAnswer);
});
