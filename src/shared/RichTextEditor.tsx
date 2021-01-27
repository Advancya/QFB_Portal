import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ar.js";
import RichTextUploadAdapter from "./RichTextUploadAdapter";

interface IRichTextEditor {
    value: string;
    onChange: (text: string) => void;
    language: string;
    readOnly?: boolean;
}

const RichTextEditor: React.FC<IRichTextEditor>
    = (props) => {
        const currentContext = useContext(AuthContext);
        local_Strings.setLanguage(currentContext.language);

        return (
            <React.Fragment>
                <label className="imageAttachmentHint text-left">
                    {local_Strings.RichTextImageUploadHint}
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    readOnly={props.readOnly}
                    data={props.value || ""}
                    onChange={(event: any, editor: any) => {
                        const richText = editor.getData();
                        props.onChange(richText);
                    }}
                    config={{
                        extraPlugins: [CustomUploadAdapterPlugin],
                        toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "|",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "blockQuote",
                            'imageUpload',
                            '|',
                            "undo",
                            "redo",
                        ],
                        allowedContent: true,
                        extraAllowedContent: "div(*)",
                        language: props.language,
                        content: props.language,
                    }}
                />
            </React.Fragment>
        );
    }

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new RichTextUploadAdapter(loader)
    }
}

export default RichTextEditor;