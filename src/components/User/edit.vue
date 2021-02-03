<template>
  <el-dialog :title="msg" v-model="dialogFormVisible">
    <el-form>
      <el-form-item label="姓名" label-width="100px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="年龄" label-width="100px">
        <el-input v-model="form.age"></el-input>
      </el-form-item>

      <el-form-item label="性别" label-width="100px">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出生日期" label-width="100px">
        <el-date-picker v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="地址" label-width="100px">
        <el-input v-model="form.addr"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="upData">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean
    },
    msg: {
      type: String,
      default: '新建'
    },
    form: {
      type: Object,
      default: {
        id: '',
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    }
  },
  data() {
    return {
      myForm: {}
    };
  },
  methods: {
    upData() {
      console.log(this.myForm)
      // this.$emit('upData', this.myForm)
    }
  },
  mounted() {
    // this.myForm = this.form
    console.log(this.form)
  }
}
</script>

<style lang="scss" scoped>

</style>