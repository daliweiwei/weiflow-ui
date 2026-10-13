<template>
  <div class="Uiview">
    <h4>selectTable 组件库</h4>
    <wl-select-table
        v-model="user"
        :multiple="false"
        :columns="columns"
        :search-fields="searchFields"
        :fetch-method="fetchUserList"
        placeholder="请选择用户"
        label-key="prodSapNo"
        id-key="id"
    />
    <div style="margin-top: 20px">
      当前单选值：
      <pre>{{ user }}</pre>
    </div>
    <wl-select-table
        v-model="userList"
        :multiple="true"
        :columns="columns"
        :search-fields="searchFields"
        :fetch-method="fetchUserList"
        placeholder="请选择用户"
        label-key="prodSapNo"
        id-key="id"
        @change="handleChange"
    />

    <div style="margin-top: 20px">
      当前多选值：
      <pre>{{ userList }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  name: "Uiview",
  data() {
    return {
      multipleValue: [],
      user: null,
      userList: [],
      columns: [
        {
          //表格参数 第一列
          prop: "id", // prop必传与表格数据字段label一致
          label: "ID", // label必传
          width: "120" // width必传
        },
        {
          prop: "name", // prop必传与表格数据字段label一致
          label: "名称", // label必传
          width: "120" // width必传
        },
        {
          prop: "code",
          label: "code",
          width: "100"
        },
        {
          prop: "status",
          label: "状态",
          width: "100"
        },
        {
          prop: "description",
          label: "描述",
          minWidth: "200"
        }
      ],
      searchFields: [
        {
          prop: "keyWord",
          label: "关键字",
          type: "input",
          placeholder: "请输入关键字"
        }
      ],

    };
  },
  mounted() {
  },
  methods: {
    async fetchUserList(params) {
      console.log("查询参数：", params);

      const mockData = Array.from({length: 30}, (v, i) => {
        return {
          id: i + 1,
          name: "名称" + (i + 1),
          code: "CODE_" + (i + 1),
          description: "这是一条描述信息 " + (i + 1),
          status: (i + 1) % 2
        };
      });

      let list = await mockData;
      const {keyWord} = params
      if (keyWord) {
         list = list.filter((item) => {
          return (
              item.name.indexOf(keyWord) > -1 ||
              item.code.indexOf(keyWord) > -1 ||
              item.description.indexOf(keyWord) > -1
          );
        });
        console.log(list,'listlistlist')
      }
      // let resData = await this.getSelectData(params);
      // console.log(resData);
      // let list = resData.records;
      const total = list.length;
      return Promise.resolve({list, total});
    },
  }
};
</script>
<style scoped lang="scss">

</style>