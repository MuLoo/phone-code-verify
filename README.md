# phone-code-verify 简介
phone-code-verify是一个手机验证码输入组件，它封装了在验证码输入时的交互与UI，是一个开箱即用的React小组件。

## 功能
- 支持4-6单字符位输入
- 支持输入框内容校验，校验未通过时实时展示自定义信息以及UI提醒
- 支持框和下划线两种布局方式
- 支持粘贴自动填入
- 支持键盘左右键选择输入框、删除键回退、回车键提交
- 支持样式修改等等

## 演示
### 方框样式
[UI演示视频](https://leisurenana.x.yupoo.com/54306700?uid=1)

![默认样式](https://pic.yupoo.com/leisurenana/46c08e1b/c8735c9e.png)
![自动校验](https://pic.yupoo.com/leisurenana/89180c68/dde15f57.png)
![成功提交](https://pic.yupoo.com/leisurenana/3d7c4565/5d50a2e2.png)

### 单线模式
[UI演示视频](https://leisurenana.x.yupoo.com/54306805?uid=1)

![默认样式](https://pic.yupoo.com/leisurenana/b14bd9c9/1329d2b9.png)
![自动校验](https://pic.yupoo.com/leisurenana/0f8e996e/b5da9a0a.png)
![成功提交](https://pic.yupoo.com/leisurenana/a3d91d21/fb5e5e0b.png)

## 使用
```jsx
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

## 样式修改

样式可以使用自定义样式覆盖组件样式。
也可以使用以下方式覆盖`PCV_xxx`样式。
```jsx
function YourApp () {
  return (
    <div>
      <style>
        {`.PCV_container {
          color: red;
        }`}
      </style>
      <PhoneCodeVerify {...customProps} />
    </div>
  )
}
```

