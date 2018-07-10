const util = require('util');
const exec = util.promisify(require('child_process').exec);

const init = async () => {
    if(await exec('mkdir .git').error) throw Error('Fail make directory .git');
    if(await exec('mkdir .git/refs').error) throw Error('Fail make directory .git/refs');
    if(await exec('mkdir .git/refs/heads').error) throw Error('Fail make directory .git/refs/heads');
    if(await exec('mkdir .git/refs/tags').error) throw Error('Fail make directory .git/refs/tags');
    if(await exec('mkdir .git/objects').error) throw Error('Fail make directory .git/objects');
    if(await exec('mkdir .git/objects/pack').error) throw Error('Fail make directory .git/objects/pack');
    if(await exec('mkdir .git/objects/info').error) throw Error('Fail make directory .git/objects/info');

    if(await exec('echo "ref: refs/heads/master" > .git/HEAD').error) throw Error('Fail make file .git/HEAD');
    console.log(`Initialized empty Git repository in ${process.cwd()}/.git/`);
}

module.exports = init;