(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{oW7N:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("MVZn")),s=n(a("o0o1")),o=(n(a("3eXy")),n(a("LvDl")),{namespace:"operatingRecord",state:{searchParam:{page:1},dataBody:{},pageSize:20,firstPage:1},subscriptions:{setup:function(e){e.dispatch;var t=e.history;t.listen(function(e){e.pathname})}},effects:{fetch:s.default.mark(function e(t,a){var n;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,a.call,n=a.put,e.next=4,n({type:"save"});case 4:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,r.default)({},e,t.payload)}}});t.default=o}}]);