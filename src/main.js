import SelfVue from './Vue';

new SelfVue({
    el: '#app',
    data: {
        name: '谢炳辉',
        address: '南京邮电大学',
        age: 23,
        possession: {
            phone: '18851076185',
            pc: 'mac'
        }
    }
})