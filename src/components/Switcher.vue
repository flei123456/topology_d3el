<template>
  <div class="container"></div>
</template>

<script>
import d3 from "libs/d3.v7.min.js";
import { onMounted, watch } from 'vue';

export default {
  name: 'Switcher',
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
    portw: {
      type: Number,
      default: 76,
    },
    porth: {
      type: Number,
      default: 48,
    },
    datas: {
      type: Object,
      default: ()=>{
        return {
          uplink: [
            { 'name': '上行口1', 'status': 0, 'id': '61', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '上行口2', 'status': 0, 'id': '62', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '上行口3', 'status': 0, 'id': '63', 'speed': '1000', 'from': '', 'to': '' }
          ],
          serial: [
            { 'name': '串口1', 'status': 0, 'id': '71', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '串口2', 'status': 0, 'id': '72', 'speed': '1000', 'from': '', 'to': '' },
          ],
          ports: [
            [
              { 'name': '端口1', 'status': 0, 'id': '1', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口2', 'status': 0, 'id': '2', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口3', 'status': 0, 'id': '3', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口4', 'status': 0, 'id': '4', 'speed': '1000', 'from': '', 'to': '' }
            ],
            [
              { 'name': '端口5', 'status': 0, 'id': '5', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口6', 'status': 0, 'id': '6', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口7', 'status': 0, 'id': '7', 'speed': '1000', 'from': '', 'to': '' },
              { 'name': '端口8', 'status': 0, 'id': '8', 'speed': '1000', 'from': '', 'to': '' }
            ]
          ]
        }
      }
    },
    coloruse: {
      type: Object,
      default: ()=>{
        return {
          'nouse': { 'b': '#0000CC', 't': '#ffffff', 'd': '空闲' }, //绿色，空闲
          'inuse': { 'b': '#ff0000', 't': '#ffffff', 'd': '在用' }, //红色，在用
          'damage': { 'b': '#000000', 't': '#ffffff', 'd': '损坏' } //黑色，损坏
        }
      }
    }
  },
  data(){
    return {
      coloruseArr:[
        this.coloruse.nouse,
        this.coloruse.inuse,
        this.coloruse.damage
      ],
    }
  },
  methods: {
    echo(id){this.$emit("echo", id);},
    init() {
      const uplinkport = this.datas.uplink ? this.datas.uplink : [];
      const serialport = this.datas.serial ? this.datas.serial : [];
      const _servicePort = this.datas.ports ? this.datas.ports : [];
      let servicePort = [];
      if (_servicePort.length > 0 && !(_servicePort[0] instanceof Array)) {
        servicePort[0] = _servicePort;
      } else {
        servicePort = _servicePort;
      }
      let nodename = this.name;
      let lw = this.width;
      let lh = this.height;
      let pw = this.portw;
      let ph = this.porth;
      const _port_sps = 10; //端口之间的间隔
      const _sps = 20; //上行端口与业务端口之间的间隔
      const _top = 52;
      const _top_text = 12;
      const _left_margin = 16; //左边空间
      const _port_identify = Math.floor(_port_sps * 2 + ph * 2 / 3);

      let maxNumServicePort = 0;
      if (servicePort instanceof Array) {
        for (let i = 0; i < servicePort.length; i++) {
          if (servicePort[i] instanceof Array) {
            maxNumServicePort = maxNumServicePort > servicePort[i].length ? maxNumServicePort : servicePort[i].length;
          }
        }
      }
      let maxNumSerialPort = 0;
      if (serialport instanceof Array) {
        maxNumSerialPort = maxNumSerialPort > serialport.length ? maxNumSerialPort : serialport.length;
      }
      let maxNumUplinkPort = 0;
      if (uplinkport instanceof Array) {
        maxNumUplinkPort = maxNumUplinkPort > uplinkport.length ? maxNumUplinkPort : uplinkport.length;
      }
      const maxSerialUpLinkPort = maxNumSerialPort > maxNumUplinkPort ? maxNumSerialPort : maxNumUplinkPort;

      //计算lw的总宽度
      let _lw = (pw + _port_sps) * maxNumServicePort - _port_sps + _left_margin + 20; // 20是左右两边留空
      let _mxP = maxNumUplinkPort > maxNumSerialPort ? maxNumUplinkPort : maxNumSerialPort;
      _lw = _lw + _sps + (pw + _port_sps) * _mxP - _port_sps;
      lw = lw > _lw ? lw : _lw;

      //计算lh的总高度
      let _portRow = serialport.length;
      if (_portRow < 2) {
        let numPort = 0;
        if (maxNumSerialPort != 0) {
          numPort++;
        }
        if (maxNumUplinkPort != 0) {
          numPort++;
        }
        _portRow = numPort > _portRow ? numPort : _portRow;
      }
      const _lh = (ph + _port_sps) * _portRow + _top + 20; //20上下空白
      lh = lh > _lh ? lh : _lh;

      const svg = d3
        .select('.container')
        .append('svg')
        .attr('width', lw)
        .attr('height', lh + _port_identify)
      //绘制机框
      svg.append("g").attr("class", "p1");
      d3.select('.p1').append("rect")
        .attr("width", lw)
        .attr("height", lh)
        .attr("rx", 10)
        .style("fill", "#000000")

      d3.select('.p1').append("rect")
        .attr("width", lw - 20)
        .attr("height", lh - 20)
        .attr("x", 10)
        .attr("y", 10)
        .attr("rx", 10)
        .style("fill", "white")

      const _first_line_start = _top + _top_text + 10;
      //计算serial的位置
      if (serialport.length > 0) {
        for (let i = 0; i < serialport.length; i++) {
          serialport[i]._x = (pw + _port_sps) * i + _left_margin + 10;
          serialport[i]._y = _first_line_start;
        }
        svg.append('g')
          .selectAll('rect')
          .data(serialport)
          .enter()
          .append('rect')
          .style("cursor", "pointer")
          .attr("width", pw)
          .attr("height", ph)
          .attr("x", t => t._x)
          .attr("y", t => t._y)
          .attr("rx", 12)
          .attr("fill", t => this.coloruseArr[t.status].b)
          .attr('id', d => d.id)
          .attr('class', d => 'pserial' + d.id)
          .on("click", e => this.echo(e.target.id))
          .on("mouseover", (d)=>{
            d3.select('.pserial' + d.target.id)
              .transition()
              .duration(250)
              .attr("fill", "#C0C0C0");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "black");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "black");
          })
          .on("mouseout", (d)=> {
            d3.select('.pserial' + d.target.id)
              .transition()
              .duration(250)
              .attr("fill", this.coloruseArr[d.target.__data__.status].b);
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");
          })

        //文字
        svg.append("g")
          .selectAll("text")
          .data(serialport)
          .enter()
          .append("text")
          .text(d => d.name)
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .attr("x", d => d._x + pw / 2)
          .attr("y", d => d._y + ph * 0.68)
          .attr("font-family", "sans-serif")
          .attr("font-size", ph * 3 / 7)
          .attr("fill", "#FFFFFF")
          .attr("stroke", "#FFFFFF")
          .attr('id', d => d.id)
          .attr('class', d => 'pserialtext' + d.id)
          .on("click", e => this.echo(e.target.id))
          .on("mouseover", (d)=> {
            d3.select('.pserial' + d.target.id)
              .transition()
              .duration(250)
              .attr("fill", "#C0C0C0");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "black");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "black");
          })
          .on("mouseout", (d)=> {
            d3.select('.pserial' + d.target.id)
              .transition()
              .duration(250)
              .attr("fill", this.coloruseArr[d.target.__data__.status].b);
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.pserialtext' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");
          })

      }
      //计算uplink的位置
      if (uplinkport.length > 0) {
        let _f_l = _first_line_start;
        if (serialport.length > 0) {
          _f_l = _first_line_start + (ph + _port_sps);
        }
        for (let i = 0; i < uplinkport.length; i++) {
          uplinkport[i]._x = (pw + _port_sps) * i + _left_margin + 10;
          uplinkport[i]._y = _f_l;
        }
        svg.append('g')
          .selectAll('rect')
          .data(uplinkport)
          .enter()
          .append('rect')
          .style("cursor", "pointer")
          .attr("width", pw)
          .attr("height", ph)
          .attr("x", t => t._x)
          .attr("y", t => t._y)
          .attr("rx", 12)
          .attr("fill", t => this.coloruseArr[t.status].b)
          .attr('id', d => d.id)
          .attr('class', d => 'puplink' + d.id)
          .on("click", e => this.echo(e.target.id))
          .on("mouseover", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#C0C0C0");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");
          })
          .on("mouseout", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", this.coloruseArr[d.target.__data__.status].b);
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");
          })

        //文字
        svg.append("g")
          .selectAll("text")
          .data(uplinkport)
          .enter()
          .append("text")
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .text(d => d.name)
          .attr("x", d => d._x + pw / 2)
          .attr("y", d => d._y + ph * 0.45)
          .attr("font-family", "sans-serif")
          .attr("font-size", ph * 3 / 7)
          .attr("fill", "white")
          .attr("stroke", "white")
          .attr('id', d => d.id)
          .attr('class', d => 'puplinktext1_' + d.id)
          .on("click", e => this.echo(e.target.id))
          .on("mouseover", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#C0C0C0");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");
          })
          .on("mouseout", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", this.coloruseArr[d.target.__data__.status].b);
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");
          })

        svg.append("g")
          .selectAll("text")
          .data(uplinkport)
          .enter()
          .append("text")
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .text(d => d.speed)
          .attr("x", d => d._x + pw / 2)
          .attr("y", d => d._y + ph * 0.9)
          .attr("font-family", "sans-serif")
          .attr("font-size", ph * 3 / 7)
          .attr("fill", "white")
          .attr("stroke", "white")
          .attr('id', d => d.id)
          .attr('class', d => 'puplinktext2_' + d.id)
          .on("click", e => this.echo(e.target.id))
          .on("mouseover", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#C0C0C0");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#000000");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#000000");
          })
          .on("mouseout", (d)=> {
            d3.select('.puplink' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", this.coloruseArr[d.target.__data__.status].b);
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext1_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");

            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("fill", "#FFFFFF");
            d3.select('.puplinktext2_' + d.target.id)
              .transition()
              .duration(120)
              .attr("stroke", "#FFFFFF");
          })
      }
      //计算serviceport的位置
      if (servicePort.length > 0) {
        for (let i = 0; i < servicePort.length; i++) {
          if (servicePort[i].length > 0) {
            const _base_x = 10 + _left_margin + (pw + _port_sps) * maxSerialUpLinkPort;
            for (let j = 0; j < servicePort[i].length; j++) {
              servicePort[i][j]._x = lw - (maxNumServicePort - j) * (pw + _port_sps) - 10;
              servicePort[i][j]._y = _first_line_start + (ph + _port_sps) * i;
            }
            svg.append('g')
              .selectAll('rect')
              .data(servicePort[i])
              .enter()
              .append('rect')
              .style("cursor", "pointer")
              .attr("width", pw)
              .attr("height", ph)
              .attr("x", t => t._x)
              .attr("y", t => t._y)
              .attr("rx", 12)
              .attr("fill", t => this.coloruseArr[t.status].b)
              .attr('id', d => d.id)
              .attr('class', d => 'svrport' + d.id)
              .on("click", e => this.echo(e.target.id))
              .on("mouseover", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#C0C0C0");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");
              })
              .on("mouseout", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", this.coloruseArr[d.target.__data__.status].b);
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");
              })


            svg.append("g")
              .selectAll("text")
              .data(servicePort[i])
              .enter()
              .append("text")
              .style("cursor", "pointer")
              .attr("text-anchor", "middle")
              .text(d => d.name)
              .attr("x", d => d._x + pw / 2)
              .attr("y", d => d._y + ph * 0.45)
              .attr("font-family", "sans-serif")
              .attr("font-size", ph * 3 / 7)
              .attr("fill", "white")
              .attr("stroke", "white")
              .attr('id', d => d.id)
              .attr('class', d => 'svrporttext1_' + d.id)
              .on("click", e => this.echo(e.target.id))
              .on("mouseover", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#C0C0C0");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");
              })
              .on("mouseout", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", this.coloruseArr[d.target.__data__.status].b);
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");
              })

            svg.append("g")
              .selectAll("text")
              .data(servicePort[i])
              .enter()
              .append("text")
              .style("cursor", "pointer")
              .attr("text-anchor", "middle")
              .text(d => d.speed)
              .attr("x", d => d._x + pw / 2)
              .attr("y", d => d._y + ph * 0.9)
              .attr("font-family", "sans-serif")
              .attr("font-size", ph * 3 / 7)
              .attr("fill", "white")
              .attr("stroke", "white")
              .attr('id', d => d.id)
              .attr('class', d => 'svrporttext2_' + d.id)
              .on("click", e => this.echo(e.target.id))
              .on("mouseover", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#C0C0C0");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#000000");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#000000");
              })
              .on("mouseout", (d)=> {
                d3.select('.svrport' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", this.coloruseArr[d.target.__data__.status].b);
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext1_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");

                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("fill", "#FFFFFF");
                d3.select('.svrporttext2_' + d.target.id)
                  .transition()
                  .duration(120)
                  .attr("stroke", "#FFFFFF");
              })
          }
        }
      }

      //配置交换机的名称
      svg.append("text")
        .text(nodename)
        .attr("x", _left_margin + 10 - 2)
        .attr("y", _top)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "32px")
        .attr("stroke", "#000000")

      const _odfdesc_top = lh + _port_sps;
      svg.append("g").attr("class", "odfdesc");
      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 468)
        .attr("y", _odfdesc_top)
        .attr("width", pw)
        .attr("height", ph * 3 / 4)
        .attr("rx", (ph > pw ? pw : ph) / 4)
        .attr("fill", this.coloruse.inuse.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.inuse.d) //在用、空闲、损坏
        .attr("x", lw - 386)
        .attr("y", _odfdesc_top + _port_sps + ph / 3)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "#000000")
        .attr("stroke", "#000000")

      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 308)
        .attr("y", _odfdesc_top)
        .attr("width", pw)
        .attr("height", ph * 3 / 4)
        .attr("rx", (ph > pw ? pw : ph) / 4)
        .attr("fill", this.coloruse.nouse.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.nouse.d) //在用、空闲、损坏
        .attr("x", lw - 226)
        .attr("y", _odfdesc_top + _port_sps + ph / 3)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "#000000")
        .attr("stroke", "#000000")

      d3.select(".odfdesc")
        .append("rect")
        .attr("x", lw - 148)
        .attr("y", _odfdesc_top)
        .attr("width", pw)
        .attr("height", ph * 3 / 4)
        .attr("rx", (ph > pw ? pw : ph) / 4)
        .attr("fill", this.coloruse.damage.b)

      d3.select(".odfdesc")
        .append("text")
        .text(this.coloruse.damage.d) //在用、空闲、损坏
        .attr("x", lw - 66)
        .attr("y", _odfdesc_top + _port_sps + ph / 3)
        .attr("text-anchor", "left")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", "22px")
        .attr("fill", "#000000")
        .attr("stroke", "#000000")
    },
  },
  watch:{
    value(datas) {
      d3.select('svg').selectAll('*').remove();
      d3.select('svg').remove();
      this.init();
    }
  },
  mounted(){
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
