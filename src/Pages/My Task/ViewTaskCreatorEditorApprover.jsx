import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useMemo, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
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


const ViewTaskCreatorApproverEditor = () => {
    const { state: taskDetails } = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKey, setSearchKey] = useState('')
    const [totalRecords, setTotalRecords] = useState(100);
    const [tableViewType, setTableViewType] = useState('list');
    const allActionData = [
        {
            label: 'View',
        },
        {
            label: 'Edit',
        },
        {
            label: 'Approve',
        },
        {
            label: 'Reject',
        },
        {
            label: 'Error - Repeated',
        },
        {
            label: 'Error - OOS',
        },
        {
            label: 'Error - Incomplete',
        },
        {
            label: 'Error - Other',
        },
        {
            label: 'Review - Image Issue',
        },
        {
            label: 'Ready to Publish',
        },
    ]

    const filteredActionData = useMemo(() => {
        if (taskDetails?.role === 'Creator' || taskDetails?.role === 'Editor') {
            return allActionData.filter(action => action.label === 'View' || action.label === 'Edit');
        } else {
            return allActionData.filter(action => action.label !== 'Edit');
        }
    }, [taskDetails?.role]);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMoreAction = (event, rowSelectionObj) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCheckBoxChangeFullView = () => {

    }

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <p className='main-heading-with-back-button'><ArrowBackIos onClick={() => navigate(-1)} /><span>{`${taskDetails?.source}/${taskDetails?.chapter_id}/${taskDetails?.chapter}`}</span></p>

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
                                // hideColumns={tableHideColumns}
                                allColumns={tableViewTasksCreatorAllColumns}
                                tableData={tableViewTasksCreatorDummyData}
                                isLoading={false}
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
                        />
                    </Grid>
                </Grid>
            </Grid>

            <CustomPopover
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                popoverId={'popover-custom-id-view-task-creator-editor-approver'}
                ActionData={filteredActionData}
            />
        </>
    )
}

export default ViewTaskCreatorApproverEditor