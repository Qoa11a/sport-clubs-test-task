(this["webpackJsonpsport-clubs"]=this["webpackJsonpsport-clubs"]||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(18)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(3),r=a.n(c),l=(a(14),a(1)),s=a(4),u=a(5),o=a(8),m=a(6),v=a(7),y=function(e,t){return e.reduce((function(e,a){return t!==a.city.slug&&t||e.push.apply(e,Object(v.a)(a.activity)),e}),[]).reduce((function(e,t){return e.some((function(e){return e.slug===t.slug}))||e.push(t),e}),[])},d=function(e,t){return e.reduce((function(e,a){return e.some((function(e){return e.slug===a.city.slug}))||!a.activity.map((function(e){return e.slug})).includes(t)&&t||e.push(a.city),e}),[])},f=(a(15),function(){return i.a.createElement("div",{className:"loader"},i.a.createElement("div",{className:"lds-ring"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)))}),h=(a(16),function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={clubs:[],citiesOptions:[],activitiesOptions:[],query:{city:"",activity:""},isLoading:!1},e.onChangeCityFilter=function(t){var a=e.state,n=a.clubs,i=a.query,c=t.target.value;e.setState((function(){return{isLoading:!0,query:Object(l.a)(Object(l.a)({},i),{},{city:c}),activitiesOptions:y(n,c)}})),e.startFakeTimeout()},e.onChangeActivityFilter=function(t){var a=e.state,n=a.clubs,i=a.query,c=t.target.value;e.setState((function(){return{isLoading:!0,query:Object(l.a)(Object(l.a)({},i),{},{activity:c}),citiesOptions:d(n,c)}})),e.startFakeTimeout()},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getClubs()}},{key:"getClubs",value:function(){var e=this;this.setState((function(){return{isLoading:!0}})),fetch("https://instasport.co/dashboard/api/v1/clubs/").then((function(e){return e.json()})).then((function(t){e.setState({clubs:t,citiesOptions:d(t),activitiesOptions:y(t),isLoading:!1})}))}},{key:"startFakeTimeout",value:function(){var e=this;setTimeout((function(){e.setState((function(){return{isLoading:!1}}))}),1e3)}},{key:"render",value:function(){var e=this.state,t=e.query,a=e.clubs,n=e.citiesOptions,c=e.activitiesOptions,r=e.isLoading,l=a.filter((function(e){var a=e.city.slug===t.city||""===t.city,n=e.activity.map((function(e){return e.slug})).includes(t.activity)||""===t.activity;return a&&n}));return i.a.createElement("main",{className:"main__container"},i.a.createElement("div",{className:"clubFilters"},i.a.createElement("div",{className:"clubFilters__cityFilter_container"},i.a.createElement("span",{className:"clubFilters__cityFilter_title"},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0413\u043e\u0440\u043e\u0434:"),i.a.createElement("div",{className:"select"},i.a.createElement("select",{onChange:this.onChangeCityFilter,value:this.state.query.city},i.a.createElement("option",{value:""},"\u0412\u0441\u0435 \u0433\u043e\u0440\u043e\u0434\u0430"),n.map((function(e,t){return i.a.createElement("option",{key:t,value:e.slug},e.title)}))))),i.a.createElement("div",{className:"clubFilters__activityFilter_container"},i.a.createElement("span",{className:"clubFilters__activityFilter_title"},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435:"),i.a.createElement("div",{className:"select"},i.a.createElement("select",{onChange:this.onChangeActivityFilter,value:this.state.query.activity},i.a.createElement("option",{value:""},"\u0412\u0441\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"),c.map((function(e,t){return i.a.createElement("option",{key:t,value:e.slug},e.title)})))))),r?i.a.createElement(f,null):i.a.createElement("div",{className:"clubList"},l.map((function(e,t){return i.a.createElement("a",{href:e.link,className:"clubList__clubItem_link",key:t},i.a.createElement("div",{className:"clubList__clubItem clubItem"},i.a.createElement("img",{src:e.logo,alt:"Club Logo",className:"clubItem__logo"}),i.a.createElement("h1",{className:"clubItem__title"},e.title_short)))}))))}}]),a}(i.a.Component));a(17);var p=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"header"},i.a.createElement("h1",{className:"header__title"},"Instasport")),i.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.0ec8ee1e.chunk.js.map