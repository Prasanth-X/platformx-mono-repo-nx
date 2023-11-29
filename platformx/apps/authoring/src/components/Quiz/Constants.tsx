import QuizIcon1 from '../../assets/MenuIcons-1.svg';
import QuizIcon2 from '../../assets/MenuIcons-2.svg';
import QuizIcon3 from '../../assets/MenuIcons-3.svg';
import QuizIcon4 from '../../assets/MenuIcons-4.svg';
import QuizIcon5 from '../../assets/MenuIcons-5.svg';
import QuizIcon6 from '../../assets/MenuIcons-6.svg';
import QuizIcon7 from '../../assets/MenuIcons-7.svg';
import QuizIcon8 from '../../assets/MenuIcons-8.svg';

const icons = [
  // {
  //   id: "quiz",
  //   iconName: QuizIcon,
  //   tooltip: "Quiz",
  // },
  {
    id: 'titleDescription',
    iconName: <img src={QuizIcon1} alt='Quiz Icon 1' />,
    tooltip: 'title_description',
  },
  {
    id: 'imageVideo',
    iconName: <img src={QuizIcon8} alt='Quiz Icon 1' />,
    tooltip: 'image_video',
  },
  {
    id: 'questions',
    iconName: <img src={QuizIcon2} alt='Quiz Icon 1' />,
    tooltip: 'questions',
  },
  {
    id: 'results',
    iconName: <img src={QuizIcon3} alt='Quiz Icon 1' />,
    tooltip: 'results',
  },
  {
    id: 'tags',
    iconName: <img src={QuizIcon4} alt='Quiz Icon 1' />,
    tooltip: 'choose_tags',
  },
  {
    id: 'socialShare',
    iconName: <img src={QuizIcon5} alt='Quiz Icon 1' />,
    tooltip: 'social_share',
  },
  {
    id: 'Analytics',
    iconName: <img src={QuizIcon6} alt='Quiz Icon 1' />,
    tooltip: 'analytics',
  },
  {
    id: 'seo',
    iconName: <img src={QuizIcon7} alt='Quiz Icon 1' />,
    tooltip: 'seo',
  },
];
export default icons;

export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
