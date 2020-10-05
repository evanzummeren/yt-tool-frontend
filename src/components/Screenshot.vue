<template>
  <div class="screenshot" ref="screenshot" :style="{ marginLeft: mouseX + 'px'}">
    <div class="shade"></div>
    <v-sprite :id="'sprite'"
      :spritesheet="require('../assets/storyboardexample' + randomN(1,4) + '.webp')"
      :json="require('../assets/spritesheet.json')"
      :yoyo="false"
      :fps="1"
      ref="sprite"
    ></v-sprite>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  name: 'Screenshot',
  props: ['mouseX'],
  mounted: function() {

    anime({
      targets: '.screenshot',
      opacity: 1,
      scale: [1.3 , 1],
      translateY: [20, 0],
      duration: 1000,
      delay: 1000
      
    });
    this.$refs.sprite.play()
  },
  methods: {
    randomN(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

}
</script>

<style lang="scss" scoped>
.screenshot {
  width: 100px;
  height: 56px;
  position: absolute;
  z-index: -1;
  top: 1.3rem;
  opacity: 0;
}

.shade {
  width: 100px;
  height: 56px;
  background: rgba(79,35,255,1);
  opacity: .5;
  position: absolute;
  z-index: 10;
}

canvas {
  width: 60px;
  height: 34px;
}

</style>

