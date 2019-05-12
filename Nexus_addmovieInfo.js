// ==UserScript==
// @name         Nexus_addmovieInfo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  to easy add movie info
// @author       ajycc20
// @include      http*://*/upload.php*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
      var siteUrl = decodeURI(location.href)

       // upload页有填写豆瓣link的inputbox
      if (siteUrl.match(/nwsuaf/i) || siteUrl.match(/nanyangpt/i)) {
        var doubanUrlInputBox = document.getElementsByName('dburl')[0]
        $('input[name="dburl"]').after(' <input type="button" value="Click" id="doubanFormat">')
      }

      // upload页只有填写IMDB link的inputbox 或者豆瓣link的inputbox名不为dburl 有几个是url_douban直接扔这里了
      else if (siteUrl.match(/tjupt/i) || siteUrl.match(/hdsky/i) || siteUrl.match(/ourbits/i) || siteUrl.match(/hdchina/i) || siteUrl.match(/hudbt/i)) {
        var doubanUrlInputBox = document.getElementsByName('url')[0]
        $('input[name="url"]').after(' <input type="button" value="Click" id="doubanFormat">')
        
      }
      $("#doubanFormat").click(function () {
        if (doubanUrlInputBox.value.match(/imdb/)) {
          var sid = doubanUrlInputBox.value.match(/tt\d+/)[0]
          var param = {
              site: 'douban',
              sid: sid
          }
        } else {
          var param = {
            url: doubanUrlInputBox.value
          }
        }
 
        $.ajax({
          type:'GET',
          url: 'https://api.rhilip.info/tool/movieinfo/gen', // 来自R酱的api
          data: param,
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