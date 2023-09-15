export interface PhoneCodeVerifyDefaultProps {
  mode?: "line" | "default";
  num?: 4 | 5 | 6;
  tip?: React.ReactNode;
  button?: boolean;
  buttonText?: React.ReactNode;
  pattern?: string;
  patternMessage?: React.ReactNode;
  maxWidth?: number
  wrapperClass?: string
  onChange?: (text: string[]) => void;
  onConfirm?: (inputsValue: string[]) => void;
}
