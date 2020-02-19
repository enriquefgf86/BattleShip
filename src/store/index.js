import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
const url = "https://boiling-gorge-69009.herokuapp.com"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gamesAll: null,
    myGridpositions: [],
    myPlayerInf: [],
    playersList: {},
    userLogged: false,
    errors: null,
  },
  /////////////////////////////////////////////GETTERS/////////////////////////////////////////
  getters: {
    getGamesAll: state => state.gamesAll,
    getGamePlayerId: state => state.myGridpositions,
    getPlayerInfo: state => state.myPlayerInf,
    getPlayerInfScores: state => state.myPlayerInf,
    getUserLogged: state => state.userLogged,
    getErrors: state => state.errors
  },
  ////////////////////////////////////////////MUTATIONS/////////////////////////////////////////////////
  mutations: {
    setGamesjson(state, payload) {
      state.gamesAll = payload;
    },
    GamePlayerId(state, id) {
      state.myGridpositions = id;
    },
    myPlayersInfo(state, info) {
      state.myPlayerInf = info;
    },
    getScoresPlayer(state, playerInfoScores) {
      state.myPlayerInf = playerInfoScores;
    },
    setUserLogged(state, payload) {
      state.userLogged = payload;
    },
    setErrors(state, payload) {
      state.errors = payload
    }
  },
  //////////////////////////////////////////////////ACTIONS////////////////////////////////////////////////
  actions: {
    //-------------------------------------------------------------------------------------------------------//
    fetchingJsonEvents({ commit }) {
      fetch(url + "/api/game", {
        credentials: "include",
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(test => {
          console.log(test);

          commit("setGamesjson", test);
          if (test.player) {
            commit("setUserLogged", true);
          }
          else {
            commit("setUserLogged", false)
          }

        })
        .catch(err => {
          console.log(err);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    fetchingGamePlayerId({ commit }, gamePlayerId) {
      fetch(url+"/api/game_view/" + gamePlayerId, {
        credentials: "include",
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          commit("GamePlayerId", response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    myPlayers({ commit }, actions) {
      return actions.fetchingGamePlayerId.then(response => {
        console.log(response);
        commit("myPlayersInfo", response);
      });
    },
    //-------------------------------------------------------------------------------------------------------//
    getScoresPlayers({ commit }) {
      fetch(url+"/api/game/playerScore", {
        credentials: "include",
        method: "Get"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          commit("getScoresPlayer", response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    logInForm({ commit }, payload) {
      console.log(payload);
      fetch(url+"/api/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: getBody({ name: payload.userName, password: payload.password })
      })
        .then(data => {
          if (data.Error) {
            router.push("/logIn")
            console.log("Request failure: ", data)
            commit("setUserLogged", false);
          }
          else
            console.log("Request success: ", data);
          commit("setUserLogged", true);
          router.push("/");
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },
    //-------------------------------------------------------------------------------------------------------//
    //Este form login es especificamente copiado tal cual , so no he tenido la posibilidad de entender a fondo
    //su concepto
    logOut({ commit }) {
      fetch(url+"/api/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .then(function (data) {
          console.log("Request success: ", data);
          commit("setUserLogged", false);
          router.push('/')
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    signUpForm({ commit, dispatch }, payload) {
      console.log(payload);
      fetch(url+"/api/playerRegistering", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(newData => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(data => {
          if (data.Error) {
            console.log("Registering failed", data);
          } else {
            console.log("Succesfull", data);
            dispatch("logInForm", payload);
            commit("setUserLogged", true);
          }
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    //////////////////ALL REFERRING TO  CREATE GAME ///////////
    createGame({ dispatch }) {
      fetch(url+"/api/game", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
        // body: JSON.stringify(payload)
      })
        .then(newData => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(data => {
          if (data.Error) {
            console.log("Creating Game Failed!!", data);
          } else {
            console.log("Succesfull", data);
            dispatch("fetchingJsonEvents");
            router.push(`/gamesGrid/${data.gpid}`);
          }
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    joinToGame({ commit }, gameid) {
      console.log(gameid);
      fetch(url+"/api/game/" + gameid, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
        // body: JSON.stringify(payload)
      })
        .then(newData => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(data => {
          if (data.Error) {
            console.log("Error", data);
          } else {
            console.log("Succesfull", data);
            router.push(`/gamesGrid/${data.gpid}`);
          }
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    getPlacedShipsGamePlayer({ dispatch }, { gamePlayerId, ships }) {
      console.log(gamePlayerId);
      console.log(ships);
      fetch(url+"/api/game/" + gamePlayerId + "/ship", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ships)
        // [{ typeShip: "Destroyer", shipPositions: ['B6', 'C6', 'D6'] },
        // { typeShip: "Submarine", shipPositions: ['H6', 'H7', 'H8']}]
      })
        .then(newData => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(data => {
          if (data.Error) {
            console.log("Error", data);
          } else {
            console.log("Succesfull", data);
            dispatch("fetchingGamePlayerId", gamePlayerId);
          }
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
        });
    },
    //-------------------------------------------------------------------------------------------------------//
    getPlacedShotsGamePlayer({ commit, dispatch }, { gamePlayerId, salvos }) {
      console.log(gamePlayerId);
      console.log(salvos);
      fetch(url+"/api/game/" + gamePlayerId + "/salvoes", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(salvos)
      })
        .then(newData => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(data => {
          if (data.Error) {
            console.log("Error", data);
            commit('setErrors', data.Error)
          } //que en este caso seria no volver a poner disparos hasta que el adversario coloque sus tiros
          else {
            console.log("Successful", data);
            dispatch("fetchingGamePlayerId", gamePlayerId);
            commit('setErrors', null)
          }
        })
        .catch(function (error) {
          console.log("Request failure: ", error);
          commit('setErrors', true)
        });
    }
  }
});
