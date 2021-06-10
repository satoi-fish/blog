export function debounce(fn, time = 500){
  let timer = null
  return function (...args) {
    const that = this
    if (timer) {clearTimeout(timer)}
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, time);
  }
}

export function waterFallLayout(that){
  var pageWidth =
    window.innerWidth - 8 || document.documentElement.clientWidth;
  // console.log(pageWidth)
  var columns = 4;
  
  if (pageWidth <= 700) {
    columns = 3;
    arr = new Array(columns);
    that.flag = true;
  }

  var j = 0
  var arr = new Array(columns, 0, 0, 0, 0);
  var bloglist = document.getElementsByClassName('blogListItem')
  var item = bloglist[0].childNodes
  var itemWidth = (pageWidth - 200) / columns;
  var listLeft = parseInt(pageWidth - (itemWidth * columns + 20 * (columns - 1)))/2


  for (let i = 0; i < item.length; i++) {
    j = i % columns;
    item[i].style.width = itemWidth + "px";
    item[i].style.left = itemWidth * j + 20 * j + listLeft + "px";

    if (i >= columns) {
      item[i].style.top = arr[j] + "px";
    }

    arr[j] += parseInt(item[i].clientHeight) + 30;

  }
  // console.log(arr[3])
  // console.log(bloglist);
  bloglist[0].style.height = arr[3] + 20 + 'px'

  if (pageWidth > 700 && that.flag) {
    item[columns - 1].style.top = 0 + "px";
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero (str){
  return ('00' + str).substr(str.length)
}