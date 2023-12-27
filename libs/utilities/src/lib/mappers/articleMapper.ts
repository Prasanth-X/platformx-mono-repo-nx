import { dateFormat, getSubDomain, handleHtmlTags, trimString } from "../utils/helperFns";
import i18n from "../utils/i18next";


export const ArticleMapper = {
    updateStructureData: (content: any, banner: any, keywords: any, pageUrl: string) => {
        let articleStructureData = {};
        articleStructureData = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: trimString(handleHtmlTags(content?.title), 100),
            Description: trimString(handleHtmlTags(content?.description), 200),
            keywords: keywords,
            image: banner,
            url: `${getSubDomain()}/${i18n.language}/` + `article/${pageUrl}`,
            datePublished: dateFormat(new Date().toISOString()),
            dateModified: dateFormat(new Date().toISOString()),
            author: [
                {
                    '@type': 'Person',
                    name: content.page_createdby,
                },
            ],
        };

        return articleStructureData;
    }
} 