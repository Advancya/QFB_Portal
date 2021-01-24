import {
    useContext,
    useEffect,
    useState
} from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
//import 'react-summernote/lang/summernote-ar-AR'; // you can import any other locale
import "bootstrap";
import "popper.js";
import * as jquery from 'jquery';
declare var  jQuery;

const RichTextEditor = (props: any) => {
    const currentContext = useContext(AuthContext);
    local_Strings.setLanguage(currentContext.language);

    const onChange = (content: string) => {
        console.log('onChange', content);
    }

    return (
        <ReactSummernote
            value=""
            options={{
                lang: 'ar-AR',
                height: 300,
                dialogsInBody: true,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture']]
                ]
            }}
            onChange={onChange}
        />
    );
}

export default RichTextEditor;