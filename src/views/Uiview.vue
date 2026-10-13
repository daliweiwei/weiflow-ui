<template>
  <div class="Uiview">


    <h4>Timeline 时间线</h4>
    <el-timeline class="wl-timeline">
      <el-timeline-item v-for="(activity, index) in activities" :key="index">
        <div>
          <span>{{ activity.content }}</span>
          <el-tag type="success">合作中</el-tag>
          工达 上海 ｜ 上海办事处 销售：Sam 业务拓展经理：Sam Lee
          <el-tag type="danger">审批通过</el-tag>
        </div>
      </el-timeline-item>
    </el-timeline>

    <h4>table</h4>
    <el-table stripe :data="tableListData" class="wl-table">
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
    <p>pageSizes:每页显示多少条设置，数组</p>
    <p>total:总条数</p>
    <wl-pagination
        :pageSizes="[10, 50, 100, 200]"
        :total="1000"
        page.sync="1"
        limit.sync="10"
    />
    <h4>tabs</h4>
    <p>在 tabs 组件中增加clas类 wl-tabs</p>
    <el-tabs v-model="activeTabsName" class="wl-tabs" @tab-click="handleClick">
      <el-tab-pane
          v-for="(item, index) in tabsList"
          :key="index"
          :label="item.label"
          :name="item.name"
      >
        <component :is="item.componentName"></component>
      </el-tab-pane>
    </el-tabs>
    <h4>Card 卡片</h4>
    <wl-card
        title="卡片名称"
        shadow="hover"
        iconName="el-icon-tickets"
        buttonName="操作按钮"
        @operation="handleCardOperate"
    >
      <div class="wl-card-content">
        <h5>shadow 参数说明 默认always</h5>
        <p>always:卡片-总是显示阴影</p>
        <p>hover:卡片-鼠标悬浮时显示阴影</p>
        <p>never:卡片-从不显示阴影</p>
        <h5>title 参数说明</h5>
        <p>title:卡片名称</p>
        <p>iconName:卡片左侧小图标</p>
        <p>buttonName:操作按钮名称</p>
        <p>operation:操作按钮事件</p>
      </div>
    </wl-card>
    <wl-card
        title="卡片-动态插槽"
        shadow="never"
        iconName="el-icon-tickets"
        buttonName="操作按钮"
        @operation="handleCardOperate"
    >
      <template #content>
        <p>这里是动态内容</p>
        <button @click="handleCardOperate">点击按钮</button>
      </template>
      <div class="wl-card-content">
        <p>content 内容</p>
      </div>
    </wl-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="12">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="8">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="8">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="6">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="6">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
      <el-col :span="6">
        <wl-card
            title="卡片名称"
            shadow="hover"
            iconName="el-icon-tickets"
            buttonName="操作按钮"
            @operation="handleCardOperate"
        >
          <div class="wl-card-content">
            <h5>title 参数说明</h5>
            <p>title:卡片名称</p>
            <p>iconName:卡片左侧小图标</p>
            <p>buttonName:操作按钮名称</p>
            <p>operation:操作按钮事件</p>
          </div>
        </wl-card>
      </el-col>
    </el-row>
    <h4>Collapse 折叠面板</h4>
    <el-collapse
        v-model="activeCollapseNames"
        class="wl-collapse"
        @change="handleCollapseChange"
    >
      <el-collapse-item title="折叠面板折叠面板" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
        <el-collapse
            v-model="activeCollNamesTwoChild"
            @change="handleCollTwoChange"
            class="wl-collapse wl-collapse-child"
        >
          <el-collapse-item title="二级折叠面板" name="1">
            <template slot="title">
              二级折叠面板
              <el-button
                  type="text"
                  class="wl-collapse-btn"
                  @click.stop.native="handleAddChild"
              >
                新增
              </el-button>
            </template>
            二级折叠面板内容desc
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
      <el-collapse-item title="折叠面板02" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="折叠面板03" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>
<script>
import tabs_01 from "@/views/components/tabs_01.vue";
import tabs_02 from "@/views/components/tabs_02.vue";
import tabs_03 from "@/views/components/tabs_03.vue";
import tabs_04 from "@/views/components/tabs_04.vue";
import tabs_05 from "@/views/components/tabs_05.vue";
import tabs_06 from "@/views/components/tabs_06.vue";
export default {
  name: "Uiview",
  components: {
    tabs_01,
    tabs_02,
    tabs_03,
    tabs_04,
    tabs_05,
    tabs_06
  },
  data() {
    return {

      activeTabsName: "first",
      tabsList: [
        {
          label: "Tabs01",
          name: "first",
          componentName: "tabs_01"
        },
        {
          label: "Tabs02",
          name: "second",
          componentName: "tabs_02"
        },
        {
          label: "Tabs03",
          name: "third",
          componentName: "tabs_03"
        },
        {
          label: "Tabs04",
          name: "fourth",
          componentName: "tabs_04"
        },
        {
          label: "Tabs05",
          name: "five",
          componentName: "tabs_05"
        },
        {
          label: "Tabs06",
          name: "six",
          componentName: "tabs_06"
        }
      ],
      activeCollapseNames: ["1"],
      activeCollNamesTwoChild: ["1"],
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
      activities: [
        {
          content: "合作业务｜直销 ",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  mounted() {
  },
  methods: {

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCardOperate() {
      console.log("handleCardOperate");
    },
    handleCollapseChange(val) {
      console.log("handleCollapseChange", val);
    },
    handleCollTwoChange(val) {
      console.log("handleCollTwoChange", val);
    },
    handleAddChild() {
      console.log("handleAddChild");
    }
  }
};
</script>
<style scoped lang="scss">

</style>