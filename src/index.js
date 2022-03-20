/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:29:32
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 20:56:45
 */
import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
// var myVNode1 = h('div', {}, '盒子')
// var myVNode2 = h('ul', {}, [
//     h('li', {}, '1'),
//     h('li', {}, '2'),
//     h('li', {}, [
//         h('span', {}, 's1'),
//         h('span', {}, 's2'),
//     ]),
// ])
// var myVNode3 = h('ul', {}, h('li', {}, '1'))
// console.log(myVNode1)
// console.log(myVNode2)
// console.log(myVNode3)
var myVnode = h('h', {}, '这是新节点')
var container = document.getElementById('container')
patch(container, myVnode)