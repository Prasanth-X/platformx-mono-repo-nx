export const Template: any = {
  "quiz": {
    title: 'Quiz',
    name: 'quiz',
    type: 'document|Prelem|product',
    form_groups: [
      {
        index: '01',
        title: 'Title & Description',
        description: 'Fields with * are mandatory',
      },
      {
        index: '02',
        title: 'Choose Background Image',
        description: 'Fields with * are mandatory',
      },
      {
        index: '03',
        title: 'Question',
        description: 'Fields with * are mandatory',
      },
      {
        index: '04',
        title: 'Results',
        description: 'Fields with * are mandatory',
      },
      {
        index: '05',
        title: 'Choose Tags',
        description: 'Fields with * are mandatory',
      },
      {
        index: '06',
        title: 'Social Share',
        description: 'Fields with * are mandatory',
      },
      {
        index: '07',
        title: 'Analytics',
        description: 'Fields with * are mandatory',
      },
      {
        index: '08',
        title: 'SEO',
        description: 'Fields with * are mandatory',
      },
    ],
    fields: [
      {
        type: 'text',
        name: 'title',
        title: 'Title',
        index: '01',
        description: 'This will be the your quiz title',
        placeholder: 'Enter your title here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 120,
            message: '120 characters max',
          },
        ],
        variant: 'string|Number|Multiline',
      },
      {
        type: 'text',
        name: 'short_title',
        title: 'Short Title',
        index: '01',
        description: 'This will be the your quiz short title',
        placeholder: 'Enter your short title here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 60,
            message: '60 characters max',
          },
        ],
        variant: 'string',
      },
      {
        type: 'text',
        name: 'short_description',
        title: 'Short description',
        index: '01',
        description: 'This will be the your quiz short title',
        placeholder: 'Enter your short title here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 400,
            message: '400 characters max',
          },
        ],
        variant: 'multiline',
      },

      {
        type: 'text',
        name: 'description',
        title: 'Description',
        index: '01',
        description: 'This will be the your quiz description',
        placeholder: 'Enter your description here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 1000,
            message: '1000 characters max',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'image',
        name: 'background_content',
        title: 'Add Image',
        index: '02',
        description: 'Choose your image for your quiz background',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
        ifColorPallet: false,
      },
      {
        type: 'button',
        index: '03',
        name: 'view_more',
        value: 'View More',
        button_type: 'current window',
        redirect_url: '/',
        action: 'External',
        RestEndPoint: '',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'primery|secondery',
      },
      {
        type: 'question',
        name: 'question',
        title: 'Question*',
        index: '03',
        description: 'Add question for your quiz',
        buttonObj: {
          buttonLabel1: 'Add question',
          buttonLabel2: 'Choose from list',
          buttonVariant1: 'primaryButton',
          buttonVariant2: 'primaryButton',
        },
        variant: 'primery|secondery',
      },
      {
        type: 'score',
        name: 'display_score',
        title: 'Display Score By',
        index: '04',
        description: 'Display result by the percentage or counts',
        radioObj: {
          radioLabel1: 'Count',
          radioLabel2: 'Percentage',
        },
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
        value: 'Count',
      },
      {
        type: 'quote',
        name: 'result_range',
        title: 'Show Quotes',
        index: '04',
        description: 'Show quotes to user according the score',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'tags',
        name: 'tags',
        title: 'Tags',
        index: '05',
        description: 'Choose your tags',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'socialShareimage',
        name: 'socialShareImage',
        title: 'Choose Image',
        index: '06',
        description: 'Choose Image',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'text',
        name: 'socialShareTitle',
        title: `What's The Title Of The Quiz?`,
        index: '06',
        description: 'This title is require for social shares',
        placeholder: 'Enter your title here',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 120,
            message: '120 characters max',
          },
        ],
        variant: 'string',
      },
      {
        type: 'text',
        name: 'socialShareDesc',
        title: `What's This Quiz About?`,
        index: '06',
        description: 'This description will appears under the title',
        placeholder: 'Enter your title here',
        validations: [
          {
            type: 'not required',
            message: 'not Required',
          },
          {
            type: 'maxLength',
            value: 400,
            message: '400 characters max',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'switch',
        name: 'analytics_enable',
        title: 'Quiz Analytics',
        index: '07',
        description: 'Subheading description',
        variant: '',
        value: true,
      },
      {
        type: 'switch',
        name: 'impression_enable',
        title: 'Impression',
        index: '07',
        description: 'Subheading description',
        variant: '',
        value: true,
      },
      {
        type: 'switch',
        name: 'seo_enable',
        title: 'Allow Google To Find This Content',
        index: '08',
        description: 'Subheading description',
        variant: '',
      },
      {
        type: 'structured_data',
        name: 'structured_data',
        title: 'Structured Data',
        index: '08',
        description: 'Click to see the Structure data',
        variant: '',
        value: {
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          name: '',
          description: '',
          hasPart: [],
        },
      },
      {
        type: 'socialShareTags',
        name: 'socialShareTags',
        title: `Social Media Tags`,
        index: '06',
        description: 'This tag is require for social shares',
        placeholder: 'Enter your tags',
        validations: [
          {
            type: 'not required',
            message: 'not Required',
          },
          {
            type: 'maxLength',
            value: 400,
            message: '400 characters max',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'editor',
        name: 'editor',
        title: 'Description',
        index: '02',
        description: 'Wrtie your story here',
        placeholder: 'Enter your short title here',
        validations: [
          {
            type: 'not required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      // {
      //   type: 'code',
      //   name: 'structure_data',
      //   title: 'Structured Data',
      //   index: '02',
      //   description: 'Click to see the Structure data',
      //   variant: 'multiline',
      // },
    ],
    initialData: [
      {
        title: 'Lorem ipsum title',
        short_title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        descripton:
          'Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.',
      },
    ],
  },
  "article": {
    title: 'Article',
    name: 'article',
    type: 'document|Prelem|product',
    form_groups: [
      {
        index: '01',
        title: 'Title & Description',
        description: 'Fields with * are mandatory',
      },
      {
        index: '02',
        title: 'Content',
        description: 'Write your article content here',
      },
      {
        index: '03',
        title: 'Tags',
        description: 'Choose tags for your article',
      },
      {
        index: '04',
        title: 'SEO',
        description: 'SEO settings for your article',
      },
    ],
    fields: [
      {
        type: 'text',
        name: 'title',
        title: 'Title*',
        index: '01',
        description: 'This will be the title of your article',
        placeholder: 'Enter your title here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'maxLength',
            value: 120,
            message: '120 characters max',
          },
        ],
        variant: 'string|Number|Multiline',
      },
      {
        type: 'editor',
        name: 'content',
        title: 'Content*',
        index: '02',
        description: 'Write your article content here',
        placeholder: 'Enter your article content here',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'tags',
        name: 'tags',
        title: 'Tags*',
        index: '03',
        description: 'Choose tags for your article',
        validations: [
          {
            type: 'required',
            message: 'Required',
          },
        ],
        variant: 'multiline',
      },
      {
        type: 'switch',
        name: 'seo_enable',
        title: 'Allow Google To Find This Content',
        index: '04',
        description: 'Subheading description',
        variant: '',
      },
      // Add more fields as needed
    ],
    initialData: [
      {
        title: 'Lorem ipsum article',
        content:
          'Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.',
        tags: ['Lorem', 'Ipsum', 'Article'],
      },
    ],
  },
  "poll": {
    "title": "Poll",
    "name": "poll",
    "type": "document|Prelem|product",
    "form_groups": [
      {
        "index": "01",
        "title": "Title & Description",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "02",
        "title": "Choose Background Image",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "03",
        "title": "Question",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "04",
        "title": "Results",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "05",
        "title": "Choose Tags",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "06",
        "title": "Social Share",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "07",
        "title": "Analytics",
        "description": "Fields with * are mandatory"
      },
      {
        "index": "08",
        "title": "SEO",
        "description": "Fields with * are mandatory"
      }
    ],
    "fields": [
      {
        "type": "text",
        "name": "title",
        "title": "Title",
        "index": "01",
        "description": "This will be your poll title",
        "placeholder": "Enter your title here",
        "validations": [
          {
            "type": "required",
            "message": "Required"
          },
          {
            "type": "maxLength",
            "value": 120,
            "message": "120 characters max"
          }
        ],
        "variant": "string|Number|Multiline"
      },
      // Other fields similar to the quiz structure
      {
        "type": "question",
        "name": "question",
        "title": "Question*",
        "index": "03",
        "description": "Add a question for your poll",
        "buttonObj": {
          "buttonLabel1": "Add question",
          "buttonLabel2": "Choose from list",
          "buttonVariant1": "primaryButton",
          "buttonVariant2": "primaryButton"
        },
        "variant": "primary|secondary"
      },
      // Additional poll-specific fields can be added here
    ],
    "initialData": [
      {
        "title": "Lorem ipsum title",
        "short_title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "description": "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at."
      }
    ]
  }

};

export const AddQuestionData = {
  title: 'AddQuestion',
  name: 'AddQuestion',
  type: 'document|Prelem|product',
  form_groups: [
    {
      index: '01',
      title: 'Question Content',
      description: 'Fields with * are mandatory',
    },
    {
      index: '02',
      title: 'Answer Content',
      description: 'Fields with * are mandatory',
    },
  ],
  fields: [
    {
      type: 'score',
      name: 'question_type',
      title: 'Choose Question Type*',
      index: '01',
      description: 'Choose your type of question',
      radioObj: {
        radioLabel1: 'Single Choice',
        radioLabel2: 'Multi Choice',
      },
      validations: [],
      variant: '',
      value: 'Single Choice',
    },
    {
      type: 'text',
      name: 'short_title',
      title: 'Question*',
      index: '01',
      description: 'This will be the your quiz question',
      placeholder: 'Write your question here',
      validations: [
        {
          type: 'required',
          message: 'Required',
        },
        {
          type: 'maxLength',
          value: 60,
          message: '60 characters max',
        },
      ],
      variant: 'string',
    },
    {
      type: 'text',
      name: 'short_description',
      title: 'Short Description(Optional)',
      index: '01',
      description: 'Tell us about your question',
      placeholder: 'Write your description here',
      validations: [
        {
          type: 'not required',
          message: 'Required',
        },
        {
          type: 'maxLength',
          value: 400,
          message: '400 characters max',
        },
      ],
      variant: 'multiline',
    },
    {
      type: 'image',
      name: 'qus_background_content',
      title: 'Add Image/Color*',
      index: '01',
      description: 'Choose your image/color for your question background',
      variant: 'multiline',
      ifColorPallet: true,
    },
    {
      type: 'bg_color',
      name: 'bg_color',
      title: '',
      index: '01',
      description: '',
      validations: [],
      variant: '',
    },
    {
      type: 'switch',
      name: 'switch',
      title: 'Add Image In Answer*',
      index: '02',
      description: 'Add images in the answer',
      validations: [],
      variant: '',
    },
    {
      type: 'answer_content',
      name: 'answers',
      title: 'Answers',
      index: '02',
      description: 'Enter answers',
      validations: [],
      variant: '',
    },
  ],
  initialData: [
    {
      title: 'Lorem ipsum title',
      short_title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      descripton:
        'Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.',
    },
  ],
};

export const QuestionListingData = {
  header: {
    title: 'Choose Your Question',
  },
  subHeader: {
    title: 'Recently Added',
    buttonText: 'Add New Question',
  },
  tableHeader: {
    title: 'title',
    type: 'type',
    author: 'author',
    modifiedTime: 'modified Time',
    action: 'action',
  },
};
