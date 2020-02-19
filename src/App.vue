<template>
<div id="app">
  <img class='backgroundimg' src='./assets/screen1.jpg' alt='screen1'/>
  <v-container>
      <v-toolbar src="./assets/screen2.jpg">
        <v-toolbar-title>
          <h1 class="orange">
            <span>B</span>
            <span>a</span>
            <span>t</span>
            <span>t</span>
            <span>l</span>
            <span>e</span>
            <span>s</span>
            <span>h</span>
            <span>i</span>
            <span>p</span>
          </h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <h2 style='margin-top:15px;'
            class="toolbar"
            v-if="getGamePlayerId.length!=0 "
          >Welcome {{getGamesAll.player.player}}</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <div v-for="buttons in toolBarButtons" v-bind:key="buttons.title">
              <v-btn 
              
                text
                large
                router
                v-bind:to="buttons.link"
                style="margin-top:15px;background-color:#FF5252;color:white;cursor:pointer;font-family:cursive;"
              >
                <v-icon
                v-bind:to="buttons.link"
                  small
                  id="text0"
                  style="background-color:#FF5252;color:white;cursor:pointer"
                >{{buttons.icon}}</v-icon>
                <v-list
               router:to="buttons.link"
                  id="text1"
                  style="background-color:#FF5252;color:white;cursor:pointer"
                >{{buttons.title}}</v-list>
              </v-btn>
              <v-spacer></v-spacer>
          </div>
        </v-toolbar-items>
      </v-toolbar>

      <router-view />
       <img  class='sound' style='width:80px;height:80px' src='./assets/soundButton.png' @click="fireSound(require('./assets/videoplayback.mp4'))"
   />
    
  </v-container></div>
</template>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sound:false
    };
  },
  ///////////////////////////////////////////////////////////////////////////////////
  methods: {
    fireSound(sound) {
      if (sound) {
        let audio = new Audio(sound);
        audio.play();
      }
    },
    soundTrigger(){
      return this.sound=!this.sound
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters([
      "getGamePlayerId",
      "getPlayerInfo",
      "getUserLogged",
      "getErrors",
      "getGamesAll"
    ]),
    user() {
      return this.$store.getters.getGamePlayerId;
    },
    userLogged() {
      this.$store.getters.getUserLogged;
    },
    
    error() {
      return this.getErrors;
    },
    toolBarButtons() {
      console.log(this.getUserLogged);
      const notSigned = [];
      const signed = [
        { title: "Scores", icon: "mdi-medal-outline", link: "/tablePoll" }
      ];
      if (this.getUserLogged == true) {
        return signed;
      } else {
        return notSigned;
      }
    }
  }
};
</script>

<style>
/* #app{
  height:2000%;
  background-image:url('./assets/screen1.jpg') ;
  background-repeat:no-repeat;

  background-size:auto
} */
.scory{
  width:80px;
  height:80px;
  z-index:2
}
.scory:active
 {
  transform: translateY(20px);
 }
h1{
  color:white;
  font-size:4rem;
  display:flex

}
h1 span{
  animation:animate 2s linear infinite;
}
h1 span:nth-child(1){
   animation-delay: 0s;
}
h1 span:nth-child(2){
   animation-delay: 0.2s;
}
h1 span:nth-child(3){
   animation-delay: 0.4s;
}
h1 span:nth-child(4){
   animation-delay: 0.6s;
}
h1 span:nth-child(5){
   animation-delay: 0.8s;
}
h1 span:nth-child(6){
   animation-delay: 0.9s;
}
h1 span:nth-child(7){
   animation-delay: 1s;
}
h1 span:nth-child(8){
   animation-delay: 1.2s;
}
h1 span:nth-child(9){
   animation-delay: 1.4s;
}
h1 span:nth-child(10){
   animation-delay: 1.6s;
}

@keyframes animate{
  0%{
    color:#FFF;
    filter:blur(4px);
    text-shadow: 
    0 0 10px #00b3ff,
    0 0 20px #00b3ff,
    0 0 40px #00b3ff,
    0 0 80px #00b3ff,
    0 0 120px #00b3ff,
    0 0 200px #00b3ff,
    0 0 300px #00b3ff,
    0 0 400px #00b3ff,
    0 0 500px #00b3ff,
    0 0 600px #00b3ff,
  }
  25%{
    color:#FFF;
    filter:blur(2px);
    text-shadow: none
  }
  75%{
    color:#FFF;
    filter:blur(2px);
    text-shadow: none
  }
  100%{
    color:#FFF;
    filter:blur(4px);
    text-shadow: 
    0 0 10px #00b3ff,
    0 0 20px #00b3ff,
    0 0 40px #00b3ff,
    0 0 80px #00b3ff,
    0 0 120px #00b3ff,
    0 0 200px #00b3ff,
    0 0 300px #00b3ff,
    0 0 400px #00b3ff,
    0 0 500px #00b3ff,
    0 0 600px #00b3ff,
  }
}
.welcomeUser {
  position: relative;
  margin-top: 15px;
  height: 30px;
  margin-left: -690px;
  background-color: #ff5252;
  color: white;
  border-radius: 5px;
  padding-right: 4px;
  padding-left: 4px;
}
.backgroundimg{
  position:absolute;
  margin:0 auto;
  margin-bottom:0px;
  margin-left:0px;
  width:100%;
  height:130%;
  opacity:0.7;
filter:alpha(opacity=40);
}
.sound{
   position:absolute;
   z-index:1;
   margin-top:-10px;
}
.sound:active{
  transform: translateY(10px);
}
</style>