<template>
  <div class="one__thirdcontainer flexcontainer">
    <Linework />

    <div class="container__left">
      <h2>Indexed channels</h2>
      <h1>ddd</h1>
      <span class="h1__underheading">hannels</span>

      <ul>
        <li><router-link to="/channels/2">Alt-right</router-link></li>

      </ul>
    </div>
    <div class="container__right">

     <vue-good-table
      :columns="columns"
      :rows="rows"
      theme="nocturnal"/>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";

import Linework from '../components/Visuals/Linework.vue';

export default {
  name: "Channels",
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
    }
  },
  components: {
    Linework, 
  },
  created: function() {
    this.getData();
    // this.widthPoints = Math.ceil(window.innerWidth/64);
  },
  mounted: function() {
    window.scrollTo(0, 0); 
  },
  methods: {

    getData() {
      axios
        .get(
          `https://zummie.com/yt888/items/channel?filter[channel_active]=false&fields=id,name,last_updated,video_count,view_count,published_at&limit=${
            50
          }&offset=${
            0
          }&sort=-last_updated&meta=result_count,limit,offset,page,page_count,filter_count`
        )
        .then(result => {
          console.log(result.data.data);
          console.log(result.data);
          this.channels = result.data.data;

          this.serverRequest.total = result.data.meta.filter_count;
          this.serverRequest.perPage = result.data.meta.page_count;
          this.serverRequest.page = result.data.meta.page + result.data.meta.page_count;
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
  
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
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
  min-height: calc(100vh - 2rem);
}

.container__right {
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

// .grid {
//   position: absolute;
//   margin-top: 6rem;
//   margin-left: 1rem;
//   width: 80%;
// }

// .st0{
//   fill:none;
//   stroke:#575756;
//   stroke-width: 0.5;
//   stroke-miterlimit: 10;
// }

// svg {
//   width: 100%;
//   min-height: 100vh;
// }

// .grid__content {
//   position: absolute;
//   top: 0px;
//   padding: 3.5rem 4rem 0 3rem;
//   width: 100%;
//   overflow-x:hidden;
//   #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
// }
</style>