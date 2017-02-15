/**
 * [获取除自己的其他同级元素]
 * @param  {[type]} tag [description]
 * @return {[type]}     [description]
 */
function getSibling(tag) {
  var fa = tag.parentNode;
  var all = fa.children;
  var result = [];
  for (var i = 0; i < all.length; i++) {
    if (all[i] != tag) {
      result.push(all[i]);
    }
  }
  return result;
}
/**
 * [getId 通过id获取元素]
 * @param  {[type:string]} id名 [description]
 * @return {[type]}    [description]
 */
function getId(id) {
  return document.getElementById(id);
}
/**
 * [getTag 通过标签名获取元素]
 * @param  {[type]} tag [description]
 * @return {[type]}     [description]
 */
function getTag(tag) {
  return document.getElementsByTagName(tag);
}
/**
 * 创建元素
 * @param  {[type]} tag [description]
 * @return {[type]}     [description]
 */
function crt(tag) {
  return document.createElement(tag);
}

/**
 * [获取焦点和失去焦点事件函数]
 * @param  {[type]} tag       [description]
 * @param  {[type]} blurValue [description]
 * @return {[type]}           [description]
 */
function geton(tag, blurValue) {
  //设置输入框没默认显示的内容
  tag.value = blurValue;
  //设置鼠标点击之后的效果
  tag.onfocus = function() {
    if (this.value === "" || this.value === blurValue) {
      this.value = "";
    }

  };
  //设置鼠标点走之后的效果
  tag.onblur = function() {
    if (this.value === "") {
      this.value = blurValue;
    }
  };
}

/**
 * [animate 函数封装]
 * @param  {[type]}   tag [要操作的元素]
 * @param  {[type]}   obj [更改的内容]
 * @param  {Function} fn  [二次更改]
 * @return {[type]}       [description]
 */
function animate(tag, obj, fn) {
  //清除计时器
  clearInterval(tag.timer);
  // 创建计时器
  tag.timer = setInterval(function() {
    //假设运动都已经做完
    var flag = true;
    //得到所有需要设置的内容和值
    for (var k in obj) {
      if (k == "opacity") {
        var target = obj[k] * 100;
        var leader = getStyle(tag, k) * 100 || 0;
        //匀速公式
        var step = (target - leader) / 10;
        //由于获取到的值默认四舍五入，所以会有问题，需要把值进行取上
        //如果是负数就是地板函数
        // 如果是正数就是天花板函数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //运动公式
        leader += step;
        tag.style[k] = leader / 100;
      } else if (k == "zIndex") {
        tag.style.zIndex = obj[k];
      } else {
        var target = obj[k];
        var leader = parseInt(getStyle(tag, k)) || 0;
        //匀速公式
        var step = (target - leader) / 10;
        //由于获取到的值默认四舍五入，所以会有问题，需要把值进行取上
        //如果是负数就是地板函数
        // 如果是正数就是天花板函数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //运动公式
        leader += step;
        tag.style[k] = leader + "px";
      }
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(tag.timer);
      //严谨做法
      if (typeof fn == "function") {
        fn();
      }
      //如果传入的fn不是函数值，就会报错
      // fn && fn();
    }
  }, 20);
}


//用于获取某个标签的某个样式属性值
//带单位
// function getStyle(tag, attr) {
//   //检测支持哪一个
//   //box.currentStyle//如果不存在值为undefined
//   //getComputedStyle如果浏览器不支持。相当于变量未声明，报错
//   if (tag.currentStyle) {
//     //ie支持
//     return tag.currentStyle[attr];
//   } else {
//     //标准方法
//     return getComputedStyle(tag, null)[attr];
//   }
// }


/**
 * 获取元素现在的样式的值
 * @param tag  元素名
 * @param k  属性名
 * @returns {*}
 */
function getStyle(tag, k) {
  return tag.currentStyle ? tag.currentStyle[k] : getComputedStyle(tag, null)[k];
}

/**
 * [myClient 获取窗口的可视大小]
 * @return {[type]} [description]
 */
function myClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clietWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
  };
}
/**
 * [myScroll 获取滚动坐标函数]
 * @return {[type]} [description]
 */
function myScroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}
      