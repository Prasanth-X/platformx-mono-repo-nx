export interface ContentTypeMenu {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    contentType: string; // Adjust the type accordingly
    listItemDetails: any; // Replace with the actual type
    category: string; // Adjust the type accordingly
    subCategory: string[]; // Adjust the type accordingly
    deleteContent: (item: any) => void;
    duplicate: (isDuplicate: boolean, title: string, language: any, selectedContent: any) => void;
    preview: (item: any) => void;
    unPublish: (item: any) => void;
    view: (item: any) => void;
    edit?: (item: any) => void;
    fetchContentDetails?: (item: any) => void;
    duplicateToSite?: (site: string) => void;
    siteList: any
}

