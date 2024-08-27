import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Key, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { Link, useNavigate } from 'react-router-dom'
import routerConstants from 'constants/routerConstants'
import MathChemTextEditor from 'components/MathChemTextEditor/MathChemTextEditor'
import ViewRemarksDialog from 'components/AddQuestionScreenDialogs/ViewRemarksDialog'



const initialValues = {
    subject: "",
    source: "",
    chapter: "",
    topic: "",
};

const remarksArray = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Est doloribus iusto ex officiis vero ipsum magni enim quasi inventore.',
    'omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam! omnis accusamus soluta impedit, dolore illum quis delectus mollitia aspernatur numquam!.',
]



const AddEditNCERTCreatorEditor = ({ type }) => {
    const navigate = useNavigate();
    const [openViewRemarks, setOpenViewRemarks] = useState(false);
    const [topicData, setTopicData] = useState({
        topic_text: '',
    });

    const setCkEditorData = (key, data) => {
        setTopicData(prevState => ({
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

    // ************* add new functionality for subTopic dropdown  and subTopicText editor **************
    const [subTopicPairs, setSubTopicPairs] = useState([]);

    const handleAddNewPair = () => {
        setSubTopicPairs([...subTopicPairs, { sub_topic: '', sub_topic_text: '' }]);
    };

    const handleDeletePair = (indexToDelete) => {
        setSubTopicPairs(subTopicPairs.filter((_, index) => index !== indexToDelete));
    };

    const handleChangeSubTopic = (index, value) => {
        const updatedPairs = [...subTopicPairs];
        updatedPairs[index].sub_topic = value;
        setSubTopicPairs(updatedPairs);
    };

    const handleChangeSubTopicText = (index, data) => {
        const updatedPairs = [...subTopicPairs];
        updatedPairs[index].sub_topic_text = data;
        setSubTopicPairs(updatedPairs);
    };


    // handleSave for overall form data

    const handleSaveAllData = (values) => {
        const allData = {
            ...values,
            topic_text:topicData?.topic_text,
            subTopicData: subTopicPairs,
        }

        console.log(allData, 'verhubfeu43ur3fb4iubri')
        navigate(routerConstants?.previewNCERTTextbookRoute, { state: allData })
    }

    console.log(topicData, 'topicText')
    console.log(subTopicPairs, 'subTopicPairs')


    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add NCERT Textbook' : 'Edit NCERT Textbook'}</span></p>
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


                            </Grid>

                            <Grid display={'flex'} justifyContent={'space-between'} gap={'20px'}>
                                <Grid display={'flex'} gap={'20px'}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                    >
                                        {'Questions'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                    >
                                        {'NCERT'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="medium"
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
                                        size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                        onClick={() => setOpenViewRemarks(!openViewRemarks)}
                                    >
                                        {'View Remarks'}
                                    </ArgonButton>

                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="medium"
                                        color={'dark'}
                                        disableHover={true}
                                        type={'submit'}
                                    >
                                        {'Preview'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>Enter Text Below</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Topic</p>
                                    <DropownCustom
                                        label={'Select Topic'}
                                        value={values.topic}
                                        handleBlur={handleBlur}
                                        name={'topic'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['topic-1', 'topic-2', 'topic03']}
                                        dropdownListArray={['Topic 1', 'Topic 2', 'Topic 3']}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className='add-question-math-editor-main-container'>
                                <Grid className='add-question-math-editor-label-container'>
                                    <p>Enter Topic Text</p>
                                </Grid>
                                <Grid className='add-question-math-editor-wrapper'>
                                    <MathChemTextEditor
                                        ckEditorData={topicData.topic_text}
                                        setCkEditorData={setCkEditorData}
                                        editorKey="topic_text"
                                    />
                                </Grid>
                            </Grid>

                            {subTopicPairs?.map((pair, index) => (
                                <Grid key={`subTopicPair-${index + 1}`} className='add-edit-screen-input-row'>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Select Sub Topic</p>
                                        <DropownCustom
                                            label={'Select Sub Topic'}
                                            value={pair.sub_topic}
                                            name={'pair.sub_topic'}
                                            handleChange={(e) => handleChangeSubTopic(index, e.target.value)}
                                            dropdownKeysArray={['topic-1', 'topic-2', 'topic03']}
                                            dropdownListArray={['Topic 1', 'Topic 2', 'Topic 3']}
                                        />
                                    </Grid>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p style={{ visibility: 'hidden' }}>button</p>
                                        <Grid>
                                            <ArgonButton
                                                component={Button}
                                                variant="gradient"
                                                size="medium"
                                                color={'dark'}
                                                disableHover={true}
                                                onClick={() => handleDeletePair(index)}
                                            >
                                                {'Remove Sub Topic'}
                                            </ArgonButton>
                                        </Grid>
                                    </Grid>
                                    <Grid className='add-question-math-editor-main-container'>
                                        <Grid className='add-question-math-editor-label-container'>
                                            <p>Enter Sub Topic Text</p>
                                        </Grid>
                                        <Grid className='add-question-math-editor-wrapper'>
                                            <MathChemTextEditor
                                                ckEditorData={pair.sub_topic_text}
                                                setCkEditorData={(key, data) => handleChangeSubTopicText(index, data)}
                                                editorKey={`sub_topic_text_${index}`}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            ))
                            }


                            <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    size="large"
                                    color={'dark'}
                                    disableHover={true}
                                    onClick={() => handleAddNewPair()}
                                >
                                    {'Add Sub Topic'}
                                </ArgonButton>

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
            </Grid>

            {
                openViewRemarks && <ViewRemarksDialog open={openViewRemarks} setOpen={setOpenViewRemarks} remarksArray={remarksArray} />
            }
        </>
    )
}

export default AddEditNCERTCreatorEditor