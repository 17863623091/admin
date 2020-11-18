<template>
  <div class="login">
    <div class="con">
      <h2>登录</h2>
      <div class="input">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="input">
        <el-input v-model="user.password" placeholder="请输入密码" type=""></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" style="width:400px" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageLogin } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
        changeUser:"changeUser"
    }),
    // $router.push("/")
    login() {
      reqManageLogin(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert('登录成功')
          console.log(res.data.list)
          this.changeUser(res.data.list)
          this.$router.push('/')
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #543444, #403a53, #303d5f);
}
.con {
  position: absolute;
  width: 400px;
  height: 260px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.input {
  margin-bottom: 15px;
}
.btn {
  margin-top: 20px;
}
</style>