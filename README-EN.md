# phone-code-verify
[中文](./README.md) | English
--- 
`phone-code-verify` is a mobile verification code input component that encapsulates the interaction and UI during the verification code input. It is a ready-to-use React component.

## Features
- Supports input of 4-6 single characters.
- Supports input validation, displaying custom information and UI reminders in real-time when validation fails.
- Supports two layout options: box and underline.
- Supports automatic filling when pasting.
- Supports navigating between input boxes using the arrow keys，deleting characters with the backspace key, and submitting with the enter key.
- Supports style customization and more.

## Video Demo

### Box Style
[video demo](https://leisurenana.x.yupoo.com/54306700?uid=1)

![Default Style](https://pic.yupoo.com/leisurenana/8a47894e/82815327.png)
![Auto Validation](https://pic.yupoo.com/leisurenana/1865c53d/9ea92a99.png)
![Successful Submission](https://pic.yupoo.com/leisurenana/78a6e81a/381d660f.png)

### Underline Style
[video demo](https://leisurenana.x.yupoo.com/54306805?uid=1)

![Default Style](https://pic.yupoo.com/leisurenana/2176369d/77b0f6b4.png)
![Auto Validation](https://pic.yupoo.com/leisurenana/af335f78/8b6e4059.png)
![Successful Submission](https://pic.yupoo.com/leisurenana/7672a442/685a135f.png)


## Usage
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
    tip:"PHONE CODE VERIFICATION", // Text Content Displayed above the Input Box
    maxWidth: 400, // Maximum Width of the Input form Area
    num: 4, // Number of Input Boxes
    mode: "line", // 'default' is box style， 'line' is underline style
    pattern:"[0-3]", // Validation Rules for Inputs, see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
    patternMessage: "Please enter a number from 0-3", // Text Displayed when Validation Fails
    button: true, // Whether to Display Submit Button below the Input Box
    buttonText: "confirm", // button text
    onConfirm: handleConfirm, // Handling Event when Button is Clicked or Enter Key is Pressed
    onChange: handleChange // Event Triggered by Input Form Content Changes
  } as PhoneCodeVerifyProps
  return (
    <div>
      <PhoneCodeVerify {...customProps} />
    </div>
  )
}
```

## Styling

You can use custom styles to override the component styles. You can also override the `PCV_xxx` styles using the following approach.
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