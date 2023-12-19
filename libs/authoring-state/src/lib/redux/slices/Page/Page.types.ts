export type PageInfo = {
    content: any
    prelemMetaArray: any[];
    pageSettings?: any;
    pageModel?: any;
    PageName?: string;
    PageDescription?: string;
    PageTags?: string[];
    PageURL?: string;
    PageViewer?: string;
    PageCaching?: boolean;
    PageMobileFriendly?: boolean;
    SeoTitle?: string;
    SeoDescription?: string;
    SeoKeywords?: string[];
    SeoBlockIndexing?: boolean;
    SocialOgTitle?: string;
    SocialOgDescription?: string;
    SocialOgSiteName?: string;
    SocialOgType?: string;
    SocialOgURL?: string;
    SocialOgLocale?: string;
    SocialOgImage?: string;
    SocialOgTwitterTitle?: string;
    SocialOgTwitterDescription?: string;
    SocialOgTwitterImage?: string;
    SocialOgTwitterURL?: string;
    SocialTwitterCardSize?: string;
};

export type PageData = {
    pageInfo: PageInfo;
};