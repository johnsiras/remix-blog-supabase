import classNames from "classnames";
import { useIsSubmitting } from "remix-validated-form";

export default function Button({
  children,
  classes,
  ...props
}: {
  children: React.ReactNode;
  classes?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isSubmitting = useIsSubmitting();

  return (
    <button
      type="submit"
      className={classNames("btn", isSubmitting && "loading", classes)}
      disabled={isSubmitting}
      {...props}
    >
      {children}
    </button>
  );
}
