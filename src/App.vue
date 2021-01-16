<template>
  <div id="app">
    <button v-on:click="bfsSearch()">Click</button>
    <table class="table table-bordered">
      <tbody>
        <tr v-for="row in rows" v-bind:key="row">
          <td v-for="col in cols[row]" v-bind:key="col">
            <div class="visited" :style="{'-webkit-animation-delay': getDelay(col), 'animation-delay': getDelay(col)}" v-if="clicked && wasVisited(col)">{{ col }}</div>
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
    for (let i = 0; i < 12; i++) {
      this.graph.set(i, [0,1,2,3,4,5,6,7,8,9,10,11]);
    }
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
    }
  },
  methods: {
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
        let e = parseInt(u);
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
          const u = parseInt(e);
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
