import $ from 'zepto'
// Zepto jQuery npm i --save-dev jquery import $ from 'jquery'

export default function (router) {
  router.map({
    // 404 错误处理：跳转至（welcome.vue）
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/charge': {
      component (resolve) {
        require(['./views/charge'], resolve)
      }
    },
    '/report': {
      component (resolve) {
        require(['./views/report'], resolve)
      }
    },
    '/account': {
      component (resolve) {
        require(['./views/account'], resolve)
      }
    },
    '/table': {
      component (resolve) {
        require(['./views/table'], resolve)
      }
    }
  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    console.log(`to: ${toPath} from: ${fromPath}`)
    // if (toPath.replace(/[^/]/g, '').length > 1) {   router.app.isIndex = false }
    // else {   let depath = toPath === '/' || toPath === '/report/detail'
    // router.app.isIndex = depath ? 0 : 1 }
    next()
  })

  router.afterEach(function ({to}) {
    console.log(`成功浏览到: ${to.path}`)
    $.refreshScroller()
  })
}
