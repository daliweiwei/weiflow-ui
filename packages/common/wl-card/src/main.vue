<!-- wl-card components -->
<!--
  <wl-card title="卡片名称" shadow="hover" iconName="el-icon-tickets" buttonName="操作按钮" @operation="handleCardOperate">
    <div class="wl-card-content">
      <h5>title 参数说明</h5>
      <p>title:卡片名称</p>
      <p>iconName:卡片左侧小图标</p>
      <p>buttonName:操作按钮名称</p>
      <p>operation:操作按钮事件</p>
    </div>
  </wl-card>
  shadow 参数说明 默认always always:卡片-总是显示阴影、hover:卡片-鼠标悬浮时显示阴影、never:卡片-从不显示阴影
-->
<template>
  <el-card class="wl-card" :shadow="shadow">
    <div slot="header" class="clearfix">
      <i :class="iconName"></i>
      <span>{{ title }}</span>
      <el-button
        v-if="buttonName"
        @click="onOperation"
        class="wl-card-operate"
        type="text"
      >
        {{ buttonName }}
      </el-button>
    </div>
    <slot name="content"></slot>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: "WlCard",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "标题"
    },
    shadow: {
      type: String,
      default: "always"
    },
    iconName: {
      type: String,
      default: "el-icon-arrow-down"
    },
    buttonName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    onOperation(e) {
      console.log("child operate");
      this.$emit("operation", e);
    }
  }
};
</script>
<style lang="scss">
.wl-card {
  .wl-card-operate {
    float: right;
    padding: 3px 0;
  }
}
</style>
