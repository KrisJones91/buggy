import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async createBug(bug) {
    const res = await api.post('api/bugs/', bug)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    logger.log(AppState.activeBug)
  }

  async deleteBug(id) {
    const res = await api.delete('api/bugs/' + id)
    const bugIndex = AppState.bugs.findIndex(b => b.id === id)
    AppState.bugs.splice(bugIndex, 1)
    AppState.activeBug = res.data
  }
}

export const bugService = new BugService()
