(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{AHXz:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("14J3");var r=l(a("BMrR"));a("jCWc");var d=l(a("kPKH")),u=l(a("pVnL"));a("IzEo");var n=l(a("bx4M")),f=l(a("q1tI")),s=a("MuoO"),i=l(a("cVA7")),o=l(a("adk9")),c=l(a("lQUq")),m=l(a("LvDl")),p=l(a("VDzz"));class v extends f.default.Component{constructor(e){super(e),this.state={month:["\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u5341\u4e00","\u5341\u4e8c"]}}render(){var e=this.props,t=(e.dispatch,e.dashboard),a=this.state.month,l=t.chartAge,s=t.chartEducation,v=t.chartGender,E=t.chartApplyChannel,_=t.chartResignation,h=t.chartJobType,x=t.chartOnJobProportion,y=t.chartUserTurnover,b={span:8},N={span:12},g=[];m.default.isArray(l.data)&&m.default.forEach(l.data,e=>{g.push({name:e.name,value:e.num})});var A=[];m.default.isArray(s.data)&&m.default.forEach(s.data,e=>{A.push({name:e.name,value:e.num})});var w=[];m.default.isArray(v.data)&&m.default.forEach(v.data,e=>{w.push({name:e.name,value:e.num})});var k=[];m.default.isArray(E.data)&&m.default.forEach(E.data,e=>{k.push({name:e.name,value:e.num})});var P=[];m.default.isArray(_.data)&&m.default.forEach(_.data,e=>{P.push({name:e.name,value:e.num})});var z=[];m.default.isArray(h.data)&&m.default.forEach(h.data,e=>{z.push({name:e.name,value:e.num})});var D=[];m.default.isArray(x.data)&&m.default.forEach(x.data,e=>{D.push({name:e.name,value:e.num})});var O=[{title:"\u5e74\u9f84\u5206\u5e03",data:g},{title:"\u5b66\u5386\u5206\u5e03",data:A},{title:"\u6027\u522b\u5206\u5e03",data:w}],B=O.map((e,t)=>{var a=o.default.getPieOption(e.data),l={};2===t&&(l={marginRight:"0"});var r=f.default.createElement("div",{className:c.default.notData},"\u6682\u65e0\u6570\u636e");return m.default.isEmpty(e.data)||(r=f.default.createElement(i.default,{option:a})),f.default.createElement(d.default,(0,u.default)({},b,{key:t}),f.default.createElement("div",{className:c.default.splitBox,style:l},f.default.createElement(n.default,{title:e.title},r)))}),M=[{title:"\u62db\u8058\u6e20\u9053",data:k},{title:"\u79bb\u804c\u7387",data:P}],q=M.map((e,t)=>{var a=o.default.getPieOption(e.data),l={};1===t&&(l={marginRight:"0"});var r=f.default.createElement("div",{className:c.default.notData},"\u6682\u65e0\u6570\u636e");return m.default.isEmpty(e.data)||(r=f.default.createElement(i.default,{option:a})),f.default.createElement(d.default,(0,u.default)({},N,{key:t}),f.default.createElement("div",{className:c.default.splitBox,style:l},f.default.createElement(n.default,{title:e.title},r)))}),H=[{title:"\u517c\u804c\u5168\u804c\u5206\u5e03",data:z},{title:"\u6ee1\u7f16\u7387",data:D}],R=H.map((e,t)=>{var a=o.default.getPieOption(e.data),l={};1===t&&(l={marginRight:"0"});var r=f.default.createElement("div",{className:c.default.notData},"\u6682\u65e0\u6570\u636e");return m.default.isEmpty(e.data)||(r=f.default.createElement(i.default,{option:a})),f.default.createElement(d.default,(0,u.default)({},N,{key:t}),f.default.createElement("div",{className:c.default.splitBox,style:l},f.default.createElement(n.default,{title:e.title},r)))}),C=[],U=[],G=[];m.default.isArray(y)&&m.default.forEach(y,(e,t)=>{var l=e||{},r=l.entry,d=l.out;C.push(a[t]+"\u6708"),U.push(r||void 0),G.push(d||void 0)});var J={xAxis:{data:C,boundaryGap:!1},tooltip:{trigger:"axis"},yAxis:{type:"value"},series:[{name:"\u5728\u804c",data:U,type:"line",smooth:!0},{name:"\u79bb\u804c",data:G,type:"line",smooth:!0}]};return f.default.createElement("div",null,f.default.createElement("div",{className:c.default.box},f.default.createElement(r.default,null,B)),f.default.createElement("div",{className:c.default.box},f.default.createElement(r.default,null,q)),f.default.createElement("div",{className:c.default.box},f.default.createElement(n.default,{title:"\u6d41\u52a8\u5206\u6790"},f.default.createElement(i.default,{style:{height:"400px"},option:J}))),f.default.createElement("div",{className:c.default.box},f.default.createElement(r.default,null,R)),f.default.createElement("div",{className:c.default.box},f.default.createElement(p.default,null)))}}var E=(0,s.connect)(e=>{var t=e.dashboard;return{dashboard:t}})(v);t.default=E},FHKW:function(e,t,a){e.exports={"text-overflow":"text-overflow___8jS1Y",clearfix:"clearfix___1EGfk",fl:"fl___3y6xz",fr:"fr___29qF9",content:"content___2AffC",box:"box___3oaKt",item:"item___1VbX0",itemProgress:"itemProgress___BObin"}},VDzz:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=l(a("bx4M"));a("MXD1");var d=l(a("CFYs"));a("pC0b");var u=l(a("GzdX")),n=l(a("q1tI")),f=l(a("FHKW")),s=()=>{var e=[{star:5,percent:85},{star:4,percent:96},{star:3,percent:44},{star:2,percent:2},{star:1,percent:0}],t=e.map((e,t)=>{return n.default.createElement("div",{className:f.default.box,key:t},n.default.createElement("div",{className:f.default.item},n.default.createElement("span",null,n.default.createElement(u.default,{disabled:!0,value:e.star}),n.default.createElement("span",{className:"ant-rate-text"},e.star,"\u661f"))),n.default.createElement("div",{className:f.default.itemProgress},n.default.createElement(d.default,{percent:e.percent,status:"active"})))});return n.default.createElement(r.default,{title:"\u5458\u5de5\u6ee1\u610f\u5ea6\uff08\u6837\u672c\u6570\u636e\uff09"},n.default.createElement("div",{className:f.default.content},t))},i=s;t.default=i},lQUq:function(e,t,a){e.exports={"text-overflow":"text-overflow___3MxHk",clearfix:"clearfix___2HBNh",fl:"fl___3GU5U",fr:"fr___4lT7o",box:"box___1ONwH",splitBox:"splitBox___2t0sn",notData:"notData___2aUZn"}}}]);