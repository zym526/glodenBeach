
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login/login","pages/login/all_status/all_status","pages/login/address_choose/address_choose","pages/login/sign_in/sign_in","pages/index/index/index","pages/index/find/find","pages/index/my/my","pages/live_broadcast/live_broadcast/live_broadcast","pages/live_broadcast/adviser_home/adviser_home","pages/live_broadcast/video_playback/video_playback","pages/problem/search/search","pages/problem/put_questions/put_questions","pages/personal_center/user_information/user_information","pages/personal_center/follow/follow","pages/personal_center/collection_browse/collection_browse","pages/problem/special_column/special_column","pages/problem/question_and_answer/question_and_answer","pages/problem/article_details/article_details","pages/problem/put_success/put_success","pages/login/agreement/agreement","pages/external/external","pages/personal_center/my_question/my_question"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","navigationBarTitleText":"金沙滩","navigationBarBackgroundColor":"#333399","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#003399","borderStyle":"black","backgroundColor":"#ffffff","iconWidth":"25","list":[{"pagePath":"pages/index/index/index","iconPath":"static/images/index.png","selectedIconPath":"static/images/indexActive.png","text":"首页"},{"pagePath":"pages/index/find/find","iconPath":"static/images/find.png","selectedIconPath":"static/images/findActive.png","text":"发现"},{"pagePath":"pages/index/my/my","iconPath":"static/images/my.png","selectedIconPath":"static/images/myActive.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"金沙滩","compilerVersion":"2.8.8","entryPagePath":"pages/login/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login/login","meta":{"isQuit":true},"window":{}},{"path":"/pages/login/all_status/all_status","meta":{},"window":{}},{"path":"/pages/login/address_choose/address_choose","meta":{},"window":{}},{"path":"/pages/login/sign_in/sign_in","meta":{},"window":{}},{"path":"/pages/index/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true}},{"path":"/pages/index/find/find","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/index/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/live_broadcast/live_broadcast/live_broadcast","meta":{},"window":{}},{"path":"/pages/live_broadcast/adviser_home/adviser_home","meta":{},"window":{}},{"path":"/pages/live_broadcast/video_playback/video_playback","meta":{},"window":{}},{"path":"/pages/problem/search/search","meta":{},"window":{}},{"path":"/pages/problem/put_questions/put_questions","meta":{},"window":{}},{"path":"/pages/personal_center/user_information/user_information","meta":{},"window":{}},{"path":"/pages/personal_center/follow/follow","meta":{},"window":{}},{"path":"/pages/personal_center/collection_browse/collection_browse","meta":{},"window":{}},{"path":"/pages/problem/special_column/special_column","meta":{},"window":{}},{"path":"/pages/problem/question_and_answer/question_and_answer","meta":{},"window":{}},{"path":"/pages/problem/article_details/article_details","meta":{},"window":{}},{"path":"/pages/problem/put_success/put_success","meta":{},"window":{}},{"path":"/pages/login/agreement/agreement","meta":{},"window":{}},{"path":"/pages/external/external","meta":{},"window":{}},{"path":"/pages/personal_center/my_question/my_question","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
