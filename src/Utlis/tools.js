import { regMap } from '../constants';

/** 从表达式串中提取出变量
 * 
 * @param {*} expArr 表达式数组(形如 ["{{name}}", "{{age}}"] 或者 ["v-model="name""] 这样)
 * @param {*} tem 模板，text 或者 model
 */
export const getKey = (exp, tem) => {
    exp = exp.replace(regMap[tem], '$1');
    return exp;
}

/** 转换 html attr 为 string
 * 
 * @param {Attr} attr 
 */
export const convertHtmlAttr2String = (attr) => {
    return attr.name + "=" + attr.value;
}

/** 根据 key 获取 obj 中对应的值(key是第一层或者深层的)
 * 
 * @param {Vue} vm vue实例
 * @param {String} exp 表达式，形如：a.b.c
 */
export const getObjectValue = (vm, exp) => {
    const data = vm.$data;
    const arr = exp.split('.');
    let i = 0, res = {...data};
    res = arr.reduce((pV, cV) => {
        return pV = pV[cV];
    }, data);
    return res;
}