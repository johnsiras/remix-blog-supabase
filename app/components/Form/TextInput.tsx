import classNames from "classnames";
import { useField } from "remix-validated-form";

type TextInputProps = {
  label: string;
  placeholder?: string;
  altLabel?: string;
  classes?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  label,
  placeholder,
  altLabel,
  classes,
  ...props
}: TextInputProps) {
  const { error, getInputProps } = useField(props.name as string);

  return (
    <div className="form-control">
      <label htmlFor={props.name} className="label">
        <span className="label-text">
          {label} {props.required && <span className="text-error">*</span>}
        </span>
      </label>

      <input
        {...getInputProps({
          type: "text",
          placeholder,
          className: classNames(
            "input input-bordered",
            error && "input-error",
            classes
          ),
          id: props.name,
          ...props,
        })}
      />
      <label className="not-prose label">
        {error && <span className="label-text-alt text-error">{error}</span>}
        <span className="label-text-alt text-info">{altLabel}</span>
      </label>
    </div>
  );
}
