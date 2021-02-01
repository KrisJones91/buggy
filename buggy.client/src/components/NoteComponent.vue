<template>
  <div class="Notes">
    <h1> Notes </h1>
    <p> {{ noteProp.body }} </p>
  </div>
</template>

<script>
export default {
  name: 'Notes',
  props: { noteProp: { type: Object, required: true } },
  setup(props) {
    return {}
  }
}
</script>
