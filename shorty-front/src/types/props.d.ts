declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance
    captchaOnLoad: () => void
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void
  execute: (siteksy: string, options: ReCaptchaExecuteOptions) => Promise<string>
  render: (id: string, options: ReCaptchaRenderOptions) => any
  reset: () => void
}


export interface LoadingProps {
  loading: boolean
}

export interface ButtonProps {
    type: ButtonHTMLAttribute.type,
    disabled?: ButtonHTMLAttribute.disabled,
    text: string,
    category?: ButtonCategory/* = ButtonCategory.primary*/,
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
  
  export interface TextInputProps {
    name: string,
    id: string, 
    value: string, 
    label?: string, 
    required?: InputHTMLAttributes.required,
    type?: InputHTMLAttributes.type,
    onChange: InputHTMLAttributes.onChange, 
    autoComplete?: InputHTMLAttributes.autoComplete,
     disabled?: InputHTMLAttributes.disabled,
  }

  export interface CardTitleProps {
    title: string;
  }

  export interface ShortenBoxProps {
    success: boolean;
    visible: boolean;
    url?: string;
    errorMessage?: string;
  }

export interface RecaptchaProps { 
    sitekey: string;
    action: string;
    session: string; // Current session of captcha. Changing it will retrigger exec
    callback: (token: string|null) => void;
  }
