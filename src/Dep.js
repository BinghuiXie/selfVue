class Dep {
    constructor() {
        // subs: 用来存放 Watcher 的
        this.subs = [];
    }

    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }

    addSubs() {
        // window.target 表示当前的 watcher 对象
        this.subs.push(window.target);
    }
}

export default Dep;