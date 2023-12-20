import { handleHtmlTags } from './helperFunctions';

const isValidEmail = (field, validation) => {
  if (String(field?.value).toLowerCase().match(validation) === null) {
    return true;
  }
  return false;
};

const isMaxLength = (field, validation, IsParagraph = false) => {
  const maxlength = parseInt(validation?.value);
  return IsParagraph
    ? handleHtmlTags(field.textcontent)?.length > maxlength
    : handleHtmlTags(field.value)?.length > maxlength;
};
const isRequired = (field, validation) => {
  const required = validation;
  return handleHtmlTags(field.value)?.length === 0 && required;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function arrayToObject(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    // checking if type is of button, giving special treatment
    if (obj.type == 'button' && obj?.buttonKeysObject != undefined) {
      //getting all relative objects
      const keysObj = obj.buttonKeysObject;
      // fethcing all keys
      const allKeysArray = Object.keys(keysObj);
      allKeysArray.forEach((key) => {
        if (!acc[key]) {
          acc[key] = '';
        }
        // setting key and its value in a flat structure
        acc[key] = keysObj[key];
      });
    } else {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = '';
      }
      acc[key] = obj.value;
    }
    return acc;
  }, {});
}
const onPasteRemoveCss = (event) => {
  event.preventDefault();
  const paste = event.clipboardData?.getData('text') || '';
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;
  selection.deleteFromDocument();
  selection
    .getRangeAt(0)
    .insertNode(document.createTextNode(paste.replace(/(\r\n|\n|\r)/gm, '')));
};
export const initInsituEditing = (keys, ref) => {
  //console.info(keys, ref, 'ref');
  if (ref && ref.current) {
    ref.current.addEventListener('paste', onPasteRemoveCss, false);
  }
  //
  const editaleItems: any[] = [];
  ref.current.style.overflowY = 'auto';
  ref.current.style.height = 'calc(100vh - 110px)';
  for (let i = 0; i < keys?.length; i++) {
    //handling element keys which shouldnot be ediatable hence not including them in the array
    if (keys[i].validations.undefined?.value == 'true') continue;

    const editaleHtml = ref?.current?.querySelector(`#${keys[i].id}`);
    //console.info(editaleHtml);
    if (editaleHtml) {
      editaleItems.push(editaleHtml);
    }
  }
  for (let i = 0; i < editaleItems?.length; i++) {
    if (!(editaleItems[i] instanceof HTMLButtonElement)) {
      editaleItems[i]?.setAttribute('contenteditable', 'true');
    }
  }
};

export const doneInsituEditing = (
  keys,
  ref,
  buttonsKeysPopulatedObj,
  prelemId?: any
) => {
  const updatedEditableList = [...keys]; // destructring
  ref.current.removeEventListener('paste', onPasteRemoveCss, false);
  for (let i = 0; i < updatedEditableList?.length; i++) {
    // HTML Node
    const htmlNode = ref?.current?.querySelector(
      `#${updatedEditableList[i]?.id}`
    );
    if (htmlNode) {
      // Reference of every element
      const field = updatedEditableList[i];
      let IsParagraph = false;
      if (
        prelemId === 'Prelem_007' ||
        prelemId === 'Prelem_023' ||
        prelemId === 'Prelem_026'
      ) {
        if (updatedEditableList[i]?.id.includes('Description')) {
          // const valueData = htmlNode.getAttribute('data-Description-value');
          // console.log(htmlNode.innerHTML, "sdfsjdhsjdhjsdhb");
          const innerHTMLValue = htmlNode.innerHTML;
          IsParagraph = true;
          field.value = innerHTMLValue;
          field.textcontent = innerHTMLValue;
        } else {
          field.value = htmlNode.textContent;
        }
        // if (updatedEditableList[i]?.id.includes('Description')) {
        //   IsParagraph = true;
        //   const innerHTMLValue = htmlNode.innerHTML
        //   field.value = innerHTMLValue.replace(/(<a.*?\>|<?.a>|<span.*?\>|<?.span>|<h.*?\>|<?.h\d>|<strong.*?\>|<?.strong>)/g, "")
        //   field.textcontent = htmlNode.textContent;
        // } else {
        //   field.value = htmlNode.textContent;
        // }
      } else {
        field.value = htmlNode.textContent;
      }
      // Store nodeElement of every element in a key of nodeElement
      field.nodeElement = htmlNode;

      const { validations } = field;

      interface ErrorProps {
        maxlength?: boolean;
        required?: boolean;
        email?: boolean;
      }
      const errors: ErrorProps[] = [];
      //     // Check Error state according to validation point
      for (const validationKey in validations) {
        switch (validationKey) {
          case 'maxlength':
            errors.push({
              [validationKey]: isMaxLength(
                field,
                validations[validationKey],
                IsParagraph
              ),
            });
            break;
          case 'required':
            errors.push({
              [validationKey]: isRequired(field, validations[validationKey]),
            });
            break;
          case 'email':
            errors.push({
              [validationKey]: isValidEmail(field, validations[validationKey]),
            });
            break;
          default:
            console.log(
              `function again that key is not available ${validationKey} `
            );
        }
      }
      field.errors = errors;
      field.errorString = '';
      // Return errorString with the specific error state

      field.errors.forEach((errorObj) => {
        Object.keys(errorObj).map((errorKey) => {
          if (errorObj[errorKey]) {
            //adding error boarder if any error found
            field.errorString += `${capitalize(errorKey)} `;
          }
        });
      });
      if (field.errorString.length > 0) {
        field?.nodeElement?.classList.add('error');
      } else {
        field?.nodeElement?.classList.remove('error');
      }

      if (htmlNode instanceof HTMLButtonElement) {
        field.type = 'button';
        field.buttonKeysObject =
          buttonsKeysPopulatedObj[updatedEditableList[i]?.id];
      }
    }
  }
  if (
    !updatedEditableList.some(
      (key) => key.errorString && key.errorString !== ''
    )
  ) {
    for (let i = 0; i < updatedEditableList?.length; i++) {
      updatedEditableList[i]?.nodeElement?.removeAttribute('contenteditable');
    }
    ref.current.style.overflowY = 'inherit';
    ref.current.style.height = 'auto';
  }
  const updatedEditableValue = arrayToObject(updatedEditableList, 'id');
  const updatedEditableValueWithupdatedEditableList = {
    updatedEditableValue: updatedEditableValue,
    updatedEditableList: updatedEditableList,
  };
  return updatedEditableValueWithupdatedEditableList;
};
