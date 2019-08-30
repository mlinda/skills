#vue
## knowledge Points
#### 父子路由传值 
window.eventBus.$emit('gotoParentCarryTit', this.streamTit);
created () {
// 活动标题
window.eventBus.$on('gotoParentCarryTit', function (data) {
console.log(data);
this.createStreamItem.liveTit = data;
}.bind(this));
},

或者是watch 监听$route （子路由之间来回切换如资料夹，子级目录之间来回切换获取id请求数据）
$route(to,from) {
// 上传的直播封面
// console.log(to) $route 参数第一个是to 第二个是from 只写一个参数默认是to的 所以要都写
if (from.name === 'liveStreamCropper') {
this.liveStreamCoverimgUrl = sessionStorage.getItem('imgBase64') ? sessionStorage.getItem('imgBase64') : '';
}
}


#### vuecli3.0 支持jsx 
（1）其他需要插件就安装插件 
（2）语法处报错提示 使用<script type="text/jsx"></script> 


#### keep-alive
主页跳转到其他页面，从详情页返回主页，主页不刷新；从其他页面返回主页，主页正常刷新
1、APP.vue  里
<keep-alive> 
<router-view v-if="$route.meta.keepAlive"></router-view> 
</keep-alive> 
<router-view v-if="!$route.meta.keepAlive"></router-view>
 2、需要缓存的路由，在路由文件里配置
{ 
name: 'index', 
path: '/index', 
title: '主页', 
meta: { 
    pageTitle: '主页', 
    keepAlive: true 
  } 
}
3、在主页内使用钩子函数，主页跳转到其他页面时，
把主页的keepAlive值设置为false
export default {
 data() {
 return {
 };
 },
 mounted() {
 },
 methods: {
 },
 //修改列表页的meta值，false时再次进入页面会重新请求数据。
 beforeRouteLeave(to, from, next) {
 from.meta.keepAlive = false;
 next();
 }
};
 4、从详情页返回到主页时把主页的keepAlive值设置为true
export default {
 data() {
 return {
 };
 },
 mounted() {
 },
 methods: {
 },
 beforeRouteLeave(to, from, next) {
 if (to.path == "/index") {
 to.meta.keepAlive = true;
 } else {
 to.meta.keepAlive = false;
 }
 next();
 }
};









