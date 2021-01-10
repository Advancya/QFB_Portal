import moment from "moment";
import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Collapse,
  Modal,
  useAccordionToggle,
} from "react-bootstrap";
import arrowUp from "../images/arrow-up.svg";
import arrowDown from "../images/arrow-down.svg";

import { AuthContext } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";
import Chart from "../images/Chart.png";
import Data from "../json/Faqs";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion2 from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface iFaqs {
  showFaqsModal?: boolean;
  hideFaqsModal?: () => void;
}
function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div
      className="d-flex align-items-center justify-content-between"
      onClick={decoratedOnClick}
    >
      {children}
      <img
        src={isCurrentEventKey ? arrowUp : arrowDown}
        className="img-fluid mx-2"
      />
    </div>
  );
}
function Faqs(faqsProps: iFaqs) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const Content =
    currentContext.language === "en" ? Data.Data.En : Data.Data.Ar;

  const [showFaqs, setShowFaqs] = useState(false);

  const handleCloseFaqs = () => {
    setShowFaqs(false);
  };
  const handleShowFaqs = () => {
    setShowFaqs(true);
  };
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
      },
      parentNode: {
        "&:first-child": {
          borderTopLeftRadius: theme.typography.pxToRem(16),
          borderTopRightRadius: theme.typography.pxToRem(16),
        },
        "&:last-child": {
          borderBottomLeftRadius: theme.typography.pxToRem(16),
          borderBottomRightRadius: theme.typography.pxToRem(16),
        },
      },
      heading: {
        fontSize: theme.typography.pxToRem(17),

        fontFamily:
          currentContext.language === "en" ? "Archer" : "DINNextLTArabic",

        fontWeight: "bold",
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        fontFamily:
          currentContext.language === "en" ? "Archer" : "DINNextLTArabic",
      },
    })
  );

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return (
    <>
      <a href="#" onClick={handleShowFaqs}>
        {local_Strings.FaqsTitle}
      </a>
      <Modal
        show={showFaqs}
        onHide={handleCloseFaqs}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center ">
            <div className="modal-header-text"></div>
            <div className="ib-text">
              <h4>{local_Strings.FaqsTitle}</h4>
            </div>
          </div>

          <button type="button" className="close" onClick={handleCloseFaqs}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <>
            {Content.map((item, index) => {
              return (
                <Accordion2
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  className={classes.parentNode + " m-0"}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Typography className={classes.heading}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="p-0">
                    <Accordion className="analysis-accordion w-100">
                      {item.Questions.map((subitem, subindex) => {
                        return (
                          <Card key={subindex} className="mx-0 bg-transparent">
                            <Card.Header>
                              <ContextAwareToggle
                                eventKey={`panel${subindex}`}
                                callback=""
                              >
                                {subitem.Question}
                              </ContextAwareToggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey={`panel${subindex}`}>
                              <Card.Body className="bg-gray">
                                <div
                                  className="text-left"
                                  dangerouslySetInnerHTML={{
                                    __html: subitem.Answer,
                                  }}
                                />
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        );
                      })}
                    </Accordion>
                  </AccordionDetails>
                </Accordion2>
              );
            })}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Faqs;
