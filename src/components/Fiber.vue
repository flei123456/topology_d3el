<template>
  <div class="container"></div>
</template>

<script>
import d3 from "libs/d3.v7.min.js";
import { onMounted, watch } from 'vue';

export default {
  name: 'Fiber',
  emits: ['echo'],
  props: {
    name: {
      type: String,
      default: "光纤管理"
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 800
    },
    //背景颜色
    bg: {
      type: String,
      default: '#FFFFFF'
    },
    datas: {
      type: Array,
      default: [
        //圆形管
        // { 'id': '1', 'title': '蓝管', 'desc': '', 'bc': '#0000FF', 'tc': '#000000' }, //bc背景，tc文字颜色
        // { 'id': '2', 'title': '桔管', 'desc': '', 'bc': '#FF8C00', 'tc': '#000000' },
        // { 'id': '3', 'title': '绿管', 'desc': '', 'bc': '#006400', 'tc': '#000000' },
        // { 'id': '4', 'title': '棕管', 'desc': '', 'bc': '#804000', 'tc': '#000000' },
        // { 'id': '5', 'title': '灰管', 'desc': '', 'bc': '#696969', 'tc': '#000000' },
        // { 'id': '6', 'title': '白管', 'desc': '', 'bc': '#ffffff', 'tc': '#FFFFFF' },
        // { 'id': '7', 'title': '红管', 'desc': '', 'bc': '#8B0000', 'tc': '#000000' },
        // { 'id': '8', 'title': '黑管', 'desc': '', 'bc': '#000000', 'tc': '#FFFFFF' }
        //带状管
        // [
        //     { 'id': '11', 'title': '蓝管', 'desc': ''}, //bc背景，tc文字颜色
        //     { 'id': '12', 'title': '桔管', 'desc': ''},
        //     { 'id': '13', 'title': '绿管', 'desc': ''},
        //     { 'id': '14', 'title': '棕管', 'desc': ''},
        //     { 'id': '15', 'title': '灰管', 'desc': ''},
        //     { 'id': '16', 'title': '白管', 'desc': ''},
        //     { 'id': '17', 'title': '灰管', 'desc': ''},
        //     { 'id': '18', 'title': '白管', 'desc': ''}
        //   ],
        //   [
        //     { 'id': '21', 'title': '蓝管', 'desc': ''}, //bc背景，tc文字颜色
        //     { 'id': '22', 'title': '桔管', 'desc': ''},
        //     { 'id': '23', 'title': '绿管', 'desc': ''},
        //     { 'id': '24', 'title': '棕管', 'desc': ''},
        //     { 'id': '25', 'title': '灰管', 'desc': ''},
        //     { 'id': '26', 'title': '白管', 'desc': ''},
        //     { 'id': '27', 'title': '灰管', 'desc': ''},
        //     { 'id': '28', 'title': '白管', 'desc': ''}
        //   ],
        //   [
        //     { 'id': '31', 'title': '蓝管', 'desc': ''}, //bc背景，tc文字颜色
        //     { 'id': '32', 'title': '桔管', 'desc': ''},
        //     { 'id': '33', 'title': '绿管', 'desc': ''},
        //     { 'id': '34', 'title': '棕管', 'desc': ''},
        //     { 'id': '35', 'title': '灰管', 'desc': ''},
        //     { 'id': '36', 'title': '白管', 'desc': ''},
        //     { 'id': '37', 'title': '灰管', 'desc': ''},
        //     { 'id': '38', 'title': '白管', 'desc': ''}
        //   ],
        //   [
        //     { 'id': '41', 'title': '蓝管', 'desc': ''}, //bc背景，tc文字颜色
        //     { 'id': '42', 'title': '桔管', 'desc': ''},
        //     { 'id': '43', 'title': '绿管', 'desc': ''},
        //     { 'id': '44', 'title': '棕管', 'desc': ''},
        //     { 'id': '45', 'title': '灰管', 'desc': ''},
        //     { 'id': '46', 'title': '白管', 'desc': ''},
        //     { 'id': '47', 'title': '灰管', 'desc': ''},
        //     { 'id': '48', 'title': '白管', 'desc': ''}
        //   ],
      ]
    },
  },
  data() {
    return {
      finberColorText: ['蓝', '桔', '绿', '棕', '灰', '白', '红', '黑', '黄', '紫', '粉', '青'],
      fiberColor: ['#0000FF', '#FF8C00', '#006400', '#804000', '#696969', '#ffffff', '#8B0000', '#000000', '#FFD700', '#800080', '#FF69B4', '#00FFFF'],
    }
  },
  methods: {
    echo(id) {
      this.$emit("echo", id);
    },
    getContrastColor(color) {
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#000000' : '#FFFFFF';
    },
    init() {
      const trunc = this.datas;
      const lw = this.width;
      const lh = this.height;
      const bg = this.bg;
      const cr = lw > lh ? lh : lw;
      if (!trunc instanceof Array || trunc.length < 1) {
        console.log("数据格式不正确");
        return;
      }
      if (trunc.length > 0 && trunc[0] instanceof Array) {
        let maxCol = trunc[0].length; //最长行的个数
        for (let i = 0; i < trunc.length; i++) {
          if (trunc[i] instanceof Array) {
            maxCol = trunc[i].length > maxCol ? trunc[i].length : maxCol;
            for (let j = 0; j < trunc[i].length; j++) {
              let _c = this.fiberColor[j % this.fiberColor.length];
              if (!trunc[i][j].bc) {
                trunc[i][j].bc = _c;
              }
              if (!trunc[i][j].tc) {
                trunc[i][j].tc = this.getContrastColor(_c);
              }
            }
          }
        }

        // 上下，左右各留32的位置
        const bgap = 12; //纤芯之间空间
        let br = 16; //纤芯半径
        const slotIdentWidth = 60 + bgap; //文字标注
        const minBoxW = 16 * 2 * maxCol + 20 * 2 + maxCol * 12 - 12 + slotIdentWidth;
        const minBoxH = 16 * 2 * trunc.length + 20 * 2 + trunc.length * 12 - 12;
        const reCalBR = (w, h, rc, hc, gap, space) => { //纤芯半径计算,gap纤芯之间的空隙，space上下左右留空,rc是横向数量，hc是纵向数量
          w = Number(w);
          h = Number(h);
          rc = Number(rc);
          hc = Number(hc);
          gap = Number(gap);
          space = Number(space);
          const r1 = Math.abs(Math.floor(((w + gap - space * 2) / rc - gap) / 2));
          const r2 = Math.abs(Math.floor(((h + gap - space * 2) / hc - gap) / 2));
          return r1 > r2 ? r2 : r1;
        }
        if (lw > minBoxW) {
          if (lh < minBoxH) {
            lh = minBoxH;
          }
        } else {
          lw = minBoxW;
          if (lh < minBoxH) {
            lh = minBoxH;
          }
        }
        br = reCalBR(lw - slotIdentWidth, lh, maxCol, trunc.length, bgap, 20);
        //纤芯位置
        for (let i = 0; i < trunc.length; i++) {
          const _y = 20 + (br * 2 + bgap) * i + br;
          for (let j = 0; j < trunc[i].length; j++) {
            const el = trunc[i][j];
            el._x = 20 + (br * 2 + bgap) * j + br + slotIdentWidth;
            el._y = _y;
            el._r = br;
          }
        }
        const svg = d3
          .select('.container')
          .append('svg')
          .attr('width', lw)
          .attr('height', lh)
        const _lh_t = 20 * 2 + (br * 2 + bgap) * trunc.length - bgap;
        svg.append("g").attr("class", "p1");
        d3.select('.p1').append("rect")
          .attr("width", lw)
          .attr("height", _lh_t)
          .attr("rx", 10)
          .attr("fill", "black")
          .attr('opacity', '0.66')
        d3.select('.p1').append("rect")
          .attr("width", lw - 20)
          .attr("height", _lh_t - 20)
          .attr("x", 10)
          .attr("y", 10)
          .attr("rx", 10)
          .style("fill", bg)
        svg.append('g').attr('class', 'paneline');
        svg.append('g').attr('class', 'fibero');
        svg.append('g').attr('class', 'fiber');
        svg.append('g').attr('class', 'identText');
        for (let i = 0; i < trunc.length; i++) {
          if (i != trunc.length - 1) {
            const _y = trunc[i][0]._y + trunc[i][0]._r + bgap / 2;
            svg.select('.paneline')
              .append('line')
              .attr('x1', 0)
              .attr('y1', _y)
              .attr('x2', lw)
              .attr('y2', _y)
              .attr('stroke', 'black')
              .attr('stroke-width', 3)
              .attr('fill', 'black')
              .attr('opacity', '0.2')
          }
          d3.select('.identText')
            .append('text')
            .text(i + 1)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", 48)
            .attr("y", trunc[i][0]._y)
            .attr("font-family", "sans-serif")
            .attr("font-size", Math.abs(trunc[i][0]._r * 5 / 4))
            .attr("fill", "black")
            .attr('opacity', '0.66')

          d3.select('.fibero')
            .append('g')
            .selectAll("circle")
            .data(trunc[i])
            .enter()
            .append('circle')
            .attr('cx', d => d._x)
            .attr('cy', d => d._y)
            .attr('r', d => d._r)
            .attr('fill', 'black')
            .attr('opacity', '0.66')
          d3.select('.fiber')
            .append('g')
            .selectAll("circle")
            .data(trunc[i])
            .enter()
            .append('circle')
            .style("cursor", "pointer")
            .attr('cx', d => d._x)
            .attr('cy', d => d._y)
            .attr('r', d => d._r - 1)
            .attr('fill', d => d.bc)
            .attr('id', d => d.id)
            .attr('class', d => 'pcircle' + d.id)
            .attr('opacity', '0.96')
            .on("click", e => this.echo(e.target.id))
            .on("mouseover", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.2");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", "white");
            })
            .on("mouseout", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.96");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", d.target.__data__.tc);
            })
          d3.select('.fiber')
            .append('g')
            .selectAll('text')
            .data(trunc[i])
            .enter()
            .append('text')
            .text(d => d.title)
            .style("cursor", "pointer")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", d => d._x)
            .attr("y", d => d._y)
            .attr("font-family", "sans-serif")
            .attr("font-size", d => Math.abs(d._r / 2))
            .attr("fill", d => d.tc)
            .attr('id', d => d.id)
            .attr('class', d => 'ptext' + d.id)
            .on("click", e => this.echo(e.target.id))
            .on("mouseover", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.2");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", "white");
            })
            .on("mouseout", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.96");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", d.target.__data__.tc);
            })
        }
      } else {
        for (let i = 0; i < trunc.length; i++) {
          let _c = this.fiberColor[i % this.fiberColor.length];
          if (!trunc[i].bc) {
            trunc[i].bc = _c;
          }
          if (!trunc[i].tc) {
            trunc[i].tc = this.getContrastColor(_c);
          }
        }
        const svg = d3.select('.container')
          .append('svg')
          .attr('width', lw)
          .attr('height', lh)
          .attr("viewBox", [-lw / 2 + 1, -lh / 2 + 1, lw - 2, lh - 2])
          .style('background-color', bg)
        svg.append("g").attr('class', 'outer');
        svg.select('.outer')
          .append('circle')
          .style('fill', '#000')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', cr / 2 - 1)
          .attr('opacity', '0.75')
        svg.select('.outer')
          .append('circle')
          .style('fill', '#F8F8F8')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', cr / 2 - 8)
        if (1 == trunc.length) {
          trunc[0]._cx = 0;
          trunc[0]._cy = 0;
          trunc[0]._r = cr / 3;
        } else if (2 == trunc.length) {
          trunc[0]._cx = -cr / 4 + 5;
          trunc[0]._cy = 0;
          trunc[0]._r = cr / 4 - 8;
          trunc[1]._cx = cr / 4 - 5;
          trunc[1]._cy = 0;
          trunc[1]._r = cr / 4 - 8;
        } else if (2 < trunc.length) {
          const _jR = Math.floor(cr / 2 - 8); //大圆半径
          const _jd = Math.PI * 2 / trunc.length; //小圆间隔角度
          const _jd2 = _jd / 2; //小圆间隔角度的一半
          const _r = Math.floor(Math.abs(Math.sin(_jd2) / (1 + Math.sin(_jd2)) * (_jR)));
          const _jRr = _jR - _r;
          trunc[0]._cx = 0;
          trunc[0]._cy = -_jRr;
          trunc[0]._r = _r;
          for (let i = 1; i < trunc.length; i++) {
            let _newjd = (_jd * i).toFixed(6);
            trunc[i]._r = _r;
            if (_newjd == (Math.PI / 2).toFixed(6)) {
              trunc[i]._cx = _jRr;
              trunc[i]._cy = 0;
            } else if (_newjd == (Math.PI).toFixed(6)) {
              trunc[i]._cx = 0;
              trunc[i]._cy = _jRr;
            } else if (_newjd == (Math.PI * (3 / 2)).toFixed(6)) {
              trunc[i]._cx = -_jRr;
              trunc[i]._cy = 0;
            } else if (_newjd == 0 || _newjd == (2 * Math.PI).toFixed(6)) {
              trunc[i]._cx = 0;
              trunc[i]._cy = -_jRr;
            } else if (_newjd < (Math.PI / 2).toFixed(6)) {
              trunc[i]._cx = Math.abs(Math.floor(Math.cos(Math.PI / 2 - _newjd) * _jRr));
              trunc[i]._cy = -Math.abs(Math.floor(Math.sin(Math.PI / 2 - _newjd) * _jRr));
            } else if (_newjd < Math.PI) {
              trunc[i]._cx = Math.abs(Math.floor(Math.cos(_newjd - Math.PI / 2) * (_jRr)));
              trunc[i]._cy = Math.abs(Math.floor(Math.sin(_newjd - Math.PI / 2) * (_jRr)));
            } else if (_newjd < Math.PI * (3 / 2)) {
              trunc[i]._cx = -Math.abs(Math.floor(Math.cos(Math.PI * 3 / 2 - _newjd) * (_jRr)));
              trunc[i]._cy = Math.abs(Math.floor(Math.sin(Math.PI * 3 / 2 - _newjd) * (_jRr)));
            } else if (_newjd < Math.PI * 2) {
              trunc[i]._cx = -Math.abs(Math.floor(Math.cos(_newjd - Math.PI * 3 / 2) * (_jRr)));
              trunc[i]._cy = -Math.abs(Math.floor(Math.sin(_newjd - Math.PI * 3 / 2) * (_jRr)));
            }
          }
        }
        svg.append("g").attr('class', 'circleair');
        svg.append("g").attr('class', 'textair');
        trunc.forEach(el => {
          svg.select('.circleair')
            .append('circle')
            .attr('fill', '#000')
            .attr("text-anchor", "middle")
            .attr('id', el.id)
            .attr('cx', el._cx)
            .attr('cy', el._cy)
            .attr('r', el._r)
            .attr('opacity', '0.6')
          svg.select('.circleair')
            .append('circle')
            .attr('fill', el.bc)
            .attr("text-anchor", "middle")
            .attr("class", "pcircle" + el.id)
            .style("cursor", "pointer")
            .attr('id', el.id)
            .attr('cx', el._cx)
            .attr('cy', el._cy)
            .attr('r', el._r - 3)
            .attr('bc', el.bc)
            .attr('tc', el.tc)
            .attr('opacity', '0.96')
            .on("click", e => this.echo(e.target.id))
            .on("mouseover", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.5");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", "#FFFFFF");
            })
            .on("mouseout", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.96");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", d.target.attributes.tc.value);
            })
          svg.select(".textair")
            .append('text')
            .style("cursor", "pointer")
            .text(el.title)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", el._cx)
            .attr("y", el._cy)
            .attr("font-family", "Microsoft Yahei")
            .attr("font-size", Math.abs(el._r / 3))
            .attr('fill', el.tc)
            .attr("class", "ptext" + el.id)
            .attr('id', el.id)
            .attr('bc', el.bc)
            .attr('tc', el.tc)
            .attr('opacity', '0.88')
            .on("click", e => this.echo(e.target.id))
            .on("mouseover", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.5");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", "#FFFFFF");
            })
            .on("mouseout", function (d) {
              d3.select('.pcircle' + d.target.id)
                .transition()
                .duration(250)
                .attr("opacity", "0.96");
              d3.select('.ptext' + d.target.id)
                .transition()
                .duration(120)
                .attr("fill", d.target.attributes.tc.value);
            })
        })
      }
    },
  },
  watch: {
    value(datas){
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>
