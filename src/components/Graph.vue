<template>
  <div id="app">
    <h3 v-if="start == -1">Select starting point</h3>
    <h3 v-if="start != -1 && !target">Select destination point</h3>
    <button v-if="canStartSearching()" v-on:click="dfsSearch()">DFS</button>
    <button v-if="canStartSearching()" v-on:click="bfsSearch()">BFS</button>
    <button v-on:click="showPath()">Show path</button>
    <button v-on:click="reset(); resetStartAndTarget()">Reset</button>
    <table class="table table-bordered">
      <tbody>
        <tr v-for="row in rows" v-bind:key="row">
          <td v-for="col in cols[row]" v-bind:key="col">
            <div class="vertex visited" v-on:click="setTarget(col)" :style="setVisitedStyle(col)" v-if="started && wasVisited(col)">{{ col }}</div>
            <div class="vertex" v-on:click="setStart(col); setTarget(col)" :style="setStartAndTargetStyle(col)" v-else> {{ col }} </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Graph',
  components: {
  },

  created() {
    this.initGraph();
  },

  data() {
    return {
      visited: new Set(),
      graph: new Map(),
      rows: [0,1,2,3],
      cols: [[0,1,2], [3,4,5], [6,7,8], [9,10,11]],
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
    initGraph() {
      for (const iRow in this.rows) {
        const row = parseInt(iRow);
        for (const iColumn in this.cols[row]) {
          let adj = [];
          const col = parseInt(this.cols[row][iColumn]);

          for (const i in this.neighbors) {
            for (const j in this.neighbors) {
              const r = parseInt(this.neighbors[i]) + parseInt(iRow);
              const c = parseInt(this.neighbors[j]) + parseInt(iColumn);

              if (!(r === iRow && c === iColumn)) {
                if (r >= 0 && c >= 0 && r < this.cols.length && c < this.cols[r].length) {
                  adj.push(this.cols[r][c]);
                }
              }
            }
          }
          adj.sort((a, b) => a - b);
          this.graph.set(col, adj);
        }
      }
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
      this.start = -1;
      this.target = -1;
    },

    canStartSearching() {
      return this.start !== -1 && this.target !== -1; 
    },

    setStart(v) {
      if (this.start === -1) {
        this.start = v;
      }
    },

    setTarget(v) {
      if (this.start !== -1) {
        this.target = v;
      }
    },

    setVisitedStyle(col) {
      const delay = this.getDelay(col);
      if (col === this.start) {
        return this.setStartAndTargetStyle(col);
      } else if (col === this.target) {
        return this.setStartAndTargetStyle(col);
      } else if (this.path.includes(col)) {
        return {'backgroundColor': 'purple !important'};
      } else {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay};
      }
    },

    setStartAndTargetStyle(col) {
      const delay = this.getDelay(col);
      if (col === this.start) {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay, 'border': '2px solid black'};
      } else if (col === this.target) {
        return {'-webkit-animation-delay': delay, 'animation-delay': delay, 'border' : '2px solid green'};
      }
    },

    showPath() {
      this.getPath(this.start, this.target);
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
      this.getPath(this.start, this.target);
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
        let parent = this.parents.get(target);
        let i = 0;

        while (parent != start) {
            this.$set(this.path, i++, parent);
            parent = this.parents.get(parent);
        }
        this.$set(this.path, i, start);
    },

    trackNodeAndColor(v) {
      this.visited.add(v);
      this.$set(this.traversed, this.index++, v);
    },

    wasVisited(col) {
      return this.traversed.includes(col);
    },

    getDelay(col) {
      return this.traversed.indexOf(col) / 2 + 's';
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
}

tr, td {
  padding: 50px;
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
  }

  100% {
    background: orange;
  }
}
</style>
