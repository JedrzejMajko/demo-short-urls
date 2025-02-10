import { useState } from "react";
import { GOOGLE_PUBLIC_API_KEY } from "astro:env/client";
import { UrlFormStatus } from "../types/enums";
import { ShortenBox } from "./ui-blocks/ShortenBox";
import { Button } from "./ui-elements/Button";
import { CardTitle } from "./ui-elements/CardTitle";
import { Loading } from "./ui-elements/Loading";
import { TextInput } from "./ui-elements/TextInput";
import { postUrl } from "../utils/api";
import { Recaptcha } from "../utils/Recaptcha";

/**
 * Check if the form is finalized
 * @param status UrlFormStatus
 * @returns Indication if form is finalized (request has  finished)
 */
export const isFinalizedForm = (status: UrlFormStatus): boolean => {
  switch (status) {
    case UrlFormStatus.completed:
    case UrlFormStatus.error:
      return true;
  }
  return false;
};

/**
 * Check if the form is disabled
 * @param status UrlFormStatus
 * @returns Indication if form is disabled
 */
export const isDisabledForm = (status: UrlFormStatus): boolean => {
  switch (status) {
    case UrlFormStatus.idle:
    case UrlFormStatus.error:
      return false;
  }
  return true;
};

// Main Form component
const Form = (): React.JSX.Element => {
  const [status, setStatus] = useState<UrlFormStatus>(UrlFormStatus.idle);
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submittableToken, setSubmittableToken] = useState<string | null>(null);
  const [session, setSession] = useState<string>(Date.now().toString());

  // Reset the captcha by setting a new session value
  const resetForm = (): void => {
    setSession(Date.now().toString());
  };

  // Submits the form with captcha recheck
  const submitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();

    if (submittableToken === null || submittableToken === "") {
      setError("You need to validate the reCAPTCHA");
      setStatus(UrlFormStatus.error);
      resetForm();
      return;
    }

    setStatus(UrlFormStatus.loading);

    // Obtain short url (or catch an error)
    await postUrl(url, submittableToken)
      .then((shortUrl) => {
        // If short url is obtained, set it and finalize the form
        if (shortUrl) {
          setShortUrl(shortUrl);
          setStatus(UrlFormStatus.completed);
          resetForm();
          return;
        }
        // Failed with an empty short url and without an error message
        setError("Failed to shorten the URL");
        setStatus(UrlFormStatus.error);
      })
      .catch((catchedError: Error) => {
        setStatus(UrlFormStatus.error);
        setError(catchedError.message);
        resetForm();
      });
  };

  // Recaptcha callback for validation
  const validated = (token: string | null): void => {
    setSubmittableToken(token);
  };

  // Url has changed, we're preparing the form status for submition
  const changedUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    setUrl(e.target.value);
    setStatus(UrlFormStatus.idle);
  };

  const isFinalized = isFinalizedForm(status);
  const isDisabled = isDisabledForm(status);

  return (
    <>
      <form
        className="space-y-6 relative pb-4"
        onSubmit={submitForm}
        method="POST"
      >
        <CardTitle title="Enter the URL to shorten" />

        <TextInput
          label="URL"
          name="url"
          id="url"
          autoComplete="url"
          type="url"
          value={url}
          onChange={changedUrl}
        />

        <div className="flex gap-4 items-center ">
          <Button text="Shorten" type="submit" disabled={isDisabled} />
          <Loading loading={status === UrlFormStatus.loading} />
        </div>

        <Recaptcha
          action="Create"
          session={session}
          sitekey={GOOGLE_PUBLIC_API_KEY}
          callback={validated}
        />
      </form>

      <ShortenBox
        visible={isFinalized}
        success={status === UrlFormStatus.completed}
        errorMessage={error}
        url={shortUrl}
      />
    </>
  );
};


export default Form;