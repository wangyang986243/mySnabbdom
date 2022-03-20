/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:21
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 20:57:54
 */
import vNode from './vNode'
import createElement from './createElement'
export default function (oldVnode, newVnode) {
    //判断oldVnode 是不是虚拟节点
    if (!oldVnode.sel) {
        //传入的oldVnode 是DOM节点，此时需要包装成虚拟节点
        oldVnode = vNode(oldVnode.tagName.toLowerCase(), {}, undefined, undefined, oldVnode)
    }
    //判断oldVnode和newVnode 是不是同一个节点
    //判断依据：新老节点的选择器是否相同，新老节点的key是否相同
    if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
        //新老节点相同 
        console.log('新老节点相同')

    } else {
        //新老节点不相同
        console.log('新老节点不相同')
        createElement(newVnode, oldVnode.elm)
    }
}