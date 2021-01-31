<template>
  <div class="bug-component d-flex flex-column ">
    <table class="table text-center">
      <tbody>
        <tr>
          <td scope="col" class="title">
            {{ bugProp.title }}
          </td>
          <td scope="col" class="nickname">
            {{ user.nickname }}
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
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      user: computed(() => AppState.user)

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
.open{
  color: green;
}
.close{
  color: red;
}

</style>
