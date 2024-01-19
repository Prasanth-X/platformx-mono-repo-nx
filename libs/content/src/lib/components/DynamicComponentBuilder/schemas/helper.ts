import * as yup from 'yup';
import { FieldDefinition } from '../DynamicComponent.types';
import ValidationType from '../DynamicComponent.enums';

export interface ValidationConfig {
    name: string;
    type: string;
    validations?: {
        type: string;
        params: any[];
    }[];
}

export function createYupSchema(
    schema: yup.ObjectSchema<any>,
    { name, type, validations = [] }: FieldDefinition
) {
    if (!yup[type]) {
        return schema;
    }

    let validate = yup[type]();
    validations.forEach(({ message, type }) => {
        if (validate[type]) {
            validate = validate[type](message);
        }
    });

    if (name.indexOf('.') !== -1) {
        // Handle nested fields if needed
    } else {
        schema.fields[name] = validate;
    }
    return schema;
}

export const createSchema = (
    schema: FieldDefinition[],
) => {
    const yepSchema = schema.reduce(createYupSchema, yup.object({}));

    const mergedSchema = {
        ...(yepSchema.fields || {}),
    };
    return yup.object(mergedSchema);
};

export const getInitialValues = (fields: FieldDefinition[]) => {
    const initialValues: { [key: string]: any } = {};
    fields?.forEach((el) => {
        initialValues[el.name] = el?.value || "";
    });
    console.log("initialValues", initialValues)
    return initialValues;
};


type ValidationResult = {
    [fieldName: string]: yup.StringSchema<string | undefined>;
};
const validationSchema = yup.object({
    title: yup.string()
        .min(250, "minimum 250 charecter length required")
        .required("Product Description required"),
    short_description: yup.string().required("Stock required"),
    background_content: yup
        .string()
        .required("5 Key Points required"),
    "description": yup.string()
        .min(250, "minimum 250 charecter length required")
        .required("Product Description required"),
    "structure_data": yup.string()
        .min(250, "minimum 250 charecter length required")
        .required("Product Description required"),
});
export function buildValidationSchema(fields: FieldDefinition[]): any {
    const result: any = {};
    if (fields?.length > 0) {
        fields.forEach((field) => {
            let validationSchema: yup.StringSchema<string | undefined> = yup.string();
            if (field?.validations && field?.validations?.length > 0) {
                field.validations.forEach((validation) => {
                    switch (validation.type) {
                        case ValidationType.Required:
                            validationSchema = yup.string().required(`${field.title} is required`);
                            break;
                        case ValidationType.MinLength:
                            validationSchema = yup.string().min(validation.value, `${field.title} must be at least ${validation.value} characters`);
                            break;
                        case ValidationType.MaxLength:
                            validationSchema = yup.string().max(validation.value, `${field.title} cannot exceed ${validation.value} characters`);
                            break;
                        case ValidationType.Email:
                            validationSchema = yup.string().email(`${field.title} must be a valid email`);
                            break;
                        case ValidationType.Number:
                            validationSchema = yup.string().matches(/^[0-9]+$/, `${field.title} must be a number`);
                            break;
                        default:
                            break;
                    }
                });
            }

            result[field.name] = validationSchema;
        });
    }

    const validateSchema = yup.object().shape(result);
    return validateSchema;
}
