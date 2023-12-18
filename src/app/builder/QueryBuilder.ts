import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  // const searchableFields = ['email', 'name.firstName', 'presentAddress']
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm

    //if there is anything in searchTerm then make regex searching format for each searcable fields for $or query
    // { $or: [ {expression}, {expression}, {expression} ] }
    // { email: { $regex: searchTerm, $options: 'i' } }
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }

    return this
  }

  filter(excludedFields: string[] = []) {
    // console.log();

    const queryObj = { ...this.query } //copy base query into another
    excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

    //remove unneccesary items from query so that the query ca run for the searchTerm only
    excludedFields.forEach((item) => delete queryObj[item])

    //modify the query
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    const sort = (this?.query?.sort as string).split(',').join(' ') || '-createdAt'

    //modify the query
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate(defaultLimit: number = 10) {
    const limit = Number(this?.query?.limit) || defaultLimit
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit

    //modify the query
    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields = (this?.query?.fields as string).split(',').join(' ') || ''

    //modify query
    this.modelQuery = this.modelQuery.select(fields)

    return this
  }
}

export default QueryBuilder
