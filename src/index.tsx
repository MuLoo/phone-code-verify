// export * from "./phoneCodeVerify";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { PhoneCodeVerify } from "./phoneCodeVerify";
// import './indextest.less'

const logger = (text: string[]) => console.log(text);
const confirm = (values: string[]) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 10000)
  })
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PhoneCodeVerify
  // wrapperClass="testContainer"
  maxWidth={400}
  num={6}
  mode="line"
  pattern="[0-9]"
  patternMessage="请输入数字"
  onChange={logger}
  onConfirm={confirm}
/>);
