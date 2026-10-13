<template>
  <div class="VirtualSelectView">
    <div class="wei-flex">
      <div class="wei-flex-item">
        <h4>大数据-虚拟列表-单选-需要宿主项目传送options数据</h4>
        <wl-virtual-select
            v-model="selectedValue_1"
            :options="largeOptions"
            placeholder="请选择城市"
            filterable
            @change="handleChange"
        />
      </div>
      <div class="wei-flex-item">
        <h4>大数据-虚拟列表-多选-+1显示-需要宿主项目传送options数据</h4>
        <wl-virtual-select
            v-model="selectedValues_2"
            :options="largeOptions"
            placeholder="请选择城市"
            filterable
            multiple
            collapseTags
            @change="handleChange"
        />
      </div>
      <div class="wei-flex-item">
        <h4>大数据-虚拟列表-多选-完整显示-需要宿主项目传送options数据</h4>
        <wl-virtual-select
            v-model="selectedValues_3"
            :options="largeOptions"
            placeholder="请选择城市"
            filterable
            multiple
            @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VirtualSelectView",
  data() {
    return {
      selectedValue_1: "",
      selectedValues_2: [],
      selectedValues_3: [],
      largeOptions: Array.from({length: 500}, (_, i) => ({
        value: i,
        label: `员工 ${i + 1}`,
        department: ["技术部", "市场部", "销售部"][i % 3]
      })),
    };
  },
  mounted() {

  },
  methods: {

    handleChange(value) {
      console.log(value);
      console.log(this.selectedValue);
      console.log("vvvvvv", value);
      this.selectedValue = JSON.parse(JSON.stringify(value));
    },
  }
};
</script>
<style scoped lang="scss">

</style>