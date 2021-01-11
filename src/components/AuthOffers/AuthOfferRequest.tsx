import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";
import {
  GetAllCurrency,
  GetOfferById,
  AddOfferSubscription,
} from "../../services/cmsService";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import moment from "moment";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import xIcon from "../../images/x-icon.svg";

interface ICurrency {
  id: number;
  name: string;
  nameAr: string;
}

interface iAuthOfferRequest {
  showAuthOfferRequestModal: boolean;
  hideAuthOfferRequestModal: () => void;
  backAuthOffersRequestModal: () => void;
  sendToAuthOffersRequestListing: () => void;
  itemID: number;
}

function AuthOfferRequest(props: iAuthOfferRequest) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [curruncies, setCurruncies] = React.useState<ICurrency[]>(null);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<IOfferDetail>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const requestOne = GetOfferById(props.itemID);
    const requestTwo = GetAllCurrency();
    axios
      .all([requestOne, requestTwo])
      .then((responseData: any) => {
        if (responseData && responseData.length > 0 && isMounted) {
          setDetail(responseData[0][0] as IOfferDetail);
          setCurruncies(responseData[1] as ICurrency[]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setTimeout(() => setLoading(false), 2000));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemID]);

  const vlidationSchema = yup.object({
    amount: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^[0-9]*$/),
    currency: yup.string().required(local_Strings.GeneralValidation),
  });

  return (
    <Modal
      show={props.showAuthOfferRequestModal}
      onHide={props.hideAuthOfferRequestModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <a
                href="#"
                onClick={props.backAuthOffersRequestModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.OfferRequest}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideAuthOfferRequestModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list mb-0">
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-12 ">
                  <div className="text-xs color-grey">
                    {item
                      ? moment(item.createdDate).format("dddd DD MMM YYYY")
                      : ""}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {item
                      ? currentContext.language === "en"
                        ? item.title
                        : item.titleAr
                      : ""}
                  </h6>
                </div>
              </div>
            </li>
          </ul>
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <Formik
            initialValues={{
              amount: "",
              currency: "QAR",
            }}
            validationSchema={vlidationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const success = await AddOfferSubscription(
                props.itemID,
                Number(values.amount),
                values.currency,
                currentContext.selectedCIF
              );
              setLoading(false);
              if (success) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: local_Strings.OfferRequestSubmitMessage.replace(
                    "[REPLACE ME]",
                    currentContext.language === "en" ? item.title : item.titleAr
                  ),
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
                props.sendToAuthOffersRequestListing();
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: local_Strings.GenericErrorMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
              }
            }}
            enableReinitialize={true}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
            }) => (
              <div className="container-fluid">
                <div className="p-3 mb-5 row col-lg-8">
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.OfferSubscriptionAmountLabel}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={handleChange("amount")}
                      onBlur={handleBlur("amount")}
                    />
                    {touched.amount &&
                      errors.amount &&
                      InvalidFieldError(errors.amount)}
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.OfferSelectCurrencyLabel}</label>
                    <select
                      className="form-control"
                      onChange={handleChange("currency")}
                      onBlur={handleBlur("currency")}
                    >
                      {curruncies &&
                        curruncies.length > 0 &&
                        !!curruncies[0].name &&
                        curruncies.map((c, i) => (
                          <option key={i} value={c.name}>
                            {currentContext.language === "en"
                              ? c.name
                              : c.nameAr}
                          </option>
                        ))}
                    </select>
                    {touched.currency &&
                      errors.currency &&
                      InvalidFieldError(errors.currency)}
                  </div>
                </div>

                <div className="text-right p-3">
                  <button
                    id="applyReqBtn"
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    {local_Strings.OfferButton}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthOfferRequest;
