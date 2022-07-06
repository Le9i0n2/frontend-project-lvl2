#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/index';

const program = new Command();

program.name('gendiff');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();
