<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <h1> Buggy</h1>
    <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
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

<style scoped lang="scss">

</style>
