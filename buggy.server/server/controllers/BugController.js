import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getAllBugs)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getNotes)
      .post('/', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getNotes(req, res, next) {
    try {
      return res.send(await noteService.getNotes({ bugId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bugs = await bugService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await bugService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      res.send(await bugService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await bugService.editBug(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      res.send(await bugService.deleteBug(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
