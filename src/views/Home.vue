<template>
  <v-container class="home">
    <v-container v-if="getUserLogged==true">
      <Games></Games>
    </v-container>
    <v-container v-else fluid style="width:700px;margin-top:-140px;z-index:1">
      <v-btn
        @click="signInTaker"
        class="button glowing-button"
        style="background-color:#FF5252;color:white;margin-left:-250px;margin-top:40px"
      >Yes</v-btn>
      <h2 class="opacity">Are You A Registered Soldier?</h2>
      <v-btn
        @click="signUpTaker"
        class="button glowing-button"
        style="background-color:#FF5252;color:white;margin-left:250px;margin-top:40px"
      >No</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import Games from "../components/Games";
import GameDetail from "../views/GameDetail";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "home",
  components: {
    Games,
    GameDetail
  },
  methods: {
    ...mapActions(["logOut", "createGame"]),
    logIn() {
      return this.$router.push("/login");
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    signUpTaker() {
      return this.$router.push("/signUp");
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    signInTaker() {
      return this.$router.push("/logIn");
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  computed: {
    ...mapGetters(["getUserLogged", "getGamesAll", "getGamePlayerId"]),
    userIsAuth() {
      return this.getUserLogged;
      console.log(this.getUserLogged);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
  }
};
</script>
<style>
.opacity {
  background-color: rgba(255, 82, 82, 0.3);
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-size: 1.9rem;
}
.home {
  height: 800px;
}
.button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgb(145, 92, 182);
  padding: 15px 40px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}
.glowing-button:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
}
</style>
