<template>
  <div class="embed">
    <div 
      class="close"
      @click="closeEmbed">

      <svg id="Laag_1" data-name="Laag 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.2 37.2">
        <path class="cls-1" d="M22.8,18.6,36.3,5.2A3.1,3.1,0,0,0,37.2,3a2.88,2.88,0,0,0-.9-2,3.08,3.08,0,0,0-4.2,0L18.6,14.4,5.2.9A3.1,3.1,0,0,0,3,0,2.88,2.88,0,0,0,1,.9,3.23,3.23,0,0,0,.2,3a2.58,2.58,0,0,0,.9,2.1L14.4,18.6.9,32A3.1,3.1,0,0,0,0,34.2a2.88,2.88,0,0,0,.9,2A3.23,3.23,0,0,0,3,37a2.72,2.72,0,0,0,2.1-.9L18.6,22.8,32,36.3a2.88,2.88,0,0,0,2.1.9h.1a2.88,2.88,0,0,0,2-.9,3.2,3.2,0,0,0,.1-4.2Z"/>
      </svg>
    </div>

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
  background: #8a8a8a;
  margin-left: 300px;
  cursor: pointer;
  padding: .55rem;
}

.close:hover {
  background: #1D1D1D !important;
}

.cls-1 {
  fill:#fff;
}
</style>