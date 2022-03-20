/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:33
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 13:51:01
 */

//真正创建节点，将vnode创建为DOM，是孤儿节点，不进行插入
/**
 * 
 * @param {*} vnode 虚拟节点
 * @param {*} pivot 标杆，真实的DOM
 */
export default function createElement(vnode) {
    //创建一个DOM 节点，这个节点还是孤儿节点
    let domNode = document.createElement(vnode.sel)
    //此处我们只是做一个特殊的情况，只有文本或者子节点
    if (vnode.text && !vnode.children || !vnode.children.length) {
        //文本节点
        domNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        //它内部是一个子节点，就要递归创建节点
        for (let i = 0; i < vnode.children.length; i++) {
            //得到当前这个children
            let ch = vnode.children[i]
            //创建子节点DOM,一旦调用createElement意味着：创建DOM了，并且它的elm属性指向了创建的DOM，但是还没有上树，是一个孤儿节点
            let chDOM = createElement(ch)
            //上树
            domNode.appendChild(chDOM)
        }
    }

    //补充vnode 的elm 属性===>这一步很重要
    vnode.elm = domNode
    return domNode

}