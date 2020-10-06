<template>
  <div class="embed">
    <div 
      class="close"
      @click="closeEmbed" />
    <iframe width="300" height="168" :src="ytlink" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  </div>
</template>

<script>
export default {
  name: 'Embed',
  props: ['ytlink'],
  methods: {
    closeEmbed: function() {
      this.$parent.closeThisEmbed();
    }
  }
}
</script>

<style>
.embed {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  z-index: 20;
}

.close {
  width: 2rem;
  height: 2rem;
  background: blue;
  margin-left: 300px;
}
</style>