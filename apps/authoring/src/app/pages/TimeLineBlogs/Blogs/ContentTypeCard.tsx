import { Box } from '@mui/material';
import { format } from "date-fns";
import '../../articles/Description.css';
import PollIcon from '../../../assets/Poll.svg';
import QuizIcon from '../../../assets/QuizIcon.svg';
import VodIcon from '../../../assets/PrelemVideo.png';
import ArticleIcon from '../../../assets/articleIcon.png';
import { handleHtmlTags, nullToObject } from '../../../utils/helperFunctions';

function ContentTypeCard(props: any) {
  const { background_content = {}, Thumbnail = {}, ContentType = "", PublishedDate = "" } = nullToObject(props.content);
  const { Color = '' } = nullToObject(background_content);
  return (
    <Box sx={{ height: 'inherit' }}>
      <div style={{ position: 'relative', height: 'inherit' }} className="content">
        <div style={{ left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' }}>
          {Thumbnail.Url != '' ?
            <img src={Thumbnail.Url} style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
            :
            <div style={{
              backgroundColor: Color, width: '100%', objectFit: 'cover', height: '100%',
            }}
            ></div>}
        </div>
        <div
          style={{
            position: 'relative',
            bottom: 0,
            left: 0,
            padding: '2% 3%',
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'end',
            minHeight: '170px',
          }}
        >
          <div>
            <span style={{
              fontSize: '12px',
              marginBottom: '0',
              fontWeight: 'bold',
              color: '#fff',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              borderBottom: ' 1px solid',
              width: 'max-content'
            }}>
              {
                ContentType === 'Quiz' ?
                  <img src={QuizIcon} alt='image not available'
                    style={{ filter: 'invert(1)', height: '30px', width: '30px' }} />
                  : null
              }
              {
                ContentType === 'Poll' ?
                  <img src={PollIcon} alt='image not available'
                    style={{ filter: 'invert(1) !important', height: '30px', width: '30px' }} />
                  : null
              }
              {
                ContentType === 'Article' ?
                  <img src={ArticleIcon} alt='image not available'
                    style={{ filter: 'invert(1) !important', height: '30px', width: '30px' }} />
                  : null
              }
              {
                ContentType === 'Vod' ?
                  <img src={VodIcon} alt='image not available'
                    style={{ filter: 'invert(1) !important', height: '30px', width: '30px' }} />
                  : null
              }
              {ContentType}
            </span>
            <span
              style={{
                fontSize: '14px',
                marginBottom: '0',
                fontWeight: 'bold',
                color: '#fff',
                textTransform: 'capitalize',
                WebkitLineClamp: 1,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                wordWrap: 'break-word',
              }}
            >
              {Thumbnail.Title}
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#fff !important',
                WebkitLineClamp: 2,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                wordWrap: 'break-word',
              }}
            >
              {handleHtmlTags(Thumbnail.Description)}
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#fff !important',
                WebkitLineClamp: 2,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                wordWrap: 'break-word',
              }}
            >
              {PublishedDate ? format(new Date(PublishedDate), "d:M:y | H:mm") : ""}
              {/* {PublishedDate} */}
            </span>


          </div>
        </div>
      </div>
      <br />
    </Box>
  );
}
export default ContentTypeCard;
