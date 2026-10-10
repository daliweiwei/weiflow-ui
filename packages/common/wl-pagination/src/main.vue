<!-- wl-pagination components -->

<!--
  翻页
  <wl-pagination :total="total" :page.sync="query.page" :limit.sync="query.limit" :page-sizes="[10, 20, 50, 100]" :pager-count="7" layout="total, sizes, prev, pager, next, jumper" background :auto-scroll="true" @pagination="handlePagination" />
  total	Number	是	-	数据总条数
  page	Number	否	1	当前页码
  limit	Number	否	20	每页显示条数
  pageSizes	Array	否	[10, 20, 30, 50]	每页显示条数选项
  pagerCount	Number	否	PC 端 7，移动端 5	页码按钮数量
  layout	String	否	"total, sizes, prev, pager, next, jumper"	分页组件布局
  background	Boolean	否	true	是否显示分页按钮背景
  autoScroll	Boolean	否	true	切换分页后是否自动滚动到页面顶部
  hidden	Boolean	否	false	是否隐藏分页组件
-->

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "../../../utils/scroll-to";

export default {
  name: "WlPagination",
  inheritAttrs: false,
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
