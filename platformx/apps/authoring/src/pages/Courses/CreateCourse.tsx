import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import { IframeDetails } from './IframeDetails';

const CreateCourse = () => {
  const navigate = useNavigate();
  const returnBack = () => {
    navigate('/content/course');
  };

  return (
    <>
      <Header returnBack />
      <IframeDetails returnBack={returnBack} />
    </>
  );
};
export default CreateCourse;
