import * as React from "react";

import { PhoneCodeVerifyDefaultProps } from "types/PhoneCodeVerifyDefault";
import Root from "./components/Root";

// 后面再补充除了默认props之外其他的props
export type PhoneCodeVerifyProps = PhoneCodeVerifyDefaultProps;

export function PhoneCodeVerify(
  props: PhoneCodeVerifyDefaultProps,
): JSX.Element {
  return <Root {...props} />;
}
