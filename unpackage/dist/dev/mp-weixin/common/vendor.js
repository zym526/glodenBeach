(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/util/util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// 文字提示带跳转
var tips = function tips(opt, to_url) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }
  var title = opt.title || '',icon = opt.icon || 'none',endtime = opt.endtime || 2000;
  if (title) uni.showToast({ title: title, icon: icon, duration: endtime });
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      var tab = to_url.tab || 1,url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            uni.switchTab({
              url: url });

          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            uni.navigateTo({
              url: url });

          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            uni.navigateBack({
              delta: parseInt(url) });

          }, endtime);
          break;
        case 4:
          //关闭当前所有页面跳转至非table页面
          setTimeout(function () {
            uni.reLaunch({
              url: url });

          }, endtime);
          break;
        case 5:
          //关闭当前页面跳转至非table页面
          setTimeout(function () {
            uni.redirectTo({
              url: url });

          }, endtime);
          break;}

    } else if (typeof to_url == 'function') {
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    } else {
      //没有提示时跳转不延迟
      setTimeout(function () {
        uni.navigateTo({
          url: to_url });

      }, title ? endtime : 0);
    }
  }
};
var formatDuring = function formatDuring(mss) {
  if (Math.ceil(mss) >= 60) {
    var second = addZero(Math.ceil(mss) % 60); //取余获得秒数
    var min = addZero(parseInt(Math.ceil(mss) / 60)); //当剩余分钟数不大于60分钟时，取整获得分数
    time = min + ":" + second;
  } else {
    var time = "00:" + addZero(Math.ceil(mss));
  }
  return time;
};
var calcTimer = function calcTimer(timer) {
  if (timer === 0 || typeof timer !== 'number') {
    return '00:00';
  }
  var mm = Math.floor(timer / 60);
  var ss = Math.floor(timer % 60);
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }
  return mm + ':' + ss;
};
// 时间戳转年月日时分秒
var format = function format(timestamp, type, divide1, divide2) {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = addZero(date.getMonth() + 1);
  var day = addZero(date.getDate());
  var hours = addZero(date.getHours());
  var minutes = addZero(date.getMinutes());
  var seconds = addZero(date.getSeconds());
  if (type == 0) {
    return year + divide1 + month + divide1 + day + ' ' + hours + divide2 + minutes + divide2 + seconds;
  } else if (type == 1) {
    return year + divide1 + month + divide1 + day;
  } else if (type == 2) {
    return year + divide1 + month;
  } else if (type == 3) {
    return month + divide1 + day;
  } else if (type == 4) {
    return hours + divide2 + minutes + divide2 + seconds;
  } else if (type == 5) {
    return hours + divide2 + minutes;
  } else if (type == 6) {
    return year + divide1 + month + divide1 + day + ' ' + hours + divide2 + minutes;
  }
};
var regular = function regular(type, info) {
  if (type == 'phone') {
    if (!/^1[3456789]\d{9}$/.test(info)) {
      return false;
    } else {
      return true;
    }
  }
};
function addZero(num) {
  return num < 10 ? '0' + num : num;
}
module.exports = {
  tips: tips,
  format: format,
  formatDuring: formatDuring,
  calcTimer: calcTimer,
  regular: regular };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 100:
/*!************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/index/find/find.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _find = __webpack_require__(/*! ../../../api/find.js */ 101);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      searchValue: "", //搜索内容
      tabs: [], //tabs选项
      nowTabIndex: 0, //当前选中的tab
      fiveList: [],
      isShow: false, //显示选项卡还是列表
      page: 1, //页数
      status: 'loadmore', //上拉加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' } };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 切换分类
    changeTab: function changeTab(index) {var _this = this;
      this.nowTabIndex = index;
      this.page = 1;
      this.fiveList = [];
      this.status = 'loadmore';
      (0, _find.cmsIndexIndex)({ page: this.page, channel_id: this.nowTabIndex }).then(function (res) {
        _this.fiveList = _this.fiveList.concat(res.data.data); //数据显示
        _this.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
      });
    },
    // 跳转提问页面
    toPutQuestions: function toPutQuestions() {
      uni.navigateTo({
        url: "/pages/problem/put_questions/put_questions" });

    },
    // 发起搜索
    getSearch: function getSearch() {var _this2 = this;
      if (this.searchValue == "") {
        this.isShow = false;
        this.getIndexInfo();
      } else {
        this.page = 1;
        this.fiveList = [];
        this.status = 'loadmore';
        (0, _find.indexSearch)({ search: this.searchValue, page: this.page }).then(function (res) {
          _this2.isShow = true;
          _this2.fiveList = _this2.fiveList.concat(res.data.data);
          _this2.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
        });
      }
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {var _this3 = this;
      if (this.status == 'loadmore') {
        this.page = this.page + 1;
        if (this.isShow) {
          (0, _find.indexSearch)({ search: this.searchValue, page: this.page }).then(function (res) {
            _this3.isShow = true;
            _this3.fiveList = _this3.fiveList.concat(res.data.data);
            _this3.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
          });
        } else {
          (0, _find.cmsIndexIndex)({ page: this.page, channel_id: this.nowTabIndex }).then(function (res) {
            _this3.fiveList = _this3.fiveList.concat(res.data.data); //数据显示
            _this3.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
          });
        }
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    },
    // 刚进来获取数据
    getIndexInfo: function getIndexInfo() {var _this4 = this;
      this.page = 1;
      this.fiveList = [];
      this.status = 'loadmore';
      (0, _find.cmsIndexIndex)({ page: this.page, channel_id: "" }).then(function (res) {
        _this4.tabs = res.data.tabList; //tab选项
        _this4.nowTabIndex = res.data.tabList[0].id; //第一个选项的id
        _this4.fiveList = res.data.data; //数据显示
        _this4.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
      });
    } },

  onShow: function onShow() {
    this.searchValue = ""; //清空搜索内容
    // 获取首页数据
    this.getIndexInfo();
  },
  onLoad: function onLoad() {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 101:
/*!***********************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/find.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.cmsIndexIndex = cmsIndexIndex;exports.indexSearch = indexSearch;exports.searchHistoryList = searchHistoryList;exports.searchHistory = searchHistory;exports.searchListDel = searchListDel;exports.getQuestionSearch = getQuestionSearch;exports.indexCategory = indexCategory;exports.indexQuestionTag = indexQuestionTag;exports.postapi = postapi;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 发现页数据
function cmsIndexIndex(data) {
  return _request.default.post('cms/wxapp.index/index', data);
}

// 发现页数据
function indexSearch(data) {
  return _request.default.post('cms/wxapp.index/search', data);
}

// 搜索历史列表
function searchHistoryList() {
  return _request.default.post('cms/wxapp.index/search_history_list');
}

// 搜索历史创建
function searchHistory(data) {
  return _request.default.post('cms/wxapp.index/search_history', data);
}

// 删除历史记录
function searchListDel(data) {
  return _request.default.post('cms/wxapp.my/search_list_del', data);
}

// 问题检索（发布问题中标题检索）
function getQuestionSearch(data) {
  return _request.default.post('ask/ajax/question_search', data);
}

// 问答分类数据展示（发布问题中问题类型）
function indexCategory() {
  return _request.default.post('cms/wxapp.index/category');
}

// 问题专栏列表（发布问题中问题专栏列表）
function indexQuestionTag() {
  return _request.default.post('cms/wxapp.index/question_tag');
}

// 提问接口
function postapi(data) {
  return _request.default.post('ask/vote/postapi', data);
}

/***/ }),

/***/ 11:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 110:
/*!********************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/index/my/my.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      allImages: _images.default, //所有图片
      fourTab: [{
        image: "iconguanzhu1",
        text: "我的关注",
        backgroundColor: "#FFCC66" },
      {
        image: "iconshoucang3",
        text: "我的收藏",
        backgroundColor: "#E87274" },
      {
        image: "icontiwen1",
        text: "我的提问",
        backgroundColor: "#49A8F9" },
      {
        image: "iconkongjian-shijian",
        text: "浏览记录",
        backgroundColor: "#8A92EB" }],

      list: [
      { id: 0, text: "推荐【金沙滩】给好友" },
      { id: 1, text: "我的积分" },
      { id: 2, text: "帮助中心" }] };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight', 'avatar'])),

  methods: {
    // 跳转到个人中心编辑页面
    toUserInformation: function toUserInformation() {
      uni.navigateTo({
        url: "/pages/personal_center/user_information/user_information" });

    },
    // 跳转页面
    toNewPage: function toNewPage(text) {
      if (text == "我的关注") {
        uni.navigateTo({
          url: "/pages/personal_center/follow/follow" });

      } else {
        var type;
        if (text == "我的收藏") {
          type = 0;
          uni.navigateTo({
            url: "/pages/personal_center/collection_browse/collection_browse?type=" + type });

        } else if (text == "我的提问") {
          uni.navigateTo({
            url: "/pages/personal_center/my_question/my_question" });

        } else {
          type = 2;
          uni.navigateTo({
            url: "/pages/personal_center/collection_browse/collection_browse?type=" + type });

        }
      }
    } },

  onLoad: function onLoad() {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 121:
/*!*****************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/live_broadcast/live_broadcast/live_broadcast.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _live_broadcast = __webpack_require__(/*! ../../../api/live_broadcast.js */ 122);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      videoId: 0, //当前直播id
      live_info: {}, //房间号等信息
      live_user: {}, //用户信息
      collect: false, //是否关注
      tabs: ["互动", "简介"], //tabs
      nowTabIndex: 0, //当前选项
      you_speech: "", //输入框内容
      scrollTop: 300, //评论位置
      allSpeech: [], //弹幕列表
      time: "", //轮询弹幕
      fiveList: [] //相关推荐
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight']), {
    nowScrollTop: function nowScrollTop() {
      return this.scrollTop;
    } }),

  methods: {
    // 关注/取消关注
    changeFollow: function changeFollow() {var _this = this;
      (0, _live_broadcast.workCollect)({ type: this.collect ? '1' : '0', work_id: this.live_user.id }).then(function (res) {
        _this.collect = !_this.collect;
      });
    },
    // 前往顾问主页
    toAdviserHome: function toAdviserHome() {
      uni.navigateTo({
        url: "/pages/live_broadcast/adviser_home/adviser_home?type=0&id=" + this.live_user.id + "&videoId=" + this.videoId });

    },
    // 修改tab选项
    changeTab: function changeTab(index) {
      this.nowTabIndex = index;
    },
    // 发送评论
    sendText: function sendText() {var _this2 = this;
      // 判断评论不能为空
      if (this.you_speech == "") {this.$util.tips({ title: "评论不能为空" });return;}
      (0, _live_broadcast.liveContent)({ live_id: this.videoId, content: this.you_speech }).then(function (res) {
        _this2.you_speech = "";
      });
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1 });

    },
    // 获取弹幕列表
    getLiveCat: function getLiveCat() {var _this3 = this;
      (0, _live_broadcast.liveChat)({ live_id: this.videoId }).then(function (res) {
        _this3.allSpeech = res.data;
        // 底部位置
        _this3.$nextTick(function () {
          this.scrollTop = this.allSpeech.length * 66;
        });
      });
    } },

  onLoad: function onLoad(options) {
    this.videoId = options.id;
  },
  onShow: function onShow() {var _this4 = this;
    // 获取房间信息
    (0, _live_broadcast.liveDetail)({ id: this.videoId }).then(function (res) {
      _this4.live_info = res.data.live_info; //房间信息等
      _this4.live_user = res.data.live_user; //用户信息等
      _this4.collect = res.data.collect == "false" ? false : true; //顾问是否被关注
    });
    this.getLiveCat();
    // 获取弹幕列表
    this.time = setInterval(function () {
      _this4.getLiveCat();
    }, 5000);
    // 获取相关推荐
    (0, _live_broadcast.detailRem)({ id: this.videoId }).then(function (res) {
      _this4.fiveList = res.data;
    });
  },
  onHide: function onHide() {
    clearInterval(this.time); //清除轮询
  },
  onUnload: function onUnload() {
    clearInterval(this.time); //清除轮询
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 122:
/*!*********************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/live_broadcast.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.liveDetail = liveDetail;exports.liveContent = liveContent;exports.liveChat = liveChat;exports.detailRem = detailRem;exports.workCollect = workCollect;exports.indexInfo = indexInfo;exports.videoRecom = videoRecom;exports.workDynamic = workDynamic;exports.videoDetail = videoDetail;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 直播页详情
function liveDetail(data) {
  return _request.default.post('cms/wxapp.index/live_detail', data);
}

// 直播间互动
function liveContent(data) {
  return _request.default.post('cms/wxapp.index/live_content', data);
}

// 直播间弹幕列表
function liveChat(data) {
  return _request.default.post('cms/wxapp.index/live_chat', data);
}

// 详情页推荐
function detailRem(data) {
  return _request.default.post('cms/wxapp.index/detail_rem', data);
}

// 顾问关注
/**
 * type: 0关注  1取消关注
 * work_id: 专栏id
 * **/
function workCollect(data) {
  return _request.default.post('cms/wxapp.user/work_collect', data);
}

// 顾问信息
/**
 * work_id: 顾问id
 * **/
function indexInfo(data) {
  return _request.default.post('cms/wxapp.index/info', data);
}

// 顾问推荐
/**
 * work_id: 顾问id
 * page: 分页
 * **/
function videoRecom(data) {
  return _request.default.post('cms/wxapp.index/video_recom', data);
}

// 顾问动态
/**
 * work_id: 顾问id
 * page: 分页
 * **/
function workDynamic(data) {
  return _request.default.post('cms/wxapp.index/work_dynamic', data);
}

// 视频页详情
function videoDetail(data) {
  return _request.default.post('cms/wxapp.index/video_detail', data);
}

/***/ }),

/***/ 133:
/*!*************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/live_broadcast/adviser_home/adviser_home.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _live_broadcast = __webpack_require__(/*! ../../../api/live_broadcast.js */ 122);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      videoId: 0, //直播id
      allImages: _images.default, //顶部背景图
      background: { backgroundColor: 'rgba(0,0,0,0)' }, //顶部导航背景色
      adviserId: 0, //顾问id
      isPlay: false, //是否直播
      adviserInfo: {},
      collect: false, //是否关注
      tabs: ["推荐", "动态"], //推荐动态评价
      nowTabsIndex: 0, //当前选择tab 
      page: 1, //分页
      fiveList: [], //推荐数据
      x: 3000,
      y: 3000,
      old: {
        x: 0,
        y: 0 },

      status: 'loadmore', //上拉加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' },

      // 2视频，3文件，4音频，6回答
      allDynamic: []
      // commentAll:[
      // 	{
      // 		userImage:"../../../static/images/other.jpg",
      // 		name:"某个人",
      // 		time:"08-20",
      // 		commentText:"最新的评论，这是一条评论，评论内容未知"
      // 	},{
      // 		userImage:"../../../static/images/other.jpg",
      // 		name:"仙仙",
      // 		time:"08-12",
      // 		commentText:"更早之前的一条评论"
      // 	},{
      // 		userImage:"../../../static/images/other.jpg",
      // 		name:"某个人",
      // 		time:"07-07",
      // 		commentText:"最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论"
      // 	},
      // ]
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 关注/取消关注
    changeFollow: function changeFollow() {var _this = this;
      (0, _live_broadcast.workCollect)({ type: this.collect ? '1' : '0', work_id: this.adviserId }).then(function (res) {
        _this.collect = !_this.collect;
      });
    },
    // 切换tab
    changeTab: function changeTab(index) {
      this.nowTabsIndex = index;
      this.page = 1;
      this.fiveList = [];
      this.allDynamic = [];
      this.status = "loadmore";
      if (index == 0) {
        this.getList();
      } else {
        this.getListTwo();
      }
    },
    // 直播拖动位置改变
    onChange: function onChange(e) {
      this.moveLock = true;
      this.old.x = e.detail.x;
      this.old.y = e.detail.y;
    },
    // 关闭直播
    closePlay: function closePlay() {
      this.isPlay = false;
    },
    // 返回直播页面
    toBack: function toBack() {
      uni.navigateTo({
        url: "/pages/live_broadcast/live_broadcast/live_broadcast?id=" + this.videoId });

    },
    // 获取顾问推荐
    getList: function getList() {var _this2 = this;
      (0, _live_broadcast.videoRecom)({ work_id: this.adviserId, page: this.page }).then(function (res) {
        _this2.fiveList = _this2.fiveList.concat(res.data.data);
        _this2.status = res.data.haspage == "false" ? 'nomore' : 'loadmore';
      });
    },
    // 获取顾问动态
    getListTwo: function getListTwo() {var _this3 = this;
      (0, _live_broadcast.workDynamic)({ work_id: this.adviserId, page: this.page }).then(function (res) {
        res.data.data.forEach(function (item) {
          item.updatetime = _this3.$util.format(item.updatetime, 3, "-");
        });
        _this3.allDynamic = _this3.allDynamic.concat(res.data.data);
        _this3.status = res.data.haspage == "false" ? 'nomore' : 'loadmore';
      });
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {
      if (this.status == 'loadmore') {
        this.page = this.page + 1;
        if (this.nowTabsIndex == 0) {
          this.getList();
        } else {
          this.getListTwo();
        }
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    },
    // 跳转页面
    toDetail: function toDetail(item) {
      // 6问答跳转到问答页面
      if (item.type == "6") {
        return;
        // uni.navigateTo({
        // 	url:"/pages/problem/question_and_answer/question_and_answer?id="+item.id+"&channel_id="+item.category_id
        // })
        // 3/4文件或音频跳转到文章详情页面
      } else if (item.type == "3" || item.type == "4") {
        uni.navigateTo({
          url: "/pages/problem/article_details/article_details?id=" + item.id });

        //1/2视频或直播回放跳转到视频详情页
      } else if (item.type == "1" || item.type == "2") {
        uni.navigateTo({
          url: "/pages/live_broadcast/video_playback/video_playback?id=" + item.id });

      }
    } },

  onLoad: function onLoad(options) {var _this4 = this;
    //是否从直播过来，0是
    if (options.type == 0) {
      this.isPlay = true;
      this.videoId = options.videoId;
    }
    this.adviserId = options.id; //获取顾问id
    // 获取顾问信息
    (0, _live_broadcast.indexInfo)({ work_id: this.adviserId }).then(function (res) {
      res.data.data.work_tag = res.data.data.work_tag.split(","); //标签切割
      _this4.collect = res.data.collect == "true" ? true : false; //是否关注
      _this4.adviserInfo = res.data.data;
    });
    this.getList(); //获取推荐信息
  },
  onShow: function onShow() {
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 144:
/*!*****************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/live_broadcast/video_playback/video_playback.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _live_broadcast = __webpack_require__(/*! ../../../api/live_broadcast.js */ 122);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      videoId: 0, //当前视频id
      userInfo: {},
      allImages: _images.default, //顶部背景图
      collect_work: false, //是否关注
      fiveList: [] };

  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 关注/取消关注
    changeFollow: function changeFollow() {var _this = this;
      (0, _live_broadcast.workCollect)({ type: this.collect_work ? '1' : '0', work_id: this.userInfo.id }).then(function (res) {
        _this.collect_work = !_this.collect_work;
      });
    },
    // 返回上一步
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1 });

    },
    // 前往顾问主页
    toAdviserHome: function toAdviserHome() {
      uni.navigateTo({
        url: "/pages/live_broadcast/adviser_home/adviser_home?id=" + this.userInfo.id });

    } },

  onLoad: function onLoad(options) {var _this2 = this;
    this.videoId = options.id;
    (0, _live_broadcast.videoDetail)({ id: this.videoId }).then(function (res) {
      res.data.creat_time = _this2.$util.format(res.data.creat_time, 2, "/");
      res.data.work_tag = res.data.work_tag.split(","); //tag
      _this2.collect_work = res.data.collect_work == "true" ? true : false; //是否关注
      console.log(res.data);
      _this2.userInfo = res.data;
    });
    // 获取相关推荐
    (0, _live_broadcast.detailRem)({ id: this.videoId }).then(function (res) {
      _this2.fiveList = res.data;
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/store/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 11));
var _mutationTypes = __webpack_require__(/*! ./mutation-types.js */ 16);var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    statusBarHeight: 0, //状态栏高度
    type: 0, //选择贷款状态
    avatar: uni.getStorageSync("user").avatar,
    edition: "1.0.1" //版本号
  },
  getters: {},

  mutations: (_mutations = {}, _defineProperty(_mutations,
  _mutationTypes.STATUS_BAR_HEIGHT, function (state, data) {
    state.statusBarHeight = data;
  }), _defineProperty(_mutations,
  _mutationTypes.CHANGE_TYPE, function (state, data) {
    state.type = data;
  }), _defineProperty(_mutations,
  _mutationTypes.CHANGE_AVATAR, function (state, data) {
    state.avatar = data;
  }), _mutations),

  actions: {
    statusBarHeight: function statusBarHeight(context, data) {
      context.commit('STATUS_BAR_HEIGHT', data);
    },
    changeType: function changeType(context, data) {
      context.commit('CHANGE_TYPE', data);
    },
    changeAvatar: function changeAvatar(context, data) {
      context.commit('CHANGE_AVATAR', data);
    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 153:
/*!******************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/search/search.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _find = __webpack_require__(/*! ../../../api/find.js */ 101);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      searchValue: "", // 搜索内容
      page: 1, //搜索页数
      channel: [], //检索出来的专栏
      retrieval: [], //检索出来的内容
      history: [], //历史记录
      isShow: true, //是否显示历史记录
      status: 'loadmore', //上拉加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' } };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 跳转专栏页面
    toSpecialColumn: function toSpecialColumn(item) {
      uni.navigateTo({
        url: "/pages/problem/special_column/special_column?id=" + item.id });

    },
    // 搜索数据indexSearc
    getSearch: function getSearch() {var _this = this;
      if (this.searchValue == "") {
        this.isShow = true;
      } else {
        this.isShow = false; //不显示历史记录
        this.page = 1; //页码重置
        this.channel = []; //专栏重置
        this.retrieval = []; //内容重置
        this.status = 'loadmore'; //获取重置
        (0, _find.indexSearch)({ search: this.searchValue, page: this.page }).then(function (res) {
          _this.channel = _this.channel.concat(res.data.channel); //专栏
          _this.retrieval = _this.retrieval.concat(res.data.data); //数据
          _this.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
        });
      }
    },
    // 点击跳转详情页
    toDetail: function toDetail(item) {
      // 跳转到内页，根据type判断，0直播，1回放，2视频，3文件，4音频，5广告
      if (item.type == 1 || item.type == 2) {
        uni.navigateTo({
          url: "/pages/live_broadcast/video_playback/video_playback" });

        // 添加到历史记录
        (0, _find.searchHistory)({ type: 2, id: item.id }).then(function (res) {console.log(res);});
      } else if (item.type == 3 || item.type == 4) {
        uni.navigateTo({
          url: "/pages/problem/article_details/article_details?id=" + item.id });

        // 添加到历史记录
        (0, _find.searchHistory)({ type: 1, id: item.id }).then(function (res) {console.log(res);});
      }
    },
    // 下拉获取更多
    onReachBottom: function onReachBottom() {var _this2 = this;
      if (this.status == 'loadmore') {
        this.page = this.page + 1;
        (0, _find.indexSearch)({ search: this.searchValue, page: this.page }).then(function (res) {
          _this2.channel = _this2.channel.concat(res.data.channel); //专栏
          _this2.retrieval = _this2.retrieval.concat(res.data.data); //数据
          _this2.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
        });
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    },
    // 获取历史记录
    getHistoryList: function getHistoryList() {var _this3 = this;
      (0, _find.searchHistoryList)().then(function (res) {
        if (res.data != null) {
          _this3.history = res.data;
        } else {
          _this3.history = [];
        }
      });
    },
    // 删除历史记录
    delInfo: function delInfo(item, type) {var _this4 = this;
      (0, _find.searchListDel)({ ids: item.id, type: type }).then(function (res) {
        _this4.getHistoryList();
      });
    } },

  onLoad: function onLoad(options) {
    // 搜索历史列表
    this.getHistoryList();
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!***********************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/store/mutation-types.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.CHANGE_AVATAR = exports.CHANGE_TYPE = exports.STATUS_BAR_HEIGHT = void 0;var STATUS_BAR_HEIGHT = 'STATUS_BAR_HEIGHT';exports.STATUS_BAR_HEIGHT = STATUS_BAR_HEIGHT;
var CHANGE_TYPE = 'CHANGE_TYPE';exports.CHANGE_TYPE = CHANGE_TYPE;
var CHANGE_AVATAR = 'CHANGE_AVATAR';exports.CHANGE_AVATAR = CHANGE_AVATAR;

/***/ }),

/***/ 162:
/*!********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/put_questions/put_questions.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _jinEdit = _interopRequireDefault(__webpack_require__(/*! ../../../common/jin-edit/jin-edit.vue */ 163));
var _find = __webpack_require__(/*! ../../../api/find.js */ 101);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      areaValueTitle: "", //问题
      areaValue: "", //描述
      isNoData: false, //暂无数据
      showPopup: false, //专栏弹出层
      popupType: 0, //弹窗类型
      popupList: [], //弹框数据
      questionType: { name: "请选择" }, //问题分类
      special_column: [], //添加的专栏
      special_column_index: [], //添加专栏的id
      specialColumnText: "(至少添加一个)", //添加数量
      imageList: [], //图片列表
      count: 8 //图片个数
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  components: {
    jinEdit: _jinEdit.default },

  methods: {
    // 描述信息
    changeValue: function changeValue() {
      console.log(this.areaValue);
    },
    // 标题检索
    changeValueTitle: function changeValueTitle() {var _this = this;
      this.showPopup = true; //显示
      this.popupType = 0; //类型
      // 问题检索请求
      (0, _find.getQuestionSearch)({ q: this.areaValueTitle }).then(function (res) {
        if (res.data.length == 0) {//暂无数据
          _this.isNoData = true;
        } else {//有数据
          _this.isNoData = false;
          _this.popupList = res.data;
        }
      });
    },
    // 获取检索标题
    getValueTitle: function getValueTitle(item) {
      this.showPopup = false;
      this.areaValueTitle = item.title;
    },
    // 添加图片
    addImage: function addImage() {
      var that = this;
      if (that.count == 0) {
        that.$util.tips({ title: "最多选择六张" });
      } else {
        uni.chooseImage({
          count: that.count,
          sizeType: ['compressed'], //压缩图
          sourceType: ['album', 'camera'], //相机或相册
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            for (var k = 0; k < tempFilePaths.length; k++) {
              uni.uploadFile({
                url: 'https://mituo.xypvip.cn/addons/cms/wxapp.index/image', //单图上传
                filePath: tempFilePaths[k],
                name: 'file',
                fileType: "image",
                success: function success(res) {
                  console.log(JSON.parse(res.data));
                  that.imageList = that.imageList.concat(JSON.parse(res.data).data);
                  that.count = 8 - that.imageList.length; //剩余可以选择张数
                } });

            }
          } });

      }
    },
    // 删除某张图片
    deleImage: function deleImage(item) {
      this.imageList.splice(this.imageList.indexOf(item), 1);
      this.count = this.count + 1;
    },
    // 获取专栏数据
    addSpcialColumn: function addSpcialColumn() {var _this2 = this;
      this.showPopup = true; //展示
      this.popupType = 1; //类型
      (0, _find.indexQuestionTag)().then(function (res) {_this2.popupList = res.data;});
    },
    // 添加或删除专栏数
    changeSpcialColumn: function changeSpcialColumn(item) {
      console.log(this.special_column_index.indexOf(item.id));
      if (this.special_column_index.indexOf(item.id) == -1) {
        if (this.special_column_index.length == 3) {
          this.$util.tips({ title: "最多添加三个" });
        } else {
          this.special_column.push(item);
          this.special_column_index.push(item.id);
        }
        this.specialColumnText = "(" + this.special_column.length + "/3)";
      } else {
        this.special_column.splice(this.special_column_index.indexOf(item.id), 1);
        this.special_column_index.splice(this.special_column_index.indexOf(item.id), 1);
        if (this.special_column.length == 0) this.specialColumnText = "(至少添加一个)";
      }
    },
    // 单独删除某个专栏
    deleSpecialColumn: function deleSpecialColumn(item) {
      this.special_column.splice(this.special_column_index.indexOf(item.id), 1);
      this.special_column_index.splice(this.special_column_index.indexOf(item.id), 1);
      if (this.special_column.length == 0) this.specialColumnText = "(至少添加一个)";else
      this.specialColumnText = this.special_column.length + "/3";
    },
    // 获取问题分类
    changeType: function changeType() {var _this3 = this;
      this.showPopup = true; //显示
      this.popupType = 2; //类型
      (0, _find.indexCategory)().then(function (res) {_this3.popupList = res.data;});
    },
    // 选择问题分类并修改
    getQuestionType: function getQuestionType(item) {
      this.questionType = item;
      this.showPopup = false;
    },
    // 发布成功
    toSuccess: function toSuccess() {
      if (this.areaValueTitle == "") {
        this.$util.tips({ title: "标题不能为空" });
        return;
      }
      if (this.areaValue == "") {
        this.$util.tips({ title: "描述信息不能为空" });
        return;
      }
      if (this.special_column_index.length == 0) {
        this.$util.tips({ title: "至少添加一个专栏" });
        return;
      }
      if (this.questionType.name == "请选择") {
        this.$util.tips({ title: "请选择分类" });
        return;
      }
      (0, _find.postapi)({ title: this.areaValueTitle, tags: this.special_column_index.join(), content: this.areaValue, images: this.imageList.join(), category_id: this.questionType.id }).then(function (ers) {
        uni.navigateTo({
          url: "/pages/problem/put_success/put_success" });

      });
    } },

  onLoad: function onLoad(options) {
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 168:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 169);

/***/ }),

/***/ 169:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 170);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 17:
/*!******************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 18));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 19));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 23));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 24));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 25));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 26));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 27));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 28));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 29));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 30));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 31));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 21));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 20));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 32));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 22));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 33));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 34));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 35));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 36));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 37));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 38);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 39));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 40));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 41));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 170:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 18:
/*!*****************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 183:
/*!**********************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/personal_center/user_information/user_information.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _personal_center = __webpack_require__(/*! ../../../api/personal_center.js */ 184);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      headStyle: { //样式
        fontSize: '30rpx',
        color: "#333333",
        fontWeight: "bold",
        borderBottom: "1rpx solid #E1E1E1",
        padding: "30rpx 0rpx" },

      carShow: false, //车辆信息展示
      homeShow: false, //房屋信息展示
      slotRight: false, //编辑或保存
      newCarInfo: [], //添加的车辆信息
      newHomeInfo: [], //添加的房屋信息
      newUserInfo: {}, //新的用户信息
      onlyCar: {}, //单个车辆信息
      onlyHome: {}, //单个房屋信息
      timeAddressShow: false, //时间或地址选择器显示
      timeOrAddress: "time", //时间或地址选择器
      selectorShow: false, //单列选择器
      oneListIndex: 0, //单列选择器
      selector: [], //单列选择器数据
      nowPage: 0, //当前页判断是信息/车辆/房屋
      carHomeTitle: "", //添加标题
      subscript: -1 //修改车辆或房屋信息
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 修改头像
    changeImage: function changeImage() {
      if (this.slotRight) {
        var that = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'], //压缩图
          sourceType: ['album', 'camera'], //相机或相册
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            uni.uploadFile({
              url: 'https://mituo.xypvip.cn/addons/cms/wxapp.index/image', //单图上传
              filePath: tempFilePaths[0],
              name: 'file',
              fileType: "image",
              success: function success(res) {
                that.newUserInfo.avatar = JSON.parse(res.data).data;
              } });

          } });

      }
    },
    // 车辆或房屋信息展示
    changeCarHome: function changeCarHome(index, carHome) {
      console.log(index, carHome, this.newCarInfo, this.newHomeInfo);
      if (index == 0) {
        this.carShow = !this.carShow;
      } else {
        this.homeShow = !this.homeShow;
      }
    },
    // 切换保存或编辑状态
    editPreservation: function editPreservation() {var _this = this;
      this.slotRight = !this.slotRight;
      if (!this.slotRight) {//当为编辑的时候将原有数据重新赋值
        var data = {
          avatar: this.newUserInfo.avatar, //头像
          username: this.newUserInfo.username, //昵称
          gender: this.newUserInfo.gender == 0 ? '女' : '男', //性别
          birthday: this.newUserInfo.birthday, //生日
          mobile: this.newUserInfo.mobile, //手机号
          city: this.newUserInfo.city, //居住地
          income: this.newUserInfo.income, //月收入
          ishas_shebao: this.newUserInfo.ishas_shebao, //是否缴纳社保
          shebao: this.newUserInfo.shebao, //社保基数
          carInfo: this.newCarInfo, //车辆列表
          homeInfo: this.newHomeInfo //房屋列表
        };
        (0, _personal_center.editUserinfo)(data).then(function (res) {
          var user = uni.getStorageSync("user");
          user.avatar = _this.newUserInfo.avatar;
          uni.setStorageSync("user", user);
          _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
        });
      }
    },
    // 显示时间或地址选择器
    changeShow: function changeShow(text) {
      if (this.slotRight) {
        this.timeOrAddress = text, //时间或地址
        this.timeAddressShow = !this.timeAddressShow; //显示弹窗
      }
    },
    // 单列选择器
    changeShow2: function changeShow2(index) {var _this2 = this;
      if (this.slotRight) {
        this.selector = [];
        this.selectorShow = !this.selectorShow; //显示弹窗
        this.oneListIndex = index; //单列选择器
        if (index == 0) {
          this.selector = ["男", "女"];
        } else if (index == 1) {//个人收入
          (0, _personal_center.incomeList)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 2) {
          this.selector = ["是", "否"];
        } else if (index == 3) {//社保基数
          (0, _personal_center.shebaoList)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 4) {//车辆价格区间列表
          (0, _personal_center.carPrice)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 5) {//车辆分期列表
          (0, _personal_center.carConfig)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 6) {//房屋类型
          (0, _personal_center.houseCategoryList)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 7) {//房屋市值
          (0, _personal_center.housePrice)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 8) {//房屋分期列表
          (0, _personal_center.houseConfig)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 9) {//房屋已还款期数
          (0, _personal_center.houseCategory)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        } else if (index == 10) {//车已还款期数
          (0, _personal_center.carCategory)().then(function (res) {res.data.forEach(function (item) {_this2.selector.push(item.text);});});
        }
      }
    },
    // 添加车辆或房屋信息
    toAdd: function toAdd(index) {
      if (this.nowPage == 1) {
        if (!this.onlyCar.marketValue) {this.$util.tips({ title: "请选择车辆市值" });return;}
        if (!this.onlyCar.periodNumber) {
          this.$util.tips({ title: "请选择还款期数" });
          return;
        } else if (this.onlyCar.periodNumber != "全款") {
          if (!this.onlyCar.periodCategory) {this.$util.tips({ title: "请选择已还款期数" });return;}
        }
        if (!this.onlyCar.licensePlate) {this.$util.tips({ title: "请输入车牌" });return;}
        if (!this.onlyCar.kilometers) {this.$util.tips({ title: "请输入公里数" });return;}
        if (this.subscript == -1) {
          this.newCarInfo.push(this.onlyCar);
        } else {
          this.newCarInfo.splice(this.subscript, 1, this.onlyCar);
          this.subscript = -1;
        }
      } else if (this.nowPage == 2) {
        if (!this.onlyHome.type) {this.$util.tips({ title: "请选择房屋类型" });return;}
        if (!this.onlyHome.marketValue) {this.$util.tips({ title: "请选择房屋市值" });return;}
        if (!this.onlyHome.periodNumber) {
          this.$util.tips({ title: "请选择还款期数" });
          return;
        } else if (this.onlyHome.periodNumber != "全款") {
          if (!this.onlyHome.periodCategory) {this.$util.tips({ title: "请选择已还款期数" });return;}
        }
        if (this.subscript == -1) {
          this.newHomeInfo.push(this.onlyHome);
        } else {
          this.newHomeInfo.splice(this.subscript, 1, this.onlyHome);
          this.subscript = -1;
        }
      }
      this.nowPage = index;
      if (index == 1) {
        this.onlyCar = {};
        this.carHomeTitle = "添加车辆信息";
      } else if (index == 2) {
        this.onlyHome = {};
        this.carHomeTitle = "添加房屋信息";
      }
    },
    // 生日地址选择 
    addressTime: function addressTime(item) {
      if (this.timeOrAddress == "time") {
        this.newUserInfo.birthday = item.year + "-" + item.month + "-" + item.day; //生日修改
      } else {
        this.newUserInfo.city = item.province.label + item.city.label + item.area.label; //地址修改
      }
    },
    // 单列选择器选择
    oneChange: function oneChange(value) {
      var index = value[0]; //相中选项的下标
      if (this.oneListIndex == 0) {//性别
        this.newUserInfo.gender = this.selector[index] == "男" ? "1" : "0";
      } else if (this.oneListIndex == 1) {//月收入
        this.newUserInfo.income = this.selector[index];
      } else if (this.oneListIndex == 2) {//是否缴纳社保
        this.newUserInfo.ishas_shebao = this.selector[index];
      } else if (this.oneListIndex == 3) {//社保基数
        this.newUserInfo.shebao = this.selector[index];
      } else if (this.oneListIndex == 4) {//车辆市值
        this.onlyCar.marketValue = this.selector[index];
      } else if (this.oneListIndex == 5) {//车辆还款期数
        this.onlyCar.periodNumber = this.selector[index];
      } else if (this.oneListIndex == 6) {//房屋类型
        this.onlyHome.type = this.selector[index];
      } else if (this.oneListIndex == 7) {//房屋市值
        this.onlyHome.marketValue = this.selector[index];
      } else if (this.oneListIndex == 8) {//房屋还款期数
        this.onlyHome.periodNumber = this.selector[index];
      } else if (this.oneListIndex == 9) {//房屋已还款期数
        this.onlyHome.periodCategory = this.selector[index];
      } else if (this.oneListIndex == 10) {//车已还款期数
        this.onlyCar.periodCategory = this.selector[index];
      }
    },
    // 跳到车辆编辑等
    toCarHome: function toCarHome(index, subscript) {
      this.nowPage = index; //房屋信息
      this.subscript = subscript; //下标
      if (index == 1) {
        this.carHomeTitle = "添加车辆信息";
        this.onlyCar.marketValue = this.newCarInfo[subscript].marketValue;
        this.onlyCar.periodNumber = this.newCarInfo[subscript].periodNumber;
        this.onlyCar.periodCategory = this.newCarInfo[subscript].periodCategory;
        this.onlyCar.licensePlate = this.newCarInfo[subscript].licensePlate;
        this.onlyCar.kilometers = this.newCarInfo[subscript].kilometers;
      } else if (index == 2) {
        this.carHomeTitle = "添加房屋信息";
        this.onlyHome.type = this.newHomeInfo[subscript].type;
        this.onlyHome.marketValue = this.newHomeInfo[subscript].marketValue;
        this.onlyHome.periodNumber = this.newHomeInfo[subscript].periodNumber;
        this.onlyHome.periodCategory = this.newHomeInfo[subscript].periodCategory;
      }
    } },

  onLoad: function onLoad() {var _this3 = this;
    (0, _personal_center.userInfo)().then(function (res) {
      _this3.newCarInfo = JSON.parse(JSON.stringify(res.data.car_info)); //编辑车辆信息
      _this3.newHomeInfo = JSON.parse(JSON.stringify(res.data.house_info)); //编辑房屋信息
      _this3.newUserInfo = JSON.parse(JSON.stringify(res.data.user_info)); //编辑用户信息
    });
  },
  onShow: function onShow() {
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 184:
/*!**********************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/personal_center.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.userInfo = userInfo;exports.editUserinfo = editUserinfo;exports.incomeList = incomeList;exports.housePrice = housePrice;exports.houseConfig = houseConfig;exports.houseCategory = houseCategory;exports.carPrice = carPrice;exports.carConfig = carConfig;exports.carCategory = carCategory;exports.houseCategoryList = houseCategoryList;exports.shebaoList = shebaoList;exports.userCollect = userCollect;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 获取用户注册信息
function userInfo() {
  return _request.default.post('cms/wxapp.my/user_info');
}

// 编辑用户信息
function editUserinfo(data) {
  return _request.default.post('cms/wxapp.my/edit_userinfo', data);
}

// 个人收入列表
function incomeList() {
  return _request.default.post('cms/wxapp.my/income_list');
}

// 房屋价格区间列表
function housePrice() {
  return _request.default.post('cms/wxapp.my/house_price');
}

// 房屋分期列表
function houseConfig() {
  return _request.default.post('cms/wxapp.my/house_config');
}

// 房屋已还期数列表
function houseCategory() {
  return _request.default.post('cms/wxapp.my/house_category');
}

// 汽车价格区间列表
function carPrice() {
  return _request.default.post('cms/wxapp.my/car_price');
}

// 车辆分期列表
function carConfig() {
  return _request.default.post('cms/wxapp.my/car_config');
}

// 车已还期数列表
function carCategory() {
  return _request.default.post('cms/wxapp.my/car_category');
}

// 房屋类型列表
function houseCategoryList() {
  return _request.default.post('cms/wxapp.my/house_category_list');
}

// 社保基数列表
function shebaoList() {
  return _request.default.post('cms/wxapp.my/shebao_list');
}

// 关注中心列表
function userCollect(data) {
  return _request.default.post('cms/wxapp.my/user_collect', data);
}

/***/ }),

/***/ 19:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/request/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 20));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 195:
/*!**************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/personal_center/follow/follow.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _personal_center = __webpack_require__(/*! ../../../api/personal_center.js */ 184);
var _problem = __webpack_require__(/*! ../../../api/problem.js */ 196);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      tabs: [{ name: '专栏' }, { name: '问题' }, { name: '顾问' }],
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      page: 1, //分页
      specialColumn: [], //专栏
      qAndA: [], //问题
      adviser: [], //顾问
      show: false, //模态框
      haspage: true, //是否还有下一页请求
      indexChange: 0, //当前选中的下标
      isNoData: false //是否有数据
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // tabs通知swiper切换
    tabsChange: function tabsChange(index) {
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    // transition(e) {
    // 	let dx = e.detail.dx;
    // 	this.$refs.uTabs.setDx(dx);
    // 	console.log("swiper启动")
    // },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish: function animationfinish(e) {
      var current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
      // 切换请求的时候数据清空
      this.page = 1;
      this.specialColumn = [];
      this.qAndA = [];
      this.adviser = [];
      this.getData();
    },
    // scroll-view到底部加载更多
    onreachBottom: function onreachBottom() {
      if (this.haspage) {
        this.page = this.page + 1;
        this.getData();
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    },
    // 取消关注
    lookModal: function lookModal(index) {
      this.indexChange = index;
      this.show = !this.show;
    },
    confirm: function confirm() {var _this = this;
      if (this.current == 0) {
        (0, _problem.userChannelCollert)({ type: 1, channel_id: this.specialColumn[this.indexChange].id }).then(function (res) {
          _this.$util.tips({ title: "取消成功" });
          _this.specialColumn.splice(_this.indexChange, 1);
        });
      } else if (this.current == 1) {
        (0, _problem.attentionDeletes)({ type: "question", id: this.qAndA[this.indexChange].id }).then(function (res) {
          _this.$util.tips({ title: "取消成功" });
          _this.qAndA.splice(_this.indexChange, 1);
        });
      } else {
        (0, _problem.workCollect)({ type: 1, work_id: this.adviser[this.indexChange].id }).then(function (res) {
          _this.$util.tips({ title: "取消成功" });
          _this.adviser.splice(_this.indexChange, 1);
        });
      }
    },
    // 获取关注列表
    getData: function getData() {var _this2 = this;
      (0, _personal_center.userCollect)({ type: this.current, page: this.page }).then(function (res) {
        if (_this2.current == 0) {
          _this2.specialColumn = _this2.specialColumn.concat(res.data.data);
        } else if (_this2.current == 1) {
          _this2.qAndA = _this2.qAndA.concat(res.data.data);
        } else {
          _this2.adviser = _this2.adviser.concat(res.data.data);
        }
        _this2.haspage = res.data.haspage == "true" ? true : false; //是否还有下一页请求
        if (_this2.page == 1 && res.data.data.length == 0) {_this2.isNoData = true;} else {_this2.isNoData = false;}
      });
    },
    // 去详情页
    toDetail: function toDetail(inIndex) {
      if (this.current == 0) {
        uni.navigateTo({
          url: "/pages/problem/special_column/special_column?id=" + this.specialColumn[this.indexChange].id });

      } else if (this.current == 1) {
        uni.navigateTo({
          url: "/pages/problem/question_and_answer/question_and_answer?id=" + this.qAndA[this.indexChange].id + "&channel_id=" + this.qAndA[this.indexChange].category_id });

      } else {
        uni.navigateTo({
          url: "/pages/live_broadcast/adviser_home/adviser_home?id=" + this.adviser[this.indexChange].id });

      }
    } },

  onLoad: function onLoad() {
    this.getData();
  },
  onShow: function onShow() {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 196:
/*!**************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/problem.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.channelInfo = channelInfo;exports.userChannelCollert = userChannelCollert;exports.channelTab = channelTab;exports.questionDetail = questionDetail;exports.answerList = answerList;exports.voteCreates = voteCreates;exports.voteDeletes = voteDeletes;exports.controllerCollect = controllerCollect;exports.controllerNoCollect = controllerNoCollect;exports.attentionDeletes = attentionDeletes;exports.attentionCreates = attentionCreates;exports.workCollect = workCollect;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 专栏首页
function channelInfo(data) {
  return _request.default.post('cms/wxapp.index/channel_info', data);
}

// 用户关注专栏
/**
 * type: 0关注  1取消关注
 * channel_id: 专栏id
 * **/
function userChannelCollert(data) {
  return _request.default.post('cms/wxapp.user/channel_collert', data);
}

// 专栏标签切换
function channelTab(data) {
  return _request.default.post('cms/wxapp.index/channel_tab', data);
}

// 问题详情页
function questionDetail(data) {
  return _request.default.post('cms/wxapp.index/question_detail', data);
}

// 答案列表
function answerList(data) {
  return _request.default.post('cms/wxapp.index/answer_list', data);
}

// 答案有用或没用点赞
function voteCreates(data) {
  return _request.default.post('ask/vote/creates', data);
}

// 答案有用或没用取消点赞
function voteDeletes(data) {
  return _request.default.post('ask/vote/deletes', data);
}

// 答案收藏
function controllerCollect(data) {
  return _request.default.post('ask/collection/collect', data);
}

// 答案取消收藏
function controllerNoCollect(data) {
  return _request.default.post('ask/collection/not_collect', data);
}

// 问题/顾问 取消关注
function attentionDeletes(data) {
  return _request.default.post('ask/attention/deletes', data);
}

// 问题/顾问 关注
function attentionCreates(data) {
  return _request.default.post('ask/attention/creates', data);
}

// 顾问关注
/**
 * type: 0关注  1取消关注
 * work_id: 专栏id
 * **/
function workCollect(data) {
  return _request.default.post('cms/wxapp.user/work_collect', data);
}

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 205:
/*!************************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/personal_center/collection_browse/collection_browse.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _my = __webpack_require__(/*! ../../../api/my.js */ 206);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      type: 0, //0我的收藏，1我的提问，2浏览记录
      title: "我的收藏",
      titleRight: false, //管理
      page: 1, //请求页数
      lock: "true", //是否可以请求
      list: {}, //列表数据
      status: 'loadmore', //加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' },

      disabled: false, //是否可以滑动
      // 滑动删除的按钮
      options: [
      {
        text: '删除',
        style: {
          backgroundColor: '#dd524d',
          fontSize: "30rpx",
          color: "#FFFFFF",
          textAlign: "center" } }],



      allCheck: false, //全选或删除
      ids: [] //选择的所有数据
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight']), {
    newList: function newList() {
      return this.list;
    } }),

  methods: {
    // 点击单个删除
    click: function click(index, key) {var _this = this;
      if (this.type == 0) {
        (0, _my.collectListDel)({ ids: this.list[key][index].aid }).then(function (res) {
          _this.list[key].splice(index, 1);
        });
      } else {
        (0, _my.viewsHistoryDel)({ ids: this.list[key][index].aid }).then(function (res) {
          _this.list[key].splice(index, 1);
        });
      }
    },
    // 删除多个数据
    delMore: function delMore() {var _this2 = this;
      this.page = 1; //重置页数
      this.lock = "true"; //重置请求
      this.list = {}; //重置数据列表
      this.status = "loadmore"; //重置加载更多
      if (this.type == 0) {
        (0, _my.collectListDel)({ ids: this.ids.join(",") }).then(function (res) {_this2.getList();_this2.changeRight();});
      } else {
        (0, _my.viewsHistoryDel)({ ids: this.ids.join(",") }).then(function (res) {_this2.getList();_this2.changeRight();});
      }
    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    open: function open(index, key) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[key][index].show = true;
    },
    // 选中某个时触发
    checkboxChange: function checkboxChange(e) {var _this3 = this;
      if (e.name == "全选") {
        // 修改所有选项
        for (var key in this.list) {
          this.list[key].forEach(function (item) {
            item.checked = e.value;
          });
        }
        if (e.value) {//全选
          this.ids = [];
          for (var _key in this.list) {
            this.list[_key].forEach(function (item) {
              _this3.ids.push(item.aid);
            });
          }
        } else {//取消全选
          this.ids = [];
        }
      } else {
        if (e.value) {
          this.ids.push(e.name); //添加数据到数组中
          var lengthList = 0;
          for (var _key2 in this.list) {//获取所有数据长度
            lengthList = lengthList + this.list[_key2].length;
          }
          if (this.ids.length == lengthList) {//如果都添加进去则全选
            this.allCheck = true;
          }
        } else {
          if (this.ids.indexOf(e.name) != -1) {
            this.ids.splice(this.ids.indexOf(e.name), 1); //删除数组中某个数据
          }
          this.allCheck = false; //不可能全选
        }
      }
    },
    // 管理或取消
    changeRight: function changeRight() {
      for (var item in this.list) {
        this.list[item].forEach(function (item) {
          item.show = false;
        });
      }
      this.titleRight = !this.titleRight;
      // 是否可滑动删除
      this.disabled = this.titleRight;
    },
    // 获取数据
    getList: function getList() {var _this4 = this;
      if (this.lock == "true") {
        if (this.type == 0) {
          // 获取用户收藏列表
          (0, _my.collectList)({ page: this.page }).then(function (res) {
            _this4.changeList(res.data);
          });
        } else {
          // 获取用户浏览记录
          (0, _my.viewsHistory)({ page: this.page }).then(function (res) {
            _this4.changeList(res.data);
          });
        }
      } else {
        this.$util.tips({ title: "暂无更多数据" });
      }
    },
    // 处理数据并赋值
    changeList: function changeList(data) {var _this5 = this;
      this.lock = data.pagenext; //后方是否还有数据
      this.status = this.lock == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
      delete data.pagenext;
      for (var key in data) {
        data[key].forEach(function (item) {
          item.create_time = _this5.$util.format(item.create_time, 3, "/");
          item.show = false;
          item.checked = false;
        });
      }
      // this.list=data//收藏的数据列表
      for (var _key3 in data) {
        if (this.list.hasOwnProperty(_key3) == true) {
          this.list[_key3] = this.list[_key3].concat(data[_key3]);
        } else {
          this.list = _objectSpread({}, this.list, _defineProperty({}, _key3, data[_key3]));
        }
      }
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {
      this.page = this.page + 1;
      this.getList();
    },
    toDetail: function toDetail(item, index) {
      uni.navigateTo({
        url: "/pages/problem/article_details/article_details?id=" + item[index].aid });

    } },

  onLoad: function onLoad(options) {
    // 获取类型修改标题
    this.type = options.type;
    if (options.type == 0) {
      this.title = "我的收藏";
    } else {
      this.title = "浏览记录";
    }
    // 获取用户收藏列表
    this.getList();
  },
  onShow: function onShow() {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 206:
/*!*********************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/my.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.collectList = collectList;exports.myQuestion = myQuestion;exports.viewsHistory = viewsHistory;exports.collectListDel = collectListDel;exports.viewsHistoryDel = viewsHistoryDel;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 获取用户收藏列表
function collectList(data) {
  return _request.default.post('cms/wxapp.my/collect_list', data);
}

// 获取用户提问列表
function myQuestion(data) {
  return _request.default.post('cms/wxapp.my/my_question', data);
}

// 获取用户浏览记录
function viewsHistory(data) {
  return _request.default.post('cms/wxapp.my/views_history', data);
}

// 用户删除收藏记录
function collectListDel(data) {
  return _request.default.post('cms/wxapp.my/collect_list_del', data);
}

// 用户删除浏览记录
function viewsHistoryDel(data) {
  return _request.default.post('cms/wxapp.my/views_history_del', data);
}

/***/ }),

/***/ 21:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/deepClone.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 217:
/*!**********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/special_column/special_column.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _problem = __webpack_require__(/*! ../../../api/problem.js */ 196);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      background: { backgroundColor: 'rgba(0,0,0,0)' },
      channel_info: {}, //首页数据
      channel_count: 0, //关注数
      channel_number: 0, //浏览数
      tabs: [], //导航
      nowTabIndex: 0, //当前tab
      list: [], //列表数据
      page: 1,
      channel_collect: true, //是否关注专栏
      status: 'loadmore', //上拉加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' } };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 切换tab
    changeTab: function changeTab(index) {
      this.nowTabIndex = index; //切换tabs
      this.list = [];
      this.page = 1;
      this.getData();
    },
    // 跳转问答
    toQAndA: function toQAndA(item) {
      if (this.nowTabIndex == 1) {//问答类直接跳转问答页面
        uni.navigateTo({
          url: "/pages/problem/question_and_answer/question_and_answer?id=" + item.id + "&channel_id=" + this.channel_info.id });

      } else if (this.nowTabIndex == 3) {//咨询类全部文章或音频
        uni.navigateTo({
          url: "/pages/problem/article_details/article_details?id=" + item.id });

      } else if (this.nowTabIndex == 2) {//视频类
        uni.navigateTo({
          url: "/pages/live_broadcast/video_playback/video_playback?id=" + item.id });

      } else {
        if (item.type == 1 || item.type == 2) {
          uni.navigateTo({
            url: "/pages/live_broadcast/video_playback/video_playback?id=" + item.id });

        } else if (item.type == 3 || item.type == 4) {
          uni.navigateTo({
            url: "/pages/problem/article_details/article_details?id=" + item.id });

        }
      }
    },
    // 关注或取消关注专栏
    ChannelCollect: function ChannelCollect() {var _this = this;
      //channel_collect为true的时候是关注需要传1取消关注否则0关注
      (0, _problem.userChannelCollert)({ type: this.channel_collect ? 1 : 0, channel_id: this.channel_info.id }).then(function (res) {
        console.log(res);
        _this.channel_collect = !_this.channel_collect;
      });
    },
    // 获取数据
    getData: function getData() {var _this2 = this;
      (0, _problem.channelTab)({ type: this.tabs[this.nowTabIndex], page: this.page, id: this.channel_info.id }).then(function (res) {
        res.data.data.forEach(function (item) {//数据的时间转换
          item.updatetime = _this2.$util.format(item.updatetime, 3, "/");
        });
        _this2.list = _this2.list.concat(res.data.data);
        _this2.status = res.data.haspage == 'false' ? 'nomore' : 'loadmore';
      });
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {
      if (this.status == 'loadmore') {
        this.page = this.page + 1;
        this.getData();
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    } },

  onLoad: function onLoad(options) {var _this3 = this;
    (0, _problem.channelInfo)({ id: options.id }).then(function (res) {
      _this3.channel_info = res.data.channel_info; //专栏信息
      _this3.tabs = res.data.channel_table; //导航
      _this3.channel_count = res.data.channel_count; //关注数
      _this3.channel_number = res.data.channel_number; //浏览数
      res.data.channel_archives.forEach(function (item) {//数据的时间转换
        item.updatetime = _this3.$util.format(item.updatetime, 3, "/");
      });
      _this3.list = res.data.channel_archives; //列表数据
      _this3.channel_collect = res.data.channel_collect == "0" ? true : false; //0关注，1未关注
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/test.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 226:
/*!********************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/question_and_answer/question_and_answer.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _problem = __webpack_require__(/*! ../../../api/problem.js */ 196);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  data: function data() {
    return {
      // 顶部导航栏颜色
      background: { backgroundColor: 'rgba(0,0,0,0)' },
      id: 0, //问题id
      channel_id: 0, //专栏id
      channel_info: {}, //专栏信息
      collect_channel: false, //专栏是否关注0关注1未关注
      question: {}, //问题内容
      question_tag: [], //问题标签
      collect_question: false, //问题是否关注0关注1未关注
      openCollect: false, //展开或收起
      allComments: [], //答案列表
      answer_up: 0, //认为有用人数
      status: 'loadmore', //上拉加载更多
      iconType: 'flower',
      page: 1, //页码
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' } };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  components: {},


  methods: {
    // 点击有用没用和收藏
    changeIs: function changeIs(item, index, num) {var _this = this;
      // isuse中0有用，1无用，2什么都没点
      if (num == 1) {//点击有用
        if (item.isuse == "0") {
          // 取消点赞
          (0, _problem.voteDeletes)({ id: item.id, type: "answer", value: "up" }).then(function (res) {
            _this.allComments[index].isuse = "2";
          });
        } else {
          // 点赞
          (0, _problem.voteCreates)({ id: item.id, type: "answer", value: "up" }).then(function (res) {
            _this.allComments[index].isuse = "0";
          });
        }
      } else if (num == 2) {
        if (item.isuse == "1") {
          // 取消没用点赞
          (0, _problem.voteDeletes)({ id: item.id, type: "answer", value: "down" }).then(function (res) {
            _this.allComments[index].isuse = "2";
          });
        } else {
          // 点赞
          (0, _problem.voteCreates)({ id: item.id, type: "answer", value: "down" }).then(function (res) {
            _this.allComments[index].isuse = "1";
          });
        }
      } else if (num == 3) {
        // this.allComments[index].ganxie=!this.allComments[index].ganxie
      } else if (num == 4) {
        if (item.answer_isuse == "true") {
          (0, _problem.controllerNoCollect)({ id: item.id, type: "answer" }).then(function (res) {
            _this.allComments[index].answer_isuse = "false";
          });
        } else {
          (0, _problem.controllerCollect)({ id: item.id, type: "answer" }).then(function (res) {
            _this.allComments[index].answer_isuse = "true";
          });
        }
      }
    },
    // 获取数据
    getAnswerList: function getAnswerList() {var _this2 = this;
      (0, _problem.answerList)({ id: this.id, page: this.page }).then(function (res) {
        res.data.data.forEach(function (item) {//上传时间的修改
          item.updatetime = _this2.$util.format(item.updatetime, 1, "/");
          item.city = item.city.substring(item.city.lastIndexOf("市") + 1, item.city.length);
        });
        _this2.answer_up = res.data.answer_up; //认为有用人数
        _this2.allComments = _this2.allComments.concat(res.data.data); //数据添加
        _this2.status = res.data.haspage == "false" ? 'nomore' : 'loadmore'; //判断是否还有数据
      });
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {
      if (this.status == 'loadmore') {
        this.page = this.page + 1;
        this.getAnswerList();
      } else {
        this.$util.tips({ title: "没有了~" });
      }
    },
    // 点击问题关注和取消关注
    collectQuestion: function collectQuestion() {var _this3 = this;
      if (this.collect_question) {
        (0, _problem.attentionDeletes)({ id: this.id, type: "question" }).then(function (res) {
          _this3.collect_question = false;
        });
      } else {
        (0, _problem.attentionCreates)({ id: this.id, type: "question" }).then(function (res) {
          _this3.collect_question = true;
        });
      }
    },
    // 专栏的关注和取消关注
    collectChannel: function collectChannel() {var _this4 = this;
      if (this.collect_channel) {
        (0, _problem.userChannelCollert)({ type: 1, channel_id: this.channel_id }).then(function (res) {
          _this4.collect_channel = false;
        });
      } else {
        (0, _problem.userChannelCollert)({ type: 0, channel_id: this.channel_id }).then(function (res) {
          _this4.collect_channel = true;
        });
      }
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1 });

    } },

  onLoad: function onLoad(options) {var _this5 = this;
    this.channel_id = options.channel_id; //专栏id
    this.id = options.id; //问题id
    (0, _problem.questionDetail)({ channel_id: this.channel_id, id: this.id }).then(function (res) {
      _this5.channel_info = res.data.channel_info;
      _this5.collect_channel = res.data.collect_channel == '0' ? true : false; //0关注1未关注
      _this5.question = res.data.question;
      _this5.question_tag = res.data.question_tag;
      _this5.collect_question = res.data.collect_question == '0' ? true : false; //0关注1未关注
    });
    // 答案列表
    this.getAnswerList();
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!**************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/queryParams.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 237:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/article_details/article_details.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _jinEdit = _interopRequireDefault(__webpack_require__(/*! ../../../common/jin-edit/jin-edit.vue */ 163));
var _index = __webpack_require__(/*! ../../../api/index.js */ 89);
var _live_broadcast = __webpack_require__(/*! ../../../api/live_broadcast.js */ 122);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      // 顶部导航栏颜色
      background: { backgroundColor: 'rgba(0,0,0,0)' },
      background1: { backgroundColor: '#FFFFFF' },
      id: "", //文章id
      article: "", //文章数据
      mpUrl: "", //音频地址
      nowAudio: "", //音频实例
      nowDuration: 0, //当前音频长度
      nowIsPlay: false, //是否播放音频
      title: "", //文章标题
      tags: [], //标签
      name: "", //一级分类
      updatetime: "", //上传时间 
      views: 0, //浏览量
      dislikes: 0, //收藏量
      collect: 0, //是否被收藏0收藏，1未收藏
      channel_info: "", //专栏数据
      channel_collect: "1", //是否关注专栏0关注，1未关注
      fiveList: [] };

  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight']), {
    overTimer: function overTimer() {
      return this.$util.calcTimer(this.nowDuration);
    } }),

  components: {
    jinEdit: _jinEdit.default },

  methods: {
    // 获取文章信息
    getDetail: function getDetail(res) {var _this = this;
      // 文章内容
      this.updatetime = this.$util.format(res.data.archivesInfo.updatetime, 1, "/", ":"); //上传时间
      this.title = res.data.archivesInfo.title; //标题
      this.dislikes = res.data.archivesInfo.collect; //收藏量
      this.views = res.data.archivesInfo.views; //浏览量
      if (res.data.archivesInfo.tags && res.data.archivesInfo.tags.length !== 0) {
        res.data.archivesInfo.tags = res.data.archivesInfo.tags.split(","); //文章标签截取
      } else {
        res.data.archivesInfo.tags = [];
      }
      this.collect = res.data.collect; //是否收藏
      this.tags = res.data.archivesInfo.tags; //文章标签
      this.name = res.data.channelInfo.name; //一级分类
      this.article = res.data.archivesInfo.content; //文章内容 
      this.mpUrl = res.data.archivesInfo.mp_url; //音频
      // 音频播放器，初始化
      this.nowAudio = uni.createInnerAudioContext();
      this.nowAudio.src = this.mpUrl;
      this.channel_collect = res.data.channel_collect; //是否关注专栏
      this.channel_info = res.data.channel_info; //专栏信息
      // 获得音频长度
      this.nowAudio.onCanplay(function (res) {
        _this.nowDuration = _this.nowAudio.duration;
        setTimeout(function () {
          _this.nowDuration = _this.nowAudio.duration;
        }, 1000);
        console.log(_this.nowDuration);
      });
    },
    // 播放音频
    audioPlay: function audioPlay() {var _this2 = this;
      if (!this.nowIsPlay) {
        this.nowIsPlay = true;
        this.nowAudio.onTimeUpdate(function (res) {//倒计时
          _this2.nowDuration = _this2.nowAudio.duration - _this2.nowAudio.currentTime;
        });
        this.nowAudio.play(); //开始播放
        this.nowAudio.onEnded(function (res) {
          _this2.nowIsPlay = false;
        });
      } else {
        this.nowAudio.pause();
        this.nowIsPlay = false;
      }
    },
    // 关注或取消关注专栏0关注，1取消关注
    changeFollow: function changeFollow() {var _this3 = this;
      (0, _index.userChannelCollert)({ channel_id: this.channel_info.id, type: this.channel_collect == '1' ? '0' : '1' }).then(function (res) {
        _this3.channel_collect = _this3.channel_collect == '1' ? '0' : '1',
        console.log(_this3.channel_collect);
      });
    },
    // 收藏或取消收藏文章
    getCollect: function getCollect() {var _this4 = this;
      //collect为0则为收藏点击收藏，1为已收藏点击取消收藏
      (0, _index.myCollect)({ aid: this.id, type: this.collect == 0 ? 1 : 0 }).then(function (res) {
        (0, _index.archivesDetail)({ id: _this4.id }).then(function (res) {
          _this4.getDetail(res);
        });
      });
    },
    // 跳转专栏
    toSpecialColumn: function toSpecialColumn() {
      uni.navigateTo({
        url: "/pages/problem/special_column/special_column?id=" + this.channel_info.id });

    } },

  onLoad: function onLoad(options) {var _this5 = this;
    // 获取文章详情
    this.id = options.id;
    (0, _index.archivesDetail)({ id: options.id }).then(function (res) {
      _this5.getDetail(res);
    });
    // 获取相关推荐
    (0, _live_broadcast.detailRem)({ id: this.id }).then(function (res) {
      _this5.fiveList = res.data;
    });
  },
  onHide: function onHide() {
    this.nowAudio.destroy(); //销毁
  },
  onUnload: function onUnload() {
    this.nowAudio.destroy(); //销毁
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/route.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 248:
/*!****************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/problem/put_success/put_success.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {};

  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  components: {},


  methods: {
    // 发布成功，跳转发现页面
    toFind: function toFind() {
      uni.switchTab({
        url: "/pages/index/find/find" });

    } },

  onLoad: function onLoad(options) {
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 25:
/*!*************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 26:
/*!***********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 27:
/*!****************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 271:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/personal_center/my_question/my_question.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _my = __webpack_require__(/*! ../../../api/my.js */ 206);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      page: 1, //请求页数
      lock: "true", //是否可以请求
      list: {}, //列表数据
      status: 'loadmore', //加载更多
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了' } };


  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight']), {
    newList: function newList() {
      return this.list;
    } }),

  methods: {
    // 获取数据
    getList: function getList() {var _this = this;
      if (this.lock == "true") {
        // 获取用户提问列表
        (0, _my.myQuestion)({ page: this.page }).then(function (res) {
          _this.changeList(res.data);
        });
      } else {
        this.$util.tips({ title: "暂无更多数据" });
      }
    },
    // 处理数据并赋值
    changeList: function changeList(data) {var _this2 = this;
      this.lock = data.pagenext; //后方是否还有数据
      this.status = this.lock == 'false' ? 'nomore' : 'loadmore'; //判断后面是否还有数据
      delete data.pagenext;
      for (var key in data) {
        data[key].forEach(function (item) {
          if (item.image.indexOf(",") == -1) {
            item.image = item.image;
          } else {
            item.image = item.image.split(",")[0];
          }

          item.updatetime = _this2.$util.format(item.updatetime, 3, "/");
        });
      }
      // this.list=data//收藏的数据列表
      for (var _key in data) {
        if (this.list.hasOwnProperty(_key) == true) {
          this.list[_key] = this.list[_key].concat(data[_key]);
        } else {
          this.list = _objectSpread({}, this.list, _defineProperty({}, _key, data[_key]));
        }
      }
    },
    // 上拉加载更多
    onReachBottom: function onReachBottom() {
      this.page = this.page + 1;
      this.getList();
    },
    toDetail: function toDetail(item, index) {
      uni.navigateTo({
        url: "/pages/problem/question_and_answer/question_and_answer?id=" + item[index].id + "&channel_id=" + item[index].category_id });

    } },

  onLoad: function onLoad(options) {
    // 获取用户收藏列表
    this.getList();
  },
  onShow: function onShow() {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 28:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/guid.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 29:
/*!********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/color.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/type2icon.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 31:
/*!**************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/randomArray.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/addUnit.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 33:
/*!*********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/random.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 34:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/trim.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 35:
/*!********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/toast.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 358:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/util/province.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{ "label": "北京市", "value": "11" }, { "label": "天津市", "value": "12" }, { "label": "河北省", "value": "13" }, { "label": "山西省", "value": "14" }, { "label": "内蒙古自治区", "value": "15" }, { "label": "辽宁省", "value": "21" }, { "label": "吉林省", "value": "22" }, { "label": "黑龙江省", "value": "23" }, { "label": "上海市", "value": "31" }, { "label": "江苏省", "value": "32" }, { "label": "浙江省", "value": "33" }, { "label": "安徽省", "value": "34" }, { "label": "福建省", "value": "35" }, { "label": "江西省", "value": "36" }, { "label": "山东省", "value": "37" }, { "label": "河南省", "value": "41" }, { "label": "湖北省", "value": "42" }, { "label": "湖南省", "value": "43" }, { "label": "广东省", "value": "44" }, { "label": "广西壮族自治区", "value": "45" }, { "label": "海南省", "value": "46" }, { "label": "重庆市", "value": "50" }, { "label": "四川省", "value": "51" }, { "label": "贵州省", "value": "52" }, { "label": "云南省", "value": "53" }, { "label": "西藏自治区", "value": "54" }, { "label": "陕西省", "value": "61" }, { "label": "甘肃省", "value": "62" }, { "label": "青海省", "value": "63" }, { "label": "宁夏回族自治区", "value": "64" }, { "label": "新疆维吾尔自治区", "value": "65" }, { "label": "台湾", "value": "66" }, { "label": "香港", "value": "67" }, { "label": "澳门", "value": "68" }];var _default = provinceData;exports.default = _default;

/***/ }),

/***/ 359:
/*!***************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/util/city.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "市辖区", "value": "1101" }], [{ "label": "市辖区", "value": "1201" }], [{ "label": "石家庄市", "value": "1301" }, { "label": "唐山市", "value": "1302" }, { "label": "秦皇岛市", "value": "1303" }, { "label": "邯郸市", "value": "1304" }, { "label": "邢台市", "value": "1305" }, { "label": "保定市", "value": "1306" }, { "label": "张家口市", "value": "1307" }, { "label": "承德市", "value": "1308" }, { "label": "沧州市", "value": "1309" }, { "label": "廊坊市", "value": "1310" }, { "label": "衡水市", "value": "1311" }], [{ "label": "太原市", "value": "1401" }, { "label": "大同市", "value": "1402" }, { "label": "阳泉市", "value": "1403" }, { "label": "长治市", "value": "1404" }, { "label": "晋城市", "value": "1405" }, { "label": "朔州市", "value": "1406" }, { "label": "晋中市", "value": "1407" }, { "label": "运城市", "value": "1408" }, { "label": "忻州市", "value": "1409" }, { "label": "临汾市", "value": "1410" }, { "label": "吕梁市", "value": "1411" }], [{ "label": "呼和浩特市", "value": "1501" }, { "label": "包头市", "value": "1502" }, { "label": "乌海市", "value": "1503" }, { "label": "赤峰市", "value": "1504" }, { "label": "通辽市", "value": "1505" }, { "label": "鄂尔多斯市", "value": "1506" }, { "label": "呼伦贝尔市", "value": "1507" }, { "label": "巴彦淖尔市", "value": "1508" }, { "label": "乌兰察布市", "value": "1509" }, { "label": "兴安盟", "value": "1522" }, { "label": "锡林郭勒盟", "value": "1525" }, { "label": "阿拉善盟", "value": "1529" }], [{ "label": "沈阳市", "value": "2101" }, { "label": "大连市", "value": "2102" }, { "label": "鞍山市", "value": "2103" }, { "label": "抚顺市", "value": "2104" }, { "label": "本溪市", "value": "2105" }, { "label": "丹东市", "value": "2106" }, { "label": "锦州市", "value": "2107" }, { "label": "营口市", "value": "2108" }, { "label": "阜新市", "value": "2109" }, { "label": "辽阳市", "value": "2110" }, { "label": "盘锦市", "value": "2111" }, { "label": "铁岭市", "value": "2112" }, { "label": "朝阳市", "value": "2113" }, { "label": "葫芦岛市", "value": "2114" }], [{ "label": "长春市", "value": "2201" }, { "label": "吉林市", "value": "2202" }, { "label": "四平市", "value": "2203" }, { "label": "辽源市", "value": "2204" }, { "label": "通化市", "value": "2205" }, { "label": "白山市", "value": "2206" }, { "label": "松原市", "value": "2207" }, { "label": "白城市", "value": "2208" }, { "label": "延边朝鲜族自治州", "value": "2224" }], [{ "label": "哈尔滨市", "value": "2301" }, { "label": "齐齐哈尔市", "value": "2302" }, { "label": "鸡西市", "value": "2303" }, { "label": "鹤岗市", "value": "2304" }, { "label": "双鸭山市", "value": "2305" }, { "label": "大庆市", "value": "2306" }, { "label": "伊春市", "value": "2307" }, { "label": "佳木斯市", "value": "2308" }, { "label": "七台河市", "value": "2309" }, { "label": "牡丹江市", "value": "2310" }, { "label": "黑河市", "value": "2311" }, { "label": "绥化市", "value": "2312" }, { "label": "大兴安岭地区", "value": "2327" }], [{ "label": "市辖区", "value": "3101" }], [{ "label": "南京市", "value": "3201" }, { "label": "无锡市", "value": "3202" }, { "label": "徐州市", "value": "3203" }, { "label": "常州市", "value": "3204" }, { "label": "苏州市", "value": "3205" }, { "label": "南通市", "value": "3206" }, { "label": "连云港市", "value": "3207" }, { "label": "淮安市", "value": "3208" }, { "label": "盐城市", "value": "3209" }, { "label": "扬州市", "value": "3210" }, { "label": "镇江市", "value": "3211" }, { "label": "泰州市", "value": "3212" }, { "label": "宿迁市", "value": "3213" }], [{ "label": "杭州市", "value": "3301" }, { "label": "宁波市", "value": "3302" }, { "label": "温州市", "value": "3303" }, { "label": "嘉兴市", "value": "3304" }, { "label": "湖州市", "value": "3305" }, { "label": "绍兴市", "value": "3306" }, { "label": "金华市", "value": "3307" }, { "label": "衢州市", "value": "3308" }, { "label": "舟山市", "value": "3309" }, { "label": "台州市", "value": "3310" }, { "label": "丽水市", "value": "3311" }], [{ "label": "合肥市", "value": "3401" }, { "label": "芜湖市", "value": "3402" }, { "label": "蚌埠市", "value": "3403" }, { "label": "淮南市", "value": "3404" }, { "label": "马鞍山市", "value": "3405" }, { "label": "淮北市", "value": "3406" }, { "label": "铜陵市", "value": "3407" }, { "label": "安庆市", "value": "3408" }, { "label": "黄山市", "value": "3410" }, { "label": "滁州市", "value": "3411" }, { "label": "阜阳市", "value": "3412" }, { "label": "宿州市", "value": "3413" }, { "label": "六安市", "value": "3415" }, { "label": "亳州市", "value": "3416" }, { "label": "池州市", "value": "3417" }, { "label": "宣城市", "value": "3418" }], [{ "label": "福州市", "value": "3501" }, { "label": "厦门市", "value": "3502" }, { "label": "莆田市", "value": "3503" }, { "label": "三明市", "value": "3504" }, { "label": "泉州市", "value": "3505" }, { "label": "漳州市", "value": "3506" }, { "label": "南平市", "value": "3507" }, { "label": "龙岩市", "value": "3508" }, { "label": "宁德市", "value": "3509" }], [{ "label": "南昌市", "value": "3601" }, { "label": "景德镇市", "value": "3602" }, { "label": "萍乡市", "value": "3603" }, { "label": "九江市", "value": "3604" }, { "label": "新余市", "value": "3605" }, { "label": "鹰潭市", "value": "3606" }, { "label": "赣州市", "value": "3607" }, { "label": "吉安市", "value": "3608" }, { "label": "宜春市", "value": "3609" }, { "label": "抚州市", "value": "3610" }, { "label": "上饶市", "value": "3611" }], [{ "label": "济南市", "value": "3701" }, { "label": "青岛市", "value": "3702" }, { "label": "淄博市", "value": "3703" }, { "label": "枣庄市", "value": "3704" }, { "label": "东营市", "value": "3705" }, { "label": "烟台市", "value": "3706" }, { "label": "潍坊市", "value": "3707" }, { "label": "济宁市", "value": "3708" }, { "label": "泰安市", "value": "3709" }, { "label": "威海市", "value": "3710" }, { "label": "日照市", "value": "3711" }, { "label": "莱芜市", "value": "3712" }, { "label": "临沂市", "value": "3713" }, { "label": "德州市", "value": "3714" }, { "label": "聊城市", "value": "3715" }, { "label": "滨州市", "value": "3716" }, { "label": "菏泽市", "value": "3717" }], [{ "label": "郑州市", "value": "4101" }, { "label": "开封市", "value": "4102" }, { "label": "洛阳市", "value": "4103" }, { "label": "平顶山市", "value": "4104" }, { "label": "安阳市", "value": "4105" }, { "label": "鹤壁市", "value": "4106" }, { "label": "新乡市", "value": "4107" }, { "label": "焦作市", "value": "4108" }, { "label": "濮阳市", "value": "4109" }, { "label": "许昌市", "value": "4110" }, { "label": "漯河市", "value": "4111" }, { "label": "三门峡市", "value": "4112" }, { "label": "南阳市", "value": "4113" }, { "label": "商丘市", "value": "4114" }, { "label": "信阳市", "value": "4115" }, { "label": "周口市", "value": "4116" }, { "label": "驻马店市", "value": "4117" }, { "label": "省直辖县级行政区划", "value": "4190" }], [{ "label": "武汉市", "value": "4201" }, { "label": "黄石市", "value": "4202" }, { "label": "十堰市", "value": "4203" }, { "label": "宜昌市", "value": "4205" }, { "label": "襄阳市", "value": "4206" }, { "label": "鄂州市", "value": "4207" }, { "label": "荆门市", "value": "4208" }, { "label": "孝感市", "value": "4209" }, { "label": "荆州市", "value": "4210" }, { "label": "黄冈市", "value": "4211" }, { "label": "咸宁市", "value": "4212" }, { "label": "随州市", "value": "4213" }, { "label": "恩施土家族苗族自治州", "value": "4228" }, { "label": "省直辖县级行政区划", "value": "4290" }], [{ "label": "长沙市", "value": "4301" }, { "label": "株洲市", "value": "4302" }, { "label": "湘潭市", "value": "4303" }, { "label": "衡阳市", "value": "4304" }, { "label": "邵阳市", "value": "4305" }, { "label": "岳阳市", "value": "4306" }, { "label": "常德市", "value": "4307" }, { "label": "张家界市", "value": "4308" }, { "label": "益阳市", "value": "4309" }, { "label": "郴州市", "value": "4310" }, { "label": "永州市", "value": "4311" }, { "label": "怀化市", "value": "4312" }, { "label": "娄底市", "value": "4313" }, { "label": "湘西土家族苗族自治州", "value": "4331" }], [{ "label": "广州市", "value": "4401" }, { "label": "韶关市", "value": "4402" }, { "label": "深圳市", "value": "4403" }, { "label": "珠海市", "value": "4404" }, { "label": "汕头市", "value": "4405" }, { "label": "佛山市", "value": "4406" }, { "label": "江门市", "value": "4407" }, { "label": "湛江市", "value": "4408" }, { "label": "茂名市", "value": "4409" }, { "label": "肇庆市", "value": "4412" }, { "label": "惠州市", "value": "4413" }, { "label": "梅州市", "value": "4414" }, { "label": "汕尾市", "value": "4415" }, { "label": "河源市", "value": "4416" }, { "label": "阳江市", "value": "4417" }, { "label": "清远市", "value": "4418" }, { "label": "东莞市", "value": "4419" }, { "label": "中山市", "value": "4420" }, { "label": "潮州市", "value": "4451" }, { "label": "揭阳市", "value": "4452" }, { "label": "云浮市", "value": "4453" }], [{ "label": "南宁市", "value": "4501" }, { "label": "柳州市", "value": "4502" }, { "label": "桂林市", "value": "4503" }, { "label": "梧州市", "value": "4504" }, { "label": "北海市", "value": "4505" }, { "label": "防城港市", "value": "4506" }, { "label": "钦州市", "value": "4507" }, { "label": "贵港市", "value": "4508" }, { "label": "玉林市", "value": "4509" }, { "label": "百色市", "value": "4510" }, { "label": "贺州市", "value": "4511" }, { "label": "河池市", "value": "4512" }, { "label": "来宾市", "value": "4513" }, { "label": "崇左市", "value": "4514" }], [{ "label": "海口市", "value": "4601" }, { "label": "三亚市", "value": "4602" }, { "label": "三沙市", "value": "4603" }, { "label": "儋州市", "value": "4604" }, { "label": "省直辖县级行政区划", "value": "4690" }], [{ "label": "市辖区", "value": "5001" }, { "label": "县", "value": "5002" }], [{ "label": "成都市", "value": "5101" }, { "label": "自贡市", "value": "5103" }, { "label": "攀枝花市", "value": "5104" }, { "label": "泸州市", "value": "5105" }, { "label": "德阳市", "value": "5106" }, { "label": "绵阳市", "value": "5107" }, { "label": "广元市", "value": "5108" }, { "label": "遂宁市", "value": "5109" }, { "label": "内江市", "value": "5110" }, { "label": "乐山市", "value": "5111" }, { "label": "南充市", "value": "5113" }, { "label": "眉山市", "value": "5114" }, { "label": "宜宾市", "value": "5115" }, { "label": "广安市", "value": "5116" }, { "label": "达州市", "value": "5117" }, { "label": "雅安市", "value": "5118" }, { "label": "巴中市", "value": "5119" }, { "label": "资阳市", "value": "5120" }, { "label": "阿坝藏族羌族自治州", "value": "5132" }, { "label": "甘孜藏族自治州", "value": "5133" }, { "label": "凉山彝族自治州", "value": "5134" }], [{ "label": "贵阳市", "value": "5201" }, { "label": "六盘水市", "value": "5202" }, { "label": "遵义市", "value": "5203" }, { "label": "安顺市", "value": "5204" }, { "label": "毕节市", "value": "5205" }, { "label": "铜仁市", "value": "5206" }, { "label": "黔西南布依族苗族自治州", "value": "5223" }, { "label": "黔东南苗族侗族自治州", "value": "5226" }, { "label": "黔南布依族苗族自治州", "value": "5227" }], [{ "label": "昆明市", "value": "5301" }, { "label": "曲靖市", "value": "5303" }, { "label": "玉溪市", "value": "5304" }, { "label": "保山市", "value": "5305" }, { "label": "昭通市", "value": "5306" }, { "label": "丽江市", "value": "5307" }, { "label": "普洱市", "value": "5308" }, { "label": "临沧市", "value": "5309" }, { "label": "楚雄彝族自治州", "value": "5323" }, { "label": "红河哈尼族彝族自治州", "value": "5325" }, { "label": "文山壮族苗族自治州", "value": "5326" }, { "label": "西双版纳傣族自治州", "value": "5328" }, { "label": "大理白族自治州", "value": "5329" }, { "label": "德宏傣族景颇族自治州", "value": "5331" }, { "label": "怒江傈僳族自治州", "value": "5333" }, { "label": "迪庆藏族自治州", "value": "5334" }], [{ "label": "拉萨市", "value": "5401" }, { "label": "日喀则市", "value": "5402" }, { "label": "昌都市", "value": "5403" }, { "label": "林芝市", "value": "5404" }, { "label": "山南市", "value": "5405" }, { "label": "那曲地区", "value": "5424" }, { "label": "阿里地区", "value": "5425" }], [{ "label": "西安市", "value": "6101" }, { "label": "铜川市", "value": "6102" }, { "label": "宝鸡市", "value": "6103" }, { "label": "咸阳市", "value": "6104" }, { "label": "渭南市", "value": "6105" }, { "label": "延安市", "value": "6106" }, { "label": "汉中市", "value": "6107" }, { "label": "榆林市", "value": "6108" }, { "label": "安康市", "value": "6109" }, { "label": "商洛市", "value": "6110" }], [{ "label": "兰州市", "value": "6201" }, { "label": "嘉峪关市", "value": "6202" }, { "label": "金昌市", "value": "6203" }, { "label": "白银市", "value": "6204" }, { "label": "天水市", "value": "6205" }, { "label": "武威市", "value": "6206" }, { "label": "张掖市", "value": "6207" }, { "label": "平凉市", "value": "6208" }, { "label": "酒泉市", "value": "6209" }, { "label": "庆阳市", "value": "6210" }, { "label": "定西市", "value": "6211" }, { "label": "陇南市", "value": "6212" }, { "label": "临夏回族自治州", "value": "6229" }, { "label": "甘南藏族自治州", "value": "6230" }], [{ "label": "西宁市", "value": "6301" }, { "label": "海东市", "value": "6302" }, { "label": "海北藏族自治州", "value": "6322" }, { "label": "黄南藏族自治州", "value": "6323" }, { "label": "海南藏族自治州", "value": "6325" }, { "label": "果洛藏族自治州", "value": "6326" }, { "label": "玉树藏族自治州", "value": "6327" }, { "label": "海西蒙古族藏族自治州", "value": "6328" }], [{ "label": "银川市", "value": "6401" }, { "label": "石嘴山市", "value": "6402" }, { "label": "吴忠市", "value": "6403" }, { "label": "固原市", "value": "6404" }, { "label": "中卫市", "value": "6405" }], [{ "label": "乌鲁木齐市", "value": "6501" }, { "label": "克拉玛依市", "value": "6502" }, { "label": "吐鲁番市", "value": "6504" }, { "label": "哈密市", "value": "6505" }, { "label": "昌吉回族自治州", "value": "6523" }, { "label": "博尔塔拉蒙古自治州", "value": "6527" }, { "label": "巴音郭楞蒙古自治州", "value": "6528" }, { "label": "阿克苏地区", "value": "6529" }, { "label": "克孜勒苏柯尔克孜自治州", "value": "6530" }, { "label": "喀什地区", "value": "6531" }, { "label": "和田地区", "value": "6532" }, { "label": "伊犁哈萨克自治州", "value": "6540" }, { "label": "塔城地区", "value": "6542" }, { "label": "阿勒泰地区", "value": "6543" }, { "label": "自治区直辖县级行政区划", "value": "6590" }], [{ "label": "台北", "value": "6601" }, { "label": "高雄", "value": "6602" }, { "label": "基隆", "value": "6603" }, { "label": "台中", "value": "6604" }, { "label": "台南", "value": "6605" }, { "label": "新竹", "value": "6606" }, { "label": "嘉义", "value": "6607" }, { "label": "宜兰", "value": "6608" }, { "label": "桃园", "value": "6609" }, { "label": "苗栗", "value": "6610" }, { "label": "彰化", "value": "6611" }, { "label": "南投", "value": "6612" }, { "label": "云林", "value": "6613" }, { "label": "屏东", "value": "6614" }, { "label": "台东", "value": "6615" }, { "label": "花莲", "value": "6616" }, { "label": "澎湖", "value": "6617" }], [{ "label": "香港岛", "value": "6701" }, { "label": "九龙", "value": "6702" }, { "label": "新界", "value": "6703" }], [{ "label": "澳门半岛", "value": "6801" }, { "label": "氹仔岛", "value": "6802" }, { "label": "路环岛", "value": "6803" }, { "label": "路氹城", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 36:
/*!************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/getParent.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 360:
/*!***************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/util/area.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "东城区", "value": "110101" }, { "label": "西城区", "value": "110102" }, { "label": "朝阳区", "value": "110105" }, { "label": "丰台区", "value": "110106" }, { "label": "石景山区", "value": "110107" }, { "label": "海淀区", "value": "110108" }, { "label": "门头沟区", "value": "110109" }, { "label": "房山区", "value": "110111" }, { "label": "通州区", "value": "110112" }, { "label": "顺义区", "value": "110113" }, { "label": "昌平区", "value": "110114" }, { "label": "大兴区", "value": "110115" }, { "label": "怀柔区", "value": "110116" }, { "label": "平谷区", "value": "110117" }, { "label": "密云区", "value": "110118" }, { "label": "延庆区", "value": "110119" }]], [[{ "label": "和平区", "value": "120101" }, { "label": "河东区", "value": "120102" }, { "label": "河西区", "value": "120103" }, { "label": "南开区", "value": "120104" }, { "label": "河北区", "value": "120105" }, { "label": "红桥区", "value": "120106" }, { "label": "东丽区", "value": "120110" }, { "label": "西青区", "value": "120111" }, { "label": "津南区", "value": "120112" }, { "label": "北辰区", "value": "120113" }, { "label": "武清区", "value": "120114" }, { "label": "宝坻区", "value": "120115" }, { "label": "滨海新区", "value": "120116" }, { "label": "宁河区", "value": "120117" }, { "label": "静海区", "value": "120118" }, { "label": "蓟州区", "value": "120119" }]], [[{ "label": "长安区", "value": "130102" }, { "label": "桥西区", "value": "130104" }, { "label": "新华区", "value": "130105" }, { "label": "井陉矿区", "value": "130107" }, { "label": "裕华区", "value": "130108" }, { "label": "藁城区", "value": "130109" }, { "label": "鹿泉区", "value": "130110" }, { "label": "栾城区", "value": "130111" }, { "label": "井陉县", "value": "130121" }, { "label": "正定县", "value": "130123" }, { "label": "行唐县", "value": "130125" }, { "label": "灵寿县", "value": "130126" }, { "label": "高邑县", "value": "130127" }, { "label": "深泽县", "value": "130128" }, { "label": "赞皇县", "value": "130129" }, { "label": "无极县", "value": "130130" }, { "label": "平山县", "value": "130131" }, { "label": "元氏县", "value": "130132" }, { "label": "赵县", "value": "130133" }, { "label": "石家庄高新技术产业开发区", "value": "130171" }, { "label": "石家庄循环化工园区", "value": "130172" }, { "label": "辛集市", "value": "130181" }, { "label": "晋州市", "value": "130183" }, { "label": "新乐市", "value": "130184" }], [{ "label": "路南区", "value": "130202" }, { "label": "路北区", "value": "130203" }, { "label": "古冶区", "value": "130204" }, { "label": "开平区", "value": "130205" }, { "label": "丰南区", "value": "130207" }, { "label": "丰润区", "value": "130208" }, { "label": "曹妃甸区", "value": "130209" }, { "label": "滦县", "value": "130223" }, { "label": "滦南县", "value": "130224" }, { "label": "乐亭县", "value": "130225" }, { "label": "迁西县", "value": "130227" }, { "label": "玉田县", "value": "130229" }, { "label": "唐山市芦台经济技术开发区", "value": "130271" }, { "label": "唐山市汉沽管理区", "value": "130272" }, { "label": "唐山高新技术产业开发区", "value": "130273" }, { "label": "河北唐山海港经济开发区", "value": "130274" }, { "label": "遵化市", "value": "130281" }, { "label": "迁安市", "value": "130283" }], [{ "label": "海港区", "value": "130302" }, { "label": "山海关区", "value": "130303" }, { "label": "北戴河区", "value": "130304" }, { "label": "抚宁区", "value": "130306" }, { "label": "青龙满族自治县", "value": "130321" }, { "label": "昌黎县", "value": "130322" }, { "label": "卢龙县", "value": "130324" }, { "label": "秦皇岛市经济技术开发区", "value": "130371" }, { "label": "北戴河新区", "value": "130372" }], [{ "label": "邯山区", "value": "130402" }, { "label": "丛台区", "value": "130403" }, { "label": "复兴区", "value": "130404" }, { "label": "峰峰矿区", "value": "130406" }, { "label": "肥乡区", "value": "130407" }, { "label": "永年区", "value": "130408" }, { "label": "临漳县", "value": "130423" }, { "label": "成安县", "value": "130424" }, { "label": "大名县", "value": "130425" }, { "label": "涉县", "value": "130426" }, { "label": "磁县", "value": "130427" }, { "label": "邱县", "value": "130430" }, { "label": "鸡泽县", "value": "130431" }, { "label": "广平县", "value": "130432" }, { "label": "馆陶县", "value": "130433" }, { "label": "魏县", "value": "130434" }, { "label": "曲周县", "value": "130435" }, { "label": "邯郸经济技术开发区", "value": "130471" }, { "label": "邯郸冀南新区", "value": "130473" }, { "label": "武安市", "value": "130481" }], [{ "label": "桥东区", "value": "130502" }, { "label": "桥西区", "value": "130503" }, { "label": "邢台县", "value": "130521" }, { "label": "临城县", "value": "130522" }, { "label": "内丘县", "value": "130523" }, { "label": "柏乡县", "value": "130524" }, { "label": "隆尧县", "value": "130525" }, { "label": "任县", "value": "130526" }, { "label": "南和县", "value": "130527" }, { "label": "宁晋县", "value": "130528" }, { "label": "巨鹿县", "value": "130529" }, { "label": "新河县", "value": "130530" }, { "label": "广宗县", "value": "130531" }, { "label": "平乡县", "value": "130532" }, { "label": "威县", "value": "130533" }, { "label": "清河县", "value": "130534" }, { "label": "临西县", "value": "130535" }, { "label": "河北邢台经济开发区", "value": "130571" }, { "label": "南宫市", "value": "130581" }, { "label": "沙河市", "value": "130582" }], [{ "label": "竞秀区", "value": "130602" }, { "label": "莲池区", "value": "130606" }, { "label": "满城区", "value": "130607" }, { "label": "清苑区", "value": "130608" }, { "label": "徐水区", "value": "130609" }, { "label": "涞水县", "value": "130623" }, { "label": "阜平县", "value": "130624" }, { "label": "定兴县", "value": "130626" }, { "label": "唐县", "value": "130627" }, { "label": "高阳县", "value": "130628" }, { "label": "容城县", "value": "130629" }, { "label": "涞源县", "value": "130630" }, { "label": "望都县", "value": "130631" }, { "label": "安新县", "value": "130632" }, { "label": "易县", "value": "130633" }, { "label": "曲阳县", "value": "130634" }, { "label": "蠡县", "value": "130635" }, { "label": "顺平县", "value": "130636" }, { "label": "博野县", "value": "130637" }, { "label": "雄县", "value": "130638" }, { "label": "保定高新技术产业开发区", "value": "130671" }, { "label": "保定白沟新城", "value": "130672" }, { "label": "涿州市", "value": "130681" }, { "label": "定州市", "value": "130682" }, { "label": "安国市", "value": "130683" }, { "label": "高碑店市", "value": "130684" }], [{ "label": "桥东区", "value": "130702" }, { "label": "桥西区", "value": "130703" }, { "label": "宣化区", "value": "130705" }, { "label": "下花园区", "value": "130706" }, { "label": "万全区", "value": "130708" }, { "label": "崇礼区", "value": "130709" }, { "label": "张北县", "value": "130722" }, { "label": "康保县", "value": "130723" }, { "label": "沽源县", "value": "130724" }, { "label": "尚义县", "value": "130725" }, { "label": "蔚县", "value": "130726" }, { "label": "阳原县", "value": "130727" }, { "label": "怀安县", "value": "130728" }, { "label": "怀来县", "value": "130730" }, { "label": "涿鹿县", "value": "130731" }, { "label": "赤城县", "value": "130732" }, { "label": "张家口市高新技术产业开发区", "value": "130771" }, { "label": "张家口市察北管理区", "value": "130772" }, { "label": "张家口市塞北管理区", "value": "130773" }], [{ "label": "双桥区", "value": "130802" }, { "label": "双滦区", "value": "130803" }, { "label": "鹰手营子矿区", "value": "130804" }, { "label": "承德县", "value": "130821" }, { "label": "兴隆县", "value": "130822" }, { "label": "滦平县", "value": "130824" }, { "label": "隆化县", "value": "130825" }, { "label": "丰宁满族自治县", "value": "130826" }, { "label": "宽城满族自治县", "value": "130827" }, { "label": "围场满族蒙古族自治县", "value": "130828" }, { "label": "承德高新技术产业开发区", "value": "130871" }, { "label": "平泉市", "value": "130881" }], [{ "label": "新华区", "value": "130902" }, { "label": "运河区", "value": "130903" }, { "label": "沧县", "value": "130921" }, { "label": "青县", "value": "130922" }, { "label": "东光县", "value": "130923" }, { "label": "海兴县", "value": "130924" }, { "label": "盐山县", "value": "130925" }, { "label": "肃宁县", "value": "130926" }, { "label": "南皮县", "value": "130927" }, { "label": "吴桥县", "value": "130928" }, { "label": "献县", "value": "130929" }, { "label": "孟村回族自治县", "value": "130930" }, { "label": "河北沧州经济开发区", "value": "130971" }, { "label": "沧州高新技术产业开发区", "value": "130972" }, { "label": "沧州渤海新区", "value": "130973" }, { "label": "泊头市", "value": "130981" }, { "label": "任丘市", "value": "130982" }, { "label": "黄骅市", "value": "130983" }, { "label": "河间市", "value": "130984" }], [{ "label": "安次区", "value": "131002" }, { "label": "广阳区", "value": "131003" }, { "label": "固安县", "value": "131022" }, { "label": "永清县", "value": "131023" }, { "label": "香河县", "value": "131024" }, { "label": "大城县", "value": "131025" }, { "label": "文安县", "value": "131026" }, { "label": "大厂回族自治县", "value": "131028" }, { "label": "廊坊经济技术开发区", "value": "131071" }, { "label": "霸州市", "value": "131081" }, { "label": "三河市", "value": "131082" }], [{ "label": "桃城区", "value": "131102" }, { "label": "冀州区", "value": "131103" }, { "label": "枣强县", "value": "131121" }, { "label": "武邑县", "value": "131122" }, { "label": "武强县", "value": "131123" }, { "label": "饶阳县", "value": "131124" }, { "label": "安平县", "value": "131125" }, { "label": "故城县", "value": "131126" }, { "label": "景县", "value": "131127" }, { "label": "阜城县", "value": "131128" }, { "label": "河北衡水经济开发区", "value": "131171" }, { "label": "衡水滨湖新区", "value": "131172" }, { "label": "深州市", "value": "131182" }]], [[{ "label": "小店区", "value": "140105" }, { "label": "迎泽区", "value": "140106" }, { "label": "杏花岭区", "value": "140107" }, { "label": "尖草坪区", "value": "140108" }, { "label": "万柏林区", "value": "140109" }, { "label": "晋源区", "value": "140110" }, { "label": "清徐县", "value": "140121" }, { "label": "阳曲县", "value": "140122" }, { "label": "娄烦县", "value": "140123" }, { "label": "山西转型综合改革示范区", "value": "140171" }, { "label": "古交市", "value": "140181" }], [{ "label": "城区", "value": "140202" }, { "label": "矿区", "value": "140203" }, { "label": "南郊区", "value": "140211" }, { "label": "新荣区", "value": "140212" }, { "label": "阳高县", "value": "140221" }, { "label": "天镇县", "value": "140222" }, { "label": "广灵县", "value": "140223" }, { "label": "灵丘县", "value": "140224" }, { "label": "浑源县", "value": "140225" }, { "label": "左云县", "value": "140226" }, { "label": "大同县", "value": "140227" }, { "label": "山西大同经济开发区", "value": "140271" }], [{ "label": "城区", "value": "140302" }, { "label": "矿区", "value": "140303" }, { "label": "郊区", "value": "140311" }, { "label": "平定县", "value": "140321" }, { "label": "盂县", "value": "140322" }, { "label": "山西阳泉经济开发区", "value": "140371" }], [{ "label": "城区", "value": "140402" }, { "label": "郊区", "value": "140411" }, { "label": "长治县", "value": "140421" }, { "label": "襄垣县", "value": "140423" }, { "label": "屯留县", "value": "140424" }, { "label": "平顺县", "value": "140425" }, { "label": "黎城县", "value": "140426" }, { "label": "壶关县", "value": "140427" }, { "label": "长子县", "value": "140428" }, { "label": "武乡县", "value": "140429" }, { "label": "沁县", "value": "140430" }, { "label": "沁源县", "value": "140431" }, { "label": "山西长治高新技术产业园区", "value": "140471" }, { "label": "潞城市", "value": "140481" }], [{ "label": "城区", "value": "140502" }, { "label": "沁水县", "value": "140521" }, { "label": "阳城县", "value": "140522" }, { "label": "陵川县", "value": "140524" }, { "label": "泽州县", "value": "140525" }, { "label": "高平市", "value": "140581" }], [{ "label": "朔城区", "value": "140602" }, { "label": "平鲁区", "value": "140603" }, { "label": "山阴县", "value": "140621" }, { "label": "应县", "value": "140622" }, { "label": "右玉县", "value": "140623" }, { "label": "怀仁县", "value": "140624" }, { "label": "山西朔州经济开发区", "value": "140671" }], [{ "label": "榆次区", "value": "140702" }, { "label": "榆社县", "value": "140721" }, { "label": "左权县", "value": "140722" }, { "label": "和顺县", "value": "140723" }, { "label": "昔阳县", "value": "140724" }, { "label": "寿阳县", "value": "140725" }, { "label": "太谷县", "value": "140726" }, { "label": "祁县", "value": "140727" }, { "label": "平遥县", "value": "140728" }, { "label": "灵石县", "value": "140729" }, { "label": "介休市", "value": "140781" }], [{ "label": "盐湖区", "value": "140802" }, { "label": "临猗县", "value": "140821" }, { "label": "万荣县", "value": "140822" }, { "label": "闻喜县", "value": "140823" }, { "label": "稷山县", "value": "140824" }, { "label": "新绛县", "value": "140825" }, { "label": "绛县", "value": "140826" }, { "label": "垣曲县", "value": "140827" }, { "label": "夏县", "value": "140828" }, { "label": "平陆县", "value": "140829" }, { "label": "芮城县", "value": "140830" }, { "label": "永济市", "value": "140881" }, { "label": "河津市", "value": "140882" }], [{ "label": "忻府区", "value": "140902" }, { "label": "定襄县", "value": "140921" }, { "label": "五台县", "value": "140922" }, { "label": "代县", "value": "140923" }, { "label": "繁峙县", "value": "140924" }, { "label": "宁武县", "value": "140925" }, { "label": "静乐县", "value": "140926" }, { "label": "神池县", "value": "140927" }, { "label": "五寨县", "value": "140928" }, { "label": "岢岚县", "value": "140929" }, { "label": "河曲县", "value": "140930" }, { "label": "保德县", "value": "140931" }, { "label": "偏关县", "value": "140932" }, { "label": "五台山风景名胜区", "value": "140971" }, { "label": "原平市", "value": "140981" }], [{ "label": "尧都区", "value": "141002" }, { "label": "曲沃县", "value": "141021" }, { "label": "翼城县", "value": "141022" }, { "label": "襄汾县", "value": "141023" }, { "label": "洪洞县", "value": "141024" }, { "label": "古县", "value": "141025" }, { "label": "安泽县", "value": "141026" }, { "label": "浮山县", "value": "141027" }, { "label": "吉县", "value": "141028" }, { "label": "乡宁县", "value": "141029" }, { "label": "大宁县", "value": "141030" }, { "label": "隰县", "value": "141031" }, { "label": "永和县", "value": "141032" }, { "label": "蒲县", "value": "141033" }, { "label": "汾西县", "value": "141034" }, { "label": "侯马市", "value": "141081" }, { "label": "霍州市", "value": "141082" }], [{ "label": "离石区", "value": "141102" }, { "label": "文水县", "value": "141121" }, { "label": "交城县", "value": "141122" }, { "label": "兴县", "value": "141123" }, { "label": "临县", "value": "141124" }, { "label": "柳林县", "value": "141125" }, { "label": "石楼县", "value": "141126" }, { "label": "岚县", "value": "141127" }, { "label": "方山县", "value": "141128" }, { "label": "中阳县", "value": "141129" }, { "label": "交口县", "value": "141130" }, { "label": "孝义市", "value": "141181" }, { "label": "汾阳市", "value": "141182" }]], [[{ "label": "新城区", "value": "150102" }, { "label": "回民区", "value": "150103" }, { "label": "玉泉区", "value": "150104" }, { "label": "赛罕区", "value": "150105" }, { "label": "土默特左旗", "value": "150121" }, { "label": "托克托县", "value": "150122" }, { "label": "和林格尔县", "value": "150123" }, { "label": "清水河县", "value": "150124" }, { "label": "武川县", "value": "150125" }, { "label": "呼和浩特金海工业园区", "value": "150171" }, { "label": "呼和浩特经济技术开发区", "value": "150172" }], [{ "label": "东河区", "value": "150202" }, { "label": "昆都仑区", "value": "150203" }, { "label": "青山区", "value": "150204" }, { "label": "石拐区", "value": "150205" }, { "label": "白云鄂博矿区", "value": "150206" }, { "label": "九原区", "value": "150207" }, { "label": "土默特右旗", "value": "150221" }, { "label": "固阳县", "value": "150222" }, { "label": "达尔罕茂明安联合旗", "value": "150223" }, { "label": "包头稀土高新技术产业开发区", "value": "150271" }], [{ "label": "海勃湾区", "value": "150302" }, { "label": "海南区", "value": "150303" }, { "label": "乌达区", "value": "150304" }], [{ "label": "红山区", "value": "150402" }, { "label": "元宝山区", "value": "150403" }, { "label": "松山区", "value": "150404" }, { "label": "阿鲁科尔沁旗", "value": "150421" }, { "label": "巴林左旗", "value": "150422" }, { "label": "巴林右旗", "value": "150423" }, { "label": "林西县", "value": "150424" }, { "label": "克什克腾旗", "value": "150425" }, { "label": "翁牛特旗", "value": "150426" }, { "label": "喀喇沁旗", "value": "150428" }, { "label": "宁城县", "value": "150429" }, { "label": "敖汉旗", "value": "150430" }], [{ "label": "科尔沁区", "value": "150502" }, { "label": "科尔沁左翼中旗", "value": "150521" }, { "label": "科尔沁左翼后旗", "value": "150522" }, { "label": "开鲁县", "value": "150523" }, { "label": "库伦旗", "value": "150524" }, { "label": "奈曼旗", "value": "150525" }, { "label": "扎鲁特旗", "value": "150526" }, { "label": "通辽经济技术开发区", "value": "150571" }, { "label": "霍林郭勒市", "value": "150581" }], [{ "label": "东胜区", "value": "150602" }, { "label": "康巴什区", "value": "150603" }, { "label": "达拉特旗", "value": "150621" }, { "label": "准格尔旗", "value": "150622" }, { "label": "鄂托克前旗", "value": "150623" }, { "label": "鄂托克旗", "value": "150624" }, { "label": "杭锦旗", "value": "150625" }, { "label": "乌审旗", "value": "150626" }, { "label": "伊金霍洛旗", "value": "150627" }], [{ "label": "海拉尔区", "value": "150702" }, { "label": "扎赉诺尔区", "value": "150703" }, { "label": "阿荣旗", "value": "150721" }, { "label": "莫力达瓦达斡尔族自治旗", "value": "150722" }, { "label": "鄂伦春自治旗", "value": "150723" }, { "label": "鄂温克族自治旗", "value": "150724" }, { "label": "陈巴尔虎旗", "value": "150725" }, { "label": "新巴尔虎左旗", "value": "150726" }, { "label": "新巴尔虎右旗", "value": "150727" }, { "label": "满洲里市", "value": "150781" }, { "label": "牙克石市", "value": "150782" }, { "label": "扎兰屯市", "value": "150783" }, { "label": "额尔古纳市", "value": "150784" }, { "label": "根河市", "value": "150785" }], [{ "label": "临河区", "value": "150802" }, { "label": "五原县", "value": "150821" }, { "label": "磴口县", "value": "150822" }, { "label": "乌拉特前旗", "value": "150823" }, { "label": "乌拉特中旗", "value": "150824" }, { "label": "乌拉特后旗", "value": "150825" }, { "label": "杭锦后旗", "value": "150826" }], [{ "label": "集宁区", "value": "150902" }, { "label": "卓资县", "value": "150921" }, { "label": "化德县", "value": "150922" }, { "label": "商都县", "value": "150923" }, { "label": "兴和县", "value": "150924" }, { "label": "凉城县", "value": "150925" }, { "label": "察哈尔右翼前旗", "value": "150926" }, { "label": "察哈尔右翼中旗", "value": "150927" }, { "label": "察哈尔右翼后旗", "value": "150928" }, { "label": "四子王旗", "value": "150929" }, { "label": "丰镇市", "value": "150981" }], [{ "label": "乌兰浩特市", "value": "152201" }, { "label": "阿尔山市", "value": "152202" }, { "label": "科尔沁右翼前旗", "value": "152221" }, { "label": "科尔沁右翼中旗", "value": "152222" }, { "label": "扎赉特旗", "value": "152223" }, { "label": "突泉县", "value": "152224" }], [{ "label": "二连浩特市", "value": "152501" }, { "label": "锡林浩特市", "value": "152502" }, { "label": "阿巴嘎旗", "value": "152522" }, { "label": "苏尼特左旗", "value": "152523" }, { "label": "苏尼特右旗", "value": "152524" }, { "label": "东乌珠穆沁旗", "value": "152525" }, { "label": "西乌珠穆沁旗", "value": "152526" }, { "label": "太仆寺旗", "value": "152527" }, { "label": "镶黄旗", "value": "152528" }, { "label": "正镶白旗", "value": "152529" }, { "label": "正蓝旗", "value": "152530" }, { "label": "多伦县", "value": "152531" }, { "label": "乌拉盖管委会", "value": "152571" }], [{ "label": "阿拉善左旗", "value": "152921" }, { "label": "阿拉善右旗", "value": "152922" }, { "label": "额济纳旗", "value": "152923" }, { "label": "内蒙古阿拉善经济开发区", "value": "152971" }]], [[{ "label": "和平区", "value": "210102" }, { "label": "沈河区", "value": "210103" }, { "label": "大东区", "value": "210104" }, { "label": "皇姑区", "value": "210105" }, { "label": "铁西区", "value": "210106" }, { "label": "苏家屯区", "value": "210111" }, { "label": "浑南区", "value": "210112" }, { "label": "沈北新区", "value": "210113" }, { "label": "于洪区", "value": "210114" }, { "label": "辽中区", "value": "210115" }, { "label": "康平县", "value": "210123" }, { "label": "法库县", "value": "210124" }, { "label": "新民市", "value": "210181" }], [{ "label": "中山区", "value": "210202" }, { "label": "西岗区", "value": "210203" }, { "label": "沙河口区", "value": "210204" }, { "label": "甘井子区", "value": "210211" }, { "label": "旅顺口区", "value": "210212" }, { "label": "金州区", "value": "210213" }, { "label": "普兰店区", "value": "210214" }, { "label": "长海县", "value": "210224" }, { "label": "瓦房店市", "value": "210281" }, { "label": "庄河市", "value": "210283" }], [{ "label": "铁东区", "value": "210302" }, { "label": "铁西区", "value": "210303" }, { "label": "立山区", "value": "210304" }, { "label": "千山区", "value": "210311" }, { "label": "台安县", "value": "210321" }, { "label": "岫岩满族自治县", "value": "210323" }, { "label": "海城市", "value": "210381" }], [{ "label": "新抚区", "value": "210402" }, { "label": "东洲区", "value": "210403" }, { "label": "望花区", "value": "210404" }, { "label": "顺城区", "value": "210411" }, { "label": "抚顺县", "value": "210421" }, { "label": "新宾满族自治县", "value": "210422" }, { "label": "清原满族自治县", "value": "210423" }], [{ "label": "平山区", "value": "210502" }, { "label": "溪湖区", "value": "210503" }, { "label": "明山区", "value": "210504" }, { "label": "南芬区", "value": "210505" }, { "label": "本溪满族自治县", "value": "210521" }, { "label": "桓仁满族自治县", "value": "210522" }], [{ "label": "元宝区", "value": "210602" }, { "label": "振兴区", "value": "210603" }, { "label": "振安区", "value": "210604" }, { "label": "宽甸满族自治县", "value": "210624" }, { "label": "东港市", "value": "210681" }, { "label": "凤城市", "value": "210682" }], [{ "label": "古塔区", "value": "210702" }, { "label": "凌河区", "value": "210703" }, { "label": "太和区", "value": "210711" }, { "label": "黑山县", "value": "210726" }, { "label": "义县", "value": "210727" }, { "label": "凌海市", "value": "210781" }, { "label": "北镇市", "value": "210782" }], [{ "label": "站前区", "value": "210802" }, { "label": "西市区", "value": "210803" }, { "label": "鲅鱼圈区", "value": "210804" }, { "label": "老边区", "value": "210811" }, { "label": "盖州市", "value": "210881" }, { "label": "大石桥市", "value": "210882" }], [{ "label": "海州区", "value": "210902" }, { "label": "新邱区", "value": "210903" }, { "label": "太平区", "value": "210904" }, { "label": "清河门区", "value": "210905" }, { "label": "细河区", "value": "210911" }, { "label": "阜新蒙古族自治县", "value": "210921" }, { "label": "彰武县", "value": "210922" }], [{ "label": "白塔区", "value": "211002" }, { "label": "文圣区", "value": "211003" }, { "label": "宏伟区", "value": "211004" }, { "label": "弓长岭区", "value": "211005" }, { "label": "太子河区", "value": "211011" }, { "label": "辽阳县", "value": "211021" }, { "label": "灯塔市", "value": "211081" }], [{ "label": "双台子区", "value": "211102" }, { "label": "兴隆台区", "value": "211103" }, { "label": "大洼区", "value": "211104" }, { "label": "盘山县", "value": "211122" }], [{ "label": "银州区", "value": "211202" }, { "label": "清河区", "value": "211204" }, { "label": "铁岭县", "value": "211221" }, { "label": "西丰县", "value": "211223" }, { "label": "昌图县", "value": "211224" }, { "label": "调兵山市", "value": "211281" }, { "label": "开原市", "value": "211282" }], [{ "label": "双塔区", "value": "211302" }, { "label": "龙城区", "value": "211303" }, { "label": "朝阳县", "value": "211321" }, { "label": "建平县", "value": "211322" }, { "label": "喀喇沁左翼蒙古族自治县", "value": "211324" }, { "label": "北票市", "value": "211381" }, { "label": "凌源市", "value": "211382" }], [{ "label": "连山区", "value": "211402" }, { "label": "龙港区", "value": "211403" }, { "label": "南票区", "value": "211404" }, { "label": "绥中县", "value": "211421" }, { "label": "建昌县", "value": "211422" }, { "label": "兴城市", "value": "211481" }]], [[{ "label": "南关区", "value": "220102" }, { "label": "宽城区", "value": "220103" }, { "label": "朝阳区", "value": "220104" }, { "label": "二道区", "value": "220105" }, { "label": "绿园区", "value": "220106" }, { "label": "双阳区", "value": "220112" }, { "label": "九台区", "value": "220113" }, { "label": "农安县", "value": "220122" }, { "label": "长春经济技术开发区", "value": "220171" }, { "label": "长春净月高新技术产业开发区", "value": "220172" }, { "label": "长春高新技术产业开发区", "value": "220173" }, { "label": "长春汽车经济技术开发区", "value": "220174" }, { "label": "榆树市", "value": "220182" }, { "label": "德惠市", "value": "220183" }], [{ "label": "昌邑区", "value": "220202" }, { "label": "龙潭区", "value": "220203" }, { "label": "船营区", "value": "220204" }, { "label": "丰满区", "value": "220211" }, { "label": "永吉县", "value": "220221" }, { "label": "吉林经济开发区", "value": "220271" }, { "label": "吉林高新技术产业开发区", "value": "220272" }, { "label": "吉林中国新加坡食品区", "value": "220273" }, { "label": "蛟河市", "value": "220281" }, { "label": "桦甸市", "value": "220282" }, { "label": "舒兰市", "value": "220283" }, { "label": "磐石市", "value": "220284" }], [{ "label": "铁西区", "value": "220302" }, { "label": "铁东区", "value": "220303" }, { "label": "梨树县", "value": "220322" }, { "label": "伊通满族自治县", "value": "220323" }, { "label": "公主岭市", "value": "220381" }, { "label": "双辽市", "value": "220382" }], [{ "label": "龙山区", "value": "220402" }, { "label": "西安区", "value": "220403" }, { "label": "东丰县", "value": "220421" }, { "label": "东辽县", "value": "220422" }], [{ "label": "东昌区", "value": "220502" }, { "label": "二道江区", "value": "220503" }, { "label": "通化县", "value": "220521" }, { "label": "辉南县", "value": "220523" }, { "label": "柳河县", "value": "220524" }, { "label": "梅河口市", "value": "220581" }, { "label": "集安市", "value": "220582" }], [{ "label": "浑江区", "value": "220602" }, { "label": "江源区", "value": "220605" }, { "label": "抚松县", "value": "220621" }, { "label": "靖宇县", "value": "220622" }, { "label": "长白朝鲜族自治县", "value": "220623" }, { "label": "临江市", "value": "220681" }], [{ "label": "宁江区", "value": "220702" }, { "label": "前郭尔罗斯蒙古族自治县", "value": "220721" }, { "label": "长岭县", "value": "220722" }, { "label": "乾安县", "value": "220723" }, { "label": "吉林松原经济开发区", "value": "220771" }, { "label": "扶余市", "value": "220781" }], [{ "label": "洮北区", "value": "220802" }, { "label": "镇赉县", "value": "220821" }, { "label": "通榆县", "value": "220822" }, { "label": "吉林白城经济开发区", "value": "220871" }, { "label": "洮南市", "value": "220881" }, { "label": "大安市", "value": "220882" }], [{ "label": "延吉市", "value": "222401" }, { "label": "图们市", "value": "222402" }, { "label": "敦化市", "value": "222403" }, { "label": "珲春市", "value": "222404" }, { "label": "龙井市", "value": "222405" }, { "label": "和龙市", "value": "222406" }, { "label": "汪清县", "value": "222424" }, { "label": "安图县", "value": "222426" }]], [[{ "label": "道里区", "value": "230102" }, { "label": "南岗区", "value": "230103" }, { "label": "道外区", "value": "230104" }, { "label": "平房区", "value": "230108" }, { "label": "松北区", "value": "230109" }, { "label": "香坊区", "value": "230110" }, { "label": "呼兰区", "value": "230111" }, { "label": "阿城区", "value": "230112" }, { "label": "双城区", "value": "230113" }, { "label": "依兰县", "value": "230123" }, { "label": "方正县", "value": "230124" }, { "label": "宾县", "value": "230125" }, { "label": "巴彦县", "value": "230126" }, { "label": "木兰县", "value": "230127" }, { "label": "通河县", "value": "230128" }, { "label": "延寿县", "value": "230129" }, { "label": "尚志市", "value": "230183" }, { "label": "五常市", "value": "230184" }], [{ "label": "龙沙区", "value": "230202" }, { "label": "建华区", "value": "230203" }, { "label": "铁锋区", "value": "230204" }, { "label": "昂昂溪区", "value": "230205" }, { "label": "富拉尔基区", "value": "230206" }, { "label": "碾子山区", "value": "230207" }, { "label": "梅里斯达斡尔族区", "value": "230208" }, { "label": "龙江县", "value": "230221" }, { "label": "依安县", "value": "230223" }, { "label": "泰来县", "value": "230224" }, { "label": "甘南县", "value": "230225" }, { "label": "富裕县", "value": "230227" }, { "label": "克山县", "value": "230229" }, { "label": "克东县", "value": "230230" }, { "label": "拜泉县", "value": "230231" }, { "label": "讷河市", "value": "230281" }], [{ "label": "鸡冠区", "value": "230302" }, { "label": "恒山区", "value": "230303" }, { "label": "滴道区", "value": "230304" }, { "label": "梨树区", "value": "230305" }, { "label": "城子河区", "value": "230306" }, { "label": "麻山区", "value": "230307" }, { "label": "鸡东县", "value": "230321" }, { "label": "虎林市", "value": "230381" }, { "label": "密山市", "value": "230382" }], [{ "label": "向阳区", "value": "230402" }, { "label": "工农区", "value": "230403" }, { "label": "南山区", "value": "230404" }, { "label": "兴安区", "value": "230405" }, { "label": "东山区", "value": "230406" }, { "label": "兴山区", "value": "230407" }, { "label": "萝北县", "value": "230421" }, { "label": "绥滨县", "value": "230422" }], [{ "label": "尖山区", "value": "230502" }, { "label": "岭东区", "value": "230503" }, { "label": "四方台区", "value": "230505" }, { "label": "宝山区", "value": "230506" }, { "label": "集贤县", "value": "230521" }, { "label": "友谊县", "value": "230522" }, { "label": "宝清县", "value": "230523" }, { "label": "饶河县", "value": "230524" }], [{ "label": "萨尔图区", "value": "230602" }, { "label": "龙凤区", "value": "230603" }, { "label": "让胡路区", "value": "230604" }, { "label": "红岗区", "value": "230605" }, { "label": "大同区", "value": "230606" }, { "label": "肇州县", "value": "230621" }, { "label": "肇源县", "value": "230622" }, { "label": "林甸县", "value": "230623" }, { "label": "杜尔伯特蒙古族自治县", "value": "230624" }, { "label": "大庆高新技术产业开发区", "value": "230671" }], [{ "label": "伊春区", "value": "230702" }, { "label": "南岔区", "value": "230703" }, { "label": "友好区", "value": "230704" }, { "label": "西林区", "value": "230705" }, { "label": "翠峦区", "value": "230706" }, { "label": "新青区", "value": "230707" }, { "label": "美溪区", "value": "230708" }, { "label": "金山屯区", "value": "230709" }, { "label": "五营区", "value": "230710" }, { "label": "乌马河区", "value": "230711" }, { "label": "汤旺河区", "value": "230712" }, { "label": "带岭区", "value": "230713" }, { "label": "乌伊岭区", "value": "230714" }, { "label": "红星区", "value": "230715" }, { "label": "上甘岭区", "value": "230716" }, { "label": "嘉荫县", "value": "230722" }, { "label": "铁力市", "value": "230781" }], [{ "label": "向阳区", "value": "230803" }, { "label": "前进区", "value": "230804" }, { "label": "东风区", "value": "230805" }, { "label": "郊区", "value": "230811" }, { "label": "桦南县", "value": "230822" }, { "label": "桦川县", "value": "230826" }, { "label": "汤原县", "value": "230828" }, { "label": "同江市", "value": "230881" }, { "label": "富锦市", "value": "230882" }, { "label": "抚远市", "value": "230883" }], [{ "label": "新兴区", "value": "230902" }, { "label": "桃山区", "value": "230903" }, { "label": "茄子河区", "value": "230904" }, { "label": "勃利县", "value": "230921" }], [{ "label": "东安区", "value": "231002" }, { "label": "阳明区", "value": "231003" }, { "label": "爱民区", "value": "231004" }, { "label": "西安区", "value": "231005" }, { "label": "林口县", "value": "231025" }, { "label": "牡丹江经济技术开发区", "value": "231071" }, { "label": "绥芬河市", "value": "231081" }, { "label": "海林市", "value": "231083" }, { "label": "宁安市", "value": "231084" }, { "label": "穆棱市", "value": "231085" }, { "label": "东宁市", "value": "231086" }], [{ "label": "爱辉区", "value": "231102" }, { "label": "嫩江县", "value": "231121" }, { "label": "逊克县", "value": "231123" }, { "label": "孙吴县", "value": "231124" }, { "label": "北安市", "value": "231181" }, { "label": "五大连池市", "value": "231182" }], [{ "label": "北林区", "value": "231202" }, { "label": "望奎县", "value": "231221" }, { "label": "兰西县", "value": "231222" }, { "label": "青冈县", "value": "231223" }, { "label": "庆安县", "value": "231224" }, { "label": "明水县", "value": "231225" }, { "label": "绥棱县", "value": "231226" }, { "label": "安达市", "value": "231281" }, { "label": "肇东市", "value": "231282" }, { "label": "海伦市", "value": "231283" }], [{ "label": "加格达奇区", "value": "232701" }, { "label": "松岭区", "value": "232702" }, { "label": "新林区", "value": "232703" }, { "label": "呼中区", "value": "232704" }, { "label": "呼玛县", "value": "232721" }, { "label": "塔河县", "value": "232722" }, { "label": "漠河县", "value": "232723" }]], [[{ "label": "黄浦区", "value": "310101" }, { "label": "徐汇区", "value": "310104" }, { "label": "长宁区", "value": "310105" }, { "label": "静安区", "value": "310106" }, { "label": "普陀区", "value": "310107" }, { "label": "虹口区", "value": "310109" }, { "label": "杨浦区", "value": "310110" }, { "label": "闵行区", "value": "310112" }, { "label": "宝山区", "value": "310113" }, { "label": "嘉定区", "value": "310114" }, { "label": "浦东新区", "value": "310115" }, { "label": "金山区", "value": "310116" }, { "label": "松江区", "value": "310117" }, { "label": "青浦区", "value": "310118" }, { "label": "奉贤区", "value": "310120" }, { "label": "崇明区", "value": "310151" }]], [[{ "label": "玄武区", "value": "320102" }, { "label": "秦淮区", "value": "320104" }, { "label": "建邺区", "value": "320105" }, { "label": "鼓楼区", "value": "320106" }, { "label": "浦口区", "value": "320111" }, { "label": "栖霞区", "value": "320113" }, { "label": "雨花台区", "value": "320114" }, { "label": "江宁区", "value": "320115" }, { "label": "六合区", "value": "320116" }, { "label": "溧水区", "value": "320117" }, { "label": "高淳区", "value": "320118" }], [{ "label": "锡山区", "value": "320205" }, { "label": "惠山区", "value": "320206" }, { "label": "滨湖区", "value": "320211" }, { "label": "梁溪区", "value": "320213" }, { "label": "新吴区", "value": "320214" }, { "label": "江阴市", "value": "320281" }, { "label": "宜兴市", "value": "320282" }], [{ "label": "鼓楼区", "value": "320302" }, { "label": "云龙区", "value": "320303" }, { "label": "贾汪区", "value": "320305" }, { "label": "泉山区", "value": "320311" }, { "label": "铜山区", "value": "320312" }, { "label": "丰县", "value": "320321" }, { "label": "沛县", "value": "320322" }, { "label": "睢宁县", "value": "320324" }, { "label": "徐州经济技术开发区", "value": "320371" }, { "label": "新沂市", "value": "320381" }, { "label": "邳州市", "value": "320382" }], [{ "label": "天宁区", "value": "320402" }, { "label": "钟楼区", "value": "320404" }, { "label": "新北区", "value": "320411" }, { "label": "武进区", "value": "320412" }, { "label": "金坛区", "value": "320413" }, { "label": "溧阳市", "value": "320481" }], [{ "label": "虎丘区", "value": "320505" }, { "label": "吴中区", "value": "320506" }, { "label": "相城区", "value": "320507" }, { "label": "姑苏区", "value": "320508" }, { "label": "吴江区", "value": "320509" }, { "label": "苏州工业园区", "value": "320571" }, { "label": "常熟市", "value": "320581" }, { "label": "张家港市", "value": "320582" }, { "label": "昆山市", "value": "320583" }, { "label": "太仓市", "value": "320585" }], [{ "label": "崇川区", "value": "320602" }, { "label": "港闸区", "value": "320611" }, { "label": "通州区", "value": "320612" }, { "label": "海安县", "value": "320621" }, { "label": "如东县", "value": "320623" }, { "label": "南通经济技术开发区", "value": "320671" }, { "label": "启东市", "value": "320681" }, { "label": "如皋市", "value": "320682" }, { "label": "海门市", "value": "320684" }], [{ "label": "连云区", "value": "320703" }, { "label": "海州区", "value": "320706" }, { "label": "赣榆区", "value": "320707" }, { "label": "东海县", "value": "320722" }, { "label": "灌云县", "value": "320723" }, { "label": "灌南县", "value": "320724" }, { "label": "连云港经济技术开发区", "value": "320771" }, { "label": "连云港高新技术产业开发区", "value": "320772" }], [{ "label": "淮安区", "value": "320803" }, { "label": "淮阴区", "value": "320804" }, { "label": "清江浦区", "value": "320812" }, { "label": "洪泽区", "value": "320813" }, { "label": "涟水县", "value": "320826" }, { "label": "盱眙县", "value": "320830" }, { "label": "金湖县", "value": "320831" }, { "label": "淮安经济技术开发区", "value": "320871" }], [{ "label": "亭湖区", "value": "320902" }, { "label": "盐都区", "value": "320903" }, { "label": "大丰区", "value": "320904" }, { "label": "响水县", "value": "320921" }, { "label": "滨海县", "value": "320922" }, { "label": "阜宁县", "value": "320923" }, { "label": "射阳县", "value": "320924" }, { "label": "建湖县", "value": "320925" }, { "label": "盐城经济技术开发区", "value": "320971" }, { "label": "东台市", "value": "320981" }], [{ "label": "广陵区", "value": "321002" }, { "label": "邗江区", "value": "321003" }, { "label": "江都区", "value": "321012" }, { "label": "宝应县", "value": "321023" }, { "label": "扬州经济技术开发区", "value": "321071" }, { "label": "仪征市", "value": "321081" }, { "label": "高邮市", "value": "321084" }], [{ "label": "京口区", "value": "321102" }, { "label": "润州区", "value": "321111" }, { "label": "丹徒区", "value": "321112" }, { "label": "镇江新区", "value": "321171" }, { "label": "丹阳市", "value": "321181" }, { "label": "扬中市", "value": "321182" }, { "label": "句容市", "value": "321183" }], [{ "label": "海陵区", "value": "321202" }, { "label": "高港区", "value": "321203" }, { "label": "姜堰区", "value": "321204" }, { "label": "泰州医药高新技术产业开发区", "value": "321271" }, { "label": "兴化市", "value": "321281" }, { "label": "靖江市", "value": "321282" }, { "label": "泰兴市", "value": "321283" }], [{ "label": "宿城区", "value": "321302" }, { "label": "宿豫区", "value": "321311" }, { "label": "沭阳县", "value": "321322" }, { "label": "泗阳县", "value": "321323" }, { "label": "泗洪县", "value": "321324" }, { "label": "宿迁经济技术开发区", "value": "321371" }]], [[{ "label": "上城区", "value": "330102" }, { "label": "下城区", "value": "330103" }, { "label": "江干区", "value": "330104" }, { "label": "拱墅区", "value": "330105" }, { "label": "西湖区", "value": "330106" }, { "label": "滨江区", "value": "330108" }, { "label": "萧山区", "value": "330109" }, { "label": "余杭区", "value": "330110" }, { "label": "富阳区", "value": "330111" }, { "label": "临安区", "value": "330112" }, { "label": "桐庐县", "value": "330122" }, { "label": "淳安县", "value": "330127" }, { "label": "建德市", "value": "330182" }], [{ "label": "海曙区", "value": "330203" }, { "label": "江北区", "value": "330205" }, { "label": "北仑区", "value": "330206" }, { "label": "镇海区", "value": "330211" }, { "label": "鄞州区", "value": "330212" }, { "label": "奉化区", "value": "330213" }, { "label": "象山县", "value": "330225" }, { "label": "宁海县", "value": "330226" }, { "label": "余姚市", "value": "330281" }, { "label": "慈溪市", "value": "330282" }], [{ "label": "鹿城区", "value": "330302" }, { "label": "龙湾区", "value": "330303" }, { "label": "瓯海区", "value": "330304" }, { "label": "洞头区", "value": "330305" }, { "label": "永嘉县", "value": "330324" }, { "label": "平阳县", "value": "330326" }, { "label": "苍南县", "value": "330327" }, { "label": "文成县", "value": "330328" }, { "label": "泰顺县", "value": "330329" }, { "label": "温州经济技术开发区", "value": "330371" }, { "label": "瑞安市", "value": "330381" }, { "label": "乐清市", "value": "330382" }], [{ "label": "南湖区", "value": "330402" }, { "label": "秀洲区", "value": "330411" }, { "label": "嘉善县", "value": "330421" }, { "label": "海盐县", "value": "330424" }, { "label": "海宁市", "value": "330481" }, { "label": "平湖市", "value": "330482" }, { "label": "桐乡市", "value": "330483" }], [{ "label": "吴兴区", "value": "330502" }, { "label": "南浔区", "value": "330503" }, { "label": "德清县", "value": "330521" }, { "label": "长兴县", "value": "330522" }, { "label": "安吉县", "value": "330523" }], [{ "label": "越城区", "value": "330602" }, { "label": "柯桥区", "value": "330603" }, { "label": "上虞区", "value": "330604" }, { "label": "新昌县", "value": "330624" }, { "label": "诸暨市", "value": "330681" }, { "label": "嵊州市", "value": "330683" }], [{ "label": "婺城区", "value": "330702" }, { "label": "金东区", "value": "330703" }, { "label": "武义县", "value": "330723" }, { "label": "浦江县", "value": "330726" }, { "label": "磐安县", "value": "330727" }, { "label": "兰溪市", "value": "330781" }, { "label": "义乌市", "value": "330782" }, { "label": "东阳市", "value": "330783" }, { "label": "永康市", "value": "330784" }], [{ "label": "柯城区", "value": "330802" }, { "label": "衢江区", "value": "330803" }, { "label": "常山县", "value": "330822" }, { "label": "开化县", "value": "330824" }, { "label": "龙游县", "value": "330825" }, { "label": "江山市", "value": "330881" }], [{ "label": "定海区", "value": "330902" }, { "label": "普陀区", "value": "330903" }, { "label": "岱山县", "value": "330921" }, { "label": "嵊泗县", "value": "330922" }], [{ "label": "椒江区", "value": "331002" }, { "label": "黄岩区", "value": "331003" }, { "label": "路桥区", "value": "331004" }, { "label": "三门县", "value": "331022" }, { "label": "天台县", "value": "331023" }, { "label": "仙居县", "value": "331024" }, { "label": "温岭市", "value": "331081" }, { "label": "临海市", "value": "331082" }, { "label": "玉环市", "value": "331083" }], [{ "label": "莲都区", "value": "331102" }, { "label": "青田县", "value": "331121" }, { "label": "缙云县", "value": "331122" }, { "label": "遂昌县", "value": "331123" }, { "label": "松阳县", "value": "331124" }, { "label": "云和县", "value": "331125" }, { "label": "庆元县", "value": "331126" }, { "label": "景宁畲族自治县", "value": "331127" }, { "label": "龙泉市", "value": "331181" }]], [[{ "label": "瑶海区", "value": "340102" }, { "label": "庐阳区", "value": "340103" }, { "label": "蜀山区", "value": "340104" }, { "label": "包河区", "value": "340111" }, { "label": "长丰县", "value": "340121" }, { "label": "肥东县", "value": "340122" }, { "label": "肥西县", "value": "340123" }, { "label": "庐江县", "value": "340124" }, { "label": "合肥高新技术产业开发区", "value": "340171" }, { "label": "合肥经济技术开发区", "value": "340172" }, { "label": "合肥新站高新技术产业开发区", "value": "340173" }, { "label": "巢湖市", "value": "340181" }], [{ "label": "镜湖区", "value": "340202" }, { "label": "弋江区", "value": "340203" }, { "label": "鸠江区", "value": "340207" }, { "label": "三山区", "value": "340208" }, { "label": "芜湖县", "value": "340221" }, { "label": "繁昌县", "value": "340222" }, { "label": "南陵县", "value": "340223" }, { "label": "无为县", "value": "340225" }, { "label": "芜湖经济技术开发区", "value": "340271" }, { "label": "安徽芜湖长江大桥经济开发区", "value": "340272" }], [{ "label": "龙子湖区", "value": "340302" }, { "label": "蚌山区", "value": "340303" }, { "label": "禹会区", "value": "340304" }, { "label": "淮上区", "value": "340311" }, { "label": "怀远县", "value": "340321" }, { "label": "五河县", "value": "340322" }, { "label": "固镇县", "value": "340323" }, { "label": "蚌埠市高新技术开发区", "value": "340371" }, { "label": "蚌埠市经济开发区", "value": "340372" }], [{ "label": "大通区", "value": "340402" }, { "label": "田家庵区", "value": "340403" }, { "label": "谢家集区", "value": "340404" }, { "label": "八公山区", "value": "340405" }, { "label": "潘集区", "value": "340406" }, { "label": "凤台县", "value": "340421" }, { "label": "寿县", "value": "340422" }], [{ "label": "花山区", "value": "340503" }, { "label": "雨山区", "value": "340504" }, { "label": "博望区", "value": "340506" }, { "label": "当涂县", "value": "340521" }, { "label": "含山县", "value": "340522" }, { "label": "和县", "value": "340523" }], [{ "label": "杜集区", "value": "340602" }, { "label": "相山区", "value": "340603" }, { "label": "烈山区", "value": "340604" }, { "label": "濉溪县", "value": "340621" }], [{ "label": "铜官区", "value": "340705" }, { "label": "义安区", "value": "340706" }, { "label": "郊区", "value": "340711" }, { "label": "枞阳县", "value": "340722" }], [{ "label": "迎江区", "value": "340802" }, { "label": "大观区", "value": "340803" }, { "label": "宜秀区", "value": "340811" }, { "label": "怀宁县", "value": "340822" }, { "label": "潜山县", "value": "340824" }, { "label": "太湖县", "value": "340825" }, { "label": "宿松县", "value": "340826" }, { "label": "望江县", "value": "340827" }, { "label": "岳西县", "value": "340828" }, { "label": "安徽安庆经济开发区", "value": "340871" }, { "label": "桐城市", "value": "340881" }], [{ "label": "屯溪区", "value": "341002" }, { "label": "黄山区", "value": "341003" }, { "label": "徽州区", "value": "341004" }, { "label": "歙县", "value": "341021" }, { "label": "休宁县", "value": "341022" }, { "label": "黟县", "value": "341023" }, { "label": "祁门县", "value": "341024" }], [{ "label": "琅琊区", "value": "341102" }, { "label": "南谯区", "value": "341103" }, { "label": "来安县", "value": "341122" }, { "label": "全椒县", "value": "341124" }, { "label": "定远县", "value": "341125" }, { "label": "凤阳县", "value": "341126" }, { "label": "苏滁现代产业园", "value": "341171" }, { "label": "滁州经济技术开发区", "value": "341172" }, { "label": "天长市", "value": "341181" }, { "label": "明光市", "value": "341182" }], [{ "label": "颍州区", "value": "341202" }, { "label": "颍东区", "value": "341203" }, { "label": "颍泉区", "value": "341204" }, { "label": "临泉县", "value": "341221" }, { "label": "太和县", "value": "341222" }, { "label": "阜南县", "value": "341225" }, { "label": "颍上县", "value": "341226" }, { "label": "阜阳合肥现代产业园区", "value": "341271" }, { "label": "阜阳经济技术开发区", "value": "341272" }, { "label": "界首市", "value": "341282" }], [{ "label": "埇桥区", "value": "341302" }, { "label": "砀山县", "value": "341321" }, { "label": "萧县", "value": "341322" }, { "label": "灵璧县", "value": "341323" }, { "label": "泗县", "value": "341324" }, { "label": "宿州马鞍山现代产业园区", "value": "341371" }, { "label": "宿州经济技术开发区", "value": "341372" }], [{ "label": "金安区", "value": "341502" }, { "label": "裕安区", "value": "341503" }, { "label": "叶集区", "value": "341504" }, { "label": "霍邱县", "value": "341522" }, { "label": "舒城县", "value": "341523" }, { "label": "金寨县", "value": "341524" }, { "label": "霍山县", "value": "341525" }], [{ "label": "谯城区", "value": "341602" }, { "label": "涡阳县", "value": "341621" }, { "label": "蒙城县", "value": "341622" }, { "label": "利辛县", "value": "341623" }], [{ "label": "贵池区", "value": "341702" }, { "label": "东至县", "value": "341721" }, { "label": "石台县", "value": "341722" }, { "label": "青阳县", "value": "341723" }], [{ "label": "宣州区", "value": "341802" }, { "label": "郎溪县", "value": "341821" }, { "label": "广德县", "value": "341822" }, { "label": "泾县", "value": "341823" }, { "label": "绩溪县", "value": "341824" }, { "label": "旌德县", "value": "341825" }, { "label": "宣城市经济开发区", "value": "341871" }, { "label": "宁国市", "value": "341881" }]], [[{ "label": "鼓楼区", "value": "350102" }, { "label": "台江区", "value": "350103" }, { "label": "仓山区", "value": "350104" }, { "label": "马尾区", "value": "350105" }, { "label": "晋安区", "value": "350111" }, { "label": "闽侯县", "value": "350121" }, { "label": "连江县", "value": "350122" }, { "label": "罗源县", "value": "350123" }, { "label": "闽清县", "value": "350124" }, { "label": "永泰县", "value": "350125" }, { "label": "平潭县", "value": "350128" }, { "label": "福清市", "value": "350181" }, { "label": "长乐市", "value": "350182" }], [{ "label": "思明区", "value": "350203" }, { "label": "海沧区", "value": "350205" }, { "label": "湖里区", "value": "350206" }, { "label": "集美区", "value": "350211" }, { "label": "同安区", "value": "350212" }, { "label": "翔安区", "value": "350213" }], [{ "label": "城厢区", "value": "350302" }, { "label": "涵江区", "value": "350303" }, { "label": "荔城区", "value": "350304" }, { "label": "秀屿区", "value": "350305" }, { "label": "仙游县", "value": "350322" }], [{ "label": "梅列区", "value": "350402" }, { "label": "三元区", "value": "350403" }, { "label": "明溪县", "value": "350421" }, { "label": "清流县", "value": "350423" }, { "label": "宁化县", "value": "350424" }, { "label": "大田县", "value": "350425" }, { "label": "尤溪县", "value": "350426" }, { "label": "沙县", "value": "350427" }, { "label": "将乐县", "value": "350428" }, { "label": "泰宁县", "value": "350429" }, { "label": "建宁县", "value": "350430" }, { "label": "永安市", "value": "350481" }], [{ "label": "鲤城区", "value": "350502" }, { "label": "丰泽区", "value": "350503" }, { "label": "洛江区", "value": "350504" }, { "label": "泉港区", "value": "350505" }, { "label": "惠安县", "value": "350521" }, { "label": "安溪县", "value": "350524" }, { "label": "永春县", "value": "350525" }, { "label": "德化县", "value": "350526" }, { "label": "金门县", "value": "350527" }, { "label": "石狮市", "value": "350581" }, { "label": "晋江市", "value": "350582" }, { "label": "南安市", "value": "350583" }], [{ "label": "芗城区", "value": "350602" }, { "label": "龙文区", "value": "350603" }, { "label": "云霄县", "value": "350622" }, { "label": "漳浦县", "value": "350623" }, { "label": "诏安县", "value": "350624" }, { "label": "长泰县", "value": "350625" }, { "label": "东山县", "value": "350626" }, { "label": "南靖县", "value": "350627" }, { "label": "平和县", "value": "350628" }, { "label": "华安县", "value": "350629" }, { "label": "龙海市", "value": "350681" }], [{ "label": "延平区", "value": "350702" }, { "label": "建阳区", "value": "350703" }, { "label": "顺昌县", "value": "350721" }, { "label": "浦城县", "value": "350722" }, { "label": "光泽县", "value": "350723" }, { "label": "松溪县", "value": "350724" }, { "label": "政和县", "value": "350725" }, { "label": "邵武市", "value": "350781" }, { "label": "武夷山市", "value": "350782" }, { "label": "建瓯市", "value": "350783" }], [{ "label": "新罗区", "value": "350802" }, { "label": "永定区", "value": "350803" }, { "label": "长汀县", "value": "350821" }, { "label": "上杭县", "value": "350823" }, { "label": "武平县", "value": "350824" }, { "label": "连城县", "value": "350825" }, { "label": "漳平市", "value": "350881" }], [{ "label": "蕉城区", "value": "350902" }, { "label": "霞浦县", "value": "350921" }, { "label": "古田县", "value": "350922" }, { "label": "屏南县", "value": "350923" }, { "label": "寿宁县", "value": "350924" }, { "label": "周宁县", "value": "350925" }, { "label": "柘荣县", "value": "350926" }, { "label": "福安市", "value": "350981" }, { "label": "福鼎市", "value": "350982" }]], [[{ "label": "东湖区", "value": "360102" }, { "label": "西湖区", "value": "360103" }, { "label": "青云谱区", "value": "360104" }, { "label": "湾里区", "value": "360105" }, { "label": "青山湖区", "value": "360111" }, { "label": "新建区", "value": "360112" }, { "label": "南昌县", "value": "360121" }, { "label": "安义县", "value": "360123" }, { "label": "进贤县", "value": "360124" }], [{ "label": "昌江区", "value": "360202" }, { "label": "珠山区", "value": "360203" }, { "label": "浮梁县", "value": "360222" }, { "label": "乐平市", "value": "360281" }], [{ "label": "安源区", "value": "360302" }, { "label": "湘东区", "value": "360313" }, { "label": "莲花县", "value": "360321" }, { "label": "上栗县", "value": "360322" }, { "label": "芦溪县", "value": "360323" }], [{ "label": "濂溪区", "value": "360402" }, { "label": "浔阳区", "value": "360403" }, { "label": "柴桑区", "value": "360404" }, { "label": "武宁县", "value": "360423" }, { "label": "修水县", "value": "360424" }, { "label": "永修县", "value": "360425" }, { "label": "德安县", "value": "360426" }, { "label": "都昌县", "value": "360428" }, { "label": "湖口县", "value": "360429" }, { "label": "彭泽县", "value": "360430" }, { "label": "瑞昌市", "value": "360481" }, { "label": "共青城市", "value": "360482" }, { "label": "庐山市", "value": "360483" }], [{ "label": "渝水区", "value": "360502" }, { "label": "分宜县", "value": "360521" }], [{ "label": "月湖区", "value": "360602" }, { "label": "余江县", "value": "360622" }, { "label": "贵溪市", "value": "360681" }], [{ "label": "章贡区", "value": "360702" }, { "label": "南康区", "value": "360703" }, { "label": "赣县区", "value": "360704" }, { "label": "信丰县", "value": "360722" }, { "label": "大余县", "value": "360723" }, { "label": "上犹县", "value": "360724" }, { "label": "崇义县", "value": "360725" }, { "label": "安远县", "value": "360726" }, { "label": "龙南县", "value": "360727" }, { "label": "定南县", "value": "360728" }, { "label": "全南县", "value": "360729" }, { "label": "宁都县", "value": "360730" }, { "label": "于都县", "value": "360731" }, { "label": "兴国县", "value": "360732" }, { "label": "会昌县", "value": "360733" }, { "label": "寻乌县", "value": "360734" }, { "label": "石城县", "value": "360735" }, { "label": "瑞金市", "value": "360781" }], [{ "label": "吉州区", "value": "360802" }, { "label": "青原区", "value": "360803" }, { "label": "吉安县", "value": "360821" }, { "label": "吉水县", "value": "360822" }, { "label": "峡江县", "value": "360823" }, { "label": "新干县", "value": "360824" }, { "label": "永丰县", "value": "360825" }, { "label": "泰和县", "value": "360826" }, { "label": "遂川县", "value": "360827" }, { "label": "万安县", "value": "360828" }, { "label": "安福县", "value": "360829" }, { "label": "永新县", "value": "360830" }, { "label": "井冈山市", "value": "360881" }], [{ "label": "袁州区", "value": "360902" }, { "label": "奉新县", "value": "360921" }, { "label": "万载县", "value": "360922" }, { "label": "上高县", "value": "360923" }, { "label": "宜丰县", "value": "360924" }, { "label": "靖安县", "value": "360925" }, { "label": "铜鼓县", "value": "360926" }, { "label": "丰城市", "value": "360981" }, { "label": "樟树市", "value": "360982" }, { "label": "高安市", "value": "360983" }], [{ "label": "临川区", "value": "361002" }, { "label": "东乡区", "value": "361003" }, { "label": "南城县", "value": "361021" }, { "label": "黎川县", "value": "361022" }, { "label": "南丰县", "value": "361023" }, { "label": "崇仁县", "value": "361024" }, { "label": "乐安县", "value": "361025" }, { "label": "宜黄县", "value": "361026" }, { "label": "金溪县", "value": "361027" }, { "label": "资溪县", "value": "361028" }, { "label": "广昌县", "value": "361030" }], [{ "label": "信州区", "value": "361102" }, { "label": "广丰区", "value": "361103" }, { "label": "上饶县", "value": "361121" }, { "label": "玉山县", "value": "361123" }, { "label": "铅山县", "value": "361124" }, { "label": "横峰县", "value": "361125" }, { "label": "弋阳县", "value": "361126" }, { "label": "余干县", "value": "361127" }, { "label": "鄱阳县", "value": "361128" }, { "label": "万年县", "value": "361129" }, { "label": "婺源县", "value": "361130" }, { "label": "德兴市", "value": "361181" }]], [[{ "label": "历下区", "value": "370102" }, { "label": "市中区", "value": "370103" }, { "label": "槐荫区", "value": "370104" }, { "label": "天桥区", "value": "370105" }, { "label": "历城区", "value": "370112" }, { "label": "长清区", "value": "370113" }, { "label": "章丘区", "value": "370114" }, { "label": "平阴县", "value": "370124" }, { "label": "济阳县", "value": "370125" }, { "label": "商河县", "value": "370126" }, { "label": "济南高新技术产业开发区", "value": "370171" }], [{ "label": "市南区", "value": "370202" }, { "label": "市北区", "value": "370203" }, { "label": "黄岛区", "value": "370211" }, { "label": "崂山区", "value": "370212" }, { "label": "李沧区", "value": "370213" }, { "label": "城阳区", "value": "370214" }, { "label": "即墨区", "value": "370215" }, { "label": "青岛高新技术产业开发区", "value": "370271" }, { "label": "胶州市", "value": "370281" }, { "label": "平度市", "value": "370283" }, { "label": "莱西市", "value": "370285" }], [{ "label": "淄川区", "value": "370302" }, { "label": "张店区", "value": "370303" }, { "label": "博山区", "value": "370304" }, { "label": "临淄区", "value": "370305" }, { "label": "周村区", "value": "370306" }, { "label": "桓台县", "value": "370321" }, { "label": "高青县", "value": "370322" }, { "label": "沂源县", "value": "370323" }], [{ "label": "市中区", "value": "370402" }, { "label": "薛城区", "value": "370403" }, { "label": "峄城区", "value": "370404" }, { "label": "台儿庄区", "value": "370405" }, { "label": "山亭区", "value": "370406" }, { "label": "滕州市", "value": "370481" }], [{ "label": "东营区", "value": "370502" }, { "label": "河口区", "value": "370503" }, { "label": "垦利区", "value": "370505" }, { "label": "利津县", "value": "370522" }, { "label": "广饶县", "value": "370523" }, { "label": "东营经济技术开发区", "value": "370571" }, { "label": "东营港经济开发区", "value": "370572" }], [{ "label": "芝罘区", "value": "370602" }, { "label": "福山区", "value": "370611" }, { "label": "牟平区", "value": "370612" }, { "label": "莱山区", "value": "370613" }, { "label": "长岛县", "value": "370634" }, { "label": "烟台高新技术产业开发区", "value": "370671" }, { "label": "烟台经济技术开发区", "value": "370672" }, { "label": "龙口市", "value": "370681" }, { "label": "莱阳市", "value": "370682" }, { "label": "莱州市", "value": "370683" }, { "label": "蓬莱市", "value": "370684" }, { "label": "招远市", "value": "370685" }, { "label": "栖霞市", "value": "370686" }, { "label": "海阳市", "value": "370687" }], [{ "label": "潍城区", "value": "370702" }, { "label": "寒亭区", "value": "370703" }, { "label": "坊子区", "value": "370704" }, { "label": "奎文区", "value": "370705" }, { "label": "临朐县", "value": "370724" }, { "label": "昌乐县", "value": "370725" }, { "label": "潍坊滨海经济技术开发区", "value": "370772" }, { "label": "青州市", "value": "370781" }, { "label": "诸城市", "value": "370782" }, { "label": "寿光市", "value": "370783" }, { "label": "安丘市", "value": "370784" }, { "label": "高密市", "value": "370785" }, { "label": "昌邑市", "value": "370786" }], [{ "label": "任城区", "value": "370811" }, { "label": "兖州区", "value": "370812" }, { "label": "微山县", "value": "370826" }, { "label": "鱼台县", "value": "370827" }, { "label": "金乡县", "value": "370828" }, { "label": "嘉祥县", "value": "370829" }, { "label": "汶上县", "value": "370830" }, { "label": "泗水县", "value": "370831" }, { "label": "梁山县", "value": "370832" }, { "label": "济宁高新技术产业开发区", "value": "370871" }, { "label": "曲阜市", "value": "370881" }, { "label": "邹城市", "value": "370883" }], [{ "label": "泰山区", "value": "370902" }, { "label": "岱岳区", "value": "370911" }, { "label": "宁阳县", "value": "370921" }, { "label": "东平县", "value": "370923" }, { "label": "新泰市", "value": "370982" }, { "label": "肥城市", "value": "370983" }], [{ "label": "环翠区", "value": "371002" }, { "label": "文登区", "value": "371003" }, { "label": "威海火炬高技术产业开发区", "value": "371071" }, { "label": "威海经济技术开发区", "value": "371072" }, { "label": "威海临港经济技术开发区", "value": "371073" }, { "label": "荣成市", "value": "371082" }, { "label": "乳山市", "value": "371083" }], [{ "label": "东港区", "value": "371102" }, { "label": "岚山区", "value": "371103" }, { "label": "五莲县", "value": "371121" }, { "label": "莒县", "value": "371122" }, { "label": "日照经济技术开发区", "value": "371171" }, { "label": "日照国际海洋城", "value": "371172" }], [{ "label": "莱城区", "value": "371202" }, { "label": "钢城区", "value": "371203" }], [{ "label": "兰山区", "value": "371302" }, { "label": "罗庄区", "value": "371311" }, { "label": "河东区", "value": "371312" }, { "label": "沂南县", "value": "371321" }, { "label": "郯城县", "value": "371322" }, { "label": "沂水县", "value": "371323" }, { "label": "兰陵县", "value": "371324" }, { "label": "费县", "value": "371325" }, { "label": "平邑县", "value": "371326" }, { "label": "莒南县", "value": "371327" }, { "label": "蒙阴县", "value": "371328" }, { "label": "临沭县", "value": "371329" }, { "label": "临沂高新技术产业开发区", "value": "371371" }, { "label": "临沂经济技术开发区", "value": "371372" }, { "label": "临沂临港经济开发区", "value": "371373" }], [{ "label": "德城区", "value": "371402" }, { "label": "陵城区", "value": "371403" }, { "label": "宁津县", "value": "371422" }, { "label": "庆云县", "value": "371423" }, { "label": "临邑县", "value": "371424" }, { "label": "齐河县", "value": "371425" }, { "label": "平原县", "value": "371426" }, { "label": "夏津县", "value": "371427" }, { "label": "武城县", "value": "371428" }, { "label": "德州经济技术开发区", "value": "371471" }, { "label": "德州运河经济开发区", "value": "371472" }, { "label": "乐陵市", "value": "371481" }, { "label": "禹城市", "value": "371482" }], [{ "label": "东昌府区", "value": "371502" }, { "label": "阳谷县", "value": "371521" }, { "label": "莘县", "value": "371522" }, { "label": "茌平县", "value": "371523" }, { "label": "东阿县", "value": "371524" }, { "label": "冠县", "value": "371525" }, { "label": "高唐县", "value": "371526" }, { "label": "临清市", "value": "371581" }], [{ "label": "滨城区", "value": "371602" }, { "label": "沾化区", "value": "371603" }, { "label": "惠民县", "value": "371621" }, { "label": "阳信县", "value": "371622" }, { "label": "无棣县", "value": "371623" }, { "label": "博兴县", "value": "371625" }, { "label": "邹平县", "value": "371626" }], [{ "label": "牡丹区", "value": "371702" }, { "label": "定陶区", "value": "371703" }, { "label": "曹县", "value": "371721" }, { "label": "单县", "value": "371722" }, { "label": "成武县", "value": "371723" }, { "label": "巨野县", "value": "371724" }, { "label": "郓城县", "value": "371725" }, { "label": "鄄城县", "value": "371726" }, { "label": "东明县", "value": "371728" }, { "label": "菏泽经济技术开发区", "value": "371771" }, { "label": "菏泽高新技术开发区", "value": "371772" }]], [[{ "label": "中原区", "value": "410102" }, { "label": "二七区", "value": "410103" }, { "label": "管城回族区", "value": "410104" }, { "label": "金水区", "value": "410105" }, { "label": "上街区", "value": "410106" }, { "label": "惠济区", "value": "410108" }, { "label": "中牟县", "value": "410122" }, { "label": "郑州经济技术开发区", "value": "410171" }, { "label": "郑州高新技术产业开发区", "value": "410172" }, { "label": "郑州航空港经济综合实验区", "value": "410173" }, { "label": "巩义市", "value": "410181" }, { "label": "荥阳市", "value": "410182" }, { "label": "新密市", "value": "410183" }, { "label": "新郑市", "value": "410184" }, { "label": "登封市", "value": "410185" }], [{ "label": "龙亭区", "value": "410202" }, { "label": "顺河回族区", "value": "410203" }, { "label": "鼓楼区", "value": "410204" }, { "label": "禹王台区", "value": "410205" }, { "label": "祥符区", "value": "410212" }, { "label": "杞县", "value": "410221" }, { "label": "通许县", "value": "410222" }, { "label": "尉氏县", "value": "410223" }, { "label": "兰考县", "value": "410225" }], [{ "label": "老城区", "value": "410302" }, { "label": "西工区", "value": "410303" }, { "label": "瀍河回族区", "value": "410304" }, { "label": "涧西区", "value": "410305" }, { "label": "吉利区", "value": "410306" }, { "label": "洛龙区", "value": "410311" }, { "label": "孟津县", "value": "410322" }, { "label": "新安县", "value": "410323" }, { "label": "栾川县", "value": "410324" }, { "label": "嵩县", "value": "410325" }, { "label": "汝阳县", "value": "410326" }, { "label": "宜阳县", "value": "410327" }, { "label": "洛宁县", "value": "410328" }, { "label": "伊川县", "value": "410329" }, { "label": "洛阳高新技术产业开发区", "value": "410371" }, { "label": "偃师市", "value": "410381" }], [{ "label": "新华区", "value": "410402" }, { "label": "卫东区", "value": "410403" }, { "label": "石龙区", "value": "410404" }, { "label": "湛河区", "value": "410411" }, { "label": "宝丰县", "value": "410421" }, { "label": "叶县", "value": "410422" }, { "label": "鲁山县", "value": "410423" }, { "label": "郏县", "value": "410425" }, { "label": "平顶山高新技术产业开发区", "value": "410471" }, { "label": "平顶山市新城区", "value": "410472" }, { "label": "舞钢市", "value": "410481" }, { "label": "汝州市", "value": "410482" }], [{ "label": "文峰区", "value": "410502" }, { "label": "北关区", "value": "410503" }, { "label": "殷都区", "value": "410505" }, { "label": "龙安区", "value": "410506" }, { "label": "安阳县", "value": "410522" }, { "label": "汤阴县", "value": "410523" }, { "label": "滑县", "value": "410526" }, { "label": "内黄县", "value": "410527" }, { "label": "安阳高新技术产业开发区", "value": "410571" }, { "label": "林州市", "value": "410581" }], [{ "label": "鹤山区", "value": "410602" }, { "label": "山城区", "value": "410603" }, { "label": "淇滨区", "value": "410611" }, { "label": "浚县", "value": "410621" }, { "label": "淇县", "value": "410622" }, { "label": "鹤壁经济技术开发区", "value": "410671" }], [{ "label": "红旗区", "value": "410702" }, { "label": "卫滨区", "value": "410703" }, { "label": "凤泉区", "value": "410704" }, { "label": "牧野区", "value": "410711" }, { "label": "新乡县", "value": "410721" }, { "label": "获嘉县", "value": "410724" }, { "label": "原阳县", "value": "410725" }, { "label": "延津县", "value": "410726" }, { "label": "封丘县", "value": "410727" }, { "label": "长垣县", "value": "410728" }, { "label": "新乡高新技术产业开发区", "value": "410771" }, { "label": "新乡经济技术开发区", "value": "410772" }, { "label": "新乡市平原城乡一体化示范区", "value": "410773" }, { "label": "卫辉市", "value": "410781" }, { "label": "辉县市", "value": "410782" }], [{ "label": "解放区", "value": "410802" }, { "label": "中站区", "value": "410803" }, { "label": "马村区", "value": "410804" }, { "label": "山阳区", "value": "410811" }, { "label": "修武县", "value": "410821" }, { "label": "博爱县", "value": "410822" }, { "label": "武陟县", "value": "410823" }, { "label": "温县", "value": "410825" }, { "label": "焦作城乡一体化示范区", "value": "410871" }, { "label": "沁阳市", "value": "410882" }, { "label": "孟州市", "value": "410883" }], [{ "label": "华龙区", "value": "410902" }, { "label": "清丰县", "value": "410922" }, { "label": "南乐县", "value": "410923" }, { "label": "范县", "value": "410926" }, { "label": "台前县", "value": "410927" }, { "label": "濮阳县", "value": "410928" }, { "label": "河南濮阳工业园区", "value": "410971" }, { "label": "濮阳经济技术开发区", "value": "410972" }], [{ "label": "魏都区", "value": "411002" }, { "label": "建安区", "value": "411003" }, { "label": "鄢陵县", "value": "411024" }, { "label": "襄城县", "value": "411025" }, { "label": "许昌经济技术开发区", "value": "411071" }, { "label": "禹州市", "value": "411081" }, { "label": "长葛市", "value": "411082" }], [{ "label": "源汇区", "value": "411102" }, { "label": "郾城区", "value": "411103" }, { "label": "召陵区", "value": "411104" }, { "label": "舞阳县", "value": "411121" }, { "label": "临颍县", "value": "411122" }, { "label": "漯河经济技术开发区", "value": "411171" }], [{ "label": "湖滨区", "value": "411202" }, { "label": "陕州区", "value": "411203" }, { "label": "渑池县", "value": "411221" }, { "label": "卢氏县", "value": "411224" }, { "label": "河南三门峡经济开发区", "value": "411271" }, { "label": "义马市", "value": "411281" }, { "label": "灵宝市", "value": "411282" }], [{ "label": "宛城区", "value": "411302" }, { "label": "卧龙区", "value": "411303" }, { "label": "南召县", "value": "411321" }, { "label": "方城县", "value": "411322" }, { "label": "西峡县", "value": "411323" }, { "label": "镇平县", "value": "411324" }, { "label": "内乡县", "value": "411325" }, { "label": "淅川县", "value": "411326" }, { "label": "社旗县", "value": "411327" }, { "label": "唐河县", "value": "411328" }, { "label": "新野县", "value": "411329" }, { "label": "桐柏县", "value": "411330" }, { "label": "南阳高新技术产业开发区", "value": "411371" }, { "label": "南阳市城乡一体化示范区", "value": "411372" }, { "label": "邓州市", "value": "411381" }], [{ "label": "梁园区", "value": "411402" }, { "label": "睢阳区", "value": "411403" }, { "label": "民权县", "value": "411421" }, { "label": "睢县", "value": "411422" }, { "label": "宁陵县", "value": "411423" }, { "label": "柘城县", "value": "411424" }, { "label": "虞城县", "value": "411425" }, { "label": "夏邑县", "value": "411426" }, { "label": "豫东综合物流产业聚集区", "value": "411471" }, { "label": "河南商丘经济开发区", "value": "411472" }, { "label": "永城市", "value": "411481" }], [{ "label": "浉河区", "value": "411502" }, { "label": "平桥区", "value": "411503" }, { "label": "罗山县", "value": "411521" }, { "label": "光山县", "value": "411522" }, { "label": "新县", "value": "411523" }, { "label": "商城县", "value": "411524" }, { "label": "固始县", "value": "411525" }, { "label": "潢川县", "value": "411526" }, { "label": "淮滨县", "value": "411527" }, { "label": "息县", "value": "411528" }, { "label": "信阳高新技术产业开发区", "value": "411571" }], [{ "label": "川汇区", "value": "411602" }, { "label": "扶沟县", "value": "411621" }, { "label": "西华县", "value": "411622" }, { "label": "商水县", "value": "411623" }, { "label": "沈丘县", "value": "411624" }, { "label": "郸城县", "value": "411625" }, { "label": "淮阳县", "value": "411626" }, { "label": "太康县", "value": "411627" }, { "label": "鹿邑县", "value": "411628" }, { "label": "河南周口经济开发区", "value": "411671" }, { "label": "项城市", "value": "411681" }], [{ "label": "驿城区", "value": "411702" }, { "label": "西平县", "value": "411721" }, { "label": "上蔡县", "value": "411722" }, { "label": "平舆县", "value": "411723" }, { "label": "正阳县", "value": "411724" }, { "label": "确山县", "value": "411725" }, { "label": "泌阳县", "value": "411726" }, { "label": "汝南县", "value": "411727" }, { "label": "遂平县", "value": "411728" }, { "label": "新蔡县", "value": "411729" }, { "label": "河南驻马店经济开发区", "value": "411771" }], [{ "label": "济源市", "value": "419001" }]], [[{ "label": "江岸区", "value": "420102" }, { "label": "江汉区", "value": "420103" }, { "label": "硚口区", "value": "420104" }, { "label": "汉阳区", "value": "420105" }, { "label": "武昌区", "value": "420106" }, { "label": "青山区", "value": "420107" }, { "label": "洪山区", "value": "420111" }, { "label": "东西湖区", "value": "420112" }, { "label": "汉南区", "value": "420113" }, { "label": "蔡甸区", "value": "420114" }, { "label": "江夏区", "value": "420115" }, { "label": "黄陂区", "value": "420116" }, { "label": "新洲区", "value": "420117" }], [{ "label": "黄石港区", "value": "420202" }, { "label": "西塞山区", "value": "420203" }, { "label": "下陆区", "value": "420204" }, { "label": "铁山区", "value": "420205" }, { "label": "阳新县", "value": "420222" }, { "label": "大冶市", "value": "420281" }], [{ "label": "茅箭区", "value": "420302" }, { "label": "张湾区", "value": "420303" }, { "label": "郧阳区", "value": "420304" }, { "label": "郧西县", "value": "420322" }, { "label": "竹山县", "value": "420323" }, { "label": "竹溪县", "value": "420324" }, { "label": "房县", "value": "420325" }, { "label": "丹江口市", "value": "420381" }], [{ "label": "西陵区", "value": "420502" }, { "label": "伍家岗区", "value": "420503" }, { "label": "点军区", "value": "420504" }, { "label": "猇亭区", "value": "420505" }, { "label": "夷陵区", "value": "420506" }, { "label": "远安县", "value": "420525" }, { "label": "兴山县", "value": "420526" }, { "label": "秭归县", "value": "420527" }, { "label": "长阳土家族自治县", "value": "420528" }, { "label": "五峰土家族自治县", "value": "420529" }, { "label": "宜都市", "value": "420581" }, { "label": "当阳市", "value": "420582" }, { "label": "枝江市", "value": "420583" }], [{ "label": "襄城区", "value": "420602" }, { "label": "樊城区", "value": "420606" }, { "label": "襄州区", "value": "420607" }, { "label": "南漳县", "value": "420624" }, { "label": "谷城县", "value": "420625" }, { "label": "保康县", "value": "420626" }, { "label": "老河口市", "value": "420682" }, { "label": "枣阳市", "value": "420683" }, { "label": "宜城市", "value": "420684" }], [{ "label": "梁子湖区", "value": "420702" }, { "label": "华容区", "value": "420703" }, { "label": "鄂城区", "value": "420704" }], [{ "label": "东宝区", "value": "420802" }, { "label": "掇刀区", "value": "420804" }, { "label": "京山县", "value": "420821" }, { "label": "沙洋县", "value": "420822" }, { "label": "钟祥市", "value": "420881" }], [{ "label": "孝南区", "value": "420902" }, { "label": "孝昌县", "value": "420921" }, { "label": "大悟县", "value": "420922" }, { "label": "云梦县", "value": "420923" }, { "label": "应城市", "value": "420981" }, { "label": "安陆市", "value": "420982" }, { "label": "汉川市", "value": "420984" }], [{ "label": "沙市区", "value": "421002" }, { "label": "荆州区", "value": "421003" }, { "label": "公安县", "value": "421022" }, { "label": "监利县", "value": "421023" }, { "label": "江陵县", "value": "421024" }, { "label": "荆州经济技术开发区", "value": "421071" }, { "label": "石首市", "value": "421081" }, { "label": "洪湖市", "value": "421083" }, { "label": "松滋市", "value": "421087" }], [{ "label": "黄州区", "value": "421102" }, { "label": "团风县", "value": "421121" }, { "label": "红安县", "value": "421122" }, { "label": "罗田县", "value": "421123" }, { "label": "英山县", "value": "421124" }, { "label": "浠水县", "value": "421125" }, { "label": "蕲春县", "value": "421126" }, { "label": "黄梅县", "value": "421127" }, { "label": "龙感湖管理区", "value": "421171" }, { "label": "麻城市", "value": "421181" }, { "label": "武穴市", "value": "421182" }], [{ "label": "咸安区", "value": "421202" }, { "label": "嘉鱼县", "value": "421221" }, { "label": "通城县", "value": "421222" }, { "label": "崇阳县", "value": "421223" }, { "label": "通山县", "value": "421224" }, { "label": "赤壁市", "value": "421281" }], [{ "label": "曾都区", "value": "421303" }, { "label": "随县", "value": "421321" }, { "label": "广水市", "value": "421381" }], [{ "label": "恩施市", "value": "422801" }, { "label": "利川市", "value": "422802" }, { "label": "建始县", "value": "422822" }, { "label": "巴东县", "value": "422823" }, { "label": "宣恩县", "value": "422825" }, { "label": "咸丰县", "value": "422826" }, { "label": "来凤县", "value": "422827" }, { "label": "鹤峰县", "value": "422828" }], [{ "label": "仙桃市", "value": "429004" }, { "label": "潜江市", "value": "429005" }, { "label": "天门市", "value": "429006" }, { "label": "神农架林区", "value": "429021" }]], [[{ "label": "芙蓉区", "value": "430102" }, { "label": "天心区", "value": "430103" }, { "label": "岳麓区", "value": "430104" }, { "label": "开福区", "value": "430105" }, { "label": "雨花区", "value": "430111" }, { "label": "望城区", "value": "430112" }, { "label": "长沙县", "value": "430121" }, { "label": "浏阳市", "value": "430181" }, { "label": "宁乡市", "value": "430182" }], [{ "label": "荷塘区", "value": "430202" }, { "label": "芦淞区", "value": "430203" }, { "label": "石峰区", "value": "430204" }, { "label": "天元区", "value": "430211" }, { "label": "株洲县", "value": "430221" }, { "label": "攸县", "value": "430223" }, { "label": "茶陵县", "value": "430224" }, { "label": "炎陵县", "value": "430225" }, { "label": "云龙示范区", "value": "430271" }, { "label": "醴陵市", "value": "430281" }], [{ "label": "雨湖区", "value": "430302" }, { "label": "岳塘区", "value": "430304" }, { "label": "湘潭县", "value": "430321" }, { "label": "湖南湘潭高新技术产业园区", "value": "430371" }, { "label": "湘潭昭山示范区", "value": "430372" }, { "label": "湘潭九华示范区", "value": "430373" }, { "label": "湘乡市", "value": "430381" }, { "label": "韶山市", "value": "430382" }], [{ "label": "珠晖区", "value": "430405" }, { "label": "雁峰区", "value": "430406" }, { "label": "石鼓区", "value": "430407" }, { "label": "蒸湘区", "value": "430408" }, { "label": "南岳区", "value": "430412" }, { "label": "衡阳县", "value": "430421" }, { "label": "衡南县", "value": "430422" }, { "label": "衡山县", "value": "430423" }, { "label": "衡东县", "value": "430424" }, { "label": "祁东县", "value": "430426" }, { "label": "衡阳综合保税区", "value": "430471" }, { "label": "湖南衡阳高新技术产业园区", "value": "430472" }, { "label": "湖南衡阳松木经济开发区", "value": "430473" }, { "label": "耒阳市", "value": "430481" }, { "label": "常宁市", "value": "430482" }], [{ "label": "双清区", "value": "430502" }, { "label": "大祥区", "value": "430503" }, { "label": "北塔区", "value": "430511" }, { "label": "邵东县", "value": "430521" }, { "label": "新邵县", "value": "430522" }, { "label": "邵阳县", "value": "430523" }, { "label": "隆回县", "value": "430524" }, { "label": "洞口县", "value": "430525" }, { "label": "绥宁县", "value": "430527" }, { "label": "新宁县", "value": "430528" }, { "label": "城步苗族自治县", "value": "430529" }, { "label": "武冈市", "value": "430581" }], [{ "label": "岳阳楼区", "value": "430602" }, { "label": "云溪区", "value": "430603" }, { "label": "君山区", "value": "430611" }, { "label": "岳阳县", "value": "430621" }, { "label": "华容县", "value": "430623" }, { "label": "湘阴县", "value": "430624" }, { "label": "平江县", "value": "430626" }, { "label": "岳阳市屈原管理区", "value": "430671" }, { "label": "汨罗市", "value": "430681" }, { "label": "临湘市", "value": "430682" }], [{ "label": "武陵区", "value": "430702" }, { "label": "鼎城区", "value": "430703" }, { "label": "安乡县", "value": "430721" }, { "label": "汉寿县", "value": "430722" }, { "label": "澧县", "value": "430723" }, { "label": "临澧县", "value": "430724" }, { "label": "桃源县", "value": "430725" }, { "label": "石门县", "value": "430726" }, { "label": "常德市西洞庭管理区", "value": "430771" }, { "label": "津市市", "value": "430781" }], [{ "label": "永定区", "value": "430802" }, { "label": "武陵源区", "value": "430811" }, { "label": "慈利县", "value": "430821" }, { "label": "桑植县", "value": "430822" }], [{ "label": "资阳区", "value": "430902" }, { "label": "赫山区", "value": "430903" }, { "label": "南县", "value": "430921" }, { "label": "桃江县", "value": "430922" }, { "label": "安化县", "value": "430923" }, { "label": "益阳市大通湖管理区", "value": "430971" }, { "label": "湖南益阳高新技术产业园区", "value": "430972" }, { "label": "沅江市", "value": "430981" }], [{ "label": "北湖区", "value": "431002" }, { "label": "苏仙区", "value": "431003" }, { "label": "桂阳县", "value": "431021" }, { "label": "宜章县", "value": "431022" }, { "label": "永兴县", "value": "431023" }, { "label": "嘉禾县", "value": "431024" }, { "label": "临武县", "value": "431025" }, { "label": "汝城县", "value": "431026" }, { "label": "桂东县", "value": "431027" }, { "label": "安仁县", "value": "431028" }, { "label": "资兴市", "value": "431081" }], [{ "label": "零陵区", "value": "431102" }, { "label": "冷水滩区", "value": "431103" }, { "label": "祁阳县", "value": "431121" }, { "label": "东安县", "value": "431122" }, { "label": "双牌县", "value": "431123" }, { "label": "道县", "value": "431124" }, { "label": "江永县", "value": "431125" }, { "label": "宁远县", "value": "431126" }, { "label": "蓝山县", "value": "431127" }, { "label": "新田县", "value": "431128" }, { "label": "江华瑶族自治县", "value": "431129" }, { "label": "永州经济技术开发区", "value": "431171" }, { "label": "永州市金洞管理区", "value": "431172" }, { "label": "永州市回龙圩管理区", "value": "431173" }], [{ "label": "鹤城区", "value": "431202" }, { "label": "中方县", "value": "431221" }, { "label": "沅陵县", "value": "431222" }, { "label": "辰溪县", "value": "431223" }, { "label": "溆浦县", "value": "431224" }, { "label": "会同县", "value": "431225" }, { "label": "麻阳苗族自治县", "value": "431226" }, { "label": "新晃侗族自治县", "value": "431227" }, { "label": "芷江侗族自治县", "value": "431228" }, { "label": "靖州苗族侗族自治县", "value": "431229" }, { "label": "通道侗族自治县", "value": "431230" }, { "label": "怀化市洪江管理区", "value": "431271" }, { "label": "洪江市", "value": "431281" }], [{ "label": "娄星区", "value": "431302" }, { "label": "双峰县", "value": "431321" }, { "label": "新化县", "value": "431322" }, { "label": "冷水江市", "value": "431381" }, { "label": "涟源市", "value": "431382" }], [{ "label": "吉首市", "value": "433101" }, { "label": "泸溪县", "value": "433122" }, { "label": "凤凰县", "value": "433123" }, { "label": "花垣县", "value": "433124" }, { "label": "保靖县", "value": "433125" }, { "label": "古丈县", "value": "433126" }, { "label": "永顺县", "value": "433127" }, { "label": "龙山县", "value": "433130" }, { "label": "湖南吉首经济开发区", "value": "433172" }, { "label": "湖南永顺经济开发区", "value": "433173" }]], [[{ "label": "荔湾区", "value": "440103" }, { "label": "越秀区", "value": "440104" }, { "label": "海珠区", "value": "440105" }, { "label": "天河区", "value": "440106" }, { "label": "白云区", "value": "440111" }, { "label": "黄埔区", "value": "440112" }, { "label": "番禺区", "value": "440113" }, { "label": "花都区", "value": "440114" }, { "label": "南沙区", "value": "440115" }, { "label": "从化区", "value": "440117" }, { "label": "增城区", "value": "440118" }], [{ "label": "武江区", "value": "440203" }, { "label": "浈江区", "value": "440204" }, { "label": "曲江区", "value": "440205" }, { "label": "始兴县", "value": "440222" }, { "label": "仁化县", "value": "440224" }, { "label": "翁源县", "value": "440229" }, { "label": "乳源瑶族自治县", "value": "440232" }, { "label": "新丰县", "value": "440233" }, { "label": "乐昌市", "value": "440281" }, { "label": "南雄市", "value": "440282" }], [{ "label": "罗湖区", "value": "440303" }, { "label": "福田区", "value": "440304" }, { "label": "南山区", "value": "440305" }, { "label": "宝安区", "value": "440306" }, { "label": "龙岗区", "value": "440307" }, { "label": "盐田区", "value": "440308" }, { "label": "龙华区", "value": "440309" }, { "label": "坪山区", "value": "440310" }], [{ "label": "香洲区", "value": "440402" }, { "label": "斗门区", "value": "440403" }, { "label": "金湾区", "value": "440404" }], [{ "label": "龙湖区", "value": "440507" }, { "label": "金平区", "value": "440511" }, { "label": "濠江区", "value": "440512" }, { "label": "潮阳区", "value": "440513" }, { "label": "潮南区", "value": "440514" }, { "label": "澄海区", "value": "440515" }, { "label": "南澳县", "value": "440523" }], [{ "label": "禅城区", "value": "440604" }, { "label": "南海区", "value": "440605" }, { "label": "顺德区", "value": "440606" }, { "label": "三水区", "value": "440607" }, { "label": "高明区", "value": "440608" }], [{ "label": "蓬江区", "value": "440703" }, { "label": "江海区", "value": "440704" }, { "label": "新会区", "value": "440705" }, { "label": "台山市", "value": "440781" }, { "label": "开平市", "value": "440783" }, { "label": "鹤山市", "value": "440784" }, { "label": "恩平市", "value": "440785" }], [{ "label": "赤坎区", "value": "440802" }, { "label": "霞山区", "value": "440803" }, { "label": "坡头区", "value": "440804" }, { "label": "麻章区", "value": "440811" }, { "label": "遂溪县", "value": "440823" }, { "label": "徐闻县", "value": "440825" }, { "label": "廉江市", "value": "440881" }, { "label": "雷州市", "value": "440882" }, { "label": "吴川市", "value": "440883" }], [{ "label": "茂南区", "value": "440902" }, { "label": "电白区", "value": "440904" }, { "label": "高州市", "value": "440981" }, { "label": "化州市", "value": "440982" }, { "label": "信宜市", "value": "440983" }], [{ "label": "端州区", "value": "441202" }, { "label": "鼎湖区", "value": "441203" }, { "label": "高要区", "value": "441204" }, { "label": "广宁县", "value": "441223" }, { "label": "怀集县", "value": "441224" }, { "label": "封开县", "value": "441225" }, { "label": "德庆县", "value": "441226" }, { "label": "四会市", "value": "441284" }], [{ "label": "惠城区", "value": "441302" }, { "label": "惠阳区", "value": "441303" }, { "label": "博罗县", "value": "441322" }, { "label": "惠东县", "value": "441323" }, { "label": "龙门县", "value": "441324" }], [{ "label": "梅江区", "value": "441402" }, { "label": "梅县区", "value": "441403" }, { "label": "大埔县", "value": "441422" }, { "label": "丰顺县", "value": "441423" }, { "label": "五华县", "value": "441424" }, { "label": "平远县", "value": "441426" }, { "label": "蕉岭县", "value": "441427" }, { "label": "兴宁市", "value": "441481" }], [{ "label": "城区", "value": "441502" }, { "label": "海丰县", "value": "441521" }, { "label": "陆河县", "value": "441523" }, { "label": "陆丰市", "value": "441581" }], [{ "label": "源城区", "value": "441602" }, { "label": "紫金县", "value": "441621" }, { "label": "龙川县", "value": "441622" }, { "label": "连平县", "value": "441623" }, { "label": "和平县", "value": "441624" }, { "label": "东源县", "value": "441625" }], [{ "label": "江城区", "value": "441702" }, { "label": "阳东区", "value": "441704" }, { "label": "阳西县", "value": "441721" }, { "label": "阳春市", "value": "441781" }], [{ "label": "清城区", "value": "441802" }, { "label": "清新区", "value": "441803" }, { "label": "佛冈县", "value": "441821" }, { "label": "阳山县", "value": "441823" }, { "label": "连山壮族瑶族自治县", "value": "441825" }, { "label": "连南瑶族自治县", "value": "441826" }, { "label": "英德市", "value": "441881" }, { "label": "连州市", "value": "441882" }], [{ "label": "东莞市", "value": "441900" }], [{ "label": "中山市", "value": "442000" }], [{ "label": "湘桥区", "value": "445102" }, { "label": "潮安区", "value": "445103" }, { "label": "饶平县", "value": "445122" }], [{ "label": "榕城区", "value": "445202" }, { "label": "揭东区", "value": "445203" }, { "label": "揭西县", "value": "445222" }, { "label": "惠来县", "value": "445224" }, { "label": "普宁市", "value": "445281" }], [{ "label": "云城区", "value": "445302" }, { "label": "云安区", "value": "445303" }, { "label": "新兴县", "value": "445321" }, { "label": "郁南县", "value": "445322" }, { "label": "罗定市", "value": "445381" }]], [[{ "label": "兴宁区", "value": "450102" }, { "label": "青秀区", "value": "450103" }, { "label": "江南区", "value": "450105" }, { "label": "西乡塘区", "value": "450107" }, { "label": "良庆区", "value": "450108" }, { "label": "邕宁区", "value": "450109" }, { "label": "武鸣区", "value": "450110" }, { "label": "隆安县", "value": "450123" }, { "label": "马山县", "value": "450124" }, { "label": "上林县", "value": "450125" }, { "label": "宾阳县", "value": "450126" }, { "label": "横县", "value": "450127" }], [{ "label": "城中区", "value": "450202" }, { "label": "鱼峰区", "value": "450203" }, { "label": "柳南区", "value": "450204" }, { "label": "柳北区", "value": "450205" }, { "label": "柳江区", "value": "450206" }, { "label": "柳城县", "value": "450222" }, { "label": "鹿寨县", "value": "450223" }, { "label": "融安县", "value": "450224" }, { "label": "融水苗族自治县", "value": "450225" }, { "label": "三江侗族自治县", "value": "450226" }], [{ "label": "秀峰区", "value": "450302" }, { "label": "叠彩区", "value": "450303" }, { "label": "象山区", "value": "450304" }, { "label": "七星区", "value": "450305" }, { "label": "雁山区", "value": "450311" }, { "label": "临桂区", "value": "450312" }, { "label": "阳朔县", "value": "450321" }, { "label": "灵川县", "value": "450323" }, { "label": "全州县", "value": "450324" }, { "label": "兴安县", "value": "450325" }, { "label": "永福县", "value": "450326" }, { "label": "灌阳县", "value": "450327" }, { "label": "龙胜各族自治县", "value": "450328" }, { "label": "资源县", "value": "450329" }, { "label": "平乐县", "value": "450330" }, { "label": "荔浦县", "value": "450331" }, { "label": "恭城瑶族自治县", "value": "450332" }], [{ "label": "万秀区", "value": "450403" }, { "label": "长洲区", "value": "450405" }, { "label": "龙圩区", "value": "450406" }, { "label": "苍梧县", "value": "450421" }, { "label": "藤县", "value": "450422" }, { "label": "蒙山县", "value": "450423" }, { "label": "岑溪市", "value": "450481" }], [{ "label": "海城区", "value": "450502" }, { "label": "银海区", "value": "450503" }, { "label": "铁山港区", "value": "450512" }, { "label": "合浦县", "value": "450521" }], [{ "label": "港口区", "value": "450602" }, { "label": "防城区", "value": "450603" }, { "label": "上思县", "value": "450621" }, { "label": "东兴市", "value": "450681" }], [{ "label": "钦南区", "value": "450702" }, { "label": "钦北区", "value": "450703" }, { "label": "灵山县", "value": "450721" }, { "label": "浦北县", "value": "450722" }], [{ "label": "港北区", "value": "450802" }, { "label": "港南区", "value": "450803" }, { "label": "覃塘区", "value": "450804" }, { "label": "平南县", "value": "450821" }, { "label": "桂平市", "value": "450881" }], [{ "label": "玉州区", "value": "450902" }, { "label": "福绵区", "value": "450903" }, { "label": "容县", "value": "450921" }, { "label": "陆川县", "value": "450922" }, { "label": "博白县", "value": "450923" }, { "label": "兴业县", "value": "450924" }, { "label": "北流市", "value": "450981" }], [{ "label": "右江区", "value": "451002" }, { "label": "田阳县", "value": "451021" }, { "label": "田东县", "value": "451022" }, { "label": "平果县", "value": "451023" }, { "label": "德保县", "value": "451024" }, { "label": "那坡县", "value": "451026" }, { "label": "凌云县", "value": "451027" }, { "label": "乐业县", "value": "451028" }, { "label": "田林县", "value": "451029" }, { "label": "西林县", "value": "451030" }, { "label": "隆林各族自治县", "value": "451031" }, { "label": "靖西市", "value": "451081" }], [{ "label": "八步区", "value": "451102" }, { "label": "平桂区", "value": "451103" }, { "label": "昭平县", "value": "451121" }, { "label": "钟山县", "value": "451122" }, { "label": "富川瑶族自治县", "value": "451123" }], [{ "label": "金城江区", "value": "451202" }, { "label": "宜州区", "value": "451203" }, { "label": "南丹县", "value": "451221" }, { "label": "天峨县", "value": "451222" }, { "label": "凤山县", "value": "451223" }, { "label": "东兰县", "value": "451224" }, { "label": "罗城仫佬族自治县", "value": "451225" }, { "label": "环江毛南族自治县", "value": "451226" }, { "label": "巴马瑶族自治县", "value": "451227" }, { "label": "都安瑶族自治县", "value": "451228" }, { "label": "大化瑶族自治县", "value": "451229" }], [{ "label": "兴宾区", "value": "451302" }, { "label": "忻城县", "value": "451321" }, { "label": "象州县", "value": "451322" }, { "label": "武宣县", "value": "451323" }, { "label": "金秀瑶族自治县", "value": "451324" }, { "label": "合山市", "value": "451381" }], [{ "label": "江州区", "value": "451402" }, { "label": "扶绥县", "value": "451421" }, { "label": "宁明县", "value": "451422" }, { "label": "龙州县", "value": "451423" }, { "label": "大新县", "value": "451424" }, { "label": "天等县", "value": "451425" }, { "label": "凭祥市", "value": "451481" }]], [[{ "label": "秀英区", "value": "460105" }, { "label": "龙华区", "value": "460106" }, { "label": "琼山区", "value": "460107" }, { "label": "美兰区", "value": "460108" }], [{ "label": "海棠区", "value": "460202" }, { "label": "吉阳区", "value": "460203" }, { "label": "天涯区", "value": "460204" }, { "label": "崖州区", "value": "460205" }], [{ "label": "西沙群岛", "value": "460321" }, { "label": "南沙群岛", "value": "460322" }, { "label": "中沙群岛的岛礁及其海域", "value": "460323" }], [{ "label": "儋州市", "value": "460400" }], [{ "label": "五指山市", "value": "469001" }, { "label": "琼海市", "value": "469002" }, { "label": "文昌市", "value": "469005" }, { "label": "万宁市", "value": "469006" }, { "label": "东方市", "value": "469007" }, { "label": "定安县", "value": "469021" }, { "label": "屯昌县", "value": "469022" }, { "label": "澄迈县", "value": "469023" }, { "label": "临高县", "value": "469024" }, { "label": "白沙黎族自治县", "value": "469025" }, { "label": "昌江黎族自治县", "value": "469026" }, { "label": "乐东黎族自治县", "value": "469027" }, { "label": "陵水黎族自治县", "value": "469028" }, { "label": "保亭黎族苗族自治县", "value": "469029" }, { "label": "琼中黎族苗族自治县", "value": "469030" }]], [[{ "label": "万州区", "value": "500101" }, { "label": "涪陵区", "value": "500102" }, { "label": "渝中区", "value": "500103" }, { "label": "大渡口区", "value": "500104" }, { "label": "江北区", "value": "500105" }, { "label": "沙坪坝区", "value": "500106" }, { "label": "九龙坡区", "value": "500107" }, { "label": "南岸区", "value": "500108" }, { "label": "北碚区", "value": "500109" }, { "label": "綦江区", "value": "500110" }, { "label": "大足区", "value": "500111" }, { "label": "渝北区", "value": "500112" }, { "label": "巴南区", "value": "500113" }, { "label": "黔江区", "value": "500114" }, { "label": "长寿区", "value": "500115" }, { "label": "江津区", "value": "500116" }, { "label": "合川区", "value": "500117" }, { "label": "永川区", "value": "500118" }, { "label": "南川区", "value": "500119" }, { "label": "璧山区", "value": "500120" }, { "label": "铜梁区", "value": "500151" }, { "label": "潼南区", "value": "500152" }, { "label": "荣昌区", "value": "500153" }, { "label": "开州区", "value": "500154" }, { "label": "梁平区", "value": "500155" }, { "label": "武隆区", "value": "500156" }], [{ "label": "城口县", "value": "500229" }, { "label": "丰都县", "value": "500230" }, { "label": "垫江县", "value": "500231" }, { "label": "忠县", "value": "500233" }, { "label": "云阳县", "value": "500235" }, { "label": "奉节县", "value": "500236" }, { "label": "巫山县", "value": "500237" }, { "label": "巫溪县", "value": "500238" }, { "label": "石柱土家族自治县", "value": "500240" }, { "label": "秀山土家族苗族自治县", "value": "500241" }, { "label": "酉阳土家族苗族自治县", "value": "500242" }, { "label": "彭水苗族土家族自治县", "value": "500243" }]], [[{ "label": "锦江区", "value": "510104" }, { "label": "青羊区", "value": "510105" }, { "label": "金牛区", "value": "510106" }, { "label": "武侯区", "value": "510107" }, { "label": "成华区", "value": "510108" }, { "label": "龙泉驿区", "value": "510112" }, { "label": "青白江区", "value": "510113" }, { "label": "新都区", "value": "510114" }, { "label": "温江区", "value": "510115" }, { "label": "双流区", "value": "510116" }, { "label": "郫都区", "value": "510117" }, { "label": "金堂县", "value": "510121" }, { "label": "大邑县", "value": "510129" }, { "label": "蒲江县", "value": "510131" }, { "label": "新津县", "value": "510132" }, { "label": "都江堰市", "value": "510181" }, { "label": "彭州市", "value": "510182" }, { "label": "邛崃市", "value": "510183" }, { "label": "崇州市", "value": "510184" }, { "label": "简阳市", "value": "510185" }], [{ "label": "自流井区", "value": "510302" }, { "label": "贡井区", "value": "510303" }, { "label": "大安区", "value": "510304" }, { "label": "沿滩区", "value": "510311" }, { "label": "荣县", "value": "510321" }, { "label": "富顺县", "value": "510322" }], [{ "label": "东区", "value": "510402" }, { "label": "西区", "value": "510403" }, { "label": "仁和区", "value": "510411" }, { "label": "米易县", "value": "510421" }, { "label": "盐边县", "value": "510422" }], [{ "label": "江阳区", "value": "510502" }, { "label": "纳溪区", "value": "510503" }, { "label": "龙马潭区", "value": "510504" }, { "label": "泸县", "value": "510521" }, { "label": "合江县", "value": "510522" }, { "label": "叙永县", "value": "510524" }, { "label": "古蔺县", "value": "510525" }], [{ "label": "旌阳区", "value": "510603" }, { "label": "罗江区", "value": "510604" }, { "label": "中江县", "value": "510623" }, { "label": "广汉市", "value": "510681" }, { "label": "什邡市", "value": "510682" }, { "label": "绵竹市", "value": "510683" }], [{ "label": "涪城区", "value": "510703" }, { "label": "游仙区", "value": "510704" }, { "label": "安州区", "value": "510705" }, { "label": "三台县", "value": "510722" }, { "label": "盐亭县", "value": "510723" }, { "label": "梓潼县", "value": "510725" }, { "label": "北川羌族自治县", "value": "510726" }, { "label": "平武县", "value": "510727" }, { "label": "江油市", "value": "510781" }], [{ "label": "利州区", "value": "510802" }, { "label": "昭化区", "value": "510811" }, { "label": "朝天区", "value": "510812" }, { "label": "旺苍县", "value": "510821" }, { "label": "青川县", "value": "510822" }, { "label": "剑阁县", "value": "510823" }, { "label": "苍溪县", "value": "510824" }], [{ "label": "船山区", "value": "510903" }, { "label": "安居区", "value": "510904" }, { "label": "蓬溪县", "value": "510921" }, { "label": "射洪县", "value": "510922" }, { "label": "大英县", "value": "510923" }], [{ "label": "市中区", "value": "511002" }, { "label": "东兴区", "value": "511011" }, { "label": "威远县", "value": "511024" }, { "label": "资中县", "value": "511025" }, { "label": "内江经济开发区", "value": "511071" }, { "label": "隆昌市", "value": "511083" }], [{ "label": "市中区", "value": "511102" }, { "label": "沙湾区", "value": "511111" }, { "label": "五通桥区", "value": "511112" }, { "label": "金口河区", "value": "511113" }, { "label": "犍为县", "value": "511123" }, { "label": "井研县", "value": "511124" }, { "label": "夹江县", "value": "511126" }, { "label": "沐川县", "value": "511129" }, { "label": "峨边彝族自治县", "value": "511132" }, { "label": "马边彝族自治县", "value": "511133" }, { "label": "峨眉山市", "value": "511181" }], [{ "label": "顺庆区", "value": "511302" }, { "label": "高坪区", "value": "511303" }, { "label": "嘉陵区", "value": "511304" }, { "label": "南部县", "value": "511321" }, { "label": "营山县", "value": "511322" }, { "label": "蓬安县", "value": "511323" }, { "label": "仪陇县", "value": "511324" }, { "label": "西充县", "value": "511325" }, { "label": "阆中市", "value": "511381" }], [{ "label": "东坡区", "value": "511402" }, { "label": "彭山区", "value": "511403" }, { "label": "仁寿县", "value": "511421" }, { "label": "洪雅县", "value": "511423" }, { "label": "丹棱县", "value": "511424" }, { "label": "青神县", "value": "511425" }], [{ "label": "翠屏区", "value": "511502" }, { "label": "南溪区", "value": "511503" }, { "label": "宜宾县", "value": "511521" }, { "label": "江安县", "value": "511523" }, { "label": "长宁县", "value": "511524" }, { "label": "高县", "value": "511525" }, { "label": "珙县", "value": "511526" }, { "label": "筠连县", "value": "511527" }, { "label": "兴文县", "value": "511528" }, { "label": "屏山县", "value": "511529" }], [{ "label": "广安区", "value": "511602" }, { "label": "前锋区", "value": "511603" }, { "label": "岳池县", "value": "511621" }, { "label": "武胜县", "value": "511622" }, { "label": "邻水县", "value": "511623" }, { "label": "华蓥市", "value": "511681" }], [{ "label": "通川区", "value": "511702" }, { "label": "达川区", "value": "511703" }, { "label": "宣汉县", "value": "511722" }, { "label": "开江县", "value": "511723" }, { "label": "大竹县", "value": "511724" }, { "label": "渠县", "value": "511725" }, { "label": "达州经济开发区", "value": "511771" }, { "label": "万源市", "value": "511781" }], [{ "label": "雨城区", "value": "511802" }, { "label": "名山区", "value": "511803" }, { "label": "荥经县", "value": "511822" }, { "label": "汉源县", "value": "511823" }, { "label": "石棉县", "value": "511824" }, { "label": "天全县", "value": "511825" }, { "label": "芦山县", "value": "511826" }, { "label": "宝兴县", "value": "511827" }], [{ "label": "巴州区", "value": "511902" }, { "label": "恩阳区", "value": "511903" }, { "label": "通江县", "value": "511921" }, { "label": "南江县", "value": "511922" }, { "label": "平昌县", "value": "511923" }, { "label": "巴中经济开发区", "value": "511971" }], [{ "label": "雁江区", "value": "512002" }, { "label": "安岳县", "value": "512021" }, { "label": "乐至县", "value": "512022" }], [{ "label": "马尔康市", "value": "513201" }, { "label": "汶川县", "value": "513221" }, { "label": "理县", "value": "513222" }, { "label": "茂县", "value": "513223" }, { "label": "松潘县", "value": "513224" }, { "label": "九寨沟县", "value": "513225" }, { "label": "金川县", "value": "513226" }, { "label": "小金县", "value": "513227" }, { "label": "黑水县", "value": "513228" }, { "label": "壤塘县", "value": "513230" }, { "label": "阿坝县", "value": "513231" }, { "label": "若尔盖县", "value": "513232" }, { "label": "红原县", "value": "513233" }], [{ "label": "康定市", "value": "513301" }, { "label": "泸定县", "value": "513322" }, { "label": "丹巴县", "value": "513323" }, { "label": "九龙县", "value": "513324" }, { "label": "雅江县", "value": "513325" }, { "label": "道孚县", "value": "513326" }, { "label": "炉霍县", "value": "513327" }, { "label": "甘孜县", "value": "513328" }, { "label": "新龙县", "value": "513329" }, { "label": "德格县", "value": "513330" }, { "label": "白玉县", "value": "513331" }, { "label": "石渠县", "value": "513332" }, { "label": "色达县", "value": "513333" }, { "label": "理塘县", "value": "513334" }, { "label": "巴塘县", "value": "513335" }, { "label": "乡城县", "value": "513336" }, { "label": "稻城县", "value": "513337" }, { "label": "得荣县", "value": "513338" }], [{ "label": "西昌市", "value": "513401" }, { "label": "木里藏族自治县", "value": "513422" }, { "label": "盐源县", "value": "513423" }, { "label": "德昌县", "value": "513424" }, { "label": "会理县", "value": "513425" }, { "label": "会东县", "value": "513426" }, { "label": "宁南县", "value": "513427" }, { "label": "普格县", "value": "513428" }, { "label": "布拖县", "value": "513429" }, { "label": "金阳县", "value": "513430" }, { "label": "昭觉县", "value": "513431" }, { "label": "喜德县", "value": "513432" }, { "label": "冕宁县", "value": "513433" }, { "label": "越西县", "value": "513434" }, { "label": "甘洛县", "value": "513435" }, { "label": "美姑县", "value": "513436" }, { "label": "雷波县", "value": "513437" }]], [[{ "label": "南明区", "value": "520102" }, { "label": "云岩区", "value": "520103" }, { "label": "花溪区", "value": "520111" }, { "label": "乌当区", "value": "520112" }, { "label": "白云区", "value": "520113" }, { "label": "观山湖区", "value": "520115" }, { "label": "开阳县", "value": "520121" }, { "label": "息烽县", "value": "520122" }, { "label": "修文县", "value": "520123" }, { "label": "清镇市", "value": "520181" }], [{ "label": "钟山区", "value": "520201" }, { "label": "六枝特区", "value": "520203" }, { "label": "水城县", "value": "520221" }, { "label": "盘州市", "value": "520281" }], [{ "label": "红花岗区", "value": "520302" }, { "label": "汇川区", "value": "520303" }, { "label": "播州区", "value": "520304" }, { "label": "桐梓县", "value": "520322" }, { "label": "绥阳县", "value": "520323" }, { "label": "正安县", "value": "520324" }, { "label": "道真仡佬族苗族自治县", "value": "520325" }, { "label": "务川仡佬族苗族自治县", "value": "520326" }, { "label": "凤冈县", "value": "520327" }, { "label": "湄潭县", "value": "520328" }, { "label": "余庆县", "value": "520329" }, { "label": "习水县", "value": "520330" }, { "label": "赤水市", "value": "520381" }, { "label": "仁怀市", "value": "520382" }], [{ "label": "西秀区", "value": "520402" }, { "label": "平坝区", "value": "520403" }, { "label": "普定县", "value": "520422" }, { "label": "镇宁布依族苗族自治县", "value": "520423" }, { "label": "关岭布依族苗族自治县", "value": "520424" }, { "label": "紫云苗族布依族自治县", "value": "520425" }], [{ "label": "七星关区", "value": "520502" }, { "label": "大方县", "value": "520521" }, { "label": "黔西县", "value": "520522" }, { "label": "金沙县", "value": "520523" }, { "label": "织金县", "value": "520524" }, { "label": "纳雍县", "value": "520525" }, { "label": "威宁彝族回族苗族自治县", "value": "520526" }, { "label": "赫章县", "value": "520527" }], [{ "label": "碧江区", "value": "520602" }, { "label": "万山区", "value": "520603" }, { "label": "江口县", "value": "520621" }, { "label": "玉屏侗族自治县", "value": "520622" }, { "label": "石阡县", "value": "520623" }, { "label": "思南县", "value": "520624" }, { "label": "印江土家族苗族自治县", "value": "520625" }, { "label": "德江县", "value": "520626" }, { "label": "沿河土家族自治县", "value": "520627" }, { "label": "松桃苗族自治县", "value": "520628" }], [{ "label": "兴义市", "value": "522301" }, { "label": "兴仁县", "value": "522322" }, { "label": "普安县", "value": "522323" }, { "label": "晴隆县", "value": "522324" }, { "label": "贞丰县", "value": "522325" }, { "label": "望谟县", "value": "522326" }, { "label": "册亨县", "value": "522327" }, { "label": "安龙县", "value": "522328" }], [{ "label": "凯里市", "value": "522601" }, { "label": "黄平县", "value": "522622" }, { "label": "施秉县", "value": "522623" }, { "label": "三穗县", "value": "522624" }, { "label": "镇远县", "value": "522625" }, { "label": "岑巩县", "value": "522626" }, { "label": "天柱县", "value": "522627" }, { "label": "锦屏县", "value": "522628" }, { "label": "剑河县", "value": "522629" }, { "label": "台江县", "value": "522630" }, { "label": "黎平县", "value": "522631" }, { "label": "榕江县", "value": "522632" }, { "label": "从江县", "value": "522633" }, { "label": "雷山县", "value": "522634" }, { "label": "麻江县", "value": "522635" }, { "label": "丹寨县", "value": "522636" }], [{ "label": "都匀市", "value": "522701" }, { "label": "福泉市", "value": "522702" }, { "label": "荔波县", "value": "522722" }, { "label": "贵定县", "value": "522723" }, { "label": "瓮安县", "value": "522725" }, { "label": "独山县", "value": "522726" }, { "label": "平塘县", "value": "522727" }, { "label": "罗甸县", "value": "522728" }, { "label": "长顺县", "value": "522729" }, { "label": "龙里县", "value": "522730" }, { "label": "惠水县", "value": "522731" }, { "label": "三都水族自治县", "value": "522732" }]], [[{ "label": "五华区", "value": "530102" }, { "label": "盘龙区", "value": "530103" }, { "label": "官渡区", "value": "530111" }, { "label": "西山区", "value": "530112" }, { "label": "东川区", "value": "530113" }, { "label": "呈贡区", "value": "530114" }, { "label": "晋宁区", "value": "530115" }, { "label": "富民县", "value": "530124" }, { "label": "宜良县", "value": "530125" }, { "label": "石林彝族自治县", "value": "530126" }, { "label": "嵩明县", "value": "530127" }, { "label": "禄劝彝族苗族自治县", "value": "530128" }, { "label": "寻甸回族彝族自治县", "value": "530129" }, { "label": "安宁市", "value": "530181" }], [{ "label": "麒麟区", "value": "530302" }, { "label": "沾益区", "value": "530303" }, { "label": "马龙县", "value": "530321" }, { "label": "陆良县", "value": "530322" }, { "label": "师宗县", "value": "530323" }, { "label": "罗平县", "value": "530324" }, { "label": "富源县", "value": "530325" }, { "label": "会泽县", "value": "530326" }, { "label": "宣威市", "value": "530381" }], [{ "label": "红塔区", "value": "530402" }, { "label": "江川区", "value": "530403" }, { "label": "澄江县", "value": "530422" }, { "label": "通海县", "value": "530423" }, { "label": "华宁县", "value": "530424" }, { "label": "易门县", "value": "530425" }, { "label": "峨山彝族自治县", "value": "530426" }, { "label": "新平彝族傣族自治县", "value": "530427" }, { "label": "元江哈尼族彝族傣族自治县", "value": "530428" }], [{ "label": "隆阳区", "value": "530502" }, { "label": "施甸县", "value": "530521" }, { "label": "龙陵县", "value": "530523" }, { "label": "昌宁县", "value": "530524" }, { "label": "腾冲市", "value": "530581" }], [{ "label": "昭阳区", "value": "530602" }, { "label": "鲁甸县", "value": "530621" }, { "label": "巧家县", "value": "530622" }, { "label": "盐津县", "value": "530623" }, { "label": "大关县", "value": "530624" }, { "label": "永善县", "value": "530625" }, { "label": "绥江县", "value": "530626" }, { "label": "镇雄县", "value": "530627" }, { "label": "彝良县", "value": "530628" }, { "label": "威信县", "value": "530629" }, { "label": "水富县", "value": "530630" }], [{ "label": "古城区", "value": "530702" }, { "label": "玉龙纳西族自治县", "value": "530721" }, { "label": "永胜县", "value": "530722" }, { "label": "华坪县", "value": "530723" }, { "label": "宁蒗彝族自治县", "value": "530724" }], [{ "label": "思茅区", "value": "530802" }, { "label": "宁洱哈尼族彝族自治县", "value": "530821" }, { "label": "墨江哈尼族自治县", "value": "530822" }, { "label": "景东彝族自治县", "value": "530823" }, { "label": "景谷傣族彝族自治县", "value": "530824" }, { "label": "镇沅彝族哈尼族拉祜族自治县", "value": "530825" }, { "label": "江城哈尼族彝族自治县", "value": "530826" }, { "label": "孟连傣族拉祜族佤族自治县", "value": "530827" }, { "label": "澜沧拉祜族自治县", "value": "530828" }, { "label": "西盟佤族自治县", "value": "530829" }], [{ "label": "临翔区", "value": "530902" }, { "label": "凤庆县", "value": "530921" }, { "label": "云县", "value": "530922" }, { "label": "永德县", "value": "530923" }, { "label": "镇康县", "value": "530924" }, { "label": "双江拉祜族佤族布朗族傣族自治县", "value": "530925" }, { "label": "耿马傣族佤族自治县", "value": "530926" }, { "label": "沧源佤族自治县", "value": "530927" }], [{ "label": "楚雄市", "value": "532301" }, { "label": "双柏县", "value": "532322" }, { "label": "牟定县", "value": "532323" }, { "label": "南华县", "value": "532324" }, { "label": "姚安县", "value": "532325" }, { "label": "大姚县", "value": "532326" }, { "label": "永仁县", "value": "532327" }, { "label": "元谋县", "value": "532328" }, { "label": "武定县", "value": "532329" }, { "label": "禄丰县", "value": "532331" }], [{ "label": "个旧市", "value": "532501" }, { "label": "开远市", "value": "532502" }, { "label": "蒙自市", "value": "532503" }, { "label": "弥勒市", "value": "532504" }, { "label": "屏边苗族自治县", "value": "532523" }, { "label": "建水县", "value": "532524" }, { "label": "石屏县", "value": "532525" }, { "label": "泸西县", "value": "532527" }, { "label": "元阳县", "value": "532528" }, { "label": "红河县", "value": "532529" }, { "label": "金平苗族瑶族傣族自治县", "value": "532530" }, { "label": "绿春县", "value": "532531" }, { "label": "河口瑶族自治县", "value": "532532" }], [{ "label": "文山市", "value": "532601" }, { "label": "砚山县", "value": "532622" }, { "label": "西畴县", "value": "532623" }, { "label": "麻栗坡县", "value": "532624" }, { "label": "马关县", "value": "532625" }, { "label": "丘北县", "value": "532626" }, { "label": "广南县", "value": "532627" }, { "label": "富宁县", "value": "532628" }], [{ "label": "景洪市", "value": "532801" }, { "label": "勐海县", "value": "532822" }, { "label": "勐腊县", "value": "532823" }], [{ "label": "大理市", "value": "532901" }, { "label": "漾濞彝族自治县", "value": "532922" }, { "label": "祥云县", "value": "532923" }, { "label": "宾川县", "value": "532924" }, { "label": "弥渡县", "value": "532925" }, { "label": "南涧彝族自治县", "value": "532926" }, { "label": "巍山彝族回族自治县", "value": "532927" }, { "label": "永平县", "value": "532928" }, { "label": "云龙县", "value": "532929" }, { "label": "洱源县", "value": "532930" }, { "label": "剑川县", "value": "532931" }, { "label": "鹤庆县", "value": "532932" }], [{ "label": "瑞丽市", "value": "533102" }, { "label": "芒市", "value": "533103" }, { "label": "梁河县", "value": "533122" }, { "label": "盈江县", "value": "533123" }, { "label": "陇川县", "value": "533124" }], [{ "label": "泸水市", "value": "533301" }, { "label": "福贡县", "value": "533323" }, { "label": "贡山独龙族怒族自治县", "value": "533324" }, { "label": "兰坪白族普米族自治县", "value": "533325" }], [{ "label": "香格里拉市", "value": "533401" }, { "label": "德钦县", "value": "533422" }, { "label": "维西傈僳族自治县", "value": "533423" }]], [[{ "label": "城关区", "value": "540102" }, { "label": "堆龙德庆区", "value": "540103" }, { "label": "林周县", "value": "540121" }, { "label": "当雄县", "value": "540122" }, { "label": "尼木县", "value": "540123" }, { "label": "曲水县", "value": "540124" }, { "label": "达孜县", "value": "540126" }, { "label": "墨竹工卡县", "value": "540127" }, { "label": "格尔木藏青工业园区", "value": "540171" }, { "label": "拉萨经济技术开发区", "value": "540172" }, { "label": "西藏文化旅游创意园区", "value": "540173" }, { "label": "达孜工业园区", "value": "540174" }], [{ "label": "桑珠孜区", "value": "540202" }, { "label": "南木林县", "value": "540221" }, { "label": "江孜县", "value": "540222" }, { "label": "定日县", "value": "540223" }, { "label": "萨迦县", "value": "540224" }, { "label": "拉孜县", "value": "540225" }, { "label": "昂仁县", "value": "540226" }, { "label": "谢通门县", "value": "540227" }, { "label": "白朗县", "value": "540228" }, { "label": "仁布县", "value": "540229" }, { "label": "康马县", "value": "540230" }, { "label": "定结县", "value": "540231" }, { "label": "仲巴县", "value": "540232" }, { "label": "亚东县", "value": "540233" }, { "label": "吉隆县", "value": "540234" }, { "label": "聂拉木县", "value": "540235" }, { "label": "萨嘎县", "value": "540236" }, { "label": "岗巴县", "value": "540237" }], [{ "label": "卡若区", "value": "540302" }, { "label": "江达县", "value": "540321" }, { "label": "贡觉县", "value": "540322" }, { "label": "类乌齐县", "value": "540323" }, { "label": "丁青县", "value": "540324" }, { "label": "察雅县", "value": "540325" }, { "label": "八宿县", "value": "540326" }, { "label": "左贡县", "value": "540327" }, { "label": "芒康县", "value": "540328" }, { "label": "洛隆县", "value": "540329" }, { "label": "边坝县", "value": "540330" }], [{ "label": "巴宜区", "value": "540402" }, { "label": "工布江达县", "value": "540421" }, { "label": "米林县", "value": "540422" }, { "label": "墨脱县", "value": "540423" }, { "label": "波密县", "value": "540424" }, { "label": "察隅县", "value": "540425" }, { "label": "朗县", "value": "540426" }], [{ "label": "乃东区", "value": "540502" }, { "label": "扎囊县", "value": "540521" }, { "label": "贡嘎县", "value": "540522" }, { "label": "桑日县", "value": "540523" }, { "label": "琼结县", "value": "540524" }, { "label": "曲松县", "value": "540525" }, { "label": "措美县", "value": "540526" }, { "label": "洛扎县", "value": "540527" }, { "label": "加查县", "value": "540528" }, { "label": "隆子县", "value": "540529" }, { "label": "错那县", "value": "540530" }, { "label": "浪卡子县", "value": "540531" }], [{ "label": "那曲县", "value": "542421" }, { "label": "嘉黎县", "value": "542422" }, { "label": "比如县", "value": "542423" }, { "label": "聂荣县", "value": "542424" }, { "label": "安多县", "value": "542425" }, { "label": "申扎县", "value": "542426" }, { "label": "索县", "value": "542427" }, { "label": "班戈县", "value": "542428" }, { "label": "巴青县", "value": "542429" }, { "label": "尼玛县", "value": "542430" }, { "label": "双湖县", "value": "542431" }], [{ "label": "普兰县", "value": "542521" }, { "label": "札达县", "value": "542522" }, { "label": "噶尔县", "value": "542523" }, { "label": "日土县", "value": "542524" }, { "label": "革吉县", "value": "542525" }, { "label": "改则县", "value": "542526" }, { "label": "措勤县", "value": "542527" }]], [[{ "label": "新城区", "value": "610102" }, { "label": "碑林区", "value": "610103" }, { "label": "莲湖区", "value": "610104" }, { "label": "灞桥区", "value": "610111" }, { "label": "未央区", "value": "610112" }, { "label": "雁塔区", "value": "610113" }, { "label": "阎良区", "value": "610114" }, { "label": "临潼区", "value": "610115" }, { "label": "长安区", "value": "610116" }, { "label": "高陵区", "value": "610117" }, { "label": "鄠邑区", "value": "610118" }, { "label": "蓝田县", "value": "610122" }, { "label": "周至县", "value": "610124" }], [{ "label": "王益区", "value": "610202" }, { "label": "印台区", "value": "610203" }, { "label": "耀州区", "value": "610204" }, { "label": "宜君县", "value": "610222" }], [{ "label": "渭滨区", "value": "610302" }, { "label": "金台区", "value": "610303" }, { "label": "陈仓区", "value": "610304" }, { "label": "凤翔县", "value": "610322" }, { "label": "岐山县", "value": "610323" }, { "label": "扶风县", "value": "610324" }, { "label": "眉县", "value": "610326" }, { "label": "陇县", "value": "610327" }, { "label": "千阳县", "value": "610328" }, { "label": "麟游县", "value": "610329" }, { "label": "凤县", "value": "610330" }, { "label": "太白县", "value": "610331" }], [{ "label": "秦都区", "value": "610402" }, { "label": "杨陵区", "value": "610403" }, { "label": "渭城区", "value": "610404" }, { "label": "三原县", "value": "610422" }, { "label": "泾阳县", "value": "610423" }, { "label": "乾县", "value": "610424" }, { "label": "礼泉县", "value": "610425" }, { "label": "永寿县", "value": "610426" }, { "label": "彬县", "value": "610427" }, { "label": "长武县", "value": "610428" }, { "label": "旬邑县", "value": "610429" }, { "label": "淳化县", "value": "610430" }, { "label": "武功县", "value": "610431" }, { "label": "兴平市", "value": "610481" }], [{ "label": "临渭区", "value": "610502" }, { "label": "华州区", "value": "610503" }, { "label": "潼关县", "value": "610522" }, { "label": "大荔县", "value": "610523" }, { "label": "合阳县", "value": "610524" }, { "label": "澄城县", "value": "610525" }, { "label": "蒲城县", "value": "610526" }, { "label": "白水县", "value": "610527" }, { "label": "富平县", "value": "610528" }, { "label": "韩城市", "value": "610581" }, { "label": "华阴市", "value": "610582" }], [{ "label": "宝塔区", "value": "610602" }, { "label": "安塞区", "value": "610603" }, { "label": "延长县", "value": "610621" }, { "label": "延川县", "value": "610622" }, { "label": "子长县", "value": "610623" }, { "label": "志丹县", "value": "610625" }, { "label": "吴起县", "value": "610626" }, { "label": "甘泉县", "value": "610627" }, { "label": "富县", "value": "610628" }, { "label": "洛川县", "value": "610629" }, { "label": "宜川县", "value": "610630" }, { "label": "黄龙县", "value": "610631" }, { "label": "黄陵县", "value": "610632" }], [{ "label": "汉台区", "value": "610702" }, { "label": "南郑区", "value": "610703" }, { "label": "城固县", "value": "610722" }, { "label": "洋县", "value": "610723" }, { "label": "西乡县", "value": "610724" }, { "label": "勉县", "value": "610725" }, { "label": "宁强县", "value": "610726" }, { "label": "略阳县", "value": "610727" }, { "label": "镇巴县", "value": "610728" }, { "label": "留坝县", "value": "610729" }, { "label": "佛坪县", "value": "610730" }], [{ "label": "榆阳区", "value": "610802" }, { "label": "横山区", "value": "610803" }, { "label": "府谷县", "value": "610822" }, { "label": "靖边县", "value": "610824" }, { "label": "定边县", "value": "610825" }, { "label": "绥德县", "value": "610826" }, { "label": "米脂县", "value": "610827" }, { "label": "佳县", "value": "610828" }, { "label": "吴堡县", "value": "610829" }, { "label": "清涧县", "value": "610830" }, { "label": "子洲县", "value": "610831" }, { "label": "神木市", "value": "610881" }], [{ "label": "汉滨区", "value": "610902" }, { "label": "汉阴县", "value": "610921" }, { "label": "石泉县", "value": "610922" }, { "label": "宁陕县", "value": "610923" }, { "label": "紫阳县", "value": "610924" }, { "label": "岚皋县", "value": "610925" }, { "label": "平利县", "value": "610926" }, { "label": "镇坪县", "value": "610927" }, { "label": "旬阳县", "value": "610928" }, { "label": "白河县", "value": "610929" }], [{ "label": "商州区", "value": "611002" }, { "label": "洛南县", "value": "611021" }, { "label": "丹凤县", "value": "611022" }, { "label": "商南县", "value": "611023" }, { "label": "山阳县", "value": "611024" }, { "label": "镇安县", "value": "611025" }, { "label": "柞水县", "value": "611026" }]], [[{ "label": "城关区", "value": "620102" }, { "label": "七里河区", "value": "620103" }, { "label": "西固区", "value": "620104" }, { "label": "安宁区", "value": "620105" }, { "label": "红古区", "value": "620111" }, { "label": "永登县", "value": "620121" }, { "label": "皋兰县", "value": "620122" }, { "label": "榆中县", "value": "620123" }, { "label": "兰州新区", "value": "620171" }], [{ "label": "嘉峪关市", "value": "620201" }], [{ "label": "金川区", "value": "620302" }, { "label": "永昌县", "value": "620321" }], [{ "label": "白银区", "value": "620402" }, { "label": "平川区", "value": "620403" }, { "label": "靖远县", "value": "620421" }, { "label": "会宁县", "value": "620422" }, { "label": "景泰县", "value": "620423" }], [{ "label": "秦州区", "value": "620502" }, { "label": "麦积区", "value": "620503" }, { "label": "清水县", "value": "620521" }, { "label": "秦安县", "value": "620522" }, { "label": "甘谷县", "value": "620523" }, { "label": "武山县", "value": "620524" }, { "label": "张家川回族自治县", "value": "620525" }], [{ "label": "凉州区", "value": "620602" }, { "label": "民勤县", "value": "620621" }, { "label": "古浪县", "value": "620622" }, { "label": "天祝藏族自治县", "value": "620623" }], [{ "label": "甘州区", "value": "620702" }, { "label": "肃南裕固族自治县", "value": "620721" }, { "label": "民乐县", "value": "620722" }, { "label": "临泽县", "value": "620723" }, { "label": "高台县", "value": "620724" }, { "label": "山丹县", "value": "620725" }], [{ "label": "崆峒区", "value": "620802" }, { "label": "泾川县", "value": "620821" }, { "label": "灵台县", "value": "620822" }, { "label": "崇信县", "value": "620823" }, { "label": "华亭县", "value": "620824" }, { "label": "庄浪县", "value": "620825" }, { "label": "静宁县", "value": "620826" }, { "label": "平凉工业园区", "value": "620871" }], [{ "label": "肃州区", "value": "620902" }, { "label": "金塔县", "value": "620921" }, { "label": "瓜州县", "value": "620922" }, { "label": "肃北蒙古族自治县", "value": "620923" }, { "label": "阿克塞哈萨克族自治县", "value": "620924" }, { "label": "玉门市", "value": "620981" }, { "label": "敦煌市", "value": "620982" }], [{ "label": "西峰区", "value": "621002" }, { "label": "庆城县", "value": "621021" }, { "label": "环县", "value": "621022" }, { "label": "华池县", "value": "621023" }, { "label": "合水县", "value": "621024" }, { "label": "正宁县", "value": "621025" }, { "label": "宁县", "value": "621026" }, { "label": "镇原县", "value": "621027" }], [{ "label": "安定区", "value": "621102" }, { "label": "通渭县", "value": "621121" }, { "label": "陇西县", "value": "621122" }, { "label": "渭源县", "value": "621123" }, { "label": "临洮县", "value": "621124" }, { "label": "漳县", "value": "621125" }, { "label": "岷县", "value": "621126" }], [{ "label": "武都区", "value": "621202" }, { "label": "成县", "value": "621221" }, { "label": "文县", "value": "621222" }, { "label": "宕昌县", "value": "621223" }, { "label": "康县", "value": "621224" }, { "label": "西和县", "value": "621225" }, { "label": "礼县", "value": "621226" }, { "label": "徽县", "value": "621227" }, { "label": "两当县", "value": "621228" }], [{ "label": "临夏市", "value": "622901" }, { "label": "临夏县", "value": "622921" }, { "label": "康乐县", "value": "622922" }, { "label": "永靖县", "value": "622923" }, { "label": "广河县", "value": "622924" }, { "label": "和政县", "value": "622925" }, { "label": "东乡族自治县", "value": "622926" }, { "label": "积石山保安族东乡族撒拉族自治县", "value": "622927" }], [{ "label": "合作市", "value": "623001" }, { "label": "临潭县", "value": "623021" }, { "label": "卓尼县", "value": "623022" }, { "label": "舟曲县", "value": "623023" }, { "label": "迭部县", "value": "623024" }, { "label": "玛曲县", "value": "623025" }, { "label": "碌曲县", "value": "623026" }, { "label": "夏河县", "value": "623027" }]], [[{ "label": "城东区", "value": "630102" }, { "label": "城中区", "value": "630103" }, { "label": "城西区", "value": "630104" }, { "label": "城北区", "value": "630105" }, { "label": "大通回族土族自治县", "value": "630121" }, { "label": "湟中县", "value": "630122" }, { "label": "湟源县", "value": "630123" }], [{ "label": "乐都区", "value": "630202" }, { "label": "平安区", "value": "630203" }, { "label": "民和回族土族自治县", "value": "630222" }, { "label": "互助土族自治县", "value": "630223" }, { "label": "化隆回族自治县", "value": "630224" }, { "label": "循化撒拉族自治县", "value": "630225" }], [{ "label": "门源回族自治县", "value": "632221" }, { "label": "祁连县", "value": "632222" }, { "label": "海晏县", "value": "632223" }, { "label": "刚察县", "value": "632224" }], [{ "label": "同仁县", "value": "632321" }, { "label": "尖扎县", "value": "632322" }, { "label": "泽库县", "value": "632323" }, { "label": "河南蒙古族自治县", "value": "632324" }], [{ "label": "共和县", "value": "632521" }, { "label": "同德县", "value": "632522" }, { "label": "贵德县", "value": "632523" }, { "label": "兴海县", "value": "632524" }, { "label": "贵南县", "value": "632525" }], [{ "label": "玛沁县", "value": "632621" }, { "label": "班玛县", "value": "632622" }, { "label": "甘德县", "value": "632623" }, { "label": "达日县", "value": "632624" }, { "label": "久治县", "value": "632625" }, { "label": "玛多县", "value": "632626" }], [{ "label": "玉树市", "value": "632701" }, { "label": "杂多县", "value": "632722" }, { "label": "称多县", "value": "632723" }, { "label": "治多县", "value": "632724" }, { "label": "囊谦县", "value": "632725" }, { "label": "曲麻莱县", "value": "632726" }], [{ "label": "格尔木市", "value": "632801" }, { "label": "德令哈市", "value": "632802" }, { "label": "乌兰县", "value": "632821" }, { "label": "都兰县", "value": "632822" }, { "label": "天峻县", "value": "632823" }, { "label": "大柴旦行政委员会", "value": "632857" }, { "label": "冷湖行政委员会", "value": "632858" }, { "label": "茫崖行政委员会", "value": "632859" }]], [[{ "label": "兴庆区", "value": "640104" }, { "label": "西夏区", "value": "640105" }, { "label": "金凤区", "value": "640106" }, { "label": "永宁县", "value": "640121" }, { "label": "贺兰县", "value": "640122" }, { "label": "灵武市", "value": "640181" }], [{ "label": "大武口区", "value": "640202" }, { "label": "惠农区", "value": "640205" }, { "label": "平罗县", "value": "640221" }], [{ "label": "利通区", "value": "640302" }, { "label": "红寺堡区", "value": "640303" }, { "label": "盐池县", "value": "640323" }, { "label": "同心县", "value": "640324" }, { "label": "青铜峡市", "value": "640381" }], [{ "label": "原州区", "value": "640402" }, { "label": "西吉县", "value": "640422" }, { "label": "隆德县", "value": "640423" }, { "label": "泾源县", "value": "640424" }, { "label": "彭阳县", "value": "640425" }], [{ "label": "沙坡头区", "value": "640502" }, { "label": "中宁县", "value": "640521" }, { "label": "海原县", "value": "640522" }]], [[{ "label": "天山区", "value": "650102" }, { "label": "沙依巴克区", "value": "650103" }, { "label": "新市区", "value": "650104" }, { "label": "水磨沟区", "value": "650105" }, { "label": "头屯河区", "value": "650106" }, { "label": "达坂城区", "value": "650107" }, { "label": "米东区", "value": "650109" }, { "label": "乌鲁木齐县", "value": "650121" }, { "label": "乌鲁木齐经济技术开发区", "value": "650171" }, { "label": "乌鲁木齐高新技术产业开发区", "value": "650172" }], [{ "label": "独山子区", "value": "650202" }, { "label": "克拉玛依区", "value": "650203" }, { "label": "白碱滩区", "value": "650204" }, { "label": "乌尔禾区", "value": "650205" }], [{ "label": "高昌区", "value": "650402" }, { "label": "鄯善县", "value": "650421" }, { "label": "托克逊县", "value": "650422" }], [{ "label": "伊州区", "value": "650502" }, { "label": "巴里坤哈萨克自治县", "value": "650521" }, { "label": "伊吾县", "value": "650522" }], [{ "label": "昌吉市", "value": "652301" }, { "label": "阜康市", "value": "652302" }, { "label": "呼图壁县", "value": "652323" }, { "label": "玛纳斯县", "value": "652324" }, { "label": "奇台县", "value": "652325" }, { "label": "吉木萨尔县", "value": "652327" }, { "label": "木垒哈萨克自治县", "value": "652328" }], [{ "label": "博乐市", "value": "652701" }, { "label": "阿拉山口市", "value": "652702" }, { "label": "精河县", "value": "652722" }, { "label": "温泉县", "value": "652723" }], [{ "label": "库尔勒市", "value": "652801" }, { "label": "轮台县", "value": "652822" }, { "label": "尉犁县", "value": "652823" }, { "label": "若羌县", "value": "652824" }, { "label": "且末县", "value": "652825" }, { "label": "焉耆回族自治县", "value": "652826" }, { "label": "和静县", "value": "652827" }, { "label": "和硕县", "value": "652828" }, { "label": "博湖县", "value": "652829" }, { "label": "库尔勒经济技术开发区", "value": "652871" }], [{ "label": "阿克苏市", "value": "652901" }, { "label": "温宿县", "value": "652922" }, { "label": "库车县", "value": "652923" }, { "label": "沙雅县", "value": "652924" }, { "label": "新和县", "value": "652925" }, { "label": "拜城县", "value": "652926" }, { "label": "乌什县", "value": "652927" }, { "label": "阿瓦提县", "value": "652928" }, { "label": "柯坪县", "value": "652929" }], [{ "label": "阿图什市", "value": "653001" }, { "label": "阿克陶县", "value": "653022" }, { "label": "阿合奇县", "value": "653023" }, { "label": "乌恰县", "value": "653024" }], [{ "label": "喀什市", "value": "653101" }, { "label": "疏附县", "value": "653121" }, { "label": "疏勒县", "value": "653122" }, { "label": "英吉沙县", "value": "653123" }, { "label": "泽普县", "value": "653124" }, { "label": "莎车县", "value": "653125" }, { "label": "叶城县", "value": "653126" }, { "label": "麦盖提县", "value": "653127" }, { "label": "岳普湖县", "value": "653128" }, { "label": "伽师县", "value": "653129" }, { "label": "巴楚县", "value": "653130" }, { "label": "塔什库尔干塔吉克自治县", "value": "653131" }], [{ "label": "和田市", "value": "653201" }, { "label": "和田县", "value": "653221" }, { "label": "墨玉县", "value": "653222" }, { "label": "皮山县", "value": "653223" }, { "label": "洛浦县", "value": "653224" }, { "label": "策勒县", "value": "653225" }, { "label": "于田县", "value": "653226" }, { "label": "民丰县", "value": "653227" }], [{ "label": "伊宁市", "value": "654002" }, { "label": "奎屯市", "value": "654003" }, { "label": "霍尔果斯市", "value": "654004" }, { "label": "伊宁县", "value": "654021" }, { "label": "察布查尔锡伯自治县", "value": "654022" }, { "label": "霍城县", "value": "654023" }, { "label": "巩留县", "value": "654024" }, { "label": "新源县", "value": "654025" }, { "label": "昭苏县", "value": "654026" }, { "label": "特克斯县", "value": "654027" }, { "label": "尼勒克县", "value": "654028" }], [{ "label": "塔城市", "value": "654201" }, { "label": "乌苏市", "value": "654202" }, { "label": "额敏县", "value": "654221" }, { "label": "沙湾县", "value": "654223" }, { "label": "托里县", "value": "654224" }, { "label": "裕民县", "value": "654225" }, { "label": "和布克赛尔蒙古自治县", "value": "654226" }], [{ "label": "阿勒泰市", "value": "654301" }, { "label": "布尔津县", "value": "654321" }, { "label": "富蕴县", "value": "654322" }, { "label": "福海县", "value": "654323" }, { "label": "哈巴河县", "value": "654324" }, { "label": "青河县", "value": "654325" }, { "label": "吉木乃县", "value": "654326" }], [{ "label": "石河子市", "value": "659001" }, { "label": "阿拉尔市", "value": "659002" }, { "label": "图木舒克市", "value": "659003" }, { "label": "五家渠市", "value": "659004" }, { "label": "铁门关市", "value": "659006" }]], [[{ "label": "台北", "value": "660101" }], [{ "label": "高雄", "value": "660201" }], [{ "label": "基隆", "value": "660301" }], [{ "label": "台中", "value": "660401" }], [{ "label": "台南", "value": "660501" }], [{ "label": "新竹", "value": "660601" }], [{ "label": "嘉义", "value": "660701" }], [{ "label": "宜兰", "value": "660801" }], [{ "label": "桃园", "value": "660901" }], [{ "label": "苗栗", "value": "661001" }], [{ "label": "彰化", "value": "661101" }], [{ "label": "南投", "value": "661201" }], [{ "label": "云林", "value": "661301" }], [{ "label": "屏东", "value": "661401" }], [{ "label": "台东", "value": "661501" }], [{ "label": "花莲", "value": "661601" }], [{ "label": "澎湖", "value": "661701" }]], [[{ "label": "香港岛", "value": "670101" }], [{ "label": "九龙", "value": "670201" }], [{ "label": "新界", "value": "670301" }]], [[{ "label": "澳门半岛", "value": "680101" }], [{ "label": "氹仔岛", "value": "680201" }], [{ "label": "路环岛", "value": "680301" }], [{ "label": "路氹城", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 37:
/*!**********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/$parent.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 38:
/*!******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/sys.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!***********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/debounce.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!***********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/function/throttle.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 403:
/*!*************************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200728
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 404),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 405),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) {
        if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
        return false;
      }
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.c = void 0;
            break;
          }}}

    if (attrs.align) {
      styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height += 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
    var i = j;
    while (_this2.data[j] != '<') {j--;}
    src = _this2.data.substring(j, i).replace("viewbox", "viewBox") + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: (/vertical[^;]+/.exec(node.attrs.style) || []).shift(),
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格的边框
  if (node.name == 'table') {
    var padding = attrs.cellpadding,
    spacing = attrs.cellspacing,
    border = attrs.border;
    if (node.c) {
      this.bubble();
      attrs.style = (attrs.style || '') + ';display:table';
      if (!padding) padding = 2;
      if (!spacing) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
    if (border || padding || node.c)
    (function f(ns) {
      for (var i = 0, n; n = ns[i]; i++) {
        if (n.type == 'text') continue;
        var style = n.attrs.style || '';
        if (node.c && n.name[0] == 't') {
          n.c = 1;
          style += ';display:table-' + (n.name == 'th' || n.name == 'td' ? 'cell' : n.name == 'tr' ? 'row' : 'row-group');
        }
        if (n.name == 'th' || n.name == 'td') {
          if (border) style = "border:".concat(border, "px solid gray;").concat(style);
          if (padding) style = "padding:".concat(padding, "px;").concat(style);
        } else f(n.children || []);
        if (style) n.attrs.style = style;
      }
    })(childs);
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 404:
/*!*******************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/components/u-parse/libs/config.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,table'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 405:
/*!***********************************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 404),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) this.state = this.Space;
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 41:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/config/config.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-08-25
var version = '1.6.5';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 42:
/*!*******************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 43:
/*!**********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/node_modules/uniapp-route-guards/dist/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}module.exports =
/******/function (modules) {// webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/}
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/}
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/}
    /******/};
  /******/
  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/}
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/};
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/__webpack_require__.t = function (value, mode) {
    /******/if (mode & 1) value = __webpack_require__(value);
    /******/if (mode & 8) return value;
    /******/if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/var ns = Object.create(null);
    /******/__webpack_require__.r(ns);
    /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/if (mode & 2 && typeof value != 'string') for (var key in value) {__webpack_require__.d(ns, key, function (key) {return value[key];}.bind(null, key));}
    /******/return ns;
    /******/};
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {return module['default'];} :
    /******/function getModuleExports() {return module;};
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/};
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {return Object.prototype.hasOwnProperty.call(object, property);};
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__(1);


  /***/},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);

  // EXPORTS
  __webpack_require__.d(__webpack_exports__, "default", function () {return (/* binding */lib_uniRouteGuards);});

  // CONCATENATED MODULE: ./src/lib/install.js
  /**
   * Vue.use 插件安装
   * @param {Object} Vue
   * @param {*} opts
   */
  function install(Vue) {var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};}

  // CONCATENATED MODULE: ./src/lib/hackRoute.js
  /**
   * hack uniapp的路由函数b
   * @param {Function} callback
   * @return {never}
   */
  var hackUniRoute = function hackUniRoute(callback) {var _this = this;
    // 路由跳转的函数key值
    var UNI_ROUTE_ACTIONS = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack'];

    // 函数缓存容器
    var cacheFunc = {};

    // 保存原函数引用
    UNI_ROUTE_ACTIONS.forEach(function (key) {
      cacheFunc[key] = uni[key];
    });

    // 重写方法
    UNI_ROUTE_ACTIONS.forEach(function (key) {
      uni[key] = function (opts, routeGuardsOpts) {
        // 取消拦截并直接运行
        if (routeGuardsOpts === false) {
          cacheFunc[key](opts);
        } else {
          // 处理所有钩子
          var defaultOpts = { action: key };
          var newOpts = Object.assign(defaultOpts, opts);
          var actionFunc = function actionFunc(customOpts) {
            var lastOpts = Object.assign(newOpts, customOpts);

            cacheFunc[lastOpts.action](lastOpts);
          };

          callback.call(_this, newOpts, actionFunc);
        }
      };
    });
  };

  // CONCATENATED MODULE: ./src/lib/utils.js
  /**
   * 控制台打印内容
   * @param {string} msg 内容
   * @param {string} action ['log'] 打印类型
   * @param {never}
   */
  var print = function print(msg) {var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
    console[action]('[route-guards] ' + msg);
  };

  /**
      * 判断错误对象是否是由`Error`对象实例化出来的
      * @param {Error|Object} errObj
      * @return {boolean}
      */
  var isError = function isError(errObj) {
    return Object.prototype.toString.call(errObj).includes('Error');
  };

  /**
      * 获取并封装当前路由栈的信息
      * @return {Object}
      */
  var getCurStack = function getCurStack() {
    var stackAll = getCurrentPages();
    var stackLen = stackAll.length;

    // 跳过路由栈为空的情况(App端)
    if (stackLen === 0) {
      return false;
    }

    var curStack = stackAll[stackLen - 1];
    var from = { url: '/' + curStack.route };

    return from;
  };

  /**
      * 注册 钩子
      * @param {Function[]} list 钩子列表
      * @param {Function} callback 回调函数
      * @returns {Function} 用于注销当前注册钩子的闭包函数
      */
  var registerHook = function registerHook(list, callback) {
    list.push(callback);

    return function () {
      var index = list.indexOf(callback);

      if (index !== -1) list.splice(index, 1);
    };
  };

  // CONCATENATED MODULE: ./src/lib/handleHooks.js


  /**
   * 处理 全局钩子队列
   * @param {Object} to
   * @param {Function} uniRunRoute 被hack的uniapp路由方法
   */
  var handleGlobalHooksQueue = function handleGlobalHooksQueue(to, uniRunRoute) {var _this2 = this;
    // 跳过 h5环境中, 调用系统的tabbar功能('tabbar')或系统的navbar上的返回功能('backbutton'), 会触发uni的路由方法
    if (['tabBar', 'backbutton'].includes(to.from)) return uniRunRoute();

    // 获取当前路由栈信息
    var from = getCurStack();

    // 跳过 app端 首次进入页面会调用uni路由方法, 导致获取当前路由栈(from)为空，所有直接运行，不进行拦截
    if (from === false) return uniRunRoute();

    iteratorHook(
    this.beforeHooks,
    handleNextPipe.bind(this),
    function () {
      uniRunRoute();
      handleAfterHook.call(_this2, to, from);
    },
    {
      to: to,
      from: from,
      uniRunRoute: uniRunRoute });


  };

  /**
      * 处理 全局后置钩子
      * @param {Object} to
      * @param {Object} from
      */
  var handleAfterHook = function handleAfterHook(to, from) {
    this.afterHooks.forEach(function (hook) {
      hook(to, from);
    });
  };

  /**
      * 处理 错误信息
      * @param {Object|string} err 错误信息、错误栈
      */
  var handleAbort = function handleAbort(err) {
    if (this.errorCbs.length > 0) {
      this.errorCbs.forEach(function (cb) {
        cb(err);
      });
    } else {
      print('error:' + err, 'error');
    }
  };

  /**
      * 遍历并运行 钩子
      * @param {Function[]} hookQueue 钩子队列
      * @param {Function} everyCb 每次遍历都会运行的回调函数
      * @param {Function} endCb 队列运行结束后运行的回调函数
      * @param {Object} hookOpts 钩子运行需要的参数
      */
  var iteratorHook = function iteratorHook(hookQueue, everyCb, endCb, hookOpts) {var _this3 = this;
    var step = function step(i) {
      // 队列运行结束，运行回调函数
      if (i >= hookQueue.length) {
        endCb.call(_this3);
      } else {
        // 遍历运行钩子
        everyCb.call(_this3, hookQueue[i], hookOpts, function (val) {
          // 结束钩子遍历
          if (val === false) return;

          step(++i);
        });
      }
    };

    step(0);
  };

  /**
      * 处理 有next参数的钩子(前置钩子)
      * @param {Function} hookCb 钩子函数
      * @param {Object} hookOpts 钩子运行需要的参数
      * @param {Function} iteratorNextHook 运行下一个钩子
      */
  var handleNextPipe = function handleNextPipe(hookCb, hookOpts, iteratorNextHook) {var _this4 = this;
    hookCb(hookOpts.to, hookOpts.from, function (nextVal) {
      try {
        // next(false) or next(new Error('xxx')) 中断当前的路径跳转，或中断且注册错误回调
        if (nextVal === false || isError(nextVal)) {
          handleAbort.call(_this4, nextVal);
        }

        // next('/pages/a') or next({ url: '/pages/a' }) 修改 路由
        else if (
          typeof nextVal === 'string' ||
          typeof nextVal === 'object' && typeof nextVal.url === 'string')
          {
            // 处理字符串路径
            typeof nextVal === 'string' && (nextVal = { url: nextVal });

            hookOpts.uniRunRoute(nextVal);
            handleAfterHook.call(_this4, hookOpts.to, hookOpts.from);

            // 更新引用，替换原来的`url`字段数据
            hookOpts.to = Object.assign(hookOpts.to, nextVal);

            // 结束钩子遍历
            iteratorNextHook(false);
          }

          // next() 运行下一个管道(next)
          else {
              iteratorNextHook();
            }
      } catch (err) {
        handleAbort.call(_this4, err);
      }
    });
  };

  // CONCATENATED MODULE: ./src/lib/index.js
  var




  lib_uniRouteGuards = /*#__PURE__*/function () {
    function lib_uniRouteGuards() {_classCallCheck(this, lib_uniRouteGuards);
      // 初始化数据
      this.beforeHooks = [];
      this.afterHooks = [];
      this.errorCbs = [];
      hackUniRoute.call(this, handleGlobalHooksQueue);
    }

    /**
       * 注册 全局前置守卫
       * @param {Function} callback 回调函数
       */_createClass(lib_uniRouteGuards, [{ key: "beforeEach", value: function beforeEach(
      callback) {
        return registerHook(this.beforeHooks, callback);
      }

      /**
         * 注册 全局后置守卫
         * @param {Function} callback 回调函数
         */ }, { key: "afterEach", value: function afterEach(
      callback) {
        return registerHook(this.afterHooks, callback);
      }

      /**
         * 注册 错误回调
         * @param {Function} errCb 错误回调函数
         */ }, { key: "onError", value: function onError(
      errCb) {
        return registerHook(this.errorCbs, errCb);
      } }]);return lib_uniRouteGuards;}();


  // 添加 Vue.use 功能
  lib_uniRouteGuards.install = install;


  /***/}
/******/]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 50:
/*!**************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/login/login/login.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _login = __webpack_require__(/*! ../../../api/login.js */ 8);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      allImage: _images.default //logo图片路径
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight', 'status'])),

  methods: {
    // 跳转注册页面,贷款状况界面
    toSignIn: function toSignIn(e) {
      // 获取数据
      (0, _login.registerIndex)().then(function (res) {
        // 跳转数据数据列表
        uni.navigateTo({
          url: "/pages/login/all_status/all_status?teps=0&status=" + JSON.stringify(res.data) });

      });
    },
    // 跳转登录页面
    toRingUp: function toRingUp(e) {
      uni.navigateTo({
        url: "/pages/login/sign_in/sign_in?type=1" });

    } },

  onLoad: function onLoad() {
    if (!uni.getStorageSync('register')) {uni.setStorageSync('register', {});}
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 51:
/*!**************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/util/images.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  logo: "/static/images/logo.png", //logo图标
  videoGif: "/static/images/videpGif.gif", //播放图标
  indexBg: "/static/images/index_bg.png", //首页背景图
  adviserHomeBg: "/static/images/adviser_home_bg.png", //顾问背景图片
  vipPng: "/static/images/advertisement.png", //vip图片
  myVip: "/static/images/myVip.png" //个人中心的vip图片
};exports.default = _default;

/***/ }),

/***/ 60:
/*!************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/login/all_status/all_status.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _login = __webpack_require__(/*! ../../../api/login.js */ 8);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      nowStatus: -1,
      teps: 0, //当前步骤
      status: {} //展示数据
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight', 'type'])),

  methods: {
    // 切换选择
    changeStatus: function changeStatus(index) {
      this.nowStatus = index; //选择样式修改
      if (this.teps == 0) {//贷款状态页
        if (this.status.type[this.nowStatus] == '贷前') {
          this.$store.dispatch('changeType', 1);
        } else if (this.status.type[this.nowStatus] == '贷中') {
          this.$store.dispatch('changeType', 2);
        } else if (this.status.type[this.nowStatus] == '贷后') {
          this.$store.dispatch('changeType', 3);
        }
      } else {
        var nowRegister = uni.getStorageSync('register'); //获取缓存数据
        nowRegister[this.status.name] = this.status.data[index].id; //修改或添加城市
        uni.setStorageSync('register', nowRegister); //存储数据
      }
      // 根据情况修改传参数据（有车无车，有房无房等）
      var nowData = { type: this.type, teps: Number(this.teps) + 1 };
      console.log(this.status.name, this.status);
      if (this.status.name == 'ishas_car') {
        nowData.ishas_car = this.status.data[index].id;
      } else if (this.status.name == 'car_stages') {
        nowData.car_stages = this.status.data[index].id;
      } else if (this.status.name == 'ishas_house') {
        nowData.ishas_house = this.status.data[index].id;
      } else if (this.status.name == 'house_stages') {
        nowData.house_stages = this.status.data[index].id;
      }
      console.log(nowData);
      (0, _login.registerRegister)(nowData).then(function (res) {
        if (res.data) {
          if (res.data.type == '1') {
            uni.navigateTo({
              url: "/pages/login/address_choose/address_choose?teps=" + (Number(res.data.teps) + 1) + "&status=" + JSON.stringify(res.data) });

          } else {
            uni.navigateTo({
              url: "/pages/login/all_status/all_status?teps=" + Number(res.data.teps) + "&status=" + JSON.stringify(res.data) });

          }
        } else {
          uni.navigateTo({
            url: "/pages/login/sign_in/sign_in?type=0" });

        }
      });
    } },

  onLoad: function onLoad(options) {
    this.teps = options.teps; //当前步骤数
    this.status = JSON.parse(options.status); //展示数据
    if (this.teps == 0) {
      var data = [];
      this.status.type.forEach(function (item, index) {
        data.push({ id: index, text: item });
      });
      this.status.data = data;
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 69:
/*!********************************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/login/address_choose/address_choose.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _citys = _interopRequireDefault(__webpack_require__(/*! ../../../util/citys.js */ 70));
var _login = __webpack_require__(/*! ../../../api/login.js */ 8);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      show: true,
      provinces: [], //省
      citys: [], //市
      areas: [], //区
      province: "",
      city: "",
      area: "",
      value: [0, 0, 0],
      values: [0, 0, 0],
      teps: 0, //当前步骤条
      status: {} //展示数据
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight', 'type'])),

  methods: {
    //滚动选择
    bindChange: function bindChange(e) {var _this = this;
      // const val = e.detail.value
      console.log(e);
      var val = e.detail.value; //当前选中的下标
      var t = this.values; //旧选中下标

      if (val[0] != t[0]) {//如果选择的省份变了
        this.citys = []; //清空市区
        this.areas = [];
        _citys.default[val[0]].sub.forEach(function (item) {
          _this.citys.push(item.name);
        });
        _citys.default[val[0]].sub[0].sub.forEach(function (item) {
          _this.areas.push(item.name);
        });
        this.province = this.provinces[val[0]],
        this.city = _citys.default[val[0]].sub[0].name,
        this.area = _citys.default[val[0]].sub[0].sub[0].name,
        this.values = val,
        this.value = [val[0], 0, 0];
        return;
      }
      if (val[1] != t[1]) {//如果选择的市变了
        this.areas = []; //清空区
        _citys.default[val[0]].sub[val[1]].sub.forEach(function (item) {
          _this.areas.push(item.name);
        });
        this.city = this.citys[val[1]];
        this.area = _citys.default[val[0]].sub[val[1]].sub[0].name;
        this.values = val,
        this.value = [val[0], val[1], 0];
        return;
      }
      if (val[2] != t[2]) {
        this.area = this.areas[val[2]];
        this.values = val;
        return;
      }
    },
    // 跳转到工作选择
    toWork: function toWork() {var _this2 = this;
      var nowRegister = uni.getStorageSync('register'); //获取缓存数据
      nowRegister[this.status.name] = this.province + this.city + this.area; //修改或添加城市
      uni.setStorageSync('register', nowRegister); //存储数据
      (0, _login.registerRegister)({ type: this.type, teps: Number(this.status.teps) + 1 }).then(function (res) {
        uni.navigateTo({
          url: "/pages/login/all_status/all_status?teps=" + (Number(_this2.status.teps) + 1) + "&status=" + JSON.stringify(res.data) });

      });
    } },

  onLoad: function onLoad(options) {var _this3 = this;
    this.teps = options.teps; //当前步骤数
    this.status = JSON.parse(options.status); //展示数据
    _citys.default.forEach(function (item) {
      _this3.provinces.push(item.name); //第一列省份所有名称
    });
    _citys.default[0].sub.forEach(function (item) {
      _this3.citys.push(item.name); //第一个省的市所有名称
    });
    _citys.default[0].sub[0].sub.forEach(function (item) {
      _this3.areas.push(item.name); //第一个省份的第一个市的所有区
    });
    this.province = _citys.default[0].name; //省
    this.city = _citys.default[0].sub[0].name; //市
    this.area = _citys.default[0].sub[0].sub[0].name; //区
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 70:
/*!*************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/util/citys.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [
{
  "name": "北京",
  "code": "110000",
  "sub": [
  {
    "name": "北京市",
    "code": "110000",
    "sub": [
    {
      "name": "东城区",
      "code": "110101" },

    {
      "name": "西城区",
      "code": "110102" },

    {
      "name": "朝阳区",
      "code": "110105" },

    {
      "name": "丰台区",
      "code": "110106" },

    {
      "name": "石景山区",
      "code": "110107" },

    {
      "name": "海淀区",
      "code": "110108" },

    {
      "name": "门头沟区",
      "code": "110109" },

    {
      "name": "房山区",
      "code": "110111" },

    {
      "name": "通州区",
      "code": "110112" },

    {
      "name": "顺义区",
      "code": "110113" },

    {
      "name": "昌平区",
      "code": "110114" },

    {
      "name": "大兴区",
      "code": "110115" },

    {
      "name": "怀柔区",
      "code": "110116" },

    {
      "name": "平谷区",
      "code": "110117" },

    {
      "name": "密云县",
      "code": "110228" },

    {
      "name": "延庆县",
      "code": "110229" }] }] },





{
  "name": "天津",
  "code": "120000",
  "sub": [
  {
    "name": "天津市",
    "code": "120000",
    "sub": [
    {
      "name": "和平区",
      "code": "120101" },

    {
      "name": "河东区",
      "code": "120102" },

    {
      "name": "河西区",
      "code": "120103" },

    {
      "name": "南开区",
      "code": "120104" },

    {
      "name": "河北区",
      "code": "120105" },

    {
      "name": "红桥区",
      "code": "120106" },

    {
      "name": "东丽区",
      "code": "120110" },

    {
      "name": "西青区",
      "code": "120111" },

    {
      "name": "津南区",
      "code": "120112" },

    {
      "name": "北辰区",
      "code": "120113" },

    {
      "name": "武清区",
      "code": "120114" },

    {
      "name": "宝坻区",
      "code": "120115" },

    {
      "name": "滨海新区",
      "code": "120116" },

    {
      "name": "宁河县",
      "code": "120221" },

    {
      "name": "静海县",
      "code": "120223" },

    {
      "name": "蓟县",
      "code": "120225" }] }] },





{
  "name": "河北省",
  "code": "130000",
  "sub": [
  {
    "name": "石家庄市",
    "code": "130100",
    "sub": [
    {
      "name": "市辖区",
      "code": "130101" },

    {
      "name": "长安区",
      "code": "130102" },

    {
      "name": "桥西区",
      "code": "130104" },

    {
      "name": "新华区",
      "code": "130105" },

    {
      "name": "井陉矿区",
      "code": "130107" },

    {
      "name": "裕华区",
      "code": "130108" },

    {
      "name": "藁城区",
      "code": "130109" },

    {
      "name": "鹿泉区",
      "code": "130110" },

    {
      "name": "栾城区",
      "code": "130111" },

    {
      "name": "井陉县",
      "code": "130121" },

    {
      "name": "正定县",
      "code": "130123" },

    {
      "name": "行唐县",
      "code": "130125" },

    {
      "name": "灵寿县",
      "code": "130126" },

    {
      "name": "高邑县",
      "code": "130127" },

    {
      "name": "深泽县",
      "code": "130128" },

    {
      "name": "赞皇县",
      "code": "130129" },

    {
      "name": "无极县",
      "code": "130130" },

    {
      "name": "平山县",
      "code": "130131" },

    {
      "name": "元氏县",
      "code": "130132" },

    {
      "name": "赵县",
      "code": "130133" },

    {
      "name": "辛集市",
      "code": "130181" },

    {
      "name": "晋州市",
      "code": "130183" },

    {
      "name": "新乐市",
      "code": "130184" }] },



  {
    "name": "唐山市",
    "code": "130200",
    "sub": [
    {
      "name": "市辖区",
      "code": "130201" },

    {
      "name": "路南区",
      "code": "130202" },

    {
      "name": "路北区",
      "code": "130203" },

    {
      "name": "古冶区",
      "code": "130204" },

    {
      "name": "开平区",
      "code": "130205" },

    {
      "name": "丰南区",
      "code": "130207" },

    {
      "name": "丰润区",
      "code": "130208" },

    {
      "name": "曹妃甸区",
      "code": "130209" },

    {
      "name": "滦县",
      "code": "130223" },

    {
      "name": "滦南县",
      "code": "130224" },

    {
      "name": "乐亭县",
      "code": "130225" },

    {
      "name": "迁西县",
      "code": "130227" },

    {
      "name": "玉田县",
      "code": "130229" },

    {
      "name": "遵化市",
      "code": "130281" },

    {
      "name": "迁安市",
      "code": "130283" }] },



  {
    "name": "秦皇岛市",
    "code": "130300",
    "sub": [
    {
      "name": "市辖区",
      "code": "130301" },

    {
      "name": "海港区",
      "code": "130302" },

    {
      "name": "山海关区",
      "code": "130303" },

    {
      "name": "北戴河区",
      "code": "130304" },

    {
      "name": "青龙满族自治县",
      "code": "130321" },

    {
      "name": "昌黎县",
      "code": "130322" },

    {
      "name": "抚宁县",
      "code": "130323" },

    {
      "name": "卢龙县",
      "code": "130324" }] },



  {
    "name": "邯郸市",
    "code": "130400",
    "sub": [
    {
      "name": "市辖区",
      "code": "130401" },

    {
      "name": "邯山区",
      "code": "130402" },

    {
      "name": "丛台区",
      "code": "130403" },

    {
      "name": "复兴区",
      "code": "130404" },

    {
      "name": "峰峰矿区",
      "code": "130406" },

    {
      "name": "邯郸县",
      "code": "130421" },

    {
      "name": "临漳县",
      "code": "130423" },

    {
      "name": "成安县",
      "code": "130424" },

    {
      "name": "大名县",
      "code": "130425" },

    {
      "name": "涉县",
      "code": "130426" },

    {
      "name": "磁县",
      "code": "130427" },

    {
      "name": "肥乡县",
      "code": "130428" },

    {
      "name": "永年县",
      "code": "130429" },

    {
      "name": "邱县",
      "code": "130430" },

    {
      "name": "鸡泽县",
      "code": "130431" },

    {
      "name": "广平县",
      "code": "130432" },

    {
      "name": "馆陶县",
      "code": "130433" },

    {
      "name": "魏县",
      "code": "130434" },

    {
      "name": "曲周县",
      "code": "130435" },

    {
      "name": "武安市",
      "code": "130481" }] },



  {
    "name": "邢台市",
    "code": "130500",
    "sub": [
    {
      "name": "市辖区",
      "code": "130501" },

    {
      "name": "桥东区",
      "code": "130502" },

    {
      "name": "桥西区",
      "code": "130503" },

    {
      "name": "邢台县",
      "code": "130521" },

    {
      "name": "临城县",
      "code": "130522" },

    {
      "name": "内丘县",
      "code": "130523" },

    {
      "name": "柏乡县",
      "code": "130524" },

    {
      "name": "隆尧县",
      "code": "130525" },

    {
      "name": "任县",
      "code": "130526" },

    {
      "name": "南和县",
      "code": "130527" },

    {
      "name": "宁晋县",
      "code": "130528" },

    {
      "name": "巨鹿县",
      "code": "130529" },

    {
      "name": "新河县",
      "code": "130530" },

    {
      "name": "广宗县",
      "code": "130531" },

    {
      "name": "平乡县",
      "code": "130532" },

    {
      "name": "威县",
      "code": "130533" },

    {
      "name": "清河县",
      "code": "130534" },

    {
      "name": "临西县",
      "code": "130535" },

    {
      "name": "南宫市",
      "code": "130581" },

    {
      "name": "沙河市",
      "code": "130582" }] },



  {
    "name": "保定市",
    "code": "130600",
    "sub": [
    {
      "name": "市辖区",
      "code": "130601" },

    {
      "name": "新市区",
      "code": "130602" },

    {
      "name": "北市区",
      "code": "130603" },

    {
      "name": "南市区",
      "code": "130604" },

    {
      "name": "满城县",
      "code": "130621" },

    {
      "name": "清苑县",
      "code": "130622" },

    {
      "name": "涞水县",
      "code": "130623" },

    {
      "name": "阜平县",
      "code": "130624" },

    {
      "name": "徐水县",
      "code": "130625" },

    {
      "name": "定兴县",
      "code": "130626" },

    {
      "name": "唐县",
      "code": "130627" },

    {
      "name": "高阳县",
      "code": "130628" },

    {
      "name": "容城县",
      "code": "130629" },

    {
      "name": "涞源县",
      "code": "130630" },

    {
      "name": "望都县",
      "code": "130631" },

    {
      "name": "安新县",
      "code": "130632" },

    {
      "name": "易县",
      "code": "130633" },

    {
      "name": "曲阳县",
      "code": "130634" },

    {
      "name": "蠡县",
      "code": "130635" },

    {
      "name": "顺平县",
      "code": "130636" },

    {
      "name": "博野县",
      "code": "130637" },

    {
      "name": "雄县",
      "code": "130638" },

    {
      "name": "涿州市",
      "code": "130681" },

    {
      "name": "定州市",
      "code": "130682" },

    {
      "name": "安国市",
      "code": "130683" },

    {
      "name": "高碑店市",
      "code": "130684" }] },



  {
    "name": "张家口市",
    "code": "130700",
    "sub": [
    {
      "name": "市辖区",
      "code": "130701" },

    {
      "name": "桥东区",
      "code": "130702" },

    {
      "name": "桥西区",
      "code": "130703" },

    {
      "name": "宣化区",
      "code": "130705" },

    {
      "name": "下花园区",
      "code": "130706" },

    {
      "name": "宣化县",
      "code": "130721" },

    {
      "name": "张北县",
      "code": "130722" },

    {
      "name": "康保县",
      "code": "130723" },

    {
      "name": "沽源县",
      "code": "130724" },

    {
      "name": "尚义县",
      "code": "130725" },

    {
      "name": "蔚县",
      "code": "130726" },

    {
      "name": "阳原县",
      "code": "130727" },

    {
      "name": "怀安县",
      "code": "130728" },

    {
      "name": "万全县",
      "code": "130729" },

    {
      "name": "怀来县",
      "code": "130730" },

    {
      "name": "涿鹿县",
      "code": "130731" },

    {
      "name": "赤城县",
      "code": "130732" },

    {
      "name": "崇礼县",
      "code": "130733" }] },



  {
    "name": "承德市",
    "code": "130800",
    "sub": [
    {
      "name": "市辖区",
      "code": "130801" },

    {
      "name": "双桥区",
      "code": "130802" },

    {
      "name": "双滦区",
      "code": "130803" },

    {
      "name": "鹰手营子矿区",
      "code": "130804" },

    {
      "name": "承德县",
      "code": "130821" },

    {
      "name": "兴隆县",
      "code": "130822" },

    {
      "name": "平泉县",
      "code": "130823" },

    {
      "name": "滦平县",
      "code": "130824" },

    {
      "name": "隆化县",
      "code": "130825" },

    {
      "name": "丰宁满族自治县",
      "code": "130826" },

    {
      "name": "宽城满族自治县",
      "code": "130827" },

    {
      "name": "围场满族蒙古族自治县",
      "code": "130828" }] },



  {
    "name": "沧州市",
    "code": "130900",
    "sub": [
    {
      "name": "市辖区",
      "code": "130901" },

    {
      "name": "新华区",
      "code": "130902" },

    {
      "name": "运河区",
      "code": "130903" },

    {
      "name": "沧县",
      "code": "130921" },

    {
      "name": "青县",
      "code": "130922" },

    {
      "name": "东光县",
      "code": "130923" },

    {
      "name": "海兴县",
      "code": "130924" },

    {
      "name": "盐山县",
      "code": "130925" },

    {
      "name": "肃宁县",
      "code": "130926" },

    {
      "name": "南皮县",
      "code": "130927" },

    {
      "name": "吴桥县",
      "code": "130928" },

    {
      "name": "献县",
      "code": "130929" },

    {
      "name": "孟村回族自治县",
      "code": "130930" },

    {
      "name": "泊头市",
      "code": "130981" },

    {
      "name": "任丘市",
      "code": "130982" },

    {
      "name": "黄骅市",
      "code": "130983" },

    {
      "name": "河间市",
      "code": "130984" }] },



  {
    "name": "廊坊市",
    "code": "131000",
    "sub": [
    {
      "name": "市辖区",
      "code": "131001" },

    {
      "name": "安次区",
      "code": "131002" },

    {
      "name": "广阳区",
      "code": "131003" },

    {
      "name": "固安县",
      "code": "131022" },

    {
      "name": "永清县",
      "code": "131023" },

    {
      "name": "香河县",
      "code": "131024" },

    {
      "name": "大城县",
      "code": "131025" },

    {
      "name": "文安县",
      "code": "131026" },

    {
      "name": "大厂回族自治县",
      "code": "131028" },

    {
      "name": "霸州市",
      "code": "131081" },

    {
      "name": "三河市",
      "code": "131082" }] },



  {
    "name": "衡水市",
    "code": "131100",
    "sub": [
    {
      "name": "市辖区",
      "code": "131101" },

    {
      "name": "桃城区",
      "code": "131102" },

    {
      "name": "枣强县",
      "code": "131121" },

    {
      "name": "武邑县",
      "code": "131122" },

    {
      "name": "武强县",
      "code": "131123" },

    {
      "name": "饶阳县",
      "code": "131124" },

    {
      "name": "安平县",
      "code": "131125" },

    {
      "name": "故城县",
      "code": "131126" },

    {
      "name": "景县",
      "code": "131127" },

    {
      "name": "阜城县",
      "code": "131128" },

    {
      "name": "冀州市",
      "code": "131181" },

    {
      "name": "深州市",
      "code": "131182" }] }] },





{
  "name": "山西省",
  "code": "140000",
  "sub": [
  {
    "name": "太原市",
    "code": "140100",
    "sub": [
    {
      "name": "市辖区",
      "code": "140101" },

    {
      "name": "小店区",
      "code": "140105" },

    {
      "name": "迎泽区",
      "code": "140106" },

    {
      "name": "杏花岭区",
      "code": "140107" },

    {
      "name": "尖草坪区",
      "code": "140108" },

    {
      "name": "万柏林区",
      "code": "140109" },

    {
      "name": "晋源区",
      "code": "140110" },

    {
      "name": "清徐县",
      "code": "140121" },

    {
      "name": "阳曲县",
      "code": "140122" },

    {
      "name": "娄烦县",
      "code": "140123" },

    {
      "name": "古交市",
      "code": "140181" }] },



  {
    "name": "大同市",
    "code": "140200",
    "sub": [
    {
      "name": "市辖区",
      "code": "140201" },

    {
      "name": "城区",
      "code": "140202" },

    {
      "name": "矿区",
      "code": "140203" },

    {
      "name": "南郊区",
      "code": "140211" },

    {
      "name": "新荣区",
      "code": "140212" },

    {
      "name": "阳高县",
      "code": "140221" },

    {
      "name": "天镇县",
      "code": "140222" },

    {
      "name": "广灵县",
      "code": "140223" },

    {
      "name": "灵丘县",
      "code": "140224" },

    {
      "name": "浑源县",
      "code": "140225" },

    {
      "name": "左云县",
      "code": "140226" },

    {
      "name": "大同县",
      "code": "140227" }] },



  {
    "name": "阳泉市",
    "code": "140300",
    "sub": [
    {
      "name": "市辖区",
      "code": "140301" },

    {
      "name": "城区",
      "code": "140302" },

    {
      "name": "矿区",
      "code": "140303" },

    {
      "name": "郊区",
      "code": "140311" },

    {
      "name": "平定县",
      "code": "140321" },

    {
      "name": "盂县",
      "code": "140322" }] },



  {
    "name": "长治市",
    "code": "140400",
    "sub": [
    {
      "name": "市辖区",
      "code": "140401" },

    {
      "name": "城区",
      "code": "140402" },

    {
      "name": "郊区",
      "code": "140411" },

    {
      "name": "长治县",
      "code": "140421" },

    {
      "name": "襄垣县",
      "code": "140423" },

    {
      "name": "屯留县",
      "code": "140424" },

    {
      "name": "平顺县",
      "code": "140425" },

    {
      "name": "黎城县",
      "code": "140426" },

    {
      "name": "壶关县",
      "code": "140427" },

    {
      "name": "长子县",
      "code": "140428" },

    {
      "name": "武乡县",
      "code": "140429" },

    {
      "name": "沁县",
      "code": "140430" },

    {
      "name": "沁源县",
      "code": "140431" },

    {
      "name": "潞城市",
      "code": "140481" }] },



  {
    "name": "晋城市",
    "code": "140500",
    "sub": [
    {
      "name": "市辖区",
      "code": "140501" },

    {
      "name": "城区",
      "code": "140502" },

    {
      "name": "沁水县",
      "code": "140521" },

    {
      "name": "阳城县",
      "code": "140522" },

    {
      "name": "陵川县",
      "code": "140524" },

    {
      "name": "泽州县",
      "code": "140525" },

    {
      "name": "高平市",
      "code": "140581" }] },



  {
    "name": "朔州市",
    "code": "140600",
    "sub": [
    {
      "name": "市辖区",
      "code": "140601" },

    {
      "name": "朔城区",
      "code": "140602" },

    {
      "name": "平鲁区",
      "code": "140603" },

    {
      "name": "山阴县",
      "code": "140621" },

    {
      "name": "应县",
      "code": "140622" },

    {
      "name": "右玉县",
      "code": "140623" },

    {
      "name": "怀仁县",
      "code": "140624" }] },



  {
    "name": "晋中市",
    "code": "140700",
    "sub": [
    {
      "name": "市辖区",
      "code": "140701" },

    {
      "name": "榆次区",
      "code": "140702" },

    {
      "name": "榆社县",
      "code": "140721" },

    {
      "name": "左权县",
      "code": "140722" },

    {
      "name": "和顺县",
      "code": "140723" },

    {
      "name": "昔阳县",
      "code": "140724" },

    {
      "name": "寿阳县",
      "code": "140725" },

    {
      "name": "太谷县",
      "code": "140726" },

    {
      "name": "祁县",
      "code": "140727" },

    {
      "name": "平遥县",
      "code": "140728" },

    {
      "name": "灵石县",
      "code": "140729" },

    {
      "name": "介休市",
      "code": "140781" }] },



  {
    "name": "运城市",
    "code": "140800",
    "sub": [
    {
      "name": "市辖区",
      "code": "140801" },

    {
      "name": "盐湖区",
      "code": "140802" },

    {
      "name": "临猗县",
      "code": "140821" },

    {
      "name": "万荣县",
      "code": "140822" },

    {
      "name": "闻喜县",
      "code": "140823" },

    {
      "name": "稷山县",
      "code": "140824" },

    {
      "name": "新绛县",
      "code": "140825" },

    {
      "name": "绛县",
      "code": "140826" },

    {
      "name": "垣曲县",
      "code": "140827" },

    {
      "name": "夏县",
      "code": "140828" },

    {
      "name": "平陆县",
      "code": "140829" },

    {
      "name": "芮城县",
      "code": "140830" },

    {
      "name": "永济市",
      "code": "140881" },

    {
      "name": "河津市",
      "code": "140882" }] },



  {
    "name": "忻州市",
    "code": "140900",
    "sub": [
    {
      "name": "市辖区",
      "code": "140901" },

    {
      "name": "忻府区",
      "code": "140902" },

    {
      "name": "定襄县",
      "code": "140921" },

    {
      "name": "五台县",
      "code": "140922" },

    {
      "name": "代县",
      "code": "140923" },

    {
      "name": "繁峙县",
      "code": "140924" },

    {
      "name": "宁武县",
      "code": "140925" },

    {
      "name": "静乐县",
      "code": "140926" },

    {
      "name": "神池县",
      "code": "140927" },

    {
      "name": "五寨县",
      "code": "140928" },

    {
      "name": "岢岚县",
      "code": "140929" },

    {
      "name": "河曲县",
      "code": "140930" },

    {
      "name": "保德县",
      "code": "140931" },

    {
      "name": "偏关县",
      "code": "140932" },

    {
      "name": "原平市",
      "code": "140981" }] },



  {
    "name": "临汾市",
    "code": "141000",
    "sub": [
    {
      "name": "市辖区",
      "code": "141001" },

    {
      "name": "尧都区",
      "code": "141002" },

    {
      "name": "曲沃县",
      "code": "141021" },

    {
      "name": "翼城县",
      "code": "141022" },

    {
      "name": "襄汾县",
      "code": "141023" },

    {
      "name": "洪洞县",
      "code": "141024" },

    {
      "name": "古县",
      "code": "141025" },

    {
      "name": "安泽县",
      "code": "141026" },

    {
      "name": "浮山县",
      "code": "141027" },

    {
      "name": "吉县",
      "code": "141028" },

    {
      "name": "乡宁县",
      "code": "141029" },

    {
      "name": "大宁县",
      "code": "141030" },

    {
      "name": "隰县",
      "code": "141031" },

    {
      "name": "永和县",
      "code": "141032" },

    {
      "name": "蒲县",
      "code": "141033" },

    {
      "name": "汾西县",
      "code": "141034" },

    {
      "name": "侯马市",
      "code": "141081" },

    {
      "name": "霍州市",
      "code": "141082" }] },



  {
    "name": "吕梁市",
    "code": "141100",
    "sub": [
    {
      "name": "市辖区",
      "code": "141101" },

    {
      "name": "离石区",
      "code": "141102" },

    {
      "name": "文水县",
      "code": "141121" },

    {
      "name": "交城县",
      "code": "141122" },

    {
      "name": "兴县",
      "code": "141123" },

    {
      "name": "临县",
      "code": "141124" },

    {
      "name": "柳林县",
      "code": "141125" },

    {
      "name": "石楼县",
      "code": "141126" },

    {
      "name": "岚县",
      "code": "141127" },

    {
      "name": "方山县",
      "code": "141128" },

    {
      "name": "中阳县",
      "code": "141129" },

    {
      "name": "交口县",
      "code": "141130" },

    {
      "name": "孝义市",
      "code": "141181" },

    {
      "name": "汾阳市",
      "code": "141182" }] }] },





{
  "name": "内蒙古自治区",
  "code": "150000",
  "sub": [
  {
    "name": "呼和浩特市",
    "code": "150100",
    "sub": [
    {
      "name": "市辖区",
      "code": "150101" },

    {
      "name": "新城区",
      "code": "150102" },

    {
      "name": "回民区",
      "code": "150103" },

    {
      "name": "玉泉区",
      "code": "150104" },

    {
      "name": "赛罕区",
      "code": "150105" },

    {
      "name": "土默特左旗",
      "code": "150121" },

    {
      "name": "托克托县",
      "code": "150122" },

    {
      "name": "和林格尔县",
      "code": "150123" },

    {
      "name": "清水河县",
      "code": "150124" },

    {
      "name": "武川县",
      "code": "150125" }] },



  {
    "name": "包头市",
    "code": "150200",
    "sub": [
    {
      "name": "市辖区",
      "code": "150201" },

    {
      "name": "东河区",
      "code": "150202" },

    {
      "name": "昆都仑区",
      "code": "150203" },

    {
      "name": "青山区",
      "code": "150204" },

    {
      "name": "石拐区",
      "code": "150205" },

    {
      "name": "白云鄂博矿区",
      "code": "150206" },

    {
      "name": "九原区",
      "code": "150207" },

    {
      "name": "土默特右旗",
      "code": "150221" },

    {
      "name": "固阳县",
      "code": "150222" },

    {
      "name": "达尔罕茂明安联合旗",
      "code": "150223" }] },



  {
    "name": "乌海市",
    "code": "150300",
    "sub": [
    {
      "name": "市辖区",
      "code": "150301" },

    {
      "name": "海勃湾区",
      "code": "150302" },

    {
      "name": "海南区",
      "code": "150303" },

    {
      "name": "乌达区",
      "code": "150304" }] },



  {
    "name": "赤峰市",
    "code": "150400",
    "sub": [
    {
      "name": "市辖区",
      "code": "150401" },

    {
      "name": "红山区",
      "code": "150402" },

    {
      "name": "元宝山区",
      "code": "150403" },

    {
      "name": "松山区",
      "code": "150404" },

    {
      "name": "阿鲁科尔沁旗",
      "code": "150421" },

    {
      "name": "巴林左旗",
      "code": "150422" },

    {
      "name": "巴林右旗",
      "code": "150423" },

    {
      "name": "林西县",
      "code": "150424" },

    {
      "name": "克什克腾旗",
      "code": "150425" },

    {
      "name": "翁牛特旗",
      "code": "150426" },

    {
      "name": "喀喇沁旗",
      "code": "150428" },

    {
      "name": "宁城县",
      "code": "150429" },

    {
      "name": "敖汉旗",
      "code": "150430" }] },



  {
    "name": "通辽市",
    "code": "150500",
    "sub": [
    {
      "name": "市辖区",
      "code": "150501" },

    {
      "name": "科尔沁区",
      "code": "150502" },

    {
      "name": "科尔沁左翼中旗",
      "code": "150521" },

    {
      "name": "科尔沁左翼后旗",
      "code": "150522" },

    {
      "name": "开鲁县",
      "code": "150523" },

    {
      "name": "库伦旗",
      "code": "150524" },

    {
      "name": "奈曼旗",
      "code": "150525" },

    {
      "name": "扎鲁特旗",
      "code": "150526" },

    {
      "name": "霍林郭勒市",
      "code": "150581" }] },



  {
    "name": "鄂尔多斯市",
    "code": "150600",
    "sub": [
    {
      "name": "市辖区",
      "code": "150601" },

    {
      "name": "东胜区",
      "code": "150602" },

    {
      "name": "达拉特旗",
      "code": "150621" },

    {
      "name": "准格尔旗",
      "code": "150622" },

    {
      "name": "鄂托克前旗",
      "code": "150623" },

    {
      "name": "鄂托克旗",
      "code": "150624" },

    {
      "name": "杭锦旗",
      "code": "150625" },

    {
      "name": "乌审旗",
      "code": "150626" },

    {
      "name": "伊金霍洛旗",
      "code": "150627" }] },



  {
    "name": "呼伦贝尔市",
    "code": "150700",
    "sub": [
    {
      "name": "市辖区",
      "code": "150701" },

    {
      "name": "海拉尔区",
      "code": "150702" },

    {
      "name": "扎赉诺尔区",
      "code": "150703" },

    {
      "name": "阿荣旗",
      "code": "150721" },

    {
      "name": "莫力达瓦达斡尔族自治旗",
      "code": "150722" },

    {
      "name": "鄂伦春自治旗",
      "code": "150723" },

    {
      "name": "鄂温克族自治旗",
      "code": "150724" },

    {
      "name": "陈巴尔虎旗",
      "code": "150725" },

    {
      "name": "新巴尔虎左旗",
      "code": "150726" },

    {
      "name": "新巴尔虎右旗",
      "code": "150727" },

    {
      "name": "满洲里市",
      "code": "150781" },

    {
      "name": "牙克石市",
      "code": "150782" },

    {
      "name": "扎兰屯市",
      "code": "150783" },

    {
      "name": "额尔古纳市",
      "code": "150784" },

    {
      "name": "根河市",
      "code": "150785" }] },



  {
    "name": "巴彦淖尔市",
    "code": "150800",
    "sub": [
    {
      "name": "市辖区",
      "code": "150801" },

    {
      "name": "临河区",
      "code": "150802" },

    {
      "name": "五原县",
      "code": "150821" },

    {
      "name": "磴口县",
      "code": "150822" },

    {
      "name": "乌拉特前旗",
      "code": "150823" },

    {
      "name": "乌拉特中旗",
      "code": "150824" },

    {
      "name": "乌拉特后旗",
      "code": "150825" },

    {
      "name": "杭锦后旗",
      "code": "150826" }] },



  {
    "name": "乌兰察布市",
    "code": "150900",
    "sub": [
    {
      "name": "市辖区",
      "code": "150901" },

    {
      "name": "集宁区",
      "code": "150902" },

    {
      "name": "卓资县",
      "code": "150921" },

    {
      "name": "化德县",
      "code": "150922" },

    {
      "name": "商都县",
      "code": "150923" },

    {
      "name": "兴和县",
      "code": "150924" },

    {
      "name": "凉城县",
      "code": "150925" },

    {
      "name": "察哈尔右翼前旗",
      "code": "150926" },

    {
      "name": "察哈尔右翼中旗",
      "code": "150927" },

    {
      "name": "察哈尔右翼后旗",
      "code": "150928" },

    {
      "name": "四子王旗",
      "code": "150929" },

    {
      "name": "丰镇市",
      "code": "150981" }] },



  {
    "name": "兴安盟",
    "code": "152200",
    "sub": [
    {
      "name": "乌兰浩特市",
      "code": "152201" },

    {
      "name": "阿尔山市",
      "code": "152202" },

    {
      "name": "科尔沁右翼前旗",
      "code": "152221" },

    {
      "name": "科尔沁右翼中旗",
      "code": "152222" },

    {
      "name": "扎赉特旗",
      "code": "152223" },

    {
      "name": "突泉县",
      "code": "152224" }] },



  {
    "name": "锡林郭勒盟",
    "code": "152500",
    "sub": [
    {
      "name": "二连浩特市",
      "code": "152501" },

    {
      "name": "锡林浩特市",
      "code": "152502" },

    {
      "name": "阿巴嘎旗",
      "code": "152522" },

    {
      "name": "苏尼特左旗",
      "code": "152523" },

    {
      "name": "苏尼特右旗",
      "code": "152524" },

    {
      "name": "东乌珠穆沁旗",
      "code": "152525" },

    {
      "name": "西乌珠穆沁旗",
      "code": "152526" },

    {
      "name": "太仆寺旗",
      "code": "152527" },

    {
      "name": "镶黄旗",
      "code": "152528" },

    {
      "name": "正镶白旗",
      "code": "152529" },

    {
      "name": "正蓝旗",
      "code": "152530" },

    {
      "name": "多伦县",
      "code": "152531" }] },



  {
    "name": "阿拉善盟",
    "code": "152900",
    "sub": [
    {
      "name": "阿拉善左旗",
      "code": "152921" },

    {
      "name": "阿拉善右旗",
      "code": "152922" },

    {
      "name": "额济纳旗",
      "code": "152923" }] }] },





{
  "name": "辽宁省",
  "code": "210000",
  "sub": [
  {
    "name": "沈阳市",
    "code": "210100",
    "sub": [
    {
      "name": "市辖区",
      "code": "210101" },

    {
      "name": "和平区",
      "code": "210102" },

    {
      "name": "沈河区",
      "code": "210103" },

    {
      "name": "大东区",
      "code": "210104" },

    {
      "name": "皇姑区",
      "code": "210105" },

    {
      "name": "铁西区",
      "code": "210106" },

    {
      "name": "苏家屯区",
      "code": "210111" },

    {
      "name": "浑南区",
      "code": "210112" },

    {
      "name": "沈北新区",
      "code": "210113" },

    {
      "name": "于洪区",
      "code": "210114" },

    {
      "name": "辽中县",
      "code": "210122" },

    {
      "name": "康平县",
      "code": "210123" },

    {
      "name": "法库县",
      "code": "210124" },

    {
      "name": "新民市",
      "code": "210181" }] },



  {
    "name": "大连市",
    "code": "210200",
    "sub": [
    {
      "name": "市辖区",
      "code": "210201" },

    {
      "name": "中山区",
      "code": "210202" },

    {
      "name": "西岗区",
      "code": "210203" },

    {
      "name": "沙河口区",
      "code": "210204" },

    {
      "name": "甘井子区",
      "code": "210211" },

    {
      "name": "旅顺口区",
      "code": "210212" },

    {
      "name": "金州区",
      "code": "210213" },

    {
      "name": "长海县",
      "code": "210224" },

    {
      "name": "瓦房店市",
      "code": "210281" },

    {
      "name": "普兰店市",
      "code": "210282" },

    {
      "name": "庄河市",
      "code": "210283" }] },



  {
    "name": "鞍山市",
    "code": "210300",
    "sub": [
    {
      "name": "市辖区",
      "code": "210301" },

    {
      "name": "铁东区",
      "code": "210302" },

    {
      "name": "铁西区",
      "code": "210303" },

    {
      "name": "立山区",
      "code": "210304" },

    {
      "name": "千山区",
      "code": "210311" },

    {
      "name": "台安县",
      "code": "210321" },

    {
      "name": "岫岩满族自治县",
      "code": "210323" },

    {
      "name": "海城市",
      "code": "210381" }] },



  {
    "name": "抚顺市",
    "code": "210400",
    "sub": [
    {
      "name": "市辖区",
      "code": "210401" },

    {
      "name": "新抚区",
      "code": "210402" },

    {
      "name": "东洲区",
      "code": "210403" },

    {
      "name": "望花区",
      "code": "210404" },

    {
      "name": "顺城区",
      "code": "210411" },

    {
      "name": "抚顺县",
      "code": "210421" },

    {
      "name": "新宾满族自治县",
      "code": "210422" },

    {
      "name": "清原满族自治县",
      "code": "210423" }] },



  {
    "name": "本溪市",
    "code": "210500",
    "sub": [
    {
      "name": "市辖区",
      "code": "210501" },

    {
      "name": "平山区",
      "code": "210502" },

    {
      "name": "溪湖区",
      "code": "210503" },

    {
      "name": "明山区",
      "code": "210504" },

    {
      "name": "南芬区",
      "code": "210505" },

    {
      "name": "本溪满族自治县",
      "code": "210521" },

    {
      "name": "桓仁满族自治县",
      "code": "210522" }] },



  {
    "name": "丹东市",
    "code": "210600",
    "sub": [
    {
      "name": "市辖区",
      "code": "210601" },

    {
      "name": "元宝区",
      "code": "210602" },

    {
      "name": "振兴区",
      "code": "210603" },

    {
      "name": "振安区",
      "code": "210604" },

    {
      "name": "宽甸满族自治县",
      "code": "210624" },

    {
      "name": "东港市",
      "code": "210681" },

    {
      "name": "凤城市",
      "code": "210682" }] },



  {
    "name": "锦州市",
    "code": "210700",
    "sub": [
    {
      "name": "市辖区",
      "code": "210701" },

    {
      "name": "古塔区",
      "code": "210702" },

    {
      "name": "凌河区",
      "code": "210703" },

    {
      "name": "太和区",
      "code": "210711" },

    {
      "name": "黑山县",
      "code": "210726" },

    {
      "name": "义县",
      "code": "210727" },

    {
      "name": "凌海市",
      "code": "210781" },

    {
      "name": "北镇市",
      "code": "210782" }] },



  {
    "name": "营口市",
    "code": "210800",
    "sub": [
    {
      "name": "市辖区",
      "code": "210801" },

    {
      "name": "站前区",
      "code": "210802" },

    {
      "name": "西市区",
      "code": "210803" },

    {
      "name": "鲅鱼圈区",
      "code": "210804" },

    {
      "name": "老边区",
      "code": "210811" },

    {
      "name": "盖州市",
      "code": "210881" },

    {
      "name": "大石桥市",
      "code": "210882" }] },



  {
    "name": "阜新市",
    "code": "210900",
    "sub": [
    {
      "name": "市辖区",
      "code": "210901" },

    {
      "name": "海州区",
      "code": "210902" },

    {
      "name": "新邱区",
      "code": "210903" },

    {
      "name": "太平区",
      "code": "210904" },

    {
      "name": "清河门区",
      "code": "210905" },

    {
      "name": "细河区",
      "code": "210911" },

    {
      "name": "阜新蒙古族自治县",
      "code": "210921" },

    {
      "name": "彰武县",
      "code": "210922" }] },



  {
    "name": "辽阳市",
    "code": "211000",
    "sub": [
    {
      "name": "市辖区",
      "code": "211001" },

    {
      "name": "白塔区",
      "code": "211002" },

    {
      "name": "文圣区",
      "code": "211003" },

    {
      "name": "宏伟区",
      "code": "211004" },

    {
      "name": "弓长岭区",
      "code": "211005" },

    {
      "name": "太子河区",
      "code": "211011" },

    {
      "name": "辽阳县",
      "code": "211021" },

    {
      "name": "灯塔市",
      "code": "211081" }] },



  {
    "name": "盘锦市",
    "code": "211100",
    "sub": [
    {
      "name": "市辖区",
      "code": "211101" },

    {
      "name": "双台子区",
      "code": "211102" },

    {
      "name": "兴隆台区",
      "code": "211103" },

    {
      "name": "大洼县",
      "code": "211121" },

    {
      "name": "盘山县",
      "code": "211122" }] },



  {
    "name": "铁岭市",
    "code": "211200",
    "sub": [
    {
      "name": "市辖区",
      "code": "211201" },

    {
      "name": "银州区",
      "code": "211202" },

    {
      "name": "清河区",
      "code": "211204" },

    {
      "name": "铁岭县",
      "code": "211221" },

    {
      "name": "西丰县",
      "code": "211223" },

    {
      "name": "昌图县",
      "code": "211224" },

    {
      "name": "调兵山市",
      "code": "211281" },

    {
      "name": "开原市",
      "code": "211282" }] },



  {
    "name": "朝阳市",
    "code": "211300",
    "sub": [
    {
      "name": "市辖区",
      "code": "211301" },

    {
      "name": "双塔区",
      "code": "211302" },

    {
      "name": "龙城区",
      "code": "211303" },

    {
      "name": "朝阳县",
      "code": "211321" },

    {
      "name": "建平县",
      "code": "211322" },

    {
      "name": "喀喇沁左翼蒙古族自治县",
      "code": "211324" },

    {
      "name": "北票市",
      "code": "211381" },

    {
      "name": "凌源市",
      "code": "211382" }] },



  {
    "name": "葫芦岛市",
    "code": "211400",
    "sub": [
    {
      "name": "市辖区",
      "code": "211401" },

    {
      "name": "连山区",
      "code": "211402" },

    {
      "name": "龙港区",
      "code": "211403" },

    {
      "name": "南票区",
      "code": "211404" },

    {
      "name": "绥中县",
      "code": "211421" },

    {
      "name": "建昌县",
      "code": "211422" },

    {
      "name": "兴城市",
      "code": "211481" }] }] },





{
  "name": "吉林省",
  "code": "220000",
  "sub": [
  {
    "name": "长春市",
    "code": "220100",
    "sub": [
    {
      "name": "市辖区",
      "code": "220101" },

    {
      "name": "南关区",
      "code": "220102" },

    {
      "name": "宽城区",
      "code": "220103" },

    {
      "name": "朝阳区",
      "code": "220104" },

    {
      "name": "二道区",
      "code": "220105" },

    {
      "name": "绿园区",
      "code": "220106" },

    {
      "name": "双阳区",
      "code": "220112" },

    {
      "name": "九台区",
      "code": "220113" },

    {
      "name": "农安县",
      "code": "220122" },

    {
      "name": "榆树市",
      "code": "220182" },

    {
      "name": "德惠市",
      "code": "220183" }] },



  {
    "name": "吉林市",
    "code": "220200",
    "sub": [
    {
      "name": "市辖区",
      "code": "220201" },

    {
      "name": "昌邑区",
      "code": "220202" },

    {
      "name": "龙潭区",
      "code": "220203" },

    {
      "name": "船营区",
      "code": "220204" },

    {
      "name": "丰满区",
      "code": "220211" },

    {
      "name": "永吉县",
      "code": "220221" },

    {
      "name": "蛟河市",
      "code": "220281" },

    {
      "name": "桦甸市",
      "code": "220282" },

    {
      "name": "舒兰市",
      "code": "220283" },

    {
      "name": "磐石市",
      "code": "220284" }] },



  {
    "name": "四平市",
    "code": "220300",
    "sub": [
    {
      "name": "市辖区",
      "code": "220301" },

    {
      "name": "铁西区",
      "code": "220302" },

    {
      "name": "铁东区",
      "code": "220303" },

    {
      "name": "梨树县",
      "code": "220322" },

    {
      "name": "伊通满族自治县",
      "code": "220323" },

    {
      "name": "公主岭市",
      "code": "220381" },

    {
      "name": "双辽市",
      "code": "220382" }] },



  {
    "name": "辽源市",
    "code": "220400",
    "sub": [
    {
      "name": "市辖区",
      "code": "220401" },

    {
      "name": "龙山区",
      "code": "220402" },

    {
      "name": "西安区",
      "code": "220403" },

    {
      "name": "东丰县",
      "code": "220421" },

    {
      "name": "东辽县",
      "code": "220422" }] },



  {
    "name": "通化市",
    "code": "220500",
    "sub": [
    {
      "name": "市辖区",
      "code": "220501" },

    {
      "name": "东昌区",
      "code": "220502" },

    {
      "name": "二道江区",
      "code": "220503" },

    {
      "name": "通化县",
      "code": "220521" },

    {
      "name": "辉南县",
      "code": "220523" },

    {
      "name": "柳河县",
      "code": "220524" },

    {
      "name": "梅河口市",
      "code": "220581" },

    {
      "name": "集安市",
      "code": "220582" }] },



  {
    "name": "白山市",
    "code": "220600",
    "sub": [
    {
      "name": "市辖区",
      "code": "220601" },

    {
      "name": "浑江区",
      "code": "220602" },

    {
      "name": "江源区",
      "code": "220605" },

    {
      "name": "抚松县",
      "code": "220621" },

    {
      "name": "靖宇县",
      "code": "220622" },

    {
      "name": "长白朝鲜族自治县",
      "code": "220623" },

    {
      "name": "临江市",
      "code": "220681" }] },



  {
    "name": "松原市",
    "code": "220700",
    "sub": [
    {
      "name": "市辖区",
      "code": "220701" },

    {
      "name": "宁江区",
      "code": "220702" },

    {
      "name": "前郭尔罗斯蒙古族自治县",
      "code": "220721" },

    {
      "name": "长岭县",
      "code": "220722" },

    {
      "name": "乾安县",
      "code": "220723" },

    {
      "name": "扶余市",
      "code": "220781" }] },



  {
    "name": "白城市",
    "code": "220800",
    "sub": [
    {
      "name": "市辖区",
      "code": "220801" },

    {
      "name": "洮北区",
      "code": "220802" },

    {
      "name": "镇赉县",
      "code": "220821" },

    {
      "name": "通榆县",
      "code": "220822" },

    {
      "name": "洮南市",
      "code": "220881" },

    {
      "name": "大安市",
      "code": "220882" }] },



  {
    "name": "延边朝鲜族自治州",
    "code": "222400",
    "sub": [
    {
      "name": "延吉市",
      "code": "222401" },

    {
      "name": "图们市",
      "code": "222402" },

    {
      "name": "敦化市",
      "code": "222403" },

    {
      "name": "珲春市",
      "code": "222404" },

    {
      "name": "龙井市",
      "code": "222405" },

    {
      "name": "和龙市",
      "code": "222406" },

    {
      "name": "汪清县",
      "code": "222424" },

    {
      "name": "安图县",
      "code": "222426" }] }] },





{
  "name": "黑龙江省",
  "code": "230000",
  "sub": [
  {
    "name": "哈尔滨市",
    "code": "230100",
    "sub": [
    {
      "name": "市辖区",
      "code": "230101" },

    {
      "name": "道里区",
      "code": "230102" },

    {
      "name": "南岗区",
      "code": "230103" },

    {
      "name": "道外区",
      "code": "230104" },

    {
      "name": "平房区",
      "code": "230108" },

    {
      "name": "松北区",
      "code": "230109" },

    {
      "name": "香坊区",
      "code": "230110" },

    {
      "name": "呼兰区",
      "code": "230111" },

    {
      "name": "阿城区",
      "code": "230112" },

    {
      "name": "双城区",
      "code": "230113" },

    {
      "name": "依兰县",
      "code": "230123" },

    {
      "name": "方正县",
      "code": "230124" },

    {
      "name": "宾县",
      "code": "230125" },

    {
      "name": "巴彦县",
      "code": "230126" },

    {
      "name": "木兰县",
      "code": "230127" },

    {
      "name": "通河县",
      "code": "230128" },

    {
      "name": "延寿县",
      "code": "230129" },

    {
      "name": "尚志市",
      "code": "230183" },

    {
      "name": "五常市",
      "code": "230184" }] },



  {
    "name": "齐齐哈尔市",
    "code": "230200",
    "sub": [
    {
      "name": "市辖区",
      "code": "230201" },

    {
      "name": "龙沙区",
      "code": "230202" },

    {
      "name": "建华区",
      "code": "230203" },

    {
      "name": "铁锋区",
      "code": "230204" },

    {
      "name": "昂昂溪区",
      "code": "230205" },

    {
      "name": "富拉尔基区",
      "code": "230206" },

    {
      "name": "碾子山区",
      "code": "230207" },

    {
      "name": "梅里斯达斡尔族区",
      "code": "230208" },

    {
      "name": "龙江县",
      "code": "230221" },

    {
      "name": "依安县",
      "code": "230223" },

    {
      "name": "泰来县",
      "code": "230224" },

    {
      "name": "甘南县",
      "code": "230225" },

    {
      "name": "富裕县",
      "code": "230227" },

    {
      "name": "克山县",
      "code": "230229" },

    {
      "name": "克东县",
      "code": "230230" },

    {
      "name": "拜泉县",
      "code": "230231" },

    {
      "name": "讷河市",
      "code": "230281" }] },



  {
    "name": "鸡西市",
    "code": "230300",
    "sub": [
    {
      "name": "市辖区",
      "code": "230301" },

    {
      "name": "鸡冠区",
      "code": "230302" },

    {
      "name": "恒山区",
      "code": "230303" },

    {
      "name": "滴道区",
      "code": "230304" },

    {
      "name": "梨树区",
      "code": "230305" },

    {
      "name": "城子河区",
      "code": "230306" },

    {
      "name": "麻山区",
      "code": "230307" },

    {
      "name": "鸡东县",
      "code": "230321" },

    {
      "name": "虎林市",
      "code": "230381" },

    {
      "name": "密山市",
      "code": "230382" }] },



  {
    "name": "鹤岗市",
    "code": "230400",
    "sub": [
    {
      "name": "市辖区",
      "code": "230401" },

    {
      "name": "向阳区",
      "code": "230402" },

    {
      "name": "工农区",
      "code": "230403" },

    {
      "name": "南山区",
      "code": "230404" },

    {
      "name": "兴安区",
      "code": "230405" },

    {
      "name": "东山区",
      "code": "230406" },

    {
      "name": "兴山区",
      "code": "230407" },

    {
      "name": "萝北县",
      "code": "230421" },

    {
      "name": "绥滨县",
      "code": "230422" }] },



  {
    "name": "双鸭山市",
    "code": "230500",
    "sub": [
    {
      "name": "市辖区",
      "code": "230501" },

    {
      "name": "尖山区",
      "code": "230502" },

    {
      "name": "岭东区",
      "code": "230503" },

    {
      "name": "四方台区",
      "code": "230505" },

    {
      "name": "宝山区",
      "code": "230506" },

    {
      "name": "集贤县",
      "code": "230521" },

    {
      "name": "友谊县",
      "code": "230522" },

    {
      "name": "宝清县",
      "code": "230523" },

    {
      "name": "饶河县",
      "code": "230524" }] },



  {
    "name": "大庆市",
    "code": "230600",
    "sub": [
    {
      "name": "市辖区",
      "code": "230601" },

    {
      "name": "萨尔图区",
      "code": "230602" },

    {
      "name": "龙凤区",
      "code": "230603" },

    {
      "name": "让胡路区",
      "code": "230604" },

    {
      "name": "红岗区",
      "code": "230605" },

    {
      "name": "大同区",
      "code": "230606" },

    {
      "name": "肇州县",
      "code": "230621" },

    {
      "name": "肇源县",
      "code": "230622" },

    {
      "name": "林甸县",
      "code": "230623" },

    {
      "name": "杜尔伯特蒙古族自治县",
      "code": "230624" }] },



  {
    "name": "伊春市",
    "code": "230700",
    "sub": [
    {
      "name": "市辖区",
      "code": "230701" },

    {
      "name": "伊春区",
      "code": "230702" },

    {
      "name": "南岔区",
      "code": "230703" },

    {
      "name": "友好区",
      "code": "230704" },

    {
      "name": "西林区",
      "code": "230705" },

    {
      "name": "翠峦区",
      "code": "230706" },

    {
      "name": "新青区",
      "code": "230707" },

    {
      "name": "美溪区",
      "code": "230708" },

    {
      "name": "金山屯区",
      "code": "230709" },

    {
      "name": "五营区",
      "code": "230710" },

    {
      "name": "乌马河区",
      "code": "230711" },

    {
      "name": "汤旺河区",
      "code": "230712" },

    {
      "name": "带岭区",
      "code": "230713" },

    {
      "name": "乌伊岭区",
      "code": "230714" },

    {
      "name": "红星区",
      "code": "230715" },

    {
      "name": "上甘岭区",
      "code": "230716" },

    {
      "name": "嘉荫县",
      "code": "230722" },

    {
      "name": "铁力市",
      "code": "230781" }] },



  {
    "name": "佳木斯市",
    "code": "230800",
    "sub": [
    {
      "name": "市辖区",
      "code": "230801" },

    {
      "name": "向阳区",
      "code": "230803" },

    {
      "name": "前进区",
      "code": "230804" },

    {
      "name": "东风区",
      "code": "230805" },

    {
      "name": "郊区",
      "code": "230811" },

    {
      "name": "桦南县",
      "code": "230822" },

    {
      "name": "桦川县",
      "code": "230826" },

    {
      "name": "汤原县",
      "code": "230828" },

    {
      "name": "抚远县",
      "code": "230833" },

    {
      "name": "同江市",
      "code": "230881" },

    {
      "name": "富锦市",
      "code": "230882" }] },



  {
    "name": "七台河市",
    "code": "230900",
    "sub": [
    {
      "name": "市辖区",
      "code": "230901" },

    {
      "name": "新兴区",
      "code": "230902" },

    {
      "name": "桃山区",
      "code": "230903" },

    {
      "name": "茄子河区",
      "code": "230904" },

    {
      "name": "勃利县",
      "code": "230921" }] },



  {
    "name": "牡丹江市",
    "code": "231000",
    "sub": [
    {
      "name": "市辖区",
      "code": "231001" },

    {
      "name": "东安区",
      "code": "231002" },

    {
      "name": "阳明区",
      "code": "231003" },

    {
      "name": "爱民区",
      "code": "231004" },

    {
      "name": "西安区",
      "code": "231005" },

    {
      "name": "东宁县",
      "code": "231024" },

    {
      "name": "林口县",
      "code": "231025" },

    {
      "name": "绥芬河市",
      "code": "231081" },

    {
      "name": "海林市",
      "code": "231083" },

    {
      "name": "宁安市",
      "code": "231084" },

    {
      "name": "穆棱市",
      "code": "231085" }] },



  {
    "name": "黑河市",
    "code": "231100",
    "sub": [
    {
      "name": "市辖区",
      "code": "231101" },

    {
      "name": "爱辉区",
      "code": "231102" },

    {
      "name": "嫩江县",
      "code": "231121" },

    {
      "name": "逊克县",
      "code": "231123" },

    {
      "name": "孙吴县",
      "code": "231124" },

    {
      "name": "北安市",
      "code": "231181" },

    {
      "name": "五大连池市",
      "code": "231182" }] },



  {
    "name": "绥化市",
    "code": "231200",
    "sub": [
    {
      "name": "市辖区",
      "code": "231201" },

    {
      "name": "北林区",
      "code": "231202" },

    {
      "name": "望奎县",
      "code": "231221" },

    {
      "name": "兰西县",
      "code": "231222" },

    {
      "name": "青冈县",
      "code": "231223" },

    {
      "name": "庆安县",
      "code": "231224" },

    {
      "name": "明水县",
      "code": "231225" },

    {
      "name": "绥棱县",
      "code": "231226" },

    {
      "name": "安达市",
      "code": "231281" },

    {
      "name": "肇东市",
      "code": "231282" },

    {
      "name": "海伦市",
      "code": "231283" }] },



  {
    "name": "大兴安岭地区",
    "code": "232700",
    "sub": [
    {
      "name": "呼玛县",
      "code": "232721" },

    {
      "name": "塔河县",
      "code": "232722" },

    {
      "name": "漠河县",
      "code": "232723" }] }] },





{
  "name": "上海",
  "code": "310000",
  "sub": [
  {
    "name": "上海市",
    "code": "310000",
    "sub": [
    {
      "name": "黄浦区",
      "code": "310101" },

    {
      "name": "徐汇区",
      "code": "310104" },

    {
      "name": "长宁区",
      "code": "310105" },

    {
      "name": "静安区",
      "code": "310106" },

    {
      "name": "普陀区",
      "code": "310107" },

    {
      "name": "闸北区",
      "code": "310108" },

    {
      "name": "虹口区",
      "code": "310109" },

    {
      "name": "杨浦区",
      "code": "310110" },

    {
      "name": "闵行区",
      "code": "310112" },

    {
      "name": "宝山区",
      "code": "310113" },

    {
      "name": "嘉定区",
      "code": "310114" },

    {
      "name": "浦东新区",
      "code": "310115" },

    {
      "name": "金山区",
      "code": "310116" },

    {
      "name": "松江区",
      "code": "310117" },

    {
      "name": "青浦区",
      "code": "310118" },

    {
      "name": "奉贤区",
      "code": "310120" },

    {
      "name": "崇明县",
      "code": "310230" }] }] },





{
  "name": "江苏省",
  "code": "320000",
  "sub": [
  {
    "name": "南京市",
    "code": "320100",
    "sub": [
    {
      "name": "市辖区",
      "code": "320101" },

    {
      "name": "玄武区",
      "code": "320102" },

    {
      "name": "秦淮区",
      "code": "320104" },

    {
      "name": "建邺区",
      "code": "320105" },

    {
      "name": "鼓楼区",
      "code": "320106" },

    {
      "name": "浦口区",
      "code": "320111" },

    {
      "name": "栖霞区",
      "code": "320113" },

    {
      "name": "雨花台区",
      "code": "320114" },

    {
      "name": "江宁区",
      "code": "320115" },

    {
      "name": "六合区",
      "code": "320116" },

    {
      "name": "溧水区",
      "code": "320117" },

    {
      "name": "高淳区",
      "code": "320118" }] },



  {
    "name": "无锡市",
    "code": "320200",
    "sub": [
    {
      "name": "市辖区",
      "code": "320201" },

    {
      "name": "崇安区",
      "code": "320202" },

    {
      "name": "南长区",
      "code": "320203" },

    {
      "name": "北塘区",
      "code": "320204" },

    {
      "name": "锡山区",
      "code": "320205" },

    {
      "name": "惠山区",
      "code": "320206" },

    {
      "name": "滨湖区",
      "code": "320211" },

    {
      "name": "江阴市",
      "code": "320281" },

    {
      "name": "宜兴市",
      "code": "320282" }] },



  {
    "name": "徐州市",
    "code": "320300",
    "sub": [
    {
      "name": "市辖区",
      "code": "320301" },

    {
      "name": "鼓楼区",
      "code": "320302" },

    {
      "name": "云龙区",
      "code": "320303" },

    {
      "name": "贾汪区",
      "code": "320305" },

    {
      "name": "泉山区",
      "code": "320311" },

    {
      "name": "铜山区",
      "code": "320312" },

    {
      "name": "丰县",
      "code": "320321" },

    {
      "name": "沛县",
      "code": "320322" },

    {
      "name": "睢宁县",
      "code": "320324" },

    {
      "name": "新沂市",
      "code": "320381" },

    {
      "name": "邳州市",
      "code": "320382" }] },



  {
    "name": "常州市",
    "code": "320400",
    "sub": [
    {
      "name": "市辖区",
      "code": "320401" },

    {
      "name": "天宁区",
      "code": "320402" },

    {
      "name": "钟楼区",
      "code": "320404" },

    {
      "name": "戚墅堰区",
      "code": "320405" },

    {
      "name": "新北区",
      "code": "320411" },

    {
      "name": "武进区",
      "code": "320412" },

    {
      "name": "溧阳市",
      "code": "320481" },

    {
      "name": "金坛市",
      "code": "320482" }] },



  {
    "name": "苏州市",
    "code": "320500",
    "sub": [
    {
      "name": "市辖区",
      "code": "320501" },

    {
      "name": "虎丘区",
      "code": "320505" },

    {
      "name": "吴中区",
      "code": "320506" },

    {
      "name": "相城区",
      "code": "320507" },

    {
      "name": "姑苏区",
      "code": "320508" },

    {
      "name": "吴江区",
      "code": "320509" },

    {
      "name": "常熟市",
      "code": "320581" },

    {
      "name": "张家港市",
      "code": "320582" },

    {
      "name": "昆山市",
      "code": "320583" },

    {
      "name": "太仓市",
      "code": "320585" }] },



  {
    "name": "南通市",
    "code": "320600",
    "sub": [
    {
      "name": "市辖区",
      "code": "320601" },

    {
      "name": "崇川区",
      "code": "320602" },

    {
      "name": "港闸区",
      "code": "320611" },

    {
      "name": "通州区",
      "code": "320612" },

    {
      "name": "海安县",
      "code": "320621" },

    {
      "name": "如东县",
      "code": "320623" },

    {
      "name": "启东市",
      "code": "320681" },

    {
      "name": "如皋市",
      "code": "320682" },

    {
      "name": "海门市",
      "code": "320684" }] },



  {
    "name": "连云港市",
    "code": "320700",
    "sub": [
    {
      "name": "市辖区",
      "code": "320701" },

    {
      "name": "连云区",
      "code": "320703" },

    {
      "name": "海州区",
      "code": "320706" },

    {
      "name": "赣榆区",
      "code": "320707" },

    {
      "name": "东海县",
      "code": "320722" },

    {
      "name": "灌云县",
      "code": "320723" },

    {
      "name": "灌南县",
      "code": "320724" }] },



  {
    "name": "淮安市",
    "code": "320800",
    "sub": [
    {
      "name": "市辖区",
      "code": "320801" },

    {
      "name": "清河区",
      "code": "320802" },

    {
      "name": "淮安区",
      "code": "320803" },

    {
      "name": "淮阴区",
      "code": "320804" },

    {
      "name": "清浦区",
      "code": "320811" },

    {
      "name": "涟水县",
      "code": "320826" },

    {
      "name": "洪泽县",
      "code": "320829" },

    {
      "name": "盱眙县",
      "code": "320830" },

    {
      "name": "金湖县",
      "code": "320831" }] },



  {
    "name": "盐城市",
    "code": "320900",
    "sub": [
    {
      "name": "市辖区",
      "code": "320901" },

    {
      "name": "亭湖区",
      "code": "320902" },

    {
      "name": "盐都区",
      "code": "320903" },

    {
      "name": "响水县",
      "code": "320921" },

    {
      "name": "滨海县",
      "code": "320922" },

    {
      "name": "阜宁县",
      "code": "320923" },

    {
      "name": "射阳县",
      "code": "320924" },

    {
      "name": "建湖县",
      "code": "320925" },

    {
      "name": "东台市",
      "code": "320981" },

    {
      "name": "大丰市",
      "code": "320982" }] },



  {
    "name": "扬州市",
    "code": "321000",
    "sub": [
    {
      "name": "市辖区",
      "code": "321001" },

    {
      "name": "广陵区",
      "code": "321002" },

    {
      "name": "邗江区",
      "code": "321003" },

    {
      "name": "江都区",
      "code": "321012" },

    {
      "name": "宝应县",
      "code": "321023" },

    {
      "name": "仪征市",
      "code": "321081" },

    {
      "name": "高邮市",
      "code": "321084" }] },



  {
    "name": "镇江市",
    "code": "321100",
    "sub": [
    {
      "name": "市辖区",
      "code": "321101" },

    {
      "name": "京口区",
      "code": "321102" },

    {
      "name": "润州区",
      "code": "321111" },

    {
      "name": "丹徒区",
      "code": "321112" },

    {
      "name": "丹阳市",
      "code": "321181" },

    {
      "name": "扬中市",
      "code": "321182" },

    {
      "name": "句容市",
      "code": "321183" }] },



  {
    "name": "泰州市",
    "code": "321200",
    "sub": [
    {
      "name": "市辖区",
      "code": "321201" },

    {
      "name": "海陵区",
      "code": "321202" },

    {
      "name": "高港区",
      "code": "321203" },

    {
      "name": "姜堰区",
      "code": "321204" },

    {
      "name": "兴化市",
      "code": "321281" },

    {
      "name": "靖江市",
      "code": "321282" },

    {
      "name": "泰兴市",
      "code": "321283" }] },



  {
    "name": "宿迁市",
    "code": "321300",
    "sub": [
    {
      "name": "市辖区",
      "code": "321301" },

    {
      "name": "宿城区",
      "code": "321302" },

    {
      "name": "宿豫区",
      "code": "321311" },

    {
      "name": "沭阳县",
      "code": "321322" },

    {
      "name": "泗阳县",
      "code": "321323" },

    {
      "name": "泗洪县",
      "code": "321324" }] }] },





{
  "name": "浙江省",
  "code": "330000",
  "sub": [
  {
    "name": "杭州市",
    "code": "330100",
    "sub": [
    {
      "name": "市辖区",
      "code": "330101" },

    {
      "name": "上城区",
      "code": "330102" },

    {
      "name": "下城区",
      "code": "330103" },

    {
      "name": "江干区",
      "code": "330104" },

    {
      "name": "拱墅区",
      "code": "330105" },

    {
      "name": "西湖区",
      "code": "330106" },

    {
      "name": "滨江区",
      "code": "330108" },

    {
      "name": "萧山区",
      "code": "330109" },

    {
      "name": "余杭区",
      "code": "330110" },

    {
      "name": "富阳区",
      "code": "330111" },

    {
      "name": "桐庐县",
      "code": "330122" },

    {
      "name": "淳安县",
      "code": "330127" },

    {
      "name": "建德市",
      "code": "330182" },

    {
      "name": "临安市",
      "code": "330185" }] },



  {
    "name": "宁波市",
    "code": "330200",
    "sub": [
    {
      "name": "市辖区",
      "code": "330201" },

    {
      "name": "海曙区",
      "code": "330203" },

    {
      "name": "江东区",
      "code": "330204" },

    {
      "name": "江北区",
      "code": "330205" },

    {
      "name": "北仑区",
      "code": "330206" },

    {
      "name": "镇海区",
      "code": "330211" },

    {
      "name": "鄞州区",
      "code": "330212" },

    {
      "name": "象山县",
      "code": "330225" },

    {
      "name": "宁海县",
      "code": "330226" },

    {
      "name": "余姚市",
      "code": "330281" },

    {
      "name": "慈溪市",
      "code": "330282" },

    {
      "name": "奉化市",
      "code": "330283" }] },



  {
    "name": "温州市",
    "code": "330300",
    "sub": [
    {
      "name": "市辖区",
      "code": "330301" },

    {
      "name": "鹿城区",
      "code": "330302" },

    {
      "name": "龙湾区",
      "code": "330303" },

    {
      "name": "瓯海区",
      "code": "330304" },

    {
      "name": "洞头县",
      "code": "330322" },

    {
      "name": "永嘉县",
      "code": "330324" },

    {
      "name": "平阳县",
      "code": "330326" },

    {
      "name": "苍南县",
      "code": "330327" },

    {
      "name": "文成县",
      "code": "330328" },

    {
      "name": "泰顺县",
      "code": "330329" },

    {
      "name": "瑞安市",
      "code": "330381" },

    {
      "name": "乐清市",
      "code": "330382" }] },



  {
    "name": "嘉兴市",
    "code": "330400",
    "sub": [
    {
      "name": "市辖区",
      "code": "330401" },

    {
      "name": "南湖区",
      "code": "330402" },

    {
      "name": "秀洲区",
      "code": "330411" },

    {
      "name": "嘉善县",
      "code": "330421" },

    {
      "name": "海盐县",
      "code": "330424" },

    {
      "name": "海宁市",
      "code": "330481" },

    {
      "name": "平湖市",
      "code": "330482" },

    {
      "name": "桐乡市",
      "code": "330483" }] },



  {
    "name": "湖州市",
    "code": "330500",
    "sub": [
    {
      "name": "市辖区",
      "code": "330501" },

    {
      "name": "吴兴区",
      "code": "330502" },

    {
      "name": "南浔区",
      "code": "330503" },

    {
      "name": "德清县",
      "code": "330521" },

    {
      "name": "长兴县",
      "code": "330522" },

    {
      "name": "安吉县",
      "code": "330523" }] },



  {
    "name": "绍兴市",
    "code": "330600",
    "sub": [
    {
      "name": "市辖区",
      "code": "330601" },

    {
      "name": "越城区",
      "code": "330602" },

    {
      "name": "柯桥区",
      "code": "330603" },

    {
      "name": "上虞区",
      "code": "330604" },

    {
      "name": "新昌县",
      "code": "330624" },

    {
      "name": "诸暨市",
      "code": "330681" },

    {
      "name": "嵊州市",
      "code": "330683" }] },



  {
    "name": "金华市",
    "code": "330700",
    "sub": [
    {
      "name": "市辖区",
      "code": "330701" },

    {
      "name": "婺城区",
      "code": "330702" },

    {
      "name": "金东区",
      "code": "330703" },

    {
      "name": "武义县",
      "code": "330723" },

    {
      "name": "浦江县",
      "code": "330726" },

    {
      "name": "磐安县",
      "code": "330727" },

    {
      "name": "兰溪市",
      "code": "330781" },

    {
      "name": "义乌市",
      "code": "330782" },

    {
      "name": "东阳市",
      "code": "330783" },

    {
      "name": "永康市",
      "code": "330784" }] },



  {
    "name": "衢州市",
    "code": "330800",
    "sub": [
    {
      "name": "市辖区",
      "code": "330801" },

    {
      "name": "柯城区",
      "code": "330802" },

    {
      "name": "衢江区",
      "code": "330803" },

    {
      "name": "常山县",
      "code": "330822" },

    {
      "name": "开化县",
      "code": "330824" },

    {
      "name": "龙游县",
      "code": "330825" },

    {
      "name": "江山市",
      "code": "330881" }] },



  {
    "name": "舟山市",
    "code": "330900",
    "sub": [
    {
      "name": "市辖区",
      "code": "330901" },

    {
      "name": "定海区",
      "code": "330902" },

    {
      "name": "普陀区",
      "code": "330903" },

    {
      "name": "岱山县",
      "code": "330921" },

    {
      "name": "嵊泗县",
      "code": "330922" }] },



  {
    "name": "台州市",
    "code": "331000",
    "sub": [
    {
      "name": "市辖区",
      "code": "331001" },

    {
      "name": "椒江区",
      "code": "331002" },

    {
      "name": "黄岩区",
      "code": "331003" },

    {
      "name": "路桥区",
      "code": "331004" },

    {
      "name": "玉环县",
      "code": "331021" },

    {
      "name": "三门县",
      "code": "331022" },

    {
      "name": "天台县",
      "code": "331023" },

    {
      "name": "仙居县",
      "code": "331024" },

    {
      "name": "温岭市",
      "code": "331081" },

    {
      "name": "临海市",
      "code": "331082" }] },



  {
    "name": "丽水市",
    "code": "331100",
    "sub": [
    {
      "name": "市辖区",
      "code": "331101" },

    {
      "name": "莲都区",
      "code": "331102" },

    {
      "name": "青田县",
      "code": "331121" },

    {
      "name": "缙云县",
      "code": "331122" },

    {
      "name": "遂昌县",
      "code": "331123" },

    {
      "name": "松阳县",
      "code": "331124" },

    {
      "name": "云和县",
      "code": "331125" },

    {
      "name": "庆元县",
      "code": "331126" },

    {
      "name": "景宁畲族自治县",
      "code": "331127" },

    {
      "name": "龙泉市",
      "code": "331181" }] }] },





{
  "name": "安徽省",
  "code": "340000",
  "sub": [
  {
    "name": "合肥市",
    "code": "340100",
    "sub": [
    {
      "name": "市辖区",
      "code": "340101" },

    {
      "name": "瑶海区",
      "code": "340102" },

    {
      "name": "庐阳区",
      "code": "340103" },

    {
      "name": "蜀山区",
      "code": "340104" },

    {
      "name": "包河区",
      "code": "340111" },

    {
      "name": "长丰县",
      "code": "340121" },

    {
      "name": "肥东县",
      "code": "340122" },

    {
      "name": "肥西县",
      "code": "340123" },

    {
      "name": "庐江县",
      "code": "340124" },

    {
      "name": "巢湖市",
      "code": "340181" }] },



  {
    "name": "芜湖市",
    "code": "340200",
    "sub": [
    {
      "name": "市辖区",
      "code": "340201" },

    {
      "name": "镜湖区",
      "code": "340202" },

    {
      "name": "弋江区",
      "code": "340203" },

    {
      "name": "鸠江区",
      "code": "340207" },

    {
      "name": "三山区",
      "code": "340208" },

    {
      "name": "芜湖县",
      "code": "340221" },

    {
      "name": "繁昌县",
      "code": "340222" },

    {
      "name": "南陵县",
      "code": "340223" },

    {
      "name": "无为县",
      "code": "340225" }] },



  {
    "name": "蚌埠市",
    "code": "340300",
    "sub": [
    {
      "name": "市辖区",
      "code": "340301" },

    {
      "name": "龙子湖区",
      "code": "340302" },

    {
      "name": "蚌山区",
      "code": "340303" },

    {
      "name": "禹会区",
      "code": "340304" },

    {
      "name": "淮上区",
      "code": "340311" },

    {
      "name": "怀远县",
      "code": "340321" },

    {
      "name": "五河县",
      "code": "340322" },

    {
      "name": "固镇县",
      "code": "340323" }] },



  {
    "name": "淮南市",
    "code": "340400",
    "sub": [
    {
      "name": "市辖区",
      "code": "340401" },

    {
      "name": "大通区",
      "code": "340402" },

    {
      "name": "田家庵区",
      "code": "340403" },

    {
      "name": "谢家集区",
      "code": "340404" },

    {
      "name": "八公山区",
      "code": "340405" },

    {
      "name": "潘集区",
      "code": "340406" },

    {
      "name": "凤台县",
      "code": "340421" }] },



  {
    "name": "马鞍山市",
    "code": "340500",
    "sub": [
    {
      "name": "市辖区",
      "code": "340501" },

    {
      "name": "花山区",
      "code": "340503" },

    {
      "name": "雨山区",
      "code": "340504" },

    {
      "name": "博望区",
      "code": "340506" },

    {
      "name": "当涂县",
      "code": "340521" },

    {
      "name": "含山县",
      "code": "340522" },

    {
      "name": "和县",
      "code": "340523" }] },



  {
    "name": "淮北市",
    "code": "340600",
    "sub": [
    {
      "name": "市辖区",
      "code": "340601" },

    {
      "name": "杜集区",
      "code": "340602" },

    {
      "name": "相山区",
      "code": "340603" },

    {
      "name": "烈山区",
      "code": "340604" },

    {
      "name": "濉溪县",
      "code": "340621" }] },



  {
    "name": "铜陵市",
    "code": "340700",
    "sub": [
    {
      "name": "市辖区",
      "code": "340701" },

    {
      "name": "铜官山区",
      "code": "340702" },

    {
      "name": "狮子山区",
      "code": "340703" },

    {
      "name": "郊区",
      "code": "340711" },

    {
      "name": "铜陵县",
      "code": "340721" }] },



  {
    "name": "安庆市",
    "code": "340800",
    "sub": [
    {
      "name": "市辖区",
      "code": "340801" },

    {
      "name": "迎江区",
      "code": "340802" },

    {
      "name": "大观区",
      "code": "340803" },

    {
      "name": "宜秀区",
      "code": "340811" },

    {
      "name": "怀宁县",
      "code": "340822" },

    {
      "name": "枞阳县",
      "code": "340823" },

    {
      "name": "潜山县",
      "code": "340824" },

    {
      "name": "太湖县",
      "code": "340825" },

    {
      "name": "宿松县",
      "code": "340826" },

    {
      "name": "望江县",
      "code": "340827" },

    {
      "name": "岳西县",
      "code": "340828" },

    {
      "name": "桐城市",
      "code": "340881" }] },



  {
    "name": "黄山市",
    "code": "341000",
    "sub": [
    {
      "name": "市辖区",
      "code": "341001" },

    {
      "name": "屯溪区",
      "code": "341002" },

    {
      "name": "黄山区",
      "code": "341003" },

    {
      "name": "徽州区",
      "code": "341004" },

    {
      "name": "歙县",
      "code": "341021" },

    {
      "name": "休宁县",
      "code": "341022" },

    {
      "name": "黟县",
      "code": "341023" },

    {
      "name": "祁门县",
      "code": "341024" }] },



  {
    "name": "滁州市",
    "code": "341100",
    "sub": [
    {
      "name": "市辖区",
      "code": "341101" },

    {
      "name": "琅琊区",
      "code": "341102" },

    {
      "name": "南谯区",
      "code": "341103" },

    {
      "name": "来安县",
      "code": "341122" },

    {
      "name": "全椒县",
      "code": "341124" },

    {
      "name": "定远县",
      "code": "341125" },

    {
      "name": "凤阳县",
      "code": "341126" },

    {
      "name": "天长市",
      "code": "341181" },

    {
      "name": "明光市",
      "code": "341182" }] },



  {
    "name": "阜阳市",
    "code": "341200",
    "sub": [
    {
      "name": "市辖区",
      "code": "341201" },

    {
      "name": "颍州区",
      "code": "341202" },

    {
      "name": "颍东区",
      "code": "341203" },

    {
      "name": "颍泉区",
      "code": "341204" },

    {
      "name": "临泉县",
      "code": "341221" },

    {
      "name": "太和县",
      "code": "341222" },

    {
      "name": "阜南县",
      "code": "341225" },

    {
      "name": "颍上县",
      "code": "341226" },

    {
      "name": "界首市",
      "code": "341282" }] },



  {
    "name": "宿州市",
    "code": "341300",
    "sub": [
    {
      "name": "市辖区",
      "code": "341301" },

    {
      "name": "埇桥区",
      "code": "341302" },

    {
      "name": "砀山县",
      "code": "341321" },

    {
      "name": "萧县",
      "code": "341322" },

    {
      "name": "灵璧县",
      "code": "341323" },

    {
      "name": "泗县",
      "code": "341324" }] },



  {
    "name": "六安市",
    "code": "341500",
    "sub": [
    {
      "name": "市辖区",
      "code": "341501" },

    {
      "name": "金安区",
      "code": "341502" },

    {
      "name": "裕安区",
      "code": "341503" },

    {
      "name": "寿县",
      "code": "341521" },

    {
      "name": "霍邱县",
      "code": "341522" },

    {
      "name": "舒城县",
      "code": "341523" },

    {
      "name": "金寨县",
      "code": "341524" },

    {
      "name": "霍山县",
      "code": "341525" }] },



  {
    "name": "亳州市",
    "code": "341600",
    "sub": [
    {
      "name": "市辖区",
      "code": "341601" },

    {
      "name": "谯城区",
      "code": "341602" },

    {
      "name": "涡阳县",
      "code": "341621" },

    {
      "name": "蒙城县",
      "code": "341622" },

    {
      "name": "利辛县",
      "code": "341623" }] },



  {
    "name": "池州市",
    "code": "341700",
    "sub": [
    {
      "name": "市辖区",
      "code": "341701" },

    {
      "name": "贵池区",
      "code": "341702" },

    {
      "name": "东至县",
      "code": "341721" },

    {
      "name": "石台县",
      "code": "341722" },

    {
      "name": "青阳县",
      "code": "341723" }] },



  {
    "name": "宣城市",
    "code": "341800",
    "sub": [
    {
      "name": "市辖区",
      "code": "341801" },

    {
      "name": "宣州区",
      "code": "341802" },

    {
      "name": "郎溪县",
      "code": "341821" },

    {
      "name": "广德县",
      "code": "341822" },

    {
      "name": "泾县",
      "code": "341823" },

    {
      "name": "绩溪县",
      "code": "341824" },

    {
      "name": "旌德县",
      "code": "341825" },

    {
      "name": "宁国市",
      "code": "341881" }] }] },





{
  "name": "福建省",
  "code": "350000",
  "sub": [
  {
    "name": "福州市",
    "code": "350100",
    "sub": [
    {
      "name": "市辖区",
      "code": "350101" },

    {
      "name": "鼓楼区",
      "code": "350102" },

    {
      "name": "台江区",
      "code": "350103" },

    {
      "name": "仓山区",
      "code": "350104" },

    {
      "name": "马尾区",
      "code": "350105" },

    {
      "name": "晋安区",
      "code": "350111" },

    {
      "name": "闽侯县",
      "code": "350121" },

    {
      "name": "连江县",
      "code": "350122" },

    {
      "name": "罗源县",
      "code": "350123" },

    {
      "name": "闽清县",
      "code": "350124" },

    {
      "name": "永泰县",
      "code": "350125" },

    {
      "name": "平潭县",
      "code": "350128" },

    {
      "name": "福清市",
      "code": "350181" },

    {
      "name": "长乐市",
      "code": "350182" }] },



  {
    "name": "厦门市",
    "code": "350200",
    "sub": [
    {
      "name": "市辖区",
      "code": "350201" },

    {
      "name": "思明区",
      "code": "350203" },

    {
      "name": "海沧区",
      "code": "350205" },

    {
      "name": "湖里区",
      "code": "350206" },

    {
      "name": "集美区",
      "code": "350211" },

    {
      "name": "同安区",
      "code": "350212" },

    {
      "name": "翔安区",
      "code": "350213" }] },



  {
    "name": "莆田市",
    "code": "350300",
    "sub": [
    {
      "name": "市辖区",
      "code": "350301" },

    {
      "name": "城厢区",
      "code": "350302" },

    {
      "name": "涵江区",
      "code": "350303" },

    {
      "name": "荔城区",
      "code": "350304" },

    {
      "name": "秀屿区",
      "code": "350305" },

    {
      "name": "仙游县",
      "code": "350322" }] },



  {
    "name": "三明市",
    "code": "350400",
    "sub": [
    {
      "name": "市辖区",
      "code": "350401" },

    {
      "name": "梅列区",
      "code": "350402" },

    {
      "name": "三元区",
      "code": "350403" },

    {
      "name": "明溪县",
      "code": "350421" },

    {
      "name": "清流县",
      "code": "350423" },

    {
      "name": "宁化县",
      "code": "350424" },

    {
      "name": "大田县",
      "code": "350425" },

    {
      "name": "尤溪县",
      "code": "350426" },

    {
      "name": "沙县",
      "code": "350427" },

    {
      "name": "将乐县",
      "code": "350428" },

    {
      "name": "泰宁县",
      "code": "350429" },

    {
      "name": "建宁县",
      "code": "350430" },

    {
      "name": "永安市",
      "code": "350481" }] },



  {
    "name": "泉州市",
    "code": "350500",
    "sub": [
    {
      "name": "市辖区",
      "code": "350501" },

    {
      "name": "鲤城区",
      "code": "350502" },

    {
      "name": "丰泽区",
      "code": "350503" },

    {
      "name": "洛江区",
      "code": "350504" },

    {
      "name": "泉港区",
      "code": "350505" },

    {
      "name": "惠安县",
      "code": "350521" },

    {
      "name": "安溪县",
      "code": "350524" },

    {
      "name": "永春县",
      "code": "350525" },

    {
      "name": "德化县",
      "code": "350526" },

    {
      "name": "金门县",
      "code": "350527" },

    {
      "name": "石狮市",
      "code": "350581" },

    {
      "name": "晋江市",
      "code": "350582" },

    {
      "name": "南安市",
      "code": "350583" }] },



  {
    "name": "漳州市",
    "code": "350600",
    "sub": [
    {
      "name": "市辖区",
      "code": "350601" },

    {
      "name": "芗城区",
      "code": "350602" },

    {
      "name": "龙文区",
      "code": "350603" },

    {
      "name": "云霄县",
      "code": "350622" },

    {
      "name": "漳浦县",
      "code": "350623" },

    {
      "name": "诏安县",
      "code": "350624" },

    {
      "name": "长泰县",
      "code": "350625" },

    {
      "name": "东山县",
      "code": "350626" },

    {
      "name": "南靖县",
      "code": "350627" },

    {
      "name": "平和县",
      "code": "350628" },

    {
      "name": "华安县",
      "code": "350629" },

    {
      "name": "龙海市",
      "code": "350681" }] },



  {
    "name": "南平市",
    "code": "350700",
    "sub": [
    {
      "name": "市辖区",
      "code": "350701" },

    {
      "name": "延平区",
      "code": "350702" },

    {
      "name": "建阳区",
      "code": "350703" },

    {
      "name": "顺昌县",
      "code": "350721" },

    {
      "name": "浦城县",
      "code": "350722" },

    {
      "name": "光泽县",
      "code": "350723" },

    {
      "name": "松溪县",
      "code": "350724" },

    {
      "name": "政和县",
      "code": "350725" },

    {
      "name": "邵武市",
      "code": "350781" },

    {
      "name": "武夷山市",
      "code": "350782" },

    {
      "name": "建瓯市",
      "code": "350783" }] },



  {
    "name": "龙岩市",
    "code": "350800",
    "sub": [
    {
      "name": "市辖区",
      "code": "350801" },

    {
      "name": "新罗区",
      "code": "350802" },

    {
      "name": "永定区",
      "code": "350803" },

    {
      "name": "长汀县",
      "code": "350821" },

    {
      "name": "上杭县",
      "code": "350823" },

    {
      "name": "武平县",
      "code": "350824" },

    {
      "name": "连城县",
      "code": "350825" },

    {
      "name": "漳平市",
      "code": "350881" }] },



  {
    "name": "宁德市",
    "code": "350900",
    "sub": [
    {
      "name": "市辖区",
      "code": "350901" },

    {
      "name": "蕉城区",
      "code": "350902" },

    {
      "name": "霞浦县",
      "code": "350921" },

    {
      "name": "古田县",
      "code": "350922" },

    {
      "name": "屏南县",
      "code": "350923" },

    {
      "name": "寿宁县",
      "code": "350924" },

    {
      "name": "周宁县",
      "code": "350925" },

    {
      "name": "柘荣县",
      "code": "350926" },

    {
      "name": "福安市",
      "code": "350981" },

    {
      "name": "福鼎市",
      "code": "350982" }] }] },





{
  "name": "江西省",
  "code": "360000",
  "sub": [
  {
    "name": "南昌市",
    "code": "360100",
    "sub": [
    {
      "name": "市辖区",
      "code": "360101" },

    {
      "name": "东湖区",
      "code": "360102" },

    {
      "name": "西湖区",
      "code": "360103" },

    {
      "name": "青云谱区",
      "code": "360104" },

    {
      "name": "湾里区",
      "code": "360105" },

    {
      "name": "青山湖区",
      "code": "360111" },

    {
      "name": "南昌县",
      "code": "360121" },

    {
      "name": "新建县",
      "code": "360122" },

    {
      "name": "安义县",
      "code": "360123" },

    {
      "name": "进贤县",
      "code": "360124" }] },



  {
    "name": "景德镇市",
    "code": "360200",
    "sub": [
    {
      "name": "市辖区",
      "code": "360201" },

    {
      "name": "昌江区",
      "code": "360202" },

    {
      "name": "珠山区",
      "code": "360203" },

    {
      "name": "浮梁县",
      "code": "360222" },

    {
      "name": "乐平市",
      "code": "360281" }] },



  {
    "name": "萍乡市",
    "code": "360300",
    "sub": [
    {
      "name": "市辖区",
      "code": "360301" },

    {
      "name": "安源区",
      "code": "360302" },

    {
      "name": "湘东区",
      "code": "360313" },

    {
      "name": "莲花县",
      "code": "360321" },

    {
      "name": "上栗县",
      "code": "360322" },

    {
      "name": "芦溪县",
      "code": "360323" }] },



  {
    "name": "九江市",
    "code": "360400",
    "sub": [
    {
      "name": "市辖区",
      "code": "360401" },

    {
      "name": "庐山区",
      "code": "360402" },

    {
      "name": "浔阳区",
      "code": "360403" },

    {
      "name": "九江县",
      "code": "360421" },

    {
      "name": "武宁县",
      "code": "360423" },

    {
      "name": "修水县",
      "code": "360424" },

    {
      "name": "永修县",
      "code": "360425" },

    {
      "name": "德安县",
      "code": "360426" },

    {
      "name": "星子县",
      "code": "360427" },

    {
      "name": "都昌县",
      "code": "360428" },

    {
      "name": "湖口县",
      "code": "360429" },

    {
      "name": "彭泽县",
      "code": "360430" },

    {
      "name": "瑞昌市",
      "code": "360481" },

    {
      "name": "共青城市",
      "code": "360482" }] },



  {
    "name": "新余市",
    "code": "360500",
    "sub": [
    {
      "name": "市辖区",
      "code": "360501" },

    {
      "name": "渝水区",
      "code": "360502" },

    {
      "name": "分宜县",
      "code": "360521" }] },



  {
    "name": "鹰潭市",
    "code": "360600",
    "sub": [
    {
      "name": "市辖区",
      "code": "360601" },

    {
      "name": "月湖区",
      "code": "360602" },

    {
      "name": "余江县",
      "code": "360622" },

    {
      "name": "贵溪市",
      "code": "360681" }] },



  {
    "name": "赣州市",
    "code": "360700",
    "sub": [
    {
      "name": "市辖区",
      "code": "360701" },

    {
      "name": "章贡区",
      "code": "360702" },

    {
      "name": "南康区",
      "code": "360703" },

    {
      "name": "赣县",
      "code": "360721" },

    {
      "name": "信丰县",
      "code": "360722" },

    {
      "name": "大余县",
      "code": "360723" },

    {
      "name": "上犹县",
      "code": "360724" },

    {
      "name": "崇义县",
      "code": "360725" },

    {
      "name": "安远县",
      "code": "360726" },

    {
      "name": "龙南县",
      "code": "360727" },

    {
      "name": "定南县",
      "code": "360728" },

    {
      "name": "全南县",
      "code": "360729" },

    {
      "name": "宁都县",
      "code": "360730" },

    {
      "name": "于都县",
      "code": "360731" },

    {
      "name": "兴国县",
      "code": "360732" },

    {
      "name": "会昌县",
      "code": "360733" },

    {
      "name": "寻乌县",
      "code": "360734" },

    {
      "name": "石城县",
      "code": "360735" },

    {
      "name": "瑞金市",
      "code": "360781" }] },



  {
    "name": "吉安市",
    "code": "360800",
    "sub": [
    {
      "name": "市辖区",
      "code": "360801" },

    {
      "name": "吉州区",
      "code": "360802" },

    {
      "name": "青原区",
      "code": "360803" },

    {
      "name": "吉安县",
      "code": "360821" },

    {
      "name": "吉水县",
      "code": "360822" },

    {
      "name": "峡江县",
      "code": "360823" },

    {
      "name": "新干县",
      "code": "360824" },

    {
      "name": "永丰县",
      "code": "360825" },

    {
      "name": "泰和县",
      "code": "360826" },

    {
      "name": "遂川县",
      "code": "360827" },

    {
      "name": "万安县",
      "code": "360828" },

    {
      "name": "安福县",
      "code": "360829" },

    {
      "name": "永新县",
      "code": "360830" },

    {
      "name": "井冈山市",
      "code": "360881" }] },



  {
    "name": "宜春市",
    "code": "360900",
    "sub": [
    {
      "name": "市辖区",
      "code": "360901" },

    {
      "name": "袁州区",
      "code": "360902" },

    {
      "name": "奉新县",
      "code": "360921" },

    {
      "name": "万载县",
      "code": "360922" },

    {
      "name": "上高县",
      "code": "360923" },

    {
      "name": "宜丰县",
      "code": "360924" },

    {
      "name": "靖安县",
      "code": "360925" },

    {
      "name": "铜鼓县",
      "code": "360926" },

    {
      "name": "丰城市",
      "code": "360981" },

    {
      "name": "樟树市",
      "code": "360982" },

    {
      "name": "高安市",
      "code": "360983" }] },



  {
    "name": "抚州市",
    "code": "361000",
    "sub": [
    {
      "name": "市辖区",
      "code": "361001" },

    {
      "name": "临川区",
      "code": "361002" },

    {
      "name": "南城县",
      "code": "361021" },

    {
      "name": "黎川县",
      "code": "361022" },

    {
      "name": "南丰县",
      "code": "361023" },

    {
      "name": "崇仁县",
      "code": "361024" },

    {
      "name": "乐安县",
      "code": "361025" },

    {
      "name": "宜黄县",
      "code": "361026" },

    {
      "name": "金溪县",
      "code": "361027" },

    {
      "name": "资溪县",
      "code": "361028" },

    {
      "name": "东乡县",
      "code": "361029" },

    {
      "name": "广昌县",
      "code": "361030" }] },



  {
    "name": "上饶市",
    "code": "361100",
    "sub": [
    {
      "name": "市辖区",
      "code": "361101" },

    {
      "name": "信州区",
      "code": "361102" },

    {
      "name": "上饶县",
      "code": "361121" },

    {
      "name": "广丰县",
      "code": "361122" },

    {
      "name": "玉山县",
      "code": "361123" },

    {
      "name": "铅山县",
      "code": "361124" },

    {
      "name": "横峰县",
      "code": "361125" },

    {
      "name": "弋阳县",
      "code": "361126" },

    {
      "name": "余干县",
      "code": "361127" },

    {
      "name": "鄱阳县",
      "code": "361128" },

    {
      "name": "万年县",
      "code": "361129" },

    {
      "name": "婺源县",
      "code": "361130" },

    {
      "name": "德兴市",
      "code": "361181" }] }] },





{
  "name": "山东省",
  "code": "370000",
  "sub": [
  {
    "name": "济南市",
    "code": "370100",
    "sub": [
    {
      "name": "市辖区",
      "code": "370101" },

    {
      "name": "历下区",
      "code": "370102" },

    {
      "name": "市中区",
      "code": "370103" },

    {
      "name": "槐荫区",
      "code": "370104" },

    {
      "name": "天桥区",
      "code": "370105" },

    {
      "name": "历城区",
      "code": "370112" },

    {
      "name": "长清区",
      "code": "370113" },

    {
      "name": "平阴县",
      "code": "370124" },

    {
      "name": "济阳县",
      "code": "370125" },

    {
      "name": "商河县",
      "code": "370126" },

    {
      "name": "章丘市",
      "code": "370181" }] },



  {
    "name": "青岛市",
    "code": "370200",
    "sub": [
    {
      "name": "市辖区",
      "code": "370201" },

    {
      "name": "市南区",
      "code": "370202" },

    {
      "name": "市北区",
      "code": "370203" },

    {
      "name": "黄岛区",
      "code": "370211" },

    {
      "name": "崂山区",
      "code": "370212" },

    {
      "name": "李沧区",
      "code": "370213" },

    {
      "name": "城阳区",
      "code": "370214" },

    {
      "name": "胶州市",
      "code": "370281" },

    {
      "name": "即墨市",
      "code": "370282" },

    {
      "name": "平度市",
      "code": "370283" },

    {
      "name": "莱西市",
      "code": "370285" }] },



  {
    "name": "淄博市",
    "code": "370300",
    "sub": [
    {
      "name": "市辖区",
      "code": "370301" },

    {
      "name": "淄川区",
      "code": "370302" },

    {
      "name": "张店区",
      "code": "370303" },

    {
      "name": "博山区",
      "code": "370304" },

    {
      "name": "临淄区",
      "code": "370305" },

    {
      "name": "周村区",
      "code": "370306" },

    {
      "name": "桓台县",
      "code": "370321" },

    {
      "name": "高青县",
      "code": "370322" },

    {
      "name": "沂源县",
      "code": "370323" }] },



  {
    "name": "枣庄市",
    "code": "370400",
    "sub": [
    {
      "name": "市辖区",
      "code": "370401" },

    {
      "name": "市中区",
      "code": "370402" },

    {
      "name": "薛城区",
      "code": "370403" },

    {
      "name": "峄城区",
      "code": "370404" },

    {
      "name": "台儿庄区",
      "code": "370405" },

    {
      "name": "山亭区",
      "code": "370406" },

    {
      "name": "滕州市",
      "code": "370481" }] },



  {
    "name": "东营市",
    "code": "370500",
    "sub": [
    {
      "name": "市辖区",
      "code": "370501" },

    {
      "name": "东营区",
      "code": "370502" },

    {
      "name": "河口区",
      "code": "370503" },

    {
      "name": "垦利县",
      "code": "370521" },

    {
      "name": "利津县",
      "code": "370522" },

    {
      "name": "广饶县",
      "code": "370523" }] },



  {
    "name": "烟台市",
    "code": "370600",
    "sub": [
    {
      "name": "市辖区",
      "code": "370601" },

    {
      "name": "芝罘区",
      "code": "370602" },

    {
      "name": "福山区",
      "code": "370611" },

    {
      "name": "牟平区",
      "code": "370612" },

    {
      "name": "莱山区",
      "code": "370613" },

    {
      "name": "长岛县",
      "code": "370634" },

    {
      "name": "龙口市",
      "code": "370681" },

    {
      "name": "莱阳市",
      "code": "370682" },

    {
      "name": "莱州市",
      "code": "370683" },

    {
      "name": "蓬莱市",
      "code": "370684" },

    {
      "name": "招远市",
      "code": "370685" },

    {
      "name": "栖霞市",
      "code": "370686" },

    {
      "name": "海阳市",
      "code": "370687" }] },



  {
    "name": "潍坊市",
    "code": "370700",
    "sub": [
    {
      "name": "市辖区",
      "code": "370701" },

    {
      "name": "潍城区",
      "code": "370702" },

    {
      "name": "寒亭区",
      "code": "370703" },

    {
      "name": "坊子区",
      "code": "370704" },

    {
      "name": "奎文区",
      "code": "370705" },

    {
      "name": "临朐县",
      "code": "370724" },

    {
      "name": "昌乐县",
      "code": "370725" },

    {
      "name": "青州市",
      "code": "370781" },

    {
      "name": "诸城市",
      "code": "370782" },

    {
      "name": "寿光市",
      "code": "370783" },

    {
      "name": "安丘市",
      "code": "370784" },

    {
      "name": "高密市",
      "code": "370785" },

    {
      "name": "昌邑市",
      "code": "370786" }] },



  {
    "name": "济宁市",
    "code": "370800",
    "sub": [
    {
      "name": "市辖区",
      "code": "370801" },

    {
      "name": "任城区",
      "code": "370811" },

    {
      "name": "兖州区",
      "code": "370812" },

    {
      "name": "微山县",
      "code": "370826" },

    {
      "name": "鱼台县",
      "code": "370827" },

    {
      "name": "金乡县",
      "code": "370828" },

    {
      "name": "嘉祥县",
      "code": "370829" },

    {
      "name": "汶上县",
      "code": "370830" },

    {
      "name": "泗水县",
      "code": "370831" },

    {
      "name": "梁山县",
      "code": "370832" },

    {
      "name": "曲阜市",
      "code": "370881" },

    {
      "name": "邹城市",
      "code": "370883" }] },



  {
    "name": "泰安市",
    "code": "370900",
    "sub": [
    {
      "name": "市辖区",
      "code": "370901" },

    {
      "name": "泰山区",
      "code": "370902" },

    {
      "name": "岱岳区",
      "code": "370911" },

    {
      "name": "宁阳县",
      "code": "370921" },

    {
      "name": "东平县",
      "code": "370923" },

    {
      "name": "新泰市",
      "code": "370982" },

    {
      "name": "肥城市",
      "code": "370983" }] },



  {
    "name": "威海市",
    "code": "371000",
    "sub": [
    {
      "name": "市辖区",
      "code": "371001" },

    {
      "name": "环翠区",
      "code": "371002" },

    {
      "name": "文登市",
      "code": "371081" },

    {
      "name": "荣成市",
      "code": "371082" },

    {
      "name": "乳山市",
      "code": "371083" }] },



  {
    "name": "日照市",
    "code": "371100",
    "sub": [
    {
      "name": "市辖区",
      "code": "371101" },

    {
      "name": "东港区",
      "code": "371102" },

    {
      "name": "岚山区",
      "code": "371103" },

    {
      "name": "五莲县",
      "code": "371121" },

    {
      "name": "莒县",
      "code": "371122" }] },



  {
    "name": "莱芜市",
    "code": "371200",
    "sub": [
    {
      "name": "市辖区",
      "code": "371201" },

    {
      "name": "莱城区",
      "code": "371202" },

    {
      "name": "钢城区",
      "code": "371203" }] },



  {
    "name": "临沂市",
    "code": "371300",
    "sub": [
    {
      "name": "市辖区",
      "code": "371301" },

    {
      "name": "兰山区",
      "code": "371302" },

    {
      "name": "罗庄区",
      "code": "371311" },

    {
      "name": "河东区",
      "code": "371312" },

    {
      "name": "沂南县",
      "code": "371321" },

    {
      "name": "郯城县",
      "code": "371322" },

    {
      "name": "沂水县",
      "code": "371323" },

    {
      "name": "兰陵县",
      "code": "371324" },

    {
      "name": "费县",
      "code": "371325" },

    {
      "name": "平邑县",
      "code": "371326" },

    {
      "name": "莒南县",
      "code": "371327" },

    {
      "name": "蒙阴县",
      "code": "371328" },

    {
      "name": "临沭县",
      "code": "371329" }] },



  {
    "name": "德州市",
    "code": "371400",
    "sub": [
    {
      "name": "市辖区",
      "code": "371401" },

    {
      "name": "德城区",
      "code": "371402" },

    {
      "name": "陵城区",
      "code": "371403" },

    {
      "name": "宁津县",
      "code": "371422" },

    {
      "name": "庆云县",
      "code": "371423" },

    {
      "name": "临邑县",
      "code": "371424" },

    {
      "name": "齐河县",
      "code": "371425" },

    {
      "name": "平原县",
      "code": "371426" },

    {
      "name": "夏津县",
      "code": "371427" },

    {
      "name": "武城县",
      "code": "371428" },

    {
      "name": "乐陵市",
      "code": "371481" },

    {
      "name": "禹城市",
      "code": "371482" }] },



  {
    "name": "聊城市",
    "code": "371500",
    "sub": [
    {
      "name": "市辖区",
      "code": "371501" },

    {
      "name": "东昌府区",
      "code": "371502" },

    {
      "name": "阳谷县",
      "code": "371521" },

    {
      "name": "莘县",
      "code": "371522" },

    {
      "name": "茌平县",
      "code": "371523" },

    {
      "name": "东阿县",
      "code": "371524" },

    {
      "name": "冠县",
      "code": "371525" },

    {
      "name": "高唐县",
      "code": "371526" },

    {
      "name": "临清市",
      "code": "371581" }] },



  {
    "name": "滨州市",
    "code": "371600",
    "sub": [
    {
      "name": "市辖区",
      "code": "371601" },

    {
      "name": "滨城区",
      "code": "371602" },

    {
      "name": "沾化区",
      "code": "371603" },

    {
      "name": "惠民县",
      "code": "371621" },

    {
      "name": "阳信县",
      "code": "371622" },

    {
      "name": "无棣县",
      "code": "371623" },

    {
      "name": "博兴县",
      "code": "371625" },

    {
      "name": "邹平县",
      "code": "371626" }] },



  {
    "name": "菏泽市",
    "code": "371700",
    "sub": [
    {
      "name": "市辖区",
      "code": "371701" },

    {
      "name": "牡丹区",
      "code": "371702" },

    {
      "name": "曹县",
      "code": "371721" },

    {
      "name": "单县",
      "code": "371722" },

    {
      "name": "成武县",
      "code": "371723" },

    {
      "name": "巨野县",
      "code": "371724" },

    {
      "name": "郓城县",
      "code": "371725" },

    {
      "name": "鄄城县",
      "code": "371726" },

    {
      "name": "定陶县",
      "code": "371727" },

    {
      "name": "东明县",
      "code": "371728" }] }] },





{
  "name": "河南省",
  "code": "410000",
  "sub": [
  {
    "name": "郑州市",
    "code": "410100",
    "sub": [
    {
      "name": "市辖区",
      "code": "410101" },

    {
      "name": "中原区",
      "code": "410102" },

    {
      "name": "二七区",
      "code": "410103" },

    {
      "name": "管城回族区",
      "code": "410104" },

    {
      "name": "金水区",
      "code": "410105" },

    {
      "name": "上街区",
      "code": "410106" },

    {
      "name": "惠济区",
      "code": "410108" },

    {
      "name": "中牟县",
      "code": "410122" },

    {
      "name": "巩义市",
      "code": "410181" },

    {
      "name": "荥阳市",
      "code": "410182" },

    {
      "name": "新密市",
      "code": "410183" },

    {
      "name": "新郑市",
      "code": "410184" },

    {
      "name": "登封市",
      "code": "410185" }] },



  {
    "name": "开封市",
    "code": "410200",
    "sub": [
    {
      "name": "市辖区",
      "code": "410201" },

    {
      "name": "龙亭区",
      "code": "410202" },

    {
      "name": "顺河回族区",
      "code": "410203" },

    {
      "name": "鼓楼区",
      "code": "410204" },

    {
      "name": "禹王台区",
      "code": "410205" },

    {
      "name": "祥符区",
      "code": "410212" },

    {
      "name": "杞县",
      "code": "410221" },

    {
      "name": "通许县",
      "code": "410222" },

    {
      "name": "尉氏县",
      "code": "410223" },

    {
      "name": "兰考县",
      "code": "410225" }] },



  {
    "name": "洛阳市",
    "code": "410300",
    "sub": [
    {
      "name": "市辖区",
      "code": "410301" },

    {
      "name": "老城区",
      "code": "410302" },

    {
      "name": "西工区",
      "code": "410303" },

    {
      "name": "瀍河回族区",
      "code": "410304" },

    {
      "name": "涧西区",
      "code": "410305" },

    {
      "name": "吉利区",
      "code": "410306" },

    {
      "name": "洛龙区",
      "code": "410311" },

    {
      "name": "孟津县",
      "code": "410322" },

    {
      "name": "新安县",
      "code": "410323" },

    {
      "name": "栾川县",
      "code": "410324" },

    {
      "name": "嵩县",
      "code": "410325" },

    {
      "name": "汝阳县",
      "code": "410326" },

    {
      "name": "宜阳县",
      "code": "410327" },

    {
      "name": "洛宁县",
      "code": "410328" },

    {
      "name": "伊川县",
      "code": "410329" },

    {
      "name": "偃师市",
      "code": "410381" }] },



  {
    "name": "平顶山市",
    "code": "410400",
    "sub": [
    {
      "name": "市辖区",
      "code": "410401" },

    {
      "name": "新华区",
      "code": "410402" },

    {
      "name": "卫东区",
      "code": "410403" },

    {
      "name": "石龙区",
      "code": "410404" },

    {
      "name": "湛河区",
      "code": "410411" },

    {
      "name": "宝丰县",
      "code": "410421" },

    {
      "name": "叶县",
      "code": "410422" },

    {
      "name": "鲁山县",
      "code": "410423" },

    {
      "name": "郏县",
      "code": "410425" },

    {
      "name": "舞钢市",
      "code": "410481" },

    {
      "name": "汝州市",
      "code": "410482" }] },



  {
    "name": "安阳市",
    "code": "410500",
    "sub": [
    {
      "name": "市辖区",
      "code": "410501" },

    {
      "name": "文峰区",
      "code": "410502" },

    {
      "name": "北关区",
      "code": "410503" },

    {
      "name": "殷都区",
      "code": "410505" },

    {
      "name": "龙安区",
      "code": "410506" },

    {
      "name": "安阳县",
      "code": "410522" },

    {
      "name": "汤阴县",
      "code": "410523" },

    {
      "name": "滑县",
      "code": "410526" },

    {
      "name": "内黄县",
      "code": "410527" },

    {
      "name": "林州市",
      "code": "410581" }] },



  {
    "name": "鹤壁市",
    "code": "410600",
    "sub": [
    {
      "name": "市辖区",
      "code": "410601" },

    {
      "name": "鹤山区",
      "code": "410602" },

    {
      "name": "山城区",
      "code": "410603" },

    {
      "name": "淇滨区",
      "code": "410611" },

    {
      "name": "浚县",
      "code": "410621" },

    {
      "name": "淇县",
      "code": "410622" }] },



  {
    "name": "新乡市",
    "code": "410700",
    "sub": [
    {
      "name": "市辖区",
      "code": "410701" },

    {
      "name": "红旗区",
      "code": "410702" },

    {
      "name": "卫滨区",
      "code": "410703" },

    {
      "name": "凤泉区",
      "code": "410704" },

    {
      "name": "牧野区",
      "code": "410711" },

    {
      "name": "新乡县",
      "code": "410721" },

    {
      "name": "获嘉县",
      "code": "410724" },

    {
      "name": "原阳县",
      "code": "410725" },

    {
      "name": "延津县",
      "code": "410726" },

    {
      "name": "封丘县",
      "code": "410727" },

    {
      "name": "长垣县",
      "code": "410728" },

    {
      "name": "卫辉市",
      "code": "410781" },

    {
      "name": "辉县市",
      "code": "410782" }] },



  {
    "name": "焦作市",
    "code": "410800",
    "sub": [
    {
      "name": "市辖区",
      "code": "410801" },

    {
      "name": "解放区",
      "code": "410802" },

    {
      "name": "中站区",
      "code": "410803" },

    {
      "name": "马村区",
      "code": "410804" },

    {
      "name": "山阳区",
      "code": "410811" },

    {
      "name": "修武县",
      "code": "410821" },

    {
      "name": "博爱县",
      "code": "410822" },

    {
      "name": "武陟县",
      "code": "410823" },

    {
      "name": "温县",
      "code": "410825" },

    {
      "name": "沁阳市",
      "code": "410882" },

    {
      "name": "孟州市",
      "code": "410883" }] },



  {
    "name": "濮阳市",
    "code": "410900",
    "sub": [
    {
      "name": "市辖区",
      "code": "410901" },

    {
      "name": "华龙区",
      "code": "410902" },

    {
      "name": "清丰县",
      "code": "410922" },

    {
      "name": "南乐县",
      "code": "410923" },

    {
      "name": "范县",
      "code": "410926" },

    {
      "name": "台前县",
      "code": "410927" },

    {
      "name": "濮阳县",
      "code": "410928" }] },



  {
    "name": "许昌市",
    "code": "411000",
    "sub": [
    {
      "name": "市辖区",
      "code": "411001" },

    {
      "name": "魏都区",
      "code": "411002" },

    {
      "name": "许昌县",
      "code": "411023" },

    {
      "name": "鄢陵县",
      "code": "411024" },

    {
      "name": "襄城县",
      "code": "411025" },

    {
      "name": "禹州市",
      "code": "411081" },

    {
      "name": "长葛市",
      "code": "411082" }] },



  {
    "name": "漯河市",
    "code": "411100",
    "sub": [
    {
      "name": "市辖区",
      "code": "411101" },

    {
      "name": "源汇区",
      "code": "411102" },

    {
      "name": "郾城区",
      "code": "411103" },

    {
      "name": "召陵区",
      "code": "411104" },

    {
      "name": "舞阳县",
      "code": "411121" },

    {
      "name": "临颍县",
      "code": "411122" }] },



  {
    "name": "三门峡市",
    "code": "411200",
    "sub": [
    {
      "name": "市辖区",
      "code": "411201" },

    {
      "name": "湖滨区",
      "code": "411202" },

    {
      "name": "渑池县",
      "code": "411221" },

    {
      "name": "陕县",
      "code": "411222" },

    {
      "name": "卢氏县",
      "code": "411224" },

    {
      "name": "义马市",
      "code": "411281" },

    {
      "name": "灵宝市",
      "code": "411282" }] },



  {
    "name": "南阳市",
    "code": "411300",
    "sub": [
    {
      "name": "市辖区",
      "code": "411301" },

    {
      "name": "宛城区",
      "code": "411302" },

    {
      "name": "卧龙区",
      "code": "411303" },

    {
      "name": "南召县",
      "code": "411321" },

    {
      "name": "方城县",
      "code": "411322" },

    {
      "name": "西峡县",
      "code": "411323" },

    {
      "name": "镇平县",
      "code": "411324" },

    {
      "name": "内乡县",
      "code": "411325" },

    {
      "name": "淅川县",
      "code": "411326" },

    {
      "name": "社旗县",
      "code": "411327" },

    {
      "name": "唐河县",
      "code": "411328" },

    {
      "name": "新野县",
      "code": "411329" },

    {
      "name": "桐柏县",
      "code": "411330" },

    {
      "name": "邓州市",
      "code": "411381" }] },



  {
    "name": "商丘市",
    "code": "411400",
    "sub": [
    {
      "name": "市辖区",
      "code": "411401" },

    {
      "name": "梁园区",
      "code": "411402" },

    {
      "name": "睢阳区",
      "code": "411403" },

    {
      "name": "民权县",
      "code": "411421" },

    {
      "name": "睢县",
      "code": "411422" },

    {
      "name": "宁陵县",
      "code": "411423" },

    {
      "name": "柘城县",
      "code": "411424" },

    {
      "name": "虞城县",
      "code": "411425" },

    {
      "name": "夏邑县",
      "code": "411426" },

    {
      "name": "永城市",
      "code": "411481" }] },



  {
    "name": "信阳市",
    "code": "411500",
    "sub": [
    {
      "name": "市辖区",
      "code": "411501" },

    {
      "name": "浉河区",
      "code": "411502" },

    {
      "name": "平桥区",
      "code": "411503" },

    {
      "name": "罗山县",
      "code": "411521" },

    {
      "name": "光山县",
      "code": "411522" },

    {
      "name": "新县",
      "code": "411523" },

    {
      "name": "商城县",
      "code": "411524" },

    {
      "name": "固始县",
      "code": "411525" },

    {
      "name": "潢川县",
      "code": "411526" },

    {
      "name": "淮滨县",
      "code": "411527" },

    {
      "name": "息县",
      "code": "411528" }] },



  {
    "name": "周口市",
    "code": "411600",
    "sub": [
    {
      "name": "市辖区",
      "code": "411601" },

    {
      "name": "川汇区",
      "code": "411602" },

    {
      "name": "扶沟县",
      "code": "411621" },

    {
      "name": "西华县",
      "code": "411622" },

    {
      "name": "商水县",
      "code": "411623" },

    {
      "name": "沈丘县",
      "code": "411624" },

    {
      "name": "郸城县",
      "code": "411625" },

    {
      "name": "淮阳县",
      "code": "411626" },

    {
      "name": "太康县",
      "code": "411627" },

    {
      "name": "鹿邑县",
      "code": "411628" },

    {
      "name": "项城市",
      "code": "411681" }] },



  {
    "name": "驻马店市",
    "code": "411700",
    "sub": [
    {
      "name": "市辖区",
      "code": "411701" },

    {
      "name": "驿城区",
      "code": "411702" },

    {
      "name": "西平县",
      "code": "411721" },

    {
      "name": "上蔡县",
      "code": "411722" },

    {
      "name": "平舆县",
      "code": "411723" },

    {
      "name": "正阳县",
      "code": "411724" },

    {
      "name": "确山县",
      "code": "411725" },

    {
      "name": "泌阳县",
      "code": "411726" },

    {
      "name": "汝南县",
      "code": "411727" },

    {
      "name": "遂平县",
      "code": "411728" },

    {
      "name": "新蔡县",
      "code": "411729" }] },



  {
    "name": "济源市",
    "code": "419001" }] },



{
  "name": "湖北省",
  "code": "420000",
  "sub": [
  {
    "name": "武汉市",
    "code": "420100",
    "sub": [
    {
      "name": "市辖区",
      "code": "420101" },

    {
      "name": "江岸区",
      "code": "420102" },

    {
      "name": "江汉区",
      "code": "420103" },

    {
      "name": "硚口区",
      "code": "420104" },

    {
      "name": "汉阳区",
      "code": "420105" },

    {
      "name": "武昌区",
      "code": "420106" },

    {
      "name": "青山区",
      "code": "420107" },

    {
      "name": "洪山区",
      "code": "420111" },

    {
      "name": "东西湖区",
      "code": "420112" },

    {
      "name": "汉南区",
      "code": "420113" },

    {
      "name": "蔡甸区",
      "code": "420114" },

    {
      "name": "江夏区",
      "code": "420115" },

    {
      "name": "黄陂区",
      "code": "420116" },

    {
      "name": "新洲区",
      "code": "420117" }] },



  {
    "name": "黄石市",
    "code": "420200",
    "sub": [
    {
      "name": "市辖区",
      "code": "420201" },

    {
      "name": "黄石港区",
      "code": "420202" },

    {
      "name": "西塞山区",
      "code": "420203" },

    {
      "name": "下陆区",
      "code": "420204" },

    {
      "name": "铁山区",
      "code": "420205" },

    {
      "name": "阳新县",
      "code": "420222" },

    {
      "name": "大冶市",
      "code": "420281" }] },



  {
    "name": "十堰市",
    "code": "420300",
    "sub": [
    {
      "name": "市辖区",
      "code": "420301" },

    {
      "name": "茅箭区",
      "code": "420302" },

    {
      "name": "张湾区",
      "code": "420303" },

    {
      "name": "郧阳区",
      "code": "420304" },

    {
      "name": "郧西县",
      "code": "420322" },

    {
      "name": "竹山县",
      "code": "420323" },

    {
      "name": "竹溪县",
      "code": "420324" },

    {
      "name": "房县",
      "code": "420325" },

    {
      "name": "丹江口市",
      "code": "420381" }] },



  {
    "name": "宜昌市",
    "code": "420500",
    "sub": [
    {
      "name": "市辖区",
      "code": "420501" },

    {
      "name": "西陵区",
      "code": "420502" },

    {
      "name": "伍家岗区",
      "code": "420503" },

    {
      "name": "点军区",
      "code": "420504" },

    {
      "name": "猇亭区",
      "code": "420505" },

    {
      "name": "夷陵区",
      "code": "420506" },

    {
      "name": "远安县",
      "code": "420525" },

    {
      "name": "兴山县",
      "code": "420526" },

    {
      "name": "秭归县",
      "code": "420527" },

    {
      "name": "长阳土家族自治县",
      "code": "420528" },

    {
      "name": "五峰土家族自治县",
      "code": "420529" },

    {
      "name": "宜都市",
      "code": "420581" },

    {
      "name": "当阳市",
      "code": "420582" },

    {
      "name": "枝江市",
      "code": "420583" }] },



  {
    "name": "襄阳市",
    "code": "420600",
    "sub": [
    {
      "name": "市辖区",
      "code": "420601" },

    {
      "name": "襄城区",
      "code": "420602" },

    {
      "name": "樊城区",
      "code": "420606" },

    {
      "name": "襄州区",
      "code": "420607" },

    {
      "name": "南漳县",
      "code": "420624" },

    {
      "name": "谷城县",
      "code": "420625" },

    {
      "name": "保康县",
      "code": "420626" },

    {
      "name": "老河口市",
      "code": "420682" },

    {
      "name": "枣阳市",
      "code": "420683" },

    {
      "name": "宜城市",
      "code": "420684" }] },



  {
    "name": "鄂州市",
    "code": "420700",
    "sub": [
    {
      "name": "市辖区",
      "code": "420701" },

    {
      "name": "梁子湖区",
      "code": "420702" },

    {
      "name": "华容区",
      "code": "420703" },

    {
      "name": "鄂城区",
      "code": "420704" }] },



  {
    "name": "荆门市",
    "code": "420800",
    "sub": [
    {
      "name": "市辖区",
      "code": "420801" },

    {
      "name": "东宝区",
      "code": "420802" },

    {
      "name": "掇刀区",
      "code": "420804" },

    {
      "name": "京山县",
      "code": "420821" },

    {
      "name": "沙洋县",
      "code": "420822" },

    {
      "name": "钟祥市",
      "code": "420881" }] },



  {
    "name": "孝感市",
    "code": "420900",
    "sub": [
    {
      "name": "市辖区",
      "code": "420901" },

    {
      "name": "孝南区",
      "code": "420902" },

    {
      "name": "孝昌县",
      "code": "420921" },

    {
      "name": "大悟县",
      "code": "420922" },

    {
      "name": "云梦县",
      "code": "420923" },

    {
      "name": "应城市",
      "code": "420981" },

    {
      "name": "安陆市",
      "code": "420982" },

    {
      "name": "汉川市",
      "code": "420984" }] },



  {
    "name": "荆州市",
    "code": "421000",
    "sub": [
    {
      "name": "市辖区",
      "code": "421001" },

    {
      "name": "沙市区",
      "code": "421002" },

    {
      "name": "荆州区",
      "code": "421003" },

    {
      "name": "公安县",
      "code": "421022" },

    {
      "name": "监利县",
      "code": "421023" },

    {
      "name": "江陵县",
      "code": "421024" },

    {
      "name": "石首市",
      "code": "421081" },

    {
      "name": "洪湖市",
      "code": "421083" },

    {
      "name": "松滋市",
      "code": "421087" }] },



  {
    "name": "黄冈市",
    "code": "421100",
    "sub": [
    {
      "name": "市辖区",
      "code": "421101" },

    {
      "name": "黄州区",
      "code": "421102" },

    {
      "name": "团风县",
      "code": "421121" },

    {
      "name": "红安县",
      "code": "421122" },

    {
      "name": "罗田县",
      "code": "421123" },

    {
      "name": "英山县",
      "code": "421124" },

    {
      "name": "浠水县",
      "code": "421125" },

    {
      "name": "蕲春县",
      "code": "421126" },

    {
      "name": "黄梅县",
      "code": "421127" },

    {
      "name": "麻城市",
      "code": "421181" },

    {
      "name": "武穴市",
      "code": "421182" }] },



  {
    "name": "咸宁市",
    "code": "421200",
    "sub": [
    {
      "name": "市辖区",
      "code": "421201" },

    {
      "name": "咸安区",
      "code": "421202" },

    {
      "name": "嘉鱼县",
      "code": "421221" },

    {
      "name": "通城县",
      "code": "421222" },

    {
      "name": "崇阳县",
      "code": "421223" },

    {
      "name": "通山县",
      "code": "421224" },

    {
      "name": "赤壁市",
      "code": "421281" }] },



  {
    "name": "随州市",
    "code": "421300",
    "sub": [
    {
      "name": "市辖区",
      "code": "421301" },

    {
      "name": "曾都区",
      "code": "421303" },

    {
      "name": "随县",
      "code": "421321" },

    {
      "name": "广水市",
      "code": "421381" }] },



  {
    "name": "恩施土家族苗族自治州",
    "code": "422800",
    "sub": [
    {
      "name": "恩施市",
      "code": "422801" },

    {
      "name": "利川市",
      "code": "422802" },

    {
      "name": "建始县",
      "code": "422822" },

    {
      "name": "巴东县",
      "code": "422823" },

    {
      "name": "宣恩县",
      "code": "422825" },

    {
      "name": "咸丰县",
      "code": "422826" },

    {
      "name": "来凤县",
      "code": "422827" },

    {
      "name": "鹤峰县",
      "code": "422828" }] },



  {
    "name": "仙桃市",
    "code": "429004" },

  {
    "name": "潜江市",
    "code": "429005" },

  {
    "name": "天门市",
    "code": "429006" },

  {
    "name": "神农架林区",
    "code": "429021" }] },



{
  "name": "湖南省",
  "code": "430000",
  "sub": [
  {
    "name": "长沙市",
    "code": "430100",
    "sub": [
    {
      "name": "市辖区",
      "code": "430101" },

    {
      "name": "芙蓉区",
      "code": "430102" },

    {
      "name": "天心区",
      "code": "430103" },

    {
      "name": "岳麓区",
      "code": "430104" },

    {
      "name": "开福区",
      "code": "430105" },

    {
      "name": "雨花区",
      "code": "430111" },

    {
      "name": "望城区",
      "code": "430112" },

    {
      "name": "长沙县",
      "code": "430121" },

    {
      "name": "宁乡县",
      "code": "430124" },

    {
      "name": "浏阳市",
      "code": "430181" }] },



  {
    "name": "株洲市",
    "code": "430200",
    "sub": [
    {
      "name": "市辖区",
      "code": "430201" },

    {
      "name": "荷塘区",
      "code": "430202" },

    {
      "name": "芦淞区",
      "code": "430203" },

    {
      "name": "石峰区",
      "code": "430204" },

    {
      "name": "天元区",
      "code": "430211" },

    {
      "name": "株洲县",
      "code": "430221" },

    {
      "name": "攸县",
      "code": "430223" },

    {
      "name": "茶陵县",
      "code": "430224" },

    {
      "name": "炎陵县",
      "code": "430225" },

    {
      "name": "醴陵市",
      "code": "430281" }] },



  {
    "name": "湘潭市",
    "code": "430300",
    "sub": [
    {
      "name": "市辖区",
      "code": "430301" },

    {
      "name": "雨湖区",
      "code": "430302" },

    {
      "name": "岳塘区",
      "code": "430304" },

    {
      "name": "湘潭县",
      "code": "430321" },

    {
      "name": "湘乡市",
      "code": "430381" },

    {
      "name": "韶山市",
      "code": "430382" }] },



  {
    "name": "衡阳市",
    "code": "430400",
    "sub": [
    {
      "name": "市辖区",
      "code": "430401" },

    {
      "name": "珠晖区",
      "code": "430405" },

    {
      "name": "雁峰区",
      "code": "430406" },

    {
      "name": "石鼓区",
      "code": "430407" },

    {
      "name": "蒸湘区",
      "code": "430408" },

    {
      "name": "南岳区",
      "code": "430412" },

    {
      "name": "衡阳县",
      "code": "430421" },

    {
      "name": "衡南县",
      "code": "430422" },

    {
      "name": "衡山县",
      "code": "430423" },

    {
      "name": "衡东县",
      "code": "430424" },

    {
      "name": "祁东县",
      "code": "430426" },

    {
      "name": "耒阳市",
      "code": "430481" },

    {
      "name": "常宁市",
      "code": "430482" }] },



  {
    "name": "邵阳市",
    "code": "430500",
    "sub": [
    {
      "name": "市辖区",
      "code": "430501" },

    {
      "name": "双清区",
      "code": "430502" },

    {
      "name": "大祥区",
      "code": "430503" },

    {
      "name": "北塔区",
      "code": "430511" },

    {
      "name": "邵东县",
      "code": "430521" },

    {
      "name": "新邵县",
      "code": "430522" },

    {
      "name": "邵阳县",
      "code": "430523" },

    {
      "name": "隆回县",
      "code": "430524" },

    {
      "name": "洞口县",
      "code": "430525" },

    {
      "name": "绥宁县",
      "code": "430527" },

    {
      "name": "新宁县",
      "code": "430528" },

    {
      "name": "城步苗族自治县",
      "code": "430529" },

    {
      "name": "武冈市",
      "code": "430581" }] },



  {
    "name": "岳阳市",
    "code": "430600",
    "sub": [
    {
      "name": "市辖区",
      "code": "430601" },

    {
      "name": "岳阳楼区",
      "code": "430602" },

    {
      "name": "云溪区",
      "code": "430603" },

    {
      "name": "君山区",
      "code": "430611" },

    {
      "name": "岳阳县",
      "code": "430621" },

    {
      "name": "华容县",
      "code": "430623" },

    {
      "name": "湘阴县",
      "code": "430624" },

    {
      "name": "平江县",
      "code": "430626" },

    {
      "name": "汨罗市",
      "code": "430681" },

    {
      "name": "临湘市",
      "code": "430682" }] },



  {
    "name": "常德市",
    "code": "430700",
    "sub": [
    {
      "name": "市辖区",
      "code": "430701" },

    {
      "name": "武陵区",
      "code": "430702" },

    {
      "name": "鼎城区",
      "code": "430703" },

    {
      "name": "安乡县",
      "code": "430721" },

    {
      "name": "汉寿县",
      "code": "430722" },

    {
      "name": "澧县",
      "code": "430723" },

    {
      "name": "临澧县",
      "code": "430724" },

    {
      "name": "桃源县",
      "code": "430725" },

    {
      "name": "石门县",
      "code": "430726" },

    {
      "name": "津市市",
      "code": "430781" }] },



  {
    "name": "张家界市",
    "code": "430800",
    "sub": [
    {
      "name": "市辖区",
      "code": "430801" },

    {
      "name": "永定区",
      "code": "430802" },

    {
      "name": "武陵源区",
      "code": "430811" },

    {
      "name": "慈利县",
      "code": "430821" },

    {
      "name": "桑植县",
      "code": "430822" }] },



  {
    "name": "益阳市",
    "code": "430900",
    "sub": [
    {
      "name": "市辖区",
      "code": "430901" },

    {
      "name": "资阳区",
      "code": "430902" },

    {
      "name": "赫山区",
      "code": "430903" },

    {
      "name": "南县",
      "code": "430921" },

    {
      "name": "桃江县",
      "code": "430922" },

    {
      "name": "安化县",
      "code": "430923" },

    {
      "name": "沅江市",
      "code": "430981" }] },



  {
    "name": "郴州市",
    "code": "431000",
    "sub": [
    {
      "name": "市辖区",
      "code": "431001" },

    {
      "name": "北湖区",
      "code": "431002" },

    {
      "name": "苏仙区",
      "code": "431003" },

    {
      "name": "桂阳县",
      "code": "431021" },

    {
      "name": "宜章县",
      "code": "431022" },

    {
      "name": "永兴县",
      "code": "431023" },

    {
      "name": "嘉禾县",
      "code": "431024" },

    {
      "name": "临武县",
      "code": "431025" },

    {
      "name": "汝城县",
      "code": "431026" },

    {
      "name": "桂东县",
      "code": "431027" },

    {
      "name": "安仁县",
      "code": "431028" },

    {
      "name": "资兴市",
      "code": "431081" }] },



  {
    "name": "永州市",
    "code": "431100",
    "sub": [
    {
      "name": "市辖区",
      "code": "431101" },

    {
      "name": "零陵区",
      "code": "431102" },

    {
      "name": "冷水滩区",
      "code": "431103" },

    {
      "name": "祁阳县",
      "code": "431121" },

    {
      "name": "东安县",
      "code": "431122" },

    {
      "name": "双牌县",
      "code": "431123" },

    {
      "name": "道县",
      "code": "431124" },

    {
      "name": "江永县",
      "code": "431125" },

    {
      "name": "宁远县",
      "code": "431126" },

    {
      "name": "蓝山县",
      "code": "431127" },

    {
      "name": "新田县",
      "code": "431128" },

    {
      "name": "江华瑶族自治县",
      "code": "431129" }] },



  {
    "name": "怀化市",
    "code": "431200",
    "sub": [
    {
      "name": "市辖区",
      "code": "431201" },

    {
      "name": "鹤城区",
      "code": "431202" },

    {
      "name": "中方县",
      "code": "431221" },

    {
      "name": "沅陵县",
      "code": "431222" },

    {
      "name": "辰溪县",
      "code": "431223" },

    {
      "name": "溆浦县",
      "code": "431224" },

    {
      "name": "会同县",
      "code": "431225" },

    {
      "name": "麻阳苗族自治县",
      "code": "431226" },

    {
      "name": "新晃侗族自治县",
      "code": "431227" },

    {
      "name": "芷江侗族自治县",
      "code": "431228" },

    {
      "name": "靖州苗族侗族自治县",
      "code": "431229" },

    {
      "name": "通道侗族自治县",
      "code": "431230" },

    {
      "name": "洪江市",
      "code": "431281" }] },



  {
    "name": "娄底市",
    "code": "431300",
    "sub": [
    {
      "name": "市辖区",
      "code": "431301" },

    {
      "name": "娄星区",
      "code": "431302" },

    {
      "name": "双峰县",
      "code": "431321" },

    {
      "name": "新化县",
      "code": "431322" },

    {
      "name": "冷水江市",
      "code": "431381" },

    {
      "name": "涟源市",
      "code": "431382" }] },



  {
    "name": "湘西土家族苗族自治州",
    "code": "433100",
    "sub": [
    {
      "name": "吉首市",
      "code": "433101" },

    {
      "name": "泸溪县",
      "code": "433122" },

    {
      "name": "凤凰县",
      "code": "433123" },

    {
      "name": "花垣县",
      "code": "433124" },

    {
      "name": "保靖县",
      "code": "433125" },

    {
      "name": "古丈县",
      "code": "433126" },

    {
      "name": "永顺县",
      "code": "433127" },

    {
      "name": "龙山县",
      "code": "433130" }] }] },





{
  "name": "广东省",
  "code": "440000",
  "sub": [
  {
    "name": "广州市",
    "code": "440100",
    "sub": [
    {
      "name": "市辖区",
      "code": "440101" },

    {
      "name": "荔湾区",
      "code": "440103" },

    {
      "name": "越秀区",
      "code": "440104" },

    {
      "name": "海珠区",
      "code": "440105" },

    {
      "name": "天河区",
      "code": "440106" },

    {
      "name": "白云区",
      "code": "440111" },

    {
      "name": "黄埔区",
      "code": "440112" },

    {
      "name": "番禺区",
      "code": "440113" },

    {
      "name": "花都区",
      "code": "440114" },

    {
      "name": "南沙区",
      "code": "440115" },

    {
      "name": "从化区",
      "code": "440117" },

    {
      "name": "增城区",
      "code": "440118" }] },



  {
    "name": "韶关市",
    "code": "440200",
    "sub": [
    {
      "name": "市辖区",
      "code": "440201" },

    {
      "name": "武江区",
      "code": "440203" },

    {
      "name": "浈江区",
      "code": "440204" },

    {
      "name": "曲江区",
      "code": "440205" },

    {
      "name": "始兴县",
      "code": "440222" },

    {
      "name": "仁化县",
      "code": "440224" },

    {
      "name": "翁源县",
      "code": "440229" },

    {
      "name": "乳源瑶族自治县",
      "code": "440232" },

    {
      "name": "新丰县",
      "code": "440233" },

    {
      "name": "乐昌市",
      "code": "440281" },

    {
      "name": "南雄市",
      "code": "440282" }] },



  {
    "name": "深圳市",
    "code": "440300",
    "sub": [
    {
      "name": "市辖区",
      "code": "440301" },

    {
      "name": "罗湖区",
      "code": "440303" },

    {
      "name": "福田区",
      "code": "440304" },

    {
      "name": "南山区",
      "code": "440305" },

    {
      "name": "宝安区",
      "code": "440306" },

    {
      "name": "龙岗区",
      "code": "440307" },

    {
      "name": "盐田区",
      "code": "440308" }] },



  {
    "name": "珠海市",
    "code": "440400",
    "sub": [
    {
      "name": "市辖区",
      "code": "440401" },

    {
      "name": "香洲区",
      "code": "440402" },

    {
      "name": "斗门区",
      "code": "440403" },

    {
      "name": "金湾区",
      "code": "440404" }] },



  {
    "name": "汕头市",
    "code": "440500",
    "sub": [
    {
      "name": "市辖区",
      "code": "440501" },

    {
      "name": "龙湖区",
      "code": "440507" },

    {
      "name": "金平区",
      "code": "440511" },

    {
      "name": "濠江区",
      "code": "440512" },

    {
      "name": "潮阳区",
      "code": "440513" },

    {
      "name": "潮南区",
      "code": "440514" },

    {
      "name": "澄海区",
      "code": "440515" },

    {
      "name": "南澳县",
      "code": "440523" }] },



  {
    "name": "佛山市",
    "code": "440600",
    "sub": [
    {
      "name": "市辖区",
      "code": "440601" },

    {
      "name": "禅城区",
      "code": "440604" },

    {
      "name": "南海区",
      "code": "440605" },

    {
      "name": "顺德区",
      "code": "440606" },

    {
      "name": "三水区",
      "code": "440607" },

    {
      "name": "高明区",
      "code": "440608" }] },



  {
    "name": "江门市",
    "code": "440700",
    "sub": [
    {
      "name": "市辖区",
      "code": "440701" },

    {
      "name": "蓬江区",
      "code": "440703" },

    {
      "name": "江海区",
      "code": "440704" },

    {
      "name": "新会区",
      "code": "440705" },

    {
      "name": "台山市",
      "code": "440781" },

    {
      "name": "开平市",
      "code": "440783" },

    {
      "name": "鹤山市",
      "code": "440784" },

    {
      "name": "恩平市",
      "code": "440785" }] },



  {
    "name": "湛江市",
    "code": "440800",
    "sub": [
    {
      "name": "市辖区",
      "code": "440801" },

    {
      "name": "赤坎区",
      "code": "440802" },

    {
      "name": "霞山区",
      "code": "440803" },

    {
      "name": "坡头区",
      "code": "440804" },

    {
      "name": "麻章区",
      "code": "440811" },

    {
      "name": "遂溪县",
      "code": "440823" },

    {
      "name": "徐闻县",
      "code": "440825" },

    {
      "name": "廉江市",
      "code": "440881" },

    {
      "name": "雷州市",
      "code": "440882" },

    {
      "name": "吴川市",
      "code": "440883" }] },



  {
    "name": "茂名市",
    "code": "440900",
    "sub": [
    {
      "name": "市辖区",
      "code": "440901" },

    {
      "name": "茂南区",
      "code": "440902" },

    {
      "name": "电白区",
      "code": "440904" },

    {
      "name": "高州市",
      "code": "440981" },

    {
      "name": "化州市",
      "code": "440982" },

    {
      "name": "信宜市",
      "code": "440983" }] },



  {
    "name": "肇庆市",
    "code": "441200",
    "sub": [
    {
      "name": "市辖区",
      "code": "441201" },

    {
      "name": "端州区",
      "code": "441202" },

    {
      "name": "鼎湖区",
      "code": "441203" },

    {
      "name": "广宁县",
      "code": "441223" },

    {
      "name": "怀集县",
      "code": "441224" },

    {
      "name": "封开县",
      "code": "441225" },

    {
      "name": "德庆县",
      "code": "441226" },

    {
      "name": "高要市",
      "code": "441283" },

    {
      "name": "四会市",
      "code": "441284" }] },



  {
    "name": "惠州市",
    "code": "441300",
    "sub": [
    {
      "name": "市辖区",
      "code": "441301" },

    {
      "name": "惠城区",
      "code": "441302" },

    {
      "name": "惠阳区",
      "code": "441303" },

    {
      "name": "博罗县",
      "code": "441322" },

    {
      "name": "惠东县",
      "code": "441323" },

    {
      "name": "龙门县",
      "code": "441324" }] },



  {
    "name": "梅州市",
    "code": "441400",
    "sub": [
    {
      "name": "市辖区",
      "code": "441401" },

    {
      "name": "梅江区",
      "code": "441402" },

    {
      "name": "梅县区",
      "code": "441403" },

    {
      "name": "大埔县",
      "code": "441422" },

    {
      "name": "丰顺县",
      "code": "441423" },

    {
      "name": "五华县",
      "code": "441424" },

    {
      "name": "平远县",
      "code": "441426" },

    {
      "name": "蕉岭县",
      "code": "441427" },

    {
      "name": "兴宁市",
      "code": "441481" }] },



  {
    "name": "汕尾市",
    "code": "441500",
    "sub": [
    {
      "name": "市辖区",
      "code": "441501" },

    {
      "name": "城区",
      "code": "441502" },

    {
      "name": "海丰县",
      "code": "441521" },

    {
      "name": "陆河县",
      "code": "441523" },

    {
      "name": "陆丰市",
      "code": "441581" }] },



  {
    "name": "河源市",
    "code": "441600",
    "sub": [
    {
      "name": "市辖区",
      "code": "441601" },

    {
      "name": "源城区",
      "code": "441602" },

    {
      "name": "紫金县",
      "code": "441621" },

    {
      "name": "龙川县",
      "code": "441622" },

    {
      "name": "连平县",
      "code": "441623" },

    {
      "name": "和平县",
      "code": "441624" },

    {
      "name": "东源县",
      "code": "441625" }] },



  {
    "name": "阳江市",
    "code": "441700",
    "sub": [
    {
      "name": "市辖区",
      "code": "441701" },

    {
      "name": "江城区",
      "code": "441702" },

    {
      "name": "阳东区",
      "code": "441704" },

    {
      "name": "阳西县",
      "code": "441721" },

    {
      "name": "阳春市",
      "code": "441781" }] },



  {
    "name": "清远市",
    "code": "441800",
    "sub": [
    {
      "name": "市辖区",
      "code": "441801" },

    {
      "name": "清城区",
      "code": "441802" },

    {
      "name": "清新区",
      "code": "441803" },

    {
      "name": "佛冈县",
      "code": "441821" },

    {
      "name": "阳山县",
      "code": "441823" },

    {
      "name": "连山壮族瑶族自治县",
      "code": "441825" },

    {
      "name": "连南瑶族自治县",
      "code": "441826" },

    {
      "name": "英德市",
      "code": "441881" },

    {
      "name": "连州市",
      "code": "441882" }] },



  {
    "name": "东莞市",
    "code": "441900",
    "sub": [] },



  {
    "name": "中山市",
    "code": "442000",
    "sub": [] },



  {
    "name": "潮州市",
    "code": "445100",
    "sub": [
    {
      "name": "市辖区",
      "code": "445101" },

    {
      "name": "湘桥区",
      "code": "445102" },

    {
      "name": "潮安区",
      "code": "445103" },

    {
      "name": "饶平县",
      "code": "445122" }] },



  {
    "name": "揭阳市",
    "code": "445200",
    "sub": [
    {
      "name": "市辖区",
      "code": "445201" },

    {
      "name": "榕城区",
      "code": "445202" },

    {
      "name": "揭东区",
      "code": "445203" },

    {
      "name": "揭西县",
      "code": "445222" },

    {
      "name": "惠来县",
      "code": "445224" },

    {
      "name": "普宁市",
      "code": "445281" }] },



  {
    "name": "云浮市",
    "code": "445300",
    "sub": [
    {
      "name": "市辖区",
      "code": "445301" },

    {
      "name": "云城区",
      "code": "445302" },

    {
      "name": "云安区",
      "code": "445303" },

    {
      "name": "新兴县",
      "code": "445321" },

    {
      "name": "郁南县",
      "code": "445322" },

    {
      "name": "罗定市",
      "code": "445381" }] }] },





{
  "name": "广西壮族自治区",
  "code": "450000",
  "sub": [
  {
    "name": "南宁市",
    "code": "450100",
    "sub": [
    {
      "name": "市辖区",
      "code": "450101" },

    {
      "name": "兴宁区",
      "code": "450102" },

    {
      "name": "青秀区",
      "code": "450103" },

    {
      "name": "江南区",
      "code": "450105" },

    {
      "name": "西乡塘区",
      "code": "450107" },

    {
      "name": "良庆区",
      "code": "450108" },

    {
      "name": "邕宁区",
      "code": "450109" },

    {
      "name": "武鸣县",
      "code": "450122" },

    {
      "name": "隆安县",
      "code": "450123" },

    {
      "name": "马山县",
      "code": "450124" },

    {
      "name": "上林县",
      "code": "450125" },

    {
      "name": "宾阳县",
      "code": "450126" },

    {
      "name": "横县",
      "code": "450127" }] },



  {
    "name": "柳州市",
    "code": "450200",
    "sub": [
    {
      "name": "市辖区",
      "code": "450201" },

    {
      "name": "城中区",
      "code": "450202" },

    {
      "name": "鱼峰区",
      "code": "450203" },

    {
      "name": "柳南区",
      "code": "450204" },

    {
      "name": "柳北区",
      "code": "450205" },

    {
      "name": "柳江县",
      "code": "450221" },

    {
      "name": "柳城县",
      "code": "450222" },

    {
      "name": "鹿寨县",
      "code": "450223" },

    {
      "name": "融安县",
      "code": "450224" },

    {
      "name": "融水苗族自治县",
      "code": "450225" },

    {
      "name": "三江侗族自治县",
      "code": "450226" }] },



  {
    "name": "桂林市",
    "code": "450300",
    "sub": [
    {
      "name": "市辖区",
      "code": "450301" },

    {
      "name": "秀峰区",
      "code": "450302" },

    {
      "name": "叠彩区",
      "code": "450303" },

    {
      "name": "象山区",
      "code": "450304" },

    {
      "name": "七星区",
      "code": "450305" },

    {
      "name": "雁山区",
      "code": "450311" },

    {
      "name": "临桂区",
      "code": "450312" },

    {
      "name": "阳朔县",
      "code": "450321" },

    {
      "name": "灵川县",
      "code": "450323" },

    {
      "name": "全州县",
      "code": "450324" },

    {
      "name": "兴安县",
      "code": "450325" },

    {
      "name": "永福县",
      "code": "450326" },

    {
      "name": "灌阳县",
      "code": "450327" },

    {
      "name": "龙胜各族自治县",
      "code": "450328" },

    {
      "name": "资源县",
      "code": "450329" },

    {
      "name": "平乐县",
      "code": "450330" },

    {
      "name": "荔浦县",
      "code": "450331" },

    {
      "name": "恭城瑶族自治县",
      "code": "450332" }] },



  {
    "name": "梧州市",
    "code": "450400",
    "sub": [
    {
      "name": "市辖区",
      "code": "450401" },

    {
      "name": "万秀区",
      "code": "450403" },

    {
      "name": "长洲区",
      "code": "450405" },

    {
      "name": "龙圩区",
      "code": "450406" },

    {
      "name": "苍梧县",
      "code": "450421" },

    {
      "name": "藤县",
      "code": "450422" },

    {
      "name": "蒙山县",
      "code": "450423" },

    {
      "name": "岑溪市",
      "code": "450481" }] },



  {
    "name": "北海市",
    "code": "450500",
    "sub": [
    {
      "name": "市辖区",
      "code": "450501" },

    {
      "name": "海城区",
      "code": "450502" },

    {
      "name": "银海区",
      "code": "450503" },

    {
      "name": "铁山港区",
      "code": "450512" },

    {
      "name": "合浦县",
      "code": "450521" }] },



  {
    "name": "防城港市",
    "code": "450600",
    "sub": [
    {
      "name": "市辖区",
      "code": "450601" },

    {
      "name": "港口区",
      "code": "450602" },

    {
      "name": "防城区",
      "code": "450603" },

    {
      "name": "上思县",
      "code": "450621" },

    {
      "name": "东兴市",
      "code": "450681" }] },



  {
    "name": "钦州市",
    "code": "450700",
    "sub": [
    {
      "name": "市辖区",
      "code": "450701" },

    {
      "name": "钦南区",
      "code": "450702" },

    {
      "name": "钦北区",
      "code": "450703" },

    {
      "name": "灵山县",
      "code": "450721" },

    {
      "name": "浦北县",
      "code": "450722" }] },



  {
    "name": "贵港市",
    "code": "450800",
    "sub": [
    {
      "name": "市辖区",
      "code": "450801" },

    {
      "name": "港北区",
      "code": "450802" },

    {
      "name": "港南区",
      "code": "450803" },

    {
      "name": "覃塘区",
      "code": "450804" },

    {
      "name": "平南县",
      "code": "450821" },

    {
      "name": "桂平市",
      "code": "450881" }] },



  {
    "name": "玉林市",
    "code": "450900",
    "sub": [
    {
      "name": "市辖区",
      "code": "450901" },

    {
      "name": "玉州区",
      "code": "450902" },

    {
      "name": "福绵区",
      "code": "450903" },

    {
      "name": "容县",
      "code": "450921" },

    {
      "name": "陆川县",
      "code": "450922" },

    {
      "name": "博白县",
      "code": "450923" },

    {
      "name": "兴业县",
      "code": "450924" },

    {
      "name": "北流市",
      "code": "450981" }] },



  {
    "name": "百色市",
    "code": "451000",
    "sub": [
    {
      "name": "市辖区",
      "code": "451001" },

    {
      "name": "右江区",
      "code": "451002" },

    {
      "name": "田阳县",
      "code": "451021" },

    {
      "name": "田东县",
      "code": "451022" },

    {
      "name": "平果县",
      "code": "451023" },

    {
      "name": "德保县",
      "code": "451024" },

    {
      "name": "靖西县",
      "code": "451025" },

    {
      "name": "那坡县",
      "code": "451026" },

    {
      "name": "凌云县",
      "code": "451027" },

    {
      "name": "乐业县",
      "code": "451028" },

    {
      "name": "田林县",
      "code": "451029" },

    {
      "name": "西林县",
      "code": "451030" },

    {
      "name": "隆林各族自治县",
      "code": "451031" }] },



  {
    "name": "贺州市",
    "code": "451100",
    "sub": [
    {
      "name": "市辖区",
      "code": "451101" },

    {
      "name": "八步区",
      "code": "451102" },

    {
      "name": "平桂管理区",
      "code": "451119" },

    {
      "name": "昭平县",
      "code": "451121" },

    {
      "name": "钟山县",
      "code": "451122" },

    {
      "name": "富川瑶族自治县",
      "code": "451123" }] },



  {
    "name": "河池市",
    "code": "451200",
    "sub": [
    {
      "name": "市辖区",
      "code": "451201" },

    {
      "name": "金城江区",
      "code": "451202" },

    {
      "name": "南丹县",
      "code": "451221" },

    {
      "name": "天峨县",
      "code": "451222" },

    {
      "name": "凤山县",
      "code": "451223" },

    {
      "name": "东兰县",
      "code": "451224" },

    {
      "name": "罗城仫佬族自治县",
      "code": "451225" },

    {
      "name": "环江毛南族自治县",
      "code": "451226" },

    {
      "name": "巴马瑶族自治县",
      "code": "451227" },

    {
      "name": "都安瑶族自治县",
      "code": "451228" },

    {
      "name": "大化瑶族自治县",
      "code": "451229" },

    {
      "name": "宜州市",
      "code": "451281" }] },



  {
    "name": "来宾市",
    "code": "451300",
    "sub": [
    {
      "name": "市辖区",
      "code": "451301" },

    {
      "name": "兴宾区",
      "code": "451302" },

    {
      "name": "忻城县",
      "code": "451321" },

    {
      "name": "象州县",
      "code": "451322" },

    {
      "name": "武宣县",
      "code": "451323" },

    {
      "name": "金秀瑶族自治县",
      "code": "451324" },

    {
      "name": "合山市",
      "code": "451381" }] },



  {
    "name": "崇左市",
    "code": "451400",
    "sub": [
    {
      "name": "市辖区",
      "code": "451401" },

    {
      "name": "江州区",
      "code": "451402" },

    {
      "name": "扶绥县",
      "code": "451421" },

    {
      "name": "宁明县",
      "code": "451422" },

    {
      "name": "龙州县",
      "code": "451423" },

    {
      "name": "大新县",
      "code": "451424" },

    {
      "name": "天等县",
      "code": "451425" },

    {
      "name": "凭祥市",
      "code": "451481" }] }] },





{
  "name": "海南省",
  "code": "460000",
  "sub": [
  {
    "name": "海口市",
    "code": "460100",
    "sub": [
    {
      "name": "市辖区",
      "code": "460101" },

    {
      "name": "秀英区",
      "code": "460105" },

    {
      "name": "龙华区",
      "code": "460106" },

    {
      "name": "琼山区",
      "code": "460107" },

    {
      "name": "美兰区",
      "code": "460108" }] },



  {
    "name": "三亚市",
    "code": "460200",
    "sub": [
    {
      "name": "市辖区",
      "code": "460201" },

    {
      "name": "海棠区",
      "code": "460202" },

    {
      "name": "吉阳区",
      "code": "460203" },

    {
      "name": "天涯区",
      "code": "460204" },

    {
      "name": "崖州区",
      "code": "460205" }] },



  {
    "name": "三沙市",
    "code": "460300",
    "sub": [
    {
      "name": "西沙群岛",
      "code": "460321" },

    {
      "name": "南沙群岛",
      "code": "460322" },

    {
      "name": "中沙群岛的岛礁及其海域",
      "code": "460323" }] },



  {
    "name": "五指山市",
    "code": "469001" },

  {
    "name": "琼海市",
    "code": "469002" },

  {
    "name": "儋州市",
    "code": "469003" },

  {
    "name": "文昌市",
    "code": "469005" },

  {
    "name": "万宁市",
    "code": "469006" },

  {
    "name": "东方市",
    "code": "469007" },

  {
    "name": "定安县",
    "code": "469021" },

  {
    "name": "屯昌县",
    "code": "469022" },

  {
    "name": "澄迈县",
    "code": "469023" },

  {
    "name": "临高县",
    "code": "469024" },

  {
    "name": "白沙黎族自治县",
    "code": "469025" },

  {
    "name": "昌江黎族自治县",
    "code": "469026" },

  {
    "name": "乐东黎族自治县",
    "code": "469027" },

  {
    "name": "陵水黎族自治县",
    "code": "469028" },

  {
    "name": "保亭黎族苗族自治县",
    "code": "469029" },

  {
    "name": "琼中黎族苗族自治县",
    "code": "469030" }] },



{
  "name": "重庆",
  "code": "500000",
  "sub": [
  {
    "name": "重庆市",
    "code": "500000",
    "sub": [
    {
      "name": "万州区",
      "code": "500101" },

    {
      "name": "涪陵区",
      "code": "500102" },

    {
      "name": "渝中区",
      "code": "500103" },

    {
      "name": "大渡口区",
      "code": "500104" },

    {
      "name": "江北区",
      "code": "500105" },

    {
      "name": "沙坪坝区",
      "code": "500106" },

    {
      "name": "九龙坡区",
      "code": "500107" },

    {
      "name": "南岸区",
      "code": "500108" },

    {
      "name": "北碚区",
      "code": "500109" },

    {
      "name": "綦江区",
      "code": "500110" },

    {
      "name": "大足区",
      "code": "500111" },

    {
      "name": "渝北区",
      "code": "500112" },

    {
      "name": "巴南区",
      "code": "500113" },

    {
      "name": "黔江区",
      "code": "500114" },

    {
      "name": "长寿区",
      "code": "500115" },

    {
      "name": "江津区",
      "code": "500116" },

    {
      "name": "合川区",
      "code": "500117" },

    {
      "name": "永川区",
      "code": "500118" },

    {
      "name": "南川区",
      "code": "500119" },

    {
      "name": "璧山区",
      "code": "500120" },

    {
      "name": "铜梁区",
      "code": "500151" },

    {
      "name": "潼南县",
      "code": "500223" },

    {
      "name": "荣昌县",
      "code": "500226" },

    {
      "name": "梁平县",
      "code": "500228" },

    {
      "name": "城口县",
      "code": "500229" },

    {
      "name": "丰都县",
      "code": "500230" },

    {
      "name": "垫江县",
      "code": "500231" },

    {
      "name": "武隆县",
      "code": "500232" },

    {
      "name": "忠县",
      "code": "500233" },

    {
      "name": "开县",
      "code": "500234" },

    {
      "name": "云阳县",
      "code": "500235" },

    {
      "name": "奉节县",
      "code": "500236" },

    {
      "name": "巫山县",
      "code": "500237" },

    {
      "name": "巫溪县",
      "code": "500238" },

    {
      "name": "石柱土家族自治县",
      "code": "500240" },

    {
      "name": "秀山土家族苗族自治县",
      "code": "500241" },

    {
      "name": "酉阳土家族苗族自治县",
      "code": "500242" },

    {
      "name": "彭水苗族土家族自治县",
      "code": "500243" }] }] },





{
  "name": "四川省",
  "code": "510000",
  "sub": [
  {
    "name": "成都市",
    "code": "510100",
    "sub": [
    {
      "name": "市辖区",
      "code": "510101" },

    {
      "name": "锦江区",
      "code": "510104" },

    {
      "name": "青羊区",
      "code": "510105" },

    {
      "name": "金牛区",
      "code": "510106" },

    {
      "name": "武侯区",
      "code": "510107" },

    {
      "name": "成华区",
      "code": "510108" },

    {
      "name": "龙泉驿区",
      "code": "510112" },

    {
      "name": "青白江区",
      "code": "510113" },

    {
      "name": "新都区",
      "code": "510114" },

    {
      "name": "温江区",
      "code": "510115" },

    {
      "name": "金堂县",
      "code": "510121" },

    {
      "name": "双流县",
      "code": "510122" },

    {
      "name": "郫县",
      "code": "510124" },

    {
      "name": "大邑县",
      "code": "510129" },

    {
      "name": "蒲江县",
      "code": "510131" },

    {
      "name": "新津县",
      "code": "510132" },

    {
      "name": "都江堰市",
      "code": "510181" },

    {
      "name": "彭州市",
      "code": "510182" },

    {
      "name": "邛崃市",
      "code": "510183" },

    {
      "name": "崇州市",
      "code": "510184" }] },



  {
    "name": "自贡市",
    "code": "510300",
    "sub": [
    {
      "name": "市辖区",
      "code": "510301" },

    {
      "name": "自流井区",
      "code": "510302" },

    {
      "name": "贡井区",
      "code": "510303" },

    {
      "name": "大安区",
      "code": "510304" },

    {
      "name": "沿滩区",
      "code": "510311" },

    {
      "name": "荣县",
      "code": "510321" },

    {
      "name": "富顺县",
      "code": "510322" }] },



  {
    "name": "攀枝花市",
    "code": "510400",
    "sub": [
    {
      "name": "市辖区",
      "code": "510401" },

    {
      "name": "东区",
      "code": "510402" },

    {
      "name": "西区",
      "code": "510403" },

    {
      "name": "仁和区",
      "code": "510411" },

    {
      "name": "米易县",
      "code": "510421" },

    {
      "name": "盐边县",
      "code": "510422" }] },



  {
    "name": "泸州市",
    "code": "510500",
    "sub": [
    {
      "name": "市辖区",
      "code": "510501" },

    {
      "name": "江阳区",
      "code": "510502" },

    {
      "name": "纳溪区",
      "code": "510503" },

    {
      "name": "龙马潭区",
      "code": "510504" },

    {
      "name": "泸县",
      "code": "510521" },

    {
      "name": "合江县",
      "code": "510522" },

    {
      "name": "叙永县",
      "code": "510524" },

    {
      "name": "古蔺县",
      "code": "510525" }] },



  {
    "name": "德阳市",
    "code": "510600",
    "sub": [
    {
      "name": "市辖区",
      "code": "510601" },

    {
      "name": "旌阳区",
      "code": "510603" },

    {
      "name": "中江县",
      "code": "510623" },

    {
      "name": "罗江县",
      "code": "510626" },

    {
      "name": "广汉市",
      "code": "510681" },

    {
      "name": "什邡市",
      "code": "510682" },

    {
      "name": "绵竹市",
      "code": "510683" }] },



  {
    "name": "绵阳市",
    "code": "510700",
    "sub": [
    {
      "name": "市辖区",
      "code": "510701" },

    {
      "name": "涪城区",
      "code": "510703" },

    {
      "name": "游仙区",
      "code": "510704" },

    {
      "name": "三台县",
      "code": "510722" },

    {
      "name": "盐亭县",
      "code": "510723" },

    {
      "name": "安县",
      "code": "510724" },

    {
      "name": "梓潼县",
      "code": "510725" },

    {
      "name": "北川羌族自治县",
      "code": "510726" },

    {
      "name": "平武县",
      "code": "510727" },

    {
      "name": "江油市",
      "code": "510781" }] },



  {
    "name": "广元市",
    "code": "510800",
    "sub": [
    {
      "name": "市辖区",
      "code": "510801" },

    {
      "name": "利州区",
      "code": "510802" },

    {
      "name": "昭化区",
      "code": "510811" },

    {
      "name": "朝天区",
      "code": "510812" },

    {
      "name": "旺苍县",
      "code": "510821" },

    {
      "name": "青川县",
      "code": "510822" },

    {
      "name": "剑阁县",
      "code": "510823" },

    {
      "name": "苍溪县",
      "code": "510824" }] },



  {
    "name": "遂宁市",
    "code": "510900",
    "sub": [
    {
      "name": "市辖区",
      "code": "510901" },

    {
      "name": "船山区",
      "code": "510903" },

    {
      "name": "安居区",
      "code": "510904" },

    {
      "name": "蓬溪县",
      "code": "510921" },

    {
      "name": "射洪县",
      "code": "510922" },

    {
      "name": "大英县",
      "code": "510923" }] },



  {
    "name": "内江市",
    "code": "511000",
    "sub": [
    {
      "name": "市辖区",
      "code": "511001" },

    {
      "name": "市中区",
      "code": "511002" },

    {
      "name": "东兴区",
      "code": "511011" },

    {
      "name": "威远县",
      "code": "511024" },

    {
      "name": "资中县",
      "code": "511025" },

    {
      "name": "隆昌县",
      "code": "511028" }] },



  {
    "name": "乐山市",
    "code": "511100",
    "sub": [
    {
      "name": "市辖区",
      "code": "511101" },

    {
      "name": "市中区",
      "code": "511102" },

    {
      "name": "沙湾区",
      "code": "511111" },

    {
      "name": "五通桥区",
      "code": "511112" },

    {
      "name": "金口河区",
      "code": "511113" },

    {
      "name": "犍为县",
      "code": "511123" },

    {
      "name": "井研县",
      "code": "511124" },

    {
      "name": "夹江县",
      "code": "511126" },

    {
      "name": "沐川县",
      "code": "511129" },

    {
      "name": "峨边彝族自治县",
      "code": "511132" },

    {
      "name": "马边彝族自治县",
      "code": "511133" },

    {
      "name": "峨眉山市",
      "code": "511181" }] },



  {
    "name": "南充市",
    "code": "511300",
    "sub": [
    {
      "name": "市辖区",
      "code": "511301" },

    {
      "name": "顺庆区",
      "code": "511302" },

    {
      "name": "高坪区",
      "code": "511303" },

    {
      "name": "嘉陵区",
      "code": "511304" },

    {
      "name": "南部县",
      "code": "511321" },

    {
      "name": "营山县",
      "code": "511322" },

    {
      "name": "蓬安县",
      "code": "511323" },

    {
      "name": "仪陇县",
      "code": "511324" },

    {
      "name": "西充县",
      "code": "511325" },

    {
      "name": "阆中市",
      "code": "511381" }] },



  {
    "name": "眉山市",
    "code": "511400",
    "sub": [
    {
      "name": "市辖区",
      "code": "511401" },

    {
      "name": "东坡区",
      "code": "511402" },

    {
      "name": "彭山区",
      "code": "511403" },

    {
      "name": "仁寿县",
      "code": "511421" },

    {
      "name": "洪雅县",
      "code": "511423" },

    {
      "name": "丹棱县",
      "code": "511424" },

    {
      "name": "青神县",
      "code": "511425" }] },



  {
    "name": "宜宾市",
    "code": "511500",
    "sub": [
    {
      "name": "市辖区",
      "code": "511501" },

    {
      "name": "翠屏区",
      "code": "511502" },

    {
      "name": "南溪区",
      "code": "511503" },

    {
      "name": "宜宾县",
      "code": "511521" },

    {
      "name": "江安县",
      "code": "511523" },

    {
      "name": "长宁县",
      "code": "511524" },

    {
      "name": "高县",
      "code": "511525" },

    {
      "name": "珙县",
      "code": "511526" },

    {
      "name": "筠连县",
      "code": "511527" },

    {
      "name": "兴文县",
      "code": "511528" },

    {
      "name": "屏山县",
      "code": "511529" }] },



  {
    "name": "广安市",
    "code": "511600",
    "sub": [
    {
      "name": "市辖区",
      "code": "511601" },

    {
      "name": "广安区",
      "code": "511602" },

    {
      "name": "前锋区",
      "code": "511603" },

    {
      "name": "岳池县",
      "code": "511621" },

    {
      "name": "武胜县",
      "code": "511622" },

    {
      "name": "邻水县",
      "code": "511623" },

    {
      "name": "华蓥市",
      "code": "511681" }] },



  {
    "name": "达州市",
    "code": "511700",
    "sub": [
    {
      "name": "市辖区",
      "code": "511701" },

    {
      "name": "通川区",
      "code": "511702" },

    {
      "name": "达川区",
      "code": "511703" },

    {
      "name": "宣汉县",
      "code": "511722" },

    {
      "name": "开江县",
      "code": "511723" },

    {
      "name": "大竹县",
      "code": "511724" },

    {
      "name": "渠县",
      "code": "511725" },

    {
      "name": "万源市",
      "code": "511781" }] },



  {
    "name": "雅安市",
    "code": "511800",
    "sub": [
    {
      "name": "市辖区",
      "code": "511801" },

    {
      "name": "雨城区",
      "code": "511802" },

    {
      "name": "名山区",
      "code": "511803" },

    {
      "name": "荥经县",
      "code": "511822" },

    {
      "name": "汉源县",
      "code": "511823" },

    {
      "name": "石棉县",
      "code": "511824" },

    {
      "name": "天全县",
      "code": "511825" },

    {
      "name": "芦山县",
      "code": "511826" },

    {
      "name": "宝兴县",
      "code": "511827" }] },



  {
    "name": "巴中市",
    "code": "511900",
    "sub": [
    {
      "name": "市辖区",
      "code": "511901" },

    {
      "name": "巴州区",
      "code": "511902" },

    {
      "name": "恩阳区",
      "code": "511903" },

    {
      "name": "通江县",
      "code": "511921" },

    {
      "name": "南江县",
      "code": "511922" },

    {
      "name": "平昌县",
      "code": "511923" }] },



  {
    "name": "资阳市",
    "code": "512000",
    "sub": [
    {
      "name": "市辖区",
      "code": "512001" },

    {
      "name": "雁江区",
      "code": "512002" },

    {
      "name": "安岳县",
      "code": "512021" },

    {
      "name": "乐至县",
      "code": "512022" },

    {
      "name": "简阳市",
      "code": "512081" }] },



  {
    "name": "阿坝藏族羌族自治州",
    "code": "513200",
    "sub": [
    {
      "name": "汶川县",
      "code": "513221" },

    {
      "name": "理县",
      "code": "513222" },

    {
      "name": "茂县",
      "code": "513223" },

    {
      "name": "松潘县",
      "code": "513224" },

    {
      "name": "九寨沟县",
      "code": "513225" },

    {
      "name": "金川县",
      "code": "513226" },

    {
      "name": "小金县",
      "code": "513227" },

    {
      "name": "黑水县",
      "code": "513228" },

    {
      "name": "马尔康县",
      "code": "513229" },

    {
      "name": "壤塘县",
      "code": "513230" },

    {
      "name": "阿坝县",
      "code": "513231" },

    {
      "name": "若尔盖县",
      "code": "513232" },

    {
      "name": "红原县",
      "code": "513233" }] },



  {
    "name": "甘孜藏族自治州",
    "code": "513300",
    "sub": [
    {
      "name": "康定县",
      "code": "513321" },

    {
      "name": "泸定县",
      "code": "513322" },

    {
      "name": "丹巴县",
      "code": "513323" },

    {
      "name": "九龙县",
      "code": "513324" },

    {
      "name": "雅江县",
      "code": "513325" },

    {
      "name": "道孚县",
      "code": "513326" },

    {
      "name": "炉霍县",
      "code": "513327" },

    {
      "name": "甘孜县",
      "code": "513328" },

    {
      "name": "新龙县",
      "code": "513329" },

    {
      "name": "德格县",
      "code": "513330" },

    {
      "name": "白玉县",
      "code": "513331" },

    {
      "name": "石渠县",
      "code": "513332" },

    {
      "name": "色达县",
      "code": "513333" },

    {
      "name": "理塘县",
      "code": "513334" },

    {
      "name": "巴塘县",
      "code": "513335" },

    {
      "name": "乡城县",
      "code": "513336" },

    {
      "name": "稻城县",
      "code": "513337" },

    {
      "name": "得荣县",
      "code": "513338" }] },



  {
    "name": "凉山彝族自治州",
    "code": "513400",
    "sub": [
    {
      "name": "西昌市",
      "code": "513401" },

    {
      "name": "木里藏族自治县",
      "code": "513422" },

    {
      "name": "盐源县",
      "code": "513423" },

    {
      "name": "德昌县",
      "code": "513424" },

    {
      "name": "会理县",
      "code": "513425" },

    {
      "name": "会东县",
      "code": "513426" },

    {
      "name": "宁南县",
      "code": "513427" },

    {
      "name": "普格县",
      "code": "513428" },

    {
      "name": "布拖县",
      "code": "513429" },

    {
      "name": "金阳县",
      "code": "513430" },

    {
      "name": "昭觉县",
      "code": "513431" },

    {
      "name": "喜德县",
      "code": "513432" },

    {
      "name": "冕宁县",
      "code": "513433" },

    {
      "name": "越西县",
      "code": "513434" },

    {
      "name": "甘洛县",
      "code": "513435" },

    {
      "name": "美姑县",
      "code": "513436" },

    {
      "name": "雷波县",
      "code": "513437" }] }] },





{
  "name": "贵州省",
  "code": "520000",
  "sub": [
  {
    "name": "贵阳市",
    "code": "520100",
    "sub": [
    {
      "name": "市辖区",
      "code": "520101" },

    {
      "name": "南明区",
      "code": "520102" },

    {
      "name": "云岩区",
      "code": "520103" },

    {
      "name": "花溪区",
      "code": "520111" },

    {
      "name": "乌当区",
      "code": "520112" },

    {
      "name": "白云区",
      "code": "520113" },

    {
      "name": "观山湖区",
      "code": "520115" },

    {
      "name": "开阳县",
      "code": "520121" },

    {
      "name": "息烽县",
      "code": "520122" },

    {
      "name": "修文县",
      "code": "520123" },

    {
      "name": "清镇市",
      "code": "520181" }] },



  {
    "name": "六盘水市",
    "code": "520200",
    "sub": [
    {
      "name": "钟山区",
      "code": "520201" },

    {
      "name": "六枝特区",
      "code": "520203" },

    {
      "name": "水城县",
      "code": "520221" },

    {
      "name": "盘县",
      "code": "520222" }] },



  {
    "name": "遵义市",
    "code": "520300",
    "sub": [
    {
      "name": "市辖区",
      "code": "520301" },

    {
      "name": "红花岗区",
      "code": "520302" },

    {
      "name": "汇川区",
      "code": "520303" },

    {
      "name": "遵义县",
      "code": "520321" },

    {
      "name": "桐梓县",
      "code": "520322" },

    {
      "name": "绥阳县",
      "code": "520323" },

    {
      "name": "正安县",
      "code": "520324" },

    {
      "name": "道真仡佬族苗族自治县",
      "code": "520325" },

    {
      "name": "务川仡佬族苗族自治县",
      "code": "520326" },

    {
      "name": "凤冈县",
      "code": "520327" },

    {
      "name": "湄潭县",
      "code": "520328" },

    {
      "name": "余庆县",
      "code": "520329" },

    {
      "name": "习水县",
      "code": "520330" },

    {
      "name": "赤水市",
      "code": "520381" },

    {
      "name": "仁怀市",
      "code": "520382" }] },



  {
    "name": "安顺市",
    "code": "520400",
    "sub": [
    {
      "name": "市辖区",
      "code": "520401" },

    {
      "name": "西秀区",
      "code": "520402" },

    {
      "name": "平坝区",
      "code": "520403" },

    {
      "name": "普定县",
      "code": "520422" },

    {
      "name": "镇宁布依族苗族自治县",
      "code": "520423" },

    {
      "name": "关岭布依族苗族自治县",
      "code": "520424" },

    {
      "name": "紫云苗族布依族自治县",
      "code": "520425" }] },



  {
    "name": "毕节市",
    "code": "520500",
    "sub": [
    {
      "name": "市辖区",
      "code": "520501" },

    {
      "name": "七星关区",
      "code": "520502" },

    {
      "name": "大方县",
      "code": "520521" },

    {
      "name": "黔西县",
      "code": "520522" },

    {
      "name": "金沙县",
      "code": "520523" },

    {
      "name": "织金县",
      "code": "520524" },

    {
      "name": "纳雍县",
      "code": "520525" },

    {
      "name": "威宁彝族回族苗族自治县",
      "code": "520526" },

    {
      "name": "赫章县",
      "code": "520527" }] },



  {
    "name": "铜仁市",
    "code": "520600",
    "sub": [
    {
      "name": "市辖区",
      "code": "520601" },

    {
      "name": "碧江区",
      "code": "520602" },

    {
      "name": "万山区",
      "code": "520603" },

    {
      "name": "江口县",
      "code": "520621" },

    {
      "name": "玉屏侗族自治县",
      "code": "520622" },

    {
      "name": "石阡县",
      "code": "520623" },

    {
      "name": "思南县",
      "code": "520624" },

    {
      "name": "印江土家族苗族自治县",
      "code": "520625" },

    {
      "name": "德江县",
      "code": "520626" },

    {
      "name": "沿河土家族自治县",
      "code": "520627" },

    {
      "name": "松桃苗族自治县",
      "code": "520628" }] },



  {
    "name": "黔西南布依族苗族自治州",
    "code": "522300",
    "sub": [
    {
      "name": "兴义市",
      "code": "522301" },

    {
      "name": "兴仁县",
      "code": "522322" },

    {
      "name": "普安县",
      "code": "522323" },

    {
      "name": "晴隆县",
      "code": "522324" },

    {
      "name": "贞丰县",
      "code": "522325" },

    {
      "name": "望谟县",
      "code": "522326" },

    {
      "name": "册亨县",
      "code": "522327" },

    {
      "name": "安龙县",
      "code": "522328" }] },



  {
    "name": "黔东南苗族侗族自治州",
    "code": "522600",
    "sub": [
    {
      "name": "凯里市",
      "code": "522601" },

    {
      "name": "黄平县",
      "code": "522622" },

    {
      "name": "施秉县",
      "code": "522623" },

    {
      "name": "三穗县",
      "code": "522624" },

    {
      "name": "镇远县",
      "code": "522625" },

    {
      "name": "岑巩县",
      "code": "522626" },

    {
      "name": "天柱县",
      "code": "522627" },

    {
      "name": "锦屏县",
      "code": "522628" },

    {
      "name": "剑河县",
      "code": "522629" },

    {
      "name": "台江县",
      "code": "522630" },

    {
      "name": "黎平县",
      "code": "522631" },

    {
      "name": "榕江县",
      "code": "522632" },

    {
      "name": "从江县",
      "code": "522633" },

    {
      "name": "雷山县",
      "code": "522634" },

    {
      "name": "麻江县",
      "code": "522635" },

    {
      "name": "丹寨县",
      "code": "522636" }] },



  {
    "name": "黔南布依族苗族自治州",
    "code": "522700",
    "sub": [
    {
      "name": "都匀市",
      "code": "522701" },

    {
      "name": "福泉市",
      "code": "522702" },

    {
      "name": "荔波县",
      "code": "522722" },

    {
      "name": "贵定县",
      "code": "522723" },

    {
      "name": "瓮安县",
      "code": "522725" },

    {
      "name": "独山县",
      "code": "522726" },

    {
      "name": "平塘县",
      "code": "522727" },

    {
      "name": "罗甸县",
      "code": "522728" },

    {
      "name": "长顺县",
      "code": "522729" },

    {
      "name": "龙里县",
      "code": "522730" },

    {
      "name": "惠水县",
      "code": "522731" },

    {
      "name": "三都水族自治县",
      "code": "522732" }] }] },





{
  "name": "云南省",
  "code": "530000",
  "sub": [
  {
    "name": "昆明市",
    "code": "530100",
    "sub": [
    {
      "name": "市辖区",
      "code": "530101" },

    {
      "name": "五华区",
      "code": "530102" },

    {
      "name": "盘龙区",
      "code": "530103" },

    {
      "name": "官渡区",
      "code": "530111" },

    {
      "name": "西山区",
      "code": "530112" },

    {
      "name": "东川区",
      "code": "530113" },

    {
      "name": "呈贡区",
      "code": "530114" },

    {
      "name": "晋宁县",
      "code": "530122" },

    {
      "name": "富民县",
      "code": "530124" },

    {
      "name": "宜良县",
      "code": "530125" },

    {
      "name": "石林彝族自治县",
      "code": "530126" },

    {
      "name": "嵩明县",
      "code": "530127" },

    {
      "name": "禄劝彝族苗族自治县",
      "code": "530128" },

    {
      "name": "寻甸回族彝族自治县",
      "code": "530129" },

    {
      "name": "安宁市",
      "code": "530181" }] },



  {
    "name": "曲靖市",
    "code": "530300",
    "sub": [
    {
      "name": "市辖区",
      "code": "530301" },

    {
      "name": "麒麟区",
      "code": "530302" },

    {
      "name": "马龙县",
      "code": "530321" },

    {
      "name": "陆良县",
      "code": "530322" },

    {
      "name": "师宗县",
      "code": "530323" },

    {
      "name": "罗平县",
      "code": "530324" },

    {
      "name": "富源县",
      "code": "530325" },

    {
      "name": "会泽县",
      "code": "530326" },

    {
      "name": "沾益县",
      "code": "530328" },

    {
      "name": "宣威市",
      "code": "530381" }] },



  {
    "name": "玉溪市",
    "code": "530400",
    "sub": [
    {
      "name": "市辖区",
      "code": "530401" },

    {
      "name": "红塔区",
      "code": "530402" },

    {
      "name": "江川县",
      "code": "530421" },

    {
      "name": "澄江县",
      "code": "530422" },

    {
      "name": "通海县",
      "code": "530423" },

    {
      "name": "华宁县",
      "code": "530424" },

    {
      "name": "易门县",
      "code": "530425" },

    {
      "name": "峨山彝族自治县",
      "code": "530426" },

    {
      "name": "新平彝族傣族自治县",
      "code": "530427" },

    {
      "name": "元江哈尼族彝族傣族自治县",
      "code": "530428" }] },



  {
    "name": "保山市",
    "code": "530500",
    "sub": [
    {
      "name": "市辖区",
      "code": "530501" },

    {
      "name": "隆阳区",
      "code": "530502" },

    {
      "name": "施甸县",
      "code": "530521" },

    {
      "name": "腾冲县",
      "code": "530522" },

    {
      "name": "龙陵县",
      "code": "530523" },

    {
      "name": "昌宁县",
      "code": "530524" }] },



  {
    "name": "昭通市",
    "code": "530600",
    "sub": [
    {
      "name": "市辖区",
      "code": "530601" },

    {
      "name": "昭阳区",
      "code": "530602" },

    {
      "name": "鲁甸县",
      "code": "530621" },

    {
      "name": "巧家县",
      "code": "530622" },

    {
      "name": "盐津县",
      "code": "530623" },

    {
      "name": "大关县",
      "code": "530624" },

    {
      "name": "永善县",
      "code": "530625" },

    {
      "name": "绥江县",
      "code": "530626" },

    {
      "name": "镇雄县",
      "code": "530627" },

    {
      "name": "彝良县",
      "code": "530628" },

    {
      "name": "威信县",
      "code": "530629" },

    {
      "name": "水富县",
      "code": "530630" }] },



  {
    "name": "丽江市",
    "code": "530700",
    "sub": [
    {
      "name": "市辖区",
      "code": "530701" },

    {
      "name": "古城区",
      "code": "530702" },

    {
      "name": "玉龙纳西族自治县",
      "code": "530721" },

    {
      "name": "永胜县",
      "code": "530722" },

    {
      "name": "华坪县",
      "code": "530723" },

    {
      "name": "宁蒗彝族自治县",
      "code": "530724" }] },



  {
    "name": "普洱市",
    "code": "530800",
    "sub": [
    {
      "name": "市辖区",
      "code": "530801" },

    {
      "name": "思茅区",
      "code": "530802" },

    {
      "name": "宁洱哈尼族彝族自治县",
      "code": "530821" },

    {
      "name": "墨江哈尼族自治县",
      "code": "530822" },

    {
      "name": "景东彝族自治县",
      "code": "530823" },

    {
      "name": "景谷傣族彝族自治县",
      "code": "530824" },

    {
      "name": "镇沅彝族哈尼族拉祜族自治县",
      "code": "530825" },

    {
      "name": "江城哈尼族彝族自治县",
      "code": "530826" },

    {
      "name": "孟连傣族拉祜族佤族自治县",
      "code": "530827" },

    {
      "name": "澜沧拉祜族自治县",
      "code": "530828" },

    {
      "name": "西盟佤族自治县",
      "code": "530829" }] },



  {
    "name": "临沧市",
    "code": "530900",
    "sub": [
    {
      "name": "市辖区",
      "code": "530901" },

    {
      "name": "临翔区",
      "code": "530902" },

    {
      "name": "凤庆县",
      "code": "530921" },

    {
      "name": "云县",
      "code": "530922" },

    {
      "name": "永德县",
      "code": "530923" },

    {
      "name": "镇康县",
      "code": "530924" },

    {
      "name": "双江拉祜族佤族布朗族傣族自治县",
      "code": "530925" },

    {
      "name": "耿马傣族佤族自治县",
      "code": "530926" },

    {
      "name": "沧源佤族自治县",
      "code": "530927" }] },



  {
    "name": "楚雄彝族自治州",
    "code": "532300",
    "sub": [
    {
      "name": "楚雄市",
      "code": "532301" },

    {
      "name": "双柏县",
      "code": "532322" },

    {
      "name": "牟定县",
      "code": "532323" },

    {
      "name": "南华县",
      "code": "532324" },

    {
      "name": "姚安县",
      "code": "532325" },

    {
      "name": "大姚县",
      "code": "532326" },

    {
      "name": "永仁县",
      "code": "532327" },

    {
      "name": "元谋县",
      "code": "532328" },

    {
      "name": "武定县",
      "code": "532329" },

    {
      "name": "禄丰县",
      "code": "532331" }] },



  {
    "name": "红河哈尼族彝族自治州",
    "code": "532500",
    "sub": [
    {
      "name": "个旧市",
      "code": "532501" },

    {
      "name": "开远市",
      "code": "532502" },

    {
      "name": "蒙自市",
      "code": "532503" },

    {
      "name": "弥勒市",
      "code": "532504" },

    {
      "name": "屏边苗族自治县",
      "code": "532523" },

    {
      "name": "建水县",
      "code": "532524" },

    {
      "name": "石屏县",
      "code": "532525" },

    {
      "name": "泸西县",
      "code": "532527" },

    {
      "name": "元阳县",
      "code": "532528" },

    {
      "name": "红河县",
      "code": "532529" },

    {
      "name": "金平苗族瑶族傣族自治县",
      "code": "532530" },

    {
      "name": "绿春县",
      "code": "532531" },

    {
      "name": "河口瑶族自治县",
      "code": "532532" }] },



  {
    "name": "文山壮族苗族自治州",
    "code": "532600",
    "sub": [
    {
      "name": "文山市",
      "code": "532601" },

    {
      "name": "砚山县",
      "code": "532622" },

    {
      "name": "西畴县",
      "code": "532623" },

    {
      "name": "麻栗坡县",
      "code": "532624" },

    {
      "name": "马关县",
      "code": "532625" },

    {
      "name": "丘北县",
      "code": "532626" },

    {
      "name": "广南县",
      "code": "532627" },

    {
      "name": "富宁县",
      "code": "532628" }] },



  {
    "name": "西双版纳傣族自治州",
    "code": "532800",
    "sub": [
    {
      "name": "景洪市",
      "code": "532801" },

    {
      "name": "勐海县",
      "code": "532822" },

    {
      "name": "勐腊县",
      "code": "532823" }] },



  {
    "name": "大理白族自治州",
    "code": "532900",
    "sub": [
    {
      "name": "大理市",
      "code": "532901" },

    {
      "name": "漾濞彝族自治县",
      "code": "532922" },

    {
      "name": "祥云县",
      "code": "532923" },

    {
      "name": "宾川县",
      "code": "532924" },

    {
      "name": "弥渡县",
      "code": "532925" },

    {
      "name": "南涧彝族自治县",
      "code": "532926" },

    {
      "name": "巍山彝族回族自治县",
      "code": "532927" },

    {
      "name": "永平县",
      "code": "532928" },

    {
      "name": "云龙县",
      "code": "532929" },

    {
      "name": "洱源县",
      "code": "532930" },

    {
      "name": "剑川县",
      "code": "532931" },

    {
      "name": "鹤庆县",
      "code": "532932" }] },



  {
    "name": "德宏傣族景颇族自治州",
    "code": "533100",
    "sub": [
    {
      "name": "瑞丽市",
      "code": "533102" },

    {
      "name": "芒市",
      "code": "533103" },

    {
      "name": "梁河县",
      "code": "533122" },

    {
      "name": "盈江县",
      "code": "533123" },

    {
      "name": "陇川县",
      "code": "533124" }] },



  {
    "name": "怒江傈僳族自治州",
    "code": "533300",
    "sub": [
    {
      "name": "泸水县",
      "code": "533321" },

    {
      "name": "福贡县",
      "code": "533323" },

    {
      "name": "贡山独龙族怒族自治县",
      "code": "533324" },

    {
      "name": "兰坪白族普米族自治县",
      "code": "533325" }] },



  {
    "name": "迪庆藏族自治州",
    "code": "533400",
    "sub": [
    {
      "name": "香格里拉市",
      "code": "533401" },

    {
      "name": "德钦县",
      "code": "533422" },

    {
      "name": "维西傈僳族自治县",
      "code": "533423" }] }] },





{
  "name": "西藏自治区",
  "code": "540000",
  "sub": [
  {
    "name": "拉萨市",
    "code": "540100",
    "sub": [
    {
      "name": "市辖区",
      "code": "540101" },

    {
      "name": "城关区",
      "code": "540102" },

    {
      "name": "林周县",
      "code": "540121" },

    {
      "name": "当雄县",
      "code": "540122" },

    {
      "name": "尼木县",
      "code": "540123" },

    {
      "name": "曲水县",
      "code": "540124" },

    {
      "name": "堆龙德庆县",
      "code": "540125" },

    {
      "name": "达孜县",
      "code": "540126" },

    {
      "name": "墨竹工卡县",
      "code": "540127" }] },



  {
    "name": "日喀则市",
    "code": "540200",
    "sub": [
    {
      "name": "市辖区",
      "code": "540201" },

    {
      "name": "桑珠孜区",
      "code": "540202" },

    {
      "name": "南木林县",
      "code": "540221" },

    {
      "name": "江孜县",
      "code": "540222" },

    {
      "name": "定日县",
      "code": "540223" },

    {
      "name": "萨迦县",
      "code": "540224" },

    {
      "name": "拉孜县",
      "code": "540225" },

    {
      "name": "昂仁县",
      "code": "540226" },

    {
      "name": "谢通门县",
      "code": "540227" },

    {
      "name": "白朗县",
      "code": "540228" },

    {
      "name": "仁布县",
      "code": "540229" },

    {
      "name": "康马县",
      "code": "540230" },

    {
      "name": "定结县",
      "code": "540231" },

    {
      "name": "仲巴县",
      "code": "540232" },

    {
      "name": "亚东县",
      "code": "540233" },

    {
      "name": "吉隆县",
      "code": "540234" },

    {
      "name": "聂拉木县",
      "code": "540235" },

    {
      "name": "萨嘎县",
      "code": "540236" },

    {
      "name": "岗巴县",
      "code": "540237" }] },



  {
    "name": "昌都市",
    "code": "540300",
    "sub": [
    {
      "name": "市辖区",
      "code": "540301" },

    {
      "name": "卡若区",
      "code": "540302" },

    {
      "name": "江达县",
      "code": "540321" },

    {
      "name": "贡觉县",
      "code": "540322" },

    {
      "name": "类乌齐县",
      "code": "540323" },

    {
      "name": "丁青县",
      "code": "540324" },

    {
      "name": "察雅县",
      "code": "540325" },

    {
      "name": "八宿县",
      "code": "540326" },

    {
      "name": "左贡县",
      "code": "540327" },

    {
      "name": "芒康县",
      "code": "540328" },

    {
      "name": "洛隆县",
      "code": "540329" },

    {
      "name": "边坝县",
      "code": "540330" }] },



  {
    "name": "山南地区",
    "code": "542200",
    "sub": [
    {
      "name": "乃东县",
      "code": "542221" },

    {
      "name": "扎囊县",
      "code": "542222" },

    {
      "name": "贡嘎县",
      "code": "542223" },

    {
      "name": "桑日县",
      "code": "542224" },

    {
      "name": "琼结县",
      "code": "542225" },

    {
      "name": "曲松县",
      "code": "542226" },

    {
      "name": "措美县",
      "code": "542227" },

    {
      "name": "洛扎县",
      "code": "542228" },

    {
      "name": "加查县",
      "code": "542229" },

    {
      "name": "隆子县",
      "code": "542231" },

    {
      "name": "错那县",
      "code": "542232" },

    {
      "name": "浪卡子县",
      "code": "542233" }] },



  {
    "name": "那曲地区",
    "code": "542400",
    "sub": [
    {
      "name": "那曲县",
      "code": "542421" },

    {
      "name": "嘉黎县",
      "code": "542422" },

    {
      "name": "比如县",
      "code": "542423" },

    {
      "name": "聂荣县",
      "code": "542424" },

    {
      "name": "安多县",
      "code": "542425" },

    {
      "name": "申扎县",
      "code": "542426" },

    {
      "name": "索县",
      "code": "542427" },

    {
      "name": "班戈县",
      "code": "542428" },

    {
      "name": "巴青县",
      "code": "542429" },

    {
      "name": "尼玛县",
      "code": "542430" },

    {
      "name": "双湖县",
      "code": "542431" }] },



  {
    "name": "阿里地区",
    "code": "542500",
    "sub": [
    {
      "name": "普兰县",
      "code": "542521" },

    {
      "name": "札达县",
      "code": "542522" },

    {
      "name": "噶尔县",
      "code": "542523" },

    {
      "name": "日土县",
      "code": "542524" },

    {
      "name": "革吉县",
      "code": "542525" },

    {
      "name": "改则县",
      "code": "542526" },

    {
      "name": "措勤县",
      "code": "542527" }] },



  {
    "name": "林芝地区",
    "code": "542600",
    "sub": [
    {
      "name": "林芝县",
      "code": "542621" },

    {
      "name": "工布江达县",
      "code": "542622" },

    {
      "name": "米林县",
      "code": "542623" },

    {
      "name": "墨脱县",
      "code": "542624" },

    {
      "name": "波密县",
      "code": "542625" },

    {
      "name": "察隅县",
      "code": "542626" },

    {
      "name": "朗县",
      "code": "542627" }] }] },





{
  "name": "陕西省",
  "code": "610000",
  "sub": [
  {
    "name": "西安市",
    "code": "610100",
    "sub": [
    {
      "name": "市辖区",
      "code": "610101" },

    {
      "name": "新城区",
      "code": "610102" },

    {
      "name": "碑林区",
      "code": "610103" },

    {
      "name": "莲湖区",
      "code": "610104" },

    {
      "name": "灞桥区",
      "code": "610111" },

    {
      "name": "未央区",
      "code": "610112" },

    {
      "name": "雁塔区",
      "code": "610113" },

    {
      "name": "阎良区",
      "code": "610114" },

    {
      "name": "临潼区",
      "code": "610115" },

    {
      "name": "长安区",
      "code": "610116" },

    {
      "name": "高陵区",
      "code": "610117" },

    {
      "name": "蓝田县",
      "code": "610122" },

    {
      "name": "周至县",
      "code": "610124" },

    {
      "name": "户县",
      "code": "610125" }] },



  {
    "name": "铜川市",
    "code": "610200",
    "sub": [
    {
      "name": "市辖区",
      "code": "610201" },

    {
      "name": "王益区",
      "code": "610202" },

    {
      "name": "印台区",
      "code": "610203" },

    {
      "name": "耀州区",
      "code": "610204" },

    {
      "name": "宜君县",
      "code": "610222" }] },



  {
    "name": "宝鸡市",
    "code": "610300",
    "sub": [
    {
      "name": "市辖区",
      "code": "610301" },

    {
      "name": "渭滨区",
      "code": "610302" },

    {
      "name": "金台区",
      "code": "610303" },

    {
      "name": "陈仓区",
      "code": "610304" },

    {
      "name": "凤翔县",
      "code": "610322" },

    {
      "name": "岐山县",
      "code": "610323" },

    {
      "name": "扶风县",
      "code": "610324" },

    {
      "name": "眉县",
      "code": "610326" },

    {
      "name": "陇县",
      "code": "610327" },

    {
      "name": "千阳县",
      "code": "610328" },

    {
      "name": "麟游县",
      "code": "610329" },

    {
      "name": "凤县",
      "code": "610330" },

    {
      "name": "太白县",
      "code": "610331" }] },



  {
    "name": "咸阳市",
    "code": "610400",
    "sub": [
    {
      "name": "市辖区",
      "code": "610401" },

    {
      "name": "秦都区",
      "code": "610402" },

    {
      "name": "杨陵区",
      "code": "610403" },

    {
      "name": "渭城区",
      "code": "610404" },

    {
      "name": "三原县",
      "code": "610422" },

    {
      "name": "泾阳县",
      "code": "610423" },

    {
      "name": "乾县",
      "code": "610424" },

    {
      "name": "礼泉县",
      "code": "610425" },

    {
      "name": "永寿县",
      "code": "610426" },

    {
      "name": "彬县",
      "code": "610427" },

    {
      "name": "长武县",
      "code": "610428" },

    {
      "name": "旬邑县",
      "code": "610429" },

    {
      "name": "淳化县",
      "code": "610430" },

    {
      "name": "武功县",
      "code": "610431" },

    {
      "name": "兴平市",
      "code": "610481" }] },



  {
    "name": "渭南市",
    "code": "610500",
    "sub": [
    {
      "name": "市辖区",
      "code": "610501" },

    {
      "name": "临渭区",
      "code": "610502" },

    {
      "name": "华县",
      "code": "610521" },

    {
      "name": "潼关县",
      "code": "610522" },

    {
      "name": "大荔县",
      "code": "610523" },

    {
      "name": "合阳县",
      "code": "610524" },

    {
      "name": "澄城县",
      "code": "610525" },

    {
      "name": "蒲城县",
      "code": "610526" },

    {
      "name": "白水县",
      "code": "610527" },

    {
      "name": "富平县",
      "code": "610528" },

    {
      "name": "韩城市",
      "code": "610581" },

    {
      "name": "华阴市",
      "code": "610582" }] },



  {
    "name": "延安市",
    "code": "610600",
    "sub": [
    {
      "name": "市辖区",
      "code": "610601" },

    {
      "name": "宝塔区",
      "code": "610602" },

    {
      "name": "延长县",
      "code": "610621" },

    {
      "name": "延川县",
      "code": "610622" },

    {
      "name": "子长县",
      "code": "610623" },

    {
      "name": "安塞县",
      "code": "610624" },

    {
      "name": "志丹县",
      "code": "610625" },

    {
      "name": "吴起县",
      "code": "610626" },

    {
      "name": "甘泉县",
      "code": "610627" },

    {
      "name": "富县",
      "code": "610628" },

    {
      "name": "洛川县",
      "code": "610629" },

    {
      "name": "宜川县",
      "code": "610630" },

    {
      "name": "黄龙县",
      "code": "610631" },

    {
      "name": "黄陵县",
      "code": "610632" }] },



  {
    "name": "汉中市",
    "code": "610700",
    "sub": [
    {
      "name": "市辖区",
      "code": "610701" },

    {
      "name": "汉台区",
      "code": "610702" },

    {
      "name": "南郑县",
      "code": "610721" },

    {
      "name": "城固县",
      "code": "610722" },

    {
      "name": "洋县",
      "code": "610723" },

    {
      "name": "西乡县",
      "code": "610724" },

    {
      "name": "勉县",
      "code": "610725" },

    {
      "name": "宁强县",
      "code": "610726" },

    {
      "name": "略阳县",
      "code": "610727" },

    {
      "name": "镇巴县",
      "code": "610728" },

    {
      "name": "留坝县",
      "code": "610729" },

    {
      "name": "佛坪县",
      "code": "610730" }] },



  {
    "name": "榆林市",
    "code": "610800",
    "sub": [
    {
      "name": "市辖区",
      "code": "610801" },

    {
      "name": "榆阳区",
      "code": "610802" },

    {
      "name": "神木县",
      "code": "610821" },

    {
      "name": "府谷县",
      "code": "610822" },

    {
      "name": "横山县",
      "code": "610823" },

    {
      "name": "靖边县",
      "code": "610824" },

    {
      "name": "定边县",
      "code": "610825" },

    {
      "name": "绥德县",
      "code": "610826" },

    {
      "name": "米脂县",
      "code": "610827" },

    {
      "name": "佳县",
      "code": "610828" },

    {
      "name": "吴堡县",
      "code": "610829" },

    {
      "name": "清涧县",
      "code": "610830" },

    {
      "name": "子洲县",
      "code": "610831" }] },



  {
    "name": "安康市",
    "code": "610900",
    "sub": [
    {
      "name": "市辖区",
      "code": "610901" },

    {
      "name": "汉阴县",
      "code": "610921" },

    {
      "name": "石泉县",
      "code": "610922" },

    {
      "name": "宁陕县",
      "code": "610923" },

    {
      "name": "紫阳县",
      "code": "610924" },

    {
      "name": "岚皋县",
      "code": "610925" },

    {
      "name": "平利县",
      "code": "610926" },

    {
      "name": "镇坪县",
      "code": "610927" },

    {
      "name": "旬阳县",
      "code": "610928" },

    {
      "name": "白河县",
      "code": "610929" }] },



  {
    "name": "商洛市",
    "code": "611000",
    "sub": [
    {
      "name": "市辖区",
      "code": "611001" },

    {
      "name": "商州区",
      "code": "611002" },

    {
      "name": "洛南县",
      "code": "611021" },

    {
      "name": "丹凤县",
      "code": "611022" },

    {
      "name": "商南县",
      "code": "611023" },

    {
      "name": "山阳县",
      "code": "611024" },

    {
      "name": "镇安县",
      "code": "611025" },

    {
      "name": "柞水县",
      "code": "611026" }] }] },





{
  "name": "甘肃省",
  "code": "620000",
  "sub": [
  {
    "name": "兰州市",
    "code": "620100",
    "sub": [
    {
      "name": "市辖区",
      "code": "620101" },

    {
      "name": "城关区",
      "code": "620102" },

    {
      "name": "七里河区",
      "code": "620103" },

    {
      "name": "西固区",
      "code": "620104" },

    {
      "name": "安宁区",
      "code": "620105" },

    {
      "name": "红古区",
      "code": "620111" },

    {
      "name": "永登县",
      "code": "620121" },

    {
      "name": "皋兰县",
      "code": "620122" },

    {
      "name": "榆中县",
      "code": "620123" }] },



  {
    "name": "嘉峪关市",
    "code": "620200",
    "sub": [
    {
      "name": "市辖区",
      "code": "620201" }] },



  {
    "name": "金昌市",
    "code": "620300",
    "sub": [
    {
      "name": "市辖区",
      "code": "620301" },

    {
      "name": "金川区",
      "code": "620302" },

    {
      "name": "永昌县",
      "code": "620321" }] },



  {
    "name": "白银市",
    "code": "620400",
    "sub": [
    {
      "name": "市辖区",
      "code": "620401" },

    {
      "name": "白银区",
      "code": "620402" },

    {
      "name": "平川区",
      "code": "620403" },

    {
      "name": "靖远县",
      "code": "620421" },

    {
      "name": "会宁县",
      "code": "620422" },

    {
      "name": "景泰县",
      "code": "620423" }] },



  {
    "name": "天水市",
    "code": "620500",
    "sub": [
    {
      "name": "市辖区",
      "code": "620501" },

    {
      "name": "秦州区",
      "code": "620502" },

    {
      "name": "麦积区",
      "code": "620503" },

    {
      "name": "清水县",
      "code": "620521" },

    {
      "name": "秦安县",
      "code": "620522" },

    {
      "name": "甘谷县",
      "code": "620523" },

    {
      "name": "武山县",
      "code": "620524" },

    {
      "name": "张家川回族自治县",
      "code": "620525" }] },



  {
    "name": "武威市",
    "code": "620600",
    "sub": [
    {
      "name": "市辖区",
      "code": "620601" },

    {
      "name": "凉州区",
      "code": "620602" },

    {
      "name": "民勤县",
      "code": "620621" },

    {
      "name": "古浪县",
      "code": "620622" },

    {
      "name": "天祝藏族自治县",
      "code": "620623" }] },



  {
    "name": "张掖市",
    "code": "620700",
    "sub": [
    {
      "name": "市辖区",
      "code": "620701" },

    {
      "name": "甘州区",
      "code": "620702" },

    {
      "name": "肃南裕固族自治县",
      "code": "620721" },

    {
      "name": "民乐县",
      "code": "620722" },

    {
      "name": "临泽县",
      "code": "620723" },

    {
      "name": "高台县",
      "code": "620724" },

    {
      "name": "山丹县",
      "code": "620725" }] },



  {
    "name": "平凉市",
    "code": "620800",
    "sub": [
    {
      "name": "市辖区",
      "code": "620801" },

    {
      "name": "崆峒区",
      "code": "620802" },

    {
      "name": "泾川县",
      "code": "620821" },

    {
      "name": "灵台县",
      "code": "620822" },

    {
      "name": "崇信县",
      "code": "620823" },

    {
      "name": "华亭县",
      "code": "620824" },

    {
      "name": "庄浪县",
      "code": "620825" },

    {
      "name": "静宁县",
      "code": "620826" }] },



  {
    "name": "酒泉市",
    "code": "620900",
    "sub": [
    {
      "name": "市辖区",
      "code": "620901" },

    {
      "name": "肃州区",
      "code": "620902" },

    {
      "name": "金塔县",
      "code": "620921" },

    {
      "name": "瓜州县",
      "code": "620922" },

    {
      "name": "肃北蒙古族自治县",
      "code": "620923" },

    {
      "name": "阿克塞哈萨克族自治县",
      "code": "620924" },

    {
      "name": "玉门市",
      "code": "620981" },

    {
      "name": "敦煌市",
      "code": "620982" }] },



  {
    "name": "庆阳市",
    "code": "621000",
    "sub": [
    {
      "name": "市辖区",
      "code": "621001" },

    {
      "name": "西峰区",
      "code": "621002" },

    {
      "name": "庆城县",
      "code": "621021" },

    {
      "name": "环县",
      "code": "621022" },

    {
      "name": "华池县",
      "code": "621023" },

    {
      "name": "合水县",
      "code": "621024" },

    {
      "name": "正宁县",
      "code": "621025" },

    {
      "name": "宁县",
      "code": "621026" },

    {
      "name": "镇原县",
      "code": "621027" }] },



  {
    "name": "定西市",
    "code": "621100",
    "sub": [
    {
      "name": "市辖区",
      "code": "621101" },

    {
      "name": "安定区",
      "code": "621102" },

    {
      "name": "通渭县",
      "code": "621121" },

    {
      "name": "陇西县",
      "code": "621122" },

    {
      "name": "渭源县",
      "code": "621123" },

    {
      "name": "临洮县",
      "code": "621124" },

    {
      "name": "漳县",
      "code": "621125" },

    {
      "name": "岷县",
      "code": "621126" }] },



  {
    "name": "陇南市",
    "code": "621200",
    "sub": [
    {
      "name": "市辖区",
      "code": "621201" },

    {
      "name": "武都区",
      "code": "621202" },

    {
      "name": "成县",
      "code": "621221" },

    {
      "name": "文县",
      "code": "621222" },

    {
      "name": "宕昌县",
      "code": "621223" },

    {
      "name": "康县",
      "code": "621224" },

    {
      "name": "西和县",
      "code": "621225" },

    {
      "name": "礼县",
      "code": "621226" },

    {
      "name": "徽县",
      "code": "621227" },

    {
      "name": "两当县",
      "code": "621228" }] },



  {
    "name": "临夏回族自治州",
    "code": "622900",
    "sub": [
    {
      "name": "临夏市",
      "code": "622901" },

    {
      "name": "临夏县",
      "code": "622921" },

    {
      "name": "康乐县",
      "code": "622922" },

    {
      "name": "永靖县",
      "code": "622923" },

    {
      "name": "广河县",
      "code": "622924" },

    {
      "name": "和政县",
      "code": "622925" },

    {
      "name": "东乡族自治县",
      "code": "622926" },

    {
      "name": "积石山保安族东乡族撒拉族自治县",
      "code": "622927" }] },



  {
    "name": "甘南藏族自治州",
    "code": "623000",
    "sub": [
    {
      "name": "合作市",
      "code": "623001" },

    {
      "name": "临潭县",
      "code": "623021" },

    {
      "name": "卓尼县",
      "code": "623022" },

    {
      "name": "舟曲县",
      "code": "623023" },

    {
      "name": "迭部县",
      "code": "623024" },

    {
      "name": "玛曲县",
      "code": "623025" },

    {
      "name": "碌曲县",
      "code": "623026" },

    {
      "name": "夏河县",
      "code": "623027" }] }] },





{
  "name": "青海省",
  "code": "630000",
  "sub": [
  {
    "name": "西宁市",
    "code": "630100",
    "sub": [
    {
      "name": "市辖区",
      "code": "630101" },

    {
      "name": "城东区",
      "code": "630102" },

    {
      "name": "城中区",
      "code": "630103" },

    {
      "name": "城西区",
      "code": "630104" },

    {
      "name": "城北区",
      "code": "630105" },

    {
      "name": "大通回族土族自治县",
      "code": "630121" },

    {
      "name": "湟中县",
      "code": "630122" },

    {
      "name": "湟源县",
      "code": "630123" }] },



  {
    "name": "海东市",
    "code": "630200",
    "sub": [
    {
      "name": "市辖区",
      "code": "630201" },

    {
      "name": "乐都区",
      "code": "630202" },

    {
      "name": "平安县",
      "code": "630221" },

    {
      "name": "民和回族土族自治县",
      "code": "630222" },

    {
      "name": "互助土族自治县",
      "code": "630223" },

    {
      "name": "化隆回族自治县",
      "code": "630224" },

    {
      "name": "循化撒拉族自治县",
      "code": "630225" }] },



  {
    "name": "海北藏族自治州",
    "code": "632200",
    "sub": [
    {
      "name": "门源回族自治县",
      "code": "632221" },

    {
      "name": "祁连县",
      "code": "632222" },

    {
      "name": "海晏县",
      "code": "632223" },

    {
      "name": "刚察县",
      "code": "632224" }] },



  {
    "name": "黄南藏族自治州",
    "code": "632300",
    "sub": [
    {
      "name": "同仁县",
      "code": "632321" },

    {
      "name": "尖扎县",
      "code": "632322" },

    {
      "name": "泽库县",
      "code": "632323" },

    {
      "name": "河南蒙古族自治县",
      "code": "632324" }] },



  {
    "name": "海南藏族自治州",
    "code": "632500",
    "sub": [
    {
      "name": "共和县",
      "code": "632521" },

    {
      "name": "同德县",
      "code": "632522" },

    {
      "name": "贵德县",
      "code": "632523" },

    {
      "name": "兴海县",
      "code": "632524" },

    {
      "name": "贵南县",
      "code": "632525" }] },



  {
    "name": "果洛藏族自治州",
    "code": "632600",
    "sub": [
    {
      "name": "玛沁县",
      "code": "632621" },

    {
      "name": "班玛县",
      "code": "632622" },

    {
      "name": "甘德县",
      "code": "632623" },

    {
      "name": "达日县",
      "code": "632624" },

    {
      "name": "久治县",
      "code": "632625" },

    {
      "name": "玛多县",
      "code": "632626" }] },



  {
    "name": "玉树藏族自治州",
    "code": "632700",
    "sub": [
    {
      "name": "玉树市",
      "code": "632701" },

    {
      "name": "杂多县",
      "code": "632722" },

    {
      "name": "称多县",
      "code": "632723" },

    {
      "name": "治多县",
      "code": "632724" },

    {
      "name": "囊谦县",
      "code": "632725" },

    {
      "name": "曲麻莱县",
      "code": "632726" }] },



  {
    "name": "海西蒙古族藏族自治州",
    "code": "632800",
    "sub": [
    {
      "name": "格尔木市",
      "code": "632801" },

    {
      "name": "德令哈市",
      "code": "632802" },

    {
      "name": "乌兰县",
      "code": "632821" },

    {
      "name": "都兰县",
      "code": "632822" },

    {
      "name": "天峻县",
      "code": "632823" }] }] },





{
  "name": "宁夏回族自治区",
  "code": "640000",
  "sub": [
  {
    "name": "银川市",
    "code": "640100",
    "sub": [
    {
      "name": "市辖区",
      "code": "640101" },

    {
      "name": "兴庆区",
      "code": "640104" },

    {
      "name": "西夏区",
      "code": "640105" },

    {
      "name": "金凤区",
      "code": "640106" },

    {
      "name": "永宁县",
      "code": "640121" },

    {
      "name": "贺兰县",
      "code": "640122" },

    {
      "name": "灵武市",
      "code": "640181" }] },



  {
    "name": "石嘴山市",
    "code": "640200",
    "sub": [
    {
      "name": "市辖区",
      "code": "640201" },

    {
      "name": "大武口区",
      "code": "640202" },

    {
      "name": "惠农区",
      "code": "640205" },

    {
      "name": "平罗县",
      "code": "640221" }] },



  {
    "name": "吴忠市",
    "code": "640300",
    "sub": [
    {
      "name": "市辖区",
      "code": "640301" },

    {
      "name": "利通区",
      "code": "640302" },

    {
      "name": "红寺堡区",
      "code": "640303" },

    {
      "name": "盐池县",
      "code": "640323" },

    {
      "name": "同心县",
      "code": "640324" },

    {
      "name": "青铜峡市",
      "code": "640381" }] },



  {
    "name": "固原市",
    "code": "640400",
    "sub": [
    {
      "name": "市辖区",
      "code": "640401" },

    {
      "name": "原州区",
      "code": "640402" },

    {
      "name": "西吉县",
      "code": "640422" },

    {
      "name": "隆德县",
      "code": "640423" },

    {
      "name": "泾源县",
      "code": "640424" },

    {
      "name": "彭阳县",
      "code": "640425" }] },



  {
    "name": "中卫市",
    "code": "640500",
    "sub": [
    {
      "name": "市辖区",
      "code": "640501" },

    {
      "name": "沙坡头区",
      "code": "640502" },

    {
      "name": "中宁县",
      "code": "640521" },

    {
      "name": "海原县",
      "code": "640522" }] }] },





{
  "name": "新疆维吾尔自治区",
  "code": "650000",
  "sub": [
  {
    "name": "乌鲁木齐市",
    "code": "650100",
    "sub": [
    {
      "name": "市辖区",
      "code": "650101" },

    {
      "name": "天山区",
      "code": "650102" },

    {
      "name": "沙依巴克区",
      "code": "650103" },

    {
      "name": "新市区",
      "code": "650104" },

    {
      "name": "水磨沟区",
      "code": "650105" },

    {
      "name": "头屯河区",
      "code": "650106" },

    {
      "name": "达坂城区",
      "code": "650107" },

    {
      "name": "米东区",
      "code": "650109" },

    {
      "name": "乌鲁木齐县",
      "code": "650121" }] },



  {
    "name": "克拉玛依市",
    "code": "650200",
    "sub": [
    {
      "name": "市辖区",
      "code": "650201" },

    {
      "name": "独山子区",
      "code": "650202" },

    {
      "name": "克拉玛依区",
      "code": "650203" },

    {
      "name": "白碱滩区",
      "code": "650204" },

    {
      "name": "乌尔禾区",
      "code": "650205" }] },



  {
    "name": "吐鲁番地区",
    "code": "652100",
    "sub": [
    {
      "name": "吐鲁番市",
      "code": "652101" },

    {
      "name": "鄯善县",
      "code": "652122" },

    {
      "name": "托克逊县",
      "code": "652123" }] },



  {
    "name": "哈密地区",
    "code": "652200",
    "sub": [
    {
      "name": "哈密市",
      "code": "652201" },

    {
      "name": "巴里坤哈萨克自治县",
      "code": "652222" },

    {
      "name": "伊吾县",
      "code": "652223" }] },



  {
    "name": "昌吉回族自治州",
    "code": "652300",
    "sub": [
    {
      "name": "昌吉市",
      "code": "652301" },

    {
      "name": "阜康市",
      "code": "652302" },

    {
      "name": "呼图壁县",
      "code": "652323" },

    {
      "name": "玛纳斯县",
      "code": "652324" },

    {
      "name": "奇台县",
      "code": "652325" },

    {
      "name": "吉木萨尔县",
      "code": "652327" },

    {
      "name": "木垒哈萨克自治县",
      "code": "652328" }] },



  {
    "name": "博尔塔拉蒙古自治州",
    "code": "652700",
    "sub": [
    {
      "name": "博乐市",
      "code": "652701" },

    {
      "name": "阿拉山口市",
      "code": "652702" },

    {
      "name": "精河县",
      "code": "652722" },

    {
      "name": "温泉县",
      "code": "652723" }] },



  {
    "name": "巴音郭楞蒙古自治州",
    "code": "652800",
    "sub": [
    {
      "name": "库尔勒市",
      "code": "652801" },

    {
      "name": "轮台县",
      "code": "652822" },

    {
      "name": "尉犁县",
      "code": "652823" },

    {
      "name": "若羌县",
      "code": "652824" },

    {
      "name": "且末县",
      "code": "652825" },

    {
      "name": "焉耆回族自治县",
      "code": "652826" },

    {
      "name": "和静县",
      "code": "652827" },

    {
      "name": "和硕县",
      "code": "652828" },

    {
      "name": "博湖县",
      "code": "652829" }] },



  {
    "name": "阿克苏地区",
    "code": "652900",
    "sub": [
    {
      "name": "阿克苏市",
      "code": "652901" },

    {
      "name": "温宿县",
      "code": "652922" },

    {
      "name": "库车县",
      "code": "652923" },

    {
      "name": "沙雅县",
      "code": "652924" },

    {
      "name": "新和县",
      "code": "652925" },

    {
      "name": "拜城县",
      "code": "652926" },

    {
      "name": "乌什县",
      "code": "652927" },

    {
      "name": "阿瓦提县",
      "code": "652928" },

    {
      "name": "柯坪县",
      "code": "652929" }] },



  {
    "name": "克孜勒苏柯尔克孜自治州",
    "code": "653000",
    "sub": [
    {
      "name": "阿图什市",
      "code": "653001" },

    {
      "name": "阿克陶县",
      "code": "653022" },

    {
      "name": "阿合奇县",
      "code": "653023" },

    {
      "name": "乌恰县",
      "code": "653024" }] },



  {
    "name": "喀什地区",
    "code": "653100",
    "sub": [
    {
      "name": "喀什市",
      "code": "653101" },

    {
      "name": "疏附县",
      "code": "653121" },

    {
      "name": "疏勒县",
      "code": "653122" },

    {
      "name": "英吉沙县",
      "code": "653123" },

    {
      "name": "泽普县",
      "code": "653124" },

    {
      "name": "莎车县",
      "code": "653125" },

    {
      "name": "叶城县",
      "code": "653126" },

    {
      "name": "麦盖提县",
      "code": "653127" },

    {
      "name": "岳普湖县",
      "code": "653128" },

    {
      "name": "伽师县",
      "code": "653129" },

    {
      "name": "巴楚县",
      "code": "653130" },

    {
      "name": "塔什库尔干塔吉克自治县",
      "code": "653131" }] },



  {
    "name": "和田地区",
    "code": "653200",
    "sub": [
    {
      "name": "和田市",
      "code": "653201" },

    {
      "name": "和田县",
      "code": "653221" },

    {
      "name": "墨玉县",
      "code": "653222" },

    {
      "name": "皮山县",
      "code": "653223" },

    {
      "name": "洛浦县",
      "code": "653224" },

    {
      "name": "策勒县",
      "code": "653225" },

    {
      "name": "于田县",
      "code": "653226" },

    {
      "name": "民丰县",
      "code": "653227" }] },



  {
    "name": "伊犁哈萨克自治州",
    "code": "654000",
    "sub": [
    {
      "name": "伊宁市",
      "code": "654002" },

    {
      "name": "奎屯市",
      "code": "654003" },

    {
      "name": "霍尔果斯市",
      "code": "654004" },

    {
      "name": "伊宁县",
      "code": "654021" },

    {
      "name": "察布查尔锡伯自治县",
      "code": "654022" },

    {
      "name": "霍城县",
      "code": "654023" },

    {
      "name": "巩留县",
      "code": "654024" },

    {
      "name": "新源县",
      "code": "654025" },

    {
      "name": "昭苏县",
      "code": "654026" },

    {
      "name": "特克斯县",
      "code": "654027" },

    {
      "name": "尼勒克县",
      "code": "654028" },

    {
      "name": "塔城地区",
      "code": "654200" },

    {
      "name": "塔城市",
      "code": "654201" },

    {
      "name": "乌苏市",
      "code": "654202" },

    {
      "name": "额敏县",
      "code": "654221" },

    {
      "name": "沙湾县",
      "code": "654223" },

    {
      "name": "托里县",
      "code": "654224" },

    {
      "name": "裕民县",
      "code": "654225" },

    {
      "name": "和布克赛尔蒙古自治县",
      "code": "654226" },

    {
      "name": "阿勒泰地区",
      "code": "654300" },

    {
      "name": "阿勒泰市",
      "code": "654301" },

    {
      "name": "布尔津县",
      "code": "654321" },

    {
      "name": "富蕴县",
      "code": "654322" },

    {
      "name": "福海县",
      "code": "654323" },

    {
      "name": "哈巴河县",
      "code": "654324" },

    {
      "name": "青河县",
      "code": "654325" },

    {
      "name": "吉木乃县",
      "code": "654326" }] },



  {
    "name": "自治区直辖县级行政区划",
    "code": "659000",
    "sub": [
    {
      "name": "石河子市",
      "code": "659001" },

    {
      "name": "阿拉尔市",
      "code": "659002" },

    {
      "name": "图木舒克市",
      "code": "659003" },

    {
      "name": "五家渠市",
      "code": "659004" },

    {
      "name": "北屯市",
      "code": "659005" },

    {
      "name": "铁门关市",
      "code": "659006" },

    {
      "name": "双河市",
      "code": "659007" }] }] },





{
  "name": "台湾省",
  "code": "710000",
  "sub": [
  {
    "name": "台北市",
    "code": "710100",
    "sub": [
    {
      "name": "松山区",
      "code": "710101" },

    {
      "name": "信义区",
      "code": "710102" },

    {
      "name": "大安区",
      "code": "710103" },

    {
      "name": "中山区",
      "code": "710104" },

    {
      "name": "中正区",
      "code": "710105" },

    {
      "name": "大同区",
      "code": "710106" },

    {
      "name": "万华区",
      "code": "710107" },

    {
      "name": "文山区",
      "code": "710108" },

    {
      "name": "南港区",
      "code": "710109" },

    {
      "name": "内湖区",
      "code": "710110" },

    {
      "name": "士林区",
      "code": "710111" },

    {
      "name": "北投区",
      "code": "710112" }] },



  {
    "name": "高雄市",
    "code": "710200",
    "sub": [
    {
      "name": "盐埕区",
      "code": "710201" },

    {
      "name": "鼓山区",
      "code": "710202" },

    {
      "name": "左营区",
      "code": "710203" },

    {
      "name": "楠梓区",
      "code": "710204" },

    {
      "name": "三民区",
      "code": "710205" },

    {
      "name": "新兴区",
      "code": "710206" },

    {
      "name": "前金区",
      "code": "710207" },

    {
      "name": "苓雅区",
      "code": "710208" },

    {
      "name": "前镇区",
      "code": "710209" },

    {
      "name": "旗津区",
      "code": "710210" },

    {
      "name": "小港区",
      "code": "710211" },

    {
      "name": "凤山区",
      "code": "710212" },

    {
      "name": "林园区",
      "code": "710213" },

    {
      "name": "大寮区",
      "code": "710214" },

    {
      "name": "大树区",
      "code": "710215" },

    {
      "name": "大社区",
      "code": "710216" },

    {
      "name": "仁武区",
      "code": "710217" },

    {
      "name": "鸟松区",
      "code": "710218" },

    {
      "name": "冈山区",
      "code": "710219" },

    {
      "name": "桥头区",
      "code": "710220" },

    {
      "name": "燕巢区",
      "code": "710221" },

    {
      "name": "田寮区",
      "code": "710222" },

    {
      "name": "阿莲区",
      "code": "710223" },

    {
      "name": "路竹区",
      "code": "710224" },

    {
      "name": "湖内区",
      "code": "710225" },

    {
      "name": "茄萣区",
      "code": "710226" },

    {
      "name": "永安区",
      "code": "710227" },

    {
      "name": "弥陀区",
      "code": "710228" },

    {
      "name": "梓官区",
      "code": "710229" },

    {
      "name": "旗山区",
      "code": "710230" },

    {
      "name": "美浓区",
      "code": "710231" },

    {
      "name": "六龟区",
      "code": "710232" },

    {
      "name": "甲仙区",
      "code": "710233" },

    {
      "name": "杉林区",
      "code": "710234" },

    {
      "name": "内门区",
      "code": "710235" },

    {
      "name": "茂林区",
      "code": "710236" },

    {
      "name": "桃源区",
      "code": "710237" },

    {
      "name": "那玛夏区",
      "code": "710238" }] },



  {
    "name": "基隆市",
    "code": "710300",
    "sub": [
    {
      "name": "中正区",
      "code": "710301" },

    {
      "name": "七堵区",
      "code": "710302" },

    {
      "name": "暖暖区",
      "code": "710303" },

    {
      "name": "仁爱区",
      "code": "710304" },

    {
      "name": "中山区",
      "code": "710305" },

    {
      "name": "安乐区",
      "code": "710306" },

    {
      "name": "信义区",
      "code": "710307" }] },



  {
    "name": "台中市",
    "code": "710400",
    "sub": [
    {
      "name": "中区",
      "code": "710401" },

    {
      "name": "东区",
      "code": "710402" },

    {
      "name": "南区",
      "code": "710403" },

    {
      "name": "西区",
      "code": "710404" },

    {
      "name": "北区",
      "code": "710405" },

    {
      "name": "西屯区",
      "code": "710406" },

    {
      "name": "南屯区",
      "code": "710407" },

    {
      "name": "北屯区",
      "code": "710408" },

    {
      "name": "丰原区",
      "code": "710409" },

    {
      "name": "东势区",
      "code": "710410" },

    {
      "name": "大甲区",
      "code": "710411" },

    {
      "name": "清水区",
      "code": "710412" },

    {
      "name": "沙鹿区",
      "code": "710413" },

    {
      "name": "梧栖区",
      "code": "710414" },

    {
      "name": "后里区",
      "code": "710415" },

    {
      "name": "神冈区",
      "code": "710416" },

    {
      "name": "潭子区",
      "code": "710417" },

    {
      "name": "大雅区",
      "code": "710418" },

    {
      "name": "新社区",
      "code": "710419" },

    {
      "name": "石冈区",
      "code": "710420" },

    {
      "name": "外埔区",
      "code": "710421" },

    {
      "name": "大安区",
      "code": "710422" },

    {
      "name": "乌日区",
      "code": "710423" },

    {
      "name": "大肚区",
      "code": "710424" },

    {
      "name": "龙井区",
      "code": "710425" },

    {
      "name": "雾峰区",
      "code": "710426" },

    {
      "name": "太平区",
      "code": "710427" },

    {
      "name": "大里区",
      "code": "710428" },

    {
      "name": "和平区",
      "code": "710429" }] },



  {
    "name": "台南市",
    "code": "710500",
    "sub": [
    {
      "name": "东区",
      "code": "710501" },

    {
      "name": "南区",
      "code": "710502" },

    {
      "name": "北区",
      "code": "710504" },

    {
      "name": "安南区",
      "code": "710506" },

    {
      "name": "安平区",
      "code": "710507" },

    {
      "name": "中西区",
      "code": "710508" },

    {
      "name": "新营区",
      "code": "710509" },

    {
      "name": "盐水区",
      "code": "710510" },

    {
      "name": "白河区",
      "code": "710511" },

    {
      "name": "柳营区",
      "code": "710512" },

    {
      "name": "后壁区",
      "code": "710513" },

    {
      "name": "东山区",
      "code": "710514" },

    {
      "name": "麻豆区",
      "code": "710515" },

    {
      "name": "下营区",
      "code": "710516" },

    {
      "name": "六甲区",
      "code": "710517" },

    {
      "name": "官田区",
      "code": "710518" },

    {
      "name": "大内区",
      "code": "710519" },

    {
      "name": "佳里区",
      "code": "710520" },

    {
      "name": "学甲区",
      "code": "710521" },

    {
      "name": "西港区",
      "code": "710522" },

    {
      "name": "七股区",
      "code": "710523" },

    {
      "name": "将军区",
      "code": "710524" },

    {
      "name": "北门区",
      "code": "710525" },

    {
      "name": "新化区",
      "code": "710526" },

    {
      "name": "善化区",
      "code": "710527" },

    {
      "name": "新市区",
      "code": "710528" },

    {
      "name": "安定区",
      "code": "710529" },

    {
      "name": "山上区",
      "code": "710530" },

    {
      "name": "玉井区",
      "code": "710531" },

    {
      "name": "楠西区",
      "code": "710532" },

    {
      "name": "南化区",
      "code": "710533" },

    {
      "name": "左镇区",
      "code": "710534" },

    {
      "name": "仁德区",
      "code": "710535" },

    {
      "name": "归仁区",
      "code": "710536" },

    {
      "name": "关庙区",
      "code": "710537" },

    {
      "name": "龙崎区",
      "code": "710538" },

    {
      "name": "永康区",
      "code": "710539" }] },



  {
    "name": "新竹市",
    "code": "710600",
    "sub": [
    {
      "name": "东区",
      "code": "710601" },

    {
      "name": "北区",
      "code": "710602" },

    {
      "name": "香山区",
      "code": "710603" }] },



  {
    "name": "嘉义市",
    "code": "710700",
    "sub": [
    {
      "name": "东区",
      "code": "710701" },

    {
      "name": "西区",
      "code": "710702" }] },



  {
    "name": "新北市",
    "code": "710800",
    "sub": [
    {
      "name": "板桥区",
      "code": "710801" },

    {
      "name": "三重区",
      "code": "710802" },

    {
      "name": "中和区",
      "code": "710803" },

    {
      "name": "永和区",
      "code": "710804" },

    {
      "name": "新庄区",
      "code": "710805" },

    {
      "name": "新店区",
      "code": "710806" },

    {
      "name": "树林区",
      "code": "710807" },

    {
      "name": "莺歌区",
      "code": "710808" },

    {
      "name": "三峡区",
      "code": "710809" },

    {
      "name": "淡水区",
      "code": "710810" },

    {
      "name": "汐止区",
      "code": "710811" },

    {
      "name": "瑞芳区",
      "code": "710812" },

    {
      "name": "土城区",
      "code": "710813" },

    {
      "name": "芦洲区",
      "code": "710814" },

    {
      "name": "五股区",
      "code": "710815" },

    {
      "name": "泰山区",
      "code": "710816" },

    {
      "name": "林口区",
      "code": "710817" },

    {
      "name": "深坑区",
      "code": "710818" },

    {
      "name": "石碇区",
      "code": "710819" },

    {
      "name": "坪林区",
      "code": "710820" },

    {
      "name": "三芝区",
      "code": "710821" },

    {
      "name": "石门区",
      "code": "710822" },

    {
      "name": "八里区",
      "code": "710823" },

    {
      "name": "平溪区",
      "code": "710824" },

    {
      "name": "双溪区",
      "code": "710825" },

    {
      "name": "贡寮区",
      "code": "710826" },

    {
      "name": "金山区",
      "code": "710827" },

    {
      "name": "万里区",
      "code": "710828" },

    {
      "name": "乌来区",
      "code": "710829" }] },



  {
    "name": "宜兰县",
    "code": "712200",
    "sub": [
    {
      "name": "宜兰市",
      "code": "712201" },

    {
      "name": "罗东镇",
      "code": "712221" },

    {
      "name": "苏澳镇",
      "code": "712222" },

    {
      "name": "头城镇",
      "code": "712223" },

    {
      "name": "礁溪乡",
      "code": "712224" },

    {
      "name": "壮围乡",
      "code": "712225" },

    {
      "name": "员山乡",
      "code": "712226" },

    {
      "name": "冬山乡",
      "code": "712227" },

    {
      "name": "五结乡",
      "code": "712228" },

    {
      "name": "三星乡",
      "code": "712229" },

    {
      "name": "大同乡",
      "code": "712230" },

    {
      "name": "南澳乡",
      "code": "712231" }] },



  {
    "name": "桃园县",
    "code": "712300",
    "sub": [
    {
      "name": "桃园市",
      "code": "712301" },

    {
      "name": "中坜市",
      "code": "712302" },

    {
      "name": "平镇市",
      "code": "712303" },

    {
      "name": "八德市",
      "code": "712304" },

    {
      "name": "杨梅市",
      "code": "712305" },

    {
      "name": "大溪镇",
      "code": "712321" },

    {
      "name": "芦竹乡",
      "code": "712323" },

    {
      "name": "大园乡",
      "code": "712324" },

    {
      "name": "龟山乡",
      "code": "712325" },

    {
      "name": "龙潭乡",
      "code": "712327" },

    {
      "name": "新屋乡",
      "code": "712329" },

    {
      "name": "观音乡",
      "code": "712330" },

    {
      "name": "复兴乡",
      "code": "712331" }] },



  {
    "name": "新竹县",
    "code": "712400",
    "sub": [
    {
      "name": "竹北市",
      "code": "712401" },

    {
      "name": "竹东镇",
      "code": "712421" },

    {
      "name": "新埔镇",
      "code": "712422" },

    {
      "name": "关西镇",
      "code": "712423" },

    {
      "name": "湖口乡",
      "code": "712424" },

    {
      "name": "新丰乡",
      "code": "712425" },

    {
      "name": "芎林乡",
      "code": "712426" },

    {
      "name": "橫山乡",
      "code": "712427" },

    {
      "name": "北埔乡",
      "code": "712428" },

    {
      "name": "宝山乡",
      "code": "712429" },

    {
      "name": "峨眉乡",
      "code": "712430" },

    {
      "name": "尖石乡",
      "code": "712431" },

    {
      "name": "五峰乡",
      "code": "712432" }] },



  {
    "name": "苗栗县",
    "code": "712500",
    "sub": [
    {
      "name": "苗栗市",
      "code": "712501" },

    {
      "name": "苑里镇",
      "code": "712521" },

    {
      "name": "通霄镇",
      "code": "712522" },

    {
      "name": "竹南镇",
      "code": "712523" },

    {
      "name": "头份镇",
      "code": "712524" },

    {
      "name": "后龙镇",
      "code": "712525" },

    {
      "name": "卓兰镇",
      "code": "712526" },

    {
      "name": "大湖乡",
      "code": "712527" },

    {
      "name": "公馆乡",
      "code": "712528" },

    {
      "name": "铜锣乡",
      "code": "712529" },

    {
      "name": "南庄乡",
      "code": "712530" },

    {
      "name": "头屋乡",
      "code": "712531" },

    {
      "name": "三义乡",
      "code": "712532" },

    {
      "name": "西湖乡",
      "code": "712533" },

    {
      "name": "造桥乡",
      "code": "712534" },

    {
      "name": "三湾乡",
      "code": "712535" },

    {
      "name": "狮潭乡",
      "code": "712536" },

    {
      "name": "泰安乡",
      "code": "712537" }] },



  {
    "name": "彰化县",
    "code": "712700",
    "sub": [
    {
      "name": "彰化市",
      "code": "712701" },

    {
      "name": "鹿港镇",
      "code": "712721" },

    {
      "name": "和美镇",
      "code": "712722" },

    {
      "name": "线西乡",
      "code": "712723" },

    {
      "name": "伸港乡",
      "code": "712724" },

    {
      "name": "福兴乡",
      "code": "712725" },

    {
      "name": "秀水乡",
      "code": "712726" },

    {
      "name": "花坛乡",
      "code": "712727" },

    {
      "name": "芬园乡",
      "code": "712728" },

    {
      "name": "员林镇",
      "code": "712729" },

    {
      "name": "溪湖镇",
      "code": "712730" },

    {
      "name": "田中镇",
      "code": "712731" },

    {
      "name": "大村乡",
      "code": "712732" },

    {
      "name": "埔盐乡",
      "code": "712733" },

    {
      "name": "埔心乡",
      "code": "712734" },

    {
      "name": "永靖乡",
      "code": "712735" },

    {
      "name": "社头乡",
      "code": "712736" },

    {
      "name": "二水乡",
      "code": "712737" },

    {
      "name": "北斗镇",
      "code": "712738" },

    {
      "name": "二林镇",
      "code": "712739" },

    {
      "name": "田尾乡",
      "code": "712740" },

    {
      "name": "埤头乡",
      "code": "712741" },

    {
      "name": "芳苑乡",
      "code": "712742" },

    {
      "name": "大城乡",
      "code": "712743" },

    {
      "name": "竹塘乡",
      "code": "712744" },

    {
      "name": "溪州乡",
      "code": "712745" }] },



  {
    "name": "南投县",
    "code": "712800",
    "sub": [
    {
      "name": "南投市",
      "code": "712801" },

    {
      "name": "埔里镇",
      "code": "712821" },

    {
      "name": "草屯镇",
      "code": "712822" },

    {
      "name": "竹山镇",
      "code": "712823" },

    {
      "name": "集集镇",
      "code": "712824" },

    {
      "name": "名间乡",
      "code": "712825" },

    {
      "name": "鹿谷乡",
      "code": "712826" },

    {
      "name": "中寮乡",
      "code": "712827" },

    {
      "name": "鱼池乡",
      "code": "712828" },

    {
      "name": "国姓乡",
      "code": "712829" },

    {
      "name": "水里乡",
      "code": "712830" },

    {
      "name": "信义乡",
      "code": "712831" },

    {
      "name": "仁爱乡",
      "code": "712832" }] },



  {
    "name": "云林县",
    "code": "712900",
    "sub": [
    {
      "name": "斗六市",
      "code": "712901" },

    {
      "name": "斗南镇",
      "code": "712921" },

    {
      "name": "虎尾镇",
      "code": "712922" },

    {
      "name": "西螺镇",
      "code": "712923" },

    {
      "name": "土库镇",
      "code": "712924" },

    {
      "name": "北港镇",
      "code": "712925" },

    {
      "name": "古坑乡",
      "code": "712926" },

    {
      "name": "大埤乡",
      "code": "712927" },

    {
      "name": "莿桐乡",
      "code": "712928" },

    {
      "name": "林内乡",
      "code": "712929" },

    {
      "name": "二仑乡",
      "code": "712930" },

    {
      "name": "仑背乡",
      "code": "712931" },

    {
      "name": "麦寮乡",
      "code": "712932" },

    {
      "name": "东势乡",
      "code": "712933" },

    {
      "name": "褒忠乡",
      "code": "712934" },

    {
      "name": "台西乡",
      "code": "712935" },

    {
      "name": "元长乡",
      "code": "712936" },

    {
      "name": "四湖乡",
      "code": "712937" },

    {
      "name": "口湖乡",
      "code": "712938" },

    {
      "name": "水林乡",
      "code": "712939" }] },



  {
    "name": "嘉义县",
    "code": "713000",
    "sub": [
    {
      "name": "太保市",
      "code": "713001" },

    {
      "name": "朴子市",
      "code": "713002" },

    {
      "name": "布袋镇",
      "code": "713023" },

    {
      "name": "大林镇",
      "code": "713024" },

    {
      "name": "民雄乡",
      "code": "713025" },

    {
      "name": "溪口乡",
      "code": "713026" },

    {
      "name": "新港乡",
      "code": "713027" },

    {
      "name": "六脚乡",
      "code": "713028" },

    {
      "name": "东石乡",
      "code": "713029" },

    {
      "name": "义竹乡",
      "code": "713030" },

    {
      "name": "鹿草乡",
      "code": "713031" },

    {
      "name": "水上乡",
      "code": "713032" },

    {
      "name": "中埔乡",
      "code": "713033" },

    {
      "name": "竹崎乡",
      "code": "713034" },

    {
      "name": "梅山乡",
      "code": "713035" },

    {
      "name": "番路乡",
      "code": "713036" },

    {
      "name": "大埔乡",
      "code": "713037" },

    {
      "name": "阿里山乡",
      "code": "713038" }] },



  {
    "name": "屏东县",
    "code": "713300",
    "sub": [
    {
      "name": "屏东市",
      "code": "713301" },

    {
      "name": "潮州镇",
      "code": "713321" },

    {
      "name": "东港镇",
      "code": "713322" },

    {
      "name": "恒春镇",
      "code": "713323" },

    {
      "name": "万丹乡",
      "code": "713324" },

    {
      "name": "长治乡",
      "code": "713325" },

    {
      "name": "麟洛乡",
      "code": "713326" },

    {
      "name": "九如乡",
      "code": "713327" },

    {
      "name": "里港乡",
      "code": "713328" },

    {
      "name": "盐埔乡",
      "code": "713329" },

    {
      "name": "高树乡",
      "code": "713330" },

    {
      "name": "万峦乡",
      "code": "713331" },

    {
      "name": "内埔乡",
      "code": "713332" },

    {
      "name": "竹田乡",
      "code": "713333" },

    {
      "name": "新埤乡",
      "code": "713334" },

    {
      "name": "枋寮乡",
      "code": "713335" },

    {
      "name": "新园乡",
      "code": "713336" },

    {
      "name": "崁顶乡",
      "code": "713337" },

    {
      "name": "林边乡",
      "code": "713338" },

    {
      "name": "南州乡",
      "code": "713339" },

    {
      "name": "佳冬乡",
      "code": "713340" },

    {
      "name": "琉球乡",
      "code": "713341" },

    {
      "name": "车城乡",
      "code": "713342" },

    {
      "name": "满州乡",
      "code": "713343" },

    {
      "name": "枋山乡",
      "code": "713344" },

    {
      "name": "三地门乡",
      "code": "713345" },

    {
      "name": "雾台乡",
      "code": "713346" },

    {
      "name": "玛家乡",
      "code": "713347" },

    {
      "name": "泰武乡",
      "code": "713348" },

    {
      "name": "来义乡",
      "code": "713349" },

    {
      "name": "春日乡",
      "code": "713350" },

    {
      "name": "狮子乡",
      "code": "713351" },

    {
      "name": "牡丹乡",
      "code": "713352" }] },



  {
    "name": "台东县",
    "code": "713400",
    "sub": [
    {
      "name": "台东市",
      "code": "713401" },

    {
      "name": "成功镇",
      "code": "713421" },

    {
      "name": "关山镇",
      "code": "713422" },

    {
      "name": "卑南乡",
      "code": "713423" },

    {
      "name": "鹿野乡",
      "code": "713424" },

    {
      "name": "池上乡",
      "code": "713425" },

    {
      "name": "东河乡",
      "code": "713426" },

    {
      "name": "长滨乡",
      "code": "713427" },

    {
      "name": "太麻里乡",
      "code": "713428" },

    {
      "name": "大武乡",
      "code": "713429" },

    {
      "name": "绿岛乡",
      "code": "713430" },

    {
      "name": "海端乡",
      "code": "713431" },

    {
      "name": "延平乡",
      "code": "713432" },

    {
      "name": "金峰乡",
      "code": "713433" },

    {
      "name": "达仁乡",
      "code": "713434" },

    {
      "name": "兰屿乡",
      "code": "713435" }] },



  {
    "name": "花莲县",
    "code": "713500",
    "sub": [
    {
      "name": "花莲市",
      "code": "713501" },

    {
      "name": "凤林镇",
      "code": "713521" },

    {
      "name": "玉里镇",
      "code": "713522" },

    {
      "name": "新城乡",
      "code": "713523" },

    {
      "name": "吉安乡",
      "code": "713524" },

    {
      "name": "寿丰乡",
      "code": "713525" },

    {
      "name": "光复乡",
      "code": "713526" },

    {
      "name": "丰滨乡",
      "code": "713527" },

    {
      "name": "瑞穗乡",
      "code": "713528" },

    {
      "name": "富里乡",
      "code": "713529" },

    {
      "name": "秀林乡",
      "code": "713530" },

    {
      "name": "万荣乡",
      "code": "713531" },

    {
      "name": "卓溪乡",
      "code": "713532" }] },



  {
    "name": "澎湖县",
    "code": "713600",
    "sub": [
    {
      "name": "马公市",
      "code": "713601" },

    {
      "name": "湖西乡",
      "code": "713621" },

    {
      "name": "白沙乡",
      "code": "713622" },

    {
      "name": "西屿乡",
      "code": "713623" },

    {
      "name": "望安乡",
      "code": "713624" },

    {
      "name": "七美乡",
      "code": "713625" }] }] },





{
  "name": "香港特别行政区",
  "code": "810000",
  "sub": [
  {
    "name": "香港岛",
    "code": "810100",
    "sub": [
    {
      "name": "中西区",
      "code": "810101" },

    {
      "name": "湾仔区",
      "code": "810102" },

    {
      "name": "东区",
      "code": "810103" },

    {
      "name": "南区",
      "code": "810104" }] },



  {
    "name": "九龙",
    "code": "810200",
    "sub": [
    {
      "name": "油尖旺区",
      "code": "810201" },

    {
      "name": "深水埗区",
      "code": "810202" },

    {
      "name": "九龙城区",
      "code": "810203" },

    {
      "name": "黄大仙区",
      "code": "810204" },

    {
      "name": "观塘区",
      "code": "810205" }] },



  {
    "name": "新界",
    "code": "810300",
    "sub": [
    {
      "name": "荃湾区",
      "code": "810301" },

    {
      "name": "屯门区",
      "code": "810302" },

    {
      "name": "元朗区",
      "code": "810303" },

    {
      "name": "北区",
      "code": "810304" },

    {
      "name": "大埔区",
      "code": "810305" },

    {
      "name": "西贡区",
      "code": "810306" },

    {
      "name": "沙田区",
      "code": "810307" },

    {
      "name": "葵青区",
      "code": "810308" },

    {
      "name": "离岛区",
      "code": "810309" }] }] },





{
  "name": "澳门特别行政区",
  "code": "820000",
  "sub": [
  {
    "name": "澳门半岛",
    "code": "820100",
    "sub": [
    {
      "name": "花地玛堂区",
      "code": "820101" },

    {
      "name": "圣安多尼堂区",
      "code": "820102" },

    {
      "name": "大堂区",
      "code": "820103" },

    {
      "name": "望德堂区",
      "code": "820104" },

    {
      "name": "风顺堂区",
      "code": "820105" }] },



  {
    "name": "氹仔岛",
    "code": "820200",
    "sub": [
    {
      "name": "嘉模堂区",
      "code": "820201" }] },



  {
    "name": "路环岛",
    "code": "820300",
    "sub": [
    {
      "name": "圣方济各堂区",
      "code": "820301" }] }] }];var _default =







cityData;exports.default = _default;

/***/ }),

/***/ 79:
/*!******************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/login/sign_in/sign_in.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _login = __webpack_require__(/*! ../../../api/login.js */ 8);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      allImage: _images.default,
      // form表单
      form: {
        phone: "",
        password: "",
        determine_password: "",
        code: "" },

      isRadio: true, //是否同意
      passwordPla: "", //输入框的默认文字
      type: 0,
      btn: "", //按钮文字
      code: "获取验证码", //验证码
      passwordAndCod: "手机号快捷登录",
      isLockCode: true, //是否可以获取验证码
      countdown: 60, //验证码倒计时
      nowPage: -1 //当前为注册？忘记密码？验证码登录页面
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight'])),

  methods: {
    // 提交
    formSubmit: function formSubmit(e) {var _this = this;
      if (!this.$util.regular('phone', this.form.phone)) {this.$util.tips({ title: '请输入正确的手机号' });return;} //判断手机号
      if (this.type != 2) {if (this.form.password == "") {this.$util.tips({ title: "请输入密码" });return;}} //判断是否输入密码
      if (this.type == 3) {if (this.form.determine_password != this.form.password) {this.$util.tips({ title: '密码不一致' });return;}} //验证是否密码两次输入相同
      if (this.type != 1) {if (this.form.code == "") {this.$util.tips({ title: "请输入验证码" });return;}} //判断是否输入密码
      if (!this.isRadio) {this.$util.tips({ title: "请先同意协议" });return;}
      var nowData = e.detail.value; //form表单数据
      if (this.type == 0) {//注册页面
        (0, _login.userRegister)(Object.assign(nowData, uni.getStorageSync('register'))).then(function (res) {
          uni.setStorageSync('user', res.data); //存储用户信息
          _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
          _this.$util.tips({ title: res.msg }, { tab: 1, url: '/pages/index/index/index' });
        });
      } else if (this.type == 2) {//手机验证码登录
        (0, _login.smsLogin)(nowData).then(function (res) {
          uni.setStorageSync('user', res.data); //存储用户信息
          _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
          _this.$util.tips({ title: res.msg }, { tab: 1, url: '/pages/index/index/index' });
        });
      } else if (this.type == 3) {//修改密码 
        (0, _login.changepassword)(nowData).then(function (res) {
          uni.setStorageSync('user', res.data); //存储用户信息
          _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
          _this.$util.tips({ title: res.msg }, { tab: 1, url: '/pages/index/index/index' });
        });
      } else if (this.type == 1) {
        (0, _login.loginh5)(nowData).then(function (res) {
          uni.setStorageSync('user', res.data); //存储用户信息
          _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
          _this.$util.tips({ title: res.msg }, { tab: 1, url: '/pages/index/index/index' });
        });
      }
    },
    // 获取验证码
    getCode: function getCode() {
      if (this.isLockCode) {
        this.isLockCode = false; //不能请求了
        if (!this.$util.regular('phone', this.form.phone)) {
          this.$util.tips({ title: '请输入正确的手机号' });
          this.isLockCode = true;
          return;
        }
        (0, _login.getcode)({ mobile: this.form.phone, type: this.nowPage }).then(function (res) {
          console.log(res);
        });
        this.settime();
      } else {
        this.$util.tips({ title: "请稍后~" });
      }
    },
    // 验证码倒计时
    settime: function settime() {
      var this_ = this;
      var time = setInterval(function () {
        this_.countdown = this_.countdown - 1;
        this_.code = this_.countdown + 's';
        if (this_.countdown == 0) {
          this_.isLockCode = true;
          this_.code = "获取验证码";
          this_.countdown = 60;
          clearInterval(time);
        }
      }, 1000);
    },
    // 阅读同意书
    changeRadio: function changeRadio() {
      this.isRadio = !this.isRadio;
    },
    // 跳转页面
    goForget: function goForget(index) {
      if (this.type == 2) {//手机号快捷登录跳转密码登录
        uni.navigateTo({
          url: "/pages/login/sign_in/sign_in?type=1" });

      } else {//跳转忘记密码或手机号快捷登录
        uni.navigateTo({
          url: "/pages/login/sign_in/sign_in?type=" + index });

      }
    },
    // 跳转到协议页面
    toAgreement: function toAgreement(type) {
      uni.navigateTo({
        url: "/pages/login/agreement/agreement?type=" + type });

    } },

  onLoad: function onLoad(options) {
    this.type = options.type;
    //0注册页面，1登录页面
    if (options.type == 0) {//显示注册页面
      this.passwordPla = "请设置登录密码";
      this.btn = "完成";
      this.nowPage = 1;
    } else if (options.type == 1) {//登录
      this.passwordPla = "请输入登录密码";
      this.btn = "登录";
    } else if (options.type == 2) {//手机号快捷登录
      this.passwordPla = "";
      this.btn = "登录";
      this.passwordAndCod = "使用密码登录";
      this.nowPage = 0;
    } else {//忘记密码
      this.passwordPla = "请输入新的密码";
      this.btn = "确定";
      this.nowPage = 2;
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 8:
/*!************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/login.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerIndex = registerIndex;exports.registerRegister = registerRegister;exports.userRegister = userRegister;exports.getcode = getcode;exports.smsLogin = smsLogin;exports.changepassword = changepassword;exports.loginh5 = loginh5;exports.userAgreement = userAgreement;exports.userPrivacy = userPrivacy;exports.refushToken = refushToken;exports.checkVersion = checkVersion;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 点击用户注册之后调用该接口
function registerIndex() {
  return _request.default.post('cms/wxapp.register/index');
}

// 注册步骤
function registerRegister(data) {
  return _request.default.post('cms/wxapp.register/register', data);
}

// 会员注册
function userRegister(data) {
  return _request.default.post('cms/wxapp.user/register', data);
}

// 获取验证码
function getcode(data) {
  return _request.default.post('cms/wxapp.user/getcode', data);
}

// 手机号登录
function smsLogin(data) {
  return _request.default.post('cms/wxapp.user/sms_login', data);
}

// 修改登录密码
function changepassword(data) {
  return _request.default.post('cms/wxapp.user/changepassword', data);
}

// 账号密码登录
function loginh5(data) {
  return _request.default.post('cms/wxapp.user/loginh5', data);
}

// 获取用户注册协议
function userAgreement() {
  return _request.default.post('cms/wxapp.register/user_agreement');
}

// 获取隐私政策
function userPrivacy() {
  return _request.default.post('cms/wxapp.register/user_privacy');
}

// 刷新token
function refushToken(data) {
  return _request.default.post('cms/wxapp.user/refush_token', data);
}

// 检测版本号
function checkVersion(data) {
  return _request.default.post('cms/wxapp.my/check_version', data);
}

/***/ }),

/***/ 88:
/*!**************************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/pages/index/index/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);
var _images = _interopRequireDefault(__webpack_require__(/*! ../../../util/images.js */ 51));
var _index = __webpack_require__(/*! ../../../api/index.js */ 89);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {
      allImages: _images.default, //所有图片，背景金沙滩
      live: {}, //直播的参数
      fiveList: [] // 0直播,1回放,2视频,3文件,4音频,5广告,列表数据
    };
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['statusBarHeight', 'avatar'])),

  methods: {
    // 跳转搜索页面
    toSearch: function toSearch() {
      uni.navigateTo({
        url: '/pages/problem/search/search' });

    },
    // 跳转直播页面 
    toLiveBroadcast: function toLiveBroadcast(id) {
      uni.navigateTo({
        url: "/pages/live_broadcast/live_broadcast/live_broadcast?id=" + id });

    } },

  onShow: function onShow() {var _this = this;
    // 获取首页数据
    (0, _index.indexIndexs)().then(function (res) {
      _this.live = res.data.live; //直播的参数
      _this.fiveList = res.data.data; //列表数据
    });
    console.log(this.avatar);
  },
  onPullDownRefresh: function onPullDownRefresh() {var _this2 = this;
    // 获取首页数据
    (0, _index.indexIndexs)().then(function (res) {
      _this2.live = res.data.live; //直播的参数
      _this2.fiveList = res.data.data; //列表数据
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 89:
/*!************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/api/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.indexIndexs = indexIndexs;exports.archivesDetail = archivesDetail;exports.myCollect = myCollect;exports.userChannelCollert = userChannelCollert;var _request = _interopRequireDefault(__webpack_require__(/*! ../util/request.js */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 首页数据
function indexIndexs() {
  return _request.default.post('cms/wxapp.index/indexs');
}

// 文章数据详情
function archivesDetail(data) {
  return _request.default.post('cms/wxapp.archives/detail', data);
}

// 文章数据详情
function myCollect(data) {
  return _request.default.post('cms/wxapp.my/collect', data);
}

// 文章数据详情
function userChannelCollert(data) {
  return _request.default.post('cms/wxapp.user/channel_collert', data);
}

/***/ }),

/***/ 9:
/*!***************************************************!*\
  !*** D:/XINYIPAI/Git/goldenBeach/util/request.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = request;var _util = _interopRequireDefault(__webpack_require__(/*! ./util.js */ 10));
var _login = __webpack_require__(/*! ../api/login.js */ 8);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var URL = "https://mituo.xypvip.cn/addons/"; //线上
// let URL = "/addons/"//线上
// let URL = "http://192.168.10.62:108/addons/cms/wxapp."//本地
/**
 * 发送请求
 */
function request(api, method, data) {var _this = this;
  var HEADER = { 'content-type': 'application/json' }; //请求头
  data = _objectSpread({}, data, { token: uni.getStorageSync('user').token || '' }); //请求体添加token
  method = method.toUpperCase(); //小写转大写
  return new Promise(function (reslove, reject) {
    // uni.showLoading({
    // 	title:"请求中..."
    // })
    // 获取当前时间戳
    uni.request({
      url: URL + api,
      method: method || 'GET',
      dataType: 'json',
      header: HEADER,
      data: data || {},
      success: function success(res) {
        var newDate = Date.parse(new Date());
        var expiretime = uni.getStorageSync('user').expiretime * 1000 || newDate;
        if (expiretime >= newDate) {
          if (res.data.code == 1) {
            reslove(res.data, res);
          } else {
            if (res.data.msg != "与服务器同步") {
              _util.default.tips({ title: res.data.msg });
            }
          }
        } else {
          (0, _login.refushToken)({ user_id: uni.getStorageSync('user').id }).then(function (res) {
            uni.setStorageSync('user', res.data); //存储用户信息
            _this.$store.dispatch('changeAvatar', uni.getStorageSync("user").avatar);
            request(api, method, data);
          });
        }
      },
      fail: function fail(msg) {
        _util.default.tips({ title: "请求失败" });
      },
      complete: function complete(err) {
        uni.stopPullDownRefresh();
        // uni.hideLoading();
      } });

  });
}
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach(function (method) {
  request[method] = function (api, data) {return request(api, method, data);};
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map