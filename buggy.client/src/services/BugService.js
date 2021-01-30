import { AppState } from '../AppState'

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
}

export const bugService = new BugService()
