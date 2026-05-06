<!-- packages/components/WlButton/main.vue -->
<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'WlButton',
  inheritAttrs: false,
}
</script>
<style lang="scss">
.el-button {
  &--primary {
    background-color: #425870;
    border-color: #425870;

    &:hover,
    &:focus {
      background-color: #5a6f85;
      border-color: #5a6f85;
      outline: none;
    }

    &:active {
      background-color: #354659;
      border-color: #354659;
    }

    &.is-disabled {
      background-color: #a0b0c0;
      border-color: #a0b0c0;
    }
  }
}
</style>
