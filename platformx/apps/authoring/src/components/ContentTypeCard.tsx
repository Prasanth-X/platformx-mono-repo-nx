import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { format } from 'date-fns';
import articleIcon from '../assets/dynamicprelemicons/article.svg';
import imgIcon from '../assets/dynamicprelemicons/imggallery.svg';
import pollIcon from '../assets/dynamicprelemicons/poll.svg';
import quizIcon from '../assets/dynamicprelemicons/quiz.svg';
import vodIcon from '../assets/dynamicprelemicons/vod.svg';
import { nullToObject } from '../utils/helperFunctions';

const ContentTypeCard = ({
  content,
}: //secondaryArgs,
  ContentTypeCardProps) => {
  const { background_content } = nullToObject(content);
  const { Url = '', Color = '' } =nullToObject( background_content) || {};
  const getIcon = (ct: string) => {
    switch (ct) {
      case "Article": return articleIcon;
      case "Poll": return pollIcon;
      case "Quiz": return quizIcon;
      case "ImageGallery": return imgIcon;
      default: return vodIcon;
    }
  };
  const minCss = `
      .singlebr {
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 1;
       overflow: hidden;
      }
       .doublebr {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
       }`;
  const titleMaxLength = 35;
  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'end',
        borderRadius: '5px',
      }}
      className='contenttype_card'
    >
      <style>{minCss}</style>
      <CardMedia
        image={content.Thumbnail?.Url || Url}
        sx={{
          height: '100%',
          position: 'absolute',
          width: '100%',
          backgroundSize: 'cover',
          left: 0,
          top: 0,
          borderRadius: '5px',
          maxWidth: '100%',
          backgroundColor: Color,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.4)',
          width: '100%',
          height: { xs: '920px', sm: '506px', md: '650px' },
          color: '#FFFFFF',
        }}
      ></Box>
      <CardContent
        sx={{
          position: 'relative',
          color: '#ffffff',
          backgroundColor: 'transparent',
          mt: { xs: 0, sm: 0, md: 4, lg: 8 },
          paddingBottom: '10px !important',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderBottom: '2px solid',
            paddingBottom: '6px',
            width: 'fit-content',
          }}
        >
          <img src={getIcon(content.ContentType || '')} />
          <Typography
            gutterBottom
            variant='h7medium'
            sx={{ color: 'inherit', margin: '0 0 1px 4px' }}
          >
            {content?.ContentType === 'VOD' ||
              content?.ContentType === 'Quiz' ||
              content?.ContentType === 'Poll'
              ? content?.ContentType
              : content?.ContentType?.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant='h6medium'
          component='h2'
          sx={{
            color: 'inherit',
            margin: '3px 0',
            textTransform: 'capitalize',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'block',
            position: 'relative',
            zIndex: '9999',
            wordBreak: 'break-word',
            maxWidth: {
              xs: '110px',
              sm: '87px',
              md: '152px',
              lg: '152px',
              xl: '152px',
            },
            '&:hover': {
              overflow: 'visible',
              whiteSpace: 'normal',
              height: 'auto',
            },
            // display: '-webkit-box',
            // WebkitLineClamp: 3,
            // WebkitBoxOrient: 'vertical',
            // overflow: 'hidden',
          }}
        >
          {content?.Title && content?.Title?.length > titleMaxLength ?
            <>{`${content?.Title?.substring(0, titleMaxLength)}...`}</>
            :
            <>{content?.Title}</>}
        </Typography>
        <Typography
          className='doublebr'
          gutterBottom
          sx={{
            color: '#ced3d9',
            textTransform: 'capitalize',
            marginBottom: '1px',
          }}
          variant='h7medium'
        >
          {content.Author}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
          }}
        >
          <Typography
            gutterBottom
            sx={{ color: '#ced3d9' }}
            variant='h7regular'
          >
            {content?.lastModifiedDate
              ? format(
                new Date(content?.lastModifiedDate),
                'LLL dd, yyyy | H:mm'
              )
              : format(new Date(content?.PublishedDate), 'LLL dd, yyyy | H:mm')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

interface ContentTypeCardProps {
  content: Content;
}

interface Content {
  Author?: string;
  ContentType?: string;
  contentType?: string;
  Count?: string;
  Description?: string;
  EditorialItemPath?: string;
  PublishedDate?: any;
  lastModifiedDate?: any;
  SEODescription?: string;
  SEOTitle?: string;
  SEOImage?: object;
  Thumbnail: {
    Name: string;
    Url: string;
    AltText: string;
  };
  Title?: string;
  background_content?: any;
}

export default ContentTypeCard;
