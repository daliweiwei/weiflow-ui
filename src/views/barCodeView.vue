<template>
  <div class="barCodeView">
    <h4>条形码</h4>
    <p>https://github.com/lindell/JsBarcode/wiki/Options</p>
    <p>tag:String 默认值：svg 渲染类型：svg / canvas / img</p>
    <p>value:String 默认值：'' 条形码内容</p>
    <p>format:String 默认值：CODE128 条形码格式</p>
    <p>width:Number 默认值：2 条宽</p>
    <p>height:Number 默认值：100 条码高度</p>
    <p>displayValue:Boolean 默认值：true 是否显示文本</p>
    <p>fontSize:Number 默认值：16 文本字体大小</p>
    <p>margin:Number 默认值：16 外边距</p>
    <p>lineColor:String 默认值：#000 | 线条颜色</p>
    <p>background:String 默认值：#fff | 背景色</p>
    <p>textAlign:String 默认值：center | 文本对齐方式</p>
    <p>textPosition:String 默认值：bottom | 文本位置</p>
    <wl-bar-code
        tag="svg"
        :value="code"
        format="CODE128"
        :width="2"
        :height="80"
        :displayValue="true"
        @rendered="handleRendered"
        @error="handleError"
    />
  </div>
</template>
<script>
export default {
  name: "barCodeView",
  data() {
    return {
      code: "liweiliang",
    };
  },
  mounted() {
  },
  methods: {
    handleRendered() {
      console.log("条形码渲染成功");
    },
    handleError(err) {
      console.error("条形码渲染失败", err);
    }
  }
};
</script>
<style scoped lang="scss">

</style>