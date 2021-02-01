<template>
  <div class="bug-component d-flex flex-column ">
    <table class="table text-center">
      <tbody>
        <tr>
          <router-link class="text-dark link" :to="`/bug/${bugProp.id}`">
            <td scope="col" class="title">
              {{ bugProp.title }}
            </td>
          </router-link>
          <td scope="col" class="nickname">
            {{ account.name }}
          </td>
          <td scope="col" class="closed text-success" v-if="bugProp.closed == false">
            {{ bugProp.closed ? 'Closed' : 'Open' }}
          </td>
          <td scope="col" class="closed text-danger" v-if="bugProp.closed == true">
            {{ bugProp.closed ? 'Closed' : 'Open' }}
          </td>
          <td scope="col" class="updated">
            {{ bugProp.updatedAt }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'

export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async getOne() {
        try {
          console.log(props.bugProp.id)
          await bugService.getOne(props.bugProp.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.title{
  min-width: 153px;
}
.nickname{
  min-width: 220px;
}
.closed{
  min-width: 178px;
}
.updated{
  min-width: 317px;
}

</style>
