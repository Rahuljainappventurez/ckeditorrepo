import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import routerConstants from 'constants/routerConstants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { tableViewTasksCreatorAllColumns } from 'constants/TableConstants'
import { tableViewTasksCreatorDummyData } from 'constants/TableConstants'
import CustomPopover from 'components/CustomPopover/CustomPopover'
import ArgonButton from 'components/ArgonButton'
import SearchCustom from 'components/search-custom/SearchCustom'
import { dummyDataForFullView } from 'constants/moduleConstants'
import SingleQuestionView from 'components/SingleQuestionView'
import { useQuery } from 'react-query'
import toaster from 'utility/toaster/toaster'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { formatDate } from 'utility/common'


const ViewTaskQuestions = () => {
    const { state: taskDetails } = useLocation();
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState('')

    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [tableViewType, setTableViewType] = useState('list');
    const allActionData = [
        {
            label: 'View',
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMoreAction = (event, rowSelectionObj) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCheckBoxChangeFullView = () => {
    }

    // ********************* for fetching the question list using task_id *******************

    const transformQuestionsTaskData = (data) => {
        return data?.map((item) => ({
            ...item,
            question_number: item?.ques_no ?? '',
            submission_date: formatDate(item?.created_at) ?? '',
            no_of_resubmissions: item?.resubmission_count ?? '',
            question_type: item?.question_type_name ?? '',
            answer_type: item?.answer_type_name ?? '',
            final_status: item?.final_status ?? '',
        }))
    }


    const fetchQuestionsTaskList = () => {
        return getRequest(`${apiurl?.QUESTIONS_TASK_LIST_URL}/${taskDetails?._id}`, {
            page: currentPage,
            size: rowsPerPage,
        })
    }

    const { isLoading, data: questionsTaskList, isError, error } = useQuery(
        ['questions-task-list', currentPage, rowsPerPage],
        fetchQuestionsTaskList,
        {
            select: (data) => {
                return data?.data?.result
            },
        }
    )

    // ********** for error message when we fetch the list ********** 
    useEffect(() => {
        if (isError) {
            toaster('error', error?.message)
        }
    }, [isError])

    // ************** for set the total records for pagination ************

    useEffect(() => {
        setTotalRecords(questionsTaskList?.totalCount ?? '')
    }, [questionsTaskList])


    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <p className='main-heading-with-back-button'><ArrowBackIos onClick={() => navigate(-1)} />
                            <span>
                                {`${taskDetails?.source ?? ''}${taskDetails?.client_chapter_id ? " / " + taskDetails?.client_chapter_id + " / " : ''}${taskDetails?.chapter ?? ''}`}
                            </span>
                        </p>

                        <Grid className='view-task-radio-full-list'>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={tableViewType}
                                onChange={(event) => setTableViewType(event.target.value)}
                            >
                                <FormControlLabel value="list" control={<Radio />} label="List View" />
                                <FormControlLabel value="full" control={<Radio />} label="Full View" />
                            </RadioGroup>
                        </Grid>

                        <Grid className='page-text-buttons-with-table'>
                            {(taskDetails?.role === 'Creator') &&
                                <ArgonButton
                                    component={Link}
                                    variant="gradient"
                                    secendary size="medium"
                                    color={'secondary'}
                                    disableHover={true}
                                    to={routerConstants?.addQuestionRoute}
                                >
                                    {'Add Question'}
                                </ArgonButton>
                            }

                            <SearchCustom setSearchKey={setSearchKey} />
                        </Grid>
                    </Grid>
                    {
                        (tableViewType === 'list') ?
                            <CustomAdvanceTable
                                tableMinHeight={"580px"}
                                tableMaxHeight={"580px"}
                                allColumns={tableViewTasksCreatorAllColumns}
                                tableData={transformQuestionsTaskData(questionsTaskList) ?? []}
                                isLoading={isLoading}
                                enableRowAction={false}
                                enableTopToolbar={false}
                                enableSorting={false}
                                enableColumnAction={false}
                                enableRowSelection={false}
                                enableSelectAll={false}
                                handleClickMoreAction={handleClickMoreAction}
                            /> :
                            <Grid className='view-task-full-list-container'>
                                {
                                    dummyDataForFullView?.map((dummyData, index) => (
                                        <SingleQuestionView data={dummyData} type={'full-view'} onCheckboxChange={handleCheckBoxChangeFullView} />
                                    ))
                                }
                            </Grid>
                    }
                    <Grid>
                        <PaginationCustom
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalRecords={totalRecords}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <CustomPopover
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                popoverId={'popover-custom-id-view-task-questions'}
                ActionData={allActionData}
            />
        </>
    )
}

export default ViewTaskQuestions