<!-- wl-virtual-select components -->

<!--
    <wl-virtual-select v-model="selectedValue" :options="options" placeholder="请选择城市" @change="handleChange"/>
    value	String | Number | Array	""	当前选中的值。单选传字符串或数字，多选传数组
    options	Array	[]	下拉选项列表
    labelKey	String	"label"	选项显示文本对应的字段名
    valueKey	String	"value"	选项值对应的字段名，同时用于虚拟列表唯一标识
    placeholder	String	"请选择"	未选择时显示的提示文本
    multiple	Boolean	false	是否开启多选
    disabled	Boolean	false	是否禁用组件
    size	String	""	组件尺寸，可传 medium、small、mini
    clearable	Boolean	true	是否显示清空按钮
    collapseTags	Boolean	false	多选时是否折叠已选项标签
    filterable	Boolean	false	是否支持搜索
-->

<template>
  <el-select
    popper-class="wl-virtual-select"
    :placeholder="placeholder"
    v-model="selectedValue"
    :multiple="multiple"
    :disabled="disabled"
    :size="size"
    :clearable="clearable"
    :collapse-tags="collapseTags"
    :filterable="filterable"
    :filter-method="filterMethod"
    @change="handleChange"
    :loading="filterLoading"
  >
    <RecycleScroller
      class="virtual-scroller"
      :items="filteredOptions"
      :item-size="itemSize"
      :key-field="valueKey"
      v-slot="{ item }"
    >
      <el-option
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
        :disabled="item.disabled"
        class="virtual-option"
      />
    </RecycleScroller>
  </el-select>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default {
  name: "WlVirtualSelect",
  inheritAttrs: false,
  components: {
    RecycleScroller
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedValue = val;
      },
      immediate: true,
      deep: true
    },
    options: {
      handler(opt) {
        if (opt && opt.length) {
          this.filteredOptions = [...opt];
        } else {
          this.filteredOptions = [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      selectedValue: "",
      itemSize: 34, //列表项的高度
      filterLoading: false,
      filteredOptions: []
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
    filterMethod(query) {
      if (query === "") {
        this.filteredOptions = [...this.options];
        return;
      }
      this.filterLoading = true;
      const keyword = query.toLowerCase();
      this.filteredOptions = this.options.filter((item) =>
        item[`${this.labelKey}`].toLowerCase().includes(keyword)
      );
      this.filterLoading = false;
    }
  }
};
</script>
<style lang="scss">
.wl-virtual-select {
  .el-scrollbar__bar {
    display: none !important;
  }
}

.virtual-scroller {
  max-height: 248px;
}

.empty-text {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
