<template>
  <div>
    <header class="bar bar-nav">
      <span class="icon pull-left open-panel" data-panel='.left-panel'>
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/img/photo.jpg" class="img-responsive">
          </div>
        </div>
      </span>
      <h1 class="title">我的资产</h1>
    </header>
    <div class="content">
      <div class="content-padded">
        <div class="list-block">
          <ul>
            <li class='item-content list-block'>你目前共有资产{{total()|char}}元</li>
            <div class="content-block-title"><span class="icon-book"></span>各项资产：</div>
            <li class='item-content' v-for='row in accountItems'>
              <div class="item-media">
                <span class="icon-book"></span>
              </div>
              <div class="item-inner">
                <div class="item-title">
                  {{row.name}}
                </div>
                <div class="item-after">
                  {{row.value|char}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  data () {
    return {
      dataList: '',
      accountItems: this.getAccounts()
    }
  },
  methods: {
    loadList () {
      let data = localStorage.DATA
      if
      (typeof data === 'undefined' || data.length < 30) {  // 拿到有效数据
        return []
      }
      return JSON.parse(data)
    },
    getAccounts () {
      let account = ['现金', '支付宝', '微信', '工资卡', '储蓄卡', '信用卡']
      let newAccount = []
      this.dataList = this.loadList()
      account.forEach(el => {
        newAccount.push({
          name: el,
          value: 0
        })
      })
      newAccount.forEach(ac => {
        this.dataList.forEach(el => {
          let add = el.type ? '+' : '-'
          if (ac.name === el.account) {
            ac.value += (add + el.money) * 1
          }
        })
      })
      return newAccount
    },
    total () {
      let total = 0
      this.getAccounts().forEach(el => {
        total += el.value
      })
      return total
    }
  }
}
</script>
<style >

</style>
