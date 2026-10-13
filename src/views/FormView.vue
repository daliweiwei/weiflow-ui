<template>
  <el-container>
    <el-main>
      <h4>form 表单</h4>

      <el-form ref="form" :model="form" label-width="160px" class="wl-form">
        <el-form-item label="SAP">
          <wl-multiple-choice v-model="multipleChoice" @enter="handleChoiceEnter" pasteTitle="SAP number"></wl-multiple-choice>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="名称禁用">
          <el-input v-model="form.name1" disabled></el-input>
        </el-form-item>
        <el-form-item label="radio1">
          <el-radio-group v-model="form.radio1" size="medium" class="wl-radio">
            <el-radio-button label="2022">2022年</el-radio-button>
            <el-radio-button label="2021">2021年</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="radio2">
          <el-radio-group v-model="form.radio2" size="medium" class="wl-radio">
            <el-radio :label="3">备选项1</el-radio>
            <el-radio :label="6">备选项2</el-radio>
            <el-radio :label="9">备选项3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="checked">
          <el-checkbox-group v-model="form.checkedCities">
            <el-checkbox v-for="city in cityOptions" :label="city" :key="city">
              {{ city }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <h5>Select 选择器</h5>
        <el-form-item label="基础用法">
          <el-select v-model="form.selValue1" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有禁用选项">
          <el-select v-model="form.selValue2" placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可清空单选">
          <el-select
              v-model="form.selValue3"
              placeholder="请选择"
              clearable
              class="wl-select"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基础多选">
          <el-select v-model="form.selValue4" multiple placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基础多选2">
          <el-select
              v-model="form.selValue5"
              multiple
              collapse-tags
              placeholder="请选择"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <h5>Cascader 级联选择器</h5>
        <el-form-item label="默认 click 触发子菜单">
          <el-cascader
              v-model="form.casValue01"
              :options="casOptions1"
              @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="hover 触发子菜单">
          <el-cascader
              v-model="form.casValue02"
              :options="casOptions1"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="禁用选项">
          <el-cascader
              v-model="form.casValue03"
              :options="casOptions2"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="可清空">
          <el-cascader
              v-model="form.casValue04"
              :options="casOptions1"
              clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="仅显示最后一级">
          <el-cascader
              v-model="form.casValue05"
              :options="casOptions1"
              :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="默认显示所有Tag">
          <el-cascader
              v-model="form.casValue06"
              :options="casOptions1"
              :props="{ multiple: true }"
              clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="折叠展示Tag">
          <el-cascader
              v-model="form.casValue07"
              :options="casOptions1"
              :props="{ multiple: true }"
              collapse-tags
              clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="单选选择任意一级选项">
          <el-cascader
              v-model="form.casValue08"
              :options="casOptions1"
              :props="{ checkStrictly: true }"
              clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="多选选择任意一级选项">
          <el-cascader
              v-model="form.casValue09"
              :options="casOptions1"
              :props="{ multiple: true, checkStrictly: true }"
              clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="单选可搜索">
          <el-cascader
              v-model="form.casValue10"
              placeholder="试试搜索：指南"
              :options="casOptions1"
              filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="多选可搜索">
          <el-cascader
              v-model="form.casValue11"
              placeholder="试试搜索：指南"
              :options="casOptions1"
              :props="{ multiple: true }"
              filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="级联面板">
          <el-cascader-panel
              v-model="form.casValue12"
              :options="casOptions1"
          ></el-cascader-panel>
        </el-form-item>

        <h5>TimePicker 时间选择器</h5>
        <el-form-item label="固定时间点">
          <el-time-select
              v-model="form.timeValue1"
              :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"
              placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="任意时间点">
          <el-time-picker
              v-model="form.timeValue2"
              :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
              placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="固定时间范围">
          <el-time-select
              placeholder="起始时间"
              v-model="form.startTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
          >
          </el-time-select>
          <span style="margin: 0 5px">-</span>
          <el-time-select
              placeholder="结束时间"
              v-model="form.endTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: form.startTime
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="任意时间范围">
          <el-time-picker
              is-range
              v-model="form.timeValue3"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="计数器">
          <el-input-number
              v-model="form.inputNumValue"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
          ></el-input-number>
        </el-form-item>
        <h5>DatePicker 日期选择器</h5>
        <el-form-item label="默认">
          <el-date-picker
              v-model="form.dataValue1"
              type="date"
              placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="带快捷选项">
          <el-date-picker
              v-model="form.dataValue2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周">
          <el-date-picker
              v-model="form.dataValue3"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="月">
          <el-date-picker
              v-model="form.dataValue4"
              type="month"
              placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年">
          <el-date-picker
              v-model="form.dataValue5"
              type="year"
              placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="多个日期">
          <el-date-picker
              type="dates"
              v-model="form.dataValue6"
              placeholder="选择一个或多个日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="多个月">
          <el-date-picker
              type="months"
              v-model="form.dataValue7"
              placeholder="选择一个或多个月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="多个年">
          <el-date-picker
              type="years"
              v-model="form.dataValue8"
              placeholder="选择一个或多个年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
              v-model="form.dataValue9"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期范围带快捷选项">
          <el-date-picker
              v-model="form.dataValue10"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="月份范围">
          <el-date-picker
              v-model="form.dataValue11"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="带快捷选项">
          <el-date-picker
              v-model="form.dataValue12"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :picker-options="pickerOptions3"
          >
          </el-date-picker>
        </el-form-item>
        <h5>DateTimePicker 日期时间选择器</h5>
        <el-form-item label="默认">
          <el-date-picker
              v-model="form.dataTimeValue1"
              type="datetime"
              placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="带快捷选项">
          <el-date-picker
              v-model="form.dataTimeValue2"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions4"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设置默认时间">
          <el-date-picker
              v-model="form.dataTimeValue3"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期和时间范围-默认">
          <el-date-picker
              v-model="form.dataTimeValue4"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期和时间范围-带快捷选项">
          <el-date-picker
              v-model="form.dataTimeValue5"
              type="datetimerange"
              :picker-options="pickerOptions5"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="switch">
          <el-switch
              v-model="form.switchValue"
              active-color="#009999"
              inactive-color="#C0CCDA"
          >
          </el-switch>
        </el-form-item>
        <!--        <el-form-item label="default"></el-form-item>-->
        <!--        <el-form-item label="default"></el-form-item>-->
        <!--        <el-form-item label="default"></el-form-item>-->
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "FormView",
  data() {
    return {
      multipleChoice: "",
      form: {
        name: "",
        name1: "名称禁用",
        radio1: "2022",
        radio2: "",
        checkedCities: [],
        selValue1: "",
        selValue2: "",
        selValue3: "",
        selValue4: [],
        selValue5: [],
        casValue01: "",
        casValue02: "",
        casValue03: "",
        casValue04: "",
        casValue05: "",
        casValue06: "",
        casValue07: "",
        casValue08: "",
        casValue09: "",
        casValue10: "",
        casValue11: "",
        casValue12: "",
        casValue13: "",
        timeValue1: "",
        timeValue2: "",
        timeValue3: [
          new Date(2016, 9, 10, 8, 40),
          new Date(2016, 9, 10, 9, 40)
        ],
        startTime: "",
        endTime: "",
        inputNumValue: "",
        dataValue1: "",
        dataValue2: "",
        dataValue3: "",
        dataValue4: [],
        dataValue5: [],
        dataValue6: "",
        dataValue7: "",
        dataValue8: "",
        dataValue9: "",
        dataValue10: "",
        dataValue11: "",
        dataValue12: "",
        dataTimeValue1: "",
        dataTimeValue2: "",
        dataTimeValue3: "",
        dataTimeValue4: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        dataTimeValue5: "",
        switchValue: true,
        value: ""
      },
      options: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "双皮奶"
        },
        {
          value: "3",
          label: "蚵仔煎"
        },
        {
          value: "4",
          label: "龙须面"
        },
        {
          value: "5",
          label: "北京烤鸭"
        }
      ],
      options2: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      cityOptions: ["上海", "北京", "广州", "深圳"],
      casOptions1: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      casOptions2: [
        {
          value: "zhinan",
          label: "指南",
          disabled: true,
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      pickerOptions3: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      pickerOptions4: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions5: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    handleChoiceEnter(val) {
      console.log(val);
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped lang="scss"></style>
