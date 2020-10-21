<template>
  <div class="sidemenu">
    <div class="gradient gradient__black"></div>
    <div class="gradient gradient__bottom"></div>
    <div class="gradient gradient__top"></div>

    <div class="firstsingleline"></div>
    <div class="secondsingleline"></div>

    <div class="estheticallines">
      <div class="verticalsingleline"></div>
      <div class="rightverticalsingleline"></div>
    </div>

    <div class="sidemenu__close" v-on:click="removeSidemenu()">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67.8 67.8" style="enable-background:new 0 0 67.8 67.8;" xml:space="preserve">
        <path class="closemenu" d="M42.4,33.9L66.3,10c2-2,2-5.4,0-7.4l-1.1-1.1c-2-2-5.4-2-7.4,0L33.9,25.4L10,1.5c-2-2-5.4-2-7.4,0L1.5,2.6c-2,2-2,5.4,0,7.4 l23.9,23.9L1.5,57.8c-2,2-2,5.4,0,7.4l1.1,1.1c2,2,5.4,2,7.4,0l23.9-23.9l23.9,23.9c2,2,5.4,2,7.4,0l1.1-1.1c2-2,2-5.4,0-7.4 L42.4,33.9z"/>
      </svg>
    </div>

    <div class="sidemenu__content">

      <div class="block">
      <h5>Methodology</h5>
      <router-link to="/channels/1"><li v-on:click="changeView('channels')">Indexed channels</li></router-link>
      <router-link to="/methodology"><li v-on:click="changeView('methodology')">Technology</li></router-link>
      </div>

      <div class="block">
      <h5>Support</h5>
      <router-link to="/help"><li v-on:click="changeView('help')">Help</li></router-link>
      <router-link to="/contact"><li v-on:click="removeSidemenu()">Contact</li></router-link>
      </div>

      <div class="block">

      <h5>Social media</h5>
      <a href="https://www.twitter.com" target="_blank"><li v-on:click="removeSidemenu()">Twitter</li></a>
      <a hreef="https://www.medium.com" target="_blank"><li v-on:click="removeSidemenu()">Medium</li></a>
      </div>

    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  name: 'Sidemenu',
  mounted: function() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    anime({
      targets: '.gradient',
      opacity: [0, 1],
      duration: 1500,
      delay: function(el, i) { return i * 350; },
      easing: 'linear'
    })

    anime({
      targets: '.sidemenu__close',
      scale: [1.2, 1],
      opacity: [0, 1],
      duration: 500,
      delay: 1000,
      easing: 'easeInOutQuad'
    })

    anime({
      targets: '.block',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 2000,
      delay: function(el, i) { return i * 350 + 1000; },
      easing: 'easeInOutQuad'
    })

    anime({
      targets: '.gradient__bottom',
      opacity: [1, .8, .85, .7, .8, .75, 1],
      duration: 5000,
      delay: 2000,
      easing: 'linear'
    })

  },
  methods: {
    changeView: function(str) {
      this.$emit('switch', str)
      this.removeSidemenu();
    },
    removeSidemenu: function() {
      anime({
        targets: '.gradient',
        opacity: [1, 0],
        duration: 750,
        delay: function(el, i) { return i * 125; },
        easing: 'linear'
      })

      anime({
        targets: '.block',
        opacity: [1, 0],
        duration: 750,
        delay: function(el, i) { return i * 125; },
        easing: 'linear'
      })

      anime({
        targets: '.sidemenu',
        opacity: [1, 0],
        duration: 750,
        delay: 300,
        easing: 'linear'
      })

      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      window.setTimeout(()=> this.$emit('close', false), 1000)
    }
  }
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
  animation-name: bgAnim;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes bgAnim {
  from {background: rgba(0,0,0,0)}
  to {background: rgba(0,0,0,.7)}
}

.gradient {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-repeat: no-repeat;
  background-position: right;
  opacity: 0;
}

.gradient__black {
  background-image: url("../assets/gradients/gradient_black.svg");
}

.gradient__bottom {
  opacity: 1;
  background-image: url("../assets/gradients/gradient_1.svg");
}

.gradient__top {
  background-image: url("../assets/gradients/gradient_2.svg");
}

.sidemenu__content {
  margin-left: 75%;
  margin-top: 9rem;
  position: absolute;
}

.sidemenu__content li {
  list-style-type: none;
  color: #b2b2b2;
  font-family: 'Flaco';
  margin-top: .5rem;
  display: table;
  background: linear-gradient(180deg, rgba(29, 29, 29, 0) 55%, #4f23ff 55%, #4f23ff 70%, rgba(29, 29, 29, 0) 70%);
}

h5 {
  font-family: 'Gil';
  font-weight: 100;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.25rem;
  margin-top: 3rem;
}

/* Lines */
.firstsingleline, .secondsingleline {
  position: absolute;
  height: 1px;
  width: 100vw;
  background-color: #b2b2b2;
  margin-top: 2rem;
}

.secondsingleline {
  background-color: #b2b2b2 !important;
  margin-top: calc(4rem - 1px) !important;
}

.verticalsingleline {
  position: absolute;
  height: 100vh;
  width: 1px;
  background-color: #b2b2b2;
  margin-left: 2rem;
  z-index: 1000;
}

.rightverticalsingleline {
  position: fixed;
  height: 100vh;
  width: 1px;
  background-color: #b2b2b2;
  right: 3rem;
  z-index: 100000;
}

.estheticallines {
  position: fixed;
}

.sidemenu__close {
  width: 1rem;
  position: absolute;
  right: 2.5rem;
  top: 1.5rem;
  cursor: pointer;
}

.closemenu {
  fill: white;
  height: 1rem;
  width: 1rem;
}
</style>