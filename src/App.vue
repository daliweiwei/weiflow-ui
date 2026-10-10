<template>
  <div id="app">
    <nav class="menuNav">
      <router-link v-for="(item, index) in munuList" :key="index" :to="item.path">
        {{ item.label }}
      </router-link>

    </nav>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      munuList: [
        {
          label: "Home",
          path: "/"
        },
        {
          label: "barCode",
          path: "/barCode"
        },
        {
          label: "Install",
          path: "/install"
        },
        {
          label: "Common",
          path: "/common"
        },
        {
          label: "demo",
          path: "/demo"
        },
        {
          label: "login",
          path: "/login"
        },
        {
          label: "siui",
          path: "/siui"
        },
        {
          label: "form",
          path: "/form"
        },
        {
          label: "dialog",
          path: "/dialog"
        },
        {
          label: "about",
          path: "/about"
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
