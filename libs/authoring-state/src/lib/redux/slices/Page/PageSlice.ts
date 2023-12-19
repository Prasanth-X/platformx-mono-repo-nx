import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageData } from './Page.types';
const initialState: PageData = {
    pageInfo: {
        PageName: '',
        PageDescription: '',
        PageTags: [],
        prelemMetaArray: [],
        PageURL: '',
        PageViewer: '',
        PageCaching: false,
        PageMobileFriendly: false,
        SeoTitle: '',
        SeoDescription: '',
        SeoKeywords: [],
        SeoBlockIndexing: false,
        SocialOgTitle: '',
        SocialOgDescription: '',
        SocialOgSiteName: '',
        SocialOgType: 'Website',
        SocialOgURL: '',
        SocialOgLocale: 'en_US',
        SocialOgImage: '',
        SocialOgTwitterTitle: '',
        SocialOgTwitterDescription: '',
        SocialOgTwitterImage: '',
        SocialOgTwitterURL: '',
        SocialTwitterCardSize: 'summary_large_image',
        content: '',
    }
}
export const pageSlice = createSlice({
    name: 'Page',
    initialState,
    reducers: {
        updatePageSettings: (state, action: PayloadAction<any>) => {
            state.pageInfo = action.payload;
        },

    },
});

export const {
    updatePageSettings
} = pageSlice.actions;

export default pageSlice.reducer;
