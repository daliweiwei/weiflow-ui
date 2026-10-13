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

export default {
  name: 'App',
  components: {},
  data() {
    return {
      munuList: [
        {
          label: "Home",
          path: "/"
        },
        {
          label: "Install",
          path: "/install"
        },
        {
          label: "ui",
          path: "/uiView"
        },
        {
          label: "component",
          path: "/component"
        },
        {
          label: "barCode",
          path: "/barCode"
        },
        {
          label: "qrCode",
          path: "/qrCode"
        },
        {
          label: "VirtualSelect",
          path: "/virtualSelect"
        },

        {
          label: "fault",
          path: "/fault"
        },

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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
