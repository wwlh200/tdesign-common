/**
 * 计算滚动条宽度的方法
 * 新建一个带有滚动条的 div 元素，通过该元素的 offsetWidth 和 clientWidth 的差值即可获得
 * CSS 中设置了 -webkit-scrollbar { width: 6px; height: 6px }，固定浏览器滚动条宽度，仅限 Chrome/Safari
 * Safari UA
 *  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
 *  AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15"
 * Chrome UA
 *  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
 *  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36
 * FireFox UA
 *  Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0
 * IE UA
 *  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2;
 *  .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"
 */
export default function getScrollbarWidth() {
  const defaultScrollbarWidth = 6;
  if (!navigator) return defaultScrollbarWidth;
  if (/(Chrome|Safari)/i.test(navigator.userAgent)) return defaultScrollbarWidth;
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  // 火狐浏览器需要再减去 4
  if (/Firefox/.test(navigator.userAgent)) {
    scrollbarWidth -= 4;
  }
  return scrollbarWidth;
}
