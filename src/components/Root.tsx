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
  enter: 13,
}

export default function Root(props: PhoneCodeVerifyProps) {
  /************* state ********** */
  const {
    num = 4,
    tip = "请输入验证码",
    button = true,
    buttonText = '确认',
    mode = 'default',
    pattern = null,
    patternMessage = '',
    maxWidth = 500,
    wrapperClass = '',
    onChange = () => { },
    onConfirm = () => { },
  } = props;
  const formRef = useRef(null);
   const allRefs = Array.from({ length: 6 }).map((_, i) => i).map(_ => useRef(null));
  // const ids = Array.from({ length: num }).map((_, i) => i);
  // const inputRefsArr = ids.map(() => useRef(null))
  const submitButtonRef = useRef(null);
  const [inputRefsArr, setInputRefs] = useState(allRefs);
  const [showPatternMessage, setShowPatternMessage] = useState(false);
  const [isComplete, setInputComplete] = useState(false);
  const [buttonLoading, showButtonLoading] = useState(false);

  useEffect(() => {
    const actualRefs = allRefs.slice(0, num);
    setInputRefs(actualRefs)
  }, [num]);

  useEffect(() => {
    // form表单监听input变化
    formRef.current.addEventListener('input', handleInput, false);
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('input', handleInput);
      }
    }
  }, [num])

  useEffect(() => {
    // 输入框第一位监听粘贴事件
    if (inputRefsArr.length && inputRefsArr[0].current) {
      inputRefsArr[0].current.addEventListener('paste', handlePaste, false);
    }
    // 输入框监听键盘事件
    if (inputRefsArr.length) {
      inputRefsArr.forEach((input, index) => {
        input.current.addEventListener('keydown', handleKeyDownWrapper(index), false);
        input.current.addEventListener('focus', handleInputFocus, false);
      })
    }
    return () => {
      if (inputRefsArr.length && inputRefsArr[0].current) {
        inputRefsArr[0].current.removeEventListener('paste', handlePaste);
      }
      // 输入框监听键盘事件
      if (inputRefsArr.length) {
        inputRefsArr.forEach((input, index) => {
          input.current && input.current.removeEventListener('keydown', handleKeyDownWrapper);
          input.current && input.current.removeEventListener('focus', handleInputFocus);
        })
      }
    }
  }, [inputRefsArr]);

  useEffect(() => {
    // button监听回车事件, 只在focus时enter触发
    if (submitButtonRef.current) {
      submitButtonRef.current.addEventListener('keydown', handleButtonEnter, false)
    }
    return () => {
      if (submitButtonRef.current) {
        submitButtonRef.current.removeEventListener('keydown', handleButtonEnter)
      }
    }
  }, [isComplete]);

  useEffect(() => {
    if (inputRefsArr.length) {
      inputRefsArr[0].current.focus();
    }
  }, [inputRefsArr]);

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
  }
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    inputRefsArr.forEach((input, i) => {
      input.current.value = paste[i] || ''
    })
    const isFormValid = formRef.current.checkValidity();
    setShowPatternMessage(!isFormValid);
  }

  const handleBackspace = (e: KeyboardEvent, inputIndex: number) => {
    const input = inputRefsArr[inputIndex].current;
    if (input && input.value) return;
    // 第二次删除，才focus到前一个输入框
    if (inputIndex <= 0) return;
    const prevInput = inputRefsArr[inputIndex - 1];
    prevInput.current.focus();
  }
  const handleArrayLeft = (e: KeyboardEvent, inputIndex: number) => {
    if (inputIndex <= 0) return;
    const prevInput = inputRefsArr[inputIndex - 1].current;
    prevInput.focus();
  }
  const handleArrayRight = (e: KeyboardEvent, inputIndex: number) => {
    if (inputIndex >= num - 1) return;
    const nextInput = inputRefsArr[inputIndex + 1].current;
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
    if (keyCode !== keyboardMapping.enter) return;
    if (document.activeElement !== submitButtonRef.current) return;
    event.preventDefault();
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
        {inputRefsArr.map((ref, index) => (
          <input
            ref={ref}
            key={index}
            pattern={pattern}
            maxLength={1}
            type="text"
            name="inputValue"
            placeholder="-"
          />
        ))}
        </div>
        <span style={{ height: showPatternMessage ? 20 : 0}} className="PCV_patternMessage">{patternMessage}</span>
        {button && <button onClick={handleSubmit} disabled={showPatternMessage || !isComplete} ref={submitButtonRef} type="button" className="PCV_submitButton">
          {buttonLoading && <img src={LoadingIcon} alt="loading" />}
          {buttonText}</button>}
      </form>
    </div>
  );
}
