import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { Link, useNavigate } from 'react-router-dom'
import routerConstants from 'constants/routerConstants'
import MathChemTextEditor from 'components/MathChemTextEditor/MathChemTextEditor'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import MultiSelectDropdown from 'components/MultiSelectDropdown/MultiSelectDropdown'
import ViewRemarksDialog from 'components/AddQuestionScreenDialogs/ViewRemarksDialog'



const initialValues = {
    subject: "",
    source: "",
    chapter: "",
    question_no: "",
    difficulty_level: "",
    origin: "",
};

const dropdownTopicsArray = [
    'PHY123 - Test Topic 1',
    'PHY124 - Test Topic 2',
    'PHY125 - Test Topic 3',
    'PHY126 - Test Topic 4',
    'PHY127 - Test Topic 5',
];

const remarksArray = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Est doloribus iusto ex officiis vero ipsum magni enim quasi inventore.',
    'omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam! omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam!.',
]



const AddEditFlashcardCreatorEditor = ({ type }) => {
    const navigate = useNavigate();
    const [openViewRemarks, setOpenViewRemarks] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [state, setState] = useState({
        question: '',
        answer: '',
        hint: '',
        solution: '',
    });

    const setCkEditorData = (key, data) => {
        setState(prevState => ({
            ...prevState,
            [key]: data
        }));
    };

    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            onSubmit: (values, action) => {
                handleSaveAllData(values)
            }
        });

    const HintSolCheckboxHandleChange = (event) => {
        setCheckboxChecked(event.target.checked)
    };


    // handleSave for overall form data

    const handleSaveAllData = (values) => {
        const allData = {
            ...values,
            topics: selectedTopics,
            question_answer: state,
            editType: type === 'edit' ? true : false,
            addType: type === 'add' ? true : false,
        }

        console.log(allData, 'verhubfeu43ur3fb4iubri')
        navigate(routerConstants?.previewFlashcardRoute, { state: allData })
    }




    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Flashcard' : 'Edit Flashcard'}</span></p>
                        </Grid>
                        <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                            <Grid className='add-edit-screen-input-row'>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Source Name</p>
                                    <InputBox
                                        placeholder={'Enter Source Name'}
                                        name={'source'}
                                        id={'add-question-source'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.source}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Subject Name</p>
                                    <InputBox
                                        placeholder={'Enter Subject Name'}
                                        name={'subject'}
                                        id={'add-question-subject'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.subject}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Chapter Name</p>
                                    <InputBox
                                        placeholder={'Enter Chapter Name'}
                                        name={'chapter'}
                                        id={'add-question-chapter'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.chapter}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Question Number</p>
                                    <DropownCustom
                                        label={'Select Number'}
                                        value={values.question_no}
                                        handleBlur={handleBlur}
                                        name={'question_no'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['122', '124', '145', '156', '345']}
                                        dropdownListArray={['122', '124', '145', '156', '345']}
                                    />
                                </Grid>

                            </Grid>

                            <Grid display={'flex'} justifyContent={'space-between'} gap={'20px'}>
                                <Grid display={'flex'} gap={'20px'}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                    >
                                        {'Questions'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                    >
                                        {'NCERT'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                    >
                                        {'Solution'}
                                    </ArgonButton>
                                </Grid>

                                <Grid display={'flex'} gap={'20px'}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                        onClick={() => setOpenViewRemarks(!openViewRemarks)}
                                    >
                                        {'View Remarks'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        secendary size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                        type={'submit'}
                                    >
                                        {'Preview'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>

                            <Grid className='add-question-math-editor-main-container'>
                                <Grid className='add-question-math-editor-label-container'>
                                    <p>Enter Question</p>
                                </Grid>
                                <Grid className='add-question-math-editor-wrapper'>
                                    <MathChemTextEditor
                                        ckEditorData={state.question}
                                        setCkEditorData={setCkEditorData}
                                        editorKey="question"
                                    />
                                </Grid>
                            </Grid>


                            <Grid className='add-question-math-editor-main-container'>
                                <Grid className='add-question-math-editor-label-container'>
                                    <p>Enter Answer</p>
                                </Grid>
                                <Grid className='add-question-math-editor-wrapper'>
                                    <MathChemTextEditor
                                        ckEditorData={state.answer}
                                        setCkEditorData={setCkEditorData}
                                        editorKey="answer"
                                    />
                                </Grid>
                            </Grid>


                            <Grid display={'flex'} pl={1}>
                                <CheckboxCustom
                                    handleChange={HintSolCheckboxHandleChange}
                                    checked={checkboxChecked}
                                    label={'Show Hint/Solution'}
                                />
                            </Grid>

                            {(checkboxChecked) &&
                                <>
                                    <Grid className='add-question-math-editor-main-container'>
                                        <p>Hint</p>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.hint}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="hint"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid className='add-question-math-editor-main-container'>
                                        <p>Solution</p>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.solution}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="solution"
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            }



                            <Grid className='add-edit-screen-input-row'>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Origin</p>
                                    <DropownCustom
                                        label={'Select Origin'}
                                        value={values.origin}
                                        handleBlur={handleBlur}
                                        name={'origin'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['ORG-1', 'ORG-2', 'ORG-3', 'ORG-4']}
                                        dropdownListArray={['ORG-1', 'ORG-2', 'ORG-3', 'ORG-4']}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Topics</p>
                                    <MultiSelectDropdown
                                        dropdownArray={dropdownTopicsArray}
                                        selectedItems={selectedTopics}
                                        setSelectedItems={setSelectedTopics}
                                    />
                                </Grid>

                            </Grid>


                            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                        disableHover={true}
                                        type={'submit'}
                                    >
                                        {type === 'add' ? 'Save' : 'Update'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>

            {
                openViewRemarks && <ViewRemarksDialog open={openViewRemarks} setOpen={setOpenViewRemarks} remarksArray={remarksArray} />
            }
        </>
    )
}

export default AddEditFlashcardCreatorEditor