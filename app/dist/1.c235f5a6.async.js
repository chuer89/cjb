(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{XRCZ:function(e,a,t){"use strict";var s=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=s(t("MVZn"));t("miYZ");var c=s(t("tsqr")),n=s(t("o0o1")),u=s(t("3eXy")),d=s(t("LvDl")),l={namespace:"record",state:{dataBody:{},pageSize:20,firstPage:1,statusData:[{value:"\u5168\u90e8",code:""},{value:"\u8bd5\u7528",code:"1"},{value:"\u5728\u804c",code:"2"},{value:"\u79bb\u804c",code:"3"},{value:"\u5f85\u79bb\u804c",code:"4"}],contractType:[{value:"\u5168\u90e8",code:""},{value:"\u56fa\u5b9a\u671f\u9650",code:"1"},{value:"\u65e0\u56fa\u5b9a\u671f\u9650",code:"2"},{value:"\u8bd5\u7528",code:"3"}],warningData:[{value:"\u5168\u90e8",code:""},{value:"\u8eab\u4efd\u8bc1",code:"1"},{value:"\u5065\u5eb7\u8bc1",code:"2"},{value:"\u52b3\u52a8\u5408\u540c",code:"3"}],searchParam:{page:1},selectedRowUserId:"",visibleBatch:!1},subscriptions:{setup:function(e){var a=e.dispatch,t=e.history;t.listen(function(e){var t=e.pathname;"/personnel/record"===t&&(a({type:"getUserList",payload:{page:1}}),a({type:"save",payload:{selectedRowUserId:"",visibleBatch:!1}}))})}},effects:{fetch:n.default.mark(function e(a,t){var s;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.payload,t.call,s=t.put,e.next=4,s({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getUserList:n.default.mark(function e(a,t){var s,r,c,l,o,i,p,v,f,h,y;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=a.payload,r=t.call,c=t.put,l=t.select,e.next=4,l(function(e){return e.record});case 4:return o=e.sent,i=o.pageSize,p=o.searchParam,v={},d.default.extend(v,p,s,{length:i}),f=i*(v.page-1)||0,v.start=f,e.next=13,r(u.default.getUserList,v);case 13:if(h=e.sent,y=h.data,"success"!==y.msg){e.next=18;break}return e.next=18,c({type:"save",payload:{dataBody:y.data}});case 18:case"end":return e.stop()}},e,this)}),updateAll:n.default.mark(function e(a,t){var s,r,d,l,o;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=a.payload,r=t.call,d=t.put,e.next=4,r(u.default.updateAll,s);case 4:if(l=e.sent,o=l.data,"success"!==o.msg){e.next=14;break}return c.default.success("\u5df2\u4fee\u6539"),e.next=10,d({type:"save",payload:{visibleBatch:!1}});case 10:return e.next=12,d({type:"getUserList"});case 12:e.next=15;break;case 14:c.default.error(o.msg);case 15:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,a){return(0,r.default)({},e,a.payload)}}};a.default=l}}]);