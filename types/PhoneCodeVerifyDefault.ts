export interface PhoneCodeVerifyDefaultProps {
  mode?: "line" | "default";
  num?: number;
  tip?: string;
  button?: boolean;
  buttonText?: string;
  pattern?: string,
  patternMessage?: string
  onChange?: (text: string) => void;
}
