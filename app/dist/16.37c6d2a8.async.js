(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"0cFi":function(e,t,a){e.exports={"text-overflow":"text-overflow___U2ZYQ",clearfix:"clearfix___2OKy1",fl:"fl___28H2c",fr:"fr___3P8Y8",addBtnBox:"addBtnBox___kBr2U",contentStyle:"contentStyle___RFftN",operateBtn:"operateBtn___1fSR9",searchBox:"searchBox___2HKdU",searchItem:"searchItem___5NsdG",searchItemBox:"searchItemBox___3A9C4"}},b4Qg:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var n=l(a("wCAj"));a("+L6B");var i=l(a("2/Rp"));a("miYZ");var u=l(a("tsqr"));a("/zsF");var r=l(a("PArb")),d=l(a("lwsE")),f=l(a("W8MJ")),s=l(a("a1gu")),c=l(a("Nsbk")),o=l(a("7W2i"));a("OaEy");var m=l(a("2fM7"));a("2qtc");var v=l(a("kLXV")),p=l(a("q1tI")),h=a("MuoO"),y=l(a("LvDl")),_=l(a("3eXy")),g=l(a("0cFi")),k=l(a("mp9z")),E=l(a("jV50")),x=v.default.confirm,b=m.default.Option,B=function(e){function t(){var e,a;(0,d.default)(this,t);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return a=(0,s.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(n))),a.state={visibleModify:!1,visibleAdd:!1,modifyTitle:"",callBack:function(){},initialValue:"",data:{},columns:[]},a}return(0,o.default)(t,e),(0,f.default)(t,[{key:"save",value:function(e){this.setState(e)}},{key:"UNSAFE_componentWillMount",value:function(){var e=this,t=[{title:"\u5c97\u4f4d",dataIndex:"positionName"},{title:"\u6807\u914d\u4eba\u6570",dataIndex:"num"},{title:"\u5728\u804c\u4eba\u6570",dataIndex:"realNum"},{title:"\u5dee\u5f02\u4eba\u6570",dataIndex:"difNum"},{title:"\u64cd\u4f5c",key:"handle",align:"center",width:150,render:function(t){return p.default.createElement("div",null,p.default.createElement("span",{onClick:function(a){e.handerModifySection(t)},className:g.default.operateBtn},"\u7f16\u8f91"),p.default.createElement(r.default,{type:"vertical"}),p.default.createElement("span",{onClick:function(a){e.deletePositionById(t)},className:g.default.operateBtn},"\u5220\u9664"))}}];this.save({columns:t})}},{key:"handerOpenModify",value:function(e){y.default.extend(e,{visibleModify:!0}),this.save(e)}},{key:"handerCloseModify",value:function(){this.save({visibleModify:!1,visibleAdd:!1})}},{key:"handerOpenAdd",value:function(e){y.default.extend(e,{visibleAdd:!0}),this.save(e)}},{key:"handerModifySection",value:function(e){var t=this;this.handerOpenAdd({modifyTitle:"\u4fee\u6539\u5c97\u4f4d",data:e,callBack:function(a){var l={};y.default.extend(l,e,a),_.default.updateUserStaffing(l).then(function(e){var a=e.data;t.handerAjaxBack(a)})}})}},{key:"handerAjaxBack",value:function(e){var t=this.props.dispatch,a=this;"success"===e.msg?(a.handerCloseModify(),u.default.success("\u64cd\u4f5c\u6210\u529f"),t({type:"userStaffing/getList"})):u.default.error(e.msg)}},{key:"handerShowDel",value:function(e){x({title:"\u786e\u5b9a\u5220\u9664\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e()},onCancel:function(){}})}},{key:"handerAdd",value:function(){var e=this;this.handerOpenModify({modifyTitle:"\u6dfb\u52a0\u7f16\u5236",data:{},callBack:function(t){_.default.addUserStaffing(t).then(function(t){var a=t.data;e.handerAjaxBack(a)})}})}},{key:"deletePositionById",value:function(e){var t=this;this.handerShowDel(function(){_.default.deleteUserStaffing(e).then(function(e){var a=e.data;t.handerAjaxBack(a)})})}},{key:"render",value:function(){var e=this.props,t=e.userStaffing,a=t.list,l=t.searchParam,u=e.structure,r=e.user.userInfo.userType,d=e.dispatch,f=this.state,s=f.visibleModify,c=f.visibleAdd,o=f.modifyTitle,v=f.callBack,h=f.initialValue,_=f.data,x=f.columns,B=u.positionStructure,C=this,w={visible:c,title:o,initialValue:h,onCancel:function(){C.save({visibleModify:!1})},callBack:v,data:_},S={visible:s,title:o,initialValue:h,onCancel:function(){C.save({visibleModify:!1})},callBack:v,data:_,structure:u,userType:r},M={rowKey:"pid",dataSource:a||[],columns:x,locale:{emptyText:"\u6682\u65e0\u6570\u636e"},pagination:!1},I=function(){d({type:"userStaffing/getList"})},A=function(e,t){l[e]=t,d({type:"userStaffing/save",payload:{searchParam:l}})},O="";return y.default.isEmpty(B)||(O=B.map(function(e){return p.default.createElement(b,{value:e.id,key:e.id},e.name)})),p.default.createElement("div",{className:g.default.contentStyle},p.default.createElement("div",{className:g.default.searchBox},p.default.createElement("div",{className:g.default.searchItemBox+" clearfix"},p.default.createElement("div",{className:g.default.searchItem},p.default.createElement("span",null,"\u5458\u5de5\u624b\u673a\uff1a"),p.default.createElement(m.default,{value:l.pid||"",style:{width:120},onChange:function(e){A("pid",e)}},p.default.createElement(b,{value:""},"\u5168\u90e8"),O)),p.default.createElement("div",{className:g.default.searchItem},p.default.createElement(i.default,{type:"primary",onClick:I,style:{marginRight:"15px"}},"\u67e5\u8be2")))),p.default.createElement("div",{className:g.default.addBtnBox},p.default.createElement(i.default,{type:"primary",size:"large",onClick:function(){C.handerAdd()},style:{width:"140px"}},"\u6dfb\u52a0")),p.default.createElement("div",null,p.default.createElement(n.default,M)),p.default.createElement("div",null,p.default.createElement(E.default,w),p.default.createElement(k.default,S)))}}]),t}(p.default.Component),C=(0,h.connect)(function(e){var t=e.userStaffing,a=e.structure,l=e.user;return{userStaffing:t,structure:a,user:l}})(B);t.default=C},jV50:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var n=l(a("kLXV")),i=l(a("pVnL"));a("giR+");var u=l(a("fyUT")),r=l(a("lwsE")),d=l(a("W8MJ")),f=l(a("a1gu")),s=l(a("Nsbk")),c=l(a("7W2i"));a("y8nQ");var o=l(a("Vl3Y")),m=l(a("q1tI")),v=o.default.Item,p=function(e){function t(){var e,a;(0,r.default)(this,t);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return a=(0,f.default)(this,(e=(0,s.default)(t)).call.apply(e,[this].concat(n))),a.state={},a}return(0,c.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,l=e.callBack,r=e.title,d=e.data.num,f=e.form,s=f.getFieldDecorator,c=f.validateFields,o={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},p=function(e){e.preventDefault(),c(function(e,t){e||l(t)})};return m.default.createElement(n.default,{title:r,width:600,destroyOnClose:!0,visible:t,centered:!0,onOk:p,onCancel:a},m.default.createElement("div",null,m.default.createElement("form",null,m.default.createElement(v,(0,i.default)({},o,{label:"\u4eba\u6570"}),s("num",{rules:[{required:!0,message:"\u8bf7\u8f93\u4eba\u6570"}],initialValue:d})(m.default.createElement(u.default,{min:1,max:1e4}))))))}}]),t}(m.default.Component),h=o.default.create()(p);t.default=h},mp9z:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("giR+");var n=l(a("fyUT")),i=l(a("pVnL")),u=l(a("lwsE")),r=l(a("W8MJ")),d=l(a("a1gu")),f=l(a("Nsbk")),s=l(a("7W2i"));a("2qtc");var c=l(a("kLXV"));a("OaEy");var o=l(a("2fM7"));a("y8nQ");var m=l(a("Vl3Y")),v=l(a("q1tI")),p=l(a("IOgL")),h=m.default.Item,y=o.default.Option,g=(c.default.confirm,function(e){function t(){var e,a;(0,u.default)(this,t);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return a=(0,d.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(n))),a.state={},a}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,l=e.callBack,u=e.title,r=e.structure,d=e.userType,f=e.form,s=f.getFieldDecorator,m=f.validateFields,g=r.positionStructure,k={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},E=function(e){e.preventDefault(),m(function(e,t){if(!e){var a=t.guishu,n="",i="",u="";_.isArray(a)&&(u=_.last(_.last(a).split(".")),"2"===a[0]?i=u:n=u,_.assign(t,{oid:i,sid:n})),delete t.guishu,l(t)}})},x="";_.isEmpty(g)||(x=g.map(function(e){return v.default.createElement(y,{value:e.id,key:e.id},e.name)}));var b={structure:r,userType:d,onChange:function(){},getPopupContainerId:"js_sele_designate_department",cascaderConfig:{changeOnSelect:!1}};return v.default.createElement(c.default,{title:u,width:600,destroyOnClose:!0,visible:t,centered:!0,onOk:E,onCancel:a},v.default.createElement("div",null,v.default.createElement("div",{id:"js_sele_designate_department"}),v.default.createElement("form",null,v.default.createElement(h,(0,i.default)({},k,{label:"\u90e8\u95e8"}),s("guishu",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5c97\u4f4d"}]})(v.default.createElement(p.default,b))),v.default.createElement(h,(0,i.default)({},k,{label:"\u5c97\u4f4d"}),s("pid",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5c97\u4f4d"}]})(v.default.createElement(o.default,{placeholder:"\u8bf7\u9009\u62e9\u5c97\u4f4d"},x))),v.default.createElement(h,(0,i.default)({},k,{label:"\u4eba\u6570"}),s("num",{rules:[{required:!0,message:"\u8bf7\u8f93\u4eba\u6570"}]})(v.default.createElement(n.default,{min:1,max:1e4}))))))}}]),t}(v.default.Component)),k=m.default.create()(g);t.default=k}}]);