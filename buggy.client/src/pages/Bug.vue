<template>
  <div class="bug container-fluid">
    <div class="row">
      <div class="col m-3">
        <router-link :to="{ name: 'Home' }">
          <i type="button" class="house fas fa-home fa-2x"></i>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mt-5">
        <div class="card">
          <div class="card-top ab-top text-center">
            <h1>
              {{ state.activeBug.title }}
            </h1>
          </div>
          <div class="card-body ">
            <div class="text-center bord bg-danger text-white" v-if="state.activeBug.closed == true" @click="deleteBug">
              <h4> {{ state.activeBug.closed ? 'Closed' : 'Open' }} </h4>
            </div>
            <div class="text-center bord bg-success text-white" v-if="state.activeBug.closed == false" @click="deleteBug">
              <h4> {{ state.activeBug.closed ? 'Closed' : 'Open' }} </h4>
            </div>
            <h3 class="text-center">
              Description
            </h3>
            <p>
              {{ state.activeBug.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-5 mt-5 text-center">
        <form type="submit" @submit.prevent="createNote">
          <div class="form-group">
            <textarea type="text"
                      class="form-control text-center"
                      id="body"
                      v-model="state.newNote.body"
                      placeholder="Leave a note here..."
                      required
            />
            <button type="submit" class="btn btn-outline-dark m-2">
              Sumbit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="card m-4 text-center">
      <div class="card-top">
        <h1> Notes </h1>
      </div>
      <Notes v-for="note in state.notes" :key="note.id" :note-prop="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      newNote: { bugId: route.params.id }
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
        await noteService.getNotes(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createNote() {
        try {
          await noteService.createNote(state.newNote)
          state.newNote = { bugId: route.params.id }
        } catch (error) {
          logger.log(error)
        }
      },
      async deleteBug() {
        try {
          await bugService.deleteBug(route.params.id)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }
}
</script>

<style scoped>
.house{
  color: rgba(209, 179, 7, 0.705);

}
.house:hover{
  color: rgba(255, 217, 4, 0.815);
  text-shadow: 1px 1px 10px black;
}
.ab-top{
  background-color: black;
  color: rgba(255, 217, 4, 0.815);
}
.bord{
  border: ridge 5px rgb(124, 123, 123) ;

}
.bord:hover{
  box-shadow: 1px 1px 10px rgb(97, 96, 96);
  cursor: pointer;
}
</style>
