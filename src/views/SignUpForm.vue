<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card style="position:absolute;margin-left:450px;width:300px" class="elevation-12">
          <v-toolbar src="../assets/screen2.jpg">
            <v-toolbar-title>
              <h2 class="toolbar">Sign Up form BattleShip</h2>
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-form @submit.prevent="signUpUser">
            <v-card-text>
              <v-layout row wrap>
                <v-icon src="../assets/screen2.jpg">mdi-account-arrow-right</v-icon>
                <v-text-field
                  name="name"
                  label="name"
                  id="name"
                  v-model="name"
                  type="name"
                  required
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-icon src="../assets/screen2.jpg">mdi-account-arrow-right</v-icon>
                <v-text-field
                  name="email"
                  label="email"
                  id="email"
                  v-model="email"
                  type="email"
                  required
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-icon src="../assets/screen2.jpg">mdi-lock-question</v-icon>
                <v-text-field
                  name="password"
                  label="password"
                  id="password"
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-icon src="../assets/screen2.jpg">mdi-lock-question</v-icon>
                <v-text-field
                  name="confirmPassword"
                  label="confirm password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  v-bind:rules="[passwwordComparison]"
                ></v-text-field>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-spacer />
              <router-link to="/">
                <v-img class="buttonHome" src="../assets/homy.png" />
              </router-link>
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />

              <v-btn type="submit" style="background-color:#FF5252; color:white">Sign Up</v-btn>
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
  name: "SignUpForm",
  ///////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      name: "",
      password: "",
      email: "",
      confirmPassword: ""
    };
  },
  ///////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["signUpForm"]),
    signUpUser() {
      return this.$store.dispatch("signUpForm", {
        email: this.email,
        password: this.password,
        userName: this.name
      });
      this.reloader()
    },
    reloader() {
      return location.reload();
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getUser"]),
    passwwordComparison() {
      if (this.password != this.confirmPassword) {
        return "These Passwords do not match";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
.toolbar {
  background-color: rgba(255, 82, 82, 0.3);
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
  z-index: 1;
}
</style>