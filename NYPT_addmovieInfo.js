// ==UserScript==
// @name         NYPT_addmovieInfo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一个沙雕一样的插件 --> 方便填写种子信息
// @author       ajycc20
// @match        https://nanyangpt.com/upload.php
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
      // 创建insertafter函数 方便插入button
      // function insertAfter(newElement, targetElement) {
      //   var parent = targetElement.parentNode
      //   if (parent.lastChild == targetElement) {
      //     parent.appendChild(newElement)
      //   } else {
      //     parent.insertBefore(newElement, targetElement.nextSibling)
      //   }
      // }
      // // 创建button为添加format准备
      // var button = document.createElement('input')
      // button.setAttribute('type', 'button')
      // button.setAttribute('value', 'Click')
      // button.setAttribute('id', 'doubanFormat')

      var doubanUrlInputBox = document.getElementsByName('dburl')[0]
      // insertAfter(button, doubanUrlInputBox)

      $('input[name="dburl"]').after(' <input type="button" value="Click" id="doubanFormat">')

      // ajax获取豆瓣format数据并填写在textarea里，感谢r酱提供的api
      $("#doubanFormat").click(function(){
        $.ajax({
          type:'GET',
          url: 'https://api.rhilip.info/tool/movieinfo/gen?url=' + doubanUrlInputBox.value,
          dataType: 'json',
          success: function(data) {
            if(data.format === undefined) {
              alert('请填写豆瓣链接')
            } else {
              document.getElementsByClassName('bbcode')[0].innerHTML += data.format
            }
          },
          error: function(e) {
            console.log(e)
          }
        })
      })
    })
})();