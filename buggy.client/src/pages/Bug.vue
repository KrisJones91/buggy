<template>
  <div class="bug container-fluid">
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'Home' }">
          <i type="button" class="arrow fas fa-home fa-3x"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bug'
}
</script>
