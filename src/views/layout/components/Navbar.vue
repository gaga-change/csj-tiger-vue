<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="usercont">
      <span><svg-icon icon-class="user" />{{userInfo.truename}}</span>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="/static/img/401.089007e.gif">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="modifyPasswordShow = true" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改密码"
      :visible.sync="modifyPasswordShow"
      center
      width="450px">
      <el-form :model="form" :rules="formrule" ref="ruleForm2">
        <el-form-item label="原密码" label-width="120px" prop="oldpassword">
          <el-input type="password" v-model="form.oldpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="newpassword">
          <el-input type="password" v-model="form.newpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="再输入新密码" label-width="120px" prop="renewpassword">
          <el-input type="password" v-model="form.renewpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordShow = false">取 消</el-button>
        <el-button type="primary" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatepassword } from '@/api/login'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { LoginPath } from '@/utils'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不小于6位'))
      } else {
        if (this.form.newpassword !== '') {
          this.$refs.ruleForm2.validateField('renewpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不小于6位'))
      } else if (value !== this.form.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      modifyPasswordShow: false,
      form: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      },
      formrule: {
        oldpassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        renewpassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ])
  },
  methods: {
    modifyPassword() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          updatepassword({
            userId: this.userInfo.id,
            oldPw: this.form.oldpassword,
            newPw: this.form.newpassword
          }).then(
            res => {
              if(JSON.parse(res.data).code=='success'){
                 this.$message.success('修改密码成功')
                 this.modifyPasswordShow = false
              } else{
                this.$message({
                  showClose: true,
                  message: '修改密码出错',
                  type: 'error'
                });
              }
             
            }
          ).catch(err => {
             this.$message({
                  showClose: true,
                  message: '数据请求出错',
                  type: 'error'
              });
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .usercont {
    position: absolute;
    right: 100px;
    top: 8px;
    color: #666;
    line-height: 35px;
  }
  .need {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
