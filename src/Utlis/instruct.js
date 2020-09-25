import { regMap } from '../constants';


// 处理 vue 指令
class Instruct {
    constructor() {

    }
    /** 处理 v-model 指令，返回其中的表达式
     * @param {String} attr 指令-> v-model=name
     */
    model(attr) {
        return attr.replace(regMap.model, '$1');
    }
}

export default Instruct