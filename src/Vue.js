import Observer from './obersver.js';
import Compiler from './Compiler.js';

class SelfVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.$el = options.el;

        if(this.$el) {
            // 将数据变为响应式的
            new Observer(this.$data);
            // 编译 vue 模板
            new Compiler(this.$el, this);
        }
    }
}

export default SelfVue;