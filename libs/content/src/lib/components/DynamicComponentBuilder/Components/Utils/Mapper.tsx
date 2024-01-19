export const addQuestionMapper = (fileds, answers, username, addImage) => {
  const time = new Date().toISOString();
  let data = {};
  const {
    original_image,
    published_images,
    question_type,
    qus_background_content,
    short_description,
    short_title,
    bg_color,
  } = fileds;
  const qus_type = question_type === 'Single Choice' ? 'Single' : 'Multiple';
  data = {
    contenttype: 'Question',
    input: {
      CommonFields: {
        page: short_title,
        short_description: short_description,
        category: 'Question',
        createdBy: username,
        page_lastmodifiedby: username,
        IsConfirm: false,
        creationDate: time,
        modificationDate: time,
      },
      ObjectFields: {
        is_image_option: addImage,
        options_compound_fields: answers?.map((answer) => {
          return {
            option_image: {
              url: answer.image,
              title: 'Option Image',
            },
            is_correct: answer.status,
            option_text: answer.option,
            option_id: answer.id,
          };
        }),
        background_content: {
          Url: qus_background_content?.Thumbnail
            ? qus_background_content?.Thumbnail
            : '',
          IsImage: qus_background_content?.Thumbnail ? true : false,
          Title: 'Question Background Image',
          Description: 'Question Background Image',
          ColorCode: bg_color,
        },
        question: short_title,
        question_type: qus_type,
        original_image: original_image,
        published_images: published_images,
      },
    },
  };
  return data;
};
