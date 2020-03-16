/**
 * 
 * @author ajycc20 <ajycc20@qq.com>
 * @description 获取必应壁纸、一言句子并构造签到title、body然后发布到每日签到
 * 
 */

const superagent = require('superagent')
const dayjs = require('dayjs')

let cookie = ''
let bingApiUrl = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
let date = dayjs().format('YYYY-MM-DD')


let title = ''
let bodyText = ''

/**
 * @description 构造发布的title
 * @returns 
 */
function setTitle() {
  return superagent
  .get('https://v1.hitokoto.cn/')
  .then(res => {
    let json = eval('(' + res.text + ')')

    title = (dayjs().day() === 5) ? '[每周五固定主题 ' + date + '] 本周最开心的事情是什么？' : ('[每日签到 ' + date + '] ' + json.hitokoto)
  })
}
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
 * @param {string} title
 * @param {string} bodyText
 * @returns 
 */
function newPost(title, bodyText) {
  const jsonstr = {
    id: '8',
    type: 'new',
    subject: title,
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

setTitle().then( _ =>{
  setBodyText().then( _ =>{
  }).then( _ => {
    console.log(title)
    console.log(bodyText)
    
    newPost(title, bodyText)
    .then(res => {
      console.log(res.statusCode)
    })
    .catch(err => {
      console.log(err)
    })
  })
})
