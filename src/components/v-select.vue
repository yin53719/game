<template>
  <div class="selectwrap" @click="isShow=false" v-if="isShow">
    <ul>
      <li @click="choose('0')">
        <p>{{title}}</p>
      </li>
      <li @click="choose(v.code)" v-for="(v,i) in items" :key="i">
        <p>1:{{v.code}}</p>
        <img v-show="v.select" src="@/assets/check.png" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
    items: Array,
    // value:Number
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('showHide', v)
      }
    },
  },
  methods: {
    choose(v) {
      this.items.reduce((pre, cur) => {
        cur.select = false;
        if (v !== '0') {
          let temp = this.items.find(item => item.code === v);
          temp.select = true;
        }
      }, this.items)
      this.$emit('input', v);
      this.isShow = false;
    }
  }
}
</script>
<style scoped>
.selectwrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  background: #fff;
  transform: translate(-50%, -50%);
}
li {
  color: #e3e3e3;
  display: block;
  margin: 0;
  padding: 10px 15px;
  background: #333;
  font-size: 1.3rem;
  width: 100%;
  border-bottom: 1px solid #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li:last-child {
  border-bottom: none;
}
li img {
  width: 1.3rem;
  height: 1rem;
}
</style>

