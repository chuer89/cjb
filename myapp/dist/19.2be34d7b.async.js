webpackJsonp([19],{DD9E:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("Biqn"),r=t.n(n),c=t("En79"),s=t.n(c),u=t("+vOg"),o=t("M4fF"),d=t.n(o);a.default={namespace:"record",state:{dataBody:{},pageSize:20,firstPage:1,statusData:[{value:"\u5168\u90e8",code:""},{value:"\u8bd5\u7528",code:"1"},{value:"\u5728\u804c",code:"2"},{value:"\u79bb\u804c",code:"3"},{value:"\u5f85\u79bb\u804c",code:"4"}],contractType:[{value:"\u5168\u90e8",code:""},{value:"\u56fa\u5b9a\u671f\u9650",code:"1"},{value:"\u65e0\u56fa\u5b9a\u671f\u9650",code:"2"},{value:"\u8bd5\u7528",code:"3"}],warningData:[{value:"\u5168\u90e8",code:""},{value:"\u8eab\u4efd\u8bc1",code:"1"},{value:"\u5065\u5eb7\u8bc1",code:"2"},{value:"\u52b3\u52a8\u5408\u540c",code:"3"}],searchParam:{page:1}},subscriptions:{setup:function(e){var a=e.dispatch;e.history.listen(function(e){e.pathname,a({type:"getUserList",payload:{page:1}})})}},effects:{fetch:s.a.mark(function e(a,t){var n,r,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,c=t.put,e.next=4,c({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getUserList:s.a.mark(function e(a,t){var n,r,c,o,p,i,l,v,f,g,y;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,c=t.put,o=t.select,e.next=4,o(function(e){return e.record});case 4:return p=e.sent,i=p.pageSize,l=p.searchParam,v={},d.a.extend(v,l,n,{length:i}),f=i*(v.page-1)||0,v.start=f,e.next=13,r(u.a.getUserList,v);case 13:if(g=e.sent,y=g.data,"success"!==y.msg){e.next=18;break}return e.next=18,c({type:"save",payload:{dataBody:y.data}});case 18:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,a){return r()({},e,a.payload)}}}}});