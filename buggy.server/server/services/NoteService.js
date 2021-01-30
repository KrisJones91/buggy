import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getNotes(query) {
    return await dbContext.Notes.find(query).populate('creator', 'name id')
  }

  async creatNote(body) {
    return await dbContext.Notes.create(body)
  }

  async editNote(id, body) {
    const newNote = await dbContext.Notes.findByIdAndUpdate(id, body, { new: true })
    if (!newNote) {
      throw new BadRequest('This is NOT your Note or this is an invalid Id')
    }
    return newNote
  }

  async deleteNote(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Could not delete the Note')
    }
    return 'Successfully Deleted'
  }
}

export const noteService = new NoteService()
