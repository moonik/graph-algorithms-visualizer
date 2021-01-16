<template>
  <div id="app">
    <button v-on:click="dfsSearch()">Click</button>
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
  data() {
    return {
      visited: new Set(),
      graph: [
          [0,1,0,0,0,0,0,0,0,0,0,0],
          [1,0,0,0,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,1,0,0],
          [0,1,0,0,0,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,1,0,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0]],
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
      let start = 3;

      for (let v = start; v < this.graph.length; v++) {
        if (!this.visited.has(v)) {
          this.visited.add(v);
          this.$set(this.toColor, this.index++, v);
          if (this.dfs(v, 7)) {
            return true;
          }
        }
      }
    },

    dfs(v, target) {
      if (v === target) {
        return true;
      }
      for (let u = 0; u < this.graph[v].length; u++) {
        if (!this.visited.has(u) && this.graph[v][u] !== 0) {
          this.visited.add(u);
          this.$set(this.toColor, this.index++, u);
          if (this.dfs(u, target)) {
            return true;
          }
        }
      }
    },

    wasVisited(col) {
      return this.toColor.includes(col);
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
