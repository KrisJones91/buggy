import { AppState } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNote(note) {
    const res = await api.post('api/notes/', note)
    AppState.notes.push(res.data)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    const noteIndex = AppState.notes.findIndex(n => n.id === id)
    AppState.notes.splice(noteIndex, 1)
  }
}

export const noteService = new NoteService()
