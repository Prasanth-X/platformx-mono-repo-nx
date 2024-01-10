export type TitleSubTitleType = {
    titleVariant: string;
    subTitleVariant: string;
    title: string;
    subTitle: string;
};
export type FormTemplate = {
    title: string;
    name: string;
    type: string //'document' | 'Prelem' | 'product';
    form_groups: {
        index: string;
        title: string;
        description: string;
    }[];
    fields: FieldDefinition[];
};
export type SectionProps = {
    title: string;
    description: string;
    index: string;
    fields: any[];
};

export type FieldDefinition = {
    type: string;
    name: string;
    title: string;
    index: string;
    description?: string;
    placeholder?: string;
    validations?: {
        type: string;
        value: number;
        message: string;
    }[];
    variant?: string;
    value?: string;
    button_type?: string;
    redirect_url?: string;
    action?: string;
    RestEndPoint?: string;
}

