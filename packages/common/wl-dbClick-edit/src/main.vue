<!-- wl-dbClick-edit components -->

<!--
  双击编辑
  <wl-dbClick-edit :value="dbRowData" name="userName" type="input" @handleUpdateRow="handleUpdateRow" />
  <wl-dbClick-edit :value="dbRowData" name="userName" type="amountInput" :digit="2" @handleUpdateRow="handleUpdateRow" />
  value Object	{}	当前行数据对象
  index	Number	0	当前行索引。失焦更新时会写入 rowData.index
  name String 当前编辑字段的属性名
  labelName String	"" select 或 radio 类型对应的显示文本属性名 name为value值
  type String 默认"input" 双击编辑后对应是组件默认input  [input、amountInput、inputNumber、select、radio、date、datetime]
  selectParams	Array	[]	下拉框配置，可传：clearable、filterable、collapseTags
  opt Array	[] 结构 [{label:'',value:''}] select 或 radio 的选项数据,type是select时必填
  date type是date时必填 value为yyyy-MM-dd 否则会报错
  labelKey	String	"label"	选项显示文本对应的属性名
  valueKey	String	"value"	选项值对应的属性名
  size	String	""	编辑控件尺寸，可传 medium、small、mini
  digit	Number	2	amountInput 的小数位数
  precision	Number	-	inputNumber 的精度
  step	Number	1	inputNumber 的步长
  stepStrictly	Boolean	false	是否只能输入步长的倍数
  min	Number	-Infinity	数字输入最小值
  max	Number	Infinity	数字输入最大值
  disabled	Boolean	false	是否禁用数字输入框
  controlsPosition	String	""	数字输入框按钮位置，可传 right
-->

<template>
  <div class="dbEdit">
    <div v-if="state">
      <el-input
          v-if="type == 'input'"
          ref="inputRef"
          v-model="rowData[name]"
          :size="size"
          placeholder="请输入内容"
          @blur="handleBlur"
      ></el-input>
      <wl-amount-input
          v-else-if="type == 'amountInput'"
          ref="amountInputRef"
          v-model="rowData[name]"
          :digit="digit"
          :size="size"
          isEmbedding
          @blur="handleBlur"
      />
      <el-input-number
          v-else-if="type == 'inputNumber'"
          ref="inputNumberRef"
          v-model="rowData[name]"
          :size="size"
          :precision="precision"
          :step="step"
          :min="min"
          :max="max"
          :disabled="disabled"
          :step-strictly="stepStrictly"
          :controls-position="controlsPosition"
          @blur="handleBlur"
      ></el-input-number>
      <el-select
          v-else-if="type == 'select'"
          ref="selectRef"
          v-model="rowData[name]"
          :size="size"
          :clearable="selectParams.includes('clearable')"
          :filterable="selectParams.includes('filterable')"
          :collapseTags="selectParams.includes('collapseTags')"
          placeholder="请选择"
          @change="handleBlur"
          @blur="handleSelectBlur"
      >
        <!--        :multiple="selectParams.includes('multiple')"-->
        <el-option
            v-for="(item, index) in opt"
            :key="index"
            :label="item[labelKey]"
            :value="item[valueKey]"
        ></el-option>
      </el-select>
      <el-radio-group
          v-else-if="type == 'radio'"
          v-model="rowData[name]"
          :size="size"
          @input="handleBlur"
      >
        <el-radio
            v-for="(item, index) in opt"
            :key="index"
            :label="item[valueKey]"
        >{{ item[labelKey] }}
        </el-radio>
      </el-radio-group>
      <el-date-picker
          v-else-if="type == 'date'"
          ref="dateRef"
          v-model="rowData[name]"
          :size="size"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          clearable
          placeholder="选择日期"
          @change="handleBlur"
          @blur="handleBlur"
      >
      </el-date-picker>
      <el-date-picker
          v-else-if="type == 'datetime'"
          ref="datetimeRef"
          v-model="rowData[name]"
          :size="size"
          type="datetime"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          @blur="handleBlur"
      >
      </el-date-picker>
    </div>
    <div v-else class="Preview" @dblclick="handleDbClick">
      <div v-if="['select', 'radio'].includes(type)">
        {{ rowData[labelName] }}
      </div>
      <div v-else-if="type == 'date'">
        {{ rowData[name] ? dateFormat(new Date(rowData[name]), "yyyy-MM-dd") : "" }}
      </div>
      <div v-else-if="type == 'datetime'">
        {{ rowData[name] ? dateFormat(new Date(rowData[name]), "yyyy-MM-dd hh:mm:ss") : "" }}
      </div>
      <div v-else>{{ rowData[name] }}</div>
    </div>
  </div>
</template>

<script>
import {dateFormat} from "../../../utils/date";

export default {
  name: "WlDbClickEdit",
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    index: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ""
    },
    labelName: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "input"
    },
    //select params
    selectParams: {
      type: Array,
      default: () => []
    },
    opt: {
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
    size: {
      type: String,
      default: ""
    },
    digit: {
      type: Number,
      default: 2
    },
    precision: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: () => Infinity
    },
    min: {
      type: Number,
      default: () => -Infinity
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controlsPosition: {
      type: String,
      default: ""
    }
  },
  watch: {
    value: {
      handler(val) {
        // this.rowData = { ...val };
        this.rowData = val;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      dateFormat,
      state: false,
      rowData: null
    };
  },
  methods: {
    handleDbClick() {
      this.state = true;
      this.$nextTick(() => {
        if (this.type !== "radio") {
          this.$refs[`${this.type}Ref`].focus();
        }
      });
    },
    handleSelectBlur(e) {
      console.log(e, "handleSelectBlur");
      setTimeout(() => {
        if (this.state) {
          this.state = false;
        }
      }, 300);
    },
    handleBlur(e) {
      console.log(e, "handleBlur");
      this.rowData.index = this.index;
      if (["select", "radio"].includes(this.type)) {
        if (e == "") {
          this.rowData[this.labelName] = "";
          // return false
        } else {
          let cItems = this.opt.find((x) => x[this.valueKey] == e);
          this.rowData[this.labelName] = cItems[this.labelKey];
        }
      }

      this.$nextTick(() => {
        this.state = false;
        this.$emit("handleUpdateRow", this.rowData);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dbEdit {
  .Preview {
    min-height: 23px;
  }
}
</style>
