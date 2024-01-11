import * as Yup from "yup";

const useDynamicForm = (fields) => {
  const initialValues: any = {
    profile_image: {},
    background_image: {},
    debut_image: {},
    international_debut_image: {},
    birth_date: "0",
    debut_date: "0",
    joined_date: "0",
    left_date: "0",
    international_debut_date: "0",
  };
  const validationSchemaFields = {};
  let validationSchema = {};
  if (fields?.length > 0) {
    fields.forEach((field) => {
      initialValues[field.name] = field?.value ? field?.value : "";
      // setInitialValues({ ...initialValues, [field.name]: '' });
      const fieldValidations = field.validations?.reduce((validations, validation) => {
        if (validation.type === "required") {
          validations = validations.required(`${field.title} is ${validation.message}`);
        } else if (validation.type === "maxLength") {
          validations = validations.max(
            validation.value,
            `${field.title} is ${validation.message}`,
          );
        }
        return validations;
      }, Yup.string());
      console.log("valid", fieldValidations?.label(field.title));
      if (field.variant?.toLowerCase().includes("multiline")) {
        validationSchemaFields[field.name] = fieldValidations?.label(field.title);
      } else {
        validationSchemaFields[field.name] = fieldValidations?.label(field.title)?.trim();
      }
    });

    // const
    validationSchema = Yup.object().shape(validationSchemaFields);
    console.log("schema", validationSchema);
  }
  return { initialValues, validationSchema };
};

export default useDynamicForm;
