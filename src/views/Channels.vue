<template>
  <div class="containerChannels flexcontainer">
    <div class="first__horizontal"></div>
    <div class="second__horizontal"></div>
    <div class="right__vertical"></div>

    <div class="container__left">
      <h2>Indexed channels</h2>
      <h1>{{channelName}}</h1>
      <span class="h1__underheading">{{channelData.length}} channels</span>

      <ul>
        <li @click="goRoute()"><router-link to="/channels/2">Alt-right</router-link></li>
        <li @click="goRoute()"><router-link to="/channels/8">Alternative health</router-link></li>
        <li @click="goRoute()"><router-link to="/channels/5">Breadtube</router-link></li>
        <li @click="goRoute()"><router-link to="/channels/3">Conspiracy</router-link></li>
        <li @click="goRoute()"><router-link to="/channels/1">QAnon</router-link></li>
        <li @click="goRoute()"><router-link to="/channels/16">Marxism</router-link></li>
      </ul>
    </div>
    <div class="container__right">
      <div class="grid">
        <svg>
          <g v-for="vindex in heightPoints" :key="vindex">
          <g v-for="index in widthPoints" :key="index">
            <line class="st0" :x1="48 * index" :y1="vindex * 48 - 48" :x2="48 * index" :y2="vindex * 48 + 6 - 48"/>
            <line class="st0" :x1="48 * index + 3" :y1="vindex * 48 - 48 + 3" :x2="48 * index - 3" :y2="vindex * 48 - 48 + 3"/>
          </g>
          </g>
        </svg>

        <div class="splitline__one"></div>
        <div class="splitline__two"></div>
        <div class="splitline__three"></div>

        <div class="grid__content">

          <div class="heading__gradient"></div>
          <div class="heading__container">
            <div class="heading__first headings" v-bind:class="{ 'headings--active': activeTab === 'name' }" @click="sort('name')">channel name</div>
            <div class="heading__second headings" v-bind:class="{ 'headings--active': activeTab === 'channel_active' }" @click="sort('channel_active')">status</div>
            <div class="heading__third headings" v-bind:class="{ 'headings--active': activeTab === 'view_count' }" @click="sort('view_count')">views</div>
            <div class="heading__third headings" v-bind:class="{ 'headings--active': activeTab === 'subscriber_count' }" @click="sort('subscriber_count')">subscribers</div>
            <div class="heading__third headings" v-bind:class="{ 'headings--active': activeTab === 'video_count' }" @click="sort('video_count')">videos</div>
            <div class="heading__third headings" v-bind:class="{ 'headings--active': activeTab === 'published_at' }" @click="sort('published_at')">since</div>
          </div>
          <div class="grid__line" v-for="(data, index) in channelData" :key="index">
            <router-link :to="'/videos/' + data.id">
            <div class="box__gradient"></div>
            <span class="line__title">{{data.name}}</span>
            <span class="line__removed">
              <span v-if="data.channel_active">active</span>
              <span v-if="!data.channel_active">removed</span>
            </span>
            <span class="line__stats views">{{splitNumber(data.view_count)}} views</span>
            <span class="line__subs">{{splitNumber(data.subscriber_count)}} subs</span>
            <span 
              class="line__stats"
              style="padding-left: 1rem"
              >{{data.video_count}} videos</span>

                          <span 
              class="line__stats"
              style="padding-left: 1rem"
              >{{data.published_at.split('T')[0]}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import arraySort from 'array-sort'
// var arraySort = require('array-sort');


export default {
  name: "Channels",
  data: function() {
    return {
      channelData: [],
      activeTab: "name",
      channelName: "channels",
      currentChannel: 2,
      widthPoints: 10,
      heightPoints: 20
    }
  },
  created: function() {
    this.widthPoints = Math.ceil(window.innerWidth/64);
    this.currentChannel = this.$route.params.channel;
  },
  mounted: function() {
    window.scrollTo(0, 0); 

    console.log(this.$route.params.channel)
    // UGLY solutions
    if ( this.$route.params.channel === '1') { this.channelName = "QAnon" }
    if ( this.$route.params.channel === '2') { this.channelName = "Alt-right" }
    if ( this.$route.params.channel === '3') { this.channelName = "Conspiracy" }
    if ( this.$route.params.channel === '5') { this.channelName = "Breadtube" }
    if ( this.$route.params.channel === '6') { this.channelName = "Uncategorized" }
    if ( this.$route.params.channel === '8') { this.channelName = "Alternative health" }
    if ( this.$route.params.channel === '16') { this.channelName = "Marxism" }
    this.currentChannel = this.$route.params.channel;
    this.pullData();
  },
  methods: {
    goRoute: function() {
      this.$router.go()
    },
    sort: function(key) {
      this.channelData = arraySort(this.channelData, key);
      this.activeTab = key;
    },
    pullData: function() {
      let _this = this;

      axios.get(`https://zummie.com/yt888/items/channel?filter[category]=${_this.currentChannel}`)
      .then(function (response) {
        console.log(response)
        let responseArray = response.data.data;
        _this.channelData = arraySort(responseArray, 'name');
        _this.heightPoints = response.data.data.length + 20;
        // console.log(response.data)
      })
      .catch( function (error) {
        console.log(error);
      });
    },
    splitNumber: function(n) {
      if (n === null) {
        console.log(n);
      } else {
        return n.toString().replace(/(.)(?=(\d{3})+$)/g,'$1.');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
}
.containerChannels {
  z-index: 100;
  width: calc(100vw - 5rem);
  position: absolute;
  left: 2rem;
  top: 2rem;
  border-left: 1px solid #4F23FF;
}

.flexcontainer {
  display: flex;
  min-height: calc(100vh - 3rem);
}

.container__left {
  width: 20%;
  background: black;
  border-right: 1px solid white;
  padding: 6rem 2rem 0 2rem;
  position: fixed;
  min-height: calc(100vh - 2rem);
}

.container__right {
  margin-left: 20%;
  width: 80%;
}

h2, .h1__underheading {
  font-family: 'Flaco';
  font-size: .8rem;
  font-weight: 100;
  color: white;
  text-transform: uppercase;
}

.h1__underheading {
  color: #9E9E9E;
}

h1 {
  font-family: 'Gil';
  font-size: 2.5rem;
  font-weight: 100;
  color: white;
  margin-bottom: .3rem;
}

ul {
  list-style-type: none;
  margin: 2rem 0 0 0;
  padding: 0;
}

li {
  font-family: 'Gil';
  color: white;
  font-family: 1.5rem;
  margin-top: .3rem;
}

.container__right {
  overflow-x: hidden;
}

.grid {
  position: absolute;
  margin-top: 6rem;
  margin-left: 1rem;
  width: 80%;
}

.st0{
  fill:none;
  stroke:#575756;
  stroke-width: 0.5;
  stroke-miterlimit: 10;
}

svg {
  width: 100%;
  min-height: 100vh;
}

.grid__content {
  position: absolute;
  top: 0px;
  padding: 3.5rem 4rem 0 3rem;
  width: 100%;
  overflow-x:hidden;
}

.grid__line {
  background: #101010;
  line-height: 2rem;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding-left: 1rem;
  display: flex;
  font-family: 'Flaco';
  font-size: .9rem;
  position: relative;
  overflow-x: scroll;
}

.grid__line:hover {
  background: rgb(79, 35, 255);
  color: black !important;
}

.grid__line:hover > a .box__gradient {
  background: linear-gradient(90deg, rgba(79, 35, 255,0) 0%, rgb(79, 35, 255) 100%) !important;
}

a {
  color: white;
}

.line__title {
  width: 16rem;
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  position: relative;
}

.line__removed {
  width: 6rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #575756;
  white-space: nowrap;
}

.line__stats {
  width: 10rem;
  margin-left: 1rem;
  white-space: nowrap;
}

.line__subs {
  width: 9rem;
  margin-left: 1rem;
  white-space: nowrap;
}

.box__gradient {
  position: absolute;
  height: 2rem;
  width: 2rem;
  background: linear-gradient(90deg, rgba(16,16,16,0) 0%, rgba(16,16,16,1) 100%);
  top: 0;
  left: 15rem;
  z-index: 100;
}

.box__gradient::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
  background: transparent;
}

.first__horizontal {
  position: fixed;
  height: 1px;
  width: calc(100vw - 2rem);
  background-color: #474747;
  margin-top: 0rem;
  z-index: 12000;
}

.second__horizontal {
  position: fixed;
  height: 1px;
  width: calc(100vw - 2rem);
  background-color: #8a8a8a;
  margin-top: calc(2rem - 1px);
  z-index: 12000;
}

.right__vertical {
  position: fixed;
  height: calc(100vh - 2rem);
  width: 1px;
  background-color: #8a8a8a;
  margin-top: calc(2rem - 1px);
  right: 3rem;
  z-index: 12000;
}

.splitline {
  height: 100%;
  width: 1px;
  background-color: #575756;
  position: absolute;
  top: 3rem;

  &__one {
    @extend .splitline;
    left: 21rem;
  }

  &__two {
    @extend .splitline;
    left: 27rem;
  }

    &__three {
    @extend .splitline;
    left: 49rem;
  }
}

.views {
  border-right: 1px solid #575756;
}

.heading__container {
  line-height: 2rem;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  width: calc(80% - 11rem);
  display: flex;
  font-family: 'Flaco';
  font-size: .9rem;
  z-index: 10000;
  position: fixed;
  // overflow-y: scroll;
  background-image: url('../assets/etch.svg');
  background-size: cover;
  margin-top: -3rem;
}

.heading__gradient {
  width: calc(80% - 11rem);
  position: fixed;
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
  height: 265px;
  margin-top: -185px;
  z-index: 10000;
  pointer-events: none;
}

.headings {
  color: white;
  font-family: 'Flaco-Reg';
  font-size: 1rem;
  font-weight: 100;
  display: flex;
}

.headings:hover {
  cursor: pointer;
  background: rgba(79,35,255,.3);
}

.headings--active {
  background: rgba(79,35,255,.5);
}

.heading__first {
  min-width: 18rem;
  padding-left: 1rem;
}

.heading__second {
  padding-left: 1rem;
  min-width: 6rem;
}

.heading__third {
  padding-left: 1rem;
  min-width: 11rem;
}
</style>