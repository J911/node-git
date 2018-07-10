const util = require('./utils');

switch(process.argv[2]) {
    case 'init':
        util.init();
        break;
    case 'hash-object':
        util.hashObject(process.argv[3], process.argv[4]);
        break;
    case 'cat-file':
        util.catFile(process.argv[3], process.argv[4])
        break;
}