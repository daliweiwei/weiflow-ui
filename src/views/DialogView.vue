<template>
  <div class="DialogView">
    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button type="primary" plain @click="handleAddOne">
          新增1列
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button type="primary" plain @click="handleAddTwo">-->
      <!--          新增2列-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button type="primary" plain @click="handleAddThree">-->
      <!--          新增3列-->
      <!--        </el-button>-->
      <!--      </el-col>-->
    </el-row>

    <el-dialog
        :title="title"
        class="wl-dialog"
        :visible.sync="oneVisible"
        width="500px"
        append-to-body
        :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="form.userName" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item prop="userNum">
          <span slot="label">
            <el-tooltip content="编号ToolTip" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
            编号
          </span>
          <el-input v-model="form.userId" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
              v-model="form.status"
              placeholder="菜单状态"
              style="width: 100%"
              clearable
          >
            <el-option
                v-for="dict in statusOpt"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="顺序" prop="roleSort">
          <el-input-number
              v-model="form.sort"
              controls-position="right"
              :min="0"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
                v-for="dict in statusOpt"
                :key="dict.value"
                :label="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期" v-model="form.date">
          <el-date-picker
              v-model="form.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开关" v-model="form.status">
          <el-switch v-model="form.status"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="文件上传">-->
        <!--          <FileUpload :limit="3" :value="form.fileList" @fileUploadSync="fileUploadSync"></FileUpload>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="图片上传">-->
        <!--          <ImageUpload :limit="3" :value="form.imageList" @imgUploadSync="imgUploadSync"></ImageUpload>-->
        <!--        </el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DialogView",
  data() {
    return {
      oneVisible: false,
      twoVisible: false,
      threeVisible: false,
      statusOpt: [
        {
          label: "正常",
          value: "0"
        },
        {
          label: "停用",
          value: "1"
        }
      ],
      form: {
        userId: undefined,
        userName: undefined,
        userSort: 0,
        status: "0",
        remark: undefined,
        date: "",
        menuName: "",
        orderNum: "",
        fileList: [],
        imageList: []
      },
      // 表单校验
      rules: {
        userName: [
          {required: true, message: "角色名称不能为空", trigger: "blur"}
        ]
      },
      title: '标题'
    };
  },
  mounted() {
  },
  methods: {
    handleAddOne() {
      this.oneVisible = true;
    },
    handleAddTwo() {
    },
    handleAddThree() {
    },
    submitForm() {
      this.oneVisible = false;
    },
    cancel() {
      this.oneVisible = false;
    },
  }
};
</script>
<style scoped lang="scss"></style>
