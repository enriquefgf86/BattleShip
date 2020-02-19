<template>
  <div>
    <div>
      <v-container class="fill-height" fluid>
        <router-link to="/">
          <div>
            <v-img class="homy" style="z-index:1;margin-left:50px" src="../assets/homy.png" />
          </div>
        </router-link>
        <v-row align="center" justify="center">
          <v-col>
            <v-layout>
              <v-simple-table align="center" dark style="width:800px;margin-left:180px;z-index:1">
                <template v-slot:default>
                  <thead style="background-color:#FF5252">
                    <tr>
                      <th style="font-size:20px;color:white">Players</th>
                      <th style="font-size:20px;color:white">Wins</th>
                      <th style="font-size:20px;color:white">Losts</th>
                      <th style="font-size:20px;color:white">Draws</th>
                      <th style="font-size:20px;color:white">Total</th>
                      <th style="font-size:20px;color:white">Poll</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(Players, i) in getTableScores" :key="i">
                      <td style="font-size:20px;font-weight:bold">{{ Players.name }}</td>
                      <td style="font-size:20px;font-weight:bold">{{ Players.win }}</td>
                      <td style="font-size:20px;font-weight:bold">{{ Players.lost }}</td>
                      <td style="font-size:20px;font-weight:bold">{{ Players.draw }}</td>
                      <td style="font-size:20px;font-weight:bold">{{ Players.total }}</td>
                      <td>
                        <img v-if="poll+i==3" src="../assets/bronze.svg" width="30px" heigth="30px" />
                        <img v-if="poll+i==1" src="../assets/gold.svg" width="30px" heigth="30px" />
                        <img v-if="poll+i==2" src="../assets/silver.svg" width="30px" heigth="30px" />
                        <img
                          v-else-if="poll+i>=4"
                          src="../assets/sad.svg"
                          width="30px"
                          heigth="30px"
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-layout>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import PlayerScoreInfo from "../components/PlayerScoreInfo.vue";
export default {
  name: "PlayersPoll",
  components: {
    PlayerScoreInfo
  },
  data() {
    return {
      poll: 1
    };
  },
  methods: {
    ...mapActions(["getScoresPlayers"])
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getPlayerInfScores"]),

    getTableScores() {
      let dataPerPlayer = [];
      this.getPlayerInfScores.forEach(playerUnique => {
        console.log(playerUnique.player.player);

        let playerObject = {
          name: playerUnique.player.player,
          win: 0,
          lost: 0,
          draw: 0,
          total: 0
        };
        playerUnique.playerScore.forEach(score => {
          switch (score) {
            case 0.0:
              playerObject.lost = playerObject.lost + 1;
              break;

            case 0.5:
              playerObject.draw = playerObject.draw + 1;
              playerObject.total += score;
              break;

            case 1.0:
              playerObject.win = playerObject.win + 1;
              playerObject.total += score;
              break;

            default:
              break;
          }
        });
        dataPerPlayer.push(playerObject);
      });
      return dataPerPlayer.sort((a, b) => {
        if (a.total < b.total) {
          return 1;
        } else if (a.total > b.total) {
          return -1;
        } else if (a.total == b.total) {
          return a.win + a.lost + a.draw < b.win + b.lost + b.draw;
        }
      });
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.getScoresPlayers();
  }
};
</script>
<style>
.homy {
  width: 80px;
  height: 80px;
  z-index: 2;
}
.homy:active {
  transform: translateY(20px);
}
</style>
