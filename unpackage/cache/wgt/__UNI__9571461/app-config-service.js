
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#319549","navigationBar":{"backgroundColor":"#319549","titleText":"uni-app","type":"default","titleColor":"#ffffff"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"智勤易报","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.24","entryPagePath":"pages/main/main","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"white","selectedColor":"#000000","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffcd05","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"/static/house.png","selectedIconPath":"/static/house.png"},{"pagePath":"pages/review/review","text":"审批","iconPath":"/static/sp.png","selectedIconPath":"/static/sp.png"},{"pagePath":"pages/punchIn/punchIn","text":"考勤打卡","iconPath":"/static/dk.png","selectedIconPath":"/static/dk.png"},{"pagePath":"pages/selfMessage/selfMessage","text":"个人中心","iconPath":"/static/grzx.png","selectedIconPath":"/static/grzx.png"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/main/main","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"backgroundColor":"#ffcd05","titleText":"首页","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/index/index","meta":{"navigationBar":{"titleText":"登录页面","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/review/reviewDetail","meta":{"enablePullDownRefresh":true,"navigationBar":{"backgroundColor":"#ffcd05","titleText":"审批数据","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/selfMessage/punchMessage","meta":{"navigationBar":{"backgroundColor":"#ffcd05","titleText":"个人打卡信息","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/selfMessage/self","meta":{"navigationBarffffffTitleText":"个人详细信息","navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/selfMessage/selfMessage","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"navigationBar":{"backgroundColor":"#ffcd05","titleText":"个人中心","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/punchIn/punchIn","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{"backgroundColor":"#ffcd05","titleText":"考勤打卡","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/review/review","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{"backgroundColor":"#ffcd05","titleText":"审批","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/review/askForLeave","meta":{"navigationBar":{"backgroundColor":"#ffcd05","titleText":"请假","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/review/businessReview","meta":{"navigationBar":{"backgroundColor":"#ffcd05","titleText":"出差","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"uni_modules/unicloud-city-select/pages/uni-city-list/uni-city-list","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"城市选择","type":"default"},"isNVue":false}},{"path":"pages/logDay/logDay","meta":{"navigationBar":{"backgroundColor":"#ffcd05","titleText":"日志","type":"default","titleColor":"#ffffff"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  