/* global window */
import cloneDeep from 'lodash.clonedeep'

import request from './request'
import Model from './model'
import classnames from 'classnames'
import TableUtils from './tableUtils'
import * as localStorage from './_localStorage';
import * as ImUtils from './im';

export {
  request,
  classnames,
  Model,
  TableUtils,
  localStorage,
  ImUtils,
}

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


export const treeToArray = (data) => {
  const result = []
  const changefunc = (tree, pkey) => {
    tree.forEach((item) => {
      if (item.children) {
        changefunc(item.children, item.key)
      }
      result.push({
        pkey: pkey,
        title: item.title,
        key: item.key,
      })
    })
  }
  changefunc(data, null)
  return result
}


/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray(array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function converFileSize(limit) {
  var size = "";
  if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else { //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec === "00") {//当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

var _$encode = function (_map, _content) {
  _content = '' + _content;
  if (!_map || !_content) {
    return _content || '';
  }
  return _content.replace(_map.r, function ($1) {
    var _result = _map[!_map.i ? $1.toLowerCase() : $1];
    return _result != null ? _result : $1;
  });
};
/**
 * 日期格式化
 * @return string
 */
const dateFormat = (function () {
  var _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g },
    _12cc = ['上午', '下午'],
    _12ec = ['A.M.', 'P.M.'],
    _week = ['日', '一', '二', '三', '四', '五', '六'],
    _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var _fmtnmb = function (_number) {
    _number = parseInt(_number, 10) || 0;
    return (_number < 10 ? '0' : '') + _number;
  };
  var _fmtclc = function (_hour) {
    return _hour < 12 ? 0 : 1;
  };
  return function (_time, _format, _12time) {
    if (!_time || !_format)
      return '';
    _time = new Date(_time);
    _map.yyyy = _time.getFullYear();
    _map.yy = ('' + _map.yyyy).substr(2);
    _map.M = _time.getMonth() + 1;
    _map.MM = _fmtnmb(_map.M);
    _map.eM = _emon[_map.M - 1];
    _map.cM = _cmon[_map.M - 1];
    _map.d = _time.getDate();
    _map.dd = _fmtnmb(_map.d);
    _map.H = _time.getHours();
    _map.HH = _fmtnmb(_map.H);
    _map.m = _time.getMinutes();
    _map.mm = _fmtnmb(_map.m);
    _map.s = _time.getSeconds();
    _map.ss = _fmtnmb(_map.s);
    _map.ms = _time.getMilliseconds();
    _map.w = _week[_time.getDay()];
    var _cc = _fmtclc(_map.H);
    _map.ct = _12cc[_cc];
    _map.et = _12ec[_cc];
    if (!!_12time) {
      _map.H = _map.H % 12;
    }
    return _$encode(_map, _format);
  };
})();
export const transTime = (() => {
  var getDayPoint = function (time) {
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    time.setHours(0);
    var today = time.getTime();
    time.setMonth(1);
    time.setDate(1);
    var yearDay = time.getTime();
    return [today, yearDay];
  };
  return function (time) {
    var check = getDayPoint(new Date());
    if (time >= check[0]) {
      return dateFormat(time, "HH:mm");
    } else if (time >= check[0] - 60 * 1000 * 60 * 24) {
      return "昨天";
    } else if (time >= (check[0] - 2 * 60 * 1000 * 60 * 24)) {
      return "前天";
    } else if (time >= (check[0] - 7 * 60 * 1000 * 60 * 24)) {
      return "星期" + dateFormat(time, "w");
    } else if (time >= check[1]) {
      return dateFormat(time, "MM-dd");
    } else {
      return dateFormat(time, "yyyy-MM-dd");
    }
  };
})();


export const transMsgTime = (() => {
  var getDayPoint = function (time) {
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    time.setHours(0);
    var today = time.getTime();
    time.setMonth(1);
    time.setDate(1);
    var yearDay = time.getTime();
    return [today, yearDay];
  };
  return function (time) {
    var check = getDayPoint(new Date());
    if (time >= check[0]) {
      return dateFormat(time, "HH:mm");
    } else if (time >= check[0] - 60 * 1000 * 60 * 24) {
      return `昨天  ${dateFormat(time, "HH:mm")}`;
    } else if (time >= check[1]) {
      return dateFormat(time, "MM-dd HH:mm");
    } else {
      return dateFormat(time, "yyyy-MM-dd HH:mm");
    }
  };
})();

// 正则
export const reg = {
  code: /^\d{6}$/, // 短信验证码
  phone: /^\d{5,20}$/, // 手机号
}