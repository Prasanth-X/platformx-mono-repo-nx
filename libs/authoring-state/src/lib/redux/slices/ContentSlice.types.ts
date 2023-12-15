export type ContentInstance = {
    name?: string;
    page: string;
    parent_page_url?: string;
    page_state?: string;
    current_page_url: string;
    title?: string;
    tags?: [];
    description?: string;
    modificationDate: string;
    lastModifiedBy?: string;
    page_publishedby?: string;
    path: string;
    questions: [];
    display_scores: string;
    background_content?: {
        Url?: string;
        Thumbnail: string;
    };
    result_range_1: string;
    result_range_2: string;
    result_range_3: string;
    result_range_4: string;
    analytics_enable: boolean;
    category: string;
    createdBy: string;
    creationDate: string;
    is_edit: boolean;
    others: string;
    page_lastmodifiedby: string;
    robot_txt: string;
    seo_enable: boolean;
    settingsProperties: string;
    short_description: string;
    site_name: string;
    sitemap: string;
    structure_data: string;
}

export type ContentState = {
    contentArray: ContentInstance[] | [];
    //new list props
    contentList: any[];
    startIndex: number;
    loading: boolean;
    contentType: string;
    clearStatus: boolean;
    currentContent: ContentInstance | any;
    isUnsavedVod: boolean;
    contentProp: string;
    apiState: boolean;
}

