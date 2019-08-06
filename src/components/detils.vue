<template>
  <div class="lottery_wrap">
    <div class="lottery_bg" @click="hideLot"></div>
    <div class="lottery_gs" id="xuanzhun"></div>
    <div class="lottery_main">
      <div class="close" @click="hideLot">
        <img src="../assets/close.png">
      </div>
      <div class="loot_res c_yellow" style="padding-top:20px;">操作记录</div>
      <div class="detils-list">
        <li>
          <p class="left">当前局</p>
          <div class="flex-wr">
            <span class="spli" v-for="(v,i) in list.current">{{ v }}</span>
          </div>
        </li>
        <li>
          <p class="left">上一局</p>
          <div class="flex-wr"><span class="spli" v-for="(v,i) in list.last">{{ v }}</span></div>
        </li>
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

<style scoped>
li {
  width: 100%;
  margin: 0;
  padding: 0 10px;
}
p {
  font-size: 1rem;
  color: #f1d17b;
  text-align: left;
}
span {
  font-size: .9rem;
  color: #f1d17b;
  text-align: center;
}
.spli {
  margin-left: 15px;
}
.flex-wr {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
