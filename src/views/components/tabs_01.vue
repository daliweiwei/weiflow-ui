<template>
<div class="tabs_01">
  <el-table stripe :data="tableListData" class="wl-table" :row-key="'index'">
    <el-table-column
      prop="name"
      label="产品编号"
      align="left"
      min-width="100"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="name1"
      label="产品名称"
      align="left"
      width="140"
    ></el-table-column>
    <el-table-column
      prop="name2"
      label="数字"
      align="right"
    ></el-table-column>
    <el-table-column
      prop="name3"
      label="金额"
      align="right"
    ></el-table-column>
    <el-table-column prop="name4" label="备注" min-width="280">
      <template slot-scope="scope">
        {{ scope.row.name4 }}
        <el-link
          class="wl-table-link"
          href="https://www.baidu.com"
          target="_blank"
        >{{ scope.row.name }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column prop="name5" label="操作">
      <template slot-scope="scope">
        <el-link class="operate_edit">编辑</el-link>
        |
        <el-link type="danger">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
  <wl-pagination
    :pageSizes="[10, 50, 100, 200]"
    :total="1000"
    page.sync="1"
    limit.sync="10"
  />
</div>
</template>
<script>
export default {
  name: "tabs_01",
  data() {
    return {
      tableListData: [
        {
          index: "1",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
        },
        {
          index: "2",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
        },
        {
          index: "3",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
        },
        {
          index: "4",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
        },
        {
          index: "5",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
        },
        {
          index: "6",
          name: "ZID1000111",
          name1: "产品名称",
          name2: "1233",
          name3: 123123,
          name4: "项目主要负责人信息。自动插入团队成员表"
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