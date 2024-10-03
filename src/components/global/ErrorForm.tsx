export const ErrorForm = ({ errors, inputName }: { errors: any, inputName: string }) => {
    return errors?.[inputName] ? <p>{errors[inputName].message}</p> : null;
  };
  