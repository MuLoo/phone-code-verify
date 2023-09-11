/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import type { PhoneCodeVerifyProps } from "../phoneCodeVerify";
import './Root.less'; 

const {
  useRef,
  useState,
  useEffect
} = React;

const keyboardMapping = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39
}

export default function Root(props: PhoneCodeVerifyProps) {
  /************* state ********** */
  const {
    num = 4,
    tip = "请输入验证码",
    button = true,
    buttonText = '确认',
    mode = 'default',
    pattern = '',
    patternMessage = ''
    // onChange = () => {}
  } = props;
  const ids = Array.from({ length: num }).map((_, i) => i);
  const formRef = useRef(null);
  const inputRefs = ids.map(() => useRef(null))
  const [showPatternMessage, setShowPatternMessage] = useState(false);

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.addEventListener('paste', handlePaste, false);
    }
    inputRefs.forEach((input, index) => {
      input.current.addEventListener('keydown', (event: KeyboardEvent) => handleKeyDown(event, index), false);
      input.current.addEventListener('focus', (e:any) => {
        setTimeout(() => {
          e.target.select()
        }, 0)
      }, false);
    })
    formRef.current.addEventListener('input', handleInput, false);
  }, [])

  /************* methods ********** */
  const handleInput = (e: InputEvent) => {
    const input = e.target as HTMLInputElement;
    const isFormValid = formRef.current.checkValidity();
    setShowPatternMessage(!isFormValid)
    const nextInput = input.nextElementSibling as HTMLInputElement;
    if (nextInput && input.value) {
      nextInput.focus()
      if (nextInput.value) {
        nextInput.select()
      }
    }
  }
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    inputRefs.forEach((input, i) => {
      input.current.value = paste[i] || ''
    })
  }

  const handleBackspace = (e: KeyboardEvent, inputIndex: number) => {
    console.log('is handleBackspace', e, inputIndex);
    const input = inputRefs[inputIndex].current;
    if (input && input.value) {
      input.value = ''
      return;
    }
    // 第二次删除，才focus到前一个输入框
    if (inputIndex <= 0) return;
    const prevInput = inputRefs[inputIndex - 1];
    prevInput.current.focus();
  }
  const handleArrayLeft = (e: KeyboardEvent, inputIndex: number) => {
    if (inputIndex <= 0) return;
    const prevInput = inputRefs[inputIndex - 1].current;
    prevInput.focus();
  }
  const handleArrayRight = (e: KeyboardEvent, inputIndex: number) => {
    if (inputIndex >= num - 1) return;
    const nextInput = inputRefs[inputIndex + 1].current;
    nextInput.focus();
  }

  const handleKeyDown = (e: KeyboardEvent, idx: number)  => {
    const { keyCode } = e;
    switch (keyCode) {
      case keyboardMapping.backspace:
        handleBackspace(e, idx);
        break;
      case keyboardMapping.arrowLeft:
        handleArrayLeft(e, idx);
        break
      case keyboardMapping.arrowRight:
        handleArrayRight(e, idx);
        break;
      default:
    }
  }

  return (
    <div className="PCV_container">
      <form ref={formRef}>
        {tip && <h5>{tip}</h5>}
        <div className={`PCV_inputBox ${mode === 'line' ? 'PCV_line' : ''}`}>
        {ids.map((item, index) => (
          <input
            ref={inputRefs[index]}
            key={item}
            pattern={pattern}
            maxLength={1}
            type="text"
            placeholder="-"
          />
        ))}
        </div>
        <span style={{ height: showPatternMessage ? 16 : 0}} className="PCV_patternMessage">{patternMessage}</span>
        {button && <button type="button" className="PCV_submitButton">{buttonText}</button>}
      </form>
    </div>
  );
}
