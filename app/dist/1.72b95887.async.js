(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{XRCZ:function(e,a,t){"use strict";var s=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=s(t("MVZn"));t("miYZ");var n=s(t("tsqr")),c=s(t("o0o1")),u=s(t("3eXy")),d=s(t("LvDl")),l={namespace:"record",state:{dataBody:{},pageSize:20,firstPage:1,statusData:[{value:"\u5168\u90e8",code:""},{value:"\u8bd5\u7528",code:"1"},{value:"\u5728\u804c",code:"2"},{value:"\u79bb\u804c",code:"3"},{value:"\u5f85\u79bb\u804c",code:"4"}],contractType:[{value:"\u5168\u90e8",code:""},{value:"\u56fa\u5b9a\u671f\u9650",code:"1"},{value:"\u65e0\u56fa\u5b9a\u671f\u9650",code:"2"},{value:"\u8bd5\u7528",code:"3"}],warningData:[{value:"\u5168\u90e8",code:""},{value:"\u8eab\u4efd\u8bc1",code:"1"},{value:"\u5065\u5eb7\u8bc1",code:"2"},{value:"\u52b3\u52a8\u5408\u540c",code:"3"}],searchParam:{page:1},selectedRowUserId:"",visibleBatch:!1},subscriptions:{setup:function(e){var a=e.dispatch,t=e.history;t.listen(function(e){var s=e.pathname,r=d.default.get(t,"location.query.status");"/personnel/record"===s&&(a({type:"save",payload:{searchParam:{page:1,status:r}}}),a({type:"getUserList",payload:{page:1,status:r}}),a({type:"save",payload:{selectedRowUserId:"",visibleBatch:!1}}))})}},effects:{fetch:c.default.mark(function e(a,t){var s;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.payload,t.call,s=t.put,e.next=4,s({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getUserList:c.default.mark(function e(a,t){var s,r,n,l,o,p,i,v,f,y,h,w,g;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=a.payload,r=t.call,n=t.put,l=t.select,e.next=4,l(function(e){return e.user});case 4:return o=e.sent,p=o.dept,e.next=8,l(function(e){return e.record});case 8:return i=e.sent,v=i.pageSize,f=i.searchParam,y={},d.default.extend(y,f,s,{length:v,dept:p}),h=v*(y.page-1)||0,y.start=h,e.next=17,r(u.default.getUserList,y);case 17:if(w=e.sent,g=w.data,"success"!==g.msg){e.next=22;break}return e.next=22,n({type:"save",payload:{dataBody:g.data}});case 22:case"end":return e.stop()}},e,this)}),updateAll:c.default.mark(function e(a,t){var s,r,d,l,o;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=a.payload,r=t.call,d=t.put,e.next=4,r(u.default.updateAll,s);case 4:if(l=e.sent,o=l.data,"success"!==o.msg){e.next=14;break}return n.default.success("\u5df2\u4fee\u6539"),e.next=10,d({type:"save",payload:{visibleBatch:!1}});case 10:return e.next=12,d({type:"getUserList"});case 12:e.next=15;break;case 14:n.default.error(o.msg);case 15:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,a){return(0,r.default)({},e,a.payload)}}};a.default=l}}]);