/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:21
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 21:18:11
 */
import vNode from './vNode'
import createElement from './createElement'
import patchVnode from './patchVnode'
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
        // console.log('新老节点相同')
        patchVnode(oldVnode, newVnode)
    } else {
        //新老节点不相同
        // console.log('新老节点不相同')
        //获取新虚拟节点的DOM 
        let newVnodeElm = createElement(newVnode)
        //插入老节点之前
        if (oldVnode.elm.parentNode && newVnodeElm) {
            //让新虚拟节点的DOM上树 newVnodeElm:新虚拟节点的DOM 
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        //删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}