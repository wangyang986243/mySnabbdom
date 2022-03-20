/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:29:32
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 21:54:22
 */
import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
var myVNode1 = h('section', {}, [
    h('p', { key: "A" }, 'A'),
    h('p', { key: "B" }, 'B'),
    h('p', { key: "C" }, 'C'),
])
var container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, myVNode1)

var myVNode2 = h('section', {}, [

    h('p', { key: "C" }, 'C'),
    h('p', { key: "B" }, 'B'),
    h('p', { key: "A" }, 'A'),


])
btn.onclick = function () {
    patch(myVNode1, myVNode2)
}