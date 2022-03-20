/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-20 20:35:45
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-20 23:27:08
 */

import createElement from "./createElement"
import patchVnode from "./patchVnode"

/**
 * 
 * @param {*} parentElm 当前父节点DOM
 * @param {*} oldCh 老的子元素
 * @param {*} newCh 新的子元素
 */
export default function updateChildren(parentElm, oldCh, newCh) {
    console.log('老的子元素', oldCh)
    console.log('新的子元素', newCh)
    //旧前
    let oldStartIdx = 0
    //新前
    let newStartIdx = 0
    //旧后
    let oldEndIdx = oldCh.length - 1
    //新后
    let newEndIdx = newCh.length - 1
    //旧前节点
    let oldStartVnode = oldCh[0]
    //新前节点
    let newStartVnode = newCh[0]
    //旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    //新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    //开始大的while
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        //首先不是判断1234是否命中，而是要略过已经加undefind标记的东西
        if (!oldStartVnode || !old[oldStartIdx]) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (!newStartVnode || !old[newStartIdx]) {
            newStartVnode = oldCh[++newStartIdx]
        } else if (!oldEndVnode || !old[oldEndIdx]) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (!newEndVnode || !old[newEndIdx]) {
            newEndVnode = oldCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
            //新前与旧前
            console.log('输出命中1：新前与旧前')
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            //新后与旧后
            console.log('输出命中2：新后与旧后')
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            //新后与旧前
            console.log('输出命中3：新后与旧前')
            patchVnode(oldStartVnode, newEndVnode)
            //当3 命中之后，此时要移动节点，移动新前指向的这个节点到老节点的旧后的后面
            //如何移动节点？？ 只要你插入一个已经在DOM上的节点，他就会被移动
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            //新前与旧后
            console.log('输出命中4：新前与旧后')
            patchVnode(oldEndVnode, newStartVnode)
            //当4 命中之后，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
            //如何移动节点？？ 只要你插入一个已经在DOM上的节点，他就会被移动
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            //四种命中都没有命中
            //寻找key的map
            if (!keyMap) {
                keyMap = {}
                //从oldStartIdx 开始，到oldEndIdx结束，创建keyMap映射对象
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key) {
                        keyMap[key] = i
                    }
                }
            }
            console.log(keyMap)
            //寻找当前这项(newStartIdx) 这项keyMap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.key]
            if (!idxInOld) {
                //判断，如果idxInOld不存在，表示它是全新的项
                //被加入的项（就是newStartVnode这项），现在还不是真正的节点
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                //如果idxInOld存在，不是全新的项，而且是要移动的
                const elmToMove = oldCh[idxInOld]
                if (elmToMove.elm.nodeType === 1) {
                    patchVnode(elmToMove, newStartVnode)
                    //把这项设置为undefind，表示我已经处理完这项了
                    oldCh[idxInOld] = undefined
                    //移动，调用insertBefore也可以实现移动
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
                }
                //指针下移，只移动新的头
                newStartVnode = newCh(++newStartIdx)
            }
        }

    }
    //继续查看有没有剩余的。循环结束了start 还是old 小
    if (newStartIdx <= newEndIdx) {
        console.log('new还有剩余节点没有处理')
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        for (let i = newStartIdx; i < newEndIdx; i++) {
            //insertBefore 方法可以自动识别null，如果null 就会自动排到队尾去。和appendChild是一致的
            //newCh[i]现在还没有真正的DOM，所以要调用createElement（）函数变为DOM
            parentElm.insertBefore(createElement(newCh[i]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        console.log('old还有剩余节点没有处理,要删除项')
        //批量删除oldStartIdx和oldEndIdx之间的节点
        for (let i = oldStartIdx; i < oldEndIdx; i++) {
            if (oldCh(i)) {
                parentElm.removeChild(oldCh.elm)
            }

        }
    }
}

/**
 *判断是不是同一个节点
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key
}
