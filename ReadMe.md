## ScrollBar - 自定义滚动条


#### 丑陋的浏览器厂商适配
1. 不同浏览器提供不同的默认浏览器滚动条，支持自定义滚动槽、滚动条
```
        ::-webkit-scrollbar {
            /*滚动条整体样式*/
            width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;

        }
        ::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            background   : #535353;
        }
        ::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background   : #ededed;
        }


```
*** 占用页面空间不够优雅 ***

2. 不同浏览器系统中滚动条默认适配也不同

MAC 支持自动隐藏滚动条，不占用空间

Windows 适配滚动条占用空间，无特殊交互

3. 完美主义者讨厌不统一，部分宣传页希望整体简洁、干净，空间有延伸感

自定义滚动条应运而生，简单轻量、职责单一

#### 滚动条不得不说的那些事情

- 什么时候出现滚动条？
父元素高度小于子元素高度，父元素拥有滚动条，可监听滚动事件

- Html、body节点，比较特殊滚动条归属取决于

```
//监听window窗口的滚动事件
window.addEventListener('scroll', (e) => {
    console.log('window');
})
//监听document对象的滚动事件
document.addEventListener('scroll', (e) => {
    console.log('document');
})
//监听html元素的滚动事件
document.documentElement.addEventListener('scroll', (e) => {
    console.log('html');
})
//监听body元素的滚动事件
document.body.addEventListener('scroll', (e) => {
    console.log('body');
})

```
