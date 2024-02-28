<template>
  <div id="app">
    <Wiring name="配线盒名称" :width=400 :height=800 :datas="exchangerdatas" :r="36" bg='#FFFFFF' @echo="onExchangerClick"></Wiring>
    <!-- <Fiber name="测试光缆" bg="#FFFFFF" :width=800 :height=800 @echo="onFiberClick" :datas="fiberDatas"></Fiber> -->
    <!-- <ODF name="odf1" :datas="odfdatas" :width=800 :height=1600 @echo="onODFClick"></ODF> -->
    <!-- <Switcher name="交换机名称" :width=800 :height=200 :datas="switchdatas" @echo="onSwitchClick"></Switcher> -->

  </div>
</template>

<script>
import ODF from 'components/ODF.vue';
import Fiber from 'components/Fiber.vue';
import Switcher from 'components/Switcher.vue';
import Wiring from 'components/Wiring.vue';
export default {
  name: 'App',
  components: {
    ODF,
    Fiber,
    Switcher,
    Wiring
  },
  data() {
    return {
      exchangerdatas: [
        [
          { 'name': 'L1', 'id': '1', 'status': 0, 'c': '#0000FF', 'to': '11' },
          { 'name': 'L2', 'id': '2', 'status': 0, 'c': '#FF8C00', 'to': '13' },
          { 'name': 'L3', 'id': '3', 'status': 0, 'c': '#006400', 'to': '15' },
          { 'name': 'L4', 'id': '4', 'status': 0, 'c': '#804000', 'to': '' },
          { 'name': 'L5', 'id': '5', 'status': 0, 'c': '#696969', 'to': '' },
          { 'name': 'L6', 'id': '6', 'status': 0, 'c': '#ffffff', 'to': '' },
          { 'name': 'L7', 'id': '7', 'status': 0, 'c': '#8B0000', 'to': '' },
          { 'name': 'L8', 'id': '8', 'status': 0, 'c': '#000000', 'to': '' },
        ],
        [
          { 'name': 'R1', 'id': '11', 'status': 0, 'c': '#0000FF', 'to': '' },
          { 'name': 'R2', 'id': '12', 'status': 0, 'c': '#FF8C00', 'to': '' },
          { 'name': 'R3', 'id': '13', 'status': 0, 'c': '#006400', 'to': '6' },
          { 'name': 'R4', 'id': '14', 'status': 0, 'c': '#804000', 'to': '' },
          { 'name': 'R5', 'id': '15', 'status': 0, 'c': '#696969', 'to': '' },
          { 'name': 'R6', 'id': '16', 'status': 0, 'c': '#ffffff', 'to': '' },
          { 'name': 'R7', 'id': '17', 'status': 0, 'c': '#8B0000', 'to': '' },
          { 'name': 'R8', 'id': '18', 'status': 0, 'c': '#000000', 'to': '' },
        ]
      ],

      switchdatas: {
        uplink: [
          { 'name': '上行口1', 'status': 0, 'id': '61', 'speed': '1000', 'from': '', 'to': '' },
          { 'name': '上行口2', 'status': 1, 'id': '62', 'speed': '1000', 'from': '', 'to': '' },
          { 'name': '上行口3', 'status': 0, 'id': '63', 'speed': '1000', 'from': '', 'to': '' }
        ],
        serial: [
          { 'name': '串口1', 'status': 0, 'id': '71', 'speed': '1000', 'from': '', 'to': '' },
          { 'name': '串口2', 'status': 0, 'id': '72', 'speed': '1000', 'from': '', 'to': '' },
        ],
        ports: [
          [
            { 'name': '端口1', 'status': 0, 'id': '1', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '端口2', 'status': 2, 'id': '2', 'speed': '100', 'from': '', 'to': '' },
            { 'name': '端口3', 'status': 0, 'id': '3', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '端口4', 'status': 0, 'id': '4', 'speed': '100', 'from': '', 'to': '' }
          ],
          [
            { 'name': '端口5', 'status': 0, 'id': '5', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '端口6', 'status': 1, 'id': '6', 'speed': '10', 'from': '', 'to': '' },
            { 'name': '端口7', 'status': 0, 'id': '7', 'speed': '1000', 'from': '', 'to': '' },
            { 'name': '端口8', 'status': 0, 'id': '8', 'speed': '100', 'from': '', 'to': '' }
          ]
        ]
      },

      odfdatas: [
        //status:0空闲，1占用，2损坏
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ],
        [ //槽位
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }],//行
          [{ status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 1 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }],
          [{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 2 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }]
        ]
      ],


      fiberDatas: [
        // { 'id': '1', 'title': '蓝管', 'desc': '' }, //bc背景，tc文字颜色
        // { 'id': '2', 'title': '桔管', 'desc': '' },
        // { 'id': '3', 'title': '绿管', 'desc': '' },
        // { 'id': '4', 'title': '棕管', 'desc': '' },
        // { 'id': '5', 'title': '灰管', 'desc': '' },
        // { 'id': '6', 'title': '白管', 'desc': '' },
        // { 'id': '7', 'title': '灰管', 'desc': '' },
        // { 'id': '8', 'title': '白管', 'desc': '' }

        [
          { 'id': '11', 'title': '蓝管', 'desc': '' }, //bc背景，tc文字颜色
          { 'id': '12', 'title': '桔管', 'desc': '' },
          { 'id': '13', 'title': '绿管', 'desc': '' },
          { 'id': '14', 'title': '棕管', 'desc': '' },
          { 'id': '15', 'title': '灰管', 'desc': '' },
          { 'id': '16', 'title': '白管', 'desc': '' },
          { 'id': '17', 'title': '灰管', 'desc': '' },
          { 'id': '18', 'title': '白管', 'desc': '' }
        ],
        [
          { 'id': '21', 'title': '蓝管', 'desc': '' }, //bc背景，tc文字颜色
          { 'id': '22', 'title': '桔管', 'desc': '' },
          { 'id': '23', 'title': '绿管', 'desc': '' },
          { 'id': '24', 'title': '棕管', 'desc': '' },
          { 'id': '25', 'title': '灰管', 'desc': '' },
          { 'id': '26', 'title': '白管', 'desc': '' },
          { 'id': '27', 'title': '灰管', 'desc': '' },
          { 'id': '28', 'title': '白管', 'desc': '' }
        ],
        [
          { 'id': '31', 'title': '蓝管', 'desc': '' }, //bc背景，tc文字颜色
          { 'id': '32', 'title': '桔管', 'desc': '' },
          { 'id': '33', 'title': '绿管', 'desc': '' },
          { 'id': '34', 'title': '棕管', 'desc': '' },
          { 'id': '35', 'title': '灰管', 'desc': '' },
          { 'id': '36', 'title': '白管', 'desc': '' },
          { 'id': '37', 'title': '灰管', 'desc': '' },
          { 'id': '38', 'title': '白管', 'desc': '' }
        ],
        [
          { 'id': '41', 'title': '蓝管', 'desc': '' }, //bc背景，tc文字颜色
          { 'id': '42', 'title': '桔管', 'desc': '' },
          { 'id': '43', 'title': '绿管', 'desc': '' },
          { 'id': '44', 'title': '棕管', 'desc': '' },
          { 'id': '45', 'title': '灰管', 'desc': '' },
          { 'id': '46', 'title': '白管', 'desc': '' },
          { 'id': '47', 'title': '灰管', 'desc': '' },
          { 'id': '48', 'title': '白管', 'desc': '' }
        ],
      ],
    }
  },
  methods: {
    onFiberClick(id) {
      console.log("选择的光纤ID : ", id);
    },
    onODFClick(s, v, p) {
      console.log("框：", s, "，槽：", v, "，口：", p);
    },
    onSwitchClick(id) {
      console.log("点击的id: ", id)
    },
    onExchangerClick(l, r) {
      console.log("左边选择了：", l, " , 右边选择了：", r);
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
</style>
