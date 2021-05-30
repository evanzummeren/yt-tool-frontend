<template>
  <div class="newsletter__bar">
    <span>
    <p class="newsletter__firstline">We have many new features coming up these next months.</p>
    </span>
    <div class="newsletter__secondline" v-if="!result">
      Join our newsletter to get notified

      <form
      class="newsletter__form"
      @submit="joinNewsletter"
      >
      <input v-model="email" type="email" placeholder="email@email.com">
      <button class="searchbutton">Join</button>

        </form>
    </div>

    <div class="newsletter__secondline" v-if="result">
      Thank you
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import axios from 'axios';

export default {
  name: 'Newsletter',
  data() {
    return {
      email: "",
      result: false
    }
  },
  mounted() {
    anime({
      targets: '.newsletter__firstline',
      opacity: ['1', '0'],
      easing: 'easeInOutQuad',
      complete: function() {
        document.querySelector('.newsletter__firstline').style.display = 'none';
      },
      delay: 3000
    });
  },
  methods: {
    joinNewsletter(e) {
      e.preventDefault()

      axios.post('https://y1yd1oyc37.execute-api.us-east-1.amazonaws.com/submitEmail', {
        "email": this.email,
        "activated": false,
        "newsletter": true
      })
      .then(() => {
        this.result = true;
        
      }, (error) => {
        console.log(error);
      });

    }
  }

}
</script>

<style scoped>
.newsletter__bar {
  height: 3rem;
  width: 50rem;
  position: fixed;
  bottom: 0;
  background: #C4C4C4;
  z-index: 100000;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

p, .newsletter__secondline {
  font-family: 'Flaco-mono';
  font-size: .8rem;
  line-height: 1.5rem;
}

.newsletter__secondline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 3rem;
}

input, select, button {
  outline: none;
  -webkit-appearance: none; 
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

input {
  background-image: url("../assets/icons/email.svg");
  background-position: 3px 2px;
  background-size: 16px;
  background-repeat: no-repeat;
  border-bottom: 1px solid #2F2F2F;
  font-family: "Flaco";
  font-size: .8rem;
  padding-left: 1.75rem;
  width: 12rem;
  color: black;
  margin-left: 1rem;
}

select {
  border-bottom: 1px solid #2F2F2F;
  font-family: "Flaco";
  font-size: .8rem;
  margin-left: 1rem;
  margin-top: 1px;
}

.searchbutton {
  border-bottom: 1px solid #2F2F2F;
  font-family: "Flaco";
  font-size: .8rem;
  margin-left: 1rem;
  margin-top: 1px;
  padding: .3rem .6rem;
  background-color: #383838;
  color: #a9a9a9;
  cursor: pointer;
}

.searchbutton:hover {
  background-color: #1A1A1A;
}
</style>