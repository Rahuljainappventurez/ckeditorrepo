import { Button, Grid } from '@mui/material'
import ArgonButton from 'components/ArgonButton'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

const SingleNCERTTextbookView = ({ data, onCheckboxChange, type }) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const checkboxHandleChange = (event) => {
        const checked = event.target.checked;
        setCheckboxChecked(checked);
        onCheckboxChange(data?.question_no, checked);
    };


    const extractQuestion = () => {
        const questionData = data?.topic_text;
        const questionSpitData = questionData?.split(`<figure class="image"><img src="`);
        return questionSpitData ? questionSpitData[0] : null;
    }

    const extractQuestionImage = () => {
        const questionData = data?.question_answer?.question;
        const questionSpitData = questionData?.split(`<figure class="image"><img src="`);
        const imageExtract = questionSpitData && questionSpitData[1]?.split(`">`);
        return imageExtract ? imageExtract[0] : null;
    }

    console.log(data, 'vendn3iednieni3')

    return (
        <>
            <Grid className='single-question-view-main-container'>
                <Grid className='question-number'>
                    {(type === 'full-view') && <CheckboxCustom
                        handleChange={checkboxHandleChange}
                        checked={checkboxChecked}
                        label={''}
                    />}
                    <p>Topic Name&nbsp;:&nbsp;&nbsp;<span>{data?.topic}</span></p>
                </Grid>
                <Grid className='single-question-view-content'>
                    <p className='question-para'>{ReactHtmlParser(extractQuestion())}</p>
                    {
                        <Grid className='single-question-view-image-container'>
                            <img src={`${extractQuestionImage()}`} alt='topic-image' />
                        </Grid>
                    }

                    <Grid className='single-question-view-question-details-row'>
                        <Grid className='single-question-view-question-detail'>
                            <p>Source Name : <span>{data?.source}</span></p>
                        </Grid>
                        <Grid className='single-question-view-question-detail'>
                            <p>Subject : <span>{data?.subject}</span></p>
                        </Grid>
                        <Grid className='single-question-view-question-detail'>
                            <p>Chapter : <span>{data?.chapter}</span></p>
                        </Grid>
                        <Grid className='single-question-view-question-detail'>
                            <p>Final Status : <span>{data?.final_status}</span></p>
                        </Grid>


                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}

export default SingleNCERTTextbookView
