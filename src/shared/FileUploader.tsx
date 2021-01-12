import React, { createRef, useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

interface IFileUploaderProps {
  onUploaded: (fileName: string, fileContent: string) => void;
}

const FileUploader = (props: IFileUploaderProps) => {
  const fileInputRef = createRef<HTMLInputElement>();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onUploadFile = () => {
    const file = fileInputRef.current.files[0];
    const supportedExtensions = ["pdf"];
    if (file) {
      if (file.size <= 0) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: file.name + local_Strings.isEmptyText,
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        });
        fileInputRef.current.value = "";
      } else if (
        !supportedExtensions.includes(file.name.toLowerCase().split(".").pop())
      ) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: local_Strings.supportedFileTypeError.replace("{*}", file.name),
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        });
        fileInputRef.current.value = "";
      } else if (file.size / 1024 / 1024 > 10 || file.size / 1024 / 1024 > 10) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: local_Strings.moreThanLimit,
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        });
        fileInputRef.current.value = "";
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const content = new TextDecoder().decode(
            Buffer.from(e.target.result)
          );
          const fileContent = content.split(",").pop();

          props.onUploaded(file.name, fileContent);
        };
        reader.readAsDataURL(file);
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay
        active={isLoading}
        spinner={
          <PuffLoader
            size={Constant.SpnnerSize}
            color={Constant.SpinnerColor}
          />
        }
      />
      <label className="file form-control">
        <input
          type="file"
          multiple={false}
          id="file"
          aria-label="File browser example"
          lang={currentContext.language}
          className=""
          accept="application/pdf,.pdf"
          ref={fileInputRef}
          onChange={onUploadFile}
        />

        <span className="file-custom">
          {local_Strings.OfferFileBrowseLabel}
        </span>
      </label>
    </React.Fragment>
  );
};

export default FileUploader;
