/**
 * Created by 王攀升 on 2017/1/7 0007.
 */

//弹窗广告
var popAd = getId("popAd");
var closet = getId("t");//显示倒计时的盒子
var closePopBtn = getId("closePopBtn");//关闭按钮
var closetime = null;
var count = 9;
//显示广告
setTimeout(function () {
  animate(popAd, {"height": 586});
}, 5000);

//按钮关闭
closePopBtn.onclick = function () {
  var real = confirm("你确认要关闭如此精彩的广告吗？");
  if (real) {
    animate(popAd, {"height": 0}, function () {
      // popAd.parentNode.removeChild(popAd);
    });

    clearInterval(closetime);
  }
};
//自动关闭广告
setTimeout(function () {
  animate(popAd, {"height": 0}, function () {
    document.body.removeChild(popAd);
  });
}, 10000);

//倒计时显示
closetime = setInterval(function () {
  console.log(closet);
  closet.innerHTML = count;
  count--;
  //清除计时器
  if (count < 0) {
    clearInterval(closetime);
  }
}, 1000);


//顶部搜索框点击效果
//模拟数据库，每次刷新输入框的文字都更换不一样的
var searchArr = ["国漫精品", "全民打飞机", "台军称武器已经准备好", "画江湖之不良人", "人气演员吴悠新剧上映", "想看福利点这里"];
var iptbox = getId("iptBox");//搜索框input的父元素
var ipt = iptbox.children[0];//ipt搜索框

//每次打开随机获取搜索框文字
var radomNum = Math.floor(Math.random() * searchArr.length);
ipt.value = searchArr[radomNum];

//鼠标点进去，清除文字，
ipt.onfocus = function () {
  this.value = "";
};
//离开重新获取文字
ipt.onblur = function () {
  this.value = searchArr[Math.floor(Math.random() * searchArr.length)];
};
//logo区域结束

//导航区域-B
//todo 固定导航功能
//主导航移动背景
var navList = getId("navList");
var lis = navList.children[0].children;//所有的导航按钮
//添加鼠标移动变换背景事件
for (var i = 0; i < lis.length; i++) {
  lis[i].children[0].onmouseover = function () {
    this.className = "navCurrent";
  }
  if (i != 0) {
    lis[i].children[0].onmouseout = function () {
      this.className = "";
    }
  }

}


//导航下广告
var ad = getId("ad");//广告元素
var close = ad.children[1];//关闭按钮
var open = getId("open");
//添加点击关闭事件
$("#ad").find(".close").click(function () {
  $("#ad").slideUp(1000);
  $("#open").css("display", "block");
});

// close.onclick = function () {
//   // this.style.display="none";
//   //把ad的高度改成0,然后超出隐藏
//   ad.style.overflow = "hidden";
//   animate(ad, {"height": 0});
//   open.style.display = "block";//显示打开按钮
// };
//打开广告
$("#open").click(function () {
  $("#ad").slideDown(1000);
  $(this).css("display", "none");
});


// open.onclick = function () {
//   // close.style.display="block";
//   animate(ad, {"height": 90, "width": 1000});//把图片显示出来
//   this.style.display = "none";//隐藏打开按钮
// };


//导航区域-E

//主体区域开始
//轮播图
var slideshow = getId("slideshow");//放图片的大盒子
var slideshowImg = getId("slideshowImg");//需要运动的长图
var slideshowImgs = slideshowImg.children;//所有大图的集合
var slideshowBtn = getId("slideshowBtn");//轮播图点击的小图
var slideshowBtns = slideshowBtn.children;//小图集合
var slideshowWidth = slideshow.offsetWidth; //获取每次移动的宽
var slideshowTime = null;//轮播图计时器
//遍历小图
for (var i = 0; i < slideshowBtns.length; i++) {
  //给每个小图加索引
  slideshowBtns[i].index = i;
  //点击
  slideshowBtns[i].onmouseover = function () {
    //先改变自己样式
    //排他思想
    for (var j = 0; j < slideshowBtns.length; j++) {
      slideshowBtns[j].className = "";
    }
    //设置自己
    this.className = "current";
    //移动图片
    // console.log(this.index);
    if (pic == slideshowImgs.length - 1) {
      slideshowImg.style.left = 0;

    }
    animate(slideshowImg, {"left": -this.index * slideshowWidth});
    pic = this.index;
  }

}
//克隆图片
var lastImg = slideshowImgs[0].cloneNode(true);
slideshowImg.appendChild(lastImg);

//自动轮播
var pic = 0;

slideshowTime = setInterval(function () {
  //判断现在的是不是最后一张假的，抽回和移动不能在同一次进行，
  // 因为缓动比较慢，可能还没运动完，被抽回了，还会再运动过来的
  if (pic == slideshowImgs.length - 1) {
    slideshowImg.style.left = 0;
    pic = 0;
  }
  pic++;
  animate(slideshowImg, {"left": -pic * slideshowWidth});
  //改变对应的小图的样式
  for (var j = 0; j < slideshowBtns.length; j++) {
    slideshowBtns[j].className = "";
  }
  if (pic == slideshowImgs.length - 1) {
    slideshowBtns[0].className = "current";
  } else {

    slideshowBtns[pic].className = "current";
  }
}, 5000);

//鼠标悬停清除计时器
// slideshow.onmouseover = function () {
//   clearInterval(slideshowTime);
// };


//右侧区域a标签鼠标移入显示下划线
$("#rightside").find("a").mouseenter(function () {
  $(this).css("textDecoration", "underline");
});
$("#rightside").find("a").mouseleave(function () {
  $(this).css("textDecoration", "none");
});

//右侧小轮播图
//小轮播图所有图片
var datasJiecaolbt = [
  {
    "img1": "129949615.jpg",
    "img2": "128834185.jpg",
    "img3": "128834183.jpg"
  }
];
//$("#jiecaolbt")

//创建轮播图大图
$lbtul = $("<ul></ul>")

// 创建小盒子放在$("#jiecaolbt")后边
$lbtol = $("<ol></ol>");

for (var k in datasJiecaolbt[0]) {
  $lbtul.append("<li><a href='javascript:;'><img src='images/" + datasJiecaolbt[0][k] + "'></a></li>");
  //把小图的每一项放进ol
  $lbtol.append("<li><a href='javascript:;'><img src='images/" + datasJiecaolbt[0][k] + "'></a></li>");
}
$("#jiecaolbt").html($lbtul);
//把ol放进页面中
$("#jiecaolbt").after($lbtol);

//轮播图效果
$("#jiecaolbt").next().find("a").mouseenter(function () {
  console.log($(this).parent().index());
  $("#jiecaolbt>ul").stop(false, false).animate({
    "left": -295 * $(this).parent().index()
  }, 400, "swing");
});


//瀑布流效果
var imgDatas = [{"src": "15762022_small4.png", "height": 112, "content": "吃货天堂：向面条君示爱"}, {
  "src": "15776185_small4.png", "height": 300, "content": "《暖暖环游世界》高阳公主版COS"
}, {"src": "15762598_small4.png", "height": 299, "content": "日式冷笑话：何等的心机！"}, {
  "src": "15762658_small4.png", "height": 300, "content": "日式冷笑话：何等的心机！"
}, {"src": "15766045_small4.png", "height": 141, "content": "日式冷笑话：何等的心机！"}, {
  "src": "15769376_small4.jpg", "height": 150, "content": "日式冷笑话：何等的心机！"
}, {"src": "15774707_small4.png", "height": 283, "content": "日式冷笑话：何等的心机！"}, {
  "src": "15782537_small4.png", "height": 282, "content": "每日热推：你们好我是热狗"
}, {"src": "15782511_small4.png", "height": 216, "content": "《网球王子》白石藏之介生日贺图集"}, {
  "src": "15781231_small4.png",
  "height": 300, "content": "Love wing bell《Love Live！》妹纸驾到"
}, {
  "src": "15762542_small4.png", "height": 30, "content": "日式冷笑话：何等的心机！"
}];
//获取元素
var Waterfall = getId("Waterfall");
var ulHeight = [];//创建数组存放ul的高度
var WaterfallBox = getId("WaterfallBox");
//创建ul
var ulCount = 932 / 240;//ul的个数
for (var i = 0; i < ulCount; i++) {
  // var ul = crt("ul");
  // WaterfallBox.appendChild(ul);
  // //初始化ul的高
  // ulHeight[i] = i;
  $(WaterfallBox).append($("<ul></ul>"));
  ulHeight[i] = 0;
}
//获取所有的ul
// var ulS = WaterfallBox.children;
for (var i = 0; i < imgDatas.length; i++) {
  //再高度最低的ul中放入li
  var minUl = getMin(ulHeight).index; //获取最低的ul的索引
  ulHeight[minUl] += imgDatas[i].height;
  console.log(ulHeight);
  //创建li用来存放照片
  // $lis = $("<li></li>");
  //把内容放到高度最低的ul中
  $(WaterfallBox).children("ul").eq(minUl).append("<li><a href='javascript:void(0);'><img src='images/" + imgDatas[i].src + "'></a><p><a href='javascript:;'>" + imgDatas[i].content + "</a></p></li>");


  //创建li放照片
  // var li = crt("li");
  // li.innerHTML = "<a href='javascript:void(0);'><img src='images/" + imgDatas[i].src + "'></a><p><a href='javascript:;'>" + imgDatas[i].content + "</a></p>";
  // //在高度最低的ul中放入li
  // var minUl = getMin(ulHeight).index; //获取最低的ul的索引
  // ulS[minUl].appendChild(li);
  // //吧高度加上
  // ulHeight[minUl] += imgDatas[i].height;
}


//鼠标移入改变边框颜色
//todo
$("#Waterfall li").mouseenter(function () {
  $(this).css("borderColor", "red");
});
$("#Waterfall li").mouseleave(function () {
  $(this).css("borderColor", "#ccc");
});


//计算数组最小值
function getMin(arr) {
  var minValue = arr[0];//假定最小值
  var minIndex = 0;//假定最小值的索引
  for (var i = 0; i < arr.length; i++) {
    if (minValue > arr[i]) {
      minValue = arr[i];
      minIndex = i;
    }
  }
  return {
    index: minIndex,
    value: minValue
  };
}
function myClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
  }
}

function myScroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}