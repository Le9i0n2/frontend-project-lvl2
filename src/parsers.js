// this function is for parsing data of different formats

import yaml from 'js-yaml';

export default (data, extension) => {
  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  }
  if (extension === '.yaml' || extension === '.yml') {
    parse = yaml.load;
  }
  return parse(data);
};
