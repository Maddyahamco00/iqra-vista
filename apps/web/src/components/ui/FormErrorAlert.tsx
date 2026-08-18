interface FormErrorAlertProps {
  title?: string;
  message: string;
}

export function FormErrorAlert({ title, message }: FormErrorAlertProps) {
  return (
    <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
      {title && <p className="font-medium mb-0.5">{title}</p>}
      <p>{message}</p>
    </div>
  );
}
