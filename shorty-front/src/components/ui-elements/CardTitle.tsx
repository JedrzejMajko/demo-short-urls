import type { CardTitleProps } from "../../types/props";

export const CardTitle = ({ title }: CardTitleProps): React.JSX.Element => {
  return <div className="mb-3 text-base">{title}</div>;
};
