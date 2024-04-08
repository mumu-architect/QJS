

export const UtilsFunc = {
    /**
     * / 使用正则表达式匹配所有空格，并用一个空字符串替换它们
     * @param {*} str 
     * @returns 
     */
    replaceSpaces(str) {
        // 使用正则表达式匹配所有空格，并用一个空字符串替换它们
        return str.replace(/\s+/g, '');
    },
    /**
     * 获取方法表达式方法名fun(a,b)
     * @param {*} str 
     * @returns 
     */
    getMethodName(str) {
        const regex = /^(\w+)\(/;
        const match = str.match(regex);
        return match ? match[1] : null;
      }
}
