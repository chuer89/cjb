(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{k64L:function(e,t,r){"use strict";var n=r("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r("MVZn")),s=n(r("o0o1")),c=r("7Qib"),u=n(r("LvDl")),i=r("3eXy"),o={uid:"",sessionId:"",currentMsgs:[],scrollDesc:"",inInfo:{},outInfo:{},scrollTop:9999,custom:{},userCustom:{},farmId:"",farmDetail:"",userInfo:{},subscribes:[],publishFarmList:[],remarkFarmList:[],remarkUserList:[],publishFarmSelect:0,activeTabKey:"user"},l=c.Model.extend({namespace:"contact",state:u.default.cloneDeep(o),subscriptions:{},effects:{getCurrentMsgs:s.default.mark(function e(t,r){var n,a,c,u,i,o,l,d,f,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.put,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,i=u.sessionId,e.next=7,n(e=>e.contactGlobal);case 7:return o=e.sent,l=o.globalNim,e.next=11,a("getInitialRender");case 11:return e.next=13,c({currentMsgs:[]});case 13:if(i){e.next=15;break}return e.abrupt("return",!1);case 15:return e.next=18,a("getContactUserInfo");case 18:return l.setCurrSession(`p2p-${i}`),e.next=21,l.getLocalMsgs(i);case 21:return d=e.sent,console.log(i,d),f=d.length,p=20===f?"\u4e0a\u62c9\u52a0\u8f7d\u66f4\u591a":"",e.next=27,a("mergeCurrentMsgs",{msgs:d});case 27:return e.next=29,c({scrollDesc:p,scrollTop:9999});case 29:case"end":return e.stop()}},e,this)}),getMoreMsgs:s.default.mark(function e(t,r){var n,a,c,u,i,o,l,d,f,p,m,x;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload.scrollTop,a=r.select,c=r.update,u=r.put,e.next=4,a(e=>e.contactGlobal);case 4:return i=e.sent,o=i.globalNim,e.next=8,a(e=>e.contact);case 8:return l=e.sent,d=l.sessionId,f=l.currentMsgs,p=f[0].time,e.next=14,o.getLocalMsgs(d,p);case 14:return m=e.sent,x=20===m.length?"\u4e0a\u62c9\u52a0\u8f7d\u66f4\u591a":"",e.next=18,u("mergeCurrentMsgs",{msgs:m});case 18:return e.next=20,c({scrollDesc:x,scrollTop:n});case 20:case"end":return e.stop()}},e,this)}),sendMsg:s.default.mark(function e(t,r){var n,c,u,i,o,l,d,f,p,m,x,g,h,w,k,b,v,I;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=n.type,u=void 0===c?"text":c,i=n.data,o=void 0===i?{}:i,l=r.select,d=r.put,f=r.update,e.next=4,l(e=>e.contactGlobal);case 4:return p=e.sent,m=p.globalNim,e.next=8,l(e=>e.contact);case 8:return x=e.sent,g=x.sessionId,h=x.currentMsgs,w=(new Date).getTime(),k=o.fileInput,b={},k&&(v=k.value,b.ext=v.substring(v.lastIndexOf(".")+1,v.length),b.size=k.files[0].size,b.name=v.substring(v.lastIndexOf("/")+1),b.progress=0,u=/png|jpg|bmp|jpeg|gif/i.test(b.ext)?"image":"file"),e.next=17,f({currentMsgs:[...h,(0,a.default)({currentKey:w,flow:"out",type:u.toLowerCase()},o,{file:b})]});case 17:if(I=[],!k){e.next=24;break}return e.next=21,m.sendFileMsgs({type:u,to:g,data:o,fileInput:k,currentKey:w});case 21:I=e.sent,e.next=33;break;case 24:if("custom"!==u){e.next=30;break}return e.next=27,m.sendCustomMsgs({type:u,to:g,data:o,currentKey:w});case 27:I=e.sent,e.next=33;break;case 30:return e.next=32,m.sendMsgs({type:u,to:g,data:o});case 32:I=e.sent;case 33:return e.next=35,d({type:"updatePendingMsg",payload:{currentKey:w,msg:I}});case 35:case"end":return e.stop()}},e,this)}),getContactUserInfo:s.default.mark(function e(t,r){var n,a,u,i,o,l,d,f,p,m;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.update,e.next=3,n(e=>e.contactGlobal);case 3:return u=e.sent,i=u.users,o=u.mySessionId,e.next=8,n(e=>e.contact);case 8:l=e.sent,d=l.sessionId,f=c.ImUtils.getUserAvatar(d,i),p=c.ImUtils.getUserAvatar(o,i),m={};try{m=JSON.parse(f.custom,10)||{}}catch(e){}return e.next=16,a({inInfo:f,outInfo:p,userCustom:m});case 16:case"end":return e.stop()}},e,this)}),mergeCurrentMsgs:s.default.mark(function e(t,r){var n,a,c,i,o,l,d,f,p,m,x,g,h,w;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,a=n.msgs,c=n.target,i=r.select,o=r.put,console.log(a),l="",e.next=6,i(e=>e.contactGlobal);case 6:return d=e.sent,f=d.globalNim,e.next=10,i(e=>e.contact);case 10:if(p=e.sent,m=p.uid,!c){e.next=22;break}if(l=c.split("@")[0],parseInt(m,10)!==parseInt(l,10)){e.next=19;break}return e.next=17,o("updateCurrentMsg",{globalNim:f,msgs:a});case 17:e.next=20;break;case 19:return e.abrupt("return",!1);case 20:e.next=24;break;case 22:return e.next=24,o("updateCurrentMsg",{globalNim:f,msgs:a});case 24:return e.next=26,i(e=>e.contact);case 26:if(x=e.sent,g=x.currentMsgs,h=u.default.filter(g,e=>"in"===e.flow&&e.custom),w=h.length,!w){e.next=33;break}return e.next=33,o("transformCustom",{custom:h[w-1].custom});case 33:case"end":return e.stop()}},e,this)}),transformCustom:s.default.mark(function e(t,r){var n,a,c,u,i,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload.custom,a=void 0===n?"":n,c=r.select,u=r.put,i=r.update,console.log(a),e.next=5,c(e=>e.contact);case 5:if(o=e.sent,l=o.farmId,a)try{a=JSON.parse(a,10)}catch(e){console.log(e)}return d=(a||{}).farmId||"",e.next=11,i({custom:a,farmId:d});case 11:if(!d||d===l){e.next=15;break}return l=d,e.next=15,u("getDynamicRender");case 15:if(d){e.next=18;break}return e.next=18,i({farmDetail:"",remarkFarmList:[]});case 18:case"end":return e.stop()}},e,this)}),getInitialRender:s.default.mark(function e(t,r){var n;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.put,e.next=3,n("getUserInfo");case 3:return e.next=5,n("getRemarkUserList");case 5:case"end":return e.stop()}},e,this)}),getDynamicRender:s.default.mark(function e(t,r){var n;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.put,e.next=3,n("getFarmDetail");case 3:return e.next=5,n("getRemarkFarmList");case 5:case"end":return e.stop()}},e,this)}),getUserInfo:s.default.mark(function e(t,r){var n,a,c,u,o,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.uid,e.next=7,a(i.contact.fetchUserInfo,{sellerAgencyId:o});case 7:return l=e.sent,e.next=10,c({userInfo:l});case 10:case"end":return e.stop()}},e,this)}),getPublishFarms:s.default.mark(function e(t,r){var n,a,c,u,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.uid,e.next=7,a(i.contact.fetchPublishFarms,{sellerAgencyId:o});case 7:return l=e.sent,d=l.datas,e.next=11,c({publishFarmList:d});case 11:case"end":return e.stop()}},e,this)}),getSubscribes:s.default.mark(function e(t,r){var n,a,c,u,o,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.uid,e.next=7,a(i.contact.fetchSubscribes,{buyerId:o});case 7:return l=e.sent,e.next=10,c({subscribes:l});case 10:case"end":return e.stop()}},e,this)}),getFarmDetail:s.default.mark(function e(t,r){var n,a,c,u,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.farmId,l=u.uid,e.next=8,a(i.contact.fetchFarmDetail,{farmId:o,userId:l});case 8:return d=e.sent,e.next=11,c({farmDetail:d});case 11:case"end":return e.stop()}},e,this)}),getRemarkUserList:s.default.mark(function e(t,r){var n,a,c,u,o,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.uid,e.next=7,a(i.contact.remarkUserList,{userId:o});case 7:return l=e.sent,e.next=10,c({remarkUserList:l?[l]:[]});case 10:case"end":return e.stop()}},e,this)}),getRemarkFarmList:s.default.mark(function e(t,r){var n,a,c,u,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.select,a=r.call,c=r.update,e.next=3,n(e=>e.contact);case 3:return u=e.sent,o=u.farmId,l=u.uid,e.next=8,a(i.contact.remarkFarmList,{farmId:o,buyerId:l});case 8:return d=e.sent,e.next=11,c({remarkFarmList:d});case 11:case"end":return e.stop()}},e,this)}),updateRemarkUser:s.default.mark(function e(t,r){var n,a,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,a=r.callWithConfirmLoading,c=r.put,e.next=4,a(i.contact.remarkUserUpdate,n);case 4:return e.next=6,c("getRemarkUserList");case 6:case"end":return e.stop()}},e,this)}),addRemarkUser:s.default.mark(function e(t,r){var n,c,u,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=r.callWithConfirmLoading,u=r.select,o=r.put,e.next=4,u(e=>e.contact);case 4:return l=e.sent,d=l.uid,e.next=8,c(i.contact.remarkUserAdd,(0,a.default)({userId:d},n));case 8:return e.next=10,o("getRemarkUserList");case 10:case"end":return e.stop()}},e,this)}),updateRemarkFarm:s.default.mark(function e(t,r){var n,c,u;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=r.callWithConfirmLoading,u=r.put,r.select,e.next=4,c(i.contact.remarkFarmUpdate,(0,a.default)({},n));case 4:return e.next=6,u("getRemarkFarmList");case 6:case"end":return e.stop()}},e,this)}),addRemarkFarm:s.default.mark(function e(t,r){var n,c,u,o,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=r.callWithConfirmLoading,u=r.put,o=r.select,e.next=4,o(e=>e.contact);case 4:return l=e.sent,d=l.farmId,e.next=8,c(i.contact.remarkFarmAdd,(0,a.default)({orderId:d},n));case 8:return e.next=10,u("getRemarkFarmList");case 10:case"end":return e.stop()}},e,this)})},reducers:{resetState(){return u.default.cloneDeep(o)},updatePendingMsg(e,t){var r=t.payload,n=r.currentKey,s=r.msg,c=r.progress,i=e.currentMsgs,o=u.default.findIndex(i,{currentKey:n});return s&&(i[o]=s),c&&(i[o].file.progress=c),(0,a.default)({},e,{currentMsgs:i})},updateCurrentMsg(e,t){var r=t.payload,n=r.globalNim,s=r.msgs,c=n.nim;return(0,a.default)({},e,{currentMsgs:c.mergeMsgs(e.currentMsgs,s)})}}});t.default=l}}]);