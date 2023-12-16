export type Props = {
    e: any;
    analytics: {
        pageId?: number;
        prelemId?: number;
        pageTitle?: string;
        prelemTitle?: string;
        pageDesc?: string;
        pageTags?: string;
        prelemTags?: string;
        prelemPosition?: number;
        isAnalyticsEnabled: boolean;
        isAuthoring: boolean;
        isSeoEnabled: boolean;
    };
    defaultObj?: {
        pageId?: number;
        pageTitle?: string;
        pageDesc?: string;
        pageTags?: string;
        prelemID?: number;
        prelemTitle?: string;
        prelemTags?: string;
        prelemPosition?: number;
    };
    handleTrack?: (arg: string, e: object) => void;
}