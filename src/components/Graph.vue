<template>
  <div id="app">
    <h3 v-if="!startSelected()">Select starting point</h3>
    <h3 v-if="startSelected() && !targetSelected()">Select destination point</h3>
    <h3 v-if="canStartSearching() && !started">Select one of the algorithms</h3>
    <button :title="`${ dfsTitle }`" v-if="canStartSearching()" v-on:click="dfsSearch()">DFS</button>
    <button :title="`${ bfsTitle }`" v-if="canStartSearching()" v-on:click="bfsSearch()">BFS</button>
    <button v-if="started" v-on:click="showPath()">Show path</button>
    <button v-on:click="reset(); resetStartAndTarget()">Reset</button>
    <table class="table table-bordered">
      <tbody>
        <tr v-for="row in rows" v-bind:key="row">
          <td v-for="col in cols[row]" v-bind:key="col">
            <div class="vertex visited" v-on:click="setTarget(col)" :style="setVisitedStyle(col)" v-if="started && wasVisited(col)">{{ getPathIndext(col) }}</div>
            <div class="vertex" v-on:click="setStart(col);" :style="setStartAndTargetStyle(col)" v-else> {{ col }} </div>
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
      cols: [],
      traversed: [],
      started: false,
      index: 0,
      neighbors: [0, 1, -1],
      start: -1,
      target: -1,
      path: [],
      parents: new Map(),
    }
  },

  methods: {
    initTableRowsAndCols() {
      const colsInRow = 50;
      let col = 0;

      for (let i = 0; i < this.rows; i++) {
        let adj = [];
        for (let j = 0; j < colsInRow; j++) {
          adj.push(col++);
        }
        this.cols.push(adj);
      }
    },

    initGraph() {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols[r].length; c++) {
          let adj = [];
          const col = parseInt(this.cols[r][c]);

          for (const i in this.neighbors) {
            for (const j in this.neighbors) {
              const v = parseInt(this.neighbors[i]) + r;
              const u = parseInt(this.neighbors[j]) + c;

              if (!(v === r && u === c)) {
                if (v >= 0 && u >= 0 && v < this.cols.length && u < this.cols[v].length) {
                  adj.push(this.cols[v][u]);
                }
              }
            }
          }
          this.graph.set(col, adj);
        }
      }
    },

    canStartSearching() {
      return this.start !== -1 && this.target !== -1; 
    },

    reset() {
      this.started = !this.started;
      this.traversed = [];
      this.visited = new Set();
      this.index = 0;
      this.path = [];
      this.parents = new Map();
    },

    resetStartAndTarget() {
      this.setStart(-1);
      this.setTarget(-1);
    },

    startSelected() {
      return this.start !== -1;
    },

    targetSelected() {
      return this.target !== -1;
    },

    setStart(v) {
      if (this.start === -1) {
        this.start = v;
      } else
        this.setTarget(v);
    },

    setTarget(v) {
      this.target = v;
    },

    setVisitedStyle(col) {
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

    getPathIndext(col) {
      return this.path.indexOf(col);
    },

    dfsSearch() {
      this.reset();
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
        if (!this.visited.has(u)) {
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
        if (!this.visited.has(u)) {
            queue.push(u);
            this.parents.set(u, v);
            this.visited.add(u);
        }
      }
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
      return this.traversed.indexOf(col) / 20 + 's';
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

table {
   border-collapse: collapse;
   margin-top: 2%;
}

tr, td {
  color: white;
}

td {
  border: 1px solid black;
  max-width: 30%;
  min-width: 30%;
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