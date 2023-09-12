/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import type { PhoneCodeVerifyProps } from "../phoneCodeVerify";
import './Root.less'; 
import LoadingIcon from '../../public/loading.svg';

const {
  useRef,
  useState,
  useEffect
} = React;

const keyboardMapping = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39,
  keyDown: 13,
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
    patternMessage = '',
    maxWidth = 500,
    wrapperClass = '',
    onChange = () => { },
    onConfirm = () => { },
  } = props;
  const ids = Array.from({ length: num }).map((_, i) => i);
  const formRef = useRef(null);
  const inputRefs = ids.map(() => useRef(null))
  const submitButtonRef = useRef(null);
  const [showPatternMessage, setShowPatternMessage] = useState(false);
  const [isComplete, setInputComplete] = useState(false);
  const [buttonLoading, showButtonLoading] = useState(false);

  useEffect(() => {
    // 输入框第一位监听粘贴事件
    if (inputRefs[0].current) {
      inputRefs[0].current.addEventListener('paste', handlePaste, false);
    }
    // 输入框监听键盘事件
    inputRefs.forEach((input, index) => {
      input.current.addEventListener('keydown', handleKeyDownWrapper(index), false);
      input.current.addEventListener('focus', handleInputFocus, false);
    })
    // form表单监听input变化
    formRef.current.addEventListener('input', handleInput, false);
    return () => {
      if (inputRefs[0].current) {
        inputRefs[0].current.removeEventListener('paste', handlePaste);
      }
      formRef.current.removeEventListener('input', handleInput);
      // 输入框监听键盘事件
    inputRefs.forEach((input, index) => {
      input.current.removeEventListener('keydown', handleKeyDownWrapper);
      input.current.removeEventListener('focus', handleInputFocus);
    })
    }

  }, [])

  useEffect(() => {
    // button监听回车事件, 只在focus时enter触发
    submitButtonRef.current.addEventListener('keydown', handleButtonEnter, false)
    return () => submitButtonRef.current.removeEventListener('keydown', handleButtonEnter)
  }, [isComplete]);

  useEffect(() => {
    if (inputRefs.length) {
      inputRefs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    // 输入完毕并且无错误，则button获取焦点
    if (!showPatternMessage && isComplete && submitButtonRef.current) {
      submitButtonRef.current.focus()
    }
  }, [showPatternMessage, isComplete]);

  /************* methods ********** */
  const handleInput = (e: InputEvent) => {
    const input = e.target as HTMLInputElement;
    const formData = new FormData(formRef.current);
    const values = formData.getAll('inputValue') as string[]
    const isComplete = values.filter(item => !!item.length).length === num;
    setInputComplete(isComplete)
    onChange(values);
    const isFormValid = formRef.current.checkValidity();
    setShowPatternMessage(!isFormValid);
    const nextInput = input.nextElementSibling as HTMLInputElement;
    if (nextInput && input.value) {
      nextInput.focus()
      if (nextInput.value) {
        nextInput.select()
      }
    }
    // if (input.value && !nextInput && isFormValid && submitButtonRef.current) {
    //   setTimeout(submitButtonRef.current.focus(), 0)
    // }
  }
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    inputRefs.forEach((input, i) => {
      input.current.value = paste[i] || ''
    })
  }

  const handleBackspace = (e: KeyboardEvent, inputIndex: number) => {
    const input = inputRefs[inputIndex].current;
    if (input && input.value) return;
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

  const handleKeyDown = (e: KeyboardEvent, idx: number) => {
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

  const handleKeyDownWrapper = (idx:number) => {
    return (event: KeyboardEvent) => {
      handleKeyDown(event, idx)
    }
  }
  const handleButtonEnter = (event: KeyboardEvent) => {
    const { keyCode } = event;
    if (keyCode !== keyboardMapping.keyDown) return;
    if (document.activeElement !== submitButtonRef.current) return;
    handleSubmit()
  }

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      event.target.select()
    }, 0)
  }

  const handleSubmit = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    // buttonLoading
    if (showPatternMessage) return;
    if (!isComplete) return;
    if (buttonLoading) return;
    const formData = new FormData(formRef.current);
    const values = formData.getAll('inputValue') as string[]
    showButtonLoading(true)
    Promise.resolve(onConfirm(values)).finally(() => showButtonLoading(false))
  }

  return (
    <div className={`PCV_container ${wrapperClass}`} >
      <form ref={formRef} style={{ maxWidth }}>
        {tip && <h5>{tip}</h5>}
        <div className={`PCV_inputBox ${mode === 'line' ? 'PCV_line' : ''}`}>
        {ids.map((item, index) => (
          <input
            ref={inputRefs[index]}
            key={item}
            pattern={pattern}
            maxLength={1}
            type="text"
            name="inputValue"
            placeholder="-"
          />
        ))}
        </div>
        <span style={{ height: showPatternMessage ? 16 : 0}} className="PCV_patternMessage">{patternMessage}</span>
        {button && <button onClick={handleSubmit} disabled={showPatternMessage || !isComplete} ref={submitButtonRef} type="button" className="PCV_submitButton">
          {buttonLoading && <img src={LoadingIcon} alt="loading" />}
          {buttonText}</button>}
      </form>
    </div>
  );
}
