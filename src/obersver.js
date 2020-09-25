// 实现对数据的监听
/*
既然是实现对数据的监听，那么肯定需要传入要监听的数据
*/

import Dep from './Dep.js';

class Obersver {

    constructor(data) {
        this.data = data;
        this.obersve(this.data);
    }

    obersve(data) {
        if(typeof data !== 'object' || !data) {
            return ;
        }
        Object.keys(data).map((key) => {
            // 对传入数据的第一层进行监听
            this.listen(data, key, data[key]);
        })
    }
    /** 实现对某个属性的监听
     * 
     * @param {Object} obj 要监听的对象
     * @param {String} key 要监听的 key 值
     * @param {any} val value
     */
    listen(obj, key, val) {
        const dep = new Dep();
        // 递归遍历子属性
        this.obersve(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                if(window.target) {
                    // 这里去将 watcher 添加到 dep 里面
                    dep.addSubs();
                }
                return val;
            },
            set(newVal) {
                val = newVal;
                console.log('newValue: ', newVal, 'key: ', key, 'dep: ', dep);
                // 触发 set 也就是更新数据的时候去通知 watcher 调用更新视图函数
                dep.notify();
            }
        })
    }
}

export default Obersver;
