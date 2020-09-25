import Watcher from './watcher';
import DOM from './dom';
import { regMap } from './constants';
import { Instruct, tools } from './Utlis';

const instruct = new Instruct();

class Compiler {
    constructor(el, vm) {
        // el 只是一个 id，所以要选一下选出那个对应的节点
        this.$el = document.querySelector(el);
        this.$vm = vm;
        this.nodeList = [];

        this.compileHtml();
    }

    compileHtml() {
        // 获取所有节点
        this.getNodes(this.$el);

        this.nodeList.map(node => {
            // 判断是否含有 v-model
            [...node.attributes].map(attr => {
                // 获取到的 attr 本身不是 string 类型的，为了方便通过正则判断，所以需要转换一下
                attr = tools.convertHtmlAttr2String(attr);
                if(regMap.model.test(attr)) {
                    // v-model 的处理
                    let exp = instruct.model(attr);
                    // exp 有单纯的变量和含有 . 的两种 => 1. name 2. possession.phone，对于 watcher，传入的 exp 需要的是最终的表达式
                    // 对于第一种情况就是 name，对于第二种情况应该是 phone，所以要对 exp 处理一下
                    new Watcher(this.$vm, exp, () => this.compileModel(node, exp, this.$vm));
                    const dom = new DOM(this.$el, this.$vm);
                    dom.listenInput(exp, node);
                    this.compileModel(node, exp, this.$vm);
                }
            });
            // 子元素数量为 0 的，否则 innerText 会把左右子元素都作为 String 返回
            if(!node.childElementCount) {
                if(regMap.text.test(node.innerText)) {
                    const exp = node.innerText.replace(regMap.text, '$2');
                    // 处理 {{}} 前面的文本
                    const prefix = node.innerText.replace(regMap.text, '$1');
                    new Watcher(this.$vm, exp, () => this.compileText(node, exp, this.$vm, prefix));
                    this.compileText(node, exp, this.$vm, prefix);
                }
            }
        });
    }

    /** 递归遍历所有节点
     * @param {Node} root 根节点
     */
    getNodes(root) {
        this.nodeList.push(root);
        if(!root.childElementCount) {
            return ;
        }
        Array.from(root.children).map(node => {
            this.getNodes(node);
        })
    }

    /** 编译 含有 v-model 的节点 
     * 
     * @param {*} node 含有 v-model 的节点
     * @param {*} exp 表达式
     * @param {*} vm vue 实例
     */
    compileModel(node, exp, vm) {
        const value = tools.getObjectValue(vm, exp);
        node.value = value;
    }
    
    /** 编译含有 {{}} 的文本节点
     * 
     * @param {Node} node 含有 {{}} 的节点
     * @param {String} exp 表达式
     * @param {Vue} vm vue 实例
     * @param {String} prefix {{}} 前面的部分
     */
    compileText(node, exp, vm, prefix) {
        const reg = /\./;
        const value = tools.getObjectValue(vm, exp);
        node.innerText = prefix + value;
    }
}

export default Compiler;