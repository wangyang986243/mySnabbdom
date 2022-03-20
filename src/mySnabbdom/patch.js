/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:21
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 16:12:05
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
        //判断新老vnode是否是同样一对象，如果是一样的，什么都不操作
        if (oldVnode === newVnode) return
        //判断newVnode 是否有text属性并且没有children
        if (newVnode.text && (!newVnode.children || !newVnode.children.length)) {
            // newVnode 有text 属性
            console.log('命中,newVnode 有text 属性')
            //判断新老vnode 的text属性是不是一样的
            if (newVnode.text == oldVnode.text) return
            //oldVnode节点的DOM对象的innerText 替换成newVnode的text属性
            oldVnode.elm.innerText = newVnode.text

        } else {
            // newVnode 没有text 属性，有children属性
            console.log('新节点（newVnode）没有text属性')
            //判断oldVnode children 
            if (oldVnode.children && oldVnode.children.length) {
                //oldVnode有children，此时就是最复杂的情况，就是新老都有children
            } else {
                //oldVnode没有children，有text属性
                //清空oldVnode的节点内容
                oldVnode.elm.innerText = ''
                //遍历的newVnode，创建DOM，再上树
                for (let i = 0; i < newVnode.children.length; i++) {
                    let dom = createElement(newVnode.children[i])
                    oldVnode.elm.appendChild(dom)
                }
                // let dom = createElement(newVnode)
                // oldVnode.elm.appendChild(dom)


            }
        }
    } else {
        //新老节点不相同
        console.log('新老节点不相同')
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