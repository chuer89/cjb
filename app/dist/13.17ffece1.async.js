(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"7c/T":function(e,a,t){"use strict";var l=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("+L6B");var r=l(t("2/Rp")),n=l(t("pVnL"));t("5NDa");var o=l(t("5rEg"));t("y8nQ");var d=l(t("Vl3Y")),s=l(t("q1tI")),f=t("MuoO"),u=l(t("bIAp")),i=l(t("mOP9")),m=d.default.Item;class c extends s.default.Component{constructor(){super(...arguments),this.state={}}render(){var e=this.props,a=e.dispatch,t=e.form,l=t.getFieldDecorator,d=t.validateFieldsAndScroll,f=()=>{d((e,t)=>{e||a({type:"user/register",payload:t})})},c={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},p=[{label:"\u7528\u6237\u540d",key:"username",maxLen:32},{label:"\u5bc6\u7801",key:"password",maxLen:32,type:"password"},{label:"\u624b\u673a\u53f7",key:"phone",maxLen:11},{label:"\u4f01\u4e1a\u540d\u79f0",key:"ename",maxLen:32},{label:"\u4f01\u4e1a\u5730\u5740",key:"address",maxLen:128},{label:"\u4f01\u4e1a\u8d1f\u8d23\u4eba",key:"director",maxLen:32},{label:"\u4f01\u4e1a\u6cd5\u4eba",key:"legal",maxLen:32},{label:"\u8d1f\u8d23\u4eba\u7535\u8bdd",key:"responsiblePhone",maxLen:11}],_=p.map((e,a)=>{return s.default.createElement(m,(0,n.default)({key:a,hasFeedback:!0},c,{label:e.label}),l(e.key,{rules:[{required:!0,message:"\u8bf7\u8f93\u5165"+e.label}]})(s.default.createElement(o.default,{size:"large",maxLength:32,type:e.type||"text",autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165"+e.label})))});return s.default.createElement("div",null,s.default.createElement("div",{className:u.default.form},s.default.createElement("div",{className:u.default.titleBox},s.default.createElement("h1",{className:u.default.title},"\u6ce8\u518c\u9910\u5320\u4f01\u4e1a\u8d26\u53f7")),s.default.createElement("form",null,_,s.default.createElement("div",{className:u.default.operateBox},s.default.createElement(r.default,{type:"primary",size:"large",className:u.default.registerBtn,onClick:f,loading:!1},"\u6ce8\u518c"),s.default.createElement(i.default,{to:"/login"},"\u53bb\u767b\u5f55")))))}}var p=(0,f.connect)(e=>{var a=e.loading;return{loading:a}})(d.default.create()(c));a.default=p},bIAp:function(e,a,t){e.exports={"text-overflow":"text-overflow___186fz",clearfix:"clearfix___3zaTj",fl:"fl___ZJrnt",fr:"fr___fC_Xg",titleBox:"titleBox___55qY3",title:"title___1unl_",form:"form___3H87G",operateBox:"operateBox___1jNoG",registerBtn:"registerBtn___jIaP1"}}}]);