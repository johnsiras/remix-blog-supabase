import classNames from "classnames";
import { useField } from "remix-validated-form";

type TextareaProps = {
  label: string;
  placeholder?: string;
  altLabel?: string;
  classes?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  label,
  placeholder,
  altLabel,
  classes,
  ...props
}: TextareaProps) {
  const { error, getInputProps } = useField(props.name as string);

  return (
    <div className="form-control">
      <label htmlFor={props.name} className="label">
        <span className="label-text">
          {label} {props.required && <span className="text-error">*</span>}
        </span>
      </label>

      <textarea
        {...getInputProps({
          placeholder,
          className: classNames(
            "textarea textarea-bordered",
            error && "textarea-error",
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
