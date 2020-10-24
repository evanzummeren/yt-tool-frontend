<template>
  <div class="container flexcontainer">
    <div class="container__left">
      <h2>Indexed channels</h2>
      <h1>{{channelName}}</h1>
      <span class="h1__underheading">{{channelData.data.length}} channels</span>

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

        <div class="grid__content">
          <div class="grid__line" v-for="(data, index) in channelData.data" :key="index">
            <div class="box__gradient"></div>
            <span class="line__title"><a :href="`http://youtube.com/channel/${data.id}`" target="_blank">{{data.title}}</a></span>
            <span class="line__removed">sub indexed {{data.subtitles_elastic}}

              <!-- <span v-if="data.channel_active">online</span> -->
              <!-- <span v-if="!data.channel_active">removed</span> -->
            </span>
            <span class="line__removed">{{data.published_at}}</span>
            <span class="line__removed"></span>
            <span class="line__removed"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: "Videos",
  data: function() {
    return {
      channelData: {
        data: []
      },
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
    console.log(this.$route);
    console.log(this.$route.params.channel)

    this.pullData(this.$route.params.channel);
  },
  methods: {
    goRoute: function() {
      this.$router.go()

    },
    pullData: function(id) {
      let _this = this;

      axios.get(`https://zummie.com/yt888/items/video?filter[channel_id]=${id}&fields=video_id,title,subtitles_elastic,published_at`)
      .then(function (response) {
        console.log(response.data)
        // console.log(this);
        _this.channelData = response.data;
        _this.heightPoints = response.data.data.length + 20;
        console.log(_this.channelData);
        // console.log(response.data)
      })
      .catch( function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
  background: black;
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
}

.grid__line {
  background: #101010;
  line-height: 2rem;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding-left: 2rem;
  display: flex;
  color: white;
  font-family: 'Flaco';
  font-size: .9rem;
  position: relative;
}

a {
  color: white;
}

.line__title {
  width: 14rem;
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  position: relative;
}

.line__removed {
  width: 10rem;
  margin-left: 2rem;
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
</style>