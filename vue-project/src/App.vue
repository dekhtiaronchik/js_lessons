<template>
  <div id="app">
    <div class="payment-info">
      <header class="header">
        <router-link class="header__link" to="/dashboard"
          >Dashboard</router-link
        >
        <router-link class="header__link" to="/about">About</router-link>
      </header>
      <router-view />
      <transition name="fade">
        <ContextMenu />
      </transition>
    </div>
    <div class="diagram"></div>
  </div>
</template>

<script>
import ContextMenu from "./components/modalWindows/ContextMenu";
export default {
  name: "App",
  components: {
    ContextMenu,
  },
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
