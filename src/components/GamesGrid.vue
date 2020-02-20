<template>
  <v-container class="all">
    <v-container>
      <div v-if="getGamePlayerId.length != 0">
        <!--------------------------------------container with players in game------------------------------>
        <v-container fluid style="width:1400px">
          <div class="infbox">
            <div>
              <div style="font:bold 20px cursive ;color:#FF5252 " class="oponent">
                <h2 class="toolbar">You({{ getGamePlayerId.game.players_in_game[0].player.player }})</h2>
              </div>
            </div>
            <span style="margin-left:470px " class="vs">
              <h2 class="toolbar" style="position:absolute;margin-left:-35px">VS</h2>
            </span>
          </div>
          <div
            style="font:bold 20px cursive ;color:#FF5252 "
            v-if="getGamePlayerId.game.players_in_game.length > 1"
          >
            <h2
              class="toolbar"
            >Opponent: {{ getGamePlayerId.game.players_in_game[1].player.player }}</h2>
          </div>
          <div style="font:bold 20px cursive ;color:#FF5252 " v-else>
            <h2 class="toolbar">Waiting For Opponent In Game</h2>
          </div>
        </v-container>
        <!--------------------------------------container to show when game ends--------------------------------------------------->
        <v-spacer />
        <v-spacer />
        <v-spacer />
        <v-spacer />

        <div v-if='getGamePlayerId.status.state=="Win "'>
          {{fireSound(require('../assets/winnerGiggle.mp3'))}}
          <img
            class="imgState"
            src="../assets/winner.webp"
          />
          <h1 class="state">You Win....well done Homie!!!</h1>
          <router-link to="/">
            <div>
              <v-img class="homy" style="z-index:1;margin-left:690px" src="../assets/homy.png" />
            </div>
          </router-link>
        </div>

        <div v-else-if='getGamePlayerId.status.state=="Game Over"'>
          {{fireSound(require('../assets/loserCrying.mp3'))}}
          <img
            class="imgState"
            src="../assets/loser.gif"
          />
          <h1 class="state">You have Lost......Loooooooooser!!!!!</h1>
          <router-link to="/">
            <div>
              <v-img class="homy" style="z-index:1;margin-left:690px" src="../assets/homy.png" />
            </div>
          </router-link>
        </div>

        <div v-else-if='getGamePlayerId.status.state=="Draw"'>
          <img class="imgState" src="../assets/noWinners.gif" />
          <h1 class="state">Congrats Soldiers...Good Battle....No Winners!!!</h1>
          <router-link to="/">
            <div>
              <v-img class="homy" style="z-index:1;margin-left:690px" src="../assets/homy.png" />
            </div>
          </router-link>
        </div>
        <!--------------------------------------container to show if game hasn't ended--------------------------------------------------->
        <div v-else>
          <div class="containerX">
            <v-container fluid style="width :100px;position:absolute">
              <!---------------------v-app for tool tip and log of shoots and turns------------------------------>
              <v-app
                style="background-color:transparent;position:absolute;margin-top:-100px;height:100px;margin-left:10px"
              >
                <v-menu>
                  <template v-slot:activator="{ on: menu }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          large
                          color="#FF5252"
                          style="font-family:cursive;"
                          dark
                          v-on="{ ...tooltip, ...menu }"
                        >Battle Log</v-btn>
                      </template>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item v-for="(salvos, index) in getGamePlayerId.mySalvo" :key="index">
                      <v-list-item-title style="font-size:10px">Turn:{{ salvos.turn }}</v-list-item-title>
                      <v-list-item-title
                        style="font-size:10px"
                        v-for="(targeted,j) in salvos.hitOnTarget"
                        :key="j"
                      >Hits: {{targeted.length}}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app>
            </v-container>
            <!---------------------containers of turn per shoot----------------------->
            <div v-if="getGamePlayerId.mySalvo.length" class="myTurnshots">
              <h3>Your Turn</h3>
              <h3>{{getGamePlayerId.mySalvo.length}}</h3>
            </div>
            <div v-if="getGamePlayerId.mySalvo.length" class="myTurnshotsOpp">
              <h3>Opponent's Turn</h3>
              <h3>{{getGamePlayerId.oppSalvo.length}}</h3>
            </div>

            <!---------------------hoome button in image------------------------------>
            <router-link to="/">
              <div>
                <v-img class="homy" style="z-index:1" src="../assets/homy.png" />
              </div>
            </router-link>
            <!---------------------placing ships container------------------------------>
            <div class="container">
              <div class="boxShips">
                <div class="grid-container" v-for="numbers in rows" :key="numbers">{{ numbers }}</div>
                <div v-for="letras in columns" :key="letras">
                  <div v-bind:id="id" @dragover.prevent @drop.prevent="dropShip">
                    <div
                      v-bind:id="letras + numbers"
                      class="grid-container"
                      v-for="(numbers, i) in rows"
                      :key="letras + numbers"
                    >
                      <span class="item" style="color:white" v-if="i === 0">{{ letras }}</span>
                      <!-- {{ letras+numbers}}  -->
                    </div>
                  </div>
                </div>
              </div>
              <v-spacer></v-spacer>
              <!---------------------sunk ships log container------------------------------>
              <div class="boxShipsStatus">
                <div>
                  <h6 style="font-size:12px;font-family:cursive;" class="toolbar">Destroyed Ships</h6>
                  <tr v-for="(ships,index) in destroyedShipBox" :key="index">
                    <div class="detrShipsContainer">
                      <td style="font-size:14px">{{ships}}</td>
                      <div v-for="(links,index1) in destroyedShipBoximages" :key="index1">
                        <img class="destroyedShips" :src="links.src" v-if="links.type==ships" />
                      </div>
                    </div>
                  </tr>
                </div>
              </div>
              <!---------------------salvos container------------------------------>
              <div class="boxSalvoes">
                <div
                  class="grid-container1"
                  v-for="numbersSalv in rows"
                  :key="numbersSalv"
                >{{ numbersSalv }}</div>
                <div>
                  <div v-for="letrasSalv in columns" :key="letrasSalv">
                    <div>
                      <div
                        v-bind:id="letrasSalv + numbersSalv + 'Salvoes'"
                        class="grid-container1"
                        v-for="(numbersSalv, i) in rows"
                        :key="letrasSalv + numbersSalv"
                        @click="triggerer(letrasSalv + numbersSalv)"
                      >
                        <span class="item1" style="color:white" v-if="i === 0">{{ letrasSalv }}</span>
                        <!-- {{ letrasSalv + numbersSalv }} -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-------------------------v-dialogs container------------------------------------>
          <div class="text-center">
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="#FF5252" dark>
                <v-img src="../assets/nonono.webp" alt="no" />
                <v-card-text>
                  Careful , dont crash with your own crew!!!
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialogWrongTarget" hide-overlay persistent width="300">
              <v-card color="#FF5252" dark>
                <v-img src="../assets/nonono.webp" alt="no" />
                <v-card-text>
                  You can't shoot over this area is banned!!!
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialogNotGood" hide-overlay persistent width="300">
              <v-card color="#FF5252" dark>
                <v-img src="../assets/notGood.gif" alt="no" />
                <v-card-text>
                  You can't move a ship....is an order!!!d!!!
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialogMissile" hide-overlay persistent width="300" height="100">
              <v-card color="#FF5252" dark>
                <v-card-text>
                  You can't shoot missiles now!!!
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div>
            <v-dialog
              style="position:absolute; margin-left:200px;"
              class="text-center1"
              v-model="dialogShotAllready"
              hide-overlay
              persistent
              width="300"
              height="100"
            >
              <v-card>
                <v-img style="width:90px;height:90px;" src="../assets/banned.png" />

                <v-progress-linear indeterminate color="#FF5252" class="mb-0"></v-progress-linear>
              </v-card>
            </v-dialog>
          </div>
          <!--------------------container of all ships images both vertical and horizontal------------------------------>
          <v-container class="shipContainers" v-if="getGamePlayerId.ship.length!=5">
            <h2 class="toolbar" style="font-family:cursive;">My Fleet</h2>
            <v-spacer />
            <div>
              <div class="containerShips toolbar">
                <div
                  :class="shipOrientations['PatrolBoat']?'PatrolBoatHorizontal':'PatrolBoatVertical'"
                  src="../assets/patrolBoatHorizontalView.png"
                  id="tester1"
                  class="drag2"
                  data-ship-length="2"
                  data-ship-type="PatrolBoat"
                  :draggable="true"
                  @dragstart="dragStart"
                  @dragover.stop
                  @click="drawShip($event, 'PatrolBoat')"
                />
                <div
                  :class="shipOrientations['Destroyer']?'DestroyerHorizontal':'DestroyerVertical'"
                  id="tester3 visibility"
                  class="drag3"
                  src="../assets/destroyerHorizontalView.png"
                  :draggable="true"
                  data-ship-length="3"
                  data-ship-type="Destroyer"
                  @dragstart="dragStart"
                  @dragover.stop
                  @click="drawShip($event, 'Destroyer')"
                />
                <div
                  :class="shipOrientations['Submarine']?'SubmarineHorizontal':'SubmarineVertical'"
                  id="tester9"
                  class="drag3"
                  src="../assets/submarineHorizontalView.png"
                  :draggable="true"
                  data-ship-length="3"
                  data-ship-type="Submarine"
                  @dragstart="dragStart"
                  @dragover.stop
                  @click="drawShip($event, 'Submarine')"
                />
                <div
                  :class="shipOrientations['BattleShip']?'BattleShipHorizontal':'BattleShipVertical'"
                  id="tester7"
                  class="drag4"
                  src="../assets/battleshipHorizontalView.png"
                  :draggable="true"
                  data-ship-length="4"
                  data-ship-type="BattleShip"
                  @dragstart="dragStart"
                  @dragover.stop
                  @click="drawShip($event, 'BattleShip')"
                />
                <div
                  :class="shipOrientations['Carrier']?'CarrierHorizontal':'CarrierVertical'"
                  id="tester5"
                  class="drag5"
                  src="../assets/carrierHorizontalView.png"
                  :draggable="true"
                  data-ship-length="5"
                  data-ship-type="Carrier"
                  @dragstart="dragStart"
                  @dragover.stop
                  @click="drawShip($event, 'Carrier')"
                />
              </div>
              <div></div>
            </div>
          </v-container>
          <!---------------------containers of controls to shoot and place ships---------------------------->
          <v-container class="controls" fluid height="100px">
            <div class="fireMissile" v-if="getGamePlayerId && getGamePlayerId.ship.length==5">
              <div class="buttonContainer">
                <div
                  v-if='shootToPositions.length!=5||getGamePlayerId.status.state=="Waiting for opponent in game"||
            getGamePlayerId.status.state=="Welcome to game,Waiting for opponent to place ships"||getGamePlayerId.oppSalvo.length<getGamePlayerId.mySalvo.length'
                >
                  <div
                    class="upper1"
                    @click.prevent="firesoundBannedMissile(require('@/assets/banned.mp3'))"
                  >
                    <img src="../assets/upperLaunch.png" style="width:50%;height:50%" alt="launch" />
                  </div>
                  <div class="down">
                    <img src="../assets/downLaunch.png" style="width:50%;height:50%" alt="launch" />
                  </div>
                </div>
                <div v-else>
                  <div
                    class="upper"
                    :disabled='shootToPositions.length!=5||getGamePlayerId.status.state=="Waiting for opponent in game"||
            getGamePlayerId.status.state=="Welcome to game,Waiting for opponent to place ships"||getGamePlayerId.oppSalvo.length<getGamePlayerId.mySalvo.length'
                    @click="putSalvos"
                    @click.prevent="fireSound(require('@/assets/firemissile.mp3'))"
                  >
                    <img src="../assets/upperLaunch.png" style="width:50%;height:50%" alt="launch" />
                  </div>
                  <div class="down">
                    <img src="../assets/downLaunch.png" style="width:50%;height:50%" alt="launch" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="getGamePlayerId ">
              <v-btn
                class="button"
                :disabled="getGamePlayerId.ship.length==5"
                style="background-color:#FF5252;color:white;font-family:cursive;"
                @click="putShips"
              >Play</v-btn>
            </div>
          </v-container>
        </div>
      </div>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "GamesGrid",
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  props: ["gamePlayerId", "id"],
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      dialog: false,
      dialogWrongTarget: false,
      dialogNotGood: false,
      dialogMissile: false,
      dialogShotAllready: false, ///////para los diferentes v-dialogs que surjen por movimientos incorrectos

      draggable: true,
      positionShips: [],
      opponentShots: [],

      destroyedShipBox: [], //////para el log de las naves destruidas

      destroyedShipBoximages: [
        ///////para el loop sobre las imgagenes aponer en el destroyed shipBox
        {
          type: "PatrolBoat",
          src: require("../assets/patrolBoatHorizontalView.png")
        },
        {
          type: "Submarine",
          src: require("../assets/submarineHorizontalView.png")
        },
        {
          type: "BattleShip",
          src: require("../assets/battleshipHorizontalView.png")
        },
        {
          type: "Carrier",
          src: require("../assets/carrierHorizontalView.png")
        },
        {
          type: "Destroyer",
          src: require("../assets/destroyerHorizontalView.png")
        }
      ],

      currentShipPosition: [],

      fetchInterval: null, ////////timer para el watcher de los set intervals

      counter: 0, ////////counter para el drawship y el orientation contando en dependencia de la funcion

      myArrayEx: [],

      shipOrientations: {
        /////objetos del determinando el orientation del ship segun la imagen
        Destroyer: true,
        PatrolBoat: true,
        Submarine: true,
        BattleShip: true,
        Carrier: true
      },

      shipsToSendBackEnd: [
        /////objetos que se envia al backend con las naves previamente ya puestas
        { typeShip: "Destroyer", shipPositions: [] },
        { typeShip: "Submarine", shipPositions: [] },
        { typeShip: "PatrolBoat", shipPositions: [] },
        { typeShip: "Carrier", shipPositions: [] },
        { typeShip: "BattleShip", shipPositions: [] }
      ],

      shootToPositions: [], /////array en donde se almacenan los disparos hechos para despues enviarse al backend

      rows: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      columns: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] //arrays para conformar los grids en donde se
      ///posicionaran las naves y salvos
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions([
      "fetchingGamePlayerId",
      "getPlacedShipsGamePlayer",
      "getPlacedShotsGamePlayer"
    ]),

    putShips() {
      this.$store.dispatch("getPlacedShipsGamePlayer", {
        gamePlayerId: this.gamePlayerId,
        ships: this.shipsToSendBackEnd
      });
      this.placeShipsOrder = false;
      console.log(this.shipsToSendBackEnd);
      console.log(this.placeShipsOrder);
    },
    ////////////////////////////////////////////////////////////////////////////////////////////
    putSalvos() {
      this.$store.dispatch("getPlacedShotsGamePlayer", {
        gamePlayerId: this.gamePlayerId,
        salvos: this.shootToPositions
      });
      if (!this.error) {
        return (this.shootToPositions = []);
      } else {
        console.log("error");
        return this.shootToPositions;
      }

      console.log(this.shootToPositions);
    },
    /////////////////////////////////////////////////////////////////
    fireSound(sound) {
      if (sound) {
        let audio = new Audio(sound);
        audio.play();
      }
    },
    firesoundBannedMissile(sound) {
      if (sound) {
        let audio = new Audio(sound);
        audio.play();
      }
      this.dialogMissile = true;
    },
    fireSound1(sound) {
      if (sound) {
        let audio = new Audio(sound);
        audio.play();
        audio.loop;
        audio.volume = 0.5;
      }
    },
    //////////////////////////////////////////////////////////////////////////////
    reloader() {
      return location.reload();
    },
    /////////////////////////////////////////////////////////////////////////////////
    arrayShipsIncluder(ship_id, target) {
      let myShipArray = [];
      let equalizer = true;
      const myShip = document.getElementById(ship_id);
      let letterId = target.id.substring(0, 1);
      let numberId = Number(target.id.substring(1));

      console.log(myShip);

      for (let i = this.counter; i < myShip.dataset.shipLength; i++) {
        if (this.shipOrientations[myShip.dataset.shipType]) {
          myShipArray.push(letterId + (numberId + i));
        } else if (!this.shipOrientations[myShip.dataset.shipType]) {
          myShipArray.push(
            String.fromCharCode(letterId.charCodeAt(0) + i) + numberId
          );
        }
      }

      this.shipsToSendBackEnd.forEach(ship => {
        ship.shipPositions.forEach(location => {
          if (myShipArray.includes(location)) {
            console.log(ship.typeShip, location);
            console.log("cant turn this ship");
            this.dialog = true;
            equalizer = false;
            this.fireSound1(require("@/assets/banned.mp3"));
          }
        });
      });
      return equalizer;
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////
    dropShip(e) {
      const ship_id = e.dataTransfer.getData("ship_id");
      const ship = document.getElementById(ship_id);
      let target = e.target;
      let previousLoc = [];

      this.shipsToSendBackEnd.forEach(shipSent => {
        if (shipSent.typeShip == ship.dataset.shipType) {
          previousLoc = shipSent.shipPositions;
          shipSent.shipPositions = [];
        }
      });

      document.getElementById(ship_id).classList.add("visibility");

      if (this.arrayShipsIncluder(ship_id, target)) {
        this.conditionals(ship_id, target); ///importado como condicionales de orientation y demas
      } else {
        let shipi = (this.shipsToSendBackEnd.find(
          shipSent => shipSent.typeShip == ship.dataset.shipType
        ).shipPositions = previousLoc);
        console.log("sorry you can't drop here", shipi);
        this.dialog = true;
        this.fireSound1(require("@/assets/banned.mp3"));
      }
    },
    ///////////////////////////////////////////////////////////////////////////
    conditionals(ship_id, target) {
      const myShip = document.getElementById(ship_id);
      let letterId = target.id.substring(0, 1);
      let numberId = Number(target.id.substring(1));

      if (
        (numberId != 0 &&
          Number(myShip.dataset.shipLength) + numberId < 12 &&
          this.shipOrientations[myShip.dataset.shipType]) ||
        (numberId != 0 &&
          Number(myShip.dataset.shipLength) + letterId.charCodeAt(0) < 76 &&
          !this.shipOrientations[myShip.dataset.shipType])
      ) {
        myShip.style.position = "absolute";
        myShip.style.display = "block";
        target.appendChild(myShip); ///adhiere la nave al place donde se posiciona la misma

        this.orientationShips(ship_id, target);
      } else {
        this.dialog = true;
        console.log("sorry you cant place it");
        this.fireSound1(require("@/assets/banned.mp3"));
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    dragStart(e) {
      if (this.positionShips.length == 0) {
        const target = e.target;
        this.counter = 0;

        e.dataTransfer.setData("ship_id", target.id);

        document.getElementById(target.id).classList.remove("visibility");

        // setTimeout(() => {
        //   target.style.display = "none";
        // }, 1);
      } else {
        console.log("cant move the float anymore");
        this.draggable = false;
        this.dialogNotGood = true;
        this.fireSound1(require("@/assets/banned.mp3"));
      }
    },
    ///////////////////////////////////////////////////////////////////////////////
    orientationShips(ship_id, target) {
      const myShip = document.getElementById(ship_id);
      let letterId = target.id.substring(0, 1);
      let numberId = Number(target.id.substring(1));
      let newShipLoc = [];

      if (this.shipOrientations[myShip.dataset.shipType]) {
        for (let i = 0; i < myShip.dataset.shipLength; i++) {
          newShipLoc.push(letterId + (numberId + i));
          console.log("horizontal");
        }
      } else {
        for (let j = 0; j < myShip.dataset.shipLength; j++) {
          newShipLoc.push(
            String.fromCharCode(letterId.charCodeAt(0) + j) + numberId
          );
          console.log("vertical");
        }
      }
      console.log(newShipLoc);
      this.shipsToSendBackEnd.forEach(shipToSend => {
        if (shipToSend.typeShip == myShip.dataset.shipType) {
          shipToSend.shipPositions = newShipLoc;
        }
      });
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    drawShip(event, name) {
      this.counter = 1;
      let target = event.target.offsetParent;
      let letterId = target.id.substring(0, 1);
      let numberId = Number(target.id.substring(1));
      const ship_id = event.target.id;
      const myShip = document.getElementById(ship_id);

      if (
        (numberId + Number(myShip.dataset.shipLength) < 12 &&
          !this.shipOrientations[myShip.dataset.shipType]) ||
        (letterId.charCodeAt(0) + Number(myShip.dataset.shipLength) < 76 &&
          this.shipOrientations[myShip.dataset.shipType])
      ) {
        this.shipOrientations[name] = !this.shipOrientations[name];

        if (this.arrayShipsIncluder(ship_id, target)) {
          this.conditionals(ship_id, target);
        } else {
          this.shipOrientations[name] = !this.shipOrientations[name];
          document.getElementById(myShip).classList.add("visibility");
        }
      } else {
        this.fireSound1(require("@/assets/banned.mp3"));
        console.log("sorry cant turn it on click this ship");
        this.dialog = true;
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    triggerer(cell) {
      if (document.getElementById(cell + "Salvoes").id.length > 8) {
        ////este length mayor que 8 es la sumatoria de la primera letra y la palabra salvos
       

        if (this.getUserLogged != null || this.getUserLogged != undefined) {
          if (
            document
              .getElementById(cell + "Salvoes")
              .classList.contains("missSalvos")
          ) {
            this.dialogShotAllready = true;
            this.fireSound1(require("@/assets/banned.mp3"));
            console.log("Sorry you already shot to these coordenates");
          } else {
            if (this.shootToPositions.includes(cell)) {
              this.shootToPositions.splice(
                this.shootToPositions.indexOf(cell),
                1
              );
              document
                .getElementById(cell + "Salvoes")
                .classList.remove("shots");
            } else {
              this.shootToPositions.push(cell);
              document.getElementById(cell + "Salvoes").classList.add("shots");
            }
          }
        } else {
          console.log("User not identified");
        }
      } else {
        this.dialogWrongTarget = true;
        this.fireSound1(require("@/assets/banned.mp3"));
      }
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters([
      "getGamePlayerId",
      "getPlayerInfo",
      "getUserLogged",
      "getErrors"
    ]),

    error() {
      return this.getErrors;
    }
    //vease que aunque no se ha inicializado ninguna variable de computo , es necesario inicilaizar
    //los getters que son utilizados por instancias dentro del codigo como por el ejemplo los watchers
    //y templates dentro del html
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.fetchingGamePlayerId(this.gamePlayerId);

    this.fetchInterval = setInterval(() => {
      this.fetchingGamePlayerId(this.gamePlayerId);
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.fetchInterval);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 2000);
    }, ///return the pop up dialogo falso
    dialogNotGood(val) {
      if (!val) return;
      setTimeout(() => (this.dialogNotGood = false), 2000);
    }, ///return the pop up dialogo falso
    dialogMissile(val) {
      if (!val) return;
      setTimeout(() => (this.dialogMissile = false), 3000);
    }, ///return the pop up dialogo falso
    dialogShotAllready(val) {
      if (!val) return;
      setTimeout(() => (this.dialogShotAllready = false), 1000);
    }, ///return the pop up dialogo falso
    dialogWrongTarget(val) {
      if (!val) return;
      setTimeout(() => (this.dialogWrongTarget = false), 2000);
    }, ///return the pop up dialogo falso
    //////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    getGamePlayerId() {
      const status = this.getGamePlayerId.status.state;
      console.log(status);
      if (
        this.getGamePlayerId.status.state == "Win " ||
        this.getGamePlayerId.status.state == "Game Over" ||
        this.getGamePlayerId.status.state == "Draw"
      ) {
        clearInterval(this.fetchInterval);
      }

      setTimeout(() => {
        for (let i = 0; i < this.getGamePlayerId.ship.length; i++) {
          let shipLocation = this.getGamePlayerId.ship[i].ship_location;
          let shipColor = this.getGamePlayerId.ship[i].ship_Type;
          console.log(shipLocation);
          console.log(shipColor);
          //vease que este primer for es hecho para determinar a traves de  acceder al getter 'getGamePlayerId', el objeto
          //json, especificamente el apartado ship en donde eventualmente nos daria detalles de la nave como , como son
          //las coordenadas de su localizacion en el grid y el tipo de nave en si , vease que ambos datos se igualan a variables
          //locales que posteriormente seran usadas shipLocation y shipColor especificamente , las cuales acceden dentro
          //del objeto antes mencionado a los apartados de localizacion y tipo de nave(ship_location y ship_type),elementos
          //que se utilizaran para marcar enfatizar o desarrollar elementos dentro del juego.

          //  if (shipLocation[0][0] == shipLocation[1][0] && i==0) {
          //     console.log("horizontal");
          //     document.getElementById(shipLocation[i]).innerHTML = "";
          //      var x=document.createElement("img");
          //       var images = require.context('../assets/')
          //      x.setAttribute("src", images('./' +  +"HorizontalView" + ".png"));
          //      x.setAttribute("width", "100");
          //      x.setAttribute("height", "40");
          //      x.style.zIndex =3
          //     document.getElementById(shipLocation[i]).appendChild(x).style.position='absolute'

          //   }else if (shipLocation[0][0] != shipLocation[1][0] && i==0) {
          //     console.log("vertical");
          // }

          for (let j = 0; j < shipLocation.length; j++) {
            document
              .getElementById(shipLocation[j])
              .classList.add(shipColor.replace(/\s/g, ""));
            this.positionShips.push(shipLocation[j]);
            if (shipLocation[0]) {
            }
            console.log(this.positionShips);
          }
        }
        //Vease que para este segundo for nested dentro del primero se procede entonces teniendo en cuenta la variable
        //creada shiplocation a loopear sobre su length para entonces por cada vuelta tomar su id para esa posicion ,
        //previemente expuesto en el html y proceder a adicionar un metodo classlist que accederia a un clase en css
        //a la cual previamente se le asigna un nombre que deberia ser coincidente  con la variable creada a partir
        //del acceso al apratado ship_Type dentro del json llamada shipColor, en donde segun el tipo de nave ,
        //su color seria distinto dentro del grid dandosele formato o color a ese grid identificado con id para el html
        // y coincidente con el shiplocation;ademas de hacer un push a la variable global positionShips de dicha
        // posicion para la vuelta del loop en su index para ese momento,arrojandose entonces como resultado final
        // una serie de celdas pintadas que representarian la posicion de la nave
        for (let i = 0; i < this.getGamePlayerId.mySalvo.length; i++) {
          let myShotsTo = this.getGamePlayerId.mySalvo[i].shootingstoPosition; //posiciones de mis disparos
          let myTurnOfShot = this.getGamePlayerId.mySalvo[i].turn; //turno en el que disparo
          let myShotsInTarget = this.getGamePlayerId.mySalvo[i].hitOnTarget; //de mis disparos cuakes dieron en el blanco
          let arrayT = [];

          console.log(arrayT);
          console.log(myShotsInTarget);
          console.log(myShotsTo);

          // console.log(myShotsTo);
          // console.log(myShotsHit);
          //Al igual que en el primer proceso este segundo seria parecido, accediendose al apartado de mySalvos  mediante,
          //acceso al objeto json obtenido del getter 'getGamePlayerId', y estableciendose un loop sobre su length, primero
          //se iniciarian dos variables locales a las cuales se les asignaria a traves de dicho getter el elemento o
          //array shhottingToPositions segun la vuelta pa el index en ese momento, obteniendose como resultado un array de //
          //posiciones coincidentes con cualesquiera las celdas en el grid , las cuales representarian los disparos hechos
          //la segunda variable local inicializada tendria el mismo valor que la primera pues se accederia al mismo componente
          //dentro del json, lo unico que cambiaria seria su nombre pue en este caso dichas variables encerraran las posiciones
          //de dsparos efectuados que dieron en cualesquier alos barcos del grid oponente
          for (let j = 0; j < myShotsTo.length; j++) {
            document
              .getElementById(myShotsTo[j] + "Salvoes")
              .classList.add("shotsalvos");

            for (let key in myShotsInTarget) {
              console.log(key); //dinamica , pues el nombre del objeto es un string de numero de manera ascendente

              console.log(myShotsInTarget[key]);
              myShotsInTarget[key].forEach(hit => {
                console.log(document.getElementById(hit + "Salvoes"));
                arrayT.push(hit);

                document
                  .getElementById(myShotsTo[j] + "Salvoes")
                  .classList.remove("shotsalvos");

                document
                  .getElementById(hit + "Salvoes")
                  .classList.add("hitTarget");
              });
              if (
                !document
                  .getElementById(myShotsTo[j] + "Salvoes")
                  .classList.contains("hitTarget")
              ) {
                document
                  .getElementById(myShotsTo[j] + "Salvoes")
                  .classList.remove("shotsalvos");
                document
                  .getElementById(myShotsTo[j] + "Salvoes")
                  .classList.remove("shots");
                document
                  .getElementById(myShotsTo[j] + "Salvoes")
                  .classList.add("missSalvos");
              }
            }
          }
        }
        //vease entonces que en este segundo for nested dentro del primero entonces se procederia al igual que en el primer
        //caso a acceder a desde la variable local previamente inicializada myShotsTo, la cual se le asigna un componente
        //dentro del json (el cual seria una array de posiciones de los disparos hechos) , y mediante un bucle sobre su lenght
        //se accederia al id de igual denominacion establecido en el html para los grids  y que en caso de ser coincidente
        //con las posiciones de este array de disparo se le asignaria cierto estilo, color y demas.
        //Vease que se adiciona el string  "salvoes", pues en el html se hace lo mismo , para diferencia los grids de posi
        //conamientos de las naves de los grids de posicionamentos de los disparos donde la diferencia seria entonces
        //adicionarle a cada id esta palabra , que indique su contenido(salvos)
        if (this.getGamePlayerId.oppSalvo != null) {
          for (let i = 0; i < this.getGamePlayerId.oppSalvo.length; i++) {
            let oppShotFrom = this.getGamePlayerId.oppSalvo[i]
              .shootingstoPosition;
            let oppTurnOfShot = this.getGamePlayerId.oppSalvo[i].turn; //this.getGamePlayerId.oppSalvo[i].shootingstoPosition;
            let oppShotsInTarget = this.getGamePlayerId.oppSalvo[i].hitOnTarget;
            //mismo proceso que los dos anteriores pero en este caso para reflejar los disparos hechos por el oponente al grid
            //en donde el jugador en cuestion tiene las naves emplazadas

            for (let j = 0; j < oppShotFrom.length; j++) {
              document
                .getElementById(oppShotFrom[j])
                .classList.add("shotsalvos");

              for (let key in oppShotsInTarget) {
                oppShotsInTarget[key].forEach(opphit => {
                  document
                    .getElementById(oppShotFrom[j])
                    .classList.remove("shotsalvos");

                  document.getElementById(opphit).classList.add("hitTarget");
                });
                if (
                  !document
                    .getElementById(oppShotFrom[j])
                    .classList.contains("hitTarget")
                ) {
                  document
                    .getElementById(oppShotFrom[j])
                    .classList.remove("shotsalvos");
                  document
                    .getElementById(oppShotFrom[j])
                    .classList.remove("shots");
                  document
                    .getElementById(oppShotFrom[j])
                    .classList.add("missSalvos");
                }
              }
            }
          }
        }
        //mismo proceso del for nested dentro del for al igual que los dos casos anteriores en donde a partir del length
        //de la primera variable se procede a determiar que id denmtro de los grid corrsponde con el de las posiciones
        // que para el index en ese momento en el for se ejecuuta, asignandosele en caso de coincidencia cierto estilo
        //o clase del css , aunque en este y el anterior se prcede directamente desde la funcion a darle estilo y demas.
        //y vease que al igual que en el primer caso se hace un push de dichos salvos a la variable global encargada de almacenar
        //los, en este caso  opponentShots
        if (this.getGamePlayerId.sunk_ships != null) {
          for (let i = 0; i < this.getGamePlayerId.sunk_ships.length; i++) {
            const sunkShips = this.getGamePlayerId.sunk_ships;

            console.log(this.getGamePlayerId.sunk_ships.length);
            console.log(sunkShips);

            sunkShips.forEach(ships =>
              ships.forEach(ship => this.destroyedShipBox.push(ship))
            );
            const remover = setTimeout(() => {
              this.destroyedShipBox = [];
            }, 2500);
          }
        }
        //Vease que desarrollada la logica de los tres primeros elementos , primero determinandose las posiciones de las
        //naves dentro del grid, en donde segun el tipo de nave se le asignaba un color y demas,segundo estableciendose
        //los disparos hechos por el jugador al grid del oponente, y por ultimo la determinacion de los disparos hechos
        //por el oponente al gird del jugador, y con los push de posiciones y disparos del opnente , previemente hechos
        //se procederia a determinar entoncescuales de los disparos hechos por el oponente en efecto hicieron blanco
        // en cualesquiera las naves emplazadas por el jugador.para eso entoces se deberia hacer una comparacion entre
        //el array de posiciones dentro del grid correspondientes a las naves emplazadas, y las posiciones que representan
        //los disparos hechos por el oponente;para esto entonces simplemente se desarrollaria un doble bucle donde primero
        //se evaluaria el index en su posiciondentro del array de shipPositions previamente almacenado mediante push en dicha
        //variable local, y actoseguido  un nested for que evaluaria la posicion del index (j no igual) para los disparos
        //del opnente , en donde entonces se estableceria una condicion que plasmaria que de ser iguales en valor ambas
        //posiciones se procederia a tomar el elemto dentro del html para esa posicion coincidente y se le asignaria un estilo
        //cierto estilo y demas o un classlist que haria referencia a una clase dentro del css que le diese estilo y demas
        //lo cual simplemente daria una nocion de cuales de los disparos hechos por el oponente hicieron blanco en los arrays
        //que encierran posiciones de la naves.
        for (let i = 0; i < this.getGamePlayerId.ship.length; i++) {
          let shipsPlaced = [];
          let shipsToPlace = [];
        }
      }, 0);
    }
  }
};
</script>
<style>
.state {
  position: absolute;
  margin-left: 300px;
  margin-top: 450px;
}
.all {
  z-index: 1;
}
.imgState {
  position: absolute;
  margin-left: 550px;
  margin-top: 150px;
}
.myTurnshotsOpp,
.myTurnshots {
  /* display:flex;
  flex-direction:column; */
  font-size: 2rem;
  position: absolute;
  text-align: center;
  color: white;
}
.myTurnshotsOpp {
  margin-left: 893px;
}
.myTurnshots {
  margin-left: 300px;
}
.leaving {
  position: relative;
  margin-left: 510px;
}
.story {
  display: flex;
  flex-direction: row;
  width: 110px;
  position: relative;
  justify-content: space-between;
}
.vs {
  position: absolute;
  margin-left: 430px;
  margin-top: -20px;
}
.homy {
  position: relative;
  margin-left: 660px;
}
.homy:active {
  transform: translateY(20px);
}
.boxShipsStatus {
  position: absolute;
  margin-left: 0px;
  justify-items: center;
}
.grid-container,
.grid-container1 {
  display: inline-grid;
  border: 3px solid rgba(0, 0, 0, 0.8);
  grid-template-columns: 12px 5px 12px 5px;
  grid-template-rows: 12px 5px 12px 5px;
  font-size: 45px;
  width: 45px;
  height: 45px;
  margin-top: -5px;
  padding-bottom: 13px;
  border-radius: 9px;
  box-shadow: 3px 4px 2px;
  position: relative;
}
.boxShips,
.boxSalvoes {
  border: 16px solid rgba(0, 0, 0, 0.8);
  align-content: center;
  width: auto;
  margin: center;
  display: inline-block;
  border-radius: 7px;
  background-color: rgba(255, 82, 82, 0.3);
  z-index: 1;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  width: 1200px;
}
.shipContainers {
  display: flex;
  flex-direction: column;
  margin-top: -30px;
}
.shutters {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 240px;
  margin-top: -120px;
}
.PatrolBoat {
  background-color: blue;
}
.PatrolBoatHorizontal {
  width: 80px;
  height: 40px;
  /* z-index:1; */
  background-image: url("../assets/patrolBoatHorizontalView.png");
  background-size: cover;
}
.PatrolBoatVertical {
  width: 40px;
  height: 90px;
  margin-right: 3px;
  /* z-index:1; */
  background-image: url("../assets/patrolBoatAboveView.png");
  background-size: cover;
  position: absolute;
}
.DestroyerHorizontal {
  width: 120px;
  height: 40px;
  /* z-index:1; */
  background-image: url("../assets/destroyerHorizontalView.png");
  background-size: cover;
}
.DestroyerVertical {
  width: 40px;
  height: 140px;
  margin-right: 3px;
  background-image: url("../assets/destroyerAboveView.png");
  background-size: cover;
  position: absolute;
  /* z-index:1 */
}
.SubmarineHorizontal {
  width: 120px;
  height: 40px;
  background-image: url("../assets/submarineHorizontalView.png");
  background-size: cover;
}
.SubmarineVertical {
  width: 40px;
  height: 140px;
  margin-right: 3px;
  background-image: url("../assets/submarineAboveView.png");
  background-size: cover;
  position: absolute;
}
.BattleShipHorizontal {
  width: 160px;
  height: 40px;
  background-image: url("../assets/battleshipHorizontalView.png");
  background-size: cover;
}
.BattleShipVertical {
  width: 35px;
  height: 160px;
  background-image: url("../assets/battleshipAboveView.png");
  background-size: cover;
  position: absolute;
  margin-left: -2px;
  margin-top: 13px;
}
.CarrierHorizontal {
  width: 230px;
  height: 40px;
  /* z-index: 1; */
  background-image: url("../assets/carrierHorizontalView.png");
  background-size: cover;
}
.CarrierVertical {
  width: 40px;
  height: 220px;
  background-image: url("../assets/carrierAboveView1.png");
  background-size: cover;
  position: absolute;
}
.drag2,
.drag3,
.drag4,
.drag5 {
  animation-name: swing;
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transform-origin: center -20px;
  float: left;
}
.drag2:after,
.drag3:after,
.drag4:after,
.drag5:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #999;
  top: -10px;
  left: 50%;
  /* z-index: 0; */
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
  transform: translateY(20px);
}
.drag2:before,
.drag3:before,
.drag4:before,
.drag5:before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  top: -14px;
  left: 54%;
  /* z-index: 5; */
  border-radius: 50% 50%;
  background: #000;
}
.drag2:nth-child(1) {
  animation-delay: 0s;
}
.drag3:nth-child(2) {
  animation-delay: 1s;
}
.drag4:nth-child(3) {
  animation-delay: 1.5s;
}
.drag5:nth-child(4) {
  animation-delay: 2s;
}
@keyframes swing {
  0% {
    transform: rotate(5deg);
    transform: translateY(-5px);
  }
  100% {
    transform: rotate(1deg);
  }
}
/* .drag2 {
  width: 90px;
  height: 40px;
  z-index: 1;
} */
.drag2v {
  width: 40px;
  height: 90px;
  z-index: 1;
}
/* .drag3 {
  width: 130px;
  height: 40px;
  z-index: 1;
} */
/* .drag3v {
  width: 40px;
  height: 130px;
  z-index: 1; */
/* } */
/* .drag4 {
  width: 180px;
  height: 40px;
  z-index: 1;
} */
.drag4v {
  width: 40px;
  height: 180px;
  z-index: 1;
}
.salvosMissed {
  background-color: red;
}
/* .drag5 {
  width: 220px;
  height: 40px;
  z-index: 1;
} */
.drag5v {
  width: 40px;
  height: 220px;
  z-index: 1;
}
.controls {
  display: flex;
  flex-basis: row;
  width: 100px;
  margin-left: -100px;
  position: absolute;
  margin-top: 40px;
}
.containerShips {
  display: flex;
  flex-direction: row;
  position: absolute;
  margin-left: -220px;
}
.launcher {
  width: 80px;
  height: 80px;
  margin-left: 28%;
}
.misille {
  transform: rotate(-90deg);
  margin: 15px 0 0 8px;
}
.launcher .misille:hover {
  animation: launching 4s ease-in-out;
}
@keyframes launching {
  0% {
    transform: translateY(0);
    transform: rotate(-90deg);
  }
  50% {
    transform: translateY(-500px);
  }

  100% {
    transform: translateX(800px);
  }
}
.Destroyer {
  background-color: #ff5252;
}
.Carrier {
  background-color: #ff5252;
}
.Submarine {
  background-color: #ff5252;
}
.PatrolBoat {
  background-color: #ff5252;
  /* visibility:visible;
  background-image:url('../assets/battleshipAboveView.png') */
}
.BattleShip {
  background-color: #ff5252;
}
.destroyedShips {
  width: 70px;
  height: 30px;
}
.shots {
  animation: image 2s infinite alternate;
}

@keyframes image {
  0% {
    background-image: url("../assets/sniper1.png");
  }
  100% {
    background-image: url("../assets/sniper2.png");
  }
}

/* .black {
  background-color:black;
} */
.shotsalvos {
  background-color: black;
}
.missSalvos {
  background-image: url("../assets/failTarget.png");
}
.hitTarget {
  animation: flames 1s infinite alternate;
  background-image: url("../assets/flame6.png");
}
@keyframes flames {
  0% {
    background-image: url("../assets/flame4.png");
  }
  25% {
    background-image: url("../assets/flame5.png");
  }
  50% {
    background-image: url("../assets/flame6.png");
  }
  75% {
    background-image: url("../assets/flame2.png");
  }
  100% {
    background-image: url("../assets/flame3.png");
  }
}
.shipDestroyed {
  background-color: yellow;
}
.upper,
.down,
.upper1 {
  position: absolute;
}
.upper,
.upper1 {
  margin-top: 15px;
  z-index: 1;
  cursor: pointer;
  outline: none;
}
.upper:active,
.upper1:active {
  box-shadow: 0 5px #666;
  transform: translateY(6px);
}
.buttonContainer {
  position: absolute;
  width: 200px;
  height: 200px;
  margin-left: 225px;
  margin-top: -70px;
}
.button {
  position: absolute;
  margin-left: 350px;
  margin-top: -20px;
}
.button:active,
.buttonLeave:active {
  transform: translateY(20px);
}
.visibility {
  z-index: 1;
}
</style>
