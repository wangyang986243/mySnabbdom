/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-20 20:35:31
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 21:18:17
 */
import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
    //判断新老vnode是否是同样一对象，如果是一样的，什么都不操作
    if (oldVnode === newVnode) return
    //判断newVnode 是否有text属性并且没有children
    if (newVnode.text && (!newVnode.children || !newVnode.children.length)) {
        // newVnode 有text 属性
        // console.log('命中,newVnode 有text 属性')
        //判断新老vnode 的text属性是不是一样的
        if (newVnode.text == oldVnode.text) return
        //oldVnode节点的DOM对象的innerText 替换成newVnode的text属性
        oldVnode.elm.innerText = newVnode.text

    } else {
        // newVnode 没有text 属性，有children属性
        // console.log('新节点（newVnode）没有text属性')
        //判断oldVnode children 
        if (oldVnode.children && oldVnode.children.length) {
            // console.log('最复杂的情况')
            //oldVnode有children，此时就是最复杂的情况，就是新老都有children
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
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
}