/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/20 15:34.
 */
const MoneyTest = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;

// 数字格式化为千分位，输入使用，光标不会移动
export const comdify = function (num) {
  let res = 0;
  if (num) {
    res = num.toString().replace(/\d+/, function (n) {
      // 先提取小数点前后的整数部分
      // (\d)(?=(\d{3})正则的意思是匹配连续三个数结尾的数字，例如1234，1后面有234连续三个数的数字，就可以匹配上，匹配的是1这个数字。如果是123，因为1后面是两位数，所以就匹配不上了
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ",";
      });
    });
  }
  return res;
};

// 金额添加千分位，输入使用，光标会移动到最后
export const comdify1 = function (n) {
  if (!n) return n;
  n = Number(n).toString();
  let str = n.split(".");
  let re = /\d{1,3}(?=(\d{3})+$)/g;
  let n1 = str[0].replace(re, "$&,");
  return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`;
};

function round(num, decimals = 2) {
  if (num == null) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * 数字转千分位金额格式，显示使用
 * @param {*} num
 * @param {*} n
 * @returns
 */
export function comdify2(num, n) {
  if (num == null || num === "") num = 0;
  if (n == null) n = 2;

  // ✅ 使用确定性四舍五入
  const factor = Math.pow(10, n);
  const rounded = Math.round(Number(num) * factor) / factor;

  // 转为固定小数位字符串（补零）
  const roundedStr = rounded.toFixed(n);

  const [intStr, floatStr = ""] = roundedStr.split(".");

  let prefix = "";
  let intPart = intStr;
  if (intPart.startsWith("-")) {
    prefix = "-";
    intPart = intPart.slice(1);
  }

  // 千分位格式化
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const floatPart = n > 0 ? "." + floatStr : "";
  return prefix + formattedInt + floatPart;
}

export function number2(num, n) {
  if (!num) num = 0;
  n = n || 2;
  num = num.toFixed(n); // 保留两位
  return num;
}

// 去除千分位中的‘，’
export const delcommafy = function (num) {
  if (!num) return num;
  num = num.toString();
  num = num.replace(/,/gi, "");
  return num;
};
const valdateFn = function (rule, val, cb) {
  setTimeout(() => {
    if (val) {
      let inputVal = delcommafy(val);
      if (rule.test(inputVal)) {
        cb();
      } else {
        var str = "只能是数字金额,最多两位小数";
        cb(str);
      }
    }
    cb();
  });
};
// 验证金额数字可以为负数
const moneyValid = function (rule, val, cb) {
  valdateFn(/((^-?[1-9]\d*)|^-?0)(\.\d{0,2}){0,1}$/, val, cb);
};
// 验证金额数字不可以为负数
const moneyNValid = function (rule, val, cb) {
  valdateFn(MoneyTest, val, cb);
};

// 获取输入框的值
// const getInputValue = function (el) {
//     let inputVal = el.target.value || '';
//     return comdify(delcommafy(inputVal));
// };

// 获取输入框的值
export const getInputValue = (el) => {
  let inputVal = el.target.value || "";
  return comdify(delcommafy(inputVal));
};
