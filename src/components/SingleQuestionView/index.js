import { Button, Grid } from '@mui/material'
import ArgonButton from 'components/ArgonButton'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import MathChemTextEditor from 'components/MathChemTextEditor/MathChemTextEditor'

const SingleQuestionView = ({ data, onCheckboxChange, type }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const checkboxHandleChange = (event) => {
    const checked = event.target.checked;
    setCheckboxChecked(checked);
    onCheckboxChange(data?.question_no, checked);
  };


  return (
    <MathJaxContext>
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
          <MathChemTextEditor  ckEditorData={data?.question_answer?.question}  disableTool = {true} />  
          {/* <MathJax>
            {ReactHtmlParser(data?.question_answer?.question)}
          </MathJax> */}
          <Grid className='final-status-container'>
            <p>Final Status&nbsp;:&nbsp;&nbsp;&nbsp;<span>Pending</span></p>
          </Grid>
          <Grid className={`single-question-view-answer-container ${data?.answer_type === 'subjective' ? 'display-none' : 'flex'}`}>

            {/* <p className={(data?.question_answer?.checkboxes?.option1) ? 'answer-marked' : ''}><span>1.</span>&nbsp;&nbsp;&nbsp;<span>
              <MathJax style={{ color: 'red' }} >
                {ReactHtmlParser(data?.question_answer?.option1)}
              </MathJax>
            </span></p> */}

            {/* <Grid> */}
              <span>1.{data?.question_answer?.checkboxes?.option1 ? <i className="fa-solid success-icon fa-circle-check"></i> :<i className="fa-solid danger-icon fa-circle-xmark"></i>}</span>
              <MathChemTextEditor  ckEditorData={data?.question_answer?.option1}  disableTool = {true} />
              
              <span>2.{data?.question_answer?.checkboxes?.option2 ? <i className="fa-solid success-icon fa-circle-check"></i> :<i className="fa-solid danger-icon fa-circle-xmark"></i>}</span>
              <MathChemTextEditor  ckEditorData={data?.question_answer?.option2}  disableTool = {true} />
              
              <span>3.{data?.question_answer?.checkboxes?.option3 ? <i className="fa-solid success-icon fa-circle-check"></i> :<i className="fa-solid danger-icon fa-circle-xmark"></i>}</span>
              <MathChemTextEditor  ckEditorData={data?.question_answer?.option3}  disableTool = {true} />
              
              <span>4.{data?.question_answer?.checkboxes?.option4 ? <i className="fa-solid success-icon fa-circle-check"></i> :<i className="fa-solid danger-icon fa-circle-xmark"></i>}</span>
              <MathChemTextEditor  ckEditorData={data?.question_answer?.option4}  disableTool = {true} />
           
                {/* <MathJax className={(data?.question_answer?.checkboxes?.option1) ? 'answer-marked' : ''}>
                {ReactHtmlParser(data?.question_answer?.option1)}
              </MathJax> */}
              {/* <MathJax className={(data?.question_answer?.checkboxes?.option1) ? 'answer-marked' : ''}>
                {ReactHtmlParser(data?.question_answer?.option2)}
              </MathJax> */}
              {/* <MathJax className={(data?.question_answer?.checkboxes?.option1) ? 'answer-marked' : ''}>
                {ReactHtmlParser(data?.question_answer?.option3)}
              </MathJax> */}
              {/* <MathJax className={(data?.question_answer?.checkboxes?.option1) ? 'answer-marked' : ''}>
                {ReactHtmlParser(data?.question_answer?.option4)}
              </MathJax> */}
            {/* </Grid> */}




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
              <p>Question Type : <span>{data?.source}</span></p>
            </Grid>
            <Grid className='single-question-view-question-detail'>
              <p>Subject : <span>{data?.subject}</span></p>
            </Grid>
            <Grid className='single-question-view-question-detail'>
              <p>Answer Type : <span>{data?.answer_type}</span></p>
            </Grid>
            <Grid className='single-question-view-question-detail'>
              <p>Chapter : <span>{data?.chapter}</span></p>
            </Grid>
            <Grid className='single-question-view-question-detail'>
              <p>Origin : <span>{data?.origin}</span></p>
            </Grid>

            <Grid className='single-question-view-question-detail-double-height'>
              <p>Exam :</p>
              <Grid className='single-question-view-question-scroll-container'>
                {
                  data?.exam_year?.map((item, index) => (
                    <p key={index + 1}><span>{`${item?.exam} ${item?.exam ? '- ' : ''}`}</span><span>{item?.year.map((ele, index) => {
                      if (index !== item?.year.length - 1) {
                        return `${ele},`
                      }
                      return `${ele}`
                    })}</span></p>
                  ))
                }
              </Grid>
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
              <p>Difficulty Level&nbsp;:&nbsp;<span>{data?.difficulty_level}</span></p>
            </Grid>


          </Grid>

        </Grid>
      </Grid>
    </MathJaxContext>
  )
}

export default SingleQuestionView
