(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{lci7:function(e,t,a){"use strict";var d=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("sPJy");var r=d(a("bE4q"));a("miYZ");var s=d(a("tsqr"));a("Znn+");var l=d(a("ZTPi")),n=d(a("q1tI")),u=a("MuoO"),i=d(a("mOP9")),o=d(a("LvDl")),c=d(a("3eXy")),p=d(a("usdK")),f=d(a("w1JU")),m=d(a("wCiI")),y=d(a("FPa0")),v=d(a("uSOS")),b=d(a("eu3l")),h=l.default.TabPane;class g extends n.default.Component{constructor(e){super(e),this.state={isInitCheck:!0}}render(){var e=this.props,t=e.editUser,a=e.dispatch,d=e.app,u=e.user,g=t.personalDisabled,D=t.basicDisabled,U=t.experienceDisabled,E=t.twoDepartmentData,k=t.portrayalDisabled,I=t.activeTabsKey,x=t.userParam,P=t.uid,T=t.positionData,w=t.userWork,K=t.userDetails,N=t.portrayalImg,C=t.departmentType,B=d.defaultImg,J=u.userInfo.token,O=this,S=this.state.isInitCheck,W=e=>{a({type:"editUser/save",payload:{activeTabsKey:e}})};if(S){var q=K.orgId;C="1",q&&(C="2")}var Z={departmentType:C,userDetails:K,handerChange(e){O.setState({isInitCheck:!1}),a({type:"editUser/save",payload:{departmentType:e}})},handerNext(e){var t=e.storeId;o.default.extend(x,e),a({type:"editUser/save",payload:{personalDisabled:!1,activeTabsKey:"1",userParam:x}}),"1"===C&&t&&(a({type:"editUser/getPosition"}),a({type:"editUser/getTwoDepartmentBySid",payload:{sid:t}}))}},j={userDetails:K,handerNext(e){o.default.extend(x,e),a({type:"editUser/save",payload:{activeTabsKey:"2",userParam:x,basicDisabled:!1}})}},M={userDetails:K,positionData:T,twoDepartmentData:E,handerNext(e){o.default.extend(x,e,{contractDate:"",id:P}),c.default.updateUser(x).then(e=>{var t=e.data;"success"===t.msg?(a({type:"editUser/save",payload:{experienceDisabled:!1,activeTabsKey:"3"}}),a({type:"editUser/getUserWorkByUid"})):s.default.error(t.msg)})}},_={userWork:w,handerNext(e){o.default.forEach(e,e=>{e.uid=P}),c.default.addUserWork({jsondata:JSON.stringify(e)}).then(e=>{var t=e.data;"success"===t.msg?(a({type:"editUser/save",payload:{portrayalDisabled:!1,activeTabsKey:"4"}}),a({type:"editUser/getUserPortrayalByUid"})):s.default.error(t.msg)})},handerDel(e){c.default.deleteUserWorkById({ids:JSON.stringify([e])}).then(e=>{var t=e.data;"success"===t.msg||s.default.error(t.msg)})}},F={action:c.default.addImg+"?token="+J,defaultImg:B,portrayalImg:N,handerNext(e){o.default.extend(e,{uid:P}),c.default.addUserPortrayal(e).then(e=>{var t=e.data;"success"===t.msg?(s.default.success("\u5458\u5de5\u4fee\u6539\u6210\u529f"),p.default.push({pathname:"/personnel/record"})):s.default.error(t.msg)})}};return n.default.createElement("div",null,n.default.createElement("div",{style:{paddingBottom:"12px"}},n.default.createElement(r.default,null,n.default.createElement(r.default.Item,null,n.default.createElement(i.default,{to:"/personnel/record"},"\u5458\u5de5\u6863\u6848")),n.default.createElement(r.default.Item,null,"\u7f16\u8f91\u7528\u6237"))),n.default.createElement("div",{className:"contentBox"},n.default.createElement(l.default,{activeKey:I,tabPosition:"left",onChange:W},n.default.createElement(h,{tab:"\u5f52\u5c5e\u90e8\u95e8",key:"0"},n.default.createElement(f.default,Z)),n.default.createElement(h,{tab:"\u4e2a\u4eba\u4fe1\u606f",disabled:g,key:"1"},n.default.createElement(m.default,j)),n.default.createElement(h,{tab:"\u57fa\u672c\u4fe1\u606f",disabled:D,key:"2"},n.default.createElement(y.default,M)),n.default.createElement(h,{tab:"\u5de5\u4f5c\u7ecf\u5386",disabled:U,key:"3"},n.default.createElement(v.default,_)),n.default.createElement(h,{tab:"\u5458\u5de5\u753b\u50cf",disabled:k,key:"4"},n.default.createElement(b.default,F)))))}}var D=(0,u.connect)(e=>{var t=e.editUser,a=e.app,d=e.user;return{editUser:t,app:a,user:d}})(g);t.default=D}}]);