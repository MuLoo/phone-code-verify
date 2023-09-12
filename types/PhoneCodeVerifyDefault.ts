export interface PhoneCodeVerifyDefaultProps {
  mode?: "line" | "default";
  num?: number;
  tip?: string;
  button?: boolean;
  buttonText?: string;
  pattern?: string,
  patternMessage?: string
  maxWidth?: number
  wrapperClass?: string
  onChange?: (text: string[]) => void;
  onConfirm?: (inputsValue: string[]) => void;
}
