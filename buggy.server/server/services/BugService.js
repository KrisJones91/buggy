import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name id')
  }

  async getOne(id) {
    const Bug = await dbContext.Bugs.findById(id).populate('creator', 'name id')
    if (!Bug) {
      throw new BadRequest('No Bug found with that id')
    }
    return Bug
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async editBug(body) {
    // find me object with this ID, that CREATOR and Closed is false
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId, closed: false }, body, { new: true })
    if (!updated) {
      throw new BadRequest('invalid id')
    }
    return updated
  }

  async deleteBug(body) {
    // const bug = await this.getOne(id)
    // // @ts-ignore
    // bug._doc.closed = !bug._doc.closed
    // await bug.save()
    const newBug = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, { closed: true }, { new: true })
    if (!newBug) {
      throw new BadRequest('No Bug exists with that id')
    }
    return 'successfully Smashed!'
  }
}
export const bugService = new BugService()
