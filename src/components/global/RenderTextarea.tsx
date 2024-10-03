import { Controller, FieldErrors } from 'react-hook-form'
import { ErrorForm } from '@/components/global'

export const RenderTextarea = (
  name: string,
  languageData: any = '',
  errors: FieldErrors<FormData>,
  control: any
) => {
  const nameLower = name.toLowerCase()

  return (
    <div className="input-container">
      <label htmlFor="name">
        {languageData?.contact.form.label[nameLower]}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              placeholder={languageData?.contact.form.placeholder[nameLower]}
              rows={3}
            />
            <ErrorForm errors={errors} inputName={name} />
          </>
        )}
      />
    </div>
  )
}

// control: Control<FormData>