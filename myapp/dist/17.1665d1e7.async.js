(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"F21+":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=l(a("pVnL"));a("y8nQ");var i=l(a("Vl3Y"));a("5NDa");var o=l(a("5rEg")),s=a("Kvkj"),d=o.default.TextArea,u=i.default.Item,m={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},c=e=>{var t=e.form,a=e.modalProps,l=a.visible,o=a.handerclose,c=a.confirmLoading,f=a.handerSubmit,p=a.orderItem,v=t.getFieldDecorator,b=p.name,E=p.mobile,h=p.mobileRegion,y=p.serviceTypeDesc,g={title:"\u5173\u95ed\u4ea4\u6613\u8ba2\u5355",visible:l,onCancel:o,form:t,confirmLoading:c,width:600,onOk(e){f(e)}};return n.default.createElement(s.EnhanceModal,g,n.default.createElement(i.default,null,n.default.createElement(u,(0,r.default)({},m,{label:"\u5546\u54c1\u7c7b\u578b"}),v("serviceTypeDesc")(n.default.createElement("span",null,y))),n.default.createElement(u,(0,r.default)({},m,{label:"\u771f\u5b9e\u59d3\u540d"}),v("name")(n.default.createElement("span",null,b))),n.default.createElement(u,(0,r.default)({},m,{label:"\u624b\u673a\u53f7"}),v("mobile")(n.default.createElement("span",null,"+",h," ",E))),n.default.createElement(u,(0,r.default)({},m,{label:"\u5907\u6ce8"}),v("comment",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5907\u6ce8"}]})(n.default.createElement(d,{maxLength:"500",autosize:{minRows:3,maxRows:3}})))))},f=i.default.create()(c);t.default=f},W6Kf:function(e,t,a){"use strict";var l=a("284h"),n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var r=n(a("wCAj")),i=n(a("pVnL"));a("+L6B");var o=n(a("2/Rp"));a("/zsF");var s=n(a("PArb")),d=n(a("MVZn")),u=l(a("q1tI")),m=(n(a("17x9")),a("MuoO")),c=a("Kvkj"),f=a("7Qib"),p=n(a("mOP9")),v=n(a("F21+")),b=n(a("jyuo")),E=f.TableUtils.getColumns,h={marginBottom:"24px"};class y extends u.Component{constructor(){super(...arguments),this.state={visibleClose:!1,visibleComplete:!1,orderItem:{}}}save(e){this.setState(e)}onQuery(e){this.props.dispatch({type:"businessIntention/getList",payload:e})}render(){var e=this.props,t=e.businessIntention,a=t.queryCondition,l=t.list,n=t.fields,m=t.pagination,f=e.dispatch,y=e.loading,g=e.confirmLoading,C=this.state,I=C.visibleClose,w=C.orderItem,L=C.visibleComplete,x=this,j={queryCondition:a,onSearch:e=>{this.onQuery((0,d.default)({},e,{pn:1}))},onReset:()=>{this.onQuery({pn:1})}},R=e=>{x.save({visibleClose:!0,orderItem:e})},T=e=>{x.save({visibleComplete:!0,orderItem:e})},k={visible:I,confirmLoading:g,handerclose(){x.save({visibleClose:!1})},orderItem:w,handerSubmit(e){var t=w.id,a=(0,d.default)({},e,{orderId:t});f({type:"businessIntention/setCloseIntent",payload:a})}},q={visible:L,confirmLoading:g,handerclose(){x.save({visibleComplete:!1})},orderItem:w,handerSubmit(e){var t=w.id,a=(0,d.default)({},e,{orderId:t});f({type:"businessIntention/setCompleteIntent",payload:a})}},P=[{width:150,fixed:"right",key:"operator",name:"\u64cd\u4f5c",render:(e,t)=>{var a=t.status,l="";return 10===a&&(l=u.default.createElement("div",null,u.default.createElement("a",{href:"javascript:;",onClick:()=>{T(t)}},"\u5b8c\u6210"),u.default.createElement(s.default,{type:"vertical"}),u.default.createElement("a",{href:"javascript:;",onClick:()=>{R(t)}},"\u5173\u95ed"))),u.default.createElement("div",null,l)}}],D={rowKey:"id",columns:E(n).extend(P).values(),loading:y.effects["businessIntention/getList"],dataSource:l,pagination:(0,d.default)({},m,{showTotal:e=>`\u603b\u5171 ${e} \u6761`,onChange:e=>this.onQuery({pn:e})})};return u.default.createElement("div",null,u.default.createElement(p.default,{to:"/business/intention/create"},u.default.createElement(o.default,{className:"btn-diy-size",style:h,type:"primary"},"\u521b\u5efa")),u.default.createElement(c.Filter,j),u.default.createElement(r.default,(0,i.default)({scroll:{x:1200}},D)),u.default.createElement("div",null,u.default.createElement(v.default,{modalProps:k}),u.default.createElement(b.default,{modalProps:q})))}}var g=(0,m.connect)(e=>{var t=e.businessIntention,a=e.loading;return{businessIntention:t,loading:a}})(y);t.default=g},jyuo:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=l(a("pVnL"));a("y8nQ");var i=l(a("Vl3Y"));a("5NDa");var o=l(a("5rEg")),s=a("Kvkj"),d=o.default.TextArea,u=i.default.Item,m={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:15}}},c=e=>{var t=e.form,a=e.modalProps,l=a.visible,o=a.handerclose,c=a.confirmLoading,f=a.handerSubmit,p=a.orderItem,v=t.getFieldDecorator,b=p.name,E=p.mobileRegion,h=p.mobile,y=p.serviceTypeDesc,g={title:"\u8bf7\u786e\u8ba4\u8be5\u610f\u5411\u8ba2\u5355\u76f8\u5173\u4fe1\u606f",visible:l,onCancel:o,form:t,confirmLoading:c,width:600,onOk(e){f(e)}};return n.default.createElement(s.EnhanceModal,g,n.default.createElement(i.default,null,n.default.createElement(u,(0,r.default)({},m,{label:"\u5546\u54c1\u7c7b\u578b"}),v("serviceTypeDesc")(n.default.createElement("span",null,y))),n.default.createElement(u,(0,r.default)({},m,{label:"\u771f\u5b9e\u59d3\u540d"}),v("name")(n.default.createElement("span",null,b))),n.default.createElement(u,(0,r.default)({},m,{label:"\u624b\u673a\u53f7"}),v("mobile")(n.default.createElement("span",null,"+",E," ",h))),n.default.createElement(u,(0,r.default)({},m,{label:"\u5907\u6ce8"}),v("comment")(n.default.createElement(d,{maxLength:"500",autosize:{minRows:3,maxRows:5}})))))},f=i.default.create()(c);t.default=f}}]);