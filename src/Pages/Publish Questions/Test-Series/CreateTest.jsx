import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { Link, useNavigate } from 'react-router-dom'
import DatePickerCustom from 'components/date_picker/DatePickerCustom'



const initialValues = {
    test_name: "",
    total_time: "",
    start_date: "",
    end_date: "",
};



const CreateTest = ({ type }) => {
    const navigate = useNavigate();


    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            onSubmit: (values, action) => {
                handleSaveAllData(values)
            }
        });

    // handleSave for overall form data


    const [sectionInputsArray, setSectionInputArray] = useState([
        { subject: '', section_name: '', no_of_questions: '', questionAdded: [] }
    ])

    const handleAddMoreSection = () => {
        setSectionInputArray((previousSection) => {
            return [...previousSection, { subject: '', section_name: '', no_of_questions: '', questionAdded: [] }]
        })
    }

    const handleDeleteSection = (indexToDelete) => {
        setSectionInputArray(sectionInputsArray.filter((_, index) => index !== indexToDelete));
    }

    const handleChangeSectionInput = (index, input, key) => {
        const tempSectionInputs = [...sectionInputsArray];
        tempSectionInputs[index][`${key}`] = input;
        setSectionInputArray(tempSectionInputs);
    }

    const handleAddQuestionsClick = (index) => {
        navigate('/question-listing', { state: { sectionIndex: index } });
    }



    const handleSaveAllData = (values) => {

        console.log(values, 'verhubfeu43ur3fb4iubri')
    }

    console.log(sectionInputsArray, 'ceneijf3if3f3gif4r4')

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Create Test' : 'Edit Test'}</span></p>
                        </Grid>
                        <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                            <Grid className='add-edit-screen-input-row'>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Test Name</p>
                                    <InputBox
                                        placeholder={'Enter Test Name'}
                                        name={'test_name'}
                                        id={'create-test-test_name'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.test_name}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Total Time</p>
                                    <InputBox
                                        placeholder={'Enter Total Time'}
                                        name={'total_time'}
                                        id={'create-test-total_time'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.total_time}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Start Date</p>
                                    <DatePickerCustom
                                        placeholder={'Start Date'}
                                        value={values?.start_date}
                                        name={'start_date'}
                                        id={'create-test-start_date'}
                                        handleChange={setFieldValue}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>End Date</p>
                                    <DatePickerCustom
                                        placeholder={'End Date'}
                                        value={values?.end_date}
                                        name={'end_date'}
                                        id={'create-test-end_date'}
                                        handleChange={setFieldValue}
                                    />
                                </Grid>
                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>Add Sections</h3>


                            {
                                sectionInputsArray?.map((section, index) => {
                                    return (
                                        <React.Fragment key={`create-test-add-section-${index + 1}`}>
                                            <Grid className='add-edit-screen-input-row'>

                                                <Grid className='add-edit-screen-input-container'>
                                                    <p>Select Subject</p>
                                                    <DropownCustom
                                                        label={'Select Subject'}
                                                        value={section?.subject}
                                                        name={'subject'}
                                                        id={'create-test-subject'}
                                                        handleChange={(event) => handleChangeSectionInput(index, event.target.value, 'subject')}
                                                        dropdownKeysArray={['physics', 'chemistry', 'math']}
                                                        dropdownListArray={['Physics', 'Chemistry', 'Math']}
                                                    />
                                                </Grid>

                                                <Grid className='add-edit-screen-input-container'>
                                                    <p>Name of Section</p>
                                                    <InputBox
                                                        placeholder={'Enter Name of Section'}
                                                        type={'text'}
                                                        value={section?.section_name}
                                                        name={'section_name'}
                                                        id={'create-test-section_name'}
                                                        handleChange={(event) => handleChangeSectionInput(index, event.target.value, 'section_name')}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid className='add-edit-screen-input-row'>

                                                <Grid className='add-edit-screen-input-container'>
                                                    <p>Number of Questions</p>
                                                    <InputBox
                                                        placeholder={'Enter Number of Questions'}
                                                        type={'text'}
                                                        value={section?.no_of_questions}
                                                        name={'no_of_questions'}
                                                        id={'create-test-no_of_questions'}
                                                        handleChange={(event) => handleChangeSectionInput(index, event.target.value, 'no_of_questions')}
                                                    />
                                                </Grid>

                                                <Grid className='add-edit-screen-input-container'>
                                                    <p style={{ visibility: 'hidden' }}>Button</p>
                                                    <Grid>
                                                        <ArgonButton
                                                            component={Button}
                                                            variant="gradient"
                                                            size="medium"
                                                            color={'dark'}
                                                            disableHover={true}
                                                            onClick={() => handleAddQuestionsClick(index)}
                                                        >
                                                            {'Add Questions'}
                                                        </ArgonButton>
                                                    </Grid>
                                                </Grid>

                                                <Grid className='add-edit-screen-input-container'>
                                                    <p style={{ visibility: 'hidden' }}>Button</p>
                                                    <Grid display={'flex'} justifyContent={'flex-end'}>
                                                        <ArgonButton
                                                            component={Button}
                                                            variant="gradient"
                                                            size="medium"
                                                            color={'dark'}
                                                            disableHover={true}
                                                            onClick={() => {
                                                                if (index === sectionInputsArray.length - 1) {
                                                                    handleAddMoreSection()
                                                                }
                                                                else {
                                                                    handleDeleteSection(index)
                                                                }
                                                            }}
                                                        >
                                                            {(index === sectionInputsArray.length - 1) ? 'Add Another Section' : 'Remove Section'}
                                                        </ArgonButton>
                                                    </Grid>
                                                </Grid>

                                            </Grid >
                                        </React.Fragment>
                                    )
                                })
                            }


                            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Grid style={{ display: 'flex', gap: '20px' }}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="large"
                                        color={'error'}
                                        disableHover={true}
                                        onClick={() => navigate(-1)}
                                    >
                                        {'Cancel'}
                                    </ArgonButton>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="large"
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
            </Grid >
        </>
    )
}

export default CreateTest