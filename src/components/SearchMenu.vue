<template>
  <div class="searchmenu">
    <div class="container">
      <div class="search searchmenu__space">
        <h3>search operators</h3>
        <ul>
          <li>"exact search"</li>
        </ul>
      </div>
      <div class="categories searchmenu__space">
        <h3>categories</h3>
        <div class="checkboxes">
          <input type="checkbox" id="altright" value="altright" v-model="checkedCats"><label for="altright">alt-right</label><br/>
          <input type="checkbox" id="althealth" value="althealth" v-model="checkedCats"><label for="althealth">alternative health</label><br/>
          <input type="checkbox" id="breadtube" value="breadtube" v-model="checkedCats"><label for="breadtube">breadtube</label><br/>
          <input type="checkbox" id="conspiracy" value="conspiracy" v-model="checkedCats"><label for="conspiracy">conspiracy</label><br/>
          <input type="checkbox" id="qanon" value="qanon" v-model="checkedCats"><label for="qanon">qanon</label><br/>
          <input type="checkbox" id="marxism" value="marxism" v-model="checkedCats"><label for="marxism">marxism</label>
        </div>
      </div>
      <div class="sort searchmenu__space">
        <h3>sort</h3>
        <ul>
          <li v-bind:class="{ on: sort === 'newest' }" @click="selectSort('newest')">newest</li>
          <li v-bind:class="{ on: sort === 'oldest' }" @click="selectSort('oldest')">oldest</li>
          <li v-bind:class="{ on: sort === 'mostpopular' }" @click="selectSort('mostpopular')">most popular</li>
          <li v-bind:class="{ on: sort === 'mostrelevant' }" @click="selectSort('mostrelevant')">most relevant</li>
        </ul>
      </div>
      <div class="filter searchmenu__space">
        <h3>filter</h3>
        <ul>
          <li>start date</li>
          <li>end date</li>
          <li>specific user</li>
          <li>popularity</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMenu",
  data: function() {
    return {
      sort: 'newest',
      checkedCats: []
    }
  },
  methods: {
    selectSort: function(sortType) {
      this.sort = sortType;
    }
  }
}
</script>

<style lang="scss" scoped>
.on {
  color: white;
  cursor: default;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-family: 'Flaco';
  font-size: 1rem;
}

li {
  margin-top: .3rem;
  color: #B2B2B2;
  cursor: pointer;
}



.checkboxes {
  margin-top: 36px;
}


input[type=checkbox] + label {
  display: block;
  cursor: pointer;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  font-size: 10px;
  border: 0.1em solid white;
  display: inline-block;
  width: 10px;
  height: 10px;
  // padding-left: 0.2em;
  // padding-bottom: 1em;
  padding: 2px;
  margin-right: 12px;
  vertical-align: bottom;
  color: transparent;
}

input[type=checkbox]:checked + label:before {
  background-color: white;
  border-color: white;
  color: #fff;
}




label {
  margin-left: .3rem;
  font-family: 'Flaco';
  font-size: 1rem;
  margin-top: -.9rem;
  color: #B2B2B2;
}

input:checked + label {
  color: white;
}

.searchmenu {
  width: 100vw;
  height: 500px;
  z-index: 50;
  background: black;
  position: fixed;
  margin-left: -2rem;
  margin-top: -2rem;
  padding: 4rem 2rem;
}

.searchmenu__space {
  padding: 1.5rem 1rem;
}

h3 {
  color: white;
  font-family: 'Gil';
  font-weight: 100;
  font-size: 1.25rem;
}

.container {
  /* width: 100px; */
  height: 500px;
  /* background: orange; */
  display: flex;
}

.search {
  width: 24rem;
  height: 500px;
}

.categories {
  width: 15rem;
  height: 500px;
}

.sort {
  width: 15rem;
  height: 500px;
}

.filter {
  width: 15rem;
  height: 500px;
}
</style>