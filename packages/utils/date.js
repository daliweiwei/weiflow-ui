/**
 * date format
 * @param {*} date   Date 对象
 * @param {*} str 时间格式字符串
 */
const dateFormat = (date, str = "yyyy-MM-dd") => {
  let o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  };

  let format = str;
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  });
  return format;
};

/**
 * 是否为今天或明天
 * @param {*} timestamp  需要判断的时间戳
 * @param {*} currentTimestamp 当前的时间戳
 */
const isTodayOrTomorrow = (timestamp = Date.now(), currentTimestamp) => {
  let nowTimestamp = currentTimestamp || Date.now();
  let todayStartTimestamp = new Date(
    dateFormat(new Date(nowTimestamp), "yyyy-MM-dd")
  ).getTime();
  let tomorrowEndTimestamp = todayStartTimestamp + 2 * 24 * 3600 * 1000;
  return timestamp >= todayStartTimestamp && timestamp < tomorrowEndTimestamp;
};
/**
 * 对日期进行过滤
 * @param {*} dateStr
 * @param {*} str
 */

const toLocalTime = (dateStr, str = "yyyy-MM-dd hh:mm:ss") => {
  if (dateStr) {
    dateStr = dateStr.replace("+0000", "");
    return dateFormat(new Date(dateStr), str);
  }
};
/**
 * @desc 判断当前日期是本年的第几周
 * @param {*} a 年
 * @param {*} b 月
 * @param {*} c 日
 */
const getWeekByYear = (a, b, c) => {
  let date1 = new Date(a, parseInt(b) - 1, c),
    date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
};

const nowDateTime = () => {
	let nowDate = new Date();
	let year = nowDate.getFullYear();
	let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	let date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	let hh = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
	let mm = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
	let ss = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
	return year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ':' + ss;
}

/**
 * 计算两个日期直接相差几个月
 * @param startMonth 开始日期
 * @param endMonth 结束日期
 * @returns {number} 相差月数
 */
const reduceMonths = (startMonth, endMonth) => {
  let startY = startMonth.split("-")[0],
    startM = startMonth.split("-")[1],
    endY = endMonth.split("-")[0],
    endM = endMonth.split("-")[1];
  startMonth = startY + startM;
  endMonth = endY + endM;
  let num = 0;
  if (startMonth > endMonth) {
    let reduceY = startY - endY,
      reduceM = startM - endM;
    num = reduceY * 12 + reduceM;
  } else if (startMonth < endMonth) {
    let reduceY = endY - startY,
      reduceM = endM - startM;
    num = reduceY * 12 + reduceM;
  }
  return num;
}

/**
 * 计算两个日期直接相差几天
 * @param startMonth 开始日期
 * @param endMonth 结束日期
 * @returns {number} 相差天数
 */
const reduceDays = (startMonth, endMonth) => {
  let start = new Date(startMonth);
  let end = new Date(endMonth);
  let day = end.getTime() - start.getTime();
  return parseInt(day / (1000 * 60 * 60 * 24));
}

export { dateFormat, isTodayOrTomorrow, toLocalTime, getWeekByYear, nowDateTime, reduceMonths,reduceDays};
