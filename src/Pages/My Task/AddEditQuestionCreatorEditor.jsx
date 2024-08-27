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
import MultiSelectDropdownAddNewCompatible from 'components/MultiSelectDropdown/MultiSelectDropdownAddNewCompatible'
import ViewRemarksDialog from 'components/AddQuestionScreenDialogs/ViewRemarksDialog'


const initialValues = {
    subject: "",
    source: "",
    chapter: "",
    question_no: "",
    question_type: "",
    answer_type: "",
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
const dropdownYearArray = [
    '1997',
    '2001',
    '2011',
    '2022',
];

const remarksArray = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Est doloribus iusto ex officiis vero ipsum magni enim quasi inventore.',
    'omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam! omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam!.',
]



const AddEditQuestionCreatorEditor = ({ type }) => {
    const navigate = useNavigate();
    const [openViewRemarks, setOpenViewRemarks] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [state, setState] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        hint: '',
        solution: '',
        checkboxes: {
            option1: false,
            option2: false,
            option3: false,
            option4: false,
        },
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

    // ********* HOF =====> (high order function for handle checkbox for options) ************
    const checkboxHandleChange = (key) => (event) => {
        const { answer_type } = values;

        if (answer_type === 'single') {
            setState(prevState => ({
                ...prevState,
                checkboxes: {
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false,
                    [key]: event.target.checked
                }
            }));
        } else if (answer_type === 'multi') {
            setState(prevState => ({
                ...prevState,
                checkboxes: {
                    ...prevState.checkboxes,
                    [key]: event.target.checked
                }
            }));
        }
    };

    const handleAnswerTypeChange = (event) => {
        handleChange(event);
        const newValue = event.target.value;
        if (newValue === 'single' || newValue === 'multi') {
            setState(prevState => ({
                ...prevState,
                checkboxes: {
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false,
                }
            }));
        }
    };


    // ************* add new functionality for exam and year dropdown **************
    const [dropdownPairs, setDropdownPairs] = useState([
        { exam: '', year: [] } // Initial pair
    ]);

    const handleAddNewPair = () => {
        setDropdownPairs([...dropdownPairs, { exam: '', year: [] }]);
    };
    const handleDeletePair = (indexToDelete) => {
        setDropdownPairs(dropdownPairs.filter((_, index) => index !== indexToDelete));
    };

    const handleChangeExam = (index, value) => {
        const updatedPairs = [...dropdownPairs];
        updatedPairs[index].exam = value;
        setDropdownPairs(updatedPairs);
    };

    const handleChangeYear = (index, selectedItems) => {
        const updatedPairs = [...dropdownPairs];
        updatedPairs[index].year.push(selectedItems);
        setDropdownPairs(updatedPairs);
    };
    const handleDeleteYear = (index, selectedItems) => {
        const updatedPairs = [...dropdownPairs];
        updatedPairs[index].year = updatedPairs[index].year.filter(item => item !== selectedItems);
        setDropdownPairs(updatedPairs);
    };

    // handleSave for overall form data

    const handleSaveAllData = (values) => {
        const allData = {
            ...values,
            topics: selectedTopics,
            question_answer: state,
            exam_year: dropdownPairs,
            editType: type === 'edit' ? true : false,
            addType: type === 'add' ? true : false,
        }

        console.log(allData, 'verhubfeu43ur3fb4iubri')
        navigate(routerConstants?.previewQuestionRoute, { state: allData })
    }

    console.log(dropdownPairs, 'vreijbgriutigbrgv')


    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Question' : 'Edit Question'}</span></p>
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

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Question Type</p>
                                    <DropownCustom
                                        label={'Select Question Type'}
                                        value={values.question_type}
                                        handleBlur={handleBlur}
                                        name={'question_type'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['QT-1', 'QT-2', 'QT-3', 'QT-4', 'QT-5']}
                                        dropdownListArray={['QT-1', 'QT-2', 'QT-3', 'QT-4', 'QT-5']}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Answer Type</p>
                                    <DropownCustom
                                        label={'Select Answer Type'}
                                        value={values.answer_type}
                                        handleBlur={handleBlur}
                                        name={'answer_type'}
                                        handleChange={(event) => {
                                            handleAnswerTypeChange(event);
                                            setFieldValue('answer_type', event.target.value);
                                        }}
                                        dropdownKeysArray={['single', 'multi', 'subjective']}
                                        dropdownListArray={['Single Correct', 'Multi Correct', 'Subjective']}
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
                                        placeholder={'Type Here'}
                                    />
                                </Grid>
                            </Grid>

                            {(values?.answer_type === 'single' || values?.answer_type === 'multi') &&
                                <>
                                    <Grid className='add-question-math-editor-main-container'>
                                        <Grid className='add-question-math-editor-label-container'>
                                            <p>Enter Option 1</p>
                                            <CheckboxCustom
                                                handleChange={checkboxHandleChange('option1')}
                                                checked={state.checkboxes.option1}
                                                label={'Mark as Answer'}
                                            />
                                        </Grid>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.option1}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="option1"
                                                placeholder={'Type Here'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid className='add-question-math-editor-main-container'>
                                        <Grid className='add-question-math-editor-label-container'>
                                            <p>Enter Option 2</p>
                                            <CheckboxCustom
                                                handleChange={checkboxHandleChange('option2')}
                                                checked={state.checkboxes.option2}
                                                label={'Mark as Answer'}
                                            />
                                        </Grid>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.option2}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="option2"
                                                placeholder={'Type Here'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid className='add-question-math-editor-main-container'>
                                        <Grid className='add-question-math-editor-label-container'>
                                            <p>Enter Option 3</p>
                                            <CheckboxCustom
                                                handleChange={checkboxHandleChange('option3')}
                                                checked={state.checkboxes.option3}
                                                label={'Mark as Answer'}
                                            />
                                        </Grid>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.option3}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="option3"
                                                placeholder={'Type Here'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid className='add-question-math-editor-main-container'>
                                        <Grid className='add-question-math-editor-label-container'>
                                            <p>Enter Option 4</p>
                                            <CheckboxCustom
                                                handleChange={checkboxHandleChange('option4')}
                                                checked={state.checkboxes.option4}
                                                label={'Mark as Answer'}
                                            />
                                        </Grid>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={state.option4}
                                                setCkEditorData={setCkEditorData}
                                                editorKey="option4"
                                                placeholder={'Type Here'}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            }

                            {(values?.answer_type) &&
                                <>
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
                                                        placeholder={'Type Here'}
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
                                                        placeholder={'Type Here'}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </>
                                    }
                                </>
                            }



                            <Grid className='add-edit-screen-input-row'>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Difficulty Level</p>
                                    <DropownCustom
                                        label={'Select level'}
                                        value={values.difficulty_level}
                                        handleBlur={handleBlur}
                                        name={'difficulty_level'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['easy', 'medium', 'hard']}
                                        dropdownListArray={['Easy', 'Medium', 'Hard']}
                                    />
                                </Grid>

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

                                {dropdownPairs?.map((pair, index) => (
                                    <>
                                        <Grid key={`exam-year-pair-dropdowns-${index + 1}`} className='add-edit-screen-input-container'>
                                            <p>Select Exam</p>
                                            <DropownCustom
                                                label={'Select Exam'}
                                                value={pair.exam}
                                                name={`exam_${index}`}
                                                handleChange={(event) => handleChangeExam(index, event.target.value)}
                                                dropdownListArray={['Exam 1', 'Exam 2', 'Exam 3']}
                                            />
                                        </Grid>

                                        <Grid key={index} className='add-edit-screen-input-container'>
                                            <p>Select Year</p>
                                            <MultiSelectDropdownAddNewCompatible
                                                dropdownArray={dropdownYearArray}
                                                selectedItems={pair?.year}
                                                setSelectedItems={(selectedItems) => handleChangeYear(index, selectedItems)}
                                                handleDeleteItem={(selectedItems) => handleDeleteYear(index, selectedItems)}
                                            />
                                        </Grid>

                                        <Grid className='add-edit-screen-input-container'>
                                            <p style={{ visibility: 'hidden' }}>button</p>
                                            <Grid width={'130px'}>
                                                <ArgonButton
                                                    component={Button}
                                                    variant="gradient"
                                                    secendary size="medium"
                                                    color={'dark'}
                                                    disableHover={true}
                                                    onClick={() => {
                                                        if (index === dropdownPairs.length - 1) {
                                                            handleAddNewPair();
                                                        }
                                                        else {
                                                            handleDeletePair(index);
                                                        }
                                                    }}
                                                >
                                                    {(index === dropdownPairs.length - 1) ? 'Add New' : 'Remove'}
                                                </ArgonButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                ))}

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

export default AddEditQuestionCreatorEditor