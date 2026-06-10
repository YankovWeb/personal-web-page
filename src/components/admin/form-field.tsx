import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  value,
  onChange,
  placeholder,
  required,
  rows,
  hint,
}: FormFieldProps) {
  const controlled = value !== undefined;
  const sharedProps = {
    id: name,
    name,
    placeholder,
    required,
    ...(controlled
      ? { value, onChange }
      : { defaultValue: defaultValue ?? "" }),
  };

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {rows ? (
        <Textarea {...sharedProps} rows={rows} />
      ) : (
        <Input {...sharedProps} type={type} />
      )}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
