/**
 * 
 * @author ajycc20 <ajycc20@qq.com>
 * @description 获取必应壁纸并发布到NY论坛编号为6971的帖子
 * 
 */

const superagent = require('superagent') // 引入superagent
const dayjs = require('dayjs') // 引入dayjs

let cookie = '' // 这里填写NY的cookie
let bingApiUrl = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1' // Bing 官方api
let date = dayjs().format('YYYY-MM-DD') // 每天时间 eg. 2020-03-16

let bodyText = ''

/**
 * @description 构造发布的bodyText
 * @returns 
 */
function setBodyText() {
  return superagent
  .get(bingApiUrl)
  .then(res => {
    let bingJson = eval('(' + res.text + ')')
    let bingUrl = 'cn.bing.com' + bingJson.images[0].url

    let textBing = '[size=4][color=DarkOrange]' + date + '，今天的bing背景Url是[/color][/size][quote=bingurl]' + bingUrl + '[/quote]'
    bodyText = textBing + '[img]https://' + bingUrl + '[/img]'
  })
}

/**
 * @description 触发提交，进行签到发布
 * @param {string} bodyText
 * @returns 
 */
function newPost(bodyText) {
  const jsonstr = {
    id: '6971',
    type: 'reply',
    body: bodyText
  }

  return superagent
    .post('https://nanyangpt.com/forums.php?action=post')
    .set({
      'Content-Type': 'text/html; charset=utf-8; Cache-control:private',
      'Cookie': cookie
    })
    .type('form')
    .send(jsonstr)
}

setBodyText().then( _ =>{
}).then( _ => {
  console.log(bodyText)
  
  newPost(bodyText)
  .then(res => {
    console.log(res.statusCode)
  })
  .catch(err => {
    console.log(err)
  })
})