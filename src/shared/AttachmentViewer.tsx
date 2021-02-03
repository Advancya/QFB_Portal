import { useContext } from "react";
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

  return !!props.fileName ? (
    <div className="row no-gutters align-items-center view-attachment">
      <div className="col-2 col-lg-2 text-center">
        <img
          alt=""
          src={pdfIcon}
          style={{ maxWidth: "75%" }}
          className="img-fluid"
        />
      </div>
      <div
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
      </div>
      {props.showDelete && (
        <div className="col-2 col-lg-1 text-center">
          <a
            className="btnFileDelete"
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
            <i className="fa fa-trash-o"></i>
          </a>
        </div>
      )}
    </div>
  ) : null;
};

export default ViewAttachment;
