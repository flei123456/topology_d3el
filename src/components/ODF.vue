<template>
  <div class="container"></div>
</template>

<script>
import d3 from "libs/d3.v7.min.js";
import { onMounted, watch } from 'vue';

export default {
  name: 'ODF',
  emits: ['echo'],
  props: {
    name: String,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 1600
    },
    bg: {
      type: String,
      default: '#FFFFFF'
    },
    datas: {
      type: Array,
      default: []
    },
    coloruse: {
      type: Object,
      default: ()=> {
        return {
          'nouse': { 'b': '#0000CC', 't': '#ffffff', 'd': '空闲' }, //绿色，空闲
          'inuse': { 'b': '#ff0000', 't': '#ffffff', 'd': '在用' }, //红色，在用
          'damage': { 'b': '#000000', 't': '#ffffff', 'd': '损坏' } //黑色，损坏
        }
      }
    },
  },
  data() {
    return {
      st: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'L'],
      colorChooseArr:[
        this.coloruse.nouse,
        this.coloruse.inuse,
        this.coloruse.damage
      ]
    }
  },
  methods: {
    echo(s, v, p) { this.$emit("echo", s, v, p); },
    mover(e) {
      const elt = ".t" + e.target.__data__.s + "-" + e.target.__data__.v + "-" + e.target.__data__.h;
      const elr = ".r" + e.target.__data__.s + "-" + e.target.__data__.v + "-" + e.target.__data__.h;
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("font-size", "22px");
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("fill", "black");
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("stroke", "black");
      d3.select(elr)
        .transition()
        .duration(120)
        .attr("fill", "white");
    },
    mout(e) {
      const elt = ".t" + e.target.__data__.s + "-" + e.target.__data__.v + "-" + e.target.__data__.h;
      const elr = ".r" + e.target.__data__.s + "-" + e.target.__data__.v + "-" + e.target.__data__.h;
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("font-size", "18px");
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("fill", this.colorChooseArr[e.target.__data__.status].t);
      d3.select(elt)
        .transition()
        .duration(120)
        .attr("stroke", this.colorChooseArr[e.target.__data__.status].t);
      d3.select(elr)
        .transition()
        .duration(120)
        .attr("fill", this.colorChooseArr[e.target.__data__.status].b);
    },
    init() {
      const rack = this.datas;
      let lw = this.width;
      let lh = this.height;
      let bg = this.bg;
      let rectWidth = 50;
      let rectHeight = 22;
      if (!rack instanceof Array && !rack[0] instanceof Array) {
        console.log("datas not array");
        return;
      }
      const totalSlot = rack.length;
      let maxCol = rack[0][0].length;
      let maxRow = rack[0].length;
      rack.forEach(arr => {
        maxRow = maxRow > arr.length ? maxRow : arr.length;
        arr.forEach(childarr => {
          maxCol = maxCol > childarr.length ? maxCol : childarr.length;
        })
      })

      const _slot_sps = 8;//槽位间隔
      const _port_sps = 6;//端口间间隔
      const _slot_text = 32; //槽位文字间隔
      const _port_text = 48; //行文字间隔
      const _port_identify = _slot_sps * 2 + rectHeight; //底部port端口标识文字空位

      const _portBox_start = _slot_text + _port_text + 12;
      let _lw = (rectWidth + _port_sps) * maxCol + _port_sps + _slot_sps * 2 + _portBox_start + 10;
      let _lh = ((rectHeight + _port_sps) * maxRow + _port_sps + _slot_sps) * rack.length + _slot_sps + _port_identify + 20; //上下边框各10共20,(_slot_sps*2+rectHeight)底部颜色说明

      lw = lw > _lw ? lw : _lw;
      lh = lh > _lh ? lh : _lh;

      //端口宽
      rectWidth = Math.floor((lw - 10 - _portBox_start - _slot_sps * 2 - _port_sps) / maxCol - _port_sps);
      //端口高
      rectHeight = Math.floor(((lh - 20 - _port_identify - _slot_sps) / rack.length - _slot_sps - _port_sps) / maxRow - _port_sps);

      //计算 槽位 框框
      let slog = [];
      for (let i = 0; i < rack.length; i++) {
        const _item = rack[i];
        let _x = _portBox_start + _slot_sps;
        let _y = 10 + _slot_sps + ((rectHeight + _port_sps) * maxRow + _port_sps + _slot_sps) * i;
        let _w = (rectWidth + _port_sps) * maxCol + _port_sps;
        let _h = (rectHeight + _port_sps) * maxRow + _port_sps;
        slog.push({
          x: _x,
          y: _y,
          w: _w,
          h: _h
        })
      }

      //计算 Port 口 位置
      for (let i = 0; i < rack.length; i++) {
        for (let j = 0; j < rack[i].length; j++) {
          const _y = ((rectHeight + _port_sps) * maxRow + _port_sps + _slot_sps) * i + _slot_sps + 10 + (rectHeight + _port_sps) * j + _port_sps;
          for (let k = 0; k < rack[i][j].length; k++) {
            const _x = _portBox_start + _port_sps + (rectWidth + _port_sps) * k;
            rack[i][j][k]._x = _x + _slot_sps;
            rack[i][j][k]._y = _y;
            rack[i][j][k]._w = rectWidth;
            rack[i][j][k]._h = rectHeight;
            rack[i][j][k]._text = k + 1;
            rack[i][j][k].s = i;
            rack[i][j][k].v = j;
            rack[i][j][k].h = k;
          }
        }
      }

      const svg = d3.select('.container')
        .append('svg')
        .attr("width", lw)
        .attr("height", lh);
      lh = lh - _port_identify;
      svg.append("g").attr("class", "frame");
      d3.select('.frame').append("rect")
        .attr("width", lw)
        .attr("height", lh - _port_identify + _slot_sps)
        .attr("rx", 10)
        .style("fill", "black")
      d3.select('.frame').append("rect")
        .attr("width", lw - 20)
        .attr("height", lh - _port_identify + _slot_sps - 20)
        .attr("x", 10)
        .attr("y", 10)
        .attr("rx", 10)
        .style("fill", bg)
      svg.append('g')
        .selectAll("rect")
        .data(slog)
        .enter()
        .append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.w)
        .attr("height", d => d.h)
        .attr("rx", 12)
        .style("fill", "#5d5e5c")
      const stitle = [];
      for (let i = 0; i < rack.length; i++) {
        const x = 12;
        const y = 10 + ((rectHeight + _port_sps) * maxRow + _port_sps + _slot_sps) * i + ((rectHeight + _port_sps) * maxRow + _port_sps + _slot_sps) / 2;
        stitle.push({ x: x, y: y, title: i + 1 });

      }
      svg.append('g').selectAll("text")
        .data(stitle)
        .enter()
        .append("text")
        .text(d => d.title)
        .attr("x", function (d) { return d.x + 28; })
        .attr("y", function (d) { return d.y + 20; })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", rectHeight * 2)
        .attr("stroke", "black")

      svg.append('g').attr('class', 'dtext');
      for (let i = 0; i < rack.length; i++) {
        if (rack[i] instanceof Array && rack[i].length > 0) {
          for (let j = 0; j < rack[i].length; j++) {
            if (rack[i][j] instanceof Array && rack[i][j].length > 0) {
              d3.select('.dtext')
                .append("text")
                .text(this.st[j])
                .attr("x", _port_text + _slot_text + 5)
                .attr("y", rack[i][j][0]._y + _slot_sps + _port_sps + 8)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", rectHeight)
                .attr("stroke", "black")
            }
          }
        }
      }

      //绘制port
      for (let i = 0; i < rack.length; i++) {
        for (let j = 0; j < rack[i].length; j++) {
          const item = rack[i][j];
          svg.append('g')
            .selectAll("rect")
            .data(item)
            .enter()
            .append("rect")
            .style("cursor", "pointer")
            .attr("x", d => d._x)
            .attr("y", d => d._y)
            .attr("width", d => d._w)
            .attr("height", d => d._h)
            .attr("rx", 8)
            .attr("fill", d => this.colorChooseArr[d.status].b)
            .attr("class", (d) => "r" + d.s + "-" + d.v + "-" + d.h)
            .on("click", e => this.echo(e.target.__data__.s, e.target.__data__.v, e.target.__data__.h))
            .on("mouseover", (e) => {
              this.mover(e);
            })
            .on("mouseout", (e) => {
              this.mout(e);
            })
          //文字
          svg.append("g")
            .selectAll("text")
            .data(item)
            .enter()
            .append("text")
            .style("cursor", "pointer")
            .text(d => d._text)
            .attr("x", d => { return Number(d._x) + 26; })
            .attr("y", d => { return Number(d._y) + 18; })
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "18px")
            .attr("fill", d => this.colorChooseArr[d.status].t)
            .attr("stroke", d => this.colorChooseArr[d.status].t)
            .attr("class", (d) => "t" + d.s + "-" + d.v + "-" + d.h)
            .on("click", e => this.echo(e.target.__data__.s, e.target.__data__.v, e.target.__data__.h))
            .on("mouseover", (e) => {
              this.mover(e);
            })
            .on("mouseout", (e) => {
              this.mout(e);
            })
        }
      }
      let _odfdesc_top = lh - _slot_sps - rectHeight / 2;
      svg.append("g").attr("class", "odfdesc");
      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 448)
        .attr("y", _odfdesc_top)
        .attr("width", rectWidth)
        .attr("height", rectHeight + 2)
        .attr("rx", (rectHeight > rectWidth ? rectWidth : rectHeight) / 4)
        .attr("fill", this.coloruse.inuse.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.inuse.d) //在用、空闲、损坏
        .attr("x", lw - 386)
        .attr("y", _odfdesc_top + _slot_sps + rectHeight / 2)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "black")
        .attr("stroke", "black")

      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 288)
        .attr("y", _odfdesc_top)
        .attr("width", rectWidth)
        .attr("height", rectHeight + 2)
        .attr("rx", (rectHeight > rectWidth ? rectWidth : rectHeight) / 4)
        .attr("fill", this.coloruse.nouse.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.nouse.d) //在用、空闲、损坏
        .attr("x", lw - 226)
        .attr("y", _odfdesc_top + _slot_sps + rectHeight / 2)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "black")
        .attr("stroke", "black")

      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 128)
        .attr("y", _odfdesc_top)
        .attr("width", rectWidth)
        .attr("height", rectHeight + 2)
        .attr("rx", (rectHeight > rectWidth ? rectWidth : rectHeight) / 4)
        .attr("fill", this.coloruse.damage.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.damage.d) //在用、空闲、损坏
        .attr("x", lw - 66)
        .attr("y", _odfdesc_top + _slot_sps + rectHeight / 2)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "black")
        .attr("stroke", "black")
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
