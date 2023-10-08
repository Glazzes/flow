export interface CrudRepository<T, ID> {
  save(entity: T): Promise<T>;
  findById(id: ID): Promise<T>;
  deleteById(id: ID): Promise<void>;
  existsById(id: ID): Promise<boolean>;
}
