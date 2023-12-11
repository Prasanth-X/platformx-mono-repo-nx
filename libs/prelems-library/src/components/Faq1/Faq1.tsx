import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import ContentReplace from "../ContentReplace/ContentReplace";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./Faq1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const FAQ1 = ({ content, analytics, authoringHelper, secondaryArgs }: FAQ1Props) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let FAQStructureData;
    try {
      FAQStructureData = {
        "@context": "http://schema.org/",
        "@type": "FAQPage",
        mainEntity: content?.Slots?.map((item: any) => {
          return {
            "@type": "Question",
            name: item?.Question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item?.Answer,
            },
          };
        }),
      };
    } catch (e) {
      FAQStructureData = {};
    }
    return FAQStructureData;
  };
  const genrateStructureData = () => {
    let FAQStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        FAQStructureData = JSON.parse(tempSD);
      } else {
        FAQStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      FAQStructureData = defaultStructureData();
    }
    return FAQStructureData;
  };

  const onContentReplace = () => {
    secondaryArgs?.multiSlot?.onToggleContentGallery("FAQ", true);
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [content?.Title, content?.Slots]);

  usePrelemImpression(analytics, inView);

  const [expanded, setExpanded] = useState<number | false>(false);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const gridVal = {
    md: [12, 12],
    em: [5, 7],
    lg: [5, 7],
  };
  const handleChange = (panel: number) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    if (content?.Slots) {
      setQuestions(content?.Slots);
    }
  }, [content]);
  const firstColumnContent = () => {
    return (
      <Box className='faq'>
        <Typography variant='h2medium' id='Title' className='title'>
          {content?.Title}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box
        className='accordianWrapper'
        sx={{
          "&:hover": {
            ".add-content-overlay": {
              display: authoringHelper?.isEditing ? "flex !important" : "none",
            },
          },
        }}>
        <ContentReplace onReplaceClick={onContentReplace} />
        {questions.map((item: any, index: any) => {
          return (
            <>
              <Accordion
                key={item?.Question}
                expanded={expanded === index}
                onChange={handleChange(index)}
                disableGutters
                elevation={0}
                square
                className='accordianHeading'>
                <AccordionSummary
                  className='accordiansummary'
                  expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant='h4semibold'>{item?.Question}</Typography>
                </AccordionSummary>
                <AccordionDetails className='accordianDetail'>
                  <Box>
                    <Typography variant='p2regular'>{item?.Answer}</Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </Box>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.faq1Wrapper} ${globalClasses.prelemType1} prelem prelemType1 faq1 faq1Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Grid container ref={ref}>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            gridVal={gridVal}
            customClassName='FAQ1'
            noGap={true}
            col1Align='start'
            col2Align='start'
          />
        </Grid>
      </Container>
    </div>
  );
};

interface FAQ1Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}
interface QuestionProps {
  Question?: string;
  Answer?: string;
}
interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  Slots?: QuestionProps[];
}

FAQ1.defaultProps = {
  content: {
    Title: "Frequently Asked Questions",
    Slots: [
      {
        Question: "When did HCLTech have its Initial Public Offer (IPO)?",
        Answer:
          "HCLTech made an initial public offering in December 1999 and trading in the stock commenced on 11th January, 2000.",
      },
      {
        Question: "What is the ISIN Code of the Company?",
        Answer: "INE860A01027",
      },
      {
        Question: "What is the Corporate Identification Number of the Company?",
        Answer: "L74140DL1991PLC046369",
      },
      {
        Question: "What is the procedure for Dematerialization of shares?",
        Answer:
          "For converting the shares held in physical form to electronic form (i.e. Dematerialize), you would require to open a demat account with any one of the Depository Participant (‘DP’) and surrender the original share certificates to them along with the duly completed Dematerialization Request form (‘DRF’). Your DP will send this request to our RTA. Our RTA will verify the documents and if found in order, the dematerialization request will be confirmed and the shares, in turn, will be credited to your demat account.rnKindly note that the names of the shareholders in the Demat account should be in order with the shares held in physical form.",
      },
      {
        Question: "What is the procedure for Transposition of shares?",
        Answer:
          "In order to change the order of names on the physical share certificates, the registered shareholder should make an application to the Company or its RTA along with the original share certificates.",
      },
      {
        Question: "What is the Registered Address of the Company?",
        Answer: "HCLTech Limitedrn806, Siddharthrn96, Nehru PlacernNew Delhi-110019rnIndia",
      },
    ],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "FAQ 1",
    pageDesc:
      "This prelem can be used to display the FAQs. If the number of FAQs is more than 4 FAQs, the FAQs move via scroll",
    pageTags: "FAQs, FAQ, Questions, Query, Question",
    prelemTags: "FAQs, FAQ, Questions, Query, Question",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default FAQ1;
