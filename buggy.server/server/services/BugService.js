import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async getOne(id) {
    const Bug = await dbContext.Bugs.findById(id)
    if (!Bug) {
      throw new BadRequest('No Bug found with that id')
    }
    return Bug
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async editBug(id, body) {
    const updated = await dbContext.Bugs.findOneAndUpdate(id, body, { new: true })
    if (!updated) {
      throw new BadRequest('invalid id')
    }
    return updated
  }

  async deleteBug(id) {
    const bug = await this.getOne(id)
    // @ts-ignore
    bug._doc.closed = !bug._doc.closed
    const newBug = await dbContext.Bugs.findByIdAndUpdate(id, bug, { new: true })
    if (!newBug) {
      throw new BadRequest('No Bug exists with that id')
    }
    return 'successfully Smashed!'
  }
}
export const bugService = new BugService()
