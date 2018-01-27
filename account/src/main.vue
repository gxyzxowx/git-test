<template>
  <div>
    <div class="page page-current">
      <bar v-if="isIndex">
        <bar-item path="/report" label="首页" icon="pacman"></bar-item>
        <bar-item path="/charge" label="记账" icon="plus"></bar-item>
        <bar-item path="/account" label="资产" icon="book"></bar-item>
        <bar-item path="/table" label="查询" icon="table2"></bar-item>
      </bar>
      <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
    </div>
    <div class="panel-overlay"></div>
    <div :class='{"theme-dark": td}' class="panel panel-left panel-reveal left-panel">
      <div @click='td=!td' class="content-block">
        <h3>说明书<br><small>曾迪的记账本</small></h3>
        <div class="list-block">
          <ul>
            <li class='item-content' v-for='text in texts' track-by='$index'>
              <div class="item-inner">
                <div class="item-title" style="font-size: 14px">
                  {{ text }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p><a href="#" class="close-panel">关闭</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'
// import $ from 'zepto

export default {
  data () {
    return {
      texts: ['修改日期：2018.1.22', '简单说明：', '首页：查询日记录/记账入口', '记账页：分类/日期/账户记账', '账户页：查看资产账本', '查询页：查询阶段收支', '^_^欢迎更好的建议', '作者：曾迪', '邮箱：zengdi112@163.com', '电话：13752852112'],
      td: false,
      isIndex: true
    }
  },
  components: {
    Bar,
    BarItem
  }
}
</script>

<style>
@import './assets/fonts/my-fonts/my-icon.css';
@import "./assets/css/sm.css";
[v-cloak] {
  display: none;
}
.fade-transition {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
.page-current{
  display:flex;
}
* { touch-action: none; }
</style>
