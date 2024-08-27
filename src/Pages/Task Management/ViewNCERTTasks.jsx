import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import routerConstants from 'constants/routerConstants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CustomPopover from 'components/CustomPopover/CustomPopover'
import ArgonButton from 'components/ArgonButton'
import SearchCustom from 'components/search-custom/SearchCustom'
import { dummyDataForFullView } from 'constants/moduleConstants'
import SingleQuestionView from 'components/SingleQuestionView'
import { tableViewNCERTCreatorAllColumns } from 'constants/TableConstants'
import { tableViewNCERTCreatorDummyData } from 'constants/TableConstants'
import { useQuery } from 'react-query'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { formatDate } from 'utility/common'


const ViewNCERTTasks = () => {
    const { state: taskDetails } = useLocation();
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState(1)

    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [tableViewType, setTableViewType] = useState('list');
    const ActionData = [
        {
            label: 'View',
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMoreAction = (event, rowSelectionObj) => {
        setAnchorEl(event.currentTarget);
    }

    // ********************* for fetching the question list using task_id *******************

    const transformNCERTTaskData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            submission_date: formatDate(item?.created_at),
            no_of_resubmissions: item?.resubmission_count,
        }))
    }


    const fetchNCERTTaskList = () => {
        return getRequest(apiurl?.NCERT_TASK_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            task_id: taskDetails?._id,
        })
    }

    const { isLoading, data: ncertTaskList, isError, error } = useQuery(
        ['ncert-task-list', currentPage, rowsPerPage],
        fetchNCERTTaskList,
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
        setTotalRecords(ncertTaskList?.totalCount ?? '')
    }, [ncertTaskList])

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
                                    to={routerConstants?.addNCERTTextbookRoute}
                                >
                                    {'Add NCERT'}
                                </ArgonButton>
                            }

                            <SearchCustom setSearchKey={setSearchKey} />
                        </Grid>
                    </Grid>
                    <CustomAdvanceTable
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableViewNCERTCreatorAllColumns}
                        tableData={transformNCERTTaskData(ncertTaskList) ?? []}
                        isLoading={isLoading}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={false}
                        enableSelectAll={false}
                        handleClickMoreAction={handleClickMoreAction}
                    />
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
                popoverId={'popover-custom-id-view-task-ncert'}
                ActionData={ActionData}
            />
        </>
    )
}

export default ViewNCERTTasks