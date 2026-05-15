<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="btn-box">
      <wl-button type="success">成功按钮</wl-button>
      <wl-button>成功按钮</wl-button>
      <wl-button type="primary">主要按钮</wl-button>
    </div>
    <div class="wei-flex">
      <div class="wei-flex-item">
        <wl-select v-model="value" :options="options" placeholder="请选择城市"/>
      </div>
      <div class="wei-flex-item">
        <wl-select v-model="value" :options="options">
          <template #option="{ item }">
            <span style="color: red">{{ item.label }}</span>
          </template>
        </wl-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      value: '',
      options: [
        {label: '北京', value: 'beijing'},
        {label: '上海', value: 'shanghai'},
        {label: '广州', value: 'guangzhou', disabled: true},
        {label: '深圳', value: 'shenzhen'},
      ],
      opt: [
        {name: '北京', value: 'beijing'},
        {name: '上海', value: 'shanghai'},
        {name: '广州', value: 'guangzhou'},
        {name: '深圳', value: 'shenzhen'},
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wei-flex {
  display: flex;
  margin: 30px 50px;
  gap: 30px;

  .wei-flex-item {
    flex: 1;
  }
}

</style>
