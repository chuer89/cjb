(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"17gZ":function(e,t,n){e.exports={"text-overflow":"text-overflow___22nSL",clearfix:"clearfix___1yLZs",fl:"fl___341UI",fr:"fr___34Mg6",contentBox:"contentBox___1k774",menusBox:"menusBox___Cz1Tj",itemMenus:"itemMenus___1j-0A"}},"3gL6":function(e,t,n){e.exports={"text-overflow":"text-overflow___1bjED",clearfix:"clearfix___1jSOW",fl:"fl___27UBk",fr:"fr___16ihH",content:"content___6QaF4"}},J0fQ:function(e,t,n){"use strict";var a=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("2qtc");var l=a(n("kLXV"));n("sRBo");var u=a(n("kaz8"));n("miYZ");var i=a(n("tsqr")),r=a(n("lwsE")),d=a(n("W8MJ")),o=a(n("a1gu")),f=a(n("Nsbk")),s=a(n("7W2i"));n("Znn+");var c=a(n("ZTPi")),v=a(n("q1tI")),m=a(n("17gZ")),h=a(n("LvDl")),y=a(n("3eXy")),p=c.default.TabPane,g=function(e){function t(e){var n;return(0,r.default)(this,t),n=(0,o.default)(this,(0,f.default)(t).call(this,e)),n.state={},n}return(0,s.default)(t,e),(0,d.default)(t,[{key:"UNSAFE_componentWillMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"save",value:function(e){this._isMounted&&this.setState(e)}},{key:"handerAdd",value:function(e){var t=this.props.handerAdd;y.default.addEnterpriseOrgMenu(e).then(function(e){var n=e.data;"success"===n.msg?t(n.data):i.default.error(n.msg)})}},{key:"handerDel",value:function(e){y.default.deleteEnterpriseOrgMenuById(e).then(function(e){var t=e.data;"success"===t.msg||i.default.error(t.msg)})}},{key:"render",value:function(){var e=this.props,t=e.user,n=e.visible,a=e.onCancel,i=e.orgIndex,r=e.enteryConfigMenus,d=t.menus,o=this,f="",s="",y="";return h.default.isEmpty(d)||(y=""+d[0].id,s=d.map(function(e){var t="";return h.default.isEmpty(e.tree)||(t=e.tree.map(function(e){var t=e.id,n=e.index,a=r[t]||{},l=!!a.id,d=function(e){var l=e.target.checked;l?o.handerAdd({mid:t,orgIndex:i,mindex:n}):o.handerDel({id:a.id})};return v.default.createElement("div",{key:e.id,className:m.default.itemMenus},v.default.createElement(u.default,{defaultChecked:l,onChange:d},e.name))})),v.default.createElement(p,{tab:e.name,key:e.id},v.default.createElement("div",{className:m.default.menusBox,style:{overflow:"hidden"}},t))}),f=v.default.createElement(c.default,{defaultActiveKey:y},s)),v.default.createElement(l.default,{title:"\u5458\u5de5\u83dc\u5355\u6743\u9650\u914d\u7f6e",width:600,destroyOnClose:!0,visible:n,footer:null,onCancel:a},v.default.createElement("div",{className:m.default.contentBox},f))}}]),t}(v.default.Component),_=g;t.default=_},kXTr:function(e,t,n){"use strict";var a=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("miYZ");var l=a(n("tsqr")),u=a(n("lwsE")),i=a(n("W8MJ")),r=a(n("a1gu")),d=a(n("Nsbk")),o=a(n("7W2i")),f=a(n("q1tI")),s=n("MuoO"),c=a(n("3gL6")),v=a(n("u5SJ")),m=a(n("3eXy")),h=a(n("J0fQ")),y=function(e){function t(){var e,n;(0,u.default)(this,t);for(var a=arguments.length,l=new Array(a),i=0;i<a;i++)l[i]=arguments[i];return n=(0,r.default)(this,(e=(0,d.default)(t)).call.apply(e,[this].concat(l))),n.state={visibleConfigMenus:!1,orgIndex:"",enteryConfigMenus:[]},n}return(0,o.default)(t,e),(0,i.default)(t,[{key:"UNSAFE_componentWillMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"save",value:function(e){this._isMounted&&this.setState(e)}},{key:"render",value:function(){var e=this.props.user,t=this.state,n=t.visibleConfigMenus,a=t.orgIndex,u=t.enteryConfigMenus,i=this,r=function(e){m.default.getEnterpriseOrgMenuByOrgId({orgIndex:e}).then(function(t){var n=t.data;if("success"===n.msg){var a={},u=n.data;_.forEach(u,function(e){a[e.mid]=e}),i.save({visibleConfigMenus:!0,orgIndex:e,enteryConfigMenus:a})}else l.default.error(n.msg)})},d={user:e,visible:n,orgIndex:a,enteryConfigMenus:u,handerAdd:function(e){u[e.mid]=e,i.save({enteryConfigMenus:u})},onCancel:function(){i.save({visibleConfigMenus:!1})}};return f.default.createElement("div",null,f.default.createElement("div",{className:c.default.content},f.default.createElement(v.default,{openConfigMenus:r})),f.default.createElement("div",null,f.default.createElement(h.default,d)))}}]),t}(f.default.Component),p=(0,s.connect)(function(e){var t=e.structure,n=e.user;return{structure:t,user:n}})(y);t.default=p},u5SJ:function(e,t,n){"use strict";var a=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("14J3");var l=a(n("BMrR"));n("+L6B");var u=a(n("2/Rp"));n("jCWc");var i=a(n("kPKH"));n("5NDa");var r=a(n("5rEg"));n("miYZ");var d=a(n("tsqr")),o=a(n("lwsE")),f=a(n("W8MJ")),s=a(n("a1gu")),c=a(n("Nsbk")),v=a(n("7W2i"));n("2qtc");var m=a(n("kLXV")),h=a(n("q1tI")),y=n("MuoO"),p=a(n("CgQ8")),g=a(n("LvDl")),_=a(n("3eXy")),k=a(n("z4VA")),E=m.default.confirm,M=function(e){function t(){var e,n;(0,o.default)(this,t);for(var a=arguments.length,l=new Array(a),u=0;u<a;u++)l[u]=arguments[u];return n=(0,s.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(l))),n.state={valueInput:"",visibleModify:!1,modifyTitle:"",modifyLabel:"",callBack:function(){},initialValue:""},n}return(0,v.default)(t,e),(0,f.default)(t,[{key:"UNSAFE_componentWillMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"save",value:function(e){this._isMounted&&this.setState(e)}},{key:"handerOpenModify",value:function(e){g.default.extend(e,{visibleModify:!0}),this.save(e)}},{key:"handerCloseModify",value:function(){this.save({visibleModify:!1})}},{key:"handerAjaxBack",value:function(e){var t=this.props.dispatch,n=this;"success"===e.msg?(n.handerCloseModify(),d.default.success("\u64cd\u4f5c\u6210\u529f"),t({type:"structure/getUserOrganizations"})):d.default.error(e.msg)}},{key:"handerShowDel",value:function(e){E({title:"\u786e\u5b9a\u5220\u9664\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e()},onCancel:function(){}})}},{key:"handerModifySection",value:function(e,t){var n=this;this.handerOpenModify({modifyTitle:"\u4fee\u6539\u90e8\u95e8",modifyLabel:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0",initialValue:t,callBack:function(t){var a={id:e,name:t};_.default.editEnterpriseOrgInfoById(a).then(function(e){var t=e.data;n.handerAjaxBack(t)})}})}},{key:"deleteEnterpriseOrgInfoById",value:function(e){var t=this;this.handerShowDel(function(){_.default.deleteEnterpriseOrgInfoById({id:e}).then(function(e){var n=e.data;t.handerAjaxBack(n)})})}},{key:"render",value:function(){var e=this,t=this.props,n=t.structure,a=t.openConfigMenus,o=n.sectionStructure,f=this.state,s=f.visibleModify,c=f.modifyTitle,v=f.modifyLabel,m=f.callBack,y=f.initialValue,E=f.valueInput,M=function(t){var n=t.target.value;e.save({valueInput:n})},x=function(){if(!E)return d.default.error("\u8bf7\u586b\u5199\u90e8\u95e8\u540d\u79f0"),!1;_.default.addEnterpriseOrgInfo({name:E,parentId:-1}).then(function(t){var n=t.data;"success"===n.msg&&e.save({valueInput:""}),e.handerAjaxBack(n)})},C="";g.default.isEmpty(o)||(C=o.map(function(t,n){return h.default.createElement("div",{key:n,className:p.default.areaBox},h.default.createElement("div",{className:p.default.titleBox},h.default.createElement("div",{className:p.default.title},h.default.createElement("i",{className:"iconfont"},"\ue639"),t.name),h.default.createElement("div",{className:p.default.operateBox},h.default.createElement("span",{onClick:function(e){a(t.index)}},"\u914d\u7f6e\u83dc\u5355"),h.default.createElement("span",{onClick:function(n){e.handerModifySection(t.id)}},"\u7f16\u8f91"),h.default.createElement("span",{onClick:function(n){e.deleteEnterpriseOrgInfoById(t.id)}},"\u5220\u9664"))))}));var B={visible:s,title:c,inputLabel:v,initialValue:y,onCancel:function(){e.save({visibleModify:!1})},callBack:m};return h.default.createElement("div",null,h.default.createElement("div",null,h.default.createElement(k.default,B)),h.default.createElement("div",{className:p.default.addBtnBox},h.default.createElement(l.default,null,h.default.createElement(i.default,{span:9},h.default.createElement(r.default,{value:E,onChange:M,onPressEnter:x,autoComplete:"off",placeholder:"\u586b\u5199\u90e8\u95e8\u540d\u79f0"})),h.default.createElement(i.default,{span:4,style:{paddingLeft:"24px"}},h.default.createElement(u.default,{type:"primary",onClick:x,loading:!1},"\u6dfb\u52a0")))),h.default.createElement("div",null,C))}}]),t}(h.default.Component),x=(0,y.connect)(function(e){var t=e.structure;return{structure:t}})(M);t.default=x}}]);