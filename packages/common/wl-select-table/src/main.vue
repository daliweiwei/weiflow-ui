<!-- wl-select-table components -->

<!--
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
    <div style="margin-top: 20px">当前单选值：<pre>{{ user }}</pre></div>
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
    <div style="margin-top: 20px">当前多选值：<pre>{{ userList }}</pre></div>

    value	Object | Array | null	否	null	当前选中的数据。单选为对象，多选为数组
    multiple	Boolean	否	false	是否开启多选
    columns	Array	否	[]	表格列配置
    searchFields	Array	否	[]	查询字段配置
    fetchMethod	Function	是	-	获取表格数据的方法
    placeholder	String	否	"请选择"	未选择数据时的提示文本
    clearable	Boolean	否	true	是否显示清空按钮
    idKey	String	否	"id"	行数据唯一标识字段
    labelKey	String	否	"name"	回显文本字段
    popoverWidth	Number	否	720	下拉弹窗宽度，单位为像素
 -->
<template>
  <div class="table-select-wrap">
    <el-popover
      v-model="visible"
      placement="bottom-start"
      trigger="click"
      :width="popoverWidth"
      popper-class="table-select-popper"
      @show="handlePopoverShow"
    >
      <div class="table-select-dropdown" @click.stop>
        <!-- 查询区域 -->
        <div class="table-select-search">
          <el-form :inline="true" :model="innerQuery" size="mini">
            <template v-for="item in searchFields">
              <el-form-item :label="item.label" :key="item.prop">
                <el-input
                  v-if="!item.type || item.type === 'input'"
                  v-model="innerQuery[item.prop]"
                  :placeholder="item.placeholder || '请输入' + item.label"
                  clearable
                  :style="{ width: (item.width || 180) + 'px' }"
                  @keyup.enter.native="handleSearch"
                />
              </el-form-item>
            </template>

            <el-form-item>
              <el-button type="primary" size="mini" @click="handleSearch"
                >查询
              </el-button>
              <el-button size="mini" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 表格 -->
        <el-table
          ref="tableRef"
          :data="tableData"
          border
          size="mini"
          height="260"
          :row-key="idKey"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
        >
          <!-- 多选 -->
          <el-table-column
            v-if="multiple"
            type="selection"
            width="55"
            align="center"
            :reserve-selection="true"
          />

          <!-- 单选 -->
          <el-table-column v-else label="选择" width="60" align="center">
            <template slot-scope="scope">
              <el-radio
                :label="scope.row[idKey]"
                :value="selectedRow ? selectedRow[idKey] : ''"
                @change.native="handleSingleSelect(scope.row)"
              >
                <span></span>
              </el-radio>
            </template>
          </el-table-column>

          <!-- 动态列 -->
          <el-table-column
            v-for="(col, ind) in columns"
            :key="ind"
            :prop="col.prop"
            :label="col.label"
            :min-width="col.minWidth || 120"
            :width="col.width"
            :align="col.align || 'left'"
            :show-overflow-tooltip="col.showOverflowTooltip !== false"
          >
            <template #default="scope">
              <template v-if="col.slot">
                <slot
                  :name="col.slot"
                  :row="scope.row"
                  :column="col"
                  :$index="scope.$index"
                />
              </template>
              <template v-else>
                {{ scope.row[col.prop] }}
              </template>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="table-select-pagination">
          <el-pagination
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next"
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <!-- 底部按钮 -->
        <div class="table-select-footer">
          <el-button size="mini" @click="handleCancel">取消</el-button>
          <el-button size="mini" type="primary" @click="handleConfirm">
            确定
          </el-button>
        </div>
      </div>

      <!-- 触发器 -->
      <div slot="reference" class="table-select-reference">
        <el-input
          :value="displayText"
          :placeholder="placeholder"
          readonly
          :clearable="clearable"
          @clear="handleClear"
        >
          <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
        </el-input>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "SiSelectTable",
  props: {
    value: {
      type: [Object, Array, null],
      default() {
        return null;
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    searchFields: {
      type: Array,
      default() {
        return [];
      }
    },
    fetchMethod: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    idKey: {
      type: String,
      default: "id"
    },
    labelKey: {
      type: String,
      default: "name"
    },
    popoverWidth: {
      type: Number,
      default: 720
    }
  },
  data() {
    return {
      visible: false,
      innerQuery: {},
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      selectedRow: null,
      selectedRows: [],
      selectedMap: {},
      isRestoringSelection: false
    };
  },
  computed: {
    displayText() {
      if (this.multiple) {
        const list = Array.isArray(this.value) ? this.value : [];
        return list.map((item) => item[this.labelKey]).join(", ");
      } else {
        return this.value ? this.value[this.labelKey] || "" : "";
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.syncValueToInner(val);
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // 确保 columns 是有效的数组
    // if (!Array.isArray(this.columns)) {
    //   this.columns = [];
    // }

    this.initQuery();
  },
  methods: {
    initQuery() {
      const obj = {};
      this.searchFields.forEach((item) => {
        obj[item.prop] = item.defaultValue || "";
      });
      this.innerQuery = obj;
    },

    syncValueToInner(val) {
      if (this.multiple) {
        const list = Array.isArray(val) ? val : [];
        const map = {};

        list.forEach((item) => {
          if (
            item &&
            item[this.idKey] !== undefined &&
            item[this.idKey] !== null
          ) {
            map[item[this.idKey]] = item;
          }
        });

        this.selectedMap = map;
        this.selectedRows = Object.keys(map).map((key) => map[key]);

        this.$nextTick(() => {
          this.restoreSelection();
        });
      } else {
        this.selectedRow = val || null;
      }
    },

    handlePopoverShow() {
      this.fetchData();
    },

    async fetchData() {
      const params = Object.assign({}, this.innerQuery, {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      });

      try {
        const res = await this.fetchMethod(params);
        console.log('rrrrrrrrrr',res);
        // 增强数据处理逻辑，支持多种返回格式
        let resultData = [];
        let totalCount = 0;

        if (res && typeof res === "object") {
          resultData = res.records || res.list || res.data || [];
          totalCount = res.total || res.count || resultData.length || 0;

          // 确保数据是数组格式
          if (!Array.isArray(resultData)) {
            resultData = [];
          }
        } else {
          resultData = [];
        }

        this.tableData = resultData;
        this.pagination.total = totalCount;

        this.$nextTick(() => {
          this.restoreSelection();
        });
      } catch (e) {
        this.tableData = [];
        this.pagination.total = 0;
      }
    },

    restoreSelection() {
      if (!this.multiple || !this.$refs.tableRef) return;

      this.isRestoringSelection = true;

      this.$refs.tableRef.clearSelection();

      this.tableData.forEach((row) => {
        const id = row[this.idKey];
        if (this.selectedMap[id]) {
          this.$refs.tableRef.toggleRowSelection(row, true);
        }
      });

      this.$nextTick(() => {
        this.isRestoringSelection = false;
      });
    },

    handleSearch() {
      this.pagination.currentPage = 1;
      this.fetchData();
    },

    handleReset() {
      this.initQuery();
      this.pagination.currentPage = 1;
      this.fetchData();
    },

    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.fetchData();
    },

    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.fetchData();
    },

    handleSelectionChange(selection) {
      if (!this.multiple) return;
      if (this.isRestoringSelection) return;

      const currentPageIds = this.tableData.map((item) => item[this.idKey]);

      currentPageIds.forEach((id) => {
        delete this.selectedMap[id];
      });

      selection.forEach((item) => {
        this.selectedMap[item[this.idKey]] = item;
      });

      this.selectedRows = Object.keys(this.selectedMap).map(
        (key) => this.selectedMap[key]
      );
    },

    handleRowClick(row) {
      if (this.multiple) {
        this.$refs.tableRef.toggleRowSelection(row);
      } else {
        this.handleSingleSelect(row);
      }
    },

    handleSingleSelect(row) {
      this.selectedRow = row;
    },

    handleConfirm() {
      const result = this.multiple ? this.selectedRows : this.selectedRow;
      this.$emit("input", result);
      this.$emit("change", result);
      this.visible = false;
    },

    handleCancel() {
      this.visible = false;
    },

    handleClear() {
      if (this.multiple) {
        this.selectedRows = [];
        this.selectedMap = {};
        if (this.$refs.tableRef) {
          this.$refs.tableRef.clearSelection();
        }
        this.$emit("input", []);
        this.$emit("change", []);
      } else {
        this.selectedRow = null;
        this.$emit("input", null);
        this.$emit("change", null);
      }
    }
  }
};
</script>

<style scoped>
.table-select-wrap {
  display: inline-block;
  width: 100%;
}

.table-select-reference {
  width: 100%;
}

.table-select-dropdown {
  box-sizing: border-box;
}

.table-select-search {
  margin-bottom: 10px;
}

.table-select-pagination {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.table-select-footer {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.table-select-footer .el-button + .el-button {
  margin-left: 8px;
}
</style>
