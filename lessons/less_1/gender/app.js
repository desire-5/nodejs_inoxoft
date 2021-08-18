const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const readDirPromise = util.promisify(fs.readdir);
const renameFilePromise = util.promisify(fs.rename);

const checkGender = async dir => {
    const config = {
        dir,
        replaceDirectory: dir == 'boys' ? 'girls' : 'boys',
        fitGender: dir == 'boys' ? 'male' : 'female'
    }
    readDirPromise(dir).then(files => {
        files.forEach(file => {
            readFilePromise(`${config.dir}/${file}`)
                .then(data => {
                    let content = JSON.parse(data)
                    if (content.gender != config.fitGender) {
                        renameFilePromise(`${config.dir}/${file}`, `${config.replaceDirectory}/${file}`)
                            .catch(err => {
                                console.log('error ', err)
                            })
                        return
                    }
                    
                })
        })
    })
}

checkGender('boys');
checkGender('girls');
