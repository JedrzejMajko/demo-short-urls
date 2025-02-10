import { ButtonCategory } from "../../types/enums";
import type { ButtonProps } from "../../types/props";
import { getButtonClasses } from "../../utils/styles";

export const Button = ({
  type,
  disabled,
  text,
  category = ButtonCategory.primary,
  onClick
}: ButtonProps): React.JSX.Element => {

  const buttonClasses = getButtonClasses(category);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={"flex justify-center rounded-md  px-6 py-1.5 text-base/8 font-semibold "+buttonClasses}
    >
      {text}
    </button>
  );
};