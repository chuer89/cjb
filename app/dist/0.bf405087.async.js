webpackJsonp([0],{Zn4E:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Biqn"),n=a.n(r),s=a("En79"),c=a.n(s),i=a("+vOg"),u=a("M4fF"),d=a.n(u);t.default={namespace:"editUser",state:{userParam:{},activeTabsKey:"1",basicDisabled:!0,experienceDisabled:!0,portrayalDisabled:!0,uid:"",userWork:[],userDetails:{},portrayalImg:{},salaryRecord:[]},subscriptions:{setup:function(e){var t=e.dispatch;e.history.listen(function(e){var a=e.pathname,r=a.split("/"),n=r.length,s=r[n-1];d.a.toNumber(s)&&(t({type:"save",payload:{uid:s}}),s&&t({type:"getUserById"}))})}},effects:{fetch:c.a.mark(function e(t,a){var r,n,s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,e.next=4,s({type:"save"});case 4:case"end":return e.stop()}},e,this)}),getUserById:c.a.mark(function e(t,a){var r,n,s,u,o,p,l,f,y;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.editUser});case 4:return o=e.sent,p=o.uid,l={},d.a.extend(l,r,{id:p}),e.next=10,n(i.a.getUserById,l);case 10:if(f=e.sent,y=f.data,"success"!==y.msg){e.next=15;break}return e.next=15,s({type:"save",payload:{userDetails:y.data}});case 15:case"end":return e.stop()}},e,this)}),getUserWorkByUid:c.a.mark(function e(t,a){var r,n,s,u,o,p,l,f,y;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.editUser});case 4:return o=e.sent,p=o.uid,l={},d.a.extend(l,r,{uid:p}),e.next=10,n(i.a.getUserWorkByUid,l);case 10:if(f=e.sent,y=f.data,"success"!==y.msg){e.next=15;break}return e.next=15,s({type:"save",payload:{userWork:y.data}});case 15:case"end":return e.stop()}},e,this)}),getUserPortrayalByUid:c.a.mark(function e(t,a){var r,n,s,u,o,p,l,f,y,v,x,h,U,g,m,k,b,w,B,R,D;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.editUser});case 4:return o=e.sent,p=o.uid,l={},d.a.extend(l,r,{uid:p}),e.next=10,n(i.a.getUserPortrayalByUid,l);case 10:if(f=e.sent,y=f.data,v=y.data,x=v.userPortrayal,h=v.files,"success"!==y.msg){e.next=22;break}return U={},d.a.forEach(h,function(e){U[e.id]=e}),g=x||{},m=g.idcardFront,k=g.idcardReverse,b=g.healthCertificateFront,w=g.healthCertificateReverse,B=g.contract,R=JSON.parse(B||"[]"),D=[],d.a.forEach(R,function(e){D.push(U[e])}),e.next=22,s({type:"save",payload:{portrayalImg:{idcardFront:U[m],idcardReverse:U[k],healthCertificateFront:U[b],healthCertificateReverse:U[w],contract:D}}});case 22:case"end":return e.stop()}},e,this)}),getUserSalaryRecordByUid:c.a.mark(function e(t,a){var r,n,s,u,o,p,l,f,y;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.editUser});case 4:return o=e.sent,p=o.uid,l={},d.a.extend(l,r,{uid:p}),e.next=10,n(i.a.getUserSalaryRecordByUid,l);case 10:if(f=e.sent,y=f.data,"success"!==y.msg){e.next=15;break}return e.next=15,s({type:"save",payload:{salaryRecord:y.data}});case 15:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return n()({},e,t.payload)}}}}});