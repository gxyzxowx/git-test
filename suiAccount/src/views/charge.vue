<template>
  <div>
    <!-- 头部开始 -->
    <header class="bar bar-nav">
      <a href="#" class="icon pull-left open-panel" data-panel='.left-panel'>
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/img/photo.jpg" class="img-responsive">
          </div>
        </div>
      </a>
      <span class="title">今天{{new Date().getMonth()+1}}月{{new Date().getDate()}}日</span>
    </header>
    <!-- 头部结束 -->
    <!-- 内容区开始 -->
    <div class="content">
      <!-- 收入支出分类 -->
      <div class='classify-box '>
        <!-- 收入类title、支出类title -->
        <div class="title-box row">
          <div class="title-cel col-50" @click="typeSet(0)" :class="{'title-active':!item.type}">支出</div>
          <div class="title-cel col-50" @click="typeSet(1)" :class="{'title-active':item.type}">收入</div>
        </div>
        <!-- 各个分类 -->
        <div class="classify">
          <!-- 支出分类内容 -->
          <div class="class-cel" v-show="classifyShow" v-bind:class="{'class-cel-active':index===divStyle.ifactiveCel}"
          @click="classifySet(0,index)"  v-for=' (index,row) in classify[0]'>
            <div>
              <div class="class-icon">
              <span :class="'icon-' + iconMap[0][index]"></span>
              </div>
              <div class="class-text">{{row}}</div>
            </div>
          </div>
          <!-- 收入分类内容 -->
          <div class='class-cel' v-show="!classifyShow" v-bind:class="{'class-cel-active':index===divStyle.ifactiveCel}"
          @click="classifySet(1,index)"  v-for=' (index,row) in classify[1]'>
            <div class="class-icon">
              <span :class="'icon-' + iconMap[1][index]"></span>
            </div>
            <div class="class-text">{{row}}</div>
          </div>
        </div>
      </div>
      <!-- 选择时间、账户框 -->
      <div class="select-box">
        <div class="date-title row">
          <div class="left col-50"><span class="icon icon-point-up"></span></span>时间：<input type="text" id="calendar"  v-model="date" style="width:5rem"/></div>
          <div class="right col-50"><span class="icon icon-point-up"></span>账户：
          <select v-model="item.account" style="width:5rem">
            <option v-for="row in account">{{row}}</option>
          </select></div>
        </div>
      </div>
      <!-- 模拟键盘输入框 -->
      <div class='input-box'>
        <!-- 金额显示框 -->
        <div :class="'inputText input-color-' + iconMap[item.type][item.classify]">{{item.money | char}}</div>
        <!-- 模拟键盘 -->
        <div class="keyboard">
          <div class='num-box'>
            <div class='num-box-inner row no-gutter'>
              <div v-for=" row in nums" @click='joinNum(row)' class='cel col-33'>
              {{row}}
            </div>
            </div>
          </div><div class='right-column'>
            <div class='right-column-inner'>
              <div class='cel' @click='deleteLast'><span  style="font-size:1rem">回退</span></div>
              <div class='add-num cel'@click="item.money='0.00'">C</div>
              <div class='muni-num cel' @click='doubleZero'>00</div>
            </div>
          </div><div class='bottom-row'>
            <div class="bottom-row-inner row no-gutter">
              <div class='col-25 cel ' ><div class="cel-s" @click="save" v-show="okIsZero">再记一笔</div></div>
              <div class='cel col-25' @click="joinDot('.')" style="font-size:2rem;line-height:2rem">.</div>
              <div class='cel col-25' @click="joinNum('0')">0</div>
              <div class='cel col-25' ><div class="cel-s" v-show="!okIsZero">请输入..</div>
                <a class="item-content item-link" v-show="okIsZero" @click="ok()" v-link="{ path: '/report', replace: true}">
                {{isOk()}}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 内容区结束 -->
  </div>
</template>

<script>
import $ from 'zepto'
export default {
  ready () {
    this.items = this.loadList()
    this.divStyle.ifactiveCel = 0   // 开机自动选中第一个
    $.init()
    $('#calendar').calendar({  // 最大可以选到今天
      maxDate: [(new Date()).getFullYear() + '-' + ('0' + ((new Date()).getMonth() + 1)).slice(-2) + '-' + ('0' + (new Date()).getDate()).slice(-2)]
    })
  },
  created () {
    this.iconMap = [  // 图标数据  // 各个分类颜色数据
      ['spoon-knife', 'bus', 'shopping_cart', 'office', 'lifebuoy', 'aid-kit', 'book', 'man-woman', 'mobile', 'pacman'],
      ['happy', 'drive', 'gift', 'coin-dollar', 'tux', 'stats-dots', 'copy', 'table2', 'coin-yen', 'pacman']
    ]
  },
  data () {
    return {
      classify: [
        ['餐饮', '交通', '购物', '居住', '娱乐', '医疗', '学习', '人情', '通讯', '其他'],
        ['工资', '红包', '生活费', '奖金', '借入款', '投资收益', '兼职', '退款', '租金', '其他']
      ],
      account: ['现金', '支付宝', '微信', '工资卡', '储蓄卡', '信用卡'],
      classifyShow: true,
      nums: ['7', '8', '9', '4', '5', '6', '1', '2', '3'],
      items: [],
      date: this.formatDate(new Date()),
      item: {
        id: 0,
        money: '0.00',
        type: 0,    // 收入1 支出0
        classify: 0,
        account: '现金'
      },
      divStyle: {
        ifactiveCel: false  // 用vue 的 index 控制点击的元素变色
      },
      okIsZero: false   // 当金额为0时不可见
    }
  },
  methods: {
    // 格式化日期函数
    formatDate (dt) {
      let y = dt.getFullYear()
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      return y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2)
    },
    // 拼接
    joinNum (row) {
      if // 如果是0的时候点击
      (this.item.money === '0' || this.item.money === '0.00') {
        this.item.money = ''
        // 小数点后只取2位
      }
      else
      if
      (this.item.money.substr(-3, 1) === '.') {
        return
      }
      this.item.money = '' + this.item.money + row
    },
    // 回退
    deleteLast (e) {
      e.preventDefault()
      if
      (this.item.money.length === 1 || this.item.money === '0.00') {
        this.item.money = '0.00'
        return
      }
      let len = this.item.money.length
      this.item.money = this.item.money.substr(0, len - 1)
    },
    // 小数点的拼接
    joinDot (dot) {
      if
       (this.item.money === '0.00') {
        this.item.money = '0.'
      }
      else
      if
      (this.item.money.indexOf('.') === -1) {
        this.item.money = '' + this.item.money + dot
      }
    },
    // 按OK之前读取本地存储里DATA的数据
    loadList () {
      if (typeof localStorage.DATA === 'undefined' || localStorage.DATA.length < 30) {
        return []
      }
      return JSON.parse(localStorage.DATA)
    },
    // 取得时间戳对应的年，月(0-11)，日
    getYMD () {
      let timeArr = ('' + this.date).split('-')
      let ymd = {
        y: timeArr[0] * 1,
        m: (timeArr[1] * 1) - 1,
        d: timeArr[2] * 1
      }
      // console.log(ymd.y, ymd.m, ymd.d)
      return ymd
    },
    save () {
      this.item.id = new Date(this.getYMD().y, this.getYMD().m, this.getYMD().d, new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()).getTime()
      this.item.money *= 1
      this.items = this.loadList()
      this.items.push(this.item)
      localStorage.DATA = JSON.stringify(this.items)
      this.item.money = '0.00'
    },
    // 录入信息
    ok () {
      this.save()
    },
    // 点击分类
    classifySet (typeNo, classNo) {
      this.item.type = typeNo
      this.item.classify = classNo // 直接保存下标
      // 当前索引传入选中变量以，两者相等以改变当前颜色
      this.divStyle.ifactiveCel = classNo
    },
    typeSet (typeNo) {
      this.item.type = typeNo
      this.classifyShow = !typeNo
    },
    doubleZero () {    // 按两个 0
      if
      (this.item.money.indexOf('.') > -1) {
        return
      }
      this.item.money += '00'
    },
    isOk () {   // 金额不是0，才显示OK，不然显示“请输入。。”
      if (this.item.money * 1 !== 0) {
        this.okIsZero = true
        return 'OK'
      }
      this.okIsZero = false
      return false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl'
  .content
    .classify-box // 选择分类
      height: 35%
      margin-bottom: 1rem
      .title-box // 收入支出框
        .title-cel
          height: 12%
          border-radius: 4px
          text-align: center
          line-height:2rem
          blg()
      .classify // 分类框
        bi()
        height:88%
        width: 100%
        display: flex
        flex-wrap: wrap
        .class-cel
          width: 19%
          height: 35%
          padding: 3px
          margin : .5rem .08rem
          border-radius: 50%
          blg()
          box-shadow: -.1rem .3rem .2rem #555
          text-align: center
          line-height: 1.6
          font-size:.6rem
          color:#fefefe
          .class-icon
            font-size: 1.2rem

    .input-box
      position: absolute
      bottom:2.3rem
      width:100%
      height:45%
      .inputText
        height: 18%
        opacity:.6
        padding-right:1rem
        text-align:right
        font-size: 1.5rem
        font-weight: 700
        transition: background 1s
      .keyboard
        position: relative
        width: 100%
        height:80%
        background:rgb(223,223,223)
        .num-box
          position: absolute
          width: 75%
          height:75%
          .num-box-inner
            width:100%
            height:100%
        .right-column
          position: absolute
          top: 0
          right: 0
          width:25%
          height:100%
          .right-column-inner
            width:100%
            height:75%
        .bottom-row
          position: absolute
          bottom: 0
          left: 0
          width:100%
          height:25%
          .bottom-row-inner
            width:100%
            height:100%
            .cel
              height:100%

.title-active
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.15),
    rgba(153, 153, 153, 0.1)
  )!important
.class-cel-active
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.2),
    rgba(153, 153, 153, 0.8)
  )!important
  border: 1px solid rgba(0,0,0,.1)
  border-radius: 50%
.cel
  height:33.3%
  border: .1px solid rgba(0, 0, 0, .2)
  font-weight: 700
  font-size: 26px
  text-align: center
  line-height: 2
  .cel-s
    font-size: .8rem
    line-height: 3.5
  .item-link
    display: block
    width:100%
    height:100%
.input-color-spoon-knife,.input-color-happy
  b(#FFFFB9)
.input-color-bus,.input-color-drive
  b(#ACD6FF)
.input-color-office,.input-color-gift
  b(#CAFFFF)
.input-color-shopping_cart,.input-color-coin-dollar
  b(#FFBD9D)
.input-color-lifebuoy,.input-color-tux
  b(#B9B9FF)
.input-color-aid-kit,.input-color-stats-dots
  b(#CEFFCE)
.input-color-book,.input-color-copy
  b(#B8B8DC)
.input-color-man-woman,.input-color-table2
  b(#CF9E9E)
.input-color-pacman,.input-color-coin-yen
  b(#FFD1A4)
.input-color-mobile,.input-color-pacman
  b(#DCB5FF)
</style>
