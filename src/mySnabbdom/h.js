/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:44:50
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 21:10:38
 */

import vNode from './vNode'
/**
1. 编写低配版的h函数，这个函数必须接受3个参数，缺一不可
2.相当于它的重载功能较弱
3.也就是说，调用的形态必须是下面三种之一
    情况1： h('div',{},'文字')
    情况2： h('div',{},[])
    情况3： h('div',{},h())
 */

/**
 * 
 * @param {*} sel  选择器
 * @param {*} data 属性
 * @param {*} c 不确定
 */
export default function (sel, data, c) {
    //首先检查参数个数是否为三个
    if (arguments.length !== 3) throw new Error('对不起，h函数必须传3个参数，我们是低配版h函数');
    //检查参数c的类型
    if (typeof (c) === 'string' || typeof (c) === 'number') {
        //1. c的类型为字符串类型或者数字类型
        return vNode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        //2. c的类型是数组
        //遍历c 
        for (let i = 0; i < c.length; i++) {
            // 判断 c数组对象中的每一项是不是一个h函数； 第一：h函数返回的肯定是一个对象，第二：h函数对象中肯定有sel属性
            if (!c[i] instanceof Object && c[i].hasOwnProperty('sel')) throw new Error('传入的数组对象中有项不是h函数');
            //这里不需要c[i],因为你的测试语句中已经有了执行
            //此时只需要收集即可(如果是一个h函数，则向children 添加c[i]) 
            children.push(c[i])
        }
        return vNode(sel, data, children, undefined, undefined)
    } else if (c instanceof Object && c.hasOwnProperty('sel')) {
        //2. c的类型是一个h函数 第一：h函数返回的肯定是一个对象，第二：h函数对象中肯定有sel属性
        return vNode(sel, data, [c], undefined, undefined)
    } else {
        throw new Error('对不起，h函数传入的第三个参数类型不对');
    }
}
