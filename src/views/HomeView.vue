<template>
  <div class="HomeView">

  </div>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      code: "liweiliang",
    };
  },
  mounted() {
  },
  methods: {
    handleRendered() {
      console.log("条形码渲染成功");
    },
    handleError(err) {
      console.error("条形码渲染失败", err);
    }
  }
};
</script>
<style scoped lang="scss">

</style>