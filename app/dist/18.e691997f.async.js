(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{P7O7:function(e,t,a){e.exports={"text-overflow":"text-overflow___1gYPN",clearfix:"clearfix___3poi1",fl:"fl___2asEV",fr:"fr___3lJsU",titleBox:"titleBox___i-ZWk",submitBtnBox:"submitBtnBox___1uqZ7",addBox:"addBox___27PDD"}},"uzl/":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("sPJy");var u=l(a("bE4q"));a("+L6B");var r=l(a("2/Rp")),n=l(a("lSNA"));a("DZo9");var d=l(a("8z0m"));a("Pwec");var f=l(a("CtXQ")),o=l(a("pVnL"));a("miYZ");var s=l(a("tsqr")),i=l(a("lwsE")),c=l(a("W8MJ")),m=l(a("a1gu")),p=l(a("Nsbk")),g=l(a("7W2i"));a("sRBo");var v=l(a("kaz8"));a("5NDa");var E=l(a("5rEg"));a("OaEy");var h=l(a("2fM7"));a("y8nQ");var y=l(a("Vl3Y")),_=l(a("q1tI")),x=l(a("P7O7")),b=l(a("mOP9")),w=l(a("LvDl")),B=l(a("3eXy")),k=l(a("usdK")),N=a("MuoO"),q=y.default.Item,D=h.default.Option,O=E.default.TextArea,A=v.default.Group,F=function(e){function t(){var e,a;(0,i.default)(this,t);for(var l=arguments.length,u=new Array(l),r=0;r<l;r++)u[r]=arguments[r];return a=(0,m.default)(this,(e=(0,p.default)(t)).call.apply(e,[this].concat(u))),a.state={tag:[{name:"\u81ea\u5b9a\u4e49",code:-1}],tagValue:""},a.normFile=function(e){return console.log("Upload event:",e),Array.isArray(e)?e:e&&e.fileList},a}return(0,g.default)(t,e),(0,c.default)(t,[{key:"UNSAFE_componentWillMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"save",value:function(e){this._isMounted&&this.setState(e)}},{key:"render",value:function(){var e=this,t=this.state,a=(t.tag,t.tagValue),l=this.props,u=l.form,i=l.handerAdd,c=l.tagTypeData,m=l.token,p=l.positionStructure,g=u.getFieldDecorator,v=this,k=function(t){t.preventDefault(),e.props.form.validateFields(function(e,t){if(!e){var a=[],l={},u=t.tags;if(w.default.forEach(t.fileFile,function(e){var t=e.response,l=w.default.get(t,"data.id");l&&a.push(l)}),"-1"===t.tags&&(u=t.tagOwn),w.default.extend(l,t,{fileId:a.join(","),pidstr:t.position.join(","),fileFile:"",tag:u,tags:"",tagOwn:""}),w.default.isEmpty(a))return s.default.error("\u4e0a\u4f20\u6587\u4ef6\u65e0\u6cd5\u6b63\u5e38\u8bfb\u53d6\uff0c\u8bf7\u5237\u65b0\u518d\u8bd5"),!1;i(l)}})},N={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},F=function(e){v.save({tagValue:w.default.toString(e)})},L="";w.default.isArray(c)&&(L=c.map(function(e,t){var a="-1",l="\u81ea\u5b9a\u4e49";return e.code&&(l=e.name,a=e.name),_.default.createElement(D,{key:a},l)}));var P="";"-1"===a&&(P=_.default.createElement(q,(0,o.default)({},N,{label:"\u81ea\u5b9a\u4e49\u8bfe\u7a0b\u4f53\u7cfb"}),g("tagOwn",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bfe\u7a0b\u4f53\u7cfb"}]})(_.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u8bfe\u7a0b\u4f53\u7cfb",autoComplete:"off",maxLength:"32"}))));var C="";if(!w.default.isEmpty(p)){var M=[];w.default.forEach(p,function(e){M.push({label:e.name,value:e.id})}),C=_.default.createElement(q,(0,o.default)({},N,{label:"\u9009\u62e9\u5c97\u4f4d"}),g("position",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5c97\u4f4d"}]})(_.default.createElement(A,{options:M})))}var S={name:"file",multiple:!0,action:B.default.addImg+"?token="+m,data:{type:6},accept:".ppt,.pptx,.mp4,.flv.avi"};return _.default.createElement("div",null,_.default.createElement("div",null,_.default.createElement(y.default,{onSubmit:k},_.default.createElement(q,(0,o.default)({},N,{label:"\u8bfe\u7a0b\u4f53\u7cfb"}),g("tags",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bfe\u7a0b\u4f53\u7cfb"}]})(_.default.createElement(h.default,{allowClear:!0,style:{width:320},placeholder:"\u8bf7\u9009\u62e9\u8bfe\u7a0b\u4f53\u7cfb",onChange:F},L))),P,C,_.default.createElement(q,(0,o.default)({},N,{label:"\u8bfe\u7a0b\u8bb2\u5e08"}),g("teacher",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bfe\u7a0b\u8bb2\u5e08"}]})(_.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u8bfe\u7a0b\u8bb2\u5e08",autoComplete:"off",maxLength:"32",style:{width:320}}))),_.default.createElement(q,(0,o.default)({},N,{label:"\u8d44\u6599\u4e0a\u4f20"}),g("fileFile",{rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u8d44\u6599"}],getValueFromEvent:v.normFile,valuePropName:"fileList"})(_.default.createElement(d.default.Dragger,S,_.default.createElement("p",{className:"ant-upload-drag-icon"},_.default.createElement(f.default,{type:"inbox"})),_.default.createElement("p",{className:"ant-upload-text"},"\u5355\u51fb\u6216\u62d6\u52a8\u6587\u4ef6\u5230\u8be5\u533a\u57df\u4e0a\u4f20"),_.default.createElement("p",{className:"ant-upload-hint"},"\u652f\u6301\u5355\u4e2a\u6216\u6279\u91cf\u4e0a\u4f20")))),_.default.createElement(q,(0,o.default)({},N,{label:"\u8bfe\u7a0b\u63cf\u8ff0"}),g("desc",{rules:[(0,n.default)({required:!0,message:"\u8bf7\u8f93\u5165\u8bfe\u7a0b\u63cf\u8ff0",min:5},"message","\u8bf7\u81f3\u5c11\u8f93\u51655\u4e2a\u5b57\u7b26")]})(_.default.createElement(O,{rows:4,maxLength:300,placeholder:"\u8bf7\u81f3\u5c11\u8f93\u51655\u4e2a\u5b57\u7b26",style:{width:420}}))),_.default.createElement("div",{className:x.default.submitBtnBox},_.default.createElement(r.default,{type:"primary",htmlType:"submit",size:"large",style:{marginRight:"24px"}},"\u6dfb\u52a0"),_.default.createElement(b.default,{to:"/course/management"},_.default.createElement(r.default,{size:"large"},"\u53d6\u6d88"))))))}}]),t}(_.default.Component),L=y.default.create()(F),P=function(e){e.dispatch;var t=e.course,a=e.user,l=e.structure.positionStructure,r=t.tagTypeData,n=a.userInfo.token,d="/course/management",f=function(e){B.default.addTrainLibrary(e).then(function(e){var t=e.data;"success"===t.msg?(s.default.success("\u4e0a\u4f20\u6210\u529f"),k.default.push({pathname:d})):s.default.error(t.msg)})},o={tagTypeData:r,handerAdd:f,token:n,positionStructure:l};return _.default.createElement("div",null,_.default.createElement("div",{style:{paddingBottom:"12px"}},_.default.createElement(u.default,null,_.default.createElement(u.default.Item,null,_.default.createElement(b.default,{to:d},"\u8bfe\u7a0b\u7ba1\u7406")),_.default.createElement(u.default.Item,null,"\u8bfe\u7a0b\u6dfb\u52a0"))),_.default.createElement("div",{className:x.default.addBox},_.default.createElement("div",{className:x.default.titleBox},"\u6dfb\u52a0\u8bfe\u7a0b"),_.default.createElement(L,o)))},C=(0,N.connect)(function(e){var t=e.course,a=e.user,l=e.structure;return{course:t,user:a,structure:l}})(P);t.default=C}}]);