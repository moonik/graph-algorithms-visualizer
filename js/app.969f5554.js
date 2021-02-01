(function(t){function e(e){for(var i,n,o=e[0],h=e[1],l=e[2],d=0,u=[];d<o.length;d++)n=o[d],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&u.push(s[n][0]),s[n]=0;for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(t[i]=h[i]);c&&c(e);while(u.length)u.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],i=!0,o=1;o<r.length;o++){var h=r[o];0!==s[h]&&(i=!1)}i&&(a.splice(e--,1),t=n(n.s=r[0]))}return t}var i={},s={app:0},a=[];function n(e){if(i[e])return i[e].exports;var r=i[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=i,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/graph-algorithms-visualizer/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],h=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var c=h;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";r("85ec")},2811:function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var i=r("2b0e"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("Graph")],1)},a=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[t.startSelected()?t._e():r("h1",[t._v("Select starting point")]),t.startSelected()&&!t.targetSelected()?r("h1",[t._v("Select destination point")]):t._e(),t.canStartSearching()&&!t.started?r("h1",[t._v("Select one of the algorithms")]):t._e(),t.canStartSearching()?r("button",{attrs:{title:""+t.dfsTitle},on:{click:function(e){return t.dfsSearch()}}},[t._v("DFS")]):t._e(),t.canStartSearching()?r("button",{attrs:{title:""+t.bfsTitle},on:{click:function(e){return t.bfsSearch()}}},[t._v("BFS")]):t._e(),t.canStartSearching()?r("button",{attrs:{title:""+t.bfsTitle},on:{click:function(e){return t.dijkstraSearch()}}},[t._v("Dijkstra")]):t._e(),r("br"),r("input",{directives:[{name:"model",rawName:"v-model",value:t.destroyMode,expression:"destroyMode"}],attrs:{type:"checkbox",id:"destroyMode"},domProps:{checked:Array.isArray(t.destroyMode)?t._i(t.destroyMode,null)>-1:t.destroyMode},on:{change:function(e){var r=t.destroyMode,i=e.target,s=!!i.checked;if(Array.isArray(r)){var a=null,n=t._i(r,a);i.checked?n<0&&(t.destroyMode=r.concat([a])):n>-1&&(t.destroyMode=r.slice(0,n).concat(r.slice(n+1)))}else t.destroyMode=s}}}),r("label",{attrs:{for:"destroyMode",title:"Turning this on allows to make nodes not available for traversing"}},[t._v("Destroy nodes")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.allowDiagonalSearch,expression:"allowDiagonalSearch"}],attrs:{type:"checkbox",id:"allowDiagonalSearch"},domProps:{checked:Array.isArray(t.allowDiagonalSearch)?t._i(t.allowDiagonalSearch,null)>-1:t.allowDiagonalSearch},on:{change:[function(e){var r=t.allowDiagonalSearch,i=e.target,s=!!i.checked;if(Array.isArray(r)){var a=null,n=t._i(r,a);i.checked?n<0&&(t.allowDiagonalSearch=r.concat([a])):n>-1&&(t.allowDiagonalSearch=r.slice(0,n).concat(r.slice(n+1)))}else t.allowDiagonalSearch=s},function(e){return t.toggleDiagonalSearch()}]}}),r("label",{attrs:{for:"allowDiagonalSearch",title:"Turning this on allows to search path also diagonally"}},[t._v("Turn on diagonal search")]),r("br"),t.started?r("button",{on:{click:function(e){return t.showPath()}}},[t._v("Show path")]):t._e(),r("button",{on:{click:function(e){t.reset(),t.resetStartAndTarget()}}},[t._v("Reset")]),r("button",{on:{click:function(e){return t.resetFromDestroyMode()}}},[t._v("Reset destroyed nodes")]),r("table",{staticClass:"table table-bordered"},[r("tbody",t._l(t.rows,(function(e,i){return r("tr",{key:i},t._l(t.cols[i],(function(e){return r("td",{key:e},[t.started&&t.wasVisited(e)?r("div",{staticClass:"vertex visited",style:t.setVisitedStyle(e),on:{click:function(r){return t.selectNode(e)}}},[t._v(" "+t._s(t.getPathIndex(e))+" ")]):r("div",{staticClass:"vertex",style:t.setStartAndTargetStyle(e),on:{click:function(r){return t.selectNode(e)}}},[t._v(" "+t._s(e)+" ")])])})),0)})),0)])])},o=[],h=(r("caad"),r("c975"),r("4ec9"),r("d3b7"),r("6062"),r("2532"),r("3ca3"),r("ddb0"),r("d4ec")),l=r("bee2"),c=r("ade3"),d=function(){function t(){Object(h["a"])(this,t),Object(c["a"])(this,"queue",[]),Object(c["a"])(this,"size",0)}return Object(l["a"])(t,[{key:"add",value:function(t,e){this.queue.push({vertex:t,weight:e}),this.siftUp(),this.size++}},{key:"siftUp",value:function(){var t=this.queue.length-1;while(t>0){var e=Math.floor((t-1)/2);if(!(this.queue[t].weight<this.queue[e].weight))break;this.swap(t,e),t=e}}},{key:"swap",value:function(t,e){var r=this.queue[t];this.queue[t]=this.queue[e],this.queue[e]=r}},{key:"remove",value:function(){var t=this.queue[0];return this.swap(0,this.queue.length-1),this.queue.pop(),this.siftDown(),this.size--,t}},{key:"siftDown",value:function(){var t=0;while(2*t+1<this.queue.length){var e=2*t+1;if(e+1<this.queue.length&&this.queue[e].weight>this.queue[e+1].weight&&e++,!(this.queue[t].weight>this.queue[e].weight))break;this.swap(t,e),t=e}}},{key:"reset",value:function(){this.queue=[],this.size=0}},{key:"isEmpty",value:function(){return 0===this.size}},{key:"getSize",value:function(){return this.size}}]),t}(),u=new d,f={name:"Graph",components:{},created:function(){this.initTableRowsAndCols(),this.initGraph()},data:function(){return{dfsTitle:"Depth-First-Search algorithm",bfsTitle:"Breadth First Search algorithm. Shows shortest path in an unweighted graph or graph with same weights",visited:new Set,graph:new Map,graphWeights:new Map,rows:50,colsInRow:50,cols:[],traversed:[],started:!1,index:0,neighbors:[0,1,-1],start:-1,target:-1,path:[],parents:new Map,destroyedNodes:{},destroyMode:!1,allowDiagonalSearch:!1,MAX_WEIGHT:100}},methods:{initTableRowsAndCols:function(){for(var t=0,e=0;e<this.rows;e++){for(var r=[],i=0;i<this.colsInRow;i++)r.push(t++);this.cols.push(r)}},initGraph:function(){for(var t=0;t<this.rows;t++)for(var e=0;e<this.cols[t].length;e++){var r=parseInt(this.cols[t][e]);this.graph.set(r,this.getNeighbors(r,t,e))}},getNeighbors:function(t,e,r){var i=[];for(var s in this.neighbors)for(var a in this.neighbors){var n=parseInt(this.neighbors[s]),o=parseInt(this.neighbors[a]),h=n+e,l=o+r;if(this.isValidNeighbor(n,o)&&h>=0&&l>=0&&h<this.cols.length&&l<this.cols[h].length){i.push(this.cols[h][l]);var c=this.graphWeights.get(t);c||(c=[],this.graphWeights.set(t,c)),c[this.cols[h][l]]=this.getRandomWeight()}}return i},isValidNeighbor:function(t,e){return(0!==t||0!==e)&&(!this.isDiagonal(t,e)||this.allowDiagonalSearch)},isDiagonal:function(t,e){return Math.abs(t)===Math.abs(e)},getRandomWeight:function(){return Math.floor(Math.random()*this.MAX_WEIGHT)},toggleDiagonalSearch:function(){this.initGraph()},canStartSearching:function(){return this.startSelected()&&this.targetSelected()},startSelected:function(){return-1!==this.start},targetSelected:function(){return-1!==this.target},reset:function(){this.started=!1,this.traversed=[],this.visited=new Set,this.index=0,this.path=[],this.parents=new Map},resetStartAndTarget:function(){this.start=-1,this.target=-1},resetFromDestroyMode:function(){this.destroyedNodes={},this.destroyMode=!1},selectNode:function(t){this.destroyMode?this.destroyedNodes[t]?this.$set(this.destroyedNodes,t,!1):this.$set(this.destroyedNodes,t,!0):-1===this.start?this.start=t:this.start===t?this.start=-1:-1===this.target?this.target=t:this.target===t&&(this.target=-1)},setVisitedStyle:function(t){if(this.destroyedNodes[t])return{backgroundColor:"red",color:"red"};var e=this.getDelay(t);if(this.path.includes(t)){var r={backgroundColor:"purple !important",color:"white !important"};return t===this.start?r["border"]="2px solid black":t===this.target&&(r["border"]="2px solid green"),r}return t===this.start||t===this.target?this.setStartAndTargetStyle(t,e):{"-webkit-animation-delay":e,"animation-delay":e}},getDelay:function(t){return 2*this.traversed.indexOf(t)+"ms"},setStartAndTargetStyle:function(t,e){return this.destroyedNodes[t]?{backgroundColor:"red",color:"red"}:t===this.start?{"-webkit-animation-delay":e,"animation-delay":e,border:"2px solid black"}:t===this.target?{"-webkit-animation-delay":e,"animation-delay":e,border:"2px solid green"}:void 0},wasVisited:function(t){return this.traversed.includes(t)},showPath:function(){this.getPath(this.start,this.target)},getPathIndex:function(t){return this.path.indexOf(t)},dfsSearch:function(){this.reset(),this.started=!0,this.trackNodeAndColor(this.start),this.dfs(this.start,this.target)},dfs:function(t,e){if(t===e)return!0;var r=this.graph.get(parseInt(t));for(var i in r){var s=parseInt(r[i]);if(!this.visited.has(s)&&!this.destroyedNodes[s]&&(this.parents.set(s,t),this.trackNodeAndColor(s),this.dfs(s,e)))return!0}return!1},bfsSearch:function(){this.reset(),this.started=!0;var t=[];t.push(this.start),this.trackNodeAndColor(this.start);while(t.length>0){var e=t.shift();if(this.$set(this.traversed,this.index++,e),e===this.target)break;this.bfs(e,t)}},bfs:function(t,e){for(var r in this.graph.get(t)){var i=parseInt(this.graph.get(t)[r]);this.visited.has(i)||this.destroyedNodes[i]||(e.push(i),this.parents.set(i,t),this.visited.add(i))}},dijkstraSearch:function(){this.reset(),this.started=!0;var t=u;t.reset();var e=this.initWeights();t.add(this.start,0),e[this.start]=0,this.visited.add(this.start);while(!t.isEmpty()){var r=t.remove().vertex;if(this.$set(this.traversed,this.index++,r),r===this.target)break;this.dijkstra(r,t,e)}},initWeights:function(){for(var t=[],e=0;e<this.graph.size;e++)t.push(this.MAX_WEIGHT+1);return t},dijkstra:function(t,e,r){for(var i in this.graph.get(t)){var s=parseInt(this.graph.get(t)[i]),a=this.graphWeights.get(t)[s];this.visited.has(s)||this.destroyedNodes[s]||(r[s]>this.MAX_WEIGHT||r[s]>a+r[t])&&(r[s]=a+r[t],e.add(s,a),this.parents.set(s,t),this.visited.add(s))}},getPath:function(t,e){if(this.parents.size>0){var r=e,i=0;while(r!=t)this.$set(this.path,i++,r),r=this.parents.get(r);this.$set(this.path,i,t),this.path.reverse()}},trackNodeAndColor:function(t){this.visited.add(t),this.$set(this.traversed,this.index++,t)}}},g=f,p=(r("8e60"),r("2877")),v=Object(p["a"])(g,n,o,!1,null,null,null),y=v.exports,b={name:"App",components:{Graph:y}},w=b,S=(r("034f"),Object(p["a"])(w,s,a,!1,null,null,null)),k=S.exports;i["a"].config.productionTip=!1,i["a"].component("Graph",y),new i["a"]({render:function(t){return t(k)}}).$mount("#app")},"85ec":function(t,e,r){},"8e60":function(t,e,r){"use strict";r("2811")}});
//# sourceMappingURL=app.969f5554.js.map