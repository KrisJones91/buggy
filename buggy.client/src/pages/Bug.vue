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
          <div class="card-top ab-top text-center" :contenteditable="state.editBug" @blur="editBug">
            <i class="fas fa-pencil-alt m-2 pencil" v-if="state.account.id == state.activeBug.creatorId && !state.activeBug.closed" @click="state.editBug = !state.editBug"></i>
            <h1 class="bug-title">
              {{ state.activeBug.title }}
            </h1>
          </div>
          <div class="card-body main">
            <div class="text-center bord bg-danger text-white" v-if="state.activeBug.closed == true" @click="deleteBug">
              <h4> {{ state.activeBug.closed ? 'Closed' : 'Open' }} </h4>
            </div>
            <div class="text-center bord bg-success text-white" v-if="state.activeBug.closed == false" @click="deleteBug">
              <h4> {{ state.activeBug.closed ? 'Closed' : 'Open' }} </h4>
            </div>
            <h4 class="text-center mt-5">
              What's happening?
            </h4>
            <p class="card desc text-center">
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
            <button type="submit" class="btn btn-outline-dark sb mt-2">
              Sumbit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="card m-4 entire text-center">
      <div class="card-top note-card">
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
          if (window.confirm('Are you sure?')) {
            await bugService.deleteBug(route.params.id)
          }
        } catch (error) {
          logger.log(error)
        }
      },
      async editBug(event) {
        try {
          logger.log('editing')
          await bugService.editBug(state.activeBug.id, event.target.innerText)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }
}
</script>

<style scoped>
.bug{
  background-color: rgb(204, 204, 204);
}
.house{
  color: rgba(209, 179, 7, 0.705);
}
.house:hover{
  color: rgba(255, 217, 4, 0.815);
  text-shadow: 1px 1px 10px black;
}
.ab-top{
  background-color: black;
  border: inset rgb(165, 164, 164);
}
.main{
  border: inset rgb(165, 164, 164);
}
.bug-title{
  color: rgba(255, 255, 255, 0.815);
  font-family: 'Rubik', sans-serif !important;
}
.bord{
  border: ridge 5px rgb(124, 123, 123) ;

}
.bord:hover{
  box-shadow: 1px 1px 10px rgb(97, 96, 96);
  cursor: pointer;
  transform: scale(1.06);
}
.pencil{
  color: white;
}
.pencil:hover{
  color: rgba(255, 217, 4, 0.815);
  cursor: pointer;
  transform: scale(1.6);
}
.desc{
  border: solid 1px gray;
}
textarea{
  border: outset rgb(163, 163, 163);
}
.note-card{
  background-color: black;
  color: white;
  font-family: 'Rubik', sans-serif !important;
}
.entire{
  border: outset rgb(163, 163, 163);
}
.sb{
  border-color: black;
}
.sb:hover{
  background-color: black;
  color: white;
  box-shadow: 0px 5px 8px rgb(95, 94, 94);
}
</style>
