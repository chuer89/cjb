(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{DeYj:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.tableFields=void 0;var n=l(a("q1tI")),r=a("gNCq"),i=[{title:"\u8ba2\u5355\u7f16\u53f7",key:"orderNo"},{title:"\u5546\u54c1\u7c7b\u578b",key:"serviceType",enums:r.SERVICE_TYPE},{title:"\u59d3\u540d",key:"buyerName"},{title:"\u519c\u573a\u540d\u79f0",key:"farmName"},{title:"\u624b\u673a\u53f7",key:"buyerMobile",render:(e,t)=>{var a=t.buyerMobileRegion,l=a?`+${a} ${e||""}`:e;return n.default.createElement("span",null,l)}},{title:"\u8ba2\u5355\u91d1\u989d(\u5143)",key:"price"},{title:"\u5b9e\u4ed8\u91d1\u989d(\u5143)",key:"paidPrice"},{title:"\u8ba2\u5355\u72b6\u6001",key:"orderStatus",enums:r.ORDER_STATUS},{title:"\u521b\u5efa\u65f6\u95f4",type:"datetime",key:"createTime"}];t.tableFields=i},sANy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.filters=void 0;var l=a("gNCq"),n=[{inputType:"select",title:"serviceType",value:"1",label:"\u5546\u54c1\u7c7b\u578b",isAll:!0,componentsConfig:{placeholder:"\u5546\u54c1\u7c7b\u578b"},itemConfig:{initialValue:"2"},selectCondition:l.SERVICE_TYPE},{inputType:"input",title:"orderNo",value:"",label:"\u8ba2\u5355\u7f16\u53f7",componentsConfig:{placeholder:"\u8ba2\u5355\u7f16\u53f7"}},{inputType:"input",title:"buyerName",value:"",label:"\u7528\u6237\u59d3\u540d",componentsConfig:{placeholder:""}},{inputType:"select",title:"orderStatus",value:"1",label:"\u8ba2\u5355\u72b6\u6001",isAll:!0,componentsConfig:{placeholder:"\u8ba2\u5355\u72b6\u6001"},selectCondition:l.ORDER_STATUS},{inputType:"input",title:"farmName",value:"",label:"\u519c\u573a\u540d\u79f0",componentsConfig:{placeholder:""}},{inputType:"phone",title:"mobile",value:"",label:"\u624b\u673a\u53f7",componentsConfig:{placeholder:""}}];t.filters=n},yXtp:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("miYZ");var n=l(a("tsqr")),r=l(a("o0o1")),i=l(a("MVZn")),s=a("Uuzc"),o=a("7Qib"),u=a("8SHQ"),c=a("DeYj"),p=a("sANy"),d=u.base.initPage,f=o.Model.extend({namespace:"ordersDeal",state:{list:[],queryCondition:p.filters,fields:c.tableFields,pagination:{current:1,total:0,pageSize:10},searchParams:{}},subscriptions:{setup(e){var t=e.dispatch,a=(e.history,e.listen);a("/orders/deal",()=>{t({type:"getDealList",payload:{ps:d.size,pn:d.number}})})}},effects:{getDealList:r.default.mark(function e(t,a){var l,n,o,u,c,p,d,f,y,m,v,b,h;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return l=t.payload,n=a.update,o=a.select,u=a.call,e.next=4,o(e=>e.ordersDeal);case 4:return c=e.sent,p=c.pagination,d=p.pageSize,f=p.current,y=(0,i.default)({ps:d,pn:f},l),e.next=10,u(s.getDealList,y);case 10:return m=e.sent,v=m.datas,b=m.pn,h=m.tc,e.next=16,n({list:v,pagination:(0,i.default)({},p,{current:b,total:h}),searchParams:y});case 16:case"end":return e.stop()}},e,this)}),setCloseDeal:r.default.mark(function e(t,a){var l,i,o,u,c,p;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return l=t.payload,i=a.callWithConfirmLoading,o=a.put,u=a.select,e.next=4,u(e=>e.ordersDeal);case 4:return c=e.sent,p=c.searchParams,e.next=8,i(s.setCloseDeal,l);case 8:return n.default.success("\u5df2\u5173\u95ed"),e.next=11,o({type:"getDealList",payload:p});case 11:case"end":return e.stop()}},e,this)}),setCompleteDeal:r.default.mark(function e(t,a){var l,i,o,u,c,p;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return l=t.payload,i=a.callWithConfirmLoading,o=a.put,u=a.select,e.next=4,u(e=>e.ordersDeal);case 4:return c=e.sent,p=c.searchParams,e.next=8,i(s.setCompleteDeal,l);case 8:return n.default.success("\u5df2\u5b8c\u6210"),e.next=11,o({type:"getDealList",payload:p});case 11:case"end":return e.stop()}},e,this)})}});t.default=f}}]);