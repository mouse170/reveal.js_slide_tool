================================================================
整個世界都是我的簡報室 - revealjs slide tool
================================================================
***************
介紹
***************
本應用(**整個世界都是我的簡報室 - revealjs slide tool**)為使用websocket技術，進行同步操作投影片，實做電子白板功能的revealjs簡報工具

***************
參與人員
***************
- Pan
- Dan
- Chu 

***************
安裝說明
***************

port:8124

指令欄下：npm install socket.io

修改以下檔案:

1. slide.html
2. remote.html
3. remote.js
4. video.js
5. canvasDraw.js
6. reveal.js-master/index.html

檔案中的localhost為自己的domain

修改完後下 **node server.js**

***************
操作說明
***************
Start
===============
slide.html為其應用主頁

選擇右上角的admin圖示，開啟admin權限，即可同步操作投影片

Remote
===============
手持裝置連入remote.html即可以該頁面來操作投影片進行、與滑鼠游標移動(重力感應器)

***************
參考資料
***************
- `reveal.js <https://github.com/hakimel/reveal.js/>`_
- `socket.io <https://github.com/Automattic/socket.io>`_