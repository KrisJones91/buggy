<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <h1 class="title">
        <b>
          Buggy
        </b>
      </h1>
    </div>
    <div class="row">
      <div class="card">
        <table class="table text-center">
          <thead class="table-header">
            <tr>
              <th scope="col">
                Bugs
              </th>
              <th scope="col">
                Reporter
              </th>
              <th scope="col">
                Status
              </th>
              <th scope="col">
                Modified Date
              </th>
            </tr>
          </thead>
        </table>
        <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped >
.table{
  min-width: 700px;
   background-color: rgba(209, 179, 7, 0.705);
   color: rgb(245, 241, 241);
   text-shadow: -1px 0px 4px rgb(0, 0, 0);
}
.title{
  font-family: 'Hind Guntur', sans-serif;
  font-size: 75px;
  -webkit-text-stroke: 3px rgb(0, 0, 0);

  color: rgb(206, 206, 206);
}
</style>
