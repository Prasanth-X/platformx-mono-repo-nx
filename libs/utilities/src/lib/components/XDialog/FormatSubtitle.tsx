import { Typography } from '@mui/material';
import { getStyleString } from '../../utils/helper';

const FormatSubtitle = ({ text = '' }) => {
  const startTag = '#';
  const endTag = '#';
  const regex = new RegExp(`\\${startTag}(.*?)\\${endTag}`, 'g');
  const boldStyle = {
    'font-weight': 'bold',
    color: 'black',
  };

  const formattedText = text.replace(
    regex,
    `<span style="${getStyleString(boldStyle)}">$1</span>`
  );

  return (
    <Typography
      variant="h5regular"
      component="span"
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};
export default FormatSubtitle;
