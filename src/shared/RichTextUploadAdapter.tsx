import Constant from "../constants/defaultData";
import jwtDecode, { JwtPayload } from "jwt-decode";
import moment from "moment";
import { authenticate } from "../services/authenticationService";
import oidc from "../services/oidc-config.json";

class RichTextUploadAdapter {
    private loader: any;
    private url: any;
    private xhr: any;

    constructor(props: any) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
        // URL where to send files.
        this.url = `${Constant.ApiBaseUrl}/api/Helper/UploadImageToAzureStorage`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");

        const token = JSON.parse(localStorage.getItem(oidc.storage_key)) || "";
        xhr.setRequestHeader('Authorization', `Bearer ${token["access_token"]}`);
        
        // if (token) {
        //     if (moment(jwtDecode<JwtPayload>(token).exp * 1000)
        //         .isBefore(moment().toDate())) {

        //         // authenticate("101102", "Mm@123123").then(
        //         //     () =>
        //         //         window.location.reload()
        //         // );

        //         ////session expired and required login
        //         localStorage.removeItem(Constant.AccessTokenStorageKey);
        //         localStorage.removeItem(Constant.LoginDetailsStorageKey);
        //         window.location.href = `/${window.location.pathname.split("/")[1]}`;

        //     } else {
        //         xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        //     }
        // }
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {

        this.loader.file.then((result: File) => {
            if (result.size / 1024 / 1024 > 5) {
                this.xhr.abort();
            } else {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const content = new TextDecoder().decode(
                        Buffer.from(e.target.result)
                    );
                    const fileContent = content.split(",").pop();

                    const payLoad = {
                        'fileName': result.name,
                        'fileContent': fileContent
                    };

                    this.xhr.send(JSON.stringify(payLoad));
                };

                reader.readAsDataURL(result);
            }
        });
    }
}

export default RichTextUploadAdapter;