const zlib = require('zlib');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const SHA1 = require('crypto-js/sha1');

const hashObject = async (data, opt) => {
    const isExistFile = await fs.existsSync('./'+data);
    
    if(isExistFile) data = await fs.readFileSync('./'+data).toString();

    const hash = SHA1(data).toString();
    if(opt === '-w') {
        const base_uri = '.git/objects/' + hash.substr(0,2);
        const rest = hash.substring(2,hash.length);
        const zlib_content = await zlib.deflateSync(data)
        await exec(`mkdir .git/objects/${hash.substr(0,2)}`);
        await fs.writeFileSync(`${base_uri}/${rest}`,zlib_content);
    }
    console.log(hash);
}

module.exports = hashObject;
