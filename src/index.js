/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:29:32
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 16:09:29
 */
import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
// var myVNode1 = h('section', {}, [
//     h('p', {}, 'A'),
//     h('p', {}, 'B'),
//     h('p', {}, 'C'),
// ])
var myVNode1 = h('section', {}, '我是一个文字')
var container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, myVNode1)

const myVNode2 = h('section', {}, [
    h('p', {}, 'A'),
    h('p', {}, 'B'),
    h('p', {}, [h('span', {}, '22')]),
])
btn.onclick = function () {
    patch(myVNode1, myVNode2)
}