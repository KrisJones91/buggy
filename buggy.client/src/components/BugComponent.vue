<template>
  <div class="bug-component">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            Bugs
          </th>
          <th scope="col">
            Reported By
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
            Last Modified
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            1
          </th>
          <td>{{ props.bugProp.title }}</td>
          <td>{{ state.user }}</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'BugComponent',
  props: { bugProp: { type: Object, required: true } },

  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs)
    })
    return {
      state
    }
  }
}
</script>
