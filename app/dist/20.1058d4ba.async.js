(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"rO+C":function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("MVZn")),c=r(a("o0o1")),s=r(a("3eXy")),u=r(a("LvDl")),d={namespace:"dashboard",state:{chartAge:{},chartEducation:{},chartGender:{},chartApplyChannel:{},chartJobType:{},chartOnJobProportion:{},chartUserTurnover:[]},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){var a=e.pathname;"/personnel/dashboard"===a&&(t({type:"chartAge"}),t({type:"chartEducation"}),t({type:"chartGender"}),t({type:"chartApplyChannel"}),t({type:"chartJobType"}),t({type:"chartOnJobProportion"}),t({type:"chartUserTurnover"}))})}},effects:{fetch:c.default.mark(function e(t,a){var r;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,a.call,r=a.put,e.next=4,r({type:"save"});case 4:case"end":return e.stop()}},e,this)}),chartAge:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartAge,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartAge:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartEducation:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartEducation,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartEducation:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartGender:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartGender,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartGender:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartApplyChannel:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartApplyChannel,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartApplyChannel:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartJobType:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartJobType,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartJobType:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartOnJobProportion:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartOnJobProportion,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartOnJobProportion:h.data}});case 15:case"end":return e.stop()}},e,this)}),chartUserTurnover:c.default.mark(function e(t,a){var r,n,d,p,o,l,i,f,h;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,d=a.put,p=a.select,e.next=4,p(function(e){return e.user});case 4:return o=e.sent,l=o.dept,i={},u.default.extend(i,r,{dept:l}),e.next=10,n(s.default.chartUserTurnover,i);case 10:if(f=e.sent,h=f.data,"success"!==h.msg){e.next=15;break}return e.next=15,d({type:"save",payload:{chartUserTurnover:h.data}});case 15:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,n.default)({},e,t.payload)}}};t.default=d}}]);