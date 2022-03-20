/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 20:33:33
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 21:07:53
 */

//真正创建节点，将vnode创建为DOM，插入到pivot 这个元素之前
/**
 * 
 * @param {*} vnode 虚拟节点
 * @param {*} pivot 标杆，真实的DOM
 */
export default function (vnode, pivot) {
    //把虚拟节点插入到标杆DOM前面
    let domNode = document.createElement(vnode.sel)
    //此处我们只是做一个特殊的情况，只有文本或者子节点
    if (vnode.text && !vnode.children || !vnode.children.length) {
        //文本节点
        domNode.innerText = vnode.text
        //将孤儿节点上树，让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入标杆节点之前
        pivot.parentNode.insertBefore(domNode, pivot)

    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {

    }


}