const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const rename = promisify(fs.rename),
    readdir = promisify(fs.readdir),
    stat = promisify(fs.stat),
    mkdir = promisify(fs.mkdir),
    exists = promisify(fs.exists);


const rootDir = path.join(__dirname, 'rootDir');
const newRootDir = path.join(__dirname, 'newRootDir');

const mooveItem = async (dir, item) => {
    try {
        const oldFile = path.join(dir, item);
        const newFile = path.join(newRootDir, item);
        await rename(oldFile, newFile);
    } catch (err) {
        console.log('error' + err);
    }
};

const passDir = async dirName => {
    try {
        const files = await readdir(dirName);
        for (const file of files) {
            const itemInfo = await stat(path.join(dirName, file));
            if (itemInfo.isDirectory()) 
                await passDir(path.join(dirName, file));
            else 
                await mooveItem(dirName, file);
        }
    } catch (err) {
        console.log('error' + err);
    }
};

exists(newRootDir)
    .then(res => {
        if (!res) 
            mkdir(newRootDir);
    })
    .then(passDir(rootDir))
    .catch(err => console.log('error' + err));