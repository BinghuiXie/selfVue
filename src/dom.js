import { regMap } from './constants';

// 监听 DOM 的操作，对每一个节点都进行监听
class DOM {
    constructor(el, vm) {
        this.$el = el;
        this.$vm = vm;
    }

    /** 对 input 的输入进行监听 => 表达式有两种情况
     * 1. v-model=name
     * 2. v-model=a.b 即对对象的引用
     * @param {*} exp name
     * @param {*} node 对应的 input 节点
     */
    listenInput(exp, node) {
        node.addEventListener('input', (e) => {
            const newVal = e.target.value;
            const that = this;
            if(regMap.dot.test(exp)) {
                // 处理形如 a.b.c 的表达式
                const arr = exp.split('.');
                let res = 'that.$vm.$data';
                while(arr.length) {
                    res += `['${arr.shift()}']`
                }
                res = `${res}=${newVal}`;
                eval(res);
            } else {
                this.$vm.$data[exp] = newVal;
            }
        });
    }
}

export default DOM;