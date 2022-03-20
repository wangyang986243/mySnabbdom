/*
 * @Description:
 * @Author: wangyang
 * @Date: 2022-03-19 15:44:50
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 21:11:41
 */
// 函数的功能十分简单，就是把传入的5个参数组合成对象返回
export default function (sel, data, children, text, elm) {
    return {
        sel, data, children, text, elm
    }
}