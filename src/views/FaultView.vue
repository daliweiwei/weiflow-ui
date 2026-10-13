<template>
  <div class="faultView">
    询价排序
  </div>
</template>
<script>
export default {
  name: "faultView",
  data() {
    return {
      testData1: [
        { id: 14, cnyQuotation: 1.0, purchaseQty: 1 },
        { id: 15, cnyQuotation: 23.0, purchaseQty: 6 },
        { id: 16, cnyQuotation: 232.0, purchaseQty: null },
        { id: 10, cnyQuotation: 4657.0, purchaseQty: 111.0 },
        { id: 20, cnyQuotation: 123.0, purchaseQty: 51.0 }
      ],
      testData2: [
        { id: 14, cnyQuotation: 1.0, purchaseQty: 3 },
        { id: 24, cnyQuotation: 1.0, purchaseQty: null },
        { id: 15, cnyQuotation: 23.0, purchaseQty: 4 },
        { id: 16, cnyQuotation: 232.0, purchaseQty: null },
        { id: 10, cnyQuotation: 222.0, purchaseQty: 111.0 },
        { id: 12, cnyQuotation: 4657.0, purchaseQty: 111.0 },
        { id: 20, cnyQuotation: 123.0, purchaseQty: 44 }
      ]
    };
  },
  mounted() {
    this.faultSort(this.testData1);
    this.faultSort(this.testData2);
  },
  methods: {
    faultSort(fData) {
      if (!fData || fData.length === 0) return [];
      const sortedData = [...fData].sort(
        (a, b) => a.cnyQuotation - b.cnyQuotation
      );

      let hasEncounteredGap = false;
      const colorMap = {};

      sortedData.forEach((item) => {
        const hasQty = item.purchaseQty != null && item.purchaseQty > 0;
        if (hasQty) {
          colorMap[item.id] = hasEncounteredGap ? "yellow" : "green";
        } else {
          hasEncounteredGap = true;
          colorMap[item.id] = "";
        }
      });

      let tData = fData.map((item) => ({
        ...item,
        color: colorMap[item.id]
      }));
      console.log("tData", tData);
    }
  }
};
</script>
<style scoped lang="scss"></style>
