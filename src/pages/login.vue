<template>
  <div>
    <div class="login_wrap" v-if="login">
      <div class="login_main">
        <div class="login_tit">
          <img src="../assets/login_tit.png">
        </div>
        <div class="login_form">
          <div class="item">
            <input type="phone" placeholder="请输入手机号" maxlength="11" v-model="phone">
          </div>
          <div class="item">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="register_a" @click="register_open">免费注册</div>
          <div class="login_btn" @click="Login">
            <img src="../assets/login_btn.png">
          </div>
        </div>
      </div>
    </div>

    <div class="login_wrap register_wrap" v-if="register">
      <div class="login_main">
        <div class="login_tit">
          <img src="../assets/register_tit.png">
        </div>
        <div class="login_form">
          <div class="item">
            <input type="phone" placeholder="请输入手机号" maxlength="11" class="mobile" v-model="r_phone">
            <span v-show="sendAuthCode" class="get_code" @click="getAuthCode">获取验证码</span>
            <span v-show="!sendAuthCode" class="get_code">
              {{auth_time}}s
            </span>
          </div>
          <div class="item">
            <input type v-model='smsCode' placeholder="请输入验证码">
          </div>
          <div class="item">
            <input type="password" placeholder="请输入密码" v-model="r_password">
          </div>
          <div class="item">
            <input type="password" placeholder="请再次输入密码" v-model="r_password_s">
          </div>
          <div class="register_a" @click="login_open">已有账号，去登录</div>
          <div class="login_btn" @click="Register">
            <img src="../assets/register_btn.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { web_url, http } from "@/api/request";
export default {
  name: "login",
  data() {
    return {
      register: false,
      login: true,
      phone: "11111111111",
      password: "123456",
      r_phone: "",
      r_password: "",
      r_password_s: "",
      auth_time: "",
      sendAuthCode: true,
      smsCode: ''
    };
  },
  mounted() {
    localStorage.removeItem('token');
    this.phone = localStorage.getItem('phone')
    this.password = localStorage.getItem('password')
  },
  methods: {
    register_open: function () {
      this.register = true;
      this.login = false;
    },
    login_open: function () {
      this.register = false;
      this.login = true;
    },
    Login: function () {
      let that = this;
      if (this.phone == '') {
        this.$Message.error('手机号码必填');
        return false;
      }
      if (!this.checkPhone(this.phone)) {
        return false
      }
      if (this.password == '') {
        this.$Message.error('密码必填');
        return false;
      }
      http
        .login({
          username: this.phone,
          password: this.password,
          grant_type: "password",
          client_id: "4d7040f9-5459-4c6f-b145-f2842ea651a0",
          client_secret: "6eb2021a-9b3d-4b8a-b4d3-f4cc33d9fc1f",
          scope: "all"
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$Message.error(res.data.msg);
            return false;
          }
          window.localStorage.setItem("token", res.data.access_token);
          window.localStorage.setItem("password", this.password);
          window.localStorage.setItem("phone", this.phone);
          this.$router.push("/index");
          this.$Loading.finish();
          this.$Message.success("登陆成功");
        }).catch(res => {
          this.$Message.warning('用户名或密码错误')
        })
    },
    Register() {
      if (this.r_phone == '') {
        this.$Message.error('手机号码必填');
        return false;
      }
      if (!this.checkPhone(this.r_phone)) {
        return false
      }
      if (this.smsCode == '') {
        this.$Message.error('验证码必填');
        return false;
      }
      if (this.r_password == '') {
        this.$Message.error('密码必填');
        return false;
      }
      http
        .regster({
          phone: this.r_phone,
          alias: "user",
          password: this.r_password,
          smsCode: this.smsCode
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$Message.error(res.data.msg);
          } else {
            this.$Loading.finish();
            this.$Message.success("注册成功");
            this.phone = this.r_phone;
            this.password = this.r_password;
            this.Login();
          }

        });
    },
    checkPhone(r_phone) {
      let phone = r_phone;
      if (phone == '' || phone.toString().length < 10) {
        this.$Message.error('手机号码有误，请重填');
        return false;
      } else {
        return true;
      }
    },
    // 获取验证码
    getAuthCode: function () {
      if (!this.checkPhone(this.r_phone)) {
        return false
      }
      http.sendCode({ phone: this.r_phone }).then(res => {
        if (res.data.status === 0) {
          this.$Message.error(res.data.msg);
          return false;
        }
        this.sendAuthCode = false;
        this.auth_time = 60;
        var auth_timetimer = setInterval(() => {
          this.auth_time--;
          if (this.auth_time <= 0) {
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
        this.$Message.success("已发送，注意查收");
      })

    }
  }
};
</script>
<style>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: url("~@/assets/login.jpg");
  background-size: cover;
}

.login_main {
  width: 20.625rem;
  height: 30.625rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("~@/assets/login.png");
  background-size: cover;
}

.login_tit img {
  display: block;
  width: 7.5625rem;
  height: 2.8125rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -0.625rem;
}

.login_form {
  width: 15rem;
  margin: 0 auto;
  margin-top: 5.625rem;
}

.login_form .item {
  width: 15rem;
  height: 2.5rem;
  margin: 0 auto;
  margin-top: 1.25rem;
}

.login_form .item input {
  width: 100%;
  height: 2.5rem;
  background: transparent;
  border: none;
  font-size: 0.9375rem;
  padding-left: 0.625rem;
  color: #fff;
  background: #3c1843;
  border-radius: 0.15625rem;
  border: 0.0625rem solid #48126d;
}

.register_a {
  text-align: right;
  color: #fff;
  font-size: 0.875rem;
  margin-top: 0.625rem;
}

.login_btn img {
  display: block;
  width: 7.34375rem;
  height: 2.5rem;
  margin: 0 auto;
  margin-top: 2.1875rem;
}
.register_wrap .item .mobile {
  width: 9.375rem;
  float: left;
}
.get_code {
  background: linear-gradient(to right top, #932df9, #b367ff);
  display: block;
  width: 5rem;
  height: 2.5rem;
  float: right;
  border-radius: 0.15625rem;
  line-height: 2.4375rem;
  text-align: center;
  font-size: 0.875rem;
  color: #fff;
}
</style>
