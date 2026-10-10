/**
 * Created by liweiliang 406320591@QQ.com on 2026/6/11 10:34.
 */

/**
 * 根据数据条数动态计算表格高度
 * @param {Array} list 表格数据数组
 * @param {Number} rowHeight 每行高度（Element默认约48px，Plus默认约40px）
 * @param {Number} headerHeight 表头高度
 * @param {Number} maxHeight 允许的最大高度（防止页面无限拉长）
 * @returns {Number|String} 计算出的高度
 */
export function calcTableHeightByData(
  list,
  rowHeight = 48,
  headerHeight = 48,
  maxHeight = 600
) {
  const dataLength = list ? list.length : 0;
  // 2 为上下边框的冗余高度
  const totalHeight = dataLength * rowHeight + headerHeight + 2;

  // 如果数据为空，给个最小高度展示表头和暂无数据提示
  if (dataLength === 0) return headerHeight + rowHeight + 20;

  // 如果计算出的高度超过最大高度，则限制为最大高度（出现滚动条），否则使用计算出的高度
  return totalHeight > maxHeight ? maxHeight : totalHeight;
}
