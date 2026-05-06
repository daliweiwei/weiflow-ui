## weiFlow-ui
WeiFlowUI 是一个基于 element-ui 进行二次封装的扩展的组件库。

## Install
```shell
npm install weiflow-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import WeiFlowUI from 'weiflow-ui'
import 'weiflow-ui/dist/weiflow-ui.css'
Vue.use(WeiFlowUI)

// or
import {
  WlSelect,
  WlButton
  // ...
} from 'weiflow-ui'

Vue.component(WlSelect.name, WlSelect)
Vue.component(WlButton.name, WlButton)
```

For more information, please refer to [Quick Start](https://github.com/daliweiwei/weiflow-ui/issues) in our documentation.

## License
[MIT](LICENSE)

