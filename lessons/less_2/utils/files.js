const fs = require('fs');

function jsonReader(path) {
    return new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                try {
                    return resolve(jsonWriter(path, []));
                } catch (err) {
                    reject(err);
                }
            }
            resolve(JSON.parse(data));
        })
    );
}

function jsonWriter(path, data) {
    return new Promise((resolve, reject) =>
        fs.writeFile(path, JSON.stringify(data), 'utf8', (err) => {
            if (err) reject(err);
            else resolve(data);
        })
    );

}

module.exports = {
    jsonReader,
    jsonWriter,
};