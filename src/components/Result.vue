<template>
<div 
  class="singleresult" 
  @click="loadAdditionalLines"
  ref="singleLine"
  @mouseover="showScreenshot = true; addTracking()"
  @mouseleave="showScreenshot = false; removeTracking()"
  v-bind:style="{ marginLeft: '-' + widthAdjustment + 'px' }">

    <div class="dateline"></div>
    <div class="horizontalline" v-if="render.date"></div>
    <span class="date" v-if="render.date">{{this.formattedDate}}</span>
    <span class="user" v-if="render.author">{{author}}</span>

    <div class="authorbeginline" v-if="render.author"></div>
    <div class="authorbeginline--horizontal" v-if="render.author"></div>
    <div class="authorbeginline--horizontalmiddle" v-if="!render.author"></div>
    <div class="authormiddlecircle" v-if="!render.author"></div>
    <div class="authorline" v-if="!render.author"></div>

    <div class="linecontent">
      <span v-bind:class="{ 'blurtext firstline': text.blur, 'unblurredtext firstline': !text.blur }">{{text.prevLine}}</span>
      <div v-html="resultline.highlight.line[0]" ref="highlightedtext">
      {{resultline.highlight.line[0]}} 
      </div>
      <span v-bind:class="{ 'blurtext secondline': text.blur, 'unblurredtext secondline': !text.blur }">{{text.nextLine}}</span>
    </div>

    <Screenshot 
      :mouseX="mouseX"
      v-if="showScreenshot" />

    <div 
      class="exportlinks"
      v-if="showScreenshot">
      <div class="context"></div>
      <!-- <a :href="'https://www.youtube.com/watch?v=' + additionalmeta.id + '?t=' + this.fixTimestamp(this.resultline._source.start)" target="_blank"> -->
      <div class="watch" @click="watchEmbed"></div>
      <!-- </a> -->

    </div>


</div>
</template>

<script>
import moment from 'moment';
const axios = require('axios');
import serverCredentials from '../mixins/server.json';
import Screenshot from './Screenshot.vue'

export default {
  name: 'Result',
  props: ['resultline', 'additionalmeta', 'preresult', 'nextresult'],
  components: { Screenshot },
  data: function() {
    return {
      author: '',
      date: '',
      formattedDate: '',
      timestamp: 0,
      mouseX: 0,
      showScreenshot: false,
      posHighlight: {},
      widthAdjustment: 0,
      text: {
        blur: true,
        prevLine: "this text will be loaded in and some",
        nextLine: "and this one as well and here as well of course"
      },
      render: {
        date: true,
        author: true,
        lastline: false
      }
    }
  },
  mounted: function() {
    console.log('additional metadata')
    console.log(this.additionalmeta);
    this.posHighlight = this.$refs.highlightedtext.getBoundingClientRect();

    this.author = this.additionalmeta.user;
    this.date = this.additionalmeta.date;

    let utcSeconds = this.additionalmeta.date*1000;
    this.formattedDate = moment(new Date(utcSeconds)).format('LL');

    console.log(this.preresult);

    if(this.preresult === undefined) {
      console.log('is undefined')
    } else {

      if (this.additionalmeta.date === this.preresult._source.date) {
        this.render.date = false
      }

      // if (this.author === this.nextresult.inner_hits.video.hits.hits[0]._source.user && this.author === this.preresult.inner_hits.video.hits.hits[0]._source.user) {
      //   console.log('nEXT AUTHOR ', this.nextresult.inner_hits.video.hits.hits[0]._source.user)
      //   this.render.author = false
      // }
      
      // if (this.author !== this.nextresult.inner_hits.video.hits.hits[0]._source.user) {
      //   console.log('nEXT AUTHOR ', this.nextresult.inner_hits.video.hits.hits[0]._source.user)
      //   this.render.author = false
      // }
    }

    console.log(this.author)
  },
  methods: {
    watchEmbed() {
      this.$parent.triggerEmbed('https://www.youtube.com/embed/' + this.additionalmeta.vid_id + '?start=' + this.fixTimestamp(this.resultline._source.start) + '&autoplay=1')
    },
    fixTimestamp(stamp) {
      return stamp.split(".")[0];
    },
    loadAdditionalLines() {
      this.watchEmbed();

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
        _this.text.blur = false;
        _this.text.prevLine = response.data._source.line;
        _this.text.nextLine = response.data._source.line;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    addTracking() {
      this.$refs.singleLine.addEventListener("mousemove", this.mousePosition);
    },
    removeTracking() {
      this.$refs.singleLine.removeEventListener("mousedown", this.mousePosition, true);
    },
    mousePosition() {
      let e = e || window.event;
      let xOffset = this.$refs.singleLine.getBoundingClientRect().x;
      this.mouseX = e.pageX - xOffset - 50;
    }
  }
}
</script>

<style lang="scss" scoped>
.singleresult {
  font-family: 'Flaco-mono';
  display: flex;
  color: #BBBBBB;
  font-size: 1.2rem;
  line-height: 6rem;
  border-bottom: 1px dotted #2f2f2f;
  position: relative;
  text-align: center;
  // cursor: pointer;
}

.blurtext {
  color: transparent;
  text-shadow: 0 0 7px rgba(255,255,255,0.7);
  margin: 0 .5rem;
}

.unblurredtext {
  color: white;
	animation: blur 2s ease-out forwards;
  margin: 0 .5rem;
}

@keyframes blur {
	0%		{  text-shadow: 0 0 7px rgba(255,255,255,0.7); }
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
  z-index: 9;
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
  }
  &--horizontalmiddle {
    @extend .authorbeginline;
    border-top: 1px dotted #636363;
    height: 1px;
    width: 1rem;
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

.linecontent {
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  cursor: pointer;
}

.linecontent::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

.exportlinks {
  width: 160px;
  height: 6rem;
  position: absolute;
  background: linear-gradient(90deg, rgba(29,29,29,0) 0%, rgba(29,29,29,1) 35%, rgba(29,29,29,1) 100%);
  right: 0;
  align-items: center;
  display: flex;
}

.context {
  width: 2rem;
  height: 2rem;
  background-image: url("../assets/icons/context.svg");
  background-size: cover;
  margin-left: 4rem;
}

.watch {
  width: 2rem;
  height: 2rem;
  background-image: url("../assets/icons/watch.svg");
  margin-left: .5rem;
  background-size: cover;
}
.firstline, .secondline {
  // display: none;
}
</style>