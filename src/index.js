// logic for gendiff.js

import { Command } from 'commander';

export default () => {
  const program = new Command();

  program.name('gendiff');

  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number', ',');

  program.parse();
};
