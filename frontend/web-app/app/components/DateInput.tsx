import { useController, UseControllerProps } from 'react-hook-form';
import { HelperText } from 'flowbite-react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput(
  props: {
    label: string;
    type?: string;
  } & UseControllerProps &
    DatePickerProps,
) {
  const { field, fieldState } = useController({ ...props });

  return (
    <div className='mb-3 block'>
      <DatePicker
        {...props}
        {...field}
        selected={field.value}
        placeholderText={props.label}
        className={`
          rounded-lg
          w-full
          border
          border-gray-600
          p-2
          flex flex-col
          ${
            fieldState.error
              ? 'bg-red-50 border-red-500 text-red-900'
              : fieldState.isDirty && !fieldState.invalid
                ? 'bg-green-50 text-green-900 border-green-500'
                : ''
          }`}
      />
      {fieldState.error && (
        <div className='mt-1 text-sm text-red-500'>
          {fieldState.error?.message as string}
        </div>
      )}
    </div>
  );
}
