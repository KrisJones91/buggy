<template>
  <div class="Notes">
    <div class="card m-1">
      <div class="row">
        <div class="col-4">
          <p class="mt-2">
            {{ noteProp.body }}
          </p>
        </div>
        <div class="col-4">
          <p class="mt-2">
            {{ state.account.name }}
          </p>
        </div>
        <div class="col-4 text-right">
          <i class="fab fa-xing m-2 text-danger fa-2x"
             v-if="state.account.id == noteProp.creatorId"
             @click="deleteNote()"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { noteService } from '../services/NoteService'

export default {
  name: 'Notes',
  props: { noteProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteNote() {
        try {
          if (window.confirm('Are you sure you want to DELETE?')) {
            await noteService.deleteNote(props.noteProp.id)
          }
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
