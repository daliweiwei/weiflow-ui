<!-- wl-bar-code components -->

<!--
  条形码
  <wl-bar-code tag="svg" :value="code" format="CODE128" :width="2" :height="80" :displayValue="true" @rendered="handleRendered" @error="handleError" />
  tag: String类型 默认值：svg 渲染类型：svg / canvas / img
  value:String类型 默认值：'' 条形码内容
  format:String类型 默认值：CODE128 条形码格式
  width:Number类型 默认值：2 条宽
  height:Number类型 默认值：100 条码高度
  displayValue:Boolean类型 默认值：true 是否显示文本
  fontSize:Number类型 默认值：16 文本字体大小
  margin:Number类型 默认值：16 外边距
  lineColor:String类型 默认值：#000 | 线条颜色
  background:String类型 默认值：#fff | 背景色
  textAlign:String类型 默认值：center | 文本对齐方式
  textPosition:String类型 默认值：bottom | 文本位置
-->

<template>
  <div class="WlBarCode">
    <component :is="tag" ref="barcode" />
    <div v-if="errorMsg" class="barcode-error">{{ errorMsg }}</div>
  </div>
</template>
<script>
import JsBarcode from "jsbarcode";

export default {
  name: "WlBarCode",
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: "svg",
      validator(val) {
        return ["svg", "canvas", "img"].includes(val);
      }
    },
    value: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "CODE128"
    },
    width: {
      type: Number,
      default: 2
    },
    height: {
      type: Number,
      default: 100
    },
    displayValue: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 16
    },
    margin: {
      type: Number,
      default: 10
    },
    lineColor: {
      type: String,
      default: "#000"
    },
    background: {
      type: String,
      default: "#fff"
    },
    textAlign: {
      type: String,
      default: "center"
    },
    textPosition: {
      type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      errorMsg: ""
    };
  },
  computed: {
    barcodeConfig() {
      return {
        format: this.format,
        width: this.width,
        height: this.height,
        displayValue: this.displayValue,
        fontSize: this.fontSize,
        margin: this.margin,
        lineColor: this.lineColor,
        background: this.background,
        textAlign: this.textAlign,
        textPosition: this.textPosition
      };
    }
  },
  mounted() {
    this.renderBarcode();
  },
  watch: {
    value: "renderBarcode",
    barcodeConfig: {
      handler: "renderBarcode",
      deep: true
    },
    tag() {
      this.$nextTick(() => {
        this.renderBarcode();
      });
    }
  },
  methods: {
    renderBarcode() {
      this.errorMsg = "";

      if (!this.value) {
        this.errorMsg = "条形码内容不能为空";
        this.$emit("error", new Error("条形码内容不能为空"));
        return;
      }

      try {
        JsBarcode(this.$refs.barcode, this.value, this.barcodeConfig);
        this.$emit("rendered");
      } catch (error) {
        this.errorMsg = "条形码生成失败：" + error.message;
        this.$emit("error", error);
      }
    }
  }
};
</script>
<style lang="scss">
.WlBarCode {
  display: inline-block;
}

.barcode-error {
  margin-top: 6px;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1.4;
}
</style>
