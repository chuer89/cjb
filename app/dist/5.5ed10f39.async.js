(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{PUTc:function(e,t,A){e.exports={"text-overflow":"text-overflow___gMtuR",clearfix:"clearfix___1qaSH",fl:"fl___SqLjl",fr:"fr___2v7j7",logo:"logo___DN8vc",headerBox:"headerBox___Qn-gt",headerItem:"headerItem___3ZBCe",userHeader:"userHeader___V_0h4",userInfo:"userInfo___3U1NL",trigger:"trigger___TZalZ",logout:"logout___6xx4N",menusIconFont:"menusIconFont___s1BmJ"}},aArQ:function(e,t,A){"use strict";var l=A("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,A("Ksrn");var a=l(A("MR/8"));A("4eJr");var u=l(A("3LgI"));A("Q9mQ");var r=l(A("diRs"));A("lUTK");var n=l(A("BvKs"));A("Pwec");var d=l(A("CtXQ"));A("B9cy");var f=l(A("Ol7k")),s=A("MuoO"),o=l(A("q1tI")),c=l(A("PUTc")),i=l(A("mOP9")),m=l(A("IOgL")),v=l(A("LvDl")),p=l(A("xc/l"));A("XDpg");var P=A("TJpk"),w=f.default.Header,g=f.default.Content,h=f.default.Footer,E=f.default.Sider;class y extends o.default.Component{constructor(){super(...arguments),this.state={collapsed:!1,defaultSelectedKeys:["/personnel/workbench"],selectedKeys:[],defaultSelectedKeysNav:["user-console"],selectedKeysNav:[],deptData:[]},this.onCollapse=(e=>{console.log(e),this.setState({collapsed:e})})}componentWillUnmount(){this._isMounted=!1}save(e){this._isMounted&&this.setState(e)}render(){var e=this.props,t=e.children,l=e.app,s=e.user,y=e.structure,B=document.body.clientHeight-64-60,_=this.state,j=_.collapsed,H=_.defaultSelectedKeys,D=_.defaultSelectedKeysNav,I=l.moduleName,O=l.pathname,x=s.userInfo,L=s.dept,b=s.myMenus,C=x.userType,T=[O]||H,z=[I]||D,K=v.default.findIndex(b,{key:I}),k=[];b[K]&&(k=b[K].children);var Q=k.map(e=>{var t=o.default.createElement(d.default,{type:e.icon});return e.isFont&&(t=o.default.createElement("i",{className:"iconfont "+c.default.menusIconFont,dangerouslySetInnerHTML:{__html:e.icon}})),o.default.createElement(n.default.Item,{key:e.path},o.default.createElement(i.default,{to:e.path},t,o.default.createElement("span",null,e.name)))}),N={padding:24,minHeight:B},S=o.default.createElement("div",null,o.default.createElement("div",{className:c.default.logout},o.default.createElement(i.default,{to:"/login"},o.default.createElement(d.default,{type:"logout",theme:"outlined"}),"\u9000\u51fa"))),X=b.map((e,t)=>{return o.default.createElement(n.default.Item,{key:e.key},o.default.createElement(i.default,{to:e.path},e.name))}),G=e=>{var t=v.default.last(e);localStorage.setItem("dept",t),window.location.reload()},M=[],U=[];L&&(U=L.split("."),v.default.forEach(U,e=>{var t=v.default.last(M)||"";M.push((t&&t+".")+e)}));var F={structure:y,userType:C,onChange:G,defaultValue:M},Z="";return 1!==C&&(Z=o.default.createElement("div",{className:c.default.headerItem,style:{margin:"0 28px 0 28px"}},o.default.createElement(m.default,F))),o.default.createElement(a.default,{locale:p.default},o.default.createElement(f.default,null,o.default.createElement(P.Helmet,null,o.default.createElement("link",{rel:"shortcut icon",href:A("bpwf")})),o.default.createElement(w,{className:c.default.headerBox},o.default.createElement("div",{className:c.default.headerItem},o.default.createElement("div",{className:c.default.logo},o.default.createElement("img",{src:A("zwU1"),alt:""}),o.default.createElement("span",null,"\u9910\u5320\u5e2e\u8fd0\u8425\u7cfb\u7edf"))),Z,o.default.createElement("div",{className:c.default.headerItem},o.default.createElement(n.default,{theme:"dark",mode:"horizontal",selectedKeys:z,style:{lineHeight:"64px"}},X)),o.default.createElement("div",{style:{float:"right"}},o.default.createElement(r.default,{content:S,placement:"bottomRight"},o.default.createElement("span",{className:c.default.userInfo},o.default.createElement(d.default,{type:"user"}),o.default.createElement("span",null,x.username||""))))),o.default.createElement(f.default,{style:{paddingTop:"65px"}},o.default.createElement(E,{theme:"light",collapsible:!0,collapsed:j,onCollapse:this.onCollapse,style:{position:"fixed",height:"90vh"}},o.default.createElement(n.default,{mode:"inline",selectedKeys:T},Q)),o.default.createElement(f.default,{style:{marginLeft:j?"80px":"200px"}},o.default.createElement(g,{style:N},t,o.default.createElement(u.default,null)),o.default.createElement(h,{style:{textAlign:"center"}},"\u9910\u5320\u5e2e \xa92018")))))}}var B=e=>{var t=e.app,A=e.user,l=e.structure,a=e.location,u=e.children,r={app:t,user:A,structure:l,children:u},n=a.pathname,d=o.default.createElement(y,r);return"/login"!==n&&"/register"!==n&&"/initstructure"!==n&&"/404"!==n||(d=o.default.createElement("div",null,u)),o.default.createElement("div",null,d)},_=(0,s.connect)(e=>{var t=e.app,A=e.user,l=e.structure;return{app:t,user:A,structure:l}})(B);t.default=_},bpwf:function(e,t){e.exports="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAADMzPn/Kyvn/wAA4/8GBuP/Bwfj/wAA4v8AAOD/AADg/wAA4f8AAOH/AQHi/wgI4/8GBuP/AADj/yws5//Ozvn/Li7n/wAA4f8HB+P/BATj/wAA4f8vL+j/f3/x/6Ki9f+RkfP/aGju/yEh5v8AAOH/Bgbj/wYG4/8AAOH/Ly/n/wQE4/8HB+P/AQHi/w8P5P+urvb/5OT8/6Oj9f9wcO//09P6/+3t/f/g4Pz/iory/wIC4v8DA+P/Bgbj/wUF4/8GBuP/AQHj/w8P5P/b2/v/pKT1/wsL5P8CAuH/AADf/7W19v+cnPT/AwPj/+Dg/P+3t/f/AgLj/wMD4/8GBuP/Bgbj/wAA4f+ysvb/kJDz/wAA3/8EBOL/Cgrk/wAA4P+6uvf/pqb1/wAA3v+mpvT//////1dX7P8AAOL/CAjj/wAA4v89Pen/1tb6/zU16P8MDOT/NDTo/xkZ5f8sLOf/urr3/6Ki9f8AAN//vr74/4iI8v8AAOH/CAjj/wUF4/8AAOD/j4/y/4qK8v+rq/X/UlLs/7e39/9JSev/p6f1/8PD+P+goPT/AADf/76++P+Li/L/AADh/wgI4/8FBeP/AADh/7Ky9v9YWOz/dXXw/8HB+P+Pj/L/u7v3/4CA8f+6uvf/nZ3z/wAA3P+5uff/g4Pw/wAA3v8ICOP/BQXj/wAA4f+zs/b/Vlbs/1RU7P/e3vv/iory/6Cg9P+VlfP/srL2/+np/f+goPT/6ur9/9bW+v+Pj/L/DQ3k/wIC4/8AAOD/j4/z/4mJ8v9ZWez/19f7/4SE8f+4uPf/j4/z/6+v9v/k5Pz/i4vy/4iI8v+Pj/P/gYHx/wYG4/8EBOP/AADi/z096f/X1/v/Cgrj/x0d5v8KCuT/Fhbl/wAA4v+0tPf/p6fz/wAA3P8EBOD/AADf/wAA4P8EBOP/BQXj/wYG4/8AAOH/srL2/5mZ9P8AAN//BQXj/wgI5P8AAOH/rKz2//f3/v+trfb/paX1/8HB+P9eXu3/AADi/wcH4/8GBuP/AQHj/w8P5P/Z2fv/paX1/wkJ4/8AAOH/AADg/zo66P9mZu7/nZ30//////++vvj/ExPl/wEB4/8HB+P/BATj/wcH4/8BAeL/Dw/k/66u9v/k5Pz/oaH1/3l58P9xce//mpr0/9LS+v9+fvH/AQHi/wIC4v8GBuP/BQXj/y4u5/8AAOH/Bwfj/wQE4/8AAOH/Ly/o/39/8f+goPT/oKD0/3h48P8jI+b/AADh/wYG4/8HB+P/AADh/y8v5//MzPn/Kyvn/wAA4/8GBuP/Bwfj/wAA4v8AAOD/AADg/wAA4P8AAOD/AQHi/wgI4/8GBuP/AADj/yws5//Ozvn/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="}}]);