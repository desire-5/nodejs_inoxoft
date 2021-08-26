const { jsonReader, jsonWriter } = require('./files');

module.exports = class Db {
    constructor(path) {
        (async () => {
            this.path = path;
            this.data = await jsonReader(this.path);
        })();
    }

    async create(data) {
        try {
            const entry = await this.find(data);
            if (entry) return;
            return await jsonWriter(this.path, [...this.data, { id:this.data.length, ...data}]);
        } catch (err) {
            console.log(err);
        }
    }

    async find(id) {
        try {
            return this.data.find(el => el.id == id);
        } catch (err) {
            console.log(err);
        }
    }

    async find_email(email) {
        try {
            return this.data.find(el => el.email == email);
        } catch (err) {
            console.log(err);
        }
    }

    async list() {
        try {
            return this.data;
        } catch (err) {
            console.log(err);
        }
    }
}