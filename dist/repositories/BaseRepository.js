"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    items = [];
    constructor(initData) {
        this.items = initData;
    }
    async getAll() {
        return this.items;
    }
    async getById(id) {
        return this.items.find(item => item.id === id);
    }
    async create(item) {
        this.items.push(item);
    }
    async update(id, item) {
    }
    async delete(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
    async filterBy(filter) {
        return this.items.filter(item => {
            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    const typedKey = key;
                    if (item[typedKey] !== filter[typedKey]) {
                        return false;
                    }
                }
            }
            return true;
        });
    }
}
exports.BaseRepository = BaseRepository;
