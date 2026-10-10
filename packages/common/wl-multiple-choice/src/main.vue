<!-- wl-multiple-choice components -->

<!--

  <wl-multiple-choice v-model="multipleChoice" @enter="handleChoiceEnter" pasteTitle="SAP number"></wl-multiple-choice>
  value	String	""	当前输入内容，支持通过 v-model 绑定
  pasteTitle	String	"批量输入"	批量输入弹窗标题
  size	String	""	输入框尺寸，可传 medium、small、mini

 -->

<template>
  <div class="wl-multiple-choice">
    <el-input
      :size="size"
      type="input"
      v-model="inputValue"
      clearable
      placeholder="多个用英文逗号分隔"
      @keyup.enter.native="handleEnter"
    >
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="openPasteDialog"
        style="cursor: pointer"
      ></i>
    </el-input>
    <el-dialog
      :title="pasteTitle"
      :visible.sync="pasteDialogVisible"
      width="500px"
      @close="closePasteDialog"
      :close-on-click-modal="false"
    >
      <div class="paste-dialog__toolbar">
        <el-button @click="readClipboard" size="mini" type="primary" plain
          >Paste</el-button
        >
        <el-button @click="resetTextarea" size="mini" type="primary" plain
          >Reset</el-button
        >
      </div>
      <el-input
        type="textarea"
        :rows="15"
        placeholder="请输入内容"
        v-model="textareaValue"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmPaste">OK</el-button>
        <el-button @click="closePasteDialog">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "WlMultipleChoice",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    pasteTitle: {
      type: String,
      default: "批量输入"
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value == null ? "" : String(this.value);
      },
      set(val) {
        this.$emit("input", this.formatValue(val));
      }
    }
  },
  data() {
    return {
      pasteDialogVisible: false,
      textareaValue: ""
    };
  },
  methods: {
    handleEnter() {
      this.$emit("enter", this.inputValue);
    },
    openPasteDialog() {
      this.pasteDialogVisible = true;
    },
    async readClipboard() {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        this.$message && this.$message.warning("当前环境不支持读取剪贴板");
        return;
      }
      try {
        this.textareaValue = await navigator.clipboard.readText();
      } catch (e) {
        this.$message && this.$message.warning("读取剪贴板失败，请检查权限");
      }
    },
    resetTextarea() {
      this.textareaValue = "";
    },
    closePasteDialog() {
      this.textareaValue = "";
      this.pasteDialogVisible = false;
    },
    confirmPaste() {
      const formattedValue = this.formatValue(this.textareaValue);
      this.$emit("input", formattedValue);
      this.$emit("change", formattedValue);
      this.closePasteDialog();
    },
    formatValue(val) {
      if (!val) return "";
      const list = String(val)
        .split(/\s+/)
        .map((item) => item.trim())
        .filter(Boolean);
      const result = [...new Set(list)];
      return result.join(",");
    }
  }
};
</script>
<style lang="scss">
.paste-dialog__toolbar {
  margin-bottom: 10px;
}
</style>
