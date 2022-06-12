// logic for gendiff.js

import { Command } from 'commander';

export default () => {
  const program = new Command();

  program.configureHelp({
    sortOptions: false,
  });

  program.name('gendiff');

  program
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format');

  program.parse();
};
