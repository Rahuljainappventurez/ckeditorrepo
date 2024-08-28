import React, { useState, useRef, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build-mathtype-imageresize";
import './math-chem-text-editor.scss';

const MathChemTextEditor = ({ ckEditorData, setCkEditorData, editorKey, placeholder, disableTool=false }) => {
    const editorRef = useRef();

    const [editorInstance, setEditorInstance] = useState(null);
    const [changeEle, setChangeEle] = useState(false)
    const [alignTable, setAlignTable] = useState({left:false,right:true,center:true})

    // This effect runs when editorInstance is set
    useEffect(() => {
        if (editorInstance) {
            const editableElement = editorInstance.ui.view.editable.element;
            console.log(editableElement, "jgjkkdjf");
            const figures = editableElement.querySelectorAll('figure');
            console.log(figures,"jgjkkdjf")
            console.log(alignTable.left)
            if(alignTable?.left===true){
                editableElement.classList.add('my-custom-class');
                figures.forEach(figure => {
                    // Add or modify the style attribute
                    figure.style.border = "2px solid red"; // Example: adding a red border
                    figure.style.padding = "10px"; // Example: adding padding
                    figure.style.float = "left";
                    // You can add more styles as needed
                });

            }
                if(alignTable?.center===true){
                    editableElement.classList.add('my-custom-class');
                    figures.forEach(figure => {
                        // Add or modify the style attribute
                        figure.style.border = "2px solid red"; // Example: adding a red border
                        figure.style.padding = "10px"; // Example: adding padding
                        figure.style.float = "none";
                        // You can add more styles as needed
                    });

                }
                    if(alignTable?.right===true){
                        editableElement.classList.add('my-custom-class');
                        figures.forEach(figure => {
                            // Add or modify the style attribute
                            figure.style.border = "2px solid red"; // Example: adding a red border
                            figure.style.padding = "10px"; // Example: adding padding
                            figure.style.float = "right";
                            // You can add more styles as needed
                        });
            }
            // You can now safely work with the editableElement
        }
    }, [editorRef, changeEle, alignTable]);

    console.log(alignTable, alignTable.left, "deefef")

   const setAlignLeft = () =>{
    setAlignTable((prev) => ({...prev, left:true,right:false,center:false }))
   }
   const setAlignRight = () =>{
    setAlignTable((prev) => ({...prev, left:false,right:true,center:false }))
   }
   const setAlignCenter = () =>{
    setAlignTable((prev) => ({...prev, left:false,right:false,center:true }))
   }


    
    return (
        
        // <button onClick={() => setAlignTable(true)}>align left</button>
        <>
         <button type="button" onClick={setAlignLeft}>align left</button>
         <button type="button" onClick={setAlignCenter}>align center</button>
         <button type="button" onClick={setAlignRight}>align right</button>
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
        //                 'alignment:left',    // Add alignment options
        // 'alignment:center',
        // 'alignment:right',
        // 'alignment:justify',
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
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties',  'alignment'],       
                    },
                    // alignment: {
                    //     options: [ 'left', 'center', 'right', 'justify' ] // Ensure options are available
                    // },
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
                    // ClassicEditor.builtinPlugins = [
                    //     ...ClassicEditor.builtinPlugins,
                    //     'Alignment'
                    // ];
                    // console.log(
                    //     "toolbar: ",
                    //     Array.from(editor.ui.componentFactory.names())
                    //   );
                    //   console.log(   
                    //     "plugins: ",
                    //     ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName)
                    //   );

                    setEditorInstance(editor);

                        const toolbarElement = editor.ui.view.toolbar.element;
                        const editableElement = editor.ui.view.editable.element;
                        editableElement.style.background = `${disableTool?'transparent':''}`
                        editableElement.style.minHeight = `${disableTool?'unset':''}`
                        toolbarElement.style.display = `${disableTool?'none':''}`;

                }}
                ref={editorRef}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    const editableElement = editor.ui.view.editable.element;
                    // editableElement.classList.add('my-custom-class');
                    setChangeEle((prev) => !prev)
                    // const figures = editableElement.querySelectorAll('figure');
                    // figures.forEach(figure => {
                    //     figure.classList.add('my-figure-class');
                    // });

                    // setEditorInstance(data);

                    // const handleDoubleClick = (event) => {
                    //     const target = event.target;
        
                    //     // Check if the clicked element is a <figure>
                    //     if (target.tagName.toLowerCase() === 'figure') {
                    //         target.classList.toggle('my-figure-class');
                    //     }
                    // };
        
                    // // Add event listener to the editable area
                    // editableElement.addEventListener('dblclick', handleDoubleClick);



                    // console.log(editableElement,figures, "jdkllrh")
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
