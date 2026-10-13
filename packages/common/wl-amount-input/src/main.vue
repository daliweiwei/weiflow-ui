<!-- wl-amount-input components -->

<!--
  使用文档
  <wl-amount-input v-model="amount" />
  v-model 绑定值类型 String / Number 默认"0"
  disabled 是否禁用输入框 Boolean类型 默认 `false`， 为 `true` 时不可输入、不可编辑
  readonly 是否只读 Boolean类型 默认`false`， 为 `true` 时不可编辑，但可以保留输入框的展示效果
  placeholder 输入框占位提示文字 String类型 默认`请输入金额`，输入框没有内容时显示的提示文字
  align 金额文本的对齐方式 String类型  默认`left`, 可选值`left`、`right` 控制金额文本左对齐或右对齐
  digit 金额保留的小数位数 Number类型 默认`2`
  isEmbedding 是否在失去焦点时触发组件的 `blur` 事件  Boolean类型 默认`false`, 为 `true` 时，输入框失焦会触发组件 `blur` 事件
  change 金额发生变化时触发 `$event` 返回格式化后的金额字符串
-->

<template>
  <div class="wl-amount-input">
    <el-input
      ref="amountInputNew"
      :placeholder="placeholder"
      v-model="amountValue"
      size="small"
      :disabled="disabled"
      :readonly="readonly"
      @change="change"
      v-money:[digit]
      :class="align == 'right' ? `right-aligned-input` : `left-aligned-input`"
      :key="key"
    >
    </el-input>
  </div>
</template>

<script>
import { comdify2 } from "../../../utils/amountFormat";

export default {
  name: "WlAmountInput",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: "0"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入金额"
    },
    align: {
      type: String,
      default: "left"
    },
    digit: {
      type: Number,
      default: 2
    },
    isEmbedding: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      key: true,
      amountValue: this.value,
      numRegix: /[^\d.-]/g // 保留 数字 0-9、点 .、负号 -，其余全部删除
    };
  },
  watch: {
    // 默认显示金额
    value(val) {
      // console.log(val);
      this.amountValue = val;
      this.key = !this.key;
    }
  },
  //设置局部指令
  directives: {
    money: {
      // bind: function (el, binding,vnode) {
      //   vnode.key=Math.random();
      // },
      // 定义指令
      inserted: function (el, binding, vnode) {
        let numRegix = /[^\d.-]/g; // 保留 数字 0-9、点 .、负号 -，其余全部删除
        let digit = binding.arg;
        // 指令作用在 element-input 节点，对应原生 div.el-input (真实input节点的父节点)
        if (el.tagName.toLocaleUpperCase() !== "INPUT") {
          el = el.getElementsByTagName("input")[0];
        }
        // console.log(323232);
        let a = el.value.replace(numRegix, "");
        el.value = comdify2(Number(a), digit);
        el.onfocus = (e) => {
          if (vnode.context.readonly) {
            return;
          }
          let a = el.value.replace(numRegix, "");
          if (a) {
            el.value = Number(a);
          } else {
            el.value = 0.0;
          }
        };
        el.onblur = (e) => {
          if (vnode.context.readonly) {
            return;
          }
          let a = el.value.replace(numRegix, "");
          console.log("aaaa", a);
          if (vnode.context.isEmbedding) {
            vnode.context.$emit("blur");
          }
          if (a) {
            el.value = comdify2(Number(a), digit);
          } else {
            el.value = comdify2(0, digit);
          }
        };
        // console.log(el.value);
      }
    }
  },
  methods: {
    focus() {
      this.$refs.amountInputNew.focus();
    },
    change(val) {
      // 先清理非数字、非.、非- 字符
      let clean = val.replace(this.numRegix, "");
      // 确保只有一个负号（且在开头），最多一个小数点
      if (clean.split("-").length > 2) clean = clean.replace(/-/g, "");
      if (clean.startsWith("--")) clean = clean.substring(1);
      if (!clean.startsWith("-")) clean = clean.replace(/^-/, "");

      const parts = clean.split(".");
      if (parts.length > 2) clean = parts[0] + "." + parts.slice(1).join("");
      // 转数字
      let num = Number(clean);
      if (isNaN(num)) {
        val = 0.0;
        num = 0.0;
      }

      // 格式化并 emit
      const formatted = num.toFixed(this.digit);
      this.$emit("input", formatted);
      this.$emit("change", formatted);

      // const reg = /^[0-9]*.[0-9]*$/;
      // if (!reg.test(a)) {
      //   val = 0.0;
      //   a = 0.0;
      // }
      // a = Number(a).toFixed(this.digit);
      // this.$emit("input", a);
      // this.$emit("change", a);
      // console.log(val,a);
    }
  }
};
</script>
<style lang="scss">
.wl-amount-input {
  .left-aligned-input .el-input__inner {
    text-align: left !important;
  }

  .right-aligned-input .el-input__inner {
    text-align: right !important;
  }
}
</style>
