(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"Ldz/":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var r=l(a("wCAj"));a("5NDa");var d=l(a("5rEg"));a("/zsF");var n=l(a("PArb"));a("+L6B");var o=l(a("2/Rp"));a("miYZ");var s=l(a("tsqr"));a("2qtc");var c=l(a("kLXV"));a("OaEy");var u=l(a("2fM7")),p=l(a("q1tI")),f=a("MuoO"),i=l(a("iH12")),m=l(a("mOP9")),v=l(a("LvDl")),h=l(a("wd/R")),E=l(a("3eXy")),y=a("0fvF"),g=u.default.Option,_=c.default.confirm,x=e=>{var t=e.addFile,a=e.token,l=E.default.importUser+"?token="+a,r=()=>{location.reload()};return p.default.createElement(y.Uploader,{request:{fileName:"file",url:l,method:"POST",withCredentials:!1},onError:e=>{e.error;s.default.error("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",r)},onComplete:e=>{var a=e.response,l=a.msg,d=a.data;"success"===l?(s.default.success("\u5bfc\u5165\u6210\u529f"),t(d)):s.default.error(l,r)},uploadOnSelection:!0},e=>{var t=e.onFiles,a=e.progress,l=e.complete,r=!1;return a&&!l&&(r=!0),p.default.createElement(y.UploadField,{onFiles:e=>{v.default.isEmpty(e)||(e[0].size<5242880?t(e):s.default.error("\u6587\u4ef6\u6700\u59275M\uff0c\u8bf7\u538b\u7f29\u6587\u4ef6\u5927\u5c0f"))},uploadProps:{accept:".xlsx,.xls,.xlt"}},p.default.createElement(o.default,{loading:r,type:"primary",icon:"usergroup-add"},"\u6279\u91cf\u6dfb\u52a0"))})};class k extends p.default.Component{constructor(e){super(e),this.state={statusDataSele:{},contractTypeSele:{},warningSele:{0:"\u6b63\u5e38",1:"\u8eab\u4efd\u8bc1",2:"\u5065\u5eb7\u8bc1",3:"\u52b3\u52a8\u5408\u540c"},columns:[]}}UNSAFE_componentWillMount(){this._isMounted=!0;var e=this.props.record,t=e.statusData,a=e.contractType,l=(this.state.warningSele,this),r={};v.default.forEach(t,e=>{r[""+e.code]=e.value});var d={};v.default.forEach(a,e=>{d[""+e.code]=e.value});var n=[{title:"\u5de5\u53f7",dataIndex:"code"},{title:"\u59d3\u540d",dataIndex:"name"},{title:"\u72b6\u6001",dataIndex:"status",render:e=>{return p.default.createElement("div",null,r[e]||"")}},{title:"\u5408\u4f5c\u7c7b\u578b",dataIndex:"contractType",render:e=>{return p.default.createElement("div",null,d[e]||"")}},{title:"\u5de5\u4f5c\u5e74\u9650",dataIndex:"workAge"},{title:"\u5165\u804c\u65f6\u95f4",dataIndex:"joinTime",render:e=>{return p.default.createElement("div",null,(0,h.default)(e).format("YYYY-MM-DD"))}},{title:"\u8054\u7cfb\u65b9\u5f0f",dataIndex:"phone"},{title:"\u64cd\u4f5c",key:"handle",align:"center",render(e){return l.operateRender(e)}}];this.setState({columns:n,statusDataSele:r,contractTypeSele:d})}componentWillUnmount(){this._isMounted=!1}save(e){this._isMounted&&this.setState(e)}operateRender(e){var t=this,a=this.props.dispatch,l=()=>{t.handerDel(()=>{E.default.deleteUserById({id:e.id}).then(e=>{var t=e.data;"success"===t.msg?(s.default.success("\u5220\u9664\u6210\u529f"),a({type:"record/getUserList",payload:{page:1}})):s.default.error(t.msg)})})};return p.default.createElement("div",null,p.default.createElement(m.default,{to:"/personnel/record/editUser/"+e.id,target:"_blank",className:i.default.operateBtn},"\u7f16\u8f91"),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement("span",{className:i.default.operateBtn,onClick:l},"\u5220\u9664"),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement(m.default,{target:"_blank",to:"/personnel/record/userdetails/"+e.id,className:i.default.operateBtn},"\u8be6\u60c5"))}handerDel(e){_({title:"\u786e\u5b9a\u5220\u9664\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk(){e()},onCancel(){}})}render(){var e=this.props,t=e.record,a=e.user,l=e.dispatch,n=t.dataBody,s=t.statusData,c=t.contractType,f=t.warningData,v=t.searchParam,h=t.pageSize,y=t.firstPage,_=a.dept,k=a.userInfo,w=k.token,B=(k.userType,{width:"180px"}),T=this.state.columns,I=n.records,N=n.total,U=N<=0,S=()=>{l({type:"record/getUserList",payload:{page:y}})},C=(e,t)=>{v[e]=t,l({type:"record/save",payload:{searchParam:v}})},D=()=>{l({type:"record/save",payload:{searchParam:{}}}),l({type:"record/getUserList",payload:{page:y}})},L=s.map(e=>{return p.default.createElement(g,{value:e.code,key:e.code},e.value)}),b=c.map(e=>{return p.default.createElement(g,{value:e.code,key:e.code},e.value)}),M=f.map(e=>{return p.default.createElement(g,{value:e.code,key:e.code},e.value)}),P={rowKey:"id",dataSource:I||[],columns:T,locale:{emptyText:"\u6682\u65e0\u6570\u636e"},pagination:{pageSize:h,total:N},onChange(e){var t=e.current;l({type:"record/getUserList",payload:{page:t}})}},q={token:w,addFile(){l({type:"record/getUserList",payload:{page:y}})}},F=`${E.default.exportUser}?token=${w}&type=1&dept=${_}`,O=`${E.default.exportUser}?token=${w}&type=2`;return p.default.createElement("div",null,p.default.createElement("div",{className:i.default.content},p.default.createElement("div",{className:i.default.operateTopBox},p.default.createElement(m.default,{to:"/personnel/record/addUser",target:"_blank",className:i.default.operateTopBtn},p.default.createElement(o.default,{type:"primary",icon:"user-add"},"\u6dfb\u52a0\u5458\u5de5")),p.default.createElement("a",{href:F,className:i.default.operateTopBtn,target:"_blank"},p.default.createElement(o.default,{disabled:U,type:"primary",icon:"export"},"\u5bfc\u51fa")),p.default.createElement("span",{className:i.default.operateTopBtn},p.default.createElement(x,q)),p.default.createElement("a",{href:O,className:i.default.operateTopBtn,target:"_blank"},p.default.createElement(o.default,{type:"primary",icon:"save",className:i.default.operateTopBtn},"\u6a21\u7248\u4e0b\u8f7d"))),p.default.createElement("div",{className:i.default.searchBox},p.default.createElement("div",{className:"clearfix"},p.default.createElement("div",{className:i.default.searchItem},p.default.createElement("span",null,"\u5de5\u53f7\uff1a"),p.default.createElement(d.default,{value:v.code,onChange:e=>{C("code",e.target.value)},placeholder:"\u8bf7\u8f93\u5165\u5de5\u53f7",maxLength:32,style:B})),p.default.createElement("div",{className:i.default.searchItem},p.default.createElement("span",null,"\u59d3\u540d\uff1a"),p.default.createElement(d.default,{placeholder:"\u8bf7\u8f93\u5165\u59d3\u540d",value:v.name,onChange:e=>{C("name",e.target.value)},maxLength:32,style:B})),p.default.createElement("div",{className:i.default.searchItem},p.default.createElement("span",null,"\u72b6\u6001\uff1a"),p.default.createElement(u.default,{value:v.status||"",style:{width:120},onChange:e=>{C("status",e)}},L)),p.default.createElement("div",{className:i.default.searchItem},p.default.createElement("span",null,"\u5408\u540c\u7c7b\u578b\uff1a"),p.default.createElement(u.default,{value:v.contractType||"",style:{width:120},onChange:e=>{C("contractType",e)}},b))),p.default.createElement("div",{className:i.default.searchItemBox+" clearfix"},p.default.createElement("div",{className:i.default.searchItem},p.default.createElement("span",null,"\u4fe1\u606f\u9884\u8b66\uff1a"),p.default.createElement(u.default,{value:v.warning||"",style:{width:120},onChange:e=>{C("warning",e)}},M)),p.default.createElement("div",{className:i.default.searchItem},p.default.createElement(o.default,{type:"primary",onClick:S,style:{marginRight:"15px"}},"\u67e5\u8be2"),p.default.createElement(o.default,{onClick:D},"\u91cd\u7f6e")))),p.default.createElement(r.default,P)))}}var w=(0,f.connect)(e=>{var t=e.record,a=e.user;return{record:t,user:a}})(k);t.default=w},iH12:function(e,t,a){e.exports={"text-overflow":"text-overflow___3UwwD",clearfix:"clearfix___35ibu",fl:"fl___3VU3u",fr:"fr___31ruM",content:"content___x-8YP",searchBox:"searchBox___1cq8x",searchItem:"searchItem___1ASUI",searchItemBox:"searchItemBox___3qtI1",operateBtn:"operateBtn___2KsqV",operateTopBtn:"operateTopBtn___Ll0QR",operateTopBox:"operateTopBox___38gf9"}}}]);