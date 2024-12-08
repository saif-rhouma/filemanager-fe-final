/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider as RHFForm, UseFormReturn } from 'react-hook-form';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: UseFormReturn<any>;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, methods }) => {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
};
