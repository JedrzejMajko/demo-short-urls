import type { TextInputProps } from "../../types/props";

export const TextInput = ({
  name,
  label,
  id,
  autoComplete,
  disabled,
  type,
  value,
  onChange
}: TextInputProps): React.JSX.Element => {
  const elements = [];
  if (label) {
    elements.push(
      <label
        key="label"
        htmlFor={id}
        className="block text-base font-medium text-gray-900"
      >
        {label}
      </label>
    );
  }

  elements.push(
    <input
      key="input"
      name={name}
      id={id}
      type={type}
      autoComplete={autoComplete}
      disabled={disabled}
      value={value}
      onChange={onChange}
      required
      className="disabled:bg-gray-100 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  );
  return <div>{elements}</div>;
};
