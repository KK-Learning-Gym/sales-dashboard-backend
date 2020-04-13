(this["webpackJsonpsales-dashboard"]=this["webpackJsonpsales-dashboard"]||[]).push([[0],{131:function(e,t,a){a(403).config();e.exports={baseUrl:"https://sales-dashboard-react.herokuapp.com/db",initialQuery:"https://sales-dashboard-react.herokuapp.com/db/2019/Jan"}},245:function(e,t,a){e.exports=a(407)},267:function(e,t,a){},407:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(196),c=a.n(r),o=a(121),i=a.n(o),s=a(197),m=a(26),u=a(198),d=a.n(u),E=(a(267),a(210)),h=function(e){var t=[{id:e.title,label:e.title,value:e.stat,color:e.color},{id:"empty",label:"empty",value:100-e.stat,color:"hsl(217, 33%, 14%)"}],a={top:0,left:80,bottom:0,right:80};return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-title center top-margin"},e.title),l.a.createElement("div",{className:"piebox"},l.a.createElement("div",{style:{height:300,width:300,position:"relative"}},l.a.createElement(E.a,{data:t,colors:function(e){return e.color},margin:a,innerRadius:.5,enableRadialLabels:!1,enableSlicesLabels:!1,isInteractive:!1,style:{display:"flex"}}),l.a.createElement("div",{style:{position:"absolute",top:"0",bottom:"0",right:150,left:150,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}},l.a.createElement("span",null,t[0].value,"%")))))},v=a(205),g=function(e){var t=e.data,a={top:80,left:80,bottom:80,right:80},n="40vh",r="45vw";return l.a.createElement("div",{style:{height:n,width:r,minHeight:300,minWidth:250},className:"trickyChart"},l.a.createElement(v.a,{colors:"hsl(216, 54%, 49%)",data:t,keys:["value"],indexBy:"store",margin:a,padding:.3,layout:"horizontal",axisBottom:{tickSize:5,tickPadding:5,legend:"Orders",legendPosition:"middle",legendOffset:50},axisLeft:{tickSize:10,tickPadding:5},enableGridX:!0,enableGridY:!1,enableLabel:!1,isInteractive:!1}))},p=a(208),b=function(e){var t=e.data,a="40vh",n="45vw";return l.a.createElement("div",{style:{height:a,width:n,minHeight:300,minWidth:250},className:"trickyChart"},l.a.createElement(p.a,{root:t,margin:{top:20,right:0,bottom:20,left:0},identity:"name",value:"loc",colors:{scheme:"spectral"},padding:9,enableLabel:!0,isZoomable:!1,leavesOnly:!0,isInteractive:!1,className:"trickyChart"}))},f={display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",height:"90%",color:"white"},y=function(){return l.a.createElement("div",{style:f},l.a.createElement("div",{class:"lds-ellipsis"},l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null)),l.a.createElement("br",null),l.a.createElement("p",null,"The backend hosted on Heroku is not responding.",l.a.createElement("br",null),l.a.createElement("br",null),"You could try refreshing the page.",l.a.createElement("br",null),l.a.createElement("br",null),"If it still doesn't load then I've crossed my Heroku usage limit.",l.a.createElement("br",null),l.a.createElement("br",null),"But...",l.a.createElement("br",null),l.a.createElement("br",null),"You can check out the code for this repository here :",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{href:"#nowhere"},"Frontend"),"\xa0\xa0\xa0",l.a.createElement("a",{href:"#nowhere"},"Backend")))},k=a(131),O=function(e){return l.a.createElement("div",{className:"flexbox"},e.children)},R=function(e){return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-title center top-margin"},e.title),e.children)},x=function(e){return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-title center"},e.title),l.a.createElement("div",{className:"card-stat center"},l.a.createElement("span",{style:{fontSize:"1.5rem"}},"$ "),e.stat,"k"))},N=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"loading"},l.a.createElement("div",{className:"lds-ellipsis"},l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null))))},S=function(e){var t=e.response,a=e.page;console.log("loading dynamic boxes"),console.log("checking response received in component:"),console.log(t);var n=0!==Object.keys(t).length||t.constructor!==Object;return console.log("truthValue"),console.log(n),"loading"===a?l.a.createElement(N,null):"main"===a&&n?l.a.createElement(l.a.Fragment,null,l.a.createElement(O,null,l.a.createElement(x,{title:"Revenue from Amazon",stat:(t.Revenues.AM/1e3).toFixed(2)}),l.a.createElement(x,{title:"Revenue from Ebay",stat:(t.Revenues.EB/1e3).toFixed(2)}),l.a.createElement(x,{title:"Revenue from Etsy",stat:(t.Revenues.ET/1e3).toFixed(2)}),l.a.createElement(x,{title:"Total Revenue",stat:(t.Revenues.total/1e3).toFixed(2)})),l.a.createElement(O,null,l.a.createElement(h,{title:"Purchase Rate",stat:t.Rates.purchase,color:"hsl(216, 54%, 49%)"}),l.a.createElement(h,{title:"Checkout Rate",stat:t.Rates.checkout,color:"hsl(186, 53%, 51%)"}),l.a.createElement(h,{title:"Cart Abandon Rate",stat:t.Rates.abandoned,color:"hsl(69, 83%, 84%)"})),l.a.createElement(O,null,l.a.createElement(R,{title:"Orders Trend by Stores"},l.a.createElement(g,{data:[{store:"Etsy",value:t.OrdersByStore.ET},{store:"Ebay",value:t.OrdersByStore.EB},{store:"Amazon",value:t.OrdersByStore.AM}]}))),l.a.createElement(O,null,l.a.createElement(R,{title:"Orders Trend by Region"},l.a.createElement(b,{data:{name:"chart",children:[{name:"NW",loc:t.OrdersByRegion.nw},{name:"SW",loc:t.OrdersByRegion.sw},{name:"CR",loc:t.OrdersByRegion.c},{name:"SE",loc:t.OrdersByRegion.se},{name:"NE",loc:t.OrdersByRegion.ne}]}})))):"failed"===a?l.a.createElement(y,null):void 0},w=function(){var e=Object(n.useState)({}),t=Object(m.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(k.initialQuery),o=Object(m.a)(c,2),u=o[0],E=o[1],h=Object(n.useState)("loading"),v=Object(m.a)(h,2),g=v[0],p=v[1];Object(n.useEffect)((function(){(function(){var e=Object(s.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("received query as:"),console.log(u),console.log("fetching data now..."),e.prev=3,e.next=6,d()(u);case 6:t=e.sent,a=t.data,console.log("got data as:"),console.log(a),console.log("setting response"),r(a),p("main"),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(3),r({}),p("failed");case 19:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(){return e.apply(this,arguments)}})()()}),[u]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",null,l.a.createElement("span",null,l.a.createElement("select",{id:"month",onChange:function(e){console.log("event received");var t=e.target.value.split(" "),a=k.baseUrl+"/"+t[1]+"/"+t[0];console.log("setting query"),console.log(a),E(a)},autoComplete:"true"},["Jan 2019","Dec 2018","Nov 2018","Oct 2018","Sep 2018","Aug 2018","Jul 2018","Jun 2018","May 2018","Apr 2018","Mar 2018","Feb 2018","Jan 2018"].map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))),l.a.createElement("span",null,"Sales Summary"),l.a.createElement("span",null,"Hey, you!")),l.a.createElement(S,{response:a,page:g}))};a(406);c.a.render(l.a.createElement(w,null),document.getElementById("root"))}},[[245,1,2]]]);
//# sourceMappingURL=main.9f0c4fa6.chunk.js.map