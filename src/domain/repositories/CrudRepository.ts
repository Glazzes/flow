export interface CrudRepository<ID, T> {
  save(entity: T): Promise<T>;
  findById(id: ID): Promise<T>;
  deleteById(id: ID): Promise<void>;
}
