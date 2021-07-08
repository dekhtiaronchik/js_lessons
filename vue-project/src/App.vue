<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;

  .header {
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 20px;
    color: rgb(70, 70, 70);
  }

  .header__link {
    color: rgb(70, 70, 70);
    padding-right: 30px;
  }

  button {
    cursor: pointer;
    background-color: rgb(107, 182, 169);
    color: white;
    text-align: center;
    border: none;
  }

  button:focus {
    outline: none;
  }
}
</style>