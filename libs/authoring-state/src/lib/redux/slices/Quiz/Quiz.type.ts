export interface ImageProps {
    Thumbnail: string;
    Title: string;
    Description: string;
    Author?: string;
    Bundles?: string;
}

export interface VideoDetails {
    Name: string;
    Url: string;
    Title: string;
    Description: string;
    Attribution: boolean;
    Transcript: boolean;
    CC: boolean;
}

export interface VideoProps {
    Url: string;
    Thumbnail?: string;
    Title: string;
}

export interface QuizInstance {
    Page: string;
    Title: string;
    ParentPageURL: string;
    CurrentPageURL: string;
    Page_State: string;
    Description: string;
    short_description: string;
    Banner: string;
    tags: string[];
    contentType: string;
    quizContent?: {
        images: ImageProps[] | null;
        videos: ImageProps[] | null;
    };
    links?: '';
    linkTags?: string[];
    creationDate?: string;
    modificationDate?: string;
    createdby?: string;
    modifiedby?: string;
    Page_LastModifiedBy?: string;
    imagevideoURL?: string;
    socialShareImgURL?: string;
}

export interface QuizState {
    quizArray: QuizInstance[] | [];
    currentQuiz: QuizInstance | any;
    isUnsavedQuiz: boolean;
}
