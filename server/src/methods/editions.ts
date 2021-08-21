import _ from 'lodash'
import { pool } from '../db'
import * as query from '../queries'

export const listEditions = _.memoize(async () => {
  const rows = await query.editions(pool)
  return _.groupBy(rows, 'abbrev')
})
