import { BaseEntity } from './IRepository';
import { IRepository } from './IRepository';

export class BaseRepository <T extends BaseEntity> implements IRepository<T> {
    private items: T[] = [];
    constructor(initData: T[]) {
    this.items = initData;
  }
  
  
  async getAll(): Promise<T[]> {
    return this.items;
  }
  
  async getById(id: T['id']): Promise<T | undefined> {
      return this.items.find(item => item.id === id);
  }
  
  async create(item: T): Promise<void> {
       this.items.push(item);
  }
  
  async update(id: T['id'], item: Partial<T>): Promise<void> {
      
  }
  
  async delete(id: T['id']): Promise<void> {
      this.items = this.items.filter(item => item.id !== id);
  }
  
async filterBy(filter: Partial<T>): Promise<T[]> {
  return this.items.filter(item => {
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        const typedKey = key as keyof T;
        if (item[typedKey] !== filter[typedKey]) {
          return false;
        }
      }
    }
    return true;
  });
}
    
}