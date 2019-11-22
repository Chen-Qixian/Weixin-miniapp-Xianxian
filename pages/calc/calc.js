// pages/calc/calc.js
Page({

  /**
   * Page initial data
   */
  data: {
    idb: "back",
    idc: "clear",
    idadd: "＋",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "－",
    id6: "6",
    id5: "5",
    id4: "4",
    idx: "×",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "÷",
    id0: "0",
    idd: ".",
    ide: "＝",
    screenData: "0",
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs:[],
    lastIsOperaSymbo: false,
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  clickBtn: function(event) {
    let id = event.target.id;
    // delete the last number
    if(id == this.data.idb) {
      let data = this.data.screenData;
      if(data == "0") {
        return;
      }
      data = data.substring(0, data.length - 1);
      if(data == "" || data == "-") {
        data = 0;
      }
      this.setData({"screenData": data});
      this.data.arr.pop();
    }
    // clear value
    else if(id == this.data.idc) {
      this.setData({"screenData": "0"});
      this.data.arr.length = 0;
    }
    // calculate equals
    else if(id == this.data.ide) {
      let data = this.data.screenData;
      if(data == "0") {
        return;
      }
      let lastWord = data.charAt(data.length);
      if(isNaN(lastWord)) {
        return;
      }
      let num = "";
      let lastOperator = "";
      let arr = this.data.arr;
      let optarr = [];
      for(let i in arr) {
        if(isNaN(arr[i]) == false || arr[i] == this.data.idd) {
          num += arr[i];
        }
        else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      let result = Number(optarr[0]) * 1.0;
      console.log(result);
      for(let i = 1 ; i < optarr.length ; i ++) {
        if(isNaN(optarr[i])) {
          if(optarr[1] == this.data.idadd) {
            result += Number(optarr[i + 1]);
          }
          else if(optarr[1] == this.data.idj) {
            result -= Number(optarr[i + 1]);
          }
          else if(optarr[1] == this.data.idx) {
            result *= Number(optarr[i + 1]);
          }
          else if(optarr[1] == this.data.iddiv) {
            result /= Number(optarr[i + 1]);
          }
        }
      }
      // save history log
      this.data.logs.push(data + result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({"screenData": result+""});
    }
    // input value
    else {
      if(this.data.operaSymbo[id]) {
        if(this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }
      let sd = this.data.screenData;
      let data;
      if(sd == 0) {
        data = id;
      }
      else {
        data = sd + id;
      }
      this.setData({"screenData": data});
      this.data.arr.push(id);
      if(this.data.operaSymbo[id]) {
        this.setData({"lastIsOperaSymbo": true});
      }
      else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  }

})