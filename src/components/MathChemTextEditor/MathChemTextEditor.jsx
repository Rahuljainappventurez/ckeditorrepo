import React, { useState, useRef, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build-mathtype-imageresize";
import './math-chem-text-editor.scss';

const MathChemTextEditor = ({ ckEditorData, setCkEditorData, editorKey, placeholder, disableEditor = false }) => {
    const editorRef = useRef();

    const handleAlignment = (alignment, editor) => {
        if (editor) {
            console.log(editor.getData(),'vfbvjbubu44ubu4fuf')
            const editableElement = editor.ui.view.editable.element;
            const tableElements = editableElement.querySelectorAll('.table.ck-widget');
            if (tableElements.length > 0) {
                const lastTable = tableElements[tableElements.length - 1];
                if (alignment === 'left') {
                    lastTable.classList.add('ck-editor-left-align');
                }
                else if (alignment === 'center') {
                    lastTable.style.float = 'none';
                }
                else if (alignment === 'right') {
                    lastTable.style.float = 'right';
                }
            }
        }
    };

    return (
        <>
            <div className="math-chem-type-ckEditor-container">
                <CKEditor
                    editor={ClassicEditor}
                    data={ckEditorData}
                    disabled={disableEditor}
                    config={{
                        // *************** if any error in math type then uncomment the licenseKey line  ****************
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
                            'selectAll',
                            '|',
                            'heading',
                            '|',
                            'fontSize',
                            '|',
                            'bold',
                            'italic',
                            '|',
                            'link',
                            'ImageUpload',
                            'mediaEmbed',
                            'insertTable',
                            'highlight',
                            'blockQuote',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'outdent',
                            'indent',
                            '|',
                            'MathType',
                            'ChemType',
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
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
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

                        // Create and add the custom "Table align" button to the toolbar
                        const leftAlignButton = document.createElement('button');
                        const iconLeft = `<svg class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zm0-3H18v1.5h-4.5zm0-3H18v1.5h-4.5zM2 15h16v1.5H2z"></path><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"></path></svg>`
                        leftAlignButton.innerHTML = iconLeft;
                        leftAlignButton.setAttribute('type', 'button');
                        leftAlignButton.classList.add('table-align-button-ck_editor');
                        leftAlignButton.addEventListener('click', () => {
                            handleAlignment('left', editor);
                        });
                        toolbarElement.appendChild(leftAlignButton);


                        const centerAlignButton = document.createElement('button');
                        const iconCenter = `<svg class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"></path><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"></path></svg>`
                        centerAlignButton.innerHTML = iconCenter;
                        centerAlignButton.setAttribute('type', 'button');
                        centerAlignButton.classList.add('table-align-button-ck_editor');
                        centerAlignButton.addEventListener('click', () => {
                            handleAlignment('center', editor);
                        });
                        toolbarElement.appendChild(centerAlignButton);


                        const rigthAlignButton = document.createElement('button');
                        const iconRight = `<svg class="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2zm0-9h5v1.5H2zm0 3h5v1.5H2zm0 3h5v1.5H2z"></path><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"></path></svg>`
                        rigthAlignButton.innerHTML = iconRight;
                        rigthAlignButton.setAttribute('type', 'button');
                        rigthAlignButton.classList.add('table-align-button-ck_editor');
                        rigthAlignButton.addEventListener('click', () => {
                            handleAlignment('right', editor);
                        });
                        toolbarElement.appendChild(rigthAlignButton);

                        const editableElement = editor.ui.view.editable.element;
                        editableElement.style.background = `${disableEditor ? 'transparent' : ''}`
                        editableElement.style.minHeight = `${disableEditor ? 'unset' : ''}`
                        toolbarElement.style.display = `${disableEditor ? 'none' : ''}`

                    }}
                    ref={editorRef}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkEditorData(editorKey, data);
                    }}
                />
            </div>
        </>
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
