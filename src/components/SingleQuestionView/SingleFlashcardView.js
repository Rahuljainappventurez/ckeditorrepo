import { Button, Grid } from '@mui/material'
import ArgonButton from 'components/ArgonButton'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

const SingleFlashcardView = ({ data, onCheckboxChange, type }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const checkboxHandleChange = (event) => {
    const checked = event.target.checked;
    setCheckboxChecked(checked);
    onCheckboxChange(data?.question_no, checked);
  };


  const extractQuestion = () => {
    const questionData = data?.question_answer?.question;
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
          <p>Question Number&nbsp;:&nbsp;&nbsp;<span>{data?.question_no}</span></p>
        </Grid>
        <Grid className='single-question-view-content'>
          <p className='question-para'>{ReactHtmlParser(extractQuestion())}</p>
          <Grid className='final-status-container'>
            <p>Final Status&nbsp;:&nbsp;&nbsp;&nbsp;<span>Pending</span></p>
          </Grid>
          {extractQuestionImage() &&
            <Grid className='single-question-view-image-container'>
              <img src={`${extractQuestionImage()}`} alt='question-image' />
            </Grid>
          }

          <Grid className={`single-question-view-answer-container ${data?.question_answer?.answer ? '' : 'display-none'}`}>
            <p><span style={{fontWeight:'600'}}>Answer:</span>&nbsp;&nbsp;&nbsp;<span className={'answer-marked'}>{ReactHtmlParser(data?.question_answer?.answer)}</span></p>
          </Grid>

          <Grid style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <ArgonButton
              component={Button}
              variant="gradient"
              secendary size="large"
              color={'primary'}
              disableHover={true}
            >
              {'Hint'}
            </ArgonButton>
            <ArgonButton
              component={Button}
              variant="gradient"
              secendary size="large"
              color={'primary'}
              disableHover={true}
            >
              {'Sotution'}
            </ArgonButton>
          </Grid>

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

            <Grid className='single-question-view-question-detail-double-height'>
              <p>Topic ID - Name :</p>
              <Grid className='single-question-view-question-scroll-container'>
                {
                  data?.topics?.map((topic, index) => (
                    <p key={`topic-${index + 1}`}><span>{topic}</span></p>
                  ))
                }
              </Grid>
            </Grid>

            <Grid className='single-question-view-question-detail'>
              <p>Origin : <span>{data?.origin}</span></p>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

export default SingleFlashcardView
