// export * from "./phoneCodeVerify";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { PhoneCodeVerify } from "./phoneCodeVerify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PhoneCodeVerify num={6} mode="line" pattern="[0-9]" patternMessage="请输入数字"/>);
