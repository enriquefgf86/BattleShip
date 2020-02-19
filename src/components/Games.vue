<template>
  <v-app v-if="getGamesAll" class="gamesGeneral">
    <!--------------------------------------container with create and log out--------------------------->
    <v-container fluid width="0px" style="margin-left:00px;margin-top:40px">
      <v-btn
        @click="createGame"
        style="margin-top:15px;background-color:#FF5252;color:white;cursor:pointer;font-family:cursive;"
      >Create New Game</v-btn>
      <v-btn
        @click="logOut"
        style="margin-top:15px;background-color:#FF5252;color:white;cursor:pointer;font-family:cursive;"
      >Log Out</v-btn>
    </v-container>
    <!--------------------------------------table card--------------------------------------------------->
    <v-card>
      <v-card-title class="title">
        <h2 class="toolbar" style='font-family:cursive;'>BattleShip</h2>
        <v-spacer></v-spacer>
        <!-- <v-text-field
          class="toolbar white-text"
          color="white"
          v-model="search"
          icon="mdi-search"
          label="Search Player or Game "
          single-line
          hide-details
        /> -->
      </v-card-title>

      <v-simple-table   height="500px"  dark :search="search">
        <template>
          
          <thead class='tableTh'>
            <tr>
              <th style="font-size:20px;color:white;font-family:cursive;" class="text-left">Game#</th>
              <th style="font-size:20px;color:white;font-family:cursive;" class="text-left">Starting Date</th>
              <th class="players">Players in Game</th>
              <th
                style="font-size:20px;color:white;margin-left:-140px;position:relative;font-family:cursive;"
                class="text-left"
              >Permisions</th>
              <th style="font-size:20px;color:white" class="text-left"></th>
            </tr>
          </thead>
         
          <tbody>
            <tr style='font-family:cursive;' v-for="(general, index) in getGamesAll.games" v-bind:key="index">
              <td>Game {{general.id}}:</td>
              <td>{{general.init_date}}</td>
              <h5 style='width:250px;' >
                <td v-for="(gamePlayer,m) in general.players_in_game" :key="m">
                  <div class="liner">
                    <div class="liner1">
                      <h4>{{gamePlayer.player.player}}</h4>
                    </div>
                    <h5 class="vs" v-if="m<1">VS</h5>
                  </div>
                </td>
                <td v-if="general.players_in_game.length==1">Waiting</td>
              </h5>
              <td >
                <h5 class='buttonH' v-for="(gamePlayer,i) in general.players_in_game" :key="i">
                  <v-btn
                    class="buttons"
                    style="background-color:#FF5252;font-family:cursive;"
                    @click="joinTo(general.id),reloader"
                    v-if="general.players_in_game.length==1 && gamePlayer.player.id!==getGamesAll.player.id"
                  >Join..</v-btn>
                  <router-link :to="`/gamesGrid/${gamePlayer.id}`">
                    <v-btn
                      fluid
                      class="buttons"
                      @click="reloader"
                      style="background-color:#FF5252;font-family:cursive;"
                      v-if="gamePlayer.player.id==getGamesAll.player.id"
                    >Enter</v-btn>
                  </router-link>
                </h5>
              </td>
            </tr>
          </tbody>

        </template>
      </v-simple-table>

    </v-card>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Games",
  data() {
    return {
      search: ""
    };
  },
  components: {},
  props: ["gameid"],
  methods: {
    ...mapActions(["fetchingJsonEvents", "joinToGame", "logOut", "createGame"]),
    joinTo(gameid) {
      this.joinToGame(gameid);
    },
    
    /////////////////////////////////////////////////////////////////////////////////////////////
    logOut() {
      this.$store.dispatch("logOut");
            this.reloader();
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////
    createGame() {
      this.$store.dispatch("createGame");
      setTimeout(() => {
        this.reloader();
      }, 2500);
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////
    reloader() {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  computed: {
    ...mapGetters(["getGamesAll", "getUserLogged"]),
    
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.fetchingJsonEvents();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
};
</script>
<style scoped>
.tableTh{
  /* background-image:url('../assets/screen2.jpg'); */
  background-color: #ff5252;
}
 h5 .buttonH{
  text-align: center;
  width:60px;
  margin-left:-50px;
  position:relative;
}
.gamesGeneral {
  height: 700p;
}
.buttons {
  margin-top: 15px;
  background-color: #ff5252;
  color: white;
  cursor: pointer;
  /* margin-left: -200px;
  display: flex; */
}
.vs {
  display: inline-block;
  margin-left: -100px;
  margin-top: 5px;
  position: sticky;
}
.players {
  text-align: center;
  justify-content: center;
  font-size: 20px;
  font-family:cursive;
  color: white;
  display: flex;
  margin-left: 140px;
  margin-top: 7px;
  height: 30px;
  width: 200px;
}
.title {
  background-image: url("../assets/scree2.jpg");
  background-size: cover;
}
.details {
  display: flex;
  flex-direction: row;
  width: 350px;
  align-content: space-between;
  justify-content: space-around;
  font-size: 10px;
  margin-left: 320px;
}
.container {
  margin-left: 500px;
}
.liner {
  display: flex;
  flex-direction: row;
  width: 300px;
  margin-top: 20px;
}
.liner1 {
  position: inline;
  width: 300px;
}
/* .buttons1 {
  display: flex;
  flex-direction: column;
  margin-left: -100px;
} */
</style>
