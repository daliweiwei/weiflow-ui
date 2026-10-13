<template>
  <div class="QrCodeView">
    <h4>QRCode</h4>
    <p>value:String 二维码内容</p>
    <p>size:Number 大小 默认值:200</p>
    <p>margin:Number 边距 默认1</p>
    <p>colorDark:String 前景色 默认#000000</p>
    <p>colorLight:String 背景色 默认#ffffff</p>
    <p>errorCorrectionLevel:String 容错级别 默认 M</p>
    <p>容错级别：L / M / Q / H</p>
    <wl-qr-code
        ref="qrCode"
        :value="text"
        :size="180"
        :margin="2"
        color-dark="#000000"
        color-light="#ffffff"
        error-correction-level="H"
    />
  </div>
</template>
<script>
export default {
  name: "QrCodeView",
  data() {
    return {
      text: "https://www.baidu.com",
    };
  },
  mounted() {
  },
  methods: {}
};
</script>
<style scoped lang="scss">

</style>