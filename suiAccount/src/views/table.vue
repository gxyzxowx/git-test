<template>
  <div>
    <header class="bar bar-nav">
      <a href="#" class="icon pull-left open-panel" data-panel='.left-panel'>
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/img/photo.jpg" class="img-responsive">
          </div>
        </div>
      </a>
      <h1 class="title">你一共有{{dataList.length}}条资金流动</h1>
    </header>
    <div class="content">
     <!--  选择年份和月份查询账目 -->
      <div class="content-padded grid-demo">
        <div class="row">
          <div class="col-50">
            <div class="date-title">从
              <select v-model="dateFrom.year">
                <option v-for="year in selectYear">{{year}}</option>
              </select>年
              <select v-model="dateFrom.month">
                <option v-for="n in 12">{{n+1}}</option>
              </select>月
            </div>
          </div>
          <div class="col-50">
            <div class="date-title">到
                <select v-model="dateTo.year">
                  <option v-for="year in selectYear">{{year}}</option>
                </select>年
                <select v-model="dateTo.month">
                  <option v-for="n in 12">{{n+1}}</option>
                </select>月
            </div>
          </div>
        </div>
      </div>
<!-- 分类 结余 支出 收入 和她们的细分类 -->
      <div class="buttons-tab">
        <a href="#tab1" class="tab-link active button" style="line-height:1.3rem">结余<br><small>{{totalIn[1] - totalOut[1]|char}}</small></a>
        <a href="#tab2" class="tab-link button" style="line-height:1.3rem">收入<br><small>{{totalIn[1]|char}}</small></a>
        <a href="#tab3" class="tab-link button" style="line-height:1.3rem">支出<br><small>-{{totalOut[1]|char}}</small></a>
      </div>
      <div class="content-block">
        <div class="tabs">
          <!-- 结余分类 -->
          <div id="tab1" class="tab active">
            <div class="content-block content-block-less">
              <div class="banlance-bar" v-show="banlanceShow">
                <div class="in" :style="{
                'width':(totalIn[1]/(totalIn[1]+totalOut[1]))*100 + '%'
                 }"><div class="text">收入{{((totalIn[1]/(totalIn[1]+totalOut[1]))*100).toFixed(2) + '%'}}</div>
                </div>
                <div class="out"><div class="text">支出{{((totalOut[1]/(totalIn[1]+totalOut[1]))*100).toFixed(2) + '%'}}</div></div>
              </div>
                <!-- 无记录的时候显示 -->
              <div class="charge-it" v-show="!banlanceShow">
                <a class="item-link" v-link="{ path: '/charge', replace: true}">
                  <span class="icon-pacman"></span>
                  <div class="text">点我记录</div>
                </a>
              </div>
            </div>
          </div>
          <!-- 收入分类 -->
          <div id="tab2" class="tab">
            <div class="content-block">
              <!-- 收入二级分类栏 -->
              <div class="buttons-row">
                <a href="#tab21" class="tab-link active button">类别汇总</a>
                <a href="#tab22" class="tab-link button">每日明细</a>
              </div>
              <!-- 收入二级分类内容 -->
              <div class="tabs">
                <!-- 收入类别汇总 -->
                <div id="tab21" class="tab active">
                  <div class="content-block content-block-less">
                    <div class="list-block">
                      <ul>
                        <li class='item-content' v-for="(index,row) in totalIn[0] |orderBy 'money' -1">
                          <div class="item-media"><span class="icon-pacman"></span></div>
                          <div class="item-inner">
                            <div class="percent">{{(row.percent*100).toFixed(2) + '%'}}</div>
                            <div class="item-title">
                              {{ row.classify}}
                            </div>
                            <div class="item-after">{{ row.money|char }}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- 收入每日明细 -->
                <div id="tab22" class="tab">
                  <div class="content-block content-block-less">
                    <div class="list-block">
                      <ul>
                        <li class='item-content' v-for="row in detailIn |orderBy 'id'">
                          <div class="item-inner">
                            {{formatDate(new Date(row.id))}}
                            <div class="item-title" style="font-size:.7rem">{{classify[1][row.classify]}}</div>
                            <div class="item-after">{{row.money|char}}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- 支出分类 -->
          <div id="tab3" class="tab">
            <div class="content-block">
              <!-- 支出二级分类栏 -->
              <div class="buttons-row">
                <a href="#tab31" class="tab-link active button">类别汇总</a>
                <a href="#tab32" class="tab-link button">每日明细</a>
              </div>
              <!-- 支出二级分类内容 -->
              <div class="tabs">
                <!-- 支出类别汇总 -->
                <div id="tab31" class="tab active">
                  <div class="content-block content-block-less">
                    <div class="list-block">
                      <ul>
                        <li class='item-content' v-for="row in totalOut[0] |orderBy 'money' -1">
                          <div class="item-media"><span class="icon-pacman"></span></div>
                          <div class="item-inner">
                            <div class="percent" style="font-size:.7rem;with:2rem">{{(row.percent*100).toFixed(2) + '%'}}</div>
                            <div class="item-title">
                              {{ row.classify}}
                            </div>
                            <div class="item-after">-{{row.money|char }}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- 支出每日明细 -->
                <div id="tab32" class="tab">
                  <div class="content-block content-block-less">
                    <div class="list-block">
                      <ul>
                        <li class='item-content' v-for="row in detailOut |orderBy 'id'">
                          <div class="item-inner">
                            {{formatDate(new Date(row.id))}}
                            <div class="item-title" style="font-size:.7rem">{{classify[1][row.classify]}}</div>
                            <div class="item-after">-{{ row.money|char}}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!-- 支出栏完毕 -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mm: 15,
      selectYear: this.manyYear(),
      dataList: '',
      dateDay: this.formatDate(new Date()),
      dateFrom: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      },
      dateTo: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      },
      classify: [
        ['餐饮', '交通', '购物', '居住', '娱乐', '医疗', '学习', '人情', '通讯', '其他'],
        ['工资', '红包', '生活费', '奖金', '借入款', '投资收益', '兼职', '退款', '租金', '其他']
      ],
      iconMap: [  // 图标数据  // 各个分类颜色数据
      ['spoon-knife', 'bus', 'shopping_cart', 'office', 'lifebuoy', 'aid-kit', 'book', 'man-woman', 'mobile', 'pacman'],
      ['happy', 'drive', 'gift', 'coin-dollar', 'tux', 'stats-dots', 'copy', 'table2', 'coin-yen', 'pacman']
      ],
      banlanceShow: true
    }
  },
  ready () {
    this.dataList = this.loadList()
  },
  computed: {
    balance () {
    },
    // 当月收入类各个分类汇总
    totalIn () {
      this.banlanceShow = true
      let [data, startTime, endTime, classifyArr, total] = [this.loadList(), this.getStart(), this.getEnd(), this.setClassifyArr(1), 0]
      data.forEach(el => {
        if (el.type && el.id >= startTime && el.id <= endTime) {
          classifyArr[el.classify].money += el.money     // 新类classify顺序和el相同，都是存的index，以数组为模板
          total += el.money     // 符合时间和type条件的所有el.money之和
        }
        classifyArr.forEach(ca => {
          ca.percent = ca.money / total
        })
      })
      if (total === 0) {    // 容错：无数据让图片隐藏
        this.banlanceShow = false
      }
      return [classifyArr, total]
    },
    // 当月支出类各个分类汇总
    totalOut () {
      this.banlanceShow = true
      let [data, startTime, endTime, classifyArr, total] = [this.loadList(), this.getStart(), this.getEnd(), this.setClassifyArr(0), 0]
      data.forEach(el => {
        if (!el.type && el.id >= startTime && el.id <= endTime) {
          classifyArr[el.classify].money += el.money
          total += el.money
        }
        classifyArr.forEach(ca => {
          ca.percent = ca.money / total
        })
      })
      if (total === 0) {   // 容错：无数据让图片隐藏
        this.banlanceShow = false
      }
      return [classifyArr, total]
    },
    detailIn () {
      let [data, startTime, endTime] = [this.loadList(), this.getStart(), this.getEnd()]
      let newDate = data.filter(el => {
        if (el.type && el.id >= startTime && el.id <= endTime) {
          return true
        }
        return false
      })
      return newDate
    },
    detailOut () {
      let [data, startTime, endTime] = [this.loadList(), this.getStart(), this.getEnd()]
      let newDate = data.filter(el => {
        if (!el.type && el.id >= startTime && el.id <= endTime) {
          return true
        }
        return false
      })
      return newDate
    }
  },
  methods: {
    // 开始时间戳
    getStart () {
      return new Date(this.dateFrom.year, this.dateFrom.month - 1, 1)  // 取得当前月份第一天时间戳
    },
    // 结束时间戳
    getEnd () {
      return new Date(this.dateTo.year, this.dateTo.month, 0)  // 下个月第0天自动转换为本月最后一天
    },
    // 设置新的分类/总金额 数组，待计算值后显示
    setClassifyArr (type) {
      let classifyArr = []
      this.classify[type].forEach(el => {
        classifyArr.push({
          classify: el,
          money: 0,
          percent: 0
        })
      })
      return classifyArr
    },
    // 计算各个分类的总金额

    // 格式化日期函数
    formatDate (dt) {
      let y = dt.getFullYear()
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      return y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2)
    },
    loadList () {
      let data = localStorage.DATA
      if
      (typeof data === 'undefined' || data.length < 30) {  // 拿到有效数据
        return []
      }
      return JSON.parse(data)
    },
    manyYear () {   // 返回2010年至今年所有年
      let year = new Date().getFullYear()
      let arr = []
      for (let i = year; i >= 2010; i--) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';
.list-block>ul>.item-content>.item-inner>.percent{
  display: inline-block;
  font-size:.7rem;
  width:2.3rem;
}
.list-block>ul>.item-content>.item-inner>.item-after{
  width:4rem;
}
.tab .content-block-less{
  padding: 0;
}
.banlance-bar{
  position: relative;
  width:16rem;
  height:2rem;
  background:rgb(112, 133, 70);
  margin: 4rem auto;
  color:#fff;
  line-height: 2rem;
  box-shadow: .2rem .2rem .2rem rgb(126, 111, 109);
}
.banlance-bar .in{
  display: inline-block;
  position: relative;
  left:0;
  background:rgb(117, 80, 66);
  height: 100%;
  padding-left:.2rem;
}
.banlance-bar .in .text,.banlance-bar .out .text{
  height 2rem
  width:7rem
}
.banlance-bar .out{
  display: inline-block;
  position: absolute;
  right:0;
  text-align:right;
}

</style>
