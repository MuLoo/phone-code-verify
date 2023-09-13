# phone-code-verify 简介
phone-code-verify是一个手机验证码输入组件，它封装了在验证码输入时的交互与UI，是一个开箱即用的React小组件。

## 功能
- 支持4-6单字符位输入
- 支持输入框内容校验，校验未通过时实时展示自定义信息以及UI提醒
- 支持框和下划线两种布局方式
- 支持键盘左右键选择输入框、删除键回退、回车键提交
- 支持样式修改等等

## 演示
### 方框样式
<video src="https://uvd.yupoo.com/leisurenana/23626104.mp4" muted></video>

### 单线模式
<video src="https://uvd.yupoo.com/leisurenana/23626089.mp4" muted></video>

## 使用
```js
import { PhoneCodeVerify } from 'phone-code-verify'
import type { PhoneCodeVerifyProps } from 'phone-code-verify'

function YourApp () {
  const handleConfirm = (values) => {
    console.log('Got values onConfirm: ', values)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok')
      }, 1000)
    })
  }
  const handleChange = (values) => {
    console.log('Got values onChange: ', values)
  }
  const customProps = {
    wrapperClass: "yourCuntomClass",
    tip:"手机验证码", // 展示在输入框上面的说明文字内容
    maxWidth: 400, // 输入区域最大宽度
    num: 4, // 几个输入框
    mode: "line", // 'default'是输入框样式， 'line' 是单线样式
    pattern:"[0-3]", // 输入框校验规则, 见https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
    patternMessage: "请输入0-3的数字", // 校验未通过时展示的文字
    button: true, // 是否展示输入框下方提交按钮
    buttonText: "输入验证", // 按钮文字
    onConfirm: handleConfirm, // 提交事件
    onChange: handleChange // 输入事件
  } as PhoneCodeVerifyProps
  return (
    <div>
      <PhoneCodeVerify {...customProps} />
    </div>
  )
}
```



