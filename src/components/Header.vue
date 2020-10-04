<template>
  <div class="container" ref="container">
    <div class="container__blocks">
      <div class="cornerblock"></div>
      <div class="secondcornerblock"></div>
      <div class="thirdcornerblock"></div>
      <div class="fourthcornerblock"></div>
      <div class="blackbar"></div>
      
      <div class="firstsingleline"></div>
      <div class="secondsingleline"></div>

      <div class="estheticallines">
        <div class="verticalsingleline"></div>
      </div>
    </div>
  </div>
</template>

<script>
import glitchVid from '../assets/glitch.mp4';
import * as PIXI from 'pixi.js';

export default {
  name: "Header",
  mounted: function() {
      const app = new PIXI.Application({
        transparent: true,
        width: 400,
        height: 400
      });

      this.$refs.container.appendChild(app.view);
      const container = new PIXI.Container();

      app.stage.addChild(container);
      const texture = PIXI.Texture.from(glitchVid);
      const videoSprite = new PIXI.Sprite(texture);
      const videoController = videoSprite.texture.baseTexture.resource.source;

      videoController.muted = true;
      videoController.loop = true;
      videoController.autoplay = true;
      videoSprite.width = app.screen.width;
      // videoSprite.height = 400;

      container.addChild(videoSprite);
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  height: 400px;
  width: 400px;
}

.container__blocks {
  position: absolute;
}

.cornerblock {
  width: 2rem;
  height: 2rem;
  background: #1B1B1B;
  opacity: .8;
  position: absolute;
}
// 2D2D2D
.secondcornerblock {
  width: 2rem;
  height: 2rem;
  background: #2D2D2D;
  opacity: .5;
  position: absolute;
  top: 0;
  left: 2rem;
}

.thirdcornerblock {
  width: 2rem;
  height: 2rem;
  background: #2D2D2D;
  opacity: .5;
  position: absolute;
  margin-top: 2rem;
  left: 0;
}

.fourthcornerblock {
  width: 2rem;
  height: 2rem;
  background: #3F3F3F;
  opacity: .4;
  position: absolute;
  margin-top: 4rem;
  left: 0;
}

.blackbar {
  background: #000000;
  width: 1rem;
  height: 26rem;
  left: 1rem;
  top: 6rem;
  position: absolute;
}

.firstsingleline, .secondsingleline {
  position: absolute;
  height: 1px;
  width: 2rem;
  background-color: #474747;
  margin-top: 2rem;
}

.secondsingleline {
  background-color: #8A8A8A !important;
  margin-top: calc(4rem - 1px) !important;
}

.verticalsingleline {
  position: absolute;
  height: 100vh;
  width: 1px;
  background-color: #4F23FF;
  margin-left: 2rem;
  z-index: 1000;
}

.estheticallines {
  position: fixed;
}
</style>>
