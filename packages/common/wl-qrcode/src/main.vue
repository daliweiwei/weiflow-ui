<!-- wl-qrcode components -->
<!--
  QRCode
  <wl-qr-code ref="qrCode" :value="text" :size="180" :margin="2" color-dark="#000000" color-light="#ffffff" error-correction-level="H" />
  value:String 二维码内容
  size:Number 大小 默认值:200
  margin:Number 边距 默认1
  colorDark:String 前景色 默认#000000
  colorLight:String 背景色 默认#ffffff
  errorCorrectionLevel:String 容错级别 默认 M
  容错级别：L / M / Q / H
-->
<template>
  <div class="WlQrCode">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";

export default {
  name: "WlQrCode",
  inheritAttrs: false,
  props: {
    // 二维码内容
    value: {
      type: String,
      default: ""
    },
    // 大小
    size: {
      type: Number,
      default: 200
    },
    // 边距
    margin: {
      type: Number,
      default: 1
    },
    // 前景色
    colorDark: {
      type: String,
      default: "#000000"
    },
    // 背景色
    colorLight: {
      type: String,
      default: "#ffffff"
    },
    // 容错级别：L / M / Q / H
    errorCorrectionLevel: {
      type: String,
      default: "M"
    }
  },
  data() {
    return {
      qrCodeUrl: "",
      qrCodeOpt: {
        margin: 1,
        errorCorrectionLevel: "H"
      }
    };
  },
  mounted() {
    this.renderQrCode();
  },
  watch: {
    value: "renderQrCode",
    size: "renderQrCode",
    margin: "renderQrCode",
    colorDark: "renderQrCode",
    colorLight: "renderQrCode",
    errorCorrectionLevel: "renderQrCode"
  },
  methods: {
    async renderQrCode() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      if (!this.value) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      try {
        await QRCode.toCanvas(this.$refs.canvas, this.value, {
          width: this.size,
          margin: this.margin,
          errorCorrectionLevel: this.errorCorrectionLevel,
          color: {
            dark: this.colorDark,
            light: this.colorLight
          }
        });
      } catch (error) {
        console.error("二维码生成失败：", error);
      }
    },
    toDataURL(type = "image/png") {
      const canvas = this.$refs.canvas;
      return canvas ? canvas.toDataURL(type) : "";
    },
    // 下载二维码
    download(filename = "qrcode.png") {
      const url = this.toDataURL();
      if (!url) return;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    }
  }
};
</script>
<style lang="scss">
.WlQrCode {
  display: inline-block;

  canvas {
    display: block;
  }
}
</style>
