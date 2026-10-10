<!-- wl-dict-tag components -->
<!--
   <wl-dict-tag :options="sys_normal_disable" value="1" />
   sys_normal_disable: [
      {
        label: "正常",
        value: "1",
        raw: {
          cssClass: "",
          listClass: "primary"
        }
      },
      {
        label: "停用",
        value: "0",
        raw: {
          cssClass: "",
          listClass: "danger"
        }
      }
    ]
    options	Array	null	字典选项列表
    value	Number | String | Array	-	当前选中的字典值。单值传数字或字符串，多值传数组
 -->

<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="item.raw.listClass == 'default' || item.raw.listClass == ''"
          :key="item.value"
          :index="index"
          :class="item.raw.cssClass"
          >{{ item.label }}</span
        >
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value"
          :index="index"
          :type="item.raw.listClass == 'primary' ? '' : item.raw.listClass"
          :class="item.raw.cssClass"
        >
          {{ item.label }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "WlDictTag",
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: null
    },
    value: [Number, String, Array]
  },
  computed: {
    values() {
      if (this.value !== null && typeof this.value !== "undefined") {
        return Array.isArray(this.value) ? this.value : [String(this.value)];
      } else {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
