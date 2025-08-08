

// This interface i used it for checking if the object has id or not !
export interface BaseEntity {
  id: string | number;
}


export interface IRepository<T extends BaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T | undefined>;
  create(item: T): Promise<void>;
  update(id: T['id'], item: Partial<T>): Promise<void>;
  delete(id: T['id']): Promise<void>;
  filterBy(filter: Partial<T>): Promise<T[]>;
}
