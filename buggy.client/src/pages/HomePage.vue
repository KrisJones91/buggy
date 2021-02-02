<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row mb-2">
      <h1 class="title">
        <b>
          Buggy
        </b>
      </h1>
    </div>
    <form type="submit" @submit.prevent="createBug">
      <div class="form-group row justify-content-center">
        <input type="text"
               class="form-control m-1"
               id="title"
               v-model="state.newBug.title"
               placeholder="Name of Bug..."
               required
        >
        <textarea type="text"
                  class="form-control m-1"
                  id="description"
                  v-model="state.newBug.description"
                  placeholder="description"
                  required
        />
        <button type="submit" class="btn sb mt-2">
          Submit
        </button>
      </div>
    </form>
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
              <th>
                Status
              </th>
              <th>
                Last Modified
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
import { useRouter } from 'vue-router'
// computed and add filter bug under NewBug .. some if's
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createBug() {
        try {
          const id = await bugService.createBug(state.newBug)
          state.newBug = {}
          router.push({ name: 'Bug', params: { id } })
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped >
.home{
  background-color: rgb(204, 204, 204);
}
.table{
  min-width: 700px;
  background-color: rgba(209, 179, 7, 0.705);
  color: black;
  text-shadow: 0px 2px 3px rgb(100, 100, 100);
  font-family: 'Montserrat', sans-serif;
}
.title{
    font-family: 'Orbitron', sans-serif;
    font-size: 75px;
    -webkit-text-stroke: 2px rgba(197, 168, 0, 0.719);
    color: rgb(131, 129, 129);
    text-shadow: 0px 3px 8px black;
    animation:blinkingText 2s infinite;
}
@keyframes blinkingText{
    0%{color: rgb(236, 235, 235)}
    25%{color: rgb(131, 129, 129) }
    50%{color: rgb(236, 235, 235)}
    75%{color:rgb(131, 129, 129)}
    100%{color: rgb(236, 235, 235)}

}

input{
  border: solid black;
}
input:hover{
  box-shadow: 0px 0px 8px black;
}
textarea{
  border: solid black;
}
textarea:hover{
  box-shadow: 0px 0px 8px black;
}
.card{
  border: groove 15px rgb(133, 131, 131);
  margin-bottom: 50px;
  overflow-y: scroll;
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
