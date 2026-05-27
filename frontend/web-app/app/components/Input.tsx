import { useController, UseControllerProps } from 'react-hook-form';
import { HelperText, Label, TextInput } from 'flowbite-react';

export default function Input(
  props: {
    label: string;
    type?: string;
    showLabel?: boolean;
  } & UseControllerProps,
) {
  const { field, fieldState } = useController({ ...props });

  return (
    <div className='mb-3 block'>
      {props.showLabel && (
        <div className='mb-2 bloc'>
          <Label htmlFor={props.name}>{props.label}</Label>
        </div>
      )}
      <TextInput
        {...props}
        {...field}
        value={field.value || ''}
        type={props.type || 'text'}
        placeholder={props.label}
        color={
          fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'
        }
      />
      <HelperText color='failure'>
        {fieldState.error?.message as string}
      </HelperText>
    </div>
  );
}
