<template>
  <div class="sidemenu">
    <router-link to="/channels"><p>channels</p></router-link>
  </div>
</template>

<script>
export default {
  name: 'Sidemenu'
}
</script>

<style lang="scss" scoped>
.sidemenu {
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.7);
  position: fixed;
  z-index: 10000;
  margin: 0;
  padding: 0;
}
</style>