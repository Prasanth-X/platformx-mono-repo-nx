import { Grid } from '@mui/material';
import React from 'react';
import { FieldDefinition } from './DynamicComponent.types';
import { FormikTextField, TitleSubTitle, XButton, XFileUpload, XTextArea } from '@platformx/utilities';
// import FileUpload from '../../CommonSchemaComponents/FileUpload/FileUpload';
// import { FieldDefinition } from '../../CommonSchemaComponents/FormTextField/FormTextField.types';
// import TextArea from '../../CommonSchemaComponents/TextArea/TextArea';
// import TitleSubTitle from '../../CommonSchemaComponents/TitleSubtitle/TitleSubTitle';
// import { XButton } from '../../CommonSchemaComponents/XButton/XButton';
// import FormikTextField from '../../components/Common/FormikTextField';


interface DynamicFormProps {
  fields: FieldDefinition[];
  formik: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, formik }) => {
  return (
    <>
      {fields.map((field: FieldDefinition) => (
        <>{builder(field, formik)}</>
      ))}
    </>
  );

  function builder(field: FieldDefinition, formik: any) {
    switch (field.type) {
      case 'text':
        return (
          <>
            {/* <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={'h6medium'}
                subTitleVariant={'h7regular'}
                title={field.title}
                subTitle={field.description}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox />
            </Grid> */}
            {field.variant === 'multiline' ? (
              <>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  < TitleSubTitle titleVariant={'h6medium'}
                    subTitleVariant={'h7regular'}
                    title={field.title}
                    subTitle={field.description}
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <XTextArea minRows={6} maxRows={8} />
                </Grid>{' '}
              </>
            ) : (
              <>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  <TitleSubTitle
                    titleVariant={'h6medium'}
                    subTitleVariant={'h7regular'}
                    title={field.title}
                    subTitle={field.description}
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <FormikTextField metaData={field} />
                </Grid>
              </>
            )}
          </>
        );
      case 'image':
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={'h6medium'}
                subTitleVariant={'h7regular'}
                title={field.title}
                subTitle={field.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <XFileUpload chooseText='Choose your image' />
            </Grid>
          </>
        );
      case 'button':
        return <XButton variant={'primaryButton'} />;
      default:
        return null;
    }
  }
};

export default DynamicForm;
