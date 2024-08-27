import { Grid, Icon } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Visibility, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import { tableTeamViewTaskAllColumns } from 'constants/TableConstants'
import { tableTeamViewTaskDummyData } from 'constants/TableConstants'
import { tableTeamTaskListDummyData } from 'constants/TableConstants'
import { tableTeamTaskListAllColumns } from 'constants/TableConstants'


const ViewTaskList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(100);
    const { state: taskDetails } = useLocation();


    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />
        },
    ]

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>View Task</span></p>
                        </Grid>
                        <form className='add-edit-screen-form-container mt-20'>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Source</p>
                                    <InputBox
                                        placeholder={'Source'}
                                        name={'source'}
                                        id={'view-task-source'}
                                        type={'text'}
                                        value={taskDetails?.source}
                                        disable={true}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Subject</p>
                                    <InputBox
                                        placeholder={'Subject'}
                                        name={'subject'}
                                        id={'view-task-subject'}
                                        type={'text'}
                                        value={taskDetails?.subject}
                                        disable={true}
                                    />
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Chapter</p>
                                    <InputBox
                                        placeholder={'Chapter'}
                                        name={'chapter'}
                                        id={'view-task-chapter'}
                                        type={'text'}
                                        value={taskDetails?.chapter}
                                        disable={true}
                                    />
                                </Grid>

                            </Grid>
                        </form>

                        <Grid className='table-heading-text-top-container'>
                            <span>List of Questions</span>
                            <Grid className='page-text-buttons-with-table'>
                                <ArgonInput
                                    placeholder="Type here..."
                                    startAdornment={
                                        <Icon fontSize="small" style={{ marginRight: "6px" }}>
                                            search
                                        </Icon>
                                    }
                                />
                            </Grid>
                        </Grid>

                        <CustomAdvanceTable
                            ActionData={ActionData}
                            tableMinHeight={"455px"}
                            tableMaxHeight={"455px"}
                            // hideColumns={tableHideColumns}
                            allColumns={tableTeamTaskListAllColumns}
                            tableData={tableTeamTaskListDummyData}
                            isLoading={false}
                            enableRowAction={false}
                            enableTopToolbar={false}
                            enableSorting={false}
                            enableColumnAction={false}
                            enableRowSelection={false}
                            enableSelectAll={false}
                        // statusChangeHandler={statusChangeHandler}
                        />
                        <Grid>
                            <PaginationCustom
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalRecords={totalRecords}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewTaskList