import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createNote)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      res.send(await noteService.creatNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.editNote(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.deleteNote(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
