<template>
  <div>
    <h2>MyScores</h2>
    <div v-for="( Players,i ) in getPlayerInfScores" :key="i">
      <div v-for="(PlayersDetail,j) in Players.player" :key="j">
        <h2>Id jugador {{PlayersDetail.player.player}}</h2>
        <h2>Id Score {{Players.playerScore}}</h2>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PlayerScoreInfo",
  methods: {
    ...mapActions(["getScoresPlayers"])
  },
  computed: {
    ...mapGetters(["getPlayerInfScores"])
  },
  created() {
    this.getScoresPlayers();
  }
};
</script>