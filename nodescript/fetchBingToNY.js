/**
 * @author ajycc20 <ajycc20@qq.com>
 * @description 获取必应壁纸并发布到NY论坛编号为6971的帖子
 * 
 */

const superagent = require('superagent') // 引入superagent
const dayjs = require('dayjs') // 引入dayjs

let cookie = '' // 这里填写NY的cookie
let bingApiUrl = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1' // Bing 官方api
let date = dayjs().format('YYYY-MM-DD') // 每天时间 eg. 2020-03-16

superagent
  .get(bingApiUrl)
  .then(res => {
    let bingJson = eval('(' + res.text + ')') // json化
    let bingUrl = 'cn.bing.com' + bingJson.images[0].url // 拼接bing壁纸url

    // 拼接 bbcode
    let textBing = '[size=4][color=DarkOrange]' + date + '，今天的bing背景Url是[/color][/size][quote=bingurl]' + bingUrl + '[/quote]'
    let bodyText = textBing + '[img]https://' + bingUrl + '[/img]'

    const jsonstr = {
      id: '6971',
      type: 'reply',
      body: bodyText
    }

    superagent
      .post('https://nanyangpt.com/forums.php?action=post')
      .set({
        'Content-Type': 'text/html; charset=utf-8; Cache-control:private',
        'Cookie': cookie
      })
      .type('form')
      .send(jsonstr)
      .then(res => {
        console.log(res.status)
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(err => {
    console.log(err)
  })

