<template>
<div class="singleresult" @click="loadAdditionalLines" v-bind:style="{ marginLeft: '-' + widthAdjustment + 'px' }">
  <div class="dateline"></div>
  <div class="horizontalline" v-if="render.date"></div>
  <span class="date" v-if="render.date">{{this.formattedDate}}</span>
  <span class="user" v-if="render.author">{{author}}</span>

  <div class="authorbeginline" v-if="render.author"></div>
  <div class="authorbeginline--horizontal" v-if="render.author"></div>
  <div class="authorbeginline--horizontalmiddle" v-if="!render.author"></div>
  <div class="authormiddlecircle" v-if="!render.author"></div>
  <div class="authorline" v-if="!render.author"></div>

  <span v-bind:class="{ blurtext: text.blur, unblurredtext: !text.blur }" ref="firsttext">{{text.prevLine}}</span>
  <div v-html="resultline.highlight.line[0]" ref="highlightedtext">
   {{resultline.highlight.line[0]}} 
  </div>
  <span v-bind:class="{ blurtext: text.blur, unblurredtext: !text.blur }">{{text.nextLine}}</span>
</div>
</template>

<script>
import moment from 'moment';
const axios = require('axios');
import serverCredentials from '../mixins/server.json';

export default {
  name: 'Result',
  props: ['resultline', 'additionalmeta', 'preresult', 'nextresult'],
  data: function() {
    return {
      author: '',
      date: '',
      formattedDate: '',
      posHighlight: {},
      widthAdjustment: 0,
      text: {
        blur: true,
        prevLine: "this text will be loaded in",
        nextLine: "and this one as well"
      },
      render: {
        date: true,
        author: true,
        lastline: false
      }
    }
  },
  mounted: function() {
    this.posHighlight = this.$refs.highlightedtext.getBoundingClientRect();

    this.author = this.additionalmeta.user;
    this.date = this.additionalmeta.date;
    this.formattedDate = moment(this.additionalmeta.date).format('LL');

    if (this.date === this.preresult.inner_hits.video.hits.hits[0]._source.date) {
      this.render.date = false
    }

    if (this.author === this.nextresult.inner_hits.video.hits.hits[0]._source.user) {
      this.render.author = false
    }

    if (this.author === this.nextresult.inner_hits.video.hits.hits[0]._source.user && this.author !== this.preresult.inner_hits.video.hits.hits[0]._source.user) {
      this.render.lastline = true
    }
  },
  methods: {
    loadAdditionalLines() {

      let vidid = this.resultline._id.slice(0,12);
      let pos = this.resultline._id.slice(12,20);
      let prevId = vidid.concat(Number(pos) -1);
      let nextId = vidid.concat(Number(pos) +1);

      var _this = this;

      axios.post(serverCredentials.url, {
        "size": 20,
        "from": 0,
        "query": {
          "bool": {
            "should": [
              {"match": { "_id": prevId } },	
              {"match": { "_id": nextId } }
            ]
          }
        }
      })
      .then(function (response) {
        // console.log(response.data.hits.hits[0]._source.line);
        // console.log(_this.text)
        _this.text.blur = false;
        _this.text.prevLine = response.data.hits.hits[0]._source.line;
        _this.text.nextLine = response.data.hits.hits[1]._source.line;
        // console.log(response.data.hits.hits)
      })
      .catch(function (error) {
        console.log(error);
      });

console.log(this.posHighlight);
      setTimeout(function(){ 
        let n = Math.abs(_this.posHighlight.left - _this.$refs.highlightedtext.getBoundingClientRect().left)
        _this.widthAdjustment = n;
        console.log(n)



       }, 400);





    }
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
  overflow-x: scroll;
}

.blurtext {
  color: transparent;
  text-shadow: 0 0 7px rgba(255,255,255,0.7);
  margin: 0 .5rem;
}

.unblurredtext {
  color: transparent;
	animation: blur 2s ease-out forwards;
  margin: 0 .5rem;
}

@keyframes blur {
	0%		{  text-shadow: 0 0 7px rgba(255,255,255,0.7); }
	// 5%		{text-shadow:  0 0 90px #fff;}
	// 15%		{opacity: 1;}
	// 20%		{text-shadow:  0 0 0px #fff;}
	// 80%		{text-shadow:  0 0 0px #fff;}
	// 85%		{opacity: 1;}
	// 95%		{text-shadow:  0 0 90px #fff;}
	100%	{  text-shadow: 0 0 0px #BBBBBB; opacity: 1 }
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

.authorbeginline {
  width:  1px;
  border-left: 1px dotted #BBBBBB;
  margin-top: 3rem;
  height: 3rem;
  position: absolute;
  left: 2.5rem;
    &--horizontal {
    @extend .authorbeginline;
    border-top: 1px dotted #BBBBBB;
    height: 1px;
    width: 1rem;
    // mtop: 3rem;
  }
  &--horizontalmiddle {
    @extend .authorbeginline;
    border-top: 1px dotted #636363;
    height: 1px;
    width: 1rem;
    // mtop: 3rem;
  }
}

.authormiddlecircle {
  width: 10px;
  height: 10px;
  margin-left: 3.5rem;
  margin-top: 2.75rem;
  position: absolute;
  border: 1px solid #636363;
  border-radius: 20px;
}

.authorline {
  width:  1px;
  border-left: 1px dotted #BBBBBB;
  height: 6rem;
  position: absolute;
  left: 2.5rem;
}
</style>