<template>
<div class="singleresult">
  <div class="dateline"></div>
  <div class="horizontalline" v-if="render.date"></div>
  <span class="date" v-if="render.date">{{this.formattedDate}}</span>
  <span class="user" v-if="render.author">{{author}}</span>
  <svg version="1.1" class="laag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156.5 578.5" style="enable-background:new 0 0 156.5 578.5;" xml:space="preserve">
<g>
	<path class="st0" d="M156.5,1157.5"/>
</g>
<g>
	<path class="st0" d="M156.5,577.5C103.8,577.5,1,534.8,1,482s22.8-95.5,75.5-95.5"/>
</g>
<g>
	<path class="st0" d="M76.5,384.8C23.8,384.8,1,342,1,289.3s12.8-95.5,65.5-95.5"/>
</g>
<g>
	<path class="st0" d="M66.5,192C13.8,192,1,149.2,1,96.5S103.8,1,156.5,1"/>
</g>
</svg>
  <span class="blurtext">this text will be loaded in</span>
  <div  v-html="resultline">
   {{resultline}} 
  <!-- ause we all know they are returning <span class="hit">elite pedophile ring</span> because we all know they are returning -->
  </div>
  <span class="blurtext">and this one as well</span>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Result',
  props: ['resultline', 'additionalmeta', 'preresult'],
  data: function() {
    return {
      author: '',
      date: '',
      formatttedDatte: '',
      render: {
        date: true,
        author: true
      }
    }
  },
  mounted: function() {
    this.author = this.additionalmeta.user;
    this.date = this.additionalmeta.date;
    this.formattedDate = moment(this.additionalmeta.date).format('LL');

    if (this.date === this.preresult.inner_hits.video.hits.hits[0]._source.date) {
      this.render.date = false
    }

    if (this.author === this.preresult.inner_hits.video.hits.hits[0]._source.user) {
      this.render.author = false
    }

    console.log('hmm ',  this.preresult.inner_hits.video.hits.hits[0]._source.user);
    console.log(this.additionalmeta);
  }
}
</script>

<style lang="scss" scoped>
.singleresult {
  // height: 5rem;
  font-family: 'Flaco-mono';
  display: flex;
  color: #BBBBBB;
  font-size: 1.2rem;
  line-height: 6rem;
  border-bottom: 1px dotted #2f2f2f;
  white-space: nowrap;
  position: relative;
  text-align: center;
}

.blurtext {
  color: transparent;
  text-shadow: 0 0 7px rgba(255,255,255,0.7);
  margin: 0 .5rem;
}

.date {
  position: absolute;
  z-index: 10;
  font-size: .8rem;
  color: #959595;
  background: #353535;
  display: block;
  height: calc(1rem + 3px);
  line-height: 1rem;
  margin-left: 3.5rem;
  padding: 3px .5rem 3px .5rem;
}

.user {
  font-family: 'Flaco-mono';
  font-size: .8rem;
  text-transform: uppercase;
  position: absolute;
  margin-left: 3.5rem;
  background: #1D1D1D;
  padding: 0 .5rem;
}

.dateline {
  margin-left: 1rem;
  width: 1px;
  background: #353535;
  position: absolute;
  height: 6rem;
}

.horizontalline {
  margin-left: 1rem;
  width: 4rem;
  background: #353535;
  position: absolute;
  height: 1px;
}

.st0{
  fill:none;
  stroke:white;
  // stroke-width:2;
  // stroke-miterlimit:10;
  // stroke-dasharray:2,4;
}

.laag {
  position: absolute;
  width: 26px;
  margin-left: 34px;
  margin-top: 144px;
}
</style>