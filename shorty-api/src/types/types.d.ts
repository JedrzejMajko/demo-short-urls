interface CaptchaRequest {
  headers: {
    recaptcha: string | Promise<string>;
  };
}
