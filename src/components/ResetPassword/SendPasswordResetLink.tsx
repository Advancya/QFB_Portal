import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";
import MultiSelect from "react-multi-select-component";
import moment from "moment";
import randomatic from "randomatic";
import {
  GetAllCustomerList, AddPasswordToken, SendSMS
} from "../../services/cmsService";

interface iSendPasswordResetLink {
  showFormModal: boolean;
  hideFormModal: () => void;
}

function SendPasswordResetLink(props: iSendPasswordResetLink) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [showCustomerError, setCustomerError] = useState<boolean>(false);
  const [customerList, setCustomerList] = useState<[]>(null);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      await GetAllCustomerList()
        .then((responseData: any) => {

          if (responseData && responseData.length > 0 && isMounted) {
            setCustomerList(responseData);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, [currentContext.selectedCIF, currentContext.language]);

  const formValidationSchema = yup.object({
    selectedCIF: yup
      .string()
      .nullable()
      .required("Select the customer"),
  });

  const options =
    customerList && customerList.length > 0
      ? customerList.map((c) => ({
        value: c["id"] + ";" + c["mobile"],
        label: c["shortName"] ? c["shortName"] : "",
      }))
      : [];

  return (
    <div>
      <Modal
        show={props.showFormModal}
        onHide={props.hideFormModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{"Send Reset Password to customer"}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideFormModal}
          >
            <img alt="" src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ selectedCIF: [] }}
            validationSchema={formValidationSchema}
            onSubmit={async (values) => {
              setLoading(true);

              const tokenItem =
              {
                "id": 0,
                "token": randomatic("Aa0", 16),
                "createdDate": moment().toISOString()
              };

              const isTokenGenerated = await AddPasswordToken(tokenItem);
              if (isTokenGenerated) {
                const mobile =
                  values.selectedCIF[0]["value"].split(";")[1];
                const text = `Dear ${values.selectedCIF[0]["label"]},
                Use this link to reset your password
                ${Constant.PortalUrl}/${currentContext.language}
                /ResetPassword?token=${tokenItem.token}`;

                const x = await SendSMS("+919405417912", text);

                if (x) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: local_Strings.NotificationsSavedMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                  props.hideFormModal();
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                }
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: local_Strings.GenericErrorMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
              }
              setLoading(false);
            }}
            enableReinitialize={false}
          >
            {({
              values,
              handleBlur,
              handleChange,
              setFieldValue,
              handleSubmit,
              errors,
              touched,
              isValid,
              validateForm,
            }) => (
              <div className="box modal-box p-0 scrollabel-modal-box">
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
                <div className="box-body">
                  <div className="form-group">
                    <MultiSelect
                      hasSelectAll={false}
                      options={options}
                      value={
                        values.selectedCIF &&
                          values.selectedCIF.length > 0 &&
                          values.selectedCIF[0].value !== "0"
                          ? values.selectedCIF
                          : null
                      }
                      onChange={(_item) => {

                        setFieldValue("selectedCIF", _item);
                        handleBlur("selectedCIF");
                        // if (_item.length === 0 || _item.length > 1) {
                        //   setCustomerError(false);
                        // }
                      }}
                      labelledBy={"Select"}
                    />
                    {showCustomerError &&
                      InvalidFieldError("Select only one customer")}
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-sm btn-primary mt-1"
                    type="submit"
                    style={{ float: "right", margin: 20 }}
                    onClick={(e) => {
                      validateForm(values);
                      if (isValid && values.selectedCIF.length === 1) {
                        setCustomerError(false);
                        handleSubmit();
                      } else {
                        Swal.fire({
                          position: "top-end",
                          icon: "error",
                          title: "Select only one customer",
                          showConfirmButton: false,
                          timer: Constant.AlertTimeout,
                        });
                        if (
                          !values.selectedCIF[0].value || values.selectedCIF.length > 1
                        ) {
                          setCustomerError(true);
                        } else {
                          setCustomerError(false);
                        }
                        handleBlur("selectedCIF");
                      }
                    }}
                  >
                    {local_Strings.SendButtonText}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SendPasswordResetLink;
