<template>
  <div class="Notes">
    <div class="card m-1">
      <div class="row">
        <div class="col-4">
          <p>
            {{ noteProp.body }}
          </p>
        </div>
        <div class="col-4">
          <p>{{ state.account.name }}</p>
        </div>
        <div class="col-4">
          <i class="
               fas
               fa-pencil-alt
               m-2
               text-info"
             v-if="state.account.id == noteProp.creatorId"
          >
          </i>
          <i class="fas
        fa-trash
        m-2
        text-danger"
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
          await noteService.deleteNote(props.noteProp.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
