// // export * from "./phoneCodeVerify";
// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { PhoneCodeVerify } from "./phoneCodeVerify";

// const logger = (text: string[]) => console.log('onChange ----', text);
// const confirm = (values: string[]) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('ok')
//     }, 1000)
//   })
// }
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<PhoneCodeVerify
//   // wrapperClass="testContainer"
//   maxWidth={400}
//   num={4}
//   mode="line"
//   pattern="[0-9]"
//   patternMessage="请输入数字"
//   onChange={logger}
//   onConfirm={confirm}
// />);
import { PhoneCodeVerify } from "./phoneCodeVerify";
import type { PhoneCodeVerifyProps } from './phoneCodeVerify'

export type { PhoneCodeVerifyProps }
export { PhoneCodeVerify }