<template>
<div id="modify-pwd">
  <el-dialog title="修改密码" :visible="visible" :before-close="handleClose">
    <el-form :model="modifyPwdForm" :rules="modifyPwdRules" ref="modifyPwdForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model="modifyPwdForm.oldPwd" auto-complete="off" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="modifyPwdForm.newPwd" auto-complete="off" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="modifyPwdForm.checkPwd" auto-complete="off" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleModifyPwd" type="primary">确定</el-button>
        <el-button @click="handleResetModifyPwd">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'modify-pwd',
  data() {
    const validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    const validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.modifyPwdForm.checkPwd !== '') {
          this.$refs.modifyPwdForm.validateField('checkPwd')
        }
        callback()
      }
    }
    const validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyPwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      modifyPwdForm: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      modifyPwdRules: {
        oldPwd: [{
          validator: validateOldPwd,
          trigger: 'blur'
        }],
        newPwd: [{
          validator: validateNewPwd,
          trigger: 'blur'
        }],
        checkPwd: [{
          validator: validateCheckPwd,
          trigger: 'blur'
        }]
      }
    }
  },
  props: {
    visible: Boolean
  },
  computed: {
    ...mapGetters({
      'modifyPwdVisible': 'getModifyPwdVisible'
    })
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.$refs.modifyPwdForm.resetFields()
    },
    handleModifyPwd() {
      this.$refs.modifyPwdForm.validate(valid => {
        if (valid) {
          const para = {
            oldpwd: this.modifyPwdForm.oldPwd,
            newpwd: this.modifyPwdForm.newPwd
          }
          this.axios.post(this.$api.system.modifyPwd, para).then(res => {
            this.handleClose()
            const {
              code,
              msg
            } = res.data
            if (code === 1) {
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleResetModifyPwd() {
      this.$refs.modifyPwdForm.resetFields()
    }
  }
}
</script>
