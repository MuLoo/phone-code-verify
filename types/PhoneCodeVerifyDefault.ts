export interface PhoneCodeVerifyDefaultProps {
  mode?: "line" | "default";
  num?: 4 | 5 | 6;
  tip?: string;
  button?: boolean;
  buttonText?: string;
  pattern?: string;
  patternMessage?: string
  maxWidth?: number
  wrapperClass?: string
  onChange?: (text: string[]) => void;
  onConfirm?: (inputsValue: string[]) => void;
}
