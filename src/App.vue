<template>
  <div id="app">
   
    <ComponentBase msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ComponentBase  from './components/Base.vue'

export default {
  name: 'App',
  components: {
    ComponentBase
  }
}
</script>


<style lang="scss">
@import "./assets/scss/style.scss";
</style>
