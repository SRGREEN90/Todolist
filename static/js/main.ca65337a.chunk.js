(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{142:function(t,e,n){},143:function(t,e,n){},171:function(t,e,n){"use strict";n.r(e);var a,i,c=n(0),o=n.n(c),r=n(45),s=n.n(r),d=(n(142),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,254)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),a(t),i(t),c(t),o(t)}))}),l=(n(143),n(25)),u=n(16),j=n(18),b=n(114),O=n.n(b).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"5da1b16c-8254-442b-be1d-c9d350afdd05"}}),f=function(){return O.get("todo-lists")},h=function(t){return O.post("todo-lists",{title:t})},m=function(t){return O.delete("todo-lists/".concat(t))},T=function(t,e){return O.put("todo-lists/".concat(t),{title:e})},p=function(t){return O.get("todo-lists/".concat(t,"/tasks"))},g=function(t,e){return O.delete("todo-lists/".concat(t,"/tasks/").concat(e))},v=function(t,e){return O.post("todo-lists/".concat(t,"/tasks"),{title:e})},x=function(t,e,n){return O.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},k=function(t){return O.post("auth/login",t)},I=function(){return O.get("auth/me")},S=function(){return O.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={}));var C=function(t,e){t.messages.length?e(L(t.messages[0])):e(L("Some error occurred")),e(w("failed"))},E=function(t,e){e(L(t.message?t.message:"Some error occurred")),e(w("failed"))},y={isLoggedIn:!1},A=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},D={status:"idle",error:null,isInitialized:!1},L=function(t){return{type:"APP/SET-ERROR",error:t}},w=function(t){return{type:"APP/SET-STATUS",status:t}},P=[],N=n(3),F={},R=function(t,e,n){return function(a,i){var c=i().tasks[n].find((function(e){return e.id===t}));if(c){var o=Object(u.a)({deadline:c.deadline,description:c.description,priority:c.priority,startDate:c.startDate,title:c.title,status:c.status},e);x(n,t,o).then((function(i){if(0===i.data.resultCode){var c=function(t,e,n){return{type:"UPDATE-TASK",model:e,todolistId:n,taskId:t}}(t,e,n);a(c)}else C(i.data,a)})).catch((function(t){E(t,a)}))}else console.warn("task not found in the state")}},G=n(13),K=n(231),M=n(242),U=n(224),H=n(1),V=o.a.memo((function(t){var e=t.addItem,n=t.disabled,a=void 0!==n&&n;console.log("AddItemForm called");var i=Object(c.useState)(""),o=Object(G.a)(i,2),r=o[0],s=o[1],d=Object(c.useState)(null),l=Object(G.a)(d,2),u=l[0],j=l[1],b=function(){""!==r.trim()?(e(r),s("")):j("Title is required")};return Object(H.jsxs)("div",{children:[Object(H.jsx)(K.a,{variant:"outlined",disabled:a,error:!!u,value:r,onChange:function(t){s(t.currentTarget.value)},onKeyPress:function(t){null!==u&&j(null),13===t.charCode&&b()},label:"Title",helperText:u}),Object(H.jsx)(M.a,{color:"primary",onClick:b,disabled:a,children:Object(H.jsx)(U.a,{})})]})})),z=n(118),Z=o.a.memo((function(t){console.log("EditableSpan called");var e=Object(c.useState)(!1),n=Object(G.a)(e,2),a=n[0],i=n[1],o=Object(c.useState)(t.value),r=Object(G.a)(o,2),s=r[0],d=r[1];return a?Object(H.jsx)(K.a,{value:s,onChange:function(t){d(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.onChange(s)}}):Object(H.jsx)("span",{onDoubleClick:function(){i(!0),d(t.value)},children:t.value})})),q=n(235),B=n(225),Y=o.a.memo((function(t){var e=Object(c.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(c.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?a.Completed:a.New,t.todolistId)}),[t.task.id,t.todolistId]),i=Object(c.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(H.jsxs)("div",{className:t.task.status===a.Completed?"is-done":"",children:[Object(H.jsx)(q.a,{checked:t.task.status===a.Completed,color:"primary",onChange:n}),Object(H.jsx)(Z,{value:t.task.title,onChange:i}),Object(H.jsx)(M.a,{onClick:e,children:Object(H.jsx)(B.a,{})})]},t.task.id)})),J=n(243),_=["demo"],$=o.a.memo((function(t){var e=t.demo,n=void 0!==e&&e,i=Object(z.a)(t,_);console.log("Todolist called");var o=Object(l.b)();Object(c.useEffect)((function(){if(!n){var t,e=(t=i.todolist.id,function(e){e(w("loading")),p(t).then((function(n){var a=n.data.items;e(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(a,t)),e(w("succeeded"))}))});o(e)}}),[]);var r=Object(c.useCallback)((function(t){i.addTask(t,i.todolist.id)}),[i.addTask,i.todolist.id]),s=Object(c.useCallback)((function(t){i.changeTodolistTitle(i.todolist.id,t)}),[i.todolist.id,i.changeTodolistTitle]),d=Object(c.useCallback)((function(){return i.changeFilter("all",i.todolist.id)}),[i.todolist.id,i.changeFilter]),u=Object(c.useCallback)((function(){return i.changeFilter("active",i.todolist.id)}),[i.todolist.id,i.changeFilter]),j=Object(c.useCallback)((function(){return i.changeFilter("completed",i.todolist.id)}),[i.todolist.id,i.changeFilter]),b=i.tasks;return"active"===i.todolist.filter&&(b=i.tasks.filter((function(t){return t.status===a.New}))),"completed"===i.todolist.filter&&(b=i.tasks.filter((function(t){return t.status===a.Completed}))),Object(H.jsxs)("div",{children:[Object(H.jsxs)("h3",{children:[Object(H.jsx)(Z,{value:i.todolist.title,onChange:s}),Object(H.jsx)(M.a,{onClick:function(){i.removeTodolist(i.todolist.id)},disabled:"loading"===i.todolist.entityStatus,children:Object(H.jsx)(B.a,{})})]}),Object(H.jsx)(V,{addItem:r,disabled:"loading"===i.todolist.entityStatus}),Object(H.jsx)("div",{children:b.map((function(t){return Object(H.jsx)(Y,{task:t,todolistId:i.todolist.id,removeTask:i.removeTask,changeTaskTitle:i.changeTaskTitle,changeTaskStatus:i.changeTaskStatus},t.id)}))}),Object(H.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(H.jsx)(J.a,{variant:"all"===i.todolist.filter?"outlined":"text",onClick:d,color:"inherit",children:"All"}),Object(H.jsx)(J.a,{variant:"active"===i.todolist.filter?"outlined":"text",onClick:u,color:"primary",children:"Active"}),Object(H.jsx)(J.a,{variant:"completed"===i.todolist.filter?"outlined":"text",onClick:j,color:"secondary",children:"Completed"})]})]})})),Q=n(239),W=n(241),X=n(17),tt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(l.c)((function(t){return t.todolists})),i=Object(l.c)((function(t){return t.tasks})),o=Object(l.c)((function(t){return t.auth.isLoggedIn})),r=Object(l.b)();Object(c.useEffect)((function(){if(o){var t=function(t){t(w("loading")),f().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(w("succeeded"))}))};r(t)}}),[o]);var s=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){g(e,t).then((function(a){var i=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e);n(i)}))}}(t,e);r(n)}),[]),d=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){n(w("loading")),v(e,t).then((function(t){if(0===t.data.resultCode){var e={type:"ADD-TASK",task:t.data.data.item};n(e),n(w("succeeded"))}else C(t.data,n)})).catch((function(t){E(t,n)}))}}(t,e);r(n)}),[]),u=Object(c.useCallback)((function(t,e,n){var a=R(t,{status:e},n);r(a)}),[]),j=Object(c.useCallback)((function(t,e,n){var a=R(t,{title:e},n);r(a)}),[]),b=Object(c.useCallback)((function(t,e){var n={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};r(n)}),[]),O=Object(c.useCallback)((function(t){var e,n=(e=t,function(t){t(w("loading")),t({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:e,status:"loading"}),m(e).then((function(n){t(function(t){return{type:"REMOVE-TODOLIST",id:t}}(e)),t(w("succeeded"))}))});r(n)}),[]),p=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){T(t,e).then((function(a){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e))}))}}(t,e);r(n)}),[]),x=Object(c.useCallback)((function(t){var e=function(t){return function(e){e(w("loading")),h(t).then((function(t){e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(w("succeeded"))}))}}(t);r(e)}),[r]);return o?Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(Q.a,{container:!0,style:{padding:"20px"},children:Object(H.jsx)(V,{addItem:x})}),Object(H.jsx)(Q.a,{container:!0,spacing:3,children:a.map((function(t){var e=i[t.id];return Object(H.jsx)(Q.a,{item:!0,children:Object(H.jsx)(W.a,{style:{padding:"10px"},children:Object(H.jsx)($,{todolist:t,tasks:e,removeTask:s,changeFilter:b,addTask:d,changeTaskStatus:u,removeTodolist:O,changeTaskTitle:j,changeTodolistTitle:p,demo:n})})},t.id)}))})]}):Object(H.jsx)(X.a,{to:"login"})},et=n(234),nt=n(232),at=c.forwardRef((function(t,e){return Object(H.jsx)(nt.a,Object(u.a)({elevation:6,ref:e,variant:"filled"},t))}));function it(){var t=Object(l.c)((function(t){return t.app.error})),e=Object(l.b)(),n=function(t,n){"clickaway"!==n&&e(L(null))};return Object(H.jsx)(et.a,{open:null!==t,autoHideDuration:6e3,onClose:n,children:Object(H.jsx)(at,{onClose:n,severity:"error",sx:{width:"100%"},children:t})})}var ct=n(247),ot=n(248),rt=n(249),st=n(246),dt=n(250),lt=n(251),ut=n(230),jt=n(236),bt=n(222),Ot=n(244),ft=n(245),ht=n(121),mt=function(){var t=Object(l.c)((function(t){return t.auth.isLoggedIn})),e=Object(l.b)(),n=Object(ht.a)({initialValues:{email:"",password:"",rememberMe:!1,captcha:""},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Password should be more 3 symbols!!!"):e.password="Password required!!!",e},onSubmit:function(t){var n;e((n=t,function(t){t(w("loading")),k(n).then((function(e){0===e.data.resultCode?(t(A(!0)),t(w("succeeded"))):C(e.data,t)})).catch((function(e){E(e,t)}))}))}});return t?Object(H.jsx)(X.a,{to:"/"}):Object(H.jsx)(Q.a,{container:!0,justifyContent:"center",children:Object(H.jsx)(Q.a,{item:!0,justifyContent:"center",children:Object(H.jsxs)(jt.a,{children:[Object(H.jsxs)(bt.a,{children:[Object(H.jsxs)("p",{children:["To log in get registered",Object(H.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(H.jsx)("p",{children:"or use common test account credentials:"}),Object(H.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(H.jsx)("p",{children:"Password: free"})]}),Object(H.jsx)("form",{onSubmit:n.handleSubmit,children:Object(H.jsxs)(Ot.a,{children:[Object(H.jsx)(K.a,Object(u.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(H.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(H.jsx)(K.a,Object(u.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(H.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(H.jsx)(ft.a,{label:"Remember me",control:Object(H.jsx)(q.a,Object(u.a)({},n.getFieldProps("rememberMe")))}),Object(H.jsx)(J.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})},Tt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(l.b)(),i=Object(l.c)((function(t){return t.app.status})),o=Object(l.c)((function(t){return t.app.isInitialized})),r=Object(l.c)((function(t){return t.auth.isLoggedIn}));if(Object(c.useEffect)((function(){a((function(t){t(w("loading")),I().then((function(e){0===e.data.resultCode?(t(w("succeeded")),t(A(!0))):C(e.data,t)})).catch((function(e){E(e,t)})).finally((function(){t({type:"APP/SET-INITIALIZED",isInitialized:!0})}))}))}),[a]),!o)return Object(H.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(H.jsx)(ct.a,{})});return Object(H.jsxs)("div",{className:"App",children:[Object(H.jsx)(it,{}),Object(H.jsxs)(ot.a,{position:"static",children:[Object(H.jsxs)(rt.a,{children:[Object(H.jsx)(M.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(H.jsx)(ut.a,{})}),Object(H.jsx)(st.a,{variant:"h6",children:"News"}),r&&Object(H.jsx)(J.a,{color:"inherit",onClick:function(){a((function(t){t(w("loading")),S().then((function(e){0===e.data.resultCode?(t(A(!1)),t(w("succeeded"))):C(e.data,t)})).catch((function(e){E(e,t)}))}))},children:"Log out"})]}),"loading"===i&&Object(H.jsx)(dt.a,{})]}),Object(H.jsx)(lt.a,{fixed:!0,children:Object(H.jsxs)(X.d,{children:[Object(H.jsx)(X.b,{path:"/",element:Object(H.jsx)(tt,{demo:n})}),Object(H.jsx)(X.b,{path:"login",element:Object(H.jsx)(mt,{})}),Object(H.jsx)(X.b,{path:"/404",element:Object(H.jsx)("h1",{style:{textAlign:"center"},children:"404: PAGE NOT FOUND"})}),Object(H.jsx)(X.b,{path:"*",element:Object(H.jsx)(X.a,{to:"/404"})})]})})]})},pt=n(41),gt=n(77),vt=n(122),xt=Object(pt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(N.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(N.a)({},e.task.todoListId,[e.task].concat(Object(j.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(N.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(u.a)(Object(u.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(u.a)(Object(u.a)({},t),{},Object(N.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(u.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var a=Object(u.a)({},t);return e.todolists.forEach((function(t){a[t.id]=[]})),a;case"SET-TASKS":return Object(u.a)(Object(u.a)({},t),{},Object(N.a)({},e.todolistId,e.tasks));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(u.a)(Object(u.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(j.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{entityStatus:e.status}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(u.a)(Object(u.a)({},t),{},{filter:"all",entityStatus:"idle"})}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(u.a)(Object(u.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(u.a)(Object(u.a)({},t),{},{error:e.error});case"APP/SET-INITIALIZED":return Object(u.a)(Object(u.a)({},t),{},{isInitialized:e.isInitialized});default:return Object(u.a)({},t)}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;return"login/SET-IS-LOGGED-IN"===e.type?Object(u.a)(Object(u.a)({},t),{},{isLoggedIn:e.value}):t}}),kt=Object(vt.a)({reducer:xt,middleware:function(t){return t().prepend(gt.a)}});window.store=kt;var It=n(72);s.a.render(Object(H.jsx)(o.a.StrictMode,{children:Object(H.jsx)(l.a,{store:kt,children:Object(H.jsx)(It.a,{children:Object(H.jsx)(Tt,{})})})}),document.getElementById("root")),d()}},[[171,1,2]]]);
//# sourceMappingURL=main.ca65337a.chunk.js.map