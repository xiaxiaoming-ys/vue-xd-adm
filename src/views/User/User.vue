<template>
  <div class="manage">
    <el-form class="header-form" :inline="true">
      <el-button type="primary" @click="handleEdit('新建')">新建</el-button>

      <div class="rt">
        <el-input type="text" v-model="search" placeholder="请输入姓名或居住地址"></el-input>
        <el-button type="primary" @click="searchClick" style="margin-left: 10px">搜索</el-button>
      </div>
    </el-form>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;"  v-loading="loading">
        <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="birth" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="sex" :formatter="setSex" label="性别"></el-table-column>
        <el-table-column align="center" prop="addr" show-overflow-tooltip label="地址"></el-table-column>

        <el-table-column align="center" fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="currentChange" hide-on-single-page layout="prev, pager, next" :total="count"></el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog :title="dialog.msg" v-model="dialog.dialogFormVisible">

      <el-form :model="dialog.form" ref="ruleForm" :rules="dialog.rules">
        <el-form-item label="姓名" prop="name" label-width="100px">
          <el-input v-model="dialog.form.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age" label-width="100px">
          <el-input max="120" min="1" v-model="dialog.form.age"></el-input>
        </el-form-item>

        <el-form-item label="性别" label-width="100px">
          <el-select v-model="dialog.form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" label-width="100px">
          <el-input v-model="dialog.form.birth"></el-input>
          <!-- <el-date-picker v-model="dialog.form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker> -->
        </el-form-item>

        <el-form-item label="地址" label-width="100px">
          <el-input v-model="dialog.form.addr"></el-input>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="upData">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
// import Edit from '@/components/User/edit'
import { ElMessage } from 'element-plus';
export default {
  // components: {
  //   Edit
  // },
  data() {
    return {
      // 对话框
      dialog: {
        dialogFormVisible: false,
        msg: '新建',
        form: {
          id: '',
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
          ],
          age: [
            { required: true, pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/, message: '请输入1-120之间数字', trigger: 'change' }
          ],
          data: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
      },
      search: '',
      tableData: [],
      loading: true,
      page: 1, // 当前请求页面
      limit: 10, // 一页显示条数
      count: 0 // 总条数
    }
  },
  methods: {
    // 搜索数据
    searchClick() {
      this.page = 1;
      this.getUserList()
    },
    // 请求列表数据
    getUserList() {
      this.loading = true;
      this.$http.get('/user/getUserList', {
        params: {
          page: this.page,
          name: this.search,
          limit: this.limit
        }
      })
      .then(res => {
        this.count = res.data.count;
        this.tableData = res.data.list;
        this.loading = false;
        console.log(res.data.list[0])
      })
    },
    // 分页跳转
    currentChange(index) {
      this.page = index;
      this.getUserList()
    },
    // 编辑 || 新建
    handleEdit(item) {
      if (item === '新建') {
        this.dialog.msg = '新建'
        item = {}
      } else {
        this.dialog.msg = '编辑'
      }

      this.dialog.form = {
        id: item.id,
        name: item.name,
        addr: item.addr,
        age: item.age,
        birth: item.birth,
        sex: item.sex == undefined ? '' : this.setSex(item)
      }
      this.dialog.dialogFormVisible = true;
    },
    // 编辑确认 || 新建
    upData() {
      const tpl = {
        sex: '请选择性别',
        birth: '请输入出生年月',
        addr: '请输入地址'
      }

      for(let key in tpl ) {
        if (!this.dialog.form[key]) {
          ElMessage(tpl[key]);
          return
        }
      }

      this.$refs.ruleForm.validate((result) => {
        if (result) {
          this.dialog.dialogFormVisible = false;
          const type = this.dialog.msg === '新建' ? 'post' : 'put';
          const url = this.dialog.msg === '新建' ? '/user/createUser' : '/user/updateUser';

          this.$http[type](url, this.dialog.form)
            .then(res => {
              console.log(res)
              this.getUserList()
              ElMessage.success({
                message: res.data.data.message,
                type: 'success'
              });
            })
            .catch(err => {
              ElMessage.success({
                message: err.data.message,
                type: 'error'
              });
            })
        }
      });
    },
    // 删除
    handleDelete(item) {
      this.$http.delete('/user/deleteUser', {
        params: {
          id: item.id
        }
      })
      .then(res => {
        this.getUserList()
        console.log(res)
        ElMessage.success({
          message: '删除成功',
          type: 'success'
        });
      })
      .catch(err => {
        ElMessage.success({
          message: err.data.message,
          type: 'success'
        });
      })
    },
    // 设置性别
    setSex(row) {
      return row.sex == 0 ? '男' : '女'
    }
  },
  mounted() {
    this.getUserList()
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
.header-form{
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rt{
    display: flex;
    justify-content: end;
    align-items: center;
  }
}

.table-box{
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  .el-pagination{
    margin-top: 20px;
    margin-right: 20px;
    align-self: flex-end;
  }
}
</style>