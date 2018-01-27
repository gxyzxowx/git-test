<template>
<div>
  <!-- 头部开始 -->
    <nav class="bar bar-blue bar-nav">
      <span class="icon pull-left open-panel" data-panel='.left-panel'>
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/img/photo.jpg" class="img-responsive">
          </div>
        </div>
      </span>
      <h1 class="title">
        <span class="icon-pacman"></span>曾迪的钱包</h1>
    </nav>
  <!-- 头部结束 -->
  <!-- 内容区域开始 -->
    <div class='content'>
      <!-- 点击链接记账入口 -->
      <div class="charge-div">
        <div class="charge-it">
          <a class="item-link" v-link="{ path: '/charge', replace: true}">
            <span class="icon-pacman"></span>
            <div class="text">点我记录</div>
          </a>
        </div>
      </div>
      <!-- 点击模拟假数据 -->
      <div class="list-block item-list">
        <ul>
          <li>
            <a class="item-content item-link" @click="moke">
              <div class="item-inner">
                <div class="item-title">测试用：一次性得到2年随机数据</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- 选择日期查看 -->
      <div class="title-box">
        <div class="date-title">
          <span class="content-block-title">请选择日期查看某日明细:</span>
          <span class="icon-point-up"></span>
          <input type="text" id="calendar" style="width:5rem" v-model="date"/>
        </div>
      </div>
      <!-- 刷新数据 -->
      <div class="content-block-title">{{date}}收支明细<span @click="refresh()">数据不准确？点我刷新</span></div>
      <!-- 选择日收支结余 -->
      <div class=" content-block-title">查看日收支结余{{selectDate[1]|char}}</div>
      <!-- 选择日收支列表 -->
      <div class="list-block">
        <ul>
          <li class='item-content' :class="{'color-danger':row.type}" v-for="row in selectDate[0] |orderBy 'id' -1">
            <div class="item-media"><span :class="'icon-' + iconMap[row.type][row.classify]"></span></div>
            <div class="item-inner">
              <div class="item-title">
                {{ classify[row.type][row.classify]}}
              </div>
              <div class="item-after" style="text-indent:3rem"> {{row.type? '+' : '-'}}{{ row.money|char }}</div><span style="font-size:12px" @click="removeEl(row)"><span class="icon-remove_circle_outline"></span>删除</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  <!-- 内容区域结束 -->
</div>
</template>

<script>
import $ from 'zepto'
export default {
  ready () {
    $.init()
    $('#calendar').calendar({  // 最大可以选到今天
      maxDate: [(new Date()).getFullYear() + '-' + ('0' + ((new Date()).getMonth() + 1)).slice(-2) + '-' + ('0' + (new Date()).getDate()).slice(-2)]
    })
  },
  data () {
    return {
      date: this.formatDate(new Date()),
      classify: [
        ['餐饮', '交通', '购物', '居住', '娱乐', '医疗', '学习', '人情', '通讯', '其他'],
        ['工资', '红包', '生活费', '奖金', '借入款', '投资收益', '兼职', '退款', '租金', '其他']
      ],
      iconMap: [  // 图标数据  // 各个分类颜色数据
      ['spoon-knife', 'bus', 'shopping_cart', 'office', 'lifebuoy', 'aid-kit', 'book', 'man-woman', 'mobile', 'pacman'],
      ['happy', 'drive', 'gift', 'coin-dollar', 'tux', 'stats-dots', 'copy', 'table2', 'coin-yen', 'pacman']
      ]
    }
  },
  computed: {   // 只要数据有所变化（时间数据变化）计算属性里的方法就会重新调用
    selectDate () {  // 选择日期即可获得当日明细
      let [data, startTime, endTime, selectArr, ymd, total] = [this.loadList(), '', '', [], this.getYMD(), 0]
      startTime = new Date(ymd.y, ymd.m, ymd.d, 0, 0, 0).getTime()
      endTime = new Date(ymd.y, ymd.m, ymd.d, 23, 59, 59).getTime()
      data.forEach(el => {
        if (el.id >= startTime && el.id <= endTime) {
          selectArr.push(el)
          let char = el.type ? 1 : -1
          total += (char * el.money)
        }
      })
      return [selectArr, total]   // 顺便把结余放进去
    }
  },
  methods: {
     // 取得时间戳对应的年，月(0-11)，日
    getYMD () {
      let timeArr = ('' + this.date).split('-')
      let ymd = {
        y: timeArr[0] * 1,
        m: (timeArr[1] * 1) - 1,
        d: timeArr[2] * 1
      }
      return ymd
    },
    // 格式化日期函数
    formatDate (dt) {
      let y = dt.getFullYear()
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      return y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2)
    },
    moke () {   // moke假数据 2年 (账户起始金额：生活费3000)
      let cd = new Date()
      let start = (new Date(cd.getFullYear() - 2, cd.getMonth(), 1)).getTime()   // moke的开始时间
      let end = cd.getTime()
      let data = []
      let ac = ['现金', '支付宝', '微信', '工资卡', '储蓄卡', '信用卡']
      ac.forEach(el => {
        data.push({
          id: new Date(2016, 0, 1),
          money: 3000,
          type: 1,
          classify: 2,
          account: el
        })
      })
      console.log(this)
      for (let i = start; i <= end; i += 1000 * 60 * 60 * 4) {
        let t = (Math.random() > 0.95) ? 1 : 0
        let a = t ? 25000 : 1500
        let b = t ? 15000 : 500
        let icon = Math.floor(Math.random() * 10)
        data.push({
          id: i,
          money: Math.round(Math.random() * a + b) / 10,
          type: t,
          classify: icon,
          account: ac[Math.round(Math.random() * 5)]
        })
      }
      localStorage.DATA = JSON.stringify(data)
    },
    // 数据读取
    loadList () {
      let data = localStorage.DATA
      if
      (typeof data === 'undefined' || data.length < 30) {  // 拿到有效数据
        return []
      }
      return JSON.parse(data)
    },
  // 刷新
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        $.hideIndicator()
      }, 500)
      let temp = this.date
      this.date = ''
      this.date = temp
    },
    // 删除数据
    removeEl (el) {
      let items = this.loadList()
      items.forEach((els, index) => {
        if (els.id === el.id) {
          items.splice(index, 1)
          localStorage.DATA = JSON.stringify(items)
        }
      })
      let temp = this.date
      this.date = ''
      this.date = temp
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl'
.charge-div {
  width:100%;
  height:5rem;
  background:
  linear-gradient(135deg, #708090 22px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px),
  linear-gradient(225deg, #708090 22px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px;
  background-color:#708090;
  background-size: 64px 128px;
}

.item-tab {
  background: #efeff4;
  height: 3rem;
  position: relative;
}
.item-tab .tab-item {
  height: 3rem;
  background-color: white;
}
.item-tab:before {
  background-color: white;
}
.item-list {
  margin: 0.7rem 0;
  height: 2.9rem;
}
.item-list ul {
  height: 2.9rem;
}
.item-list li a {
  height: 2.9rem;
}
.item-list li {
  margin-top: 0.7rem;
  height: inherit;
}
.content-block-title span{
  float:right;
  color:#555;
  text-shadow:.05rem .05rem .1rem #999;
}

</style>
