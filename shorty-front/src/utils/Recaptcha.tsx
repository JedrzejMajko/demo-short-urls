import { useEffect, useRef } from "react";
import type { RecaptchaProps, ReCaptchaInstance } from "../types/props"

/**
 * Hook to load the recaptcha instance
 * @param siteKey 
 * @returns 
 */
const useInstanceLoader = (siteKey: string) => {
    const helperInstance = useRef<ReCaptchaInstance>(null!);
  
    useEffect(() => {
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          helperInstance.current = window.grecaptcha;
        };
        document.body.appendChild(script);
      } else {
        helperInstance.current = window.grecaptcha;
      }

      return ()=>{
        if(helperInstance.current){
          helperInstance.current.reset();
        }
      }
  
    }, [siteKey]);
  
    return helperInstance.current;
  };

/**
 * Recaptcha component
 * @param params RecaptchaProps 
 * @returns 
 */
export const Recaptcha = ({ sitekey, action, callback, session }: RecaptchaProps): React.JSX.Element => {

  // Load the captcha instance
  const loader = useInstanceLoader(sitekey);

  // Function to execute the captcha
  const execute = ()=>{
    loader.execute(sitekey, {action}).then((token: string)=>{
      callback(token);
    })
  }

  // If the loader is not ready, wait for it
  useEffect(()=>{
    if(loader){
      loader.ready(()=>execute())
    }
  },[loader]);

  // In runtime, when session changes, it means we have to retrigger the captcha
  useEffect(()=>{
    if(loader){
      execute();
    }
  },[session]);

  
  return (
    <div
      className="g-recaptcha"
      data-sitekey={sitekey}
      data-size="invisible"
    ></div>
  )

}
