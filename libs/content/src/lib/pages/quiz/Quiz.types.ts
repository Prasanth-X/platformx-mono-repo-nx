export type QuizType = {
    title: string;
    short_title: string;
    short_description: string;
    description: string;
    imagevideoURL: string;
    thumbnailURL: string;
    socialShareImgURL: string;
    titleSocialShare: string;
    descriptionSocialShare: string;
    tagsSocialShare: string[];
    analytics_enable: boolean;
    impression: boolean;
    contentInsight: boolean;
    seo_enable: boolean;
    seoShared: boolean;
    scoreBy: string;
    tags: string[];
    questions: any[];
    result_range_1: string;
    result_range_2: string;
    result_range_3: string;
    result_range_4: string;
    is_schedule_publish: boolean;
    schedule_publish_datetime: string;
    is_schedule_unpublish: boolean;
    schedule_unpublish_datetime: string;
    original_image: any;
    published_images: string[];
};

export type NewQuizType = {
    CommonFields: {
        page: string;
        title: string;
        short_title: string;
        description: string;
        short_description: string;
        category: "Quiz";
        site_name: "PlatX";
        page_state: string;
        is_edit: boolean;
        seo_enable: boolean;
        analytics_enable: boolean;
        robot_txt: boolean;
        sitemap: boolean;
        analytics: string;
        others: string;
        structure_data: string;
        creationDate: string;
        modificationDate: string;
        tags: string[];
        createdBy: string;
        parent_page_url: string;
        current_page_url: string;
        page_lastmodifiedby: string;
        settings: Record<string, any>;
    };
    ObjectFields: {
        questions: any[];
        background_content: {
            objectType: string;
            Url: string;
            Title: string;
            Thumbnail: string;
            Color: string;
        };
        display_scores: string;
        result_range_1: string;
        result_range_2: string;
        result_range_3: string;
        result_range_4: string;
    };
};
