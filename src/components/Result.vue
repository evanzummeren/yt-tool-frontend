<template>
<div class="singleresult">
  <span class="date">{{date}}</span>
  <span class="user">{{author}}</span>
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
      date: ''
    }
  },
  mounted: function() {
    this.author = this.additionalmeta.user;
    this.date = this.additionalmeta.date;

    console.log(moment(this.date).format());


    // moment("1946-05-21")
    console.log('fo;asdflas');
    console.log('hmm ',  this.preresult);
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

// .hit {
//   color: #D3C8FF;
//   display: inline;
//   padding: 0 .5rem;
//   background: linear-gradient(180deg, rgba(29,29,29,1) 45%, rgba(79,35,255,1) 45%, rgba(79,35,255,1) 70%, rgba(29,29,29,1) 70%);
// }
</style>