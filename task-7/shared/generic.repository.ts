export interface HasId {
    id: string;
}

export class GenericRepo<T extends HasId> {
    private Repository: T[] = [];

    getAll(): T[] {
        return this.Repository;
    }

    getById(id: string): T | undefined {
        return this.Repository.find(entity => entity.id === id);
    }

    findOne(att: (att: T) => boolean): T | undefined {
        // findOne : take an function checkes somthing then return true or false
        return this.Repository.find(att)
    }

    create(entity: T): T | undefined {
        this.Repository.push(entity);
        return entity;
    }

    update(id: string, entity: Partial<T>): T | null {
        const getEntity = this.getById(id);
        if (!getEntity) return null
        Object.assign(getEntity, entity);
        return getEntity;
    }

    delete(id: string): boolean {
        const index = this.Repository.findIndex(ent => ent.id === id);
        if (index === -1) return false
        this.Repository.splice(index, 1);
        return true;
    }

    isExisted(id: string): boolean {
        return !!this.getById(id);
    }

}