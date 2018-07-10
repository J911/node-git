const zlib = require('zlib');
const fs = require('fs');

const findMatchObjectFile = async (files, hash) => {
    for(file of files) {
        if(file.substring(0,2) === hash.substr(2,4)){
            return file;
        }
    }
    return null;
}

const catFile = async (...parms) => {
    const hash = parms[1] ? parms[1] : parms[0];
    const opt = parms[1] ? parms[0] : null;

    const base_uri = '.git/objects/' + hash.substring(0,2);
    const files = await fs.readdirSync(base_uri);
    const file = await findMatchObjectFile(files, hash);
    if(file && opt == '-p') {
        const zlib_content = await fs.readFileSync(`${base_uri}/${file}`);
        console.log(await zlib.inflateSync(zlib_content).toString());
    }
    else {
        throw Error('Not a valid object name' + hash)
    }
}

module.exports = catFile;