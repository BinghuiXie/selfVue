import { tools } from './Utlis';

class Watcher {
    constructor(vm, exp, callback) {
        this.$vm = vm;
        this.exp = exp;
        this.cb = callback;
        this.value = null;
        console.log(this);
        this.init();
    }
    /** 更新视图的方法
     * 
     */ 
    update() {
        this.cb();
    }
    /** 根据表达式初始化 watcher
     * 1. 设置一个标志表示第一次(显然这个标示最好是全局的，以便再其他类里面也可以通过这个判断)
     * 2. 手动去读取表达式 exp 对应的值，以此来触发将该 watcher 实例添加到 Dep 的操作
     * 3. 将第一步的标志还原，方便后来的其他表达式的添加。
     */
    init() {
        window.target = this;
        this.value = tools.getObjectValue(this.$vm, this.exp);
        window.target = null;
    }
}

export default Watcher;