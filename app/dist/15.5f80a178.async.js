(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{HKEE:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(a("MVZn")),r=n(a("o0o1")),u=n(a("3eXy")),c=n(a("LvDl")),i={namespace:"userStaffing",state:{list:[],searchParam:{}},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){var a=e.pathname;"/deploy/user_staffing"===a&&t({type:"getList"})})}},effects:{fetch:r.default.mark(function e(t,a){var n;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,a.call,n=a.put,e.next=4,n({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getList:r.default.mark(function e(t,a){var n,s,i,f,p,d,o,l,v,h,w;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,i=a.put,f=a.select,e.next=4,f(function(e){return e.user});case 4:return p=e.sent,d=p.dept,e.next=8,f(function(e){return e.userStaffing});case 8:return o=e.sent,l=o.searchParam,v={},c.default.extend(v,l,n,{dept:d}),e.next=14,s(u.default.getUserStaffing,v);case 14:if(h=e.sent,w=h.data,"success"!==w.msg){e.next=19;break}return e.next=19,i({type:"save",payload:{list:w.data}});case 19:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,s.default)({},e,t.payload)}}};t.default=i}}]);