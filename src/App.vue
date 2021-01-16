<template>
  <div id="app">
    <button v-on:click="dfsSearch()">DFS</button>
    <button v-on:click="bfsSearch()">BFS</button>
    <button v-on:click="reset()">Reset</button>
    <table class="table table-bordered">
      <tbody>
        <tr v-for="row in rows" v-bind:key="row">
          <td v-for="col in cols[row]" v-bind:key="col">
            <div class="visited" :style="setVisitedStyle(col)" v-if="clicked && wasVisited(col)">{{ col }}</div>
            <div v-else> {{ col }} </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'App',
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
      toColor: [],
      clicked: false,
      index: 0,
      neighbors: [0, 1, -1],
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

              if (!(r === row && c === col)) {
                if (r >= 0 && c >= 0 && r < this.cols.length && c < this.cols[r].length) {
                  adj.push(this.cols[r][c]);
                }
              }
            }
          }
          this.graph.set(col, adj);
        }
      }
    },

    reset() {
      this.clicked = false;
      this.toColor = [];
    },

    setVisitedStyle(col) {
      const delay = this.getDelay(col);
      return {'-webkit-animation-delay': delay, 'animation-delay': delay};
    },

    dfsSearch() {
      this.clicked = true;
      this.visited = new Set();
      this.toColor = [];
      this.index = 0;
      const start = 3;
      const target = 7;

      this.trackNodeAndColor(start);
      
      if (this.dfs(start, target)) {
        return true;
      }
    },

    dfs(v, target) {
      if (v === target) {
        return true;
      }

      const edges = this.graph.get(parseInt(v));

      for (const u in edges) {
        let e = parseInt(edges[u]);
        if (!this.visited.has(e)) {
          this.trackNodeAndColor(e);
          if (this.dfs(e, target)) {
            return true;
          }
        }
      }
    },

    bfsSearch() {
      this.clicked = true;
      this.visited = new Set();
      this.toVisit = [];
      this.toColor = [];
      this.index = 0;
      const start = 3;
      const target = 7;

      this.toVisit.push(start);
      this.trackNodeAndColor(start);

      while (this.toVisit.length > 0) {
        const v = this.toVisit.shift();
        this.$set(this.toColor, this.index++, v);

        if (v === target) {
          return true;
        }

        for (const e in this.graph.get(v)) {
          const u = parseInt(this.graph.get(v)[e]);
          if (!this.visited.has(u)) {
            this.toVisit.push(u);
            this.visited.add(u);
          }
        }
      }
    },

    trackNodeAndColor(v) {
      this.visited.add(v);
      this.$set(this.toColor, this.index++, v);
    },

    wasVisited(col) {
      return this.toColor.includes(col);
    },

    getVisitedStyle(col) {
      const animationDelay = this.getDelay(col);
      return {
        '-webkit-animation-delay': animationDelay,
        'animation-delay': animationDelay
      }
    },

    getDelay(col) {
      return this.toColor.indexOf(col) / 2 + 's';
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
