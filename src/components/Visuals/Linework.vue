<template>
  <div>
    <div class="first__horizontal"></div>
    <div class="second__horizontal"></div>
    <div class="right__vertical"></div>
  </div>
</template>

<script>
export default {
  name: 'Linework'
}
</script>

<style lang="scss" scoped>
.first__horizontal {
  position: fixed;
  height: 1px;
  width: calc(100vw - 2rem);
  background-color: #474747;
  margin-top: 0rem;
  z-index: 12000;
}

.second__horizontal {
  position: fixed;
  height: 1px;
  width: calc(100vw - 2rem);
  background-color: #8a8a8a;
  margin-top: calc(2rem - 1px);
  z-index: 12000;
}

.right__vertical {
  position: fixed;
  height: calc(100vh - 2rem);
  width: 1px;
  background-color: #8a8a8a;
  margin-top: calc(2rem - 1px);
  right: 3rem;
  z-index: 12000;
}
</style>