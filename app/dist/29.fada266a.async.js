(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{yEHD:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(a("MVZn")),r=n(a("o0o1")),i=n(a("3eXy")),u=(n(a("LvDl")),{namespace:"addUser",state:{addUserParam:{},activeTabsKey:"0",personalDisabled:!0,basicDisabled:!0,experienceDisabled:!0,portrayalDisabled:!0,storeStructure:[],userOrganizations:[],departmentType:"1",uid:"",positionData:[],twoDepartmentData:[],portrayalImg:{}},subscriptions:{setup:function(e){e.dispatch;var t=e.history;t.listen(function(e){e.pathname})}},effects:{fetch:r.default.mark(function e(t,a){var n;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,a.call,n=a.put,e.next=4,n({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getPosition:r.default.mark(function e(t,a){var n,s,u,o,c,p;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,u=a.put,e.next=4,s(i.default.getPosition,n);case 4:if(o=e.sent,c=o.data,"success"!==c.msg){e.next=11;break}return p=c.data,p.push({name:"\u5176\u4ed6",id:""}),e.next=11,u({type:"save",payload:{positionData:p}});case 11:case"end":return e.stop()}},e,this)}),getTwoDepartmentBySid:r.default.mark(function e(t,a){var n,s,u,o,c,p;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,u=a.put,e.next=4,s(i.default.getTwoDepartmentBySid,n);case 4:if(o=e.sent,c=o.data,"success"!==c.msg){e.next=11;break}return p=c.data,p.push({name:"\u81ea\u5b9a\u4e49",code:"-1"}),e.next=11,u({type:"save",payload:{twoDepartmentData:p}});case 11:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,s.default)({},e,t.payload)}}});t.default=u}}]);