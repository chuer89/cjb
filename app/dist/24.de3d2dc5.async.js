(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{AEFI:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var l=n(a("wCAj"));a("+L6B");var r=n(a("2/Rp"));a("5NDa");var o=n(a("5rEg")),u=n(a("lwsE")),c=n(a("W8MJ")),d=n(a("a1gu")),i=n(a("Nsbk")),s=n(a("7W2i")),f=n(a("q1tI")),m=a("MuoO"),p=n(a("VmZz")),v=n(a("wd/R")),h=n(a("iQml")),g=function(e){function t(){var e,a;(0,u.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,d.default)(this,(e=(0,i.default)(t)).call.apply(e,[this].concat(l))),a.state={columns:[],operateTypeSele:{0:"\u65b0\u589e",1:"\u4fee\u6539",3:"\u5220\u9664"},visibleLoginfo:!1,loginInfoRecords:[]},a}return(0,s.default)(t,e),(0,c.default)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this.state.operateTypeSele,t=this,a=function(e){t.save({visibleLoginfo:!0,loginInfoRecords:e})},n=[{title:"\u59d3\u540d",dataIndex:"name"},{title:"\u90e8\u95e8",dataIndex:"deptName"},{title:"\u64cd\u4f5c\u7c7b\u578b",dataIndex:"type",render:function(t){return f.default.createElement("div",null,e[t]||"")}},{title:"\u64cd\u4f5c\u65f6\u95f4",dataIndex:"createTime",render:function(e){return f.default.createElement("div",null,(0,v.default)(e).format("YYYY-MM-DD hh:mm"))}},{title:"\u64cd\u4f5c",key:"handle",align:"center",fixed:"right",width:150,render:function(e){return f.default.createElement("div",null,f.default.createElement("span",{className:p.default.operateBtn,onClick:function(t){a(e.loginfo)}},"\u8be6\u60c5"))}}];this.save({columns:n})}},{key:"save",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this.props,t=e.operatingRecord,a=t.searchParam,n=t.pageSize,u=t.firstPage,c=t.dataBody,d=c.records,i=c.total,s=e.dispatch,m=this.state,v=m.columns,g=m.visibleLoginfo,y=m.loginInfoRecords,_=this,E=function(){s({type:"operatingRecord/getList",payload:{page:u}})},x=function(e,t){a[e]=t,s({type:"operatingRecord/save",payload:{searchParam:a}})},I=function(){s({type:"operatingRecord/save",payload:{searchParam:{}}}),s({type:"record/getUserList",payload:{page:u}})},w={width:"180px"},B={rowKey:"id",dataSource:d||[],columns:v,locale:{emptyText:"\u6682\u65e0\u6570\u636e"},pagination:{pageSize:n,total:i,showTotal:function(e,t){return"[".concat(t.join("-"),"]\uff1b \u603b\u8ba1\uff1a").concat(e)}},onChange:function(e){var t=e.current;s({type:"operatingRecord/getList",payload:{page:t}})}},N={visible:g,records:y,onCancel:function(){_.save({visibleLoginfo:!1})}};return f.default.createElement("div",{className:p.default.content},f.default.createElement("div",null,f.default.createElement(h.default,N)),f.default.createElement("div",{className:p.default.searchBox},f.default.createElement("div",{className:p.default.searchItemBox+" clearfix"},f.default.createElement("div",{className:p.default.searchItem},f.default.createElement("span",null,"\u88ab\u64cd\u4f5c\u4eba\u540d\u79f0\uff1a"),f.default.createElement(o.default,{placeholder:"\u8bf7\u8f93\u5165\u88ab\u64cd\u4f5c\u4eba\u540d\u79f0",value:a.name,onChange:function(e){x("name",e.target.value)},maxLength:32,style:w})),f.default.createElement("div",{className:p.default.searchItem},f.default.createElement("span",null,"\u64cd\u4f5c\u4eba\u540d\u79f0\uff1a"),f.default.createElement(o.default,{value:a.operationName,onChange:function(e){x("operationName",e.target.value)},placeholder:"\u8bf7\u8f93\u5165\u64cd\u4f5c\u4eba\u540d\u79f0",maxLength:32,style:w})),f.default.createElement("div",{className:p.default.searchItem},f.default.createElement("span",null,"\u624b\u673a\u53f7\uff1a"),f.default.createElement(o.default,{value:a.phone,onChange:function(e){x("phone",e.target.value)},placeholder:"\u88ab\u64cd\u4f5c\u4eba\u624b\u673a\u53f7\u7801",maxLength:32,style:w}))),f.default.createElement("div",{className:p.default.searchItemBox},f.default.createElement("div",{className:p.default.searchBtnBox},f.default.createElement(r.default,{type:"primary",onClick:E,style:{marginRight:"15px"}},"\u67e5\u8be2"),f.default.createElement(r.default,{onClick:I},"\u91cd\u7f6e")))),f.default.createElement(l.default,B))}}]),t}(f.default.Component),y=(0,m.connect)(function(e){var t=e.user,a=e.operatingRecord;return{user:t,operatingRecord:a}})(g);t.default=y},VmZz:function(e,t,a){e.exports={"text-overflow":"text-overflow___2gI5l",clearfix:"clearfix___1bxj6",fl:"fl___1TqvO",fr:"fr___3r13F",content:"content___3xj_L",searchBox:"searchBox___1aEsA",searchItem:"searchItem___14zUh",searchItemBox:"searchItemBox___39z0t",searchBtnBox:"searchBtnBox___3EK4F",operateBtn:"operateBtn___2qnTM"}},iQml:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var l=n(a("kLXV"));a("g9YV");var r=n(a("wCAj")),o=n(a("lwsE")),u=n(a("W8MJ")),c=n(a("a1gu")),d=n(a("Nsbk")),i=n(a("7W2i")),s=n(a("q1tI")),f=n(a("wd/R")),m=function(e){function t(){var e,a;(0,o.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,c.default)(this,(e=(0,d.default)(t)).call.apply(e,[this].concat(l))),a.state={columns:[]},a}return(0,i.default)(t,e),(0,u.default)(t,[{key:"save",value:function(e){this.setState(e)}},{key:"UNSAFE_componentWillMount",value:function(){var e=[{title:"\u64cd\u4f5c\u5b57\u6bb5",dataIndex:"field"},{title:"\u4fee\u6539\u524d",dataIndex:"oldValue"},{title:"\u4fee\u6539\u540e",dataIndex:"newValue"},{title:"\u64cd\u4f5c\u65f6\u95f4",dataIndex:"createTime",render:function(e){return s.default.createElement("div",null,(0,f.default)(e).format("YYYY-MM-DD hh:mm"))}}];this.save({columns:e})}},{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,n=e.records,o=this.state.columns,u={rowKey:"id",dataSource:n||[],scroll:{y:500},columns:o,locale:{emptyText:"\u6682\u65e0\u6570\u636e"},pagination:!1};return s.default.createElement(l.default,{title:"\u64cd\u4f5c\u8be6\u60c5",width:800,destroyOnClose:!0,visible:t,centered:!0,footer:null,onCancel:a},s.default.createElement("div",null,s.default.createElement(r.default,u)))}}]),t}(s.default.Component),p=m;t.default=p}}]);