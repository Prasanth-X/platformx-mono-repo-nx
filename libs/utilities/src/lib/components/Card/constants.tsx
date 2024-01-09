import UnpublishedIcon from '@mui/icons-material/Unpublished';

import {
    ArticleListIcon,
    Challenge_community,
    CourseListIcon,
    // DraftIcon,
    DraftStatusIcon,
    EventsListIcon,
    General_community,
    News_community,
    PagesListIcon,
    PollListIcon,
    PublishedIcon,
    PublishedStatusIcon,
    QuizListIcon,
    SchedulePublishIcon,
    SchedulePublishStatusIcon,
    ScheduleUnpublishStatusIcon,
    ScheduledUnpublishIcon,
    SpaceListIcon,
    SpacePrivateIcon,
    SpacePublicIcon,
    UnpublishedStatusIcon,
    VODListIcon,
} from '../../assets/svg';

export const statusIcons: any = {
    draft: PublishedIcon, //TODO
    published: PublishedIcon,
    unpublished: UnpublishedIcon,
    schedulePublish: SchedulePublishIcon,
    scheduleUnpublish: ScheduledUnpublishIcon,
    public: SpacePublicIcon,
    private: SpacePrivateIcon,
};
export const stateIcons: any = {
    draft: DraftStatusIcon,
    published: PublishedStatusIcon,
    unpublished: UnpublishedStatusIcon,
    schedulePublish: SchedulePublishStatusIcon,
    scheduleUnpublish: ScheduleUnpublishStatusIcon,
};
export const iconsList: any = {
    sitepage: PagesListIcon,
    article: ArticleListIcon,
    quiz: QuizListIcon,
    vod: VODListIcon,
    poll: PollListIcon,
    event: EventsListIcon,
    courses: CourseListIcon,
    news: News_community,
    general: General_community,
    'challenges-announcement': Challenge_community,
    Space: SpaceListIcon,
};