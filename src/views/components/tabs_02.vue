<template>
<div class="tabs_02">
  <el-table
    class="wl-table"
    :data="tableData01"
    style="width: 100%"
    :row-key="'$index'"
  >
    <el-table-column
      v-for="(col,ind) in tCols01"
      :key="ind"
      :prop="col.prop"
      :label="col.label"
    ></el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name: "tabs_02",
  data() {
    return {
      tCols01: [
        {
          prop: "name1",
          label: ""
        },
        {
          prop: "name2",
          label: "执行计划1"
        },
        {
          prop: "name3",
          label: "执行计划2"
        },
        {
          prop: "name4",
          label: "执行计划3"
        },
        {
          prop: "name5",
          label: "执行计划4"
        },
        {
          prop: "name6",
          label: "执行计划5"
        },
        {
          prop: "name7",
          label: "执行计划6"
        },
        {
          prop: "name8",
          label: "订单标扣总金额"
        },
        {
          prop: "name9",
          label: "订单特折总金额"
        }
      ],
      tableData01: [
        {
          name1: "含税",
          name2: "54,385,105.7",
          name3: "0.00",
          name4: "0.00",
          name5: "0.00",
          name6: "0.00",
          name7: "0.00",
          name8: "61,922,873.62",
          name9: "54,385,105.7"
        },
        {
          name1: "不含税",
          name2: "48,128,412.12",
          name3: "0.00",
          name4: "0.00",
          name5: "0.00",
          name6: "0.00",
          name7: "0.00",
          name8: "54,799,003.2",
          name9: "48,128,412.12"
        }
      ],
    };
  },
  mounted() {
  },
  methods: {}
};
</script>
<style scoped lang="scss">

</style>