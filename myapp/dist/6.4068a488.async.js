(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{LfPc:function(e,a,t){"use strict";var r=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=r(t("o0o1"));t("miYZ");var l=r(t("tsqr")),n=r(t("MVZn")),u=r(t("EBPN")),c=t("7Qib"),i=r(t("LvDl")),d=r(t("usdK")),p={farmers:[],farmersInputValue:void 0},f=c.Model.extend({namespace:"addFarm",state:(0,n.default)({},i.default.cloneDeep(p)),subscriptions:{setup(e){e.dispatch,e.listen}},effects:{getFarmer:s.default.mark(function e(a,t){var r,n,c,i,d,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,a.callback,t.call,t.put,t.select,t.callWithMessage,n=t.update,c=t.callWithSpinning,i=r.mobileOrUserId,e.next=5,c(u.default.getFarmers,{mobileOrUserId:i});case 5:if(d=e.sent,!d){e.next=13;break}return p=[],d.map((e,a)=>{p.push({label:`${e.id} ${e.mobileRegion}+${e.mobile} ${e.authStateDesc}`,value:e.id})}),e.next=11,n({farmers:p});case 11:e.next=14;break;case 13:l.default.info("\u6ca1\u6709\u67e5\u627e\u5230\u519c\u573a\u4e3b\uff01");case 14:case"end":return e.stop()}},e,this)}),saveFarm:s.default.mark(function e(a,t){var r,n;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,a.callback,t.call,t.put,t.select,t.callWithMessage,t.update,n=t.callWithSpinning,e.next=4,n(u.default.saveFarm,r);case 4:l.default.success("\u4fdd\u5b58\u6210\u529f"),d.default.push("/farmInfo");case 6:case"end":return e.stop()}},e,this)})},reducers:{updateFarms(e,a){return(0,n.default)({},e,{farmersInputValue:a.payload})}}});a.default=f}}]);