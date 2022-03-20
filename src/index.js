/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:29:32
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 13:09:35
 */
import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
// var myVNode = h('div', {}, '盒子')
var myVNode = h('ul', {}, [
    h('li', {}, '1'),
    h('li', {}, '2'),
    h('li', {}, [
        h('span', {}, 's1'),
        h('span', {}, 's2'),
    ]),
])
// var myVNode3 = h('ul', {}, h('li', {}, '1'))
// console.log(myVNode1)
// console.log(myVNode2)
// console.log(myVNode3)
// var myVnode = h('h', {}, '这是新节点')
var container = document.getElementById('container')
patch(container, myVNode)