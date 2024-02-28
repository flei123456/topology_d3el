<template>
  <div class="container"></div>
</template>

<script>
import d3 from "libs/d3.v7.min.js";
import { onMounted, watch } from 'vue';

export default {
  name: 'Wiring',
  emits: ['echo'],
  props: {
    name: String,
    width: {
      type: Number,
      default: 1200
    },
    height: {
      type: Number,
      default: 1200
    },
    r: {
      type: Number,
      default: 76,
    },
    bg: {
      type: String,
      default: '#FFFFFF',
    },
    datas: {
      type: Array,
      default: []
    },
  },
  data() {
    return {}
  },
  methods: {
    getContrastColor(color) {
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#000000' : '#FFFFFF';
    },
    init() {
      let lw = this.width;
      let lh = this.height;
      const datas = this.datas;
      const bg = this.bg;
      const circler = this.r;
      const _r_sps = Math.floor(circler / 3);
      if (datas.length != 2) {
        console.log("请输入两个数组");
        return;
      }
      //选择
      const mysel = { 'l': -1, 'r': -1 };
      const maxr = datas[0].length > datas[1].length ? datas[0].length : datas[1].length;
      const _lw = circler * 4 + _r_sps;
      lw = lw > _lw ? lw : _lw;
      const _lh = (circler * 2 + _r_sps) * maxr - _r_sps;
      lh = lh > _lh ? lh : _lh;
      const echo = (ds, id) => {
        if (ds == 'l') {
          if (-1 == mysel.l) {
            mysel.l = id;
            d3.select('.lsel' + id)
              .attr("fill", 'red');

          } else {
            if (mysel.l != id) {
              d3.select('.lsel' + mysel.l)
                .attr("fill", bg);
              mysel.l = id;
              d3.select('.lsel' + id)
                .attr("fill", 'red');
            } else {
              mysel.l = -1;
              d3.select('.lsel' + id)
                .attr("fill", bg);
            }

          }
        } else if (ds == 'r') {
          if (-1 == mysel.r) {
            mysel.r = id;
            d3.select('.rsel' + id)
              .attr("fill", 'red');
          } else {
            if (mysel.r != id) {
              d3.select('.rsel' + mysel.r)
                .attr("fill", bg);
              mysel.r = id;
              d3.select('.rsel' + id)
                .attr("fill", 'red');
            } else {
              mysel.r = -1;
              d3.select('.rsel' + id)
                .attr("fill", bg);
            }

          }
        }

        this.$emit("echo", mysel.l, mysel.r);
      }
      const cancelsel = () => {
        if (-1 != mysel.l) {
          d3.select('.lsel' + mysel.l)
            .attr("fill", bg);
          mysel.l = -1;
        }
        if (-1 != mysel) {
          d3.select('.rsel' + mysel.r)
            .attr("fill", bg);
          mysel.r = -1;
        }
        this.$emit("echo", mysel.l, mysel.r);
      }

      const svg = d3
        .select('.container')
        .append('svg')
        .attr('width', lw)
        .attr('height', lh);

      for (let i = 0; i < datas[0].length; i++) {
        const _t = datas[0][i];
        _t._x = circler + 7;
        _t._y = (circler * 2 + _r_sps) * i + circler + 7;
      }
      for (let i = 0; i < datas[1].length; i++) {
        const _t = datas[1][i];
        _t._x = lw - circler - 7;
        _t._y = (circler * 2 + _r_sps) * i + circler + 7;
      }
      svg.append('g')
        .append("rect")
        .attr("width", lw)
        .attr("height", lh)
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", bg)
        .on("click", e => cancelsel());
      svg.append('g').attr('class', 'leftr');
      svg.append('g').attr('class', 'rightr');
      svg.append('g')
        .selectAll('circle')
        .data(datas[0])
        .enter()
        .append('circle')
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler + 5)
        .attr('fill', bg)
        .attr('class', d => 'lsel' + d.id)

      svg.append('g')
        .selectAll('circle')
        .data(datas[0])
        .enter()
        .append('circle')
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler)
        .attr('fill', 'black')
        .attr('opacity', '0.48')
      svg.append('g')
        .selectAll('circle')
        .data(datas[0])
        .enter()
        .append('circle')
        .style("cursor", "pointer")
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler - 2)
        .attr('fill', d => d.c)
        .attr('id', d => d.id)
        .attr('class', d => 'l' + d.id)
        .on("click", e => echo('l', e.target.id))
        .on("mouseover", function (d) {
          d3.select('.l' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 0.58);
        })
        .on("mouseout", function (d) {
          d3.select('.l' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 1);
        })

      //文字
      svg.append('g')
        .selectAll('text')
        .data(datas[0])
        .enter()
        .append('text')
        .text(d => d.name)
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("x", d => d._x)
        .attr("y", d => d._y)
        .attr("font-family", "sans-serif")
        .attr("font-size", d => Math.abs(circler * 2 / 3))
        .attr("fill", d => this.getContrastColor(d.c))
        .attr("class", d => "ltext" + d.id)
        .attr('id', d => d.id)
        .on("click", e => echo('l', e.target.id))
        .on("mouseover", function (d) {
          d3.select('.l' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 0.58);
        })
        .on("mouseout", function (d) {
          d3.select('.l' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 1);
        })

      svg.append('g')
        .selectAll('circle')
        .data(datas[1])
        .enter()
        .append('circle')
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler + 5)
        .attr('fill', bg)
        .attr('class', d => 'rsel' + d.id)
      svg.append('g')
        .selectAll('circle')
        .data(datas[1])
        .enter()
        .append('circle')
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler)
        .attr('fill', 'black')
        .attr('opacity', '0.48')
      svg.append('g')
        .selectAll('circle')
        .data(datas[1])
        .enter()
        .append('circle')
        .style("cursor", "pointer")
        .attr('cx', d => d._x)
        .attr('cy', d => d._y)
        .attr('r', circler - 2)
        .attr('fill', d => d.c)
        .attr('id', d => d.id)
        .attr('class', d => 'r' + d.id)
        .on("click", e => echo('r', e.target.id))
        .on("mouseover", function (d) {
          d3.select('.r' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 0.58);
        })
        .on("mouseout", function (d) {
          d3.select('.r' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 1);
        })

      svg.append('g')
        .selectAll('text')
        .data(datas[1])
        .enter()
        .append('text')
        .text(d => d.name)
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("x", d => d._x)
        .attr("y", d => d._y)
        .attr("font-family", "sans-serif")
        .attr("font-size", d => Math.abs(circler * 2 / 3))
        .attr("fill", d => this.getContrastColor(d.c))
        .attr("class", d => "ltext" + d.id)
        .attr('id', d => d.id)
        .on("click", e => echo('r', e.target.id))
        .on("mouseover", function (d) {
          d3.select('.r' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 0.58);
        })
        .on("mouseout", function (d) {
          d3.select('.r' + d.target.id)
            .transition()
            .duration(250)
            .attr("opacity", 1);
        })

      let lineCtx = [];
      for (let i = 0; i < datas[0].length; i++) {
        const _l = datas[0][i].to;
        if (typeof _l == 'string' && _l.length > 0) {
          for (let j = 0; j < datas[1].length; j++) {
            const _id = datas[1][j].id;
            if (_l === _id) {
              lineCtx.push({ 'l': i, 'r': j });
            }
          }
        }
      }
      for (let i = 0; i < datas[1].length; i++) {
        const _r = datas[1][i].to;
        if (typeof _r == 'string' && _r.length > 0) {
          for (let j = 0; j < datas[0].length; j++) {
            const _id = datas[0][j].id;
            if (_r === _id) {
              let _exist = false;
              lineCtx.forEach(el => {
                if (el.l == j && el.r == i) {
                  _exist = true;
                }
              })
              if (!_exist) {
                lineCtx.push({ 'l': j, 'r': i });
              }
            }
          }
        }
      }
      //绘制连线
      svg.append('g')
        .selectAll('line')
        .data(lineCtx)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .style('stroke-width', '6')
        .attr('x1', d => datas[0][d.l]._x + circler + 5)
        .attr('y1', d => datas[0][d.l]._y)
        .attr('x2', d => datas[1][d.r]._x - circler - 5)
        .attr('y2', d => datas[1][d.r]._y)
    },

  },
  watch: {
    value(datas) {
      d3.select('svg').selectAll('*').remove();
      d3.select('svg').remove();
      this.init();
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>
