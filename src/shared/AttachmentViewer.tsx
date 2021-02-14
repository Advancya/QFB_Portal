import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import * as helper from "../Helpers/helper";
import pdfIcon from "../images/pdf.png";
import { saveAs } from "file-saver";

const mime = require("mime");

const ViewAttachment = (props: any) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  let fileSize: number = 0;
  if (props.fileContent && !!props.fileContent) {
    const _calSize = (3 * (props.fileContent.length / 4 / 1024 / 1024)).toFixed(
      4
    );
    fileSize = Math.round((Number(_calSize) + Number.EPSILON) * 100) / 100;
  }


  const previewAttachment = () => {
    const blob = helper.b64toBlob(
      props.fileContent,
      mime.getType(props.fileName)
    );

    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  };

  const downloadAttachment = () => {
    const blob = helper.b64toBlob(
      props.fileContent,
      mime.getType(props.fileName)
    );

    saveAs(blob, props.fileName);
  };

  return !!props.fileName ? (
    <div className="row no-gutters align-items-center">
      {/* <div className="col-2 col-lg-2 text-center">
        <img
          alt=""
          src={pdfIcon}
          style={{ maxWidth: "75%" }}
          className="img-fluid"
        />
      </div> */}
      {/* <div
        className="col-6 col-lg-9 cursor-pointer"
        onClick={() => {
          const blob = helper.b64toBlob(
            props.fileContent,
            mime.getType(props.fileName)
          );
          saveAs(blob, props.fileName);
        }}
      >
        <h5 className="text-break">
          {props.fileName}
          <br />
          {fileSize && fileSize > 0 && (
            <small>
              {local_Strings.sizeLabel}: {fileSize} MB
            </small>
          )}
        </h5>
      </div> */}
      <div className="col-md-6 pl-1">
        <h5 className="text-break">
          {props.fileName}
          <br />
          {fileSize && fileSize > 0 && (
            <small>
              {local_Strings.sizeLabel}: {fileSize} MB
            </small>
          )}
        </h5>
      </div>
      <div className="col-md-6">
        <span className="download-link d-inline-block ">
          {!props.showDelete &&
            <React.Fragment>
              <a
                className="d-inline-block "
                target="_blank"
                href="#"
                onClick={previewAttachment}
              >
                <i className="mx-1 fa fa-file color-white"></i>
              </a>
              <a
                className="d-inline-block "
                target="_self"
                href="#"
                onClick={downloadAttachment}
              >
                <i className="mx-1 fa fa-download color-white"></i>
              </a>
            </React.Fragment>
          }
          {props.showDelete &&
            <a
              className="d-inline-block "
              href="#"
              onClick={() => {
                Swal.fire({
                  title: local_Strings.deleteSure,
                  text: local_Strings.fileDeleteConfirmMessage,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#6b4f44",
                  confirmButtonText: local_Strings.OfferDeleteButton,
                  cancelButtonText: local_Strings.cancelBtn,
                }).then((result) => {
                  if (result.isConfirmed) {
                    props.deleteThisFile();
                  }
                });
              }}
            >
              <i className="fa fa-trash-o color-white"></i>
            </a>
          }
        </span>
      </div>
    </div>
  ) : null;
};

export default ViewAttachment;
