<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card style="position:absolute;margin-left:450px;width:300px" class="elevation-12">
          <v-toolbar src="../assets/screen2.jpg">
            <v-toolbar-title>
              <h2 class="toolbar">Login form BattleShip</h2>
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-form @submit.prevent="signUserIn">
            <v-card-text>
              <v-layout row wrap>
                <v-icon src="./assets/screen2.jpg">mdi-account-arrow-right</v-icon>
                <v-text-field
                  xs8
                  xl8
                  icon
                  label="Login"
                  v-model="name"
                  name="login"
                  type="text"
                  required
                />
              </v-layout>
              <v-layout row wrap>
                <v-icon src="./assets/screen2.jpg">mdi-lock-question</v-icon>
                <v-text-field
                  id="password"
                  label="Password"
                  v-model="password"
                  name="password"
                  type="password"
                  required
                />
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <router-link to="/">
                <v-img class="buttonHome" src="../assets/homy.png" />
              </router-link>
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-btn type="submit" style="background-color:#FF5252; color:white">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LogInForm",
  ///////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      name: "",
      password: ""
    };
  },
  ///////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["logInForm"]),
    signUserIn() {
      return this.$store.dispatch("logInForm", {
        userName: this.name,
        password: this.password
        
      });
      this.reloader()
    },
    reloader() {
      return location.reload();
    },
  },
///////////////////////////////////////////////////////////////////////////////////////
  created() {}
};
</script>

<style>
.buttonHome {
  position: relative;
  height: 30px;
  width: 30px;
}
.toolbar {
  background-color: rgba(255, 82, 82, 0.3);
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
  z-index: 1;
}
</style>