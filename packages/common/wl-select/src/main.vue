<!-- packages/components/WlSelect/main.vue -->
<template>
  <el-select
      v-bind="$attrs"
      v-on="$listeners"
      :class="['wl-select', customClass]"
  >
    <slot name="prefix" slot="prefix"></slot>
    <slot name="suffix" slot="suffix"></slot>
    <slot name="prepend" slot="prepend"></slot>
    <slot name="append" slot="append"></slot>

    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
    >
      <slot name="option" :item="item">
        <span>{{ item.label }}</span>
      </slot>
    </el-option>

    <slot></slot>
  </el-select>
</template>

<script>
export default {
  name: 'WlSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    customClass: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.wl-select {
  width: 100%;

  .el-input__inner {
    &:focus {
      border-color: #425870;
    }
  }

  &.el-select {
    .el-input.is-focus .el-input__inner {
      border-color: #425870;
    }
  }
}
</style>
