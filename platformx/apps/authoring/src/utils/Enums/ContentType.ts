export enum ContentType {
  Page = 'page',
  Quiz = 'quiz',
  Poll = 'poll',
  Event = 'event',
  Vod = 'vod',
  Article = 'article',
}

export enum ContentAction {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  Publish = "Publish",
  UnPublish = "UnPublish",
  View = "View",
  ShareToSite = "ShareToSite",
}

export enum Category {
  Page = 'Page',
  Content = 'Content',
  Menu = 'Menu'

}

export const ContentTypeList = ['article', 'page', 'quiz', 'poll', 'event'];