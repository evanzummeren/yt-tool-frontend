<template>
  <div class="sidemenu">
    <div class="gradient gradient__black"></div>
    <div class="gradient gradient__bottom"></div>
    <div class="gradient gradient__top"></div>
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

.gradient {
  width: 100vw;
  height: 100vh;
}

.gradient__black {
  background-image: url("../assets/gradients/gradient_black.svg");
}

.gradient__bottom {
  background-image: url("../assets/gradients/gradient_1.svg");
}

.gradient__top {
  background-image: url("../assets/gradients/gradient_2.svg");

}
</style>