<template>
  <div id="app">
    <h3 v-if="!startSelected()">Select starting point</h3>
    <h3 v-if="startSelected() && !targetSelected()">Select destination point</h3>

    <h3 v-if="canStartSearching() && !started">Select one of the algorithms</h3>
    <button :title="`${ dfsTitle }`" v-if="canStartSearching()" v-on:click="dfsSearch()">DFS</button>
    <button :title="`${ bfsTitle }`" v-if="canStartSearching()" v-on:click="bfsSearch()">BFS</button>

    <button v-if="started" v-on:click="showPath()">Show path</button>
    <button v-on:click="reset(); resetStartAndTarget();">Reset</button>
    <button v-if="destroyedNodes.length > 0" v-on:click="resetFromDestroyMode()">Reset destroyed nodes</button>
    <br/>
    <input type="checkbox" id="destroyMode" v-model="destroyMode">
    <label for="destroyMode" title="Turning this on allows to make nodes not available for traversing">Destroy nodes</label>

    <input type="checkbox" id="allowDiagonalSearch" v-model="allowDiagonalSearch" v-on:change="toggleDiagonalSearch()">
    <label for="allowDiagonalSearch" title="Turning this on allows to search path also diagonally">Turn on diagonal search</label>

    <table class="table table-bordered">
      <tbody>
        <tr v-for="(r, row) in rows" v-bind:key="row">
          <td v-for="col in cols[row]" v-bind:key="col">
            <div v-if="started && wasVisited(col)" class="vertex visited" v-on:click="selectNode(col)" 
            :style="setVisitedStyle(col)"> 
              {{ getPathIndex(col) }}
            </div>
            <div v-else class="vertex" v-on:click="selectNode(col);" :style="setStartAndTargetStyle(col)"> {{ col }} </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Graph',
  components: {},

  created() {
    this.initTableRowsAndCols();
    this.initGraph();
  },

  data() {
    return {
      dfsTitle: 'Depth-First-Search algorithm',
      bfsTitle: 'Breadth First Search algorithm. Shows shortest path in an unweighted graph or graph with same weights',
      visited: new Set(),
      graph: new Map(),
      rows: 50,
      colsInRow: 50,
      cols: [],
      traversed: [],
      started: false,
      index: 0,
      neighbors: [0, 1, -1],
      start: -1,
      target: -1,
      path: [],
      parents: new Map(),
      destroyedNodes: [],
      destroyMode: false,
      allowDiagonalSearch: false,
    }
  },

  methods: {
    initTableRowsAndCols() {
      let col = 0;

      for (let i = 0; i < this.rows; i++) {
        let tmp = [];
        for (let j = 0; j < this.colsInRow; j++) {
          tmp.push(col++);
        }
        this.cols.push(tmp);
      }
    },

    initGraph() {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols[r].length; c++) {
          let adj = [];
          const vertex = parseInt(this.cols[r][c]);

          for (const i in this.neighbors) {
            for (const j in this.neighbors) {
              const neighborRow = parseInt(this.neighbors[i]);
              const neighborCol = parseInt(this.neighbors[j]);
              const v = neighborRow + r;
              const u = neighborCol + c;

              if (this.isValidNeighbor(neighborRow, neighborCol)) {
                if (v >= 0 && u >= 0 && v < this.cols.length && u < this.cols[v].length) {
                  adj.push(this.cols[v][u]);
                }
              }
            }
          }
          this.graph.set(vertex, adj);
        }
      }
    },

    isValidNeighbor(i, j) {
      if (i === 0 && j === 0) {
        return false;
      } else if (this.isDiagonal(i, j)) {
        return this.allowDiagonalSearch;
      } else {
        return true;
      }
    },

    isDiagonal(i, j) {
      return i === j || (i === 1 && j === -1) || (i === -1 && j === 1);
    },

    toggleDiagonalSearch() {
      this.initGraph();
    },

    canStartSearching() {
      return this.startSelected() && this.targetSelected(); 
    },

    startSelected() {
      return this.start !== -1;
    },

    targetSelected() {
      return this.target !== -1;
    },

    reset() {
      this.started = false;
      this.traversed = [];
      this.visited = new Set();
      this.index = 0;
      this.path = [];
      this.parents = new Map();
    },

    resetStartAndTarget() {
      this.start = -1;
      this.target = -1;
    },

    resetFromDestroyMode() {
      this.destroyedNodes = [];
      this.destroyMode = false;
    },

    selectNode(v) {
      if (this.destroyMode) {
        if (this.destroyedNodes.includes(v)) {
          this.$set(this.destroyedNodes, v, -1);
        } else {
          this.$set(this.destroyedNodes, v, v);
        }
      } else if (this.start === -1) {
        this.start = v;
      } else if (this.start === v) {
        this.start = -1
      } else if (this.target === -1) {
        this.target = v;
      } else if (this.target === v) {
        this.target = -1;
      }
    },

    setVisitedStyle(col) {
      if (this.destroyedNodes.includes(col)) {
        return {'backgroundColor': 'red', 'color': 'red'};
      }
      const delay = this.getDelay(col);
      if (this.path.includes(col)) {
        let style = {'backgroundColor': 'purple !important', 'color': 'white !important'};
        if (col === this.start) {
          style['border']= '2px solid black';
        } else if (col === this.target) {
          style['border'] = '2px solid green';
        }
        return style;
      } else if (col === this.start) {
        return this.setStartAndTargetStyle(col, delay);
      } else if (col === this.target) {
        return this.setStartAndTargetStyle(col, delay);
      }  else {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay};
      }
    },

    setStartAndTargetStyle(col, delay) {
      if (this.destroyedNodes.includes(col)) {
        return {'backgroundColor': 'red', 'color': 'red'};
      }
      if (col === this.start) {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay, 'border': '2px solid black'};
      } else if (col === this.target) {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay, 'border' : '2px solid green'};
      }
    },

    wasVisited(col) {
      return this.traversed.includes(col);
    },

    showPath() {
      this.getPath(this.start, this.target);
    },

    getPathIndex(col) {
      return this.path.indexOf(col);
    },

    dfsSearch() {
      this.reset();
      this.started = true;
      this.trackNodeAndColor(this.start);
      this.dfs(this.start, this.target);
    },

    dfs(v, target) {
      if (v === target) {
        return true;
      }

      const edges = this.graph.get(parseInt(v));

      for (const e in edges) {
        const u = parseInt(edges[e]);
        if (!this.visited.has(u) && !this.destroyedNodes.includes(u)) {
          this.parents.set(u, v);
          this.trackNodeAndColor(u);
          if (this.dfs(u, target)) {
              return true;
          }
        }
      }
      return false;
    },

    bfsSearch() {
      this.reset();
      this.started = true;
      let queue = [];

      queue.push(this.start);
      this.trackNodeAndColor(this.start);

      while (queue.length > 0) {
        const v = queue.shift();
        this.$set(this.traversed, this.index++, v);

        if (v === this.target) {
          break;
        }
        this.bfs(v, queue);
      }
    },

    bfs(v, queue) {
      for (const e in this.graph.get(v)) {
        const u = parseInt(this.graph.get(v)[e]);
        if (!this.visited.has(u) && !this.destroyedNodes.includes(u)) {
            queue.push(u);
            this.parents.set(u, v);
            this.visited.add(u);
        }
      }
    },

    dijkstraSearch() {
      this.reset();
      this.started = true;
    },

    dijkstra() {

    },

    getPath(start, target) {
      if (this.parents.size > 0) {
        let parent = target;
        let i = 0;

        while (parent != start) {
            this.$set(this.path, i++, parent);
            parent = this.parents.get(parent);
        }
        this.$set(this.path, i, start);
        this.path.reverse();
      }
    },

    trackNodeAndColor(v) {
      this.visited.add(v);
      this.$set(this.traversed, this.index++, v);
    },

    getDelay(col) {
      return this.traversed.indexOf(col) * 2 + 'ms';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button, input {
  margin: 0.5%;
}

table {
   border-collapse: collapse;
   margin-top: 2%;
}

tr, td {
  color: white;
}

td {
  border: 1.5px solid black;
  max-width: 35px;
  min-width: 35px;
}

.vertex:hover {
  cursor: pointer;
}

.visited {
  animation: color-me-in 2s infinite;
}

@keyframes color-me-in {
  0% {
    background: orange;
    color: orange;
  }

  100% {
    background: orange;
    color: orange;
  }
}
</style>
