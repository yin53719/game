<template>
  <div class="hello">
    <div class="top_wrap">
      <div class="top" id="lottery">
        <!--鸡-->
        <div class="block_item chicken lottery-unit lottery-unit-0">
          <img src="@/assets/kjh.png">
          <img src="@/assets/kj.png">
        </div>
        <!--梨-->
        <div class="block_item pear lottery-unit lottery-unit-1">
          <img src="@/assets/klh.png">
          <img src="@/assets/kl.png">
        </div>
        <div class="djdl">
          <img src="@/assets/dj.png">
        </div>
        <div class="top_wrap_2">
          <div class="state_wrap">
            <div class="se_dj">{{seconds}}</div>
          </div>
          <div class="block_ite total">
            <div class="total_tit">近一小时出现概率</div>
            <ul>
              <li>有鸡 {{sum_chicken?sum_chicken:''}}%</li>
              <li>大吉大利 {{sum_all?sum_all:''}}%</li>
              <li>有梨 {{sum_pear?sum_pear:''}}%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="list_wrap">
      <div class="gonggao">
        <div class="laba">
          <img src="@/assets/laba.png">
        </div>
        <div class="g_text">
          <marquee>{{notification}}</marquee>
        </div>
      </div>
      <div class="list_top"></div>
      <div class="list_main">
        <div class="list_tab">
          <ul>
            <li>总额</li>
            <li>赔率</li>
            <li>类型</li>
            <li>操作</li>
          </ul>
        </div>
        <div class="list_li">
          <ul v-for="(item,i) in gamblingList" :key="i">
            <li>{{amount(item)}}/{{item.stake}}</li>
            <li>1:{{item.odds}}</li>
            <li>
              {{item.choice == "CHICKEN"?"有鸡":''}} {{item.choice == 'NO_CHICKEN'?'无鸡':''}} {{item.choice ==
              "PEAR"?'有梨':""}} {{item.choice == "NO_PEAR"?"无梨":""}} {{item.choice == "NOTHING"?"平安是福":""}} {{item.choice
              == "ALL"?"大吉大利":""}}
            </li>
            <li @click="togg_xz_show(item.id)">
              <img src="@/assets/xz.png">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fix_btn">
      <div class="blance">
        <ul>
          <li>
            <dl>
              <dt>
                <img src="@/assets/id.png">
              </dt>
              <dd class="c_fff">{{userInfo.phone}}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>
                <img src="@/assets/bit.png">
              </dt>
              <dd class="c_yellow">{{userInfo.wallet?userInfo.wallet.balance:''}}</dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="btn">
        <img src="@/assets/sz.png" @click="togg_up_open">
        <img src="@/assets/qs.png" @click="togg_trend_show">
        <img src="@/assets/jl.png" @click="togg_detils_show">
        <img :src="play_url" @click="isPlay">
      </div>
    </div>
    <!--上庄-->
    <div class="open_wrap" v-if="up_open">
      <div class="open_bg" @click="togg_up_open"></div>
      <div class="open_main">
        <div class="open_line">
          <img src="@/assets/list_top.png">
        </div>
        <div class="close" @click="togg_up_open">
          <img src="@/assets/close.png">
        </div>
        <div class="open_box">
          <div class="open_tit">坐庄</div>
          <form class="form_box">
            <div class="form_item" @click="CHICKEN">
              <img src="@/assets/kjh.png" class="up_btn" v-if="isCHICKEN">
              <img src="@/assets/kj.png" class="up_btn" v-else>
            </div>
            <div class="form_item input_wrap">
              <input class="mt_10" type placeholder="请输入注额" v-model="chicken_amount" @blur="scroll">
              <select class="mt_10" type placeholder="请输入注额" v-model="ch_odds">
                <option value="0">请选择赔率</option>
                <option :value="item" v-for="(item,i) in chicken_arry" :key="i">1:{{item}}</option>
              </select>
            </div>
            <div class="form_item" @click="up_gambling('chicken')">
              <img src="@/assets/btn.png" class="up_btn">
            </div>
            <div class="state">{{isCHICKEN?'有鸡':'无鸡'}}</div>
          </form>

          <form class="form_box">
            <div class="form_item" @click="PEAR">
              <img src="@/assets/klh.png" class="up_btn" v-if="isPEAR">
              <img src="@/assets/kl.png" class="up_btn" v-else>
            </div>
            <div class="form_item input_wrap">
              <input class="mt_10" type placeholder="请输入注额" v-model="pear_amount" @blur="scroll">
              <select class="mt_10" v-model="pe_odds">
                <option value="0">请选择赔率</option>
                <option :value="item" v-for="(item,i) in pear_arry" :key="i">1:{{item}}</option>
              </select>
            </div>
            <div class="form_item" @click="up_gambling('pear')">
              <img src="@/assets/btn.png" class="up_btn">
            </div>
            <div class="state">{{isPEAR?'有梨':'无梨'}}</div>
          </form>

          <form class="form_box">
            <div class="form_item" @click="double">
              <img src="@/assets/djh.png" class="up_btn" v-if="isdouble">
              <img src="@/assets/dj.png" class="up_btn" v-else>
            </div>
            <div class="form_item input_wrap">
              <input class="mt_10" type placeholder="请输入注额" v-model="double_amount" @blur="scroll">
              <select class="mt_10" v-model="db_odds">
                <option value="0">请选择赔率</option>
                <option :value="item" v-for="(item,i) in all_arry" :key="i">1:{{item}}</option>
              </select>
            </div>
            <div class="form_item" @click="up_gambling('djdl')">
              <img src="@/assets/btn.png" class="up_btn">
            </div>
            <div class="state">{{isdouble?'大吉大利':'平安是福'}}</div>
          </form>
        </div>
      </div>
    </div>
    <!--下注-->
    <div class="open_wrap" v-show="xz_show">
      <div class="open_bg" @click="togg_xz_show"></div>
      <div class="open_main">
        <div class="open_line">
          <img src="@/assets/list_top.png">
        </div>
        <div class="close" @click="togg_xz_show">
          <img src="@/assets/close.png">
        </div>
        <div class="open_box">
          <div class="open_tit">下注{{total}}</div>
          <div class="xz_wrap">
            <div id="J_bet_list1" class="c_bet_list J_bet_list"></div>
            <div class="person">个人：{{sele_num}}</div>
          </div>
          <div class="xz_sele">
            <ul>
              <li @click="selenum(100)">
                <img src="@/assets/100.png">
              </li>
              <li @click="selenum(200)">
                <img src="@/assets/200.png">
              </li>
              <li @click="selenum(500)">
                <img src="@/assets/500.png">
              </li>
              <li @click="selenum(1000)">
                <img src="@/assets/1000.png">
              </li>
              <li @click="selenum(5000)">
                <img src="@/assets/5000.png">
              </li>
              <li @click="selenum(10000)">
                <img src="@/assets/10000.png">
              </li>
            </ul>
          </div>
          <div class="form_wrap">
            <div class="btn" @click="bets">
              <img src="@/assets/qrxz.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 走势 -->
    <div class="open_wrap" v-if="trend_show">
      <div class="open_bg" @click="togg_trend_show"></div>
      <div class="open_main">
        <div class="open_line">
          <img src="@/assets/list_top.png">
        </div>
        <div class="close" @click="togg_trend_show">
          <img src="@/assets/close.png">
        </div>
        <div class="open_box">
          <div class="open_tit">近30局结果走势</div>
          <div class="trend_wrap">
            <div class="trend_head">
              <ul>
                <li>
                  <img src="@/assets/kjh.png">
                </li>
                <li>
                  <img src="@/assets/klh.png">
                </li>
                <li>
                  <img src="@/assets/djh.png">
                </li>
              </ul>
            </div>
            <div class="trend_body">
              <ul v-for="(item,i) in trend" :key="i">
                <li item in trend>
                  <img src="@/assets/red.png" v-if="item =='CHICKEN'||item =='ALL'">
                  <img src="@/assets/black.png" v-else>
                </li>
                <li>
                  <img src="@/assets/red.png" v-if="item == 'PEAR'|| item == 'ALL'">
                  <img src="@/assets/black.png" v-else>
                </li>
                <li>
                  <img src="@/assets/red.png" v-if="item =='ALL' ">
                  <img src="@/assets/black.png" v-else>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 开奖结果 -->
    <div class="lottery_wrap" v-if="lot_show">
      <div class="lottery_bg" @click="hideLot"></div>
      <div class="lottery_gs" id="xuanzhun"></div>
      <div class="lottery_main">
        <div class="close" @click="hideLot">
          <img src="@/assets/close.png">
        </div>
        <div class="lottery_tit c_yellow">
          <p v-if="lot_type == 'CHICKEN'">有鸡无梨平安是福</p>
          <p v-if="lot_type == 'PEAR'">无鸡有梨平安是福</p>
          <p v-if="lot_type == 'ALL'">有鸡有梨大吉大利</p>
          <p v-if="lot_type == 'NOTHING'">无鸡无梨平安是福</p>
        </div>
        <div class="lott_item">
          <ul>
            <li>
              <img src="@/assets/kjh.png" v-if="lot_type =='CHICKEN'||lot_type =='ALL'">
              <img src="@/assets/kj.png" v-else>
            </li>
            <li>
              <img src="@/assets/klh.png" v-if="lot_type =='PEAR'||lot_type =='ALL'">
              <img src="@/assets/kl.png" v-else>
            </li>
            <li>
              <img src="@/assets/djh.png" v-if="lot_type =='ALL' ">
              <img src="@/assets/dj.png" v-else>
            </li>
          </ul>
        </div>
        <div class="loot_res c_yellow">本局结果：{{profit}}</div>
      </div>
    </div>

    <detils @hideLot="detilsColse" v-if="isShowDetils"></detils>
  </div>
</template>

<script>
var w =
  document.documentElement.clientWidth < 750
    ? document.documentElement.clientWidth
    : "750";
import { web_url, http } from "@/api/request";
import $ from "jquery";
import { Stomp } from "stompjs/lib/stomp.js";
import moment from "moment";
import detils from '@/components/detils'
let sock;
let stompClient;
let bgAudio = new Audio();
const gamTypeOrder = {
  CHICKEN: 1,
  NO_CHICKEN: 2,
  PEAR: 3,
  NO_PEAR: 4,
  ALL: 5,
  NOTHING: 6
};
export default {
  name: "HelloWorld",
  components: {
    detils
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      up_open: false,
      xz_show: false,
      trend_show: false,
      gambling: [],
      sele_type: "",
      sele_num: 0,
      odds: "", //赔率
      stake: "", //注额
      total: "", //总注
      botbetnum: 30, //机器人下注数
      botrandom: 10, //机器人随机幅度
      gamblingId: "",
      toastShow: false,
      toastText: "",
      WebSocket: "",
      sub_total: "",
      seconds: "",
      lot_type: "CHICKEN",
      lot_show: false,
      trend: [],
      isCHICKEN: true,
      isPEAR: true,
      isdouble: true,
      chicken_amount: "",
      chicken_arry: [1.2, 1.25, 1.3, 1.35, 1.4],
      pear_arry: [0.8, 0.85, 0.9, 0.95, 1],
      all_arry: [2.75, 2.8, 2.85, 2.9, 2.95],
      ch_odds: "0",
      pe_odds: "0",
      db_odds: "0",
      pear_amount: "",
      double_amount: "",
      sum_total: {},
      userInfo: {},
      sele_id: [],
      profit: "",
      play: false,
      play_url: require("@/assets/lbg.png"),
      // music_url: "../../static/music/m.mp3",
      music_url: require("@/../static/music/m.mp3"),
      notification: "",
      preTotel: 0,
      isShowDetils: false
    };
  },
  mounted() {
    let that = this;
    this.get_gambling();
    this.WebSocket = new this.socket();
    this.WebSocket.get_lock(function (res) {
      that.music_url = require("@/../static/music/翻牌.mp3");
      // 播放音乐
      that.maudio();
      // debugger;
      console.log(res.body)
      if (res.body === "false") {
        that.music_url = require("@/../static/music/m.mp3");
        that.maudio();
        // that.state();
        that.statistics();
        // 获取走势
        that.getTrend()
        that.sele_id = [];
      }
    });
    // this.WebSocket.get_lottery(function(res) {
    //   let data = JSON.parse(res.body);
    //   that.lot_type = data;
    //   that.get_lottery(data);
    // });
    // 获取状态
    this.state();
    // 获取汇总
    this.statistics();
    // 获取走势
    this.getTrend()
    // 调用用户信息
    this.getUserInfo();
    // 获取通知
    http.notification({}).then(res => {
      console.log(res, "tongzhi");
      this.notification = res.data.notification;
    });
    setInterval(this.get_gambling, 5000);
    // 播放音乐
    that.maudio();
  },
  watch: {
    up_open: function (value) {
      if (!value) {
        console.log(value);
      }
    }
  },
  computed: {
    sum_chicken: function () {
      return Number(this.sum_total.chicken)
        ? Number(this.sum_total.chicken).toFixed(2)
        : "";
    },
    sum_pear: function () {
      return Number(this.sum_total.pear)
        ? Number(this.sum_total.pear).toFixed(2)
        : "";
    },
    sum_all: function () {
      return Number(this.sum_total.all)
        ? Number(this.sum_total.all).toFixed(2)
        : "";
    },
    gamblingList() {
      let count = {
        CHICKEN: 0,
        NO_CHICKEN: 0,
        PEAR: 0,
        NO_PEAR: 0,
        ALL: 0,
        NOTHING: 0
      };
      let result = [];

      this.gambling
        .sort((a, b) => {
          return b.odds * 1 - a.odds * 1;
        })
        .forEach((item, index) => {
          result[count[item.choice] * 6 + gamTypeOrder[item.choice]] = item;
          count[item.choice]++;
        });
      return result.filter(item => !!item);
    }
  },
  methods: {
    togg_detils_show() {
      this.isShowDetils = true;
    },
    detilsColse() {
      this.isShowDetils = false;
    },
    getTrend: function () {
      // 走势
      let that = this
      http.trend({}).then(res => {
        that.trend = res.data;
      });
    },
    amount: function (item) {
      return item.chip;
      return parseInt(item.stake / item.odds - item.chip);
    },
    // 显示上庄
    togg_up_open() {
      this.up_open = !this.up_open;
    },
    // 显示下注
    togg_xz_show(id) {
      this.xz_show = !this.xz_show;
      this.Game_RobotBet(10, this, 10);
      this.gamblingId = id;
      //获取当前庄的总注
      this.get_total(id);
      this.sele_num = 0;
    },
    getUserInfo() {
      // 获取用户信息
      let that = this;
      http.getUser({}).then(res => {
        if (res.data.status === 0) {
          this.$Message.error(res.data.msg);
          return false;
        }
        that.userInfo = res.data;
      });
    },
    scroll() {
      $("html,body").animate(
        {
          scrollTop: document.documentElement.clientHeight
        },
        500
      );
    },
    //是否有鸡
    CHICKEN() {
      this.isCHICKEN = !this.isCHICKEN;
      if (this.isCHICKEN) {
        this.chicken_arry = [1.2, 1.25, 1.3, 1.35, 1.4];
      } else {
        this.chicken_arry = [0.8, 0.85, 0.9, 0.95, 1];
      }
    },
    //是否有梨
    PEAR() {
      this.isPEAR = !this.isPEAR;
      if (this.isPEAR) {
        this.pear_arry = [0.8, 0.85, 0.9, 0.95, 1];
      } else {
        this.pear_arry = [1.2, 1.25, 1.3, 1.35, 1.4];
      }
    },
    // 是否大吉大利
    double() {
      this.isdouble = !this.isdouble;
      if (this.isdouble) {
        this.all_arry = [2.75, 2.8, 2.85, 2.9, 2.95];
      } else {
        this.all_arry = [0.35, 0.4, 0.45, 0.5, 0.55];
      }
    },
    // 走势
    togg_trend_show() {
      let that = this;
      this.trend_show = !this.trend_show;
      http.trend({}).then(res => {
        if (res.data.status === 0) {
          this.$Message.error(res.data.msg);
          return false;
        }
        that.trend = res.data;
      });
    },
    //获取赌局
    get_gambling() {

      http.gambling({}).then(res => {
        this.gambling = res.data;
        // 2019-07-17 添加
        this.getUserInfo();
      });

    },
    // 实时获取总注
    get_total(id) {
      this.sub_total = this.WebSocket.get_total(id);
    },
    // 上庄
    up_gambling(type) {

      let model = {};
      if (this.userInfo.wallet.balance < 20000) {
        this.$Message.warning("账户余额小于20000，上庄失败")
      } else {
        if (type == "chicken") {
          model = {
            choice: this.isCHICKEN ? "CHICKEN" : "NO_CHICKEN",
            odds: this.ch_odds,
            stake: this.chicken_amount
          };
        } else if (type == "pear") {
          model = {
            choice: this.isPEAR ? "PEAR" : "NO_PEAR",
            odds: this.pe_odds,
            stake: this.pear_amount
          };
        } else {
          model = {
            choice: this.isdouble ? "ALL" : "NOTHING",
            odds: this.db_odds,
            stake: this.double_amount
          };
        }
        if (
          this.chicken_amount > 50000 ||
          this.pear_amount > 50000 ||
          this.double_amount > 50000
        ) {
          this.$Message.warning("单项坐庄上限50000金币");
        } else {
          this.$Message.info("盈利将被扣除3%盈利");
          http
            .up_gambling(model)
            .then(res => {
              if (res.data.status === 0) {
                this.$Message.error(res.data.msg);
                return false;
              }
              this.get_gambling();
              this.$Loading.finish();
              this.sele_id.push(res.data.id);
              sessionStorage.setItem("lot_id", this.sele_id);
              this.$Message.success("坐庄成功");
              this.getUserInfo()
            })
            .catch(res => {
              this.$Loading.error();
            });
        }
      }
    },
    // 获取当前状态
    state() {
      http.state({}).then(res => {
        if (res.data.status === 0) {
          this.$Message.error(res.data.msg);
          return false;
        }
        let that = this;
        let nextTime = res.data.nextTime;
        console.log(nextTime)
        if (nextTime !== sessionStorage.getItem('next_time')) {
          sessionStorage.setItem('next_time', nextTime);
          sessionStorage.removeItem('lot_id')
        }
        let seconds = moment(nextTime).diff(moment(), "seconds");
        console.log(seconds)
        var setTime = setInterval(function () {
          if (seconds <= 0) {
            http.lottery({}).then((res) => {
              if (res.data.status === 0) {
                this.$Message.error(res.data.msg);
                return false;
              }
              let data = res.data.body;
              console.log(res)
              that.lot_type = data;
              that.get_lottery(data);
            });

            clearInterval(setTime);
            return;
          }
          that.seconds = seconds--;
        }, 1000);
      });
    },
    // 近一小时汇总
    statistics() {
      let that = this;
      http.statistics({}).then(res => {
        if (res.data.status === 0) {
          this.$Message.error(res.data.msg);
          return false;
        }
        console.log(res.data, "统计");
        that.sum_total = res.data;
      });
    },
    //下注筹码
    selenum(num) {
      if (this.sele_num >= 20000) {
        return false;
      }
      this.sele_num = this.sele_num + num;

      if (this.sele_num > 20000) {
        this.sele_num = this.sele_num - num;
      }
      // if (this.sele_num > 10000) {
      //   this.$Message.warning("单笔下注不能超过10000");
      //   this.sele_num = 10000;
      // }
    },
    // 背景音乐
    isPlay() {
      this.play = !this.play;
      this.maudio();
    },
    maudio() {
      console.log(this.music_url, "yingyueeue eu ");
      bgAudio.loop = true;
      bgAudio.setAttribute("src", this.music_url);
      if (this.play) {
        this.play_url = require("@/assets/lb.png");
        bgAudio.play();
      } else {
        this.play_url = require("@/assets/lbg.png");
        bgAudio.pause();
      }
    },
    // 下注
    bets() {
      http
        .bets({
          gamblingId: this.gamblingId,
          stake: this.sele_num
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$Message.error(res.data.msg);
            this.$Loading.finish();
            return false;
          }
          this.sele_id.push(this.gamblingId);
          sessionStorage.setItem("lot_id", this.sele_id);
          this.$Loading.finish();
          this.$Message.success("下注成功");
          this.xz_show = false;
          this.sele_num = 0;
          this.getUserInfo()
          //获取上庄列表
          this.get_gambling();
        })
        .catch(res => {
          this.$Message.warning("下注失败");
          console.log(res.response)
          if (res.response.status) {
            this.$Message.warning("单庄下注不能超过20000且不能超出庄家注额");
          }
          this.$Loading.error();
        });
    },
    //获取开奖记录记录
    getLog() {
      $("#lottery")
        .find(".block_item")
        .removeClass("active");
      http
        .getLog({
          id: sessionStorage.getItem("lot_id")
            ? sessionStorage.getItem("lot_id").split(",")
            : []
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$Message.error(res.data.msg);
            return false;
          }
          this.profit = res.data.sum;
          console.log(res)
          this.lot_show = true;
          sessionStorage.removeItem("lot_id");
          this.state();
          this.getUserInfo()
        })
        .catch(res => {
          if (res.status == 400) {
            alert(1111);
          }
        });
    },
    // 隐藏开奖结果
    hideLot() {
      this.lot_show = false;
      $(".lottery-unit").removeClass("active");
      this.get_gambling();
    },
    // 消息提示
    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function () {
        v.toastShow = false;
      }, 1500);
    },
    //机器人下注
    Game_RobotBet(data, vuethis, delay) {
      var length = $("#J_bet_list1 img").length;
      var numbers = $(".c_number_value").html();
      var ir = 0;
      var ib = 0;
      var it = 0;
      //发射动画
      //发射元素个数
      var htmlRed = "";
      var htmlBlack = "";
      var htmlT = "";
      var randomMax = vuethis.botbetnum + vuethis.botrandom;
      var randomMin = vuethis.botbetnum - vuethis.botrandom;
      var botT =
        parseInt(Math.random() * (randomMax - randomMin + 1) + randomMin, 10) -
        10;
      var tbetList = new Array();
      var scores = [0, 1, 10, 50, 100];
      var num = botT;
      while (num) {
        tbetList.push(scores[pointer]);
        var pointer = Math.floor(Math.random() * 4 + 1); //随机数下注类型
        htmlT += "<img src='./static/images/bet" + pointer + ".png'/>";
        num--;
      }
      $("#J_bet_list1").html(htmlT);
      var allTime = data.counting == null ? vuethis.xztime : data.counting;
      allTime -= delay / 1000;
      //倒计时
      var ttt = setInterval(function () {
        if (allTime == 0) {
          clearInterval(ttt);
          //倒计时完了
        } else {
          //console.log(15151515)
          allTime--;
          if (allTime >= 0) {
            $(".J_down_time").html(allTime);
            $(".J_down_time").attr("data-text", allTime);
          }
        }
      }, 1000);

      var betList_X = $("#J_bet_list1 img")
        .eq(0)
        .offset().left;
      var betList_Y = $("#J_bet_list1 img")
        .eq(0)
        .offset().top;
      var betList_W = $("#J_bet_list1").width();
      var betList_H = $("#J_bet_list1").height();

      var tX = $("#J_bet_list1").offset().left;
      var tY = $("#J_bet_list1").offset().top;
      var tW = $("#J_bet_list1").width();
      var tH = $("#J_bet_list1").height();

      var t_xAdd = tX - betList_X;
      var t_yAdd = tY - betList_Y;
      console.log(tW - betList_W, "答应");
      var randomAreaX_t = Math.floor(tW * 0.9);
      var randomAreaY_t = Math.floor(tH * 0.5);

      var tbetnum = 0;
      var tt = setInterval(function () {
        tbetnum += tbetList.shift();
        $("#tbetnum").html(tbetnum);
        var randomX = Math.floor(Math.random() * randomAreaX_t + 1);
        var randomY = Math.floor(Math.random() * randomAreaY_t + 1);
        $("#J_bet_list1 img")
          .eq(it)
          .animate({
            left: t_xAdd + randomX + "px",
            top: t_yAdd + randomY + "px",
            opacity: 1
          });
        it++;
        if (it == botT) {
          clearInterval(tt);
        }
      }, (allTime * 1000) / botT);
    },
    //开奖
    get_lottery(type) {
      var that = this;
      var lottery = {
        index: 0, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 70, //初始转动速度
        times: 70, //转动次数
        cycle: 100, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        init: function (id) {
          if ($("#" + id).find(".lottery-unit").length > 0) {
            var $lottery = $("#" + id);
            var $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
          }
        },
        roll: function () {
          var index = this.index;
          var count = this.count;
          var lottery = this.obj;
          $(lottery)
            .find(".lottery-unit-" + index)
            .removeClass("active");
          index += 1;
          if (index > count - 1) {
            index = 0;
          }
          $(lottery)
            .find(".lottery-unit-" + index)
            .addClass("active");
          this.index = index;
          return false;
        }
      };

      function roll() {
        lottery.times += 1;
        lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        if (
          lottery.times > lottery.cycle + 10 &&
          lottery.prize == lottery.index
        ) {
          clearTimeout(lottery.timer);
          lottery.prize = -1;
          lottery.times = 0;
        } else {
          if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
          } else if (lottery.times == lottery.cycle) {
            var index = type == "CHICKEN" ? 0 : 1; //中奖物品通过一个随机数生成
            lottery.prize = index;
            setTimeout(that.getLog, 2000);

          } else {
            if (
              lottery.times > lottery.cycle + 10 &&
              ((lottery.prize == 0 && lottery.index == 7) ||
                lottery.prize == lottery.index + 1)
            ) {
              lottery.speed += 80;
            } else {
              lottery.speed += 20;
            }
          }
          if (lottery.speed < 40) {
            lottery.speed = 40;
          }
          lottery.timer = setTimeout(roll, lottery.speed); //循环调用
        }
        return false;
      }

      lottery.init("lottery");
      roll(type);
    }
  }
};
</script>
<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

.gonggao {
  display: flex;
  justify-content: center;
  height: 1.3125rem;
  line-height: 1.3125rem;
  margin-top: -1.5rem;
  position: relative;
  z-index: 11;
}

.laba img {
  display: block;
  width: 1rem;
  height: 1rem;
  margin-top: 0.15625rem;
}

.g_text {
  width: 14.28125rem;
  height: 1.3125rem;
  background: url("~@/assets/text_bg.png");
  background-size: cover;
  color: #f1d17b;
  font-size: 0.875rem;
  text-align: center;
  padding: 0 1.5625rem;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
