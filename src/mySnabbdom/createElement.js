/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:33
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 13:11:43
 */

//真正创建节点，将vnode创建为DOM，插入到pivot 这个元素之前
/**
 * 
 * @param {*} vnode 虚拟节点
 * @param {*} pivot 标杆，真实的DOM
 */
export default function createElement(vnode) {
    //把虚拟节点插入到标杆DOM前面
    let domNode = document.createElement(vnode.sel)
    //此处我们只是做一个特殊的情况，只有文本或者子节点
    if (vnode.text && !vnode.children || !vnode.children.length) {
        //文本节点
        domNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        for (let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i]
            console.log(ch);
        }
    }

    //补充vnode 的elm 属性
    vnode.elm = domNode
    return domNode

}