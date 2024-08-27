import React, { useState, useRef } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build-mathtype-imageresize";
import './math-chem-text-editor.scss';

const MathChemTextEditor = ({ ckEditorData, setCkEditorData, editorKey, placeholder, disableTool=false }) => {
    const editorRef = useRef();

    return (
        <div className="math-chem-type-ckEditor-container"> 
            <CKEditor
                editor={ClassicEditor}
                data={ckEditorData}
                disabled={disableTool}
                config={{
                    // **************** if any error in math type then uncomment the licenseKey line  *****************
                    // licenseKey:
                    //     "QTRJYTlUWTNaNE9nSGNIb3hGK2dyR0VqVUsxeXNvUlBwcHIzQlltNXgycm5nNi9wUUlMcno0bm9tcHN0LU1qQXlOREF5TURnPQ",
                    fontSize: {
                        options: [10, 12, 14, "default", 18, 20, 22],
                        supportAllValues: true,
                    },
                    toolbar: [
                        'undo',
                        'redo',
                        '|',
                        'sourceEditing',
                        'findAndReplace',
                        'selectAll',
                        '|',
                        'heading',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'subscript',
                        'superscript',
                        '|',
                        'specialCharacters',
                        'pageBreak',
                        'link',
                        'ImageUpload',
                        'mediaEmbed',
                        'insertTable',
                        'highlight',
                        'blockQuote',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'outdent',
                        'indent',
                        '|',
                        'MathType',
                        'ChemType',
                        'balloonToolbar',
                    ],
                    placeholder: placeholder ?? '',
                    shouldNotGroupWhenFull: false,
                    image: {
                        resizeUnit: '%',
                        resizeOptions: [
                            {
                                name: 'resizeImage:original',
                                value: null,
                                label: 'Original'
                            },
                            {
                                name: 'resizeImage:10',
                                value: '10',
                                label: '10%'
                            },
                            {
                                name: 'resizeImage:25',
                                value: '25',
                                label: '25%'
                            },
                            {
                                name: 'resizeImage:50',
                                value: '50',
                                label: '50%'
                            },
                            {
                                name: 'resizeImage:75',
                                value: '75',
                                label: '75%'
                            }
                        ],
                        toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
                    },
                    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage'],
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],       
                    },
                    heading: {
                        options: [
                            {
                                model: 'paragraph',
                                title: 'Paragraph',
                                class: 'ck-heading_paragraph'
                            },
                            {
                                model: 'heading1',
                                view: 'h1',
                                title: 'Heading 1',
                                class: 'ck-heading_heading1'
                            },
                            {
                                model: 'heading2',
                                view: 'h2',
                                title: 'Heading 2',
                                class: 'ck-heading_heading2'
                            },
                            {
                                model: 'heading3',
                                view: 'h3',
                                title: 'Heading 3',
                                class: 'ck-heading_heading3'
                            },
                            {
                                model: 'heading4',
                                view: 'h4',
                                title: 'Heading 4',
                                class: 'ck-heading_heading4'
                            },
                            {
                                model: 'heading5',
                                view: 'h5',
                                title: 'Heading 5',
                                class: 'ck-heading_heading5'
                            },
                            {
                                model: 'heading6',
                                view: 'h6',
                                title: 'Heading 6',
                                class: 'ck-heading_heading6'
                            }
                        ]
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: /^.*$/,
                                styles: true,
                                attributes: true,
                                classes: true
                            }
                        ]
                    },
                    fontFamily: {
                        supportAllValues: true
                    },
                    fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22],
                        supportAllValues: true
                    },
                }}
                onInit={(editor) => {
                    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader);
                    };
                        const toolbarElement = editor.ui.view.toolbar.element;
                        const editableElement = editor.ui.view.editable.element;
                        editableElement.style.background = `${disableTool?'transparent':''}`
                        editableElement.style.minHeight = `${disableTool?'unset':''}`
                        toolbarElement.style.display = `${disableTool?'none':''}`;

                }}
                ref={editorRef}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditorData(editorKey, data);
                }}
            />
        </div>
    );
};

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const toBase64 = (file) =>
                        new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                        });
                    const base64_image = toBase64(file).then((data) => {
                        return resolve({
                            default: data,
                        });
                    });
                    this.loader.uploaded = true;
                    return base64_image;
                })
        );
    }
}

export default MathChemTextEditor;
