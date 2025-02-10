import { useState } from "react";
import type { ShortenBoxProps } from "../../types/props";
import { Button } from "../ui-elements/Button";

// Success box displaying the shortened URL. Can display success / failure with an error message.
export const ShortenBox = ({
  success,
  url,
  visible,
  errorMessage,
}: ShortenBoxProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div
      className={
        "text-base text-gray-900 min-h-6 w-full transition delay-10 duration-300 " +
        (visible ? "" : " opacity-0")
      }
    >
      {success ? (
        <div className="text-green-600">Success! Here&#39;s your short URL:</div>
      ) : (
        <div className="text-red-600">{errorMessage}</div>
      )}

      {success && (
        <div className="flex flex-row items-center justify-between">
          <a
            href={url}
            className="text-indigo-600 hover:text-indigo-400 underline"
            target="_blank"
          >
            {url}
          </a>

          <Button
            type="button"
            category="secondary"
            text={copied ? "Copied!" : "Copy"}
            onClick={async () => {
              if (url !== null) {
                await navigator.clipboard.writeText(url + "");
                setCopied(true);
                setTimeout(() => setCopied(false), 10 * 1000);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
