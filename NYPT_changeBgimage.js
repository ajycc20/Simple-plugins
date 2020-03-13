// ==UserScript==
// @name         NYPT_changeBgimage
// @namespace    https://ajycc20.github.io
// @version      0.1
// @description  to add bingimage
// @author       ajycc20
// @include      http*://nanyangpt.com/bgimage.php
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';
  $(document).ready(function() {
      $('input[type="submit"]').after(' <input type="button" value="GetBingUrl" id="getBingUrl" style="border-right: #ccc 1px outset;padding-right: 2px;border-top: #ccc 1px outset;padding-left: 2px;font-weight: bold;background: url(./btnbg.gif) repeat-x left top;padding-bottom: 1px;border-left: #ccc 1px outset;cursor: pointer;color: #666;padding-top: 1px;border-bottom: #ccc 1px outset;">')
      $("#getBingUrl").click(function(){
         GM_xmlhttpRequest({
           type: 'GET',
           url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
           headers: { "Content-Type": "application/json" },
           onload: function(res) {
             var json = eval('(' + res.responseText + ')')
             var url = json["images"][0]["url"]
             url = 'https://cn.bing.com' + url
             document.getElementsByTagName('input')[0].value = url
           }
         })
      })
  })

})();