import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import TextareaCustom from 'components/TextareaCustom/TextareaCustom'
import SingleQuestionView from 'components/SingleQuestionView'
import Swal from 'sweetalert2'
import routerConstants from 'constants/routerConstants'
import SingleNCERTTextbookView from 'components/SingleQuestionView/SingleNCERTTextbookView'
import SingleFlashcardView from 'components/SingleQuestionView/SingleFlashcardView'



const initialValues = {
    mark_status: "",
    remarks: "",
};
const dropdownListArray = ['PCM', 'PCB', "PCMB"]
const dropdownKeysArray = ['PCM', 'PCB', "PCMB"]

const PreviewScreen = ({ type, previewType }) => {
    const navigate = useNavigate();
    const [openRedirectBox, setOpenRedirectBox] = useState(false);
    const { state: questionData } = useLocation();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormik({
            initialValues,
        });

    const handleSavePreviewForm = () => {
        Swal.fire({
            title: `Question saved successfully.`,
            // text: "You won't be able to revert this!",
            icon: "success",
            // showCancelButton: true,
            confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Add Another Question"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(routerConstants?.addQuestionRoute)
            }
        });
    }

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} />
                                <span>{
                                    (previewType === 'question') ? 'Preview Question'
                                        : (previewType === 'NCERT') ? 'Preview NCERT'
                                            : 'Preview Flashcard'
                                }
                                </span>
                            </p>
                        </Grid>
                        <form className='add-edit-screen-form-container mt-20'>

                            {
                                (previewType === 'question') ?
                                    <SingleQuestionView data={questionData} />
                                    :
                                    (previewType === 'NCERT') ?
                                        <SingleNCERTTextbookView data={questionData} />
                                        :
                                        <SingleFlashcardView data={questionData} />
                            }


                            {!(questionData?.addType) &&
                                <Grid className='add-edit-screen-input-row'>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Mark Status</p>
                                        <DropownCustom
                                            label={'Select Status'}
                                            value={values.mark_status}
                                            handleBlur={handleBlur}
                                            name={'mark_status'}
                                            handleChange={handleChange}
                                            dropdownKeysArray={dropdownKeysArray}
                                            dropdownListArray={dropdownListArray}
                                        />
                                    </Grid>

                                    <Grid className='add-edit-screen-input-container' style={{ width: '100%' }}>
                                        <p>Remarks</p>
                                        <TextareaCustom
                                            placeholder={'Enter Remarks'}
                                            name={'remarks'}
                                            id={'preview-question-remarks'}
                                            value={values?.remarks}
                                            disabled={true}
                                            minHeight={100}
                                        />
                                    </Grid>

                                </Grid>
                            }

                            <Grid style={{ display: `${type === 'view' ? 'none' : 'flex'}`, justifyContent: 'flex-end' }}>
                                <Grid style={{ display: 'flex', gap: '20px' }}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="large"
                                        color={'error'}
                                        disableHover={true}
                                        onClick={() => navigate(-1)}
                                    >
                                        {'Cancel'}
                                    </ArgonButton>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="large"
                                        color={'secondary'}
                                        // type={'submit'}
                                        disableHover={true}
                                        onClick={handleSavePreviewForm}
                                    >
                                        {'Save'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default PreviewScreen