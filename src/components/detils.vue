<template>
  <div class="lottery_wrap">
    <div class="lottery_bg" @click="hideLot"></div>
    <div class="lottery_gs" id="xuanzhun"></div>
    <div class="lottery_main">
      <div class="close" @click="hideLot">
        <img src="../assets/close.png">
      </div>
      <div class="loot_res c_yellow" style="padding-top:10px;">操作记录</div>
      <div class="detils-list">
        <li><span class="left">当前局</span><br> <span v-for="(v,i) in list.current">{{i+1}}.{{ v }}</span></li>
        <li><span class="left">上一局</span><br> <span v-for="(v,i) in list.last">{{i+1}}.{{ v }}</span></li>
      </div>

    </div>
  </div>
</template>
<script>
// 记录页面
import { http } from "@/api/request";
export default {
  name: 'detils',
  data() {
    return {
      list: {
        current: '',
        last: ""
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    hideLot() {
      this.$emit('hideLot')
    },
    init() {
      http.gamblingAction().then((res) => {
        console.log(res.data)
        this.list = res.data;
        console.log(this.list[0])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detils-list {
  width: 90%;
  li {
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;

    span {
      font-size: 1.25rem;
      color: #f1d17b;
      text-align: center;
      display: inline-block;
    }
  }
}
</style>
