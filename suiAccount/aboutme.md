# Vue 移动应用开发 手机记账
* 收支分类（依衣食住行玩...分类）：
	- [0] 支出类：
		1. 餐饮伙食
		1. 出行交通
		1. 休闲娱乐
		1. 话费网费
		1. 生活日用
		12. 服装饰品
		1. 电器家私
		1. 教育培训
		1. 育儿养老
		1. 医疗保健
		1. 红包礼金
		1. 房租按揭
		1. 善款彩票
		1. 保险投资
		1. 其它支出
	- [1] 收入类：
		1. 工资收入
		2. 投资收入
		3. 礼金收入
		4. 其它收入

### 功能
* 数据存储：
	- 本地 **localStorage**
		1. 保存 this.save(data)
		```js
		let LS = localStorage
		LS['__DATA__'] = JSON.stringify(data);
		// data = [], data = ''
		// stringify(data): '[{"date":13213213342,"type":0,"class":10,"value":0}]'
		```
		2. 读取 this.load()
		```js
		let read = localStorage['__DATA__'];
		if (typeof read === 'undefined' ||
		    // read === '[]' ||
		    read.length <= 40 ) {
			data = []; // return [];
		} else {
			this.data = JSON.parse(read);
			// return JSON.parse(read);
		}
		```
	- 网络：服务器
* 记账数据：
	1. 日期
	2. 收支分类
	3. 金额（0.00）
* 数据结构：
```js
var data = [
	{
		id: 147393329234,
		date: '2017-12-28',
		type: "支出",
		class: "红包礼金",
		value: 20
	},
	{
		date: 1427219372133, // Date.now()
		type: 0, // 1
		class: 10,
		value: 20
	}
];
var sign = [-1, 1];
total += data[i].value * sign[ data[i].type ]
// 2017-6-12 ~ 7.2
var start = new Date('2017-6-12');
var end = new Date(2017, 6, 2); // 2017-7-2
var dt = new Date(1427219372133);
100001 2017-12-28
100001 + 1000 * 60 * 60 * 3 2017-12-29
for(var i = 100001; i < 100001 + 1000 * 60 * 60 * 24; i++)
```

# 前端移动端 Vue UI 框架简介

Vue 开发框架汇总 [awesome-github-vue](https://github.com/RuMengkai/awesome-vue)

---

### 关于 SUI Mobile
* 官网：[http://m.sui.taobao.org/](http://m.sui.taobao.org/)

### SUI 的使用演示
* 用 Git 下载演示源码
  `git clone https://github.com/eteplus/vue-sui-demo.git`
* 启动项目：
  ```dos
  cd vue-sui-demo
  npm i
  npm run dev
  ```
* 打开 Google Chrome 浏览器 &lt;Ctrl&gt;+&lt;T&gt; 或 &lt;F6&gt; 浏览网址：
  `localhost:8080` 或 `127.0.0.1:8080`