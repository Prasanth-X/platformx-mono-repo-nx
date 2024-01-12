

import CourseListIcon from "../../assets/svg/course-icon.svg";
import DraftIcon from "../../assets/svg/draftIcon.svg";
import EventsListIcon from "../../assets/svg/event-fill.svg";

import PublishedIcon from "../../assets/svg/PublishedIcon.svg";
import UnpublishedIcon from "../../assets/svg/UnpublishedIcon.svg";
import PollListIcon from "../../assets/svg/polls-fill.svg";
import SchedulePublishIcon from "../../assets/svg/schedulePublishIcon.svg";
import ScheduledUnpublishIcon from "../../assets/svg/scheduleUnpublishIcon.svg";
import Challenge_community from "../../assets/svg/Challenge_community.svg";
import General_community from "../../assets/svg/General_community.svg";
import News_community from "../../assets/svg/News_community.svg";
import SpacePrivateIcon from "../../assets/svg/Private.svg";
import SpaceListIcon from "../../assets/svg/Space.svg";
import ArticleListIcon from "../../assets/svg/articleListIcon.svg";
import DraftStatusIcon from "../../assets/svg/draftStatusIcon.svg";
import PagesListIcon from "../../assets/svg/pagesListIcon.svg";
import SpacePublicIcon from "../../assets/svg/public.svg";
import PublishedStatusIcon from "../../assets/svg/publishStatusIcon.svg";
import QuizListIcon from "../../assets/svg/quizListIcon.svg";
import SchedulePublishStatusIcon from "../../assets/svg/schedulePublishStatusIcon.svg";
import ScheduleUnpublishStatusIcon from "../../assets/svg/scheduleUnpublishStatusIcon.svg";
import UnpublishedStatusIcon from "../../assets/svg/unpublishStatusIcon.svg";
import VODListIcon from "../../assets/svg/vodListIcon.svg";

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
    profile: ArticleListIcon,
};