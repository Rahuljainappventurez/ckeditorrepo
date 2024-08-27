import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import { tableFeedbackAllColumns } from 'constants/TableConstants'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { useQuery } from 'react-query'
import toaster from 'utility/toaster/toaster'
import { formatDateTime } from 'utility/common'

const FeedbackManagement = () => {
    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // ********* for fetch the feedback list and transform data according to requirement *********
    const transormFeedbackData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            // access_level: item?.role,
            feedback: item?.comment,
            date_time: formatDateTime(item?.created_at),
        }))
    }

    const fetchFeedbackList = () => {
        return getRequest(apiurl?.FEEDBACK_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
        })
    }

    const { isLoading, data: feedbackList, isError, error } = useQuery(
        ['feedback-management-list', currentPage, rowsPerPage],
        fetchFeedbackList,
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
        setTotalRecords(feedbackList?.totalCount ?? '')
    }, [feedbackList])

    return (
        <Grid className='page-main-container-layout'>

            <Grid className='table-wrapper-with-text'>
                <Grid className='table-heading-text-top-container'>
                    <span>Feedback Management</span>
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
                    tableMinHeight={"580px"}
                    tableMaxHeight={"580px"}
                    allColumns={tableFeedbackAllColumns}
                    tableData={transormFeedbackData(feedbackList) ?? []}
                    isLoading={false}
                    enableRowAction={false}
                    enableTopToolbar={false}
                    enableSorting={false}
                    enableColumnAction={false}
                    enableRowSelection={false}
                    enableSelectAll={false}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
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
    )
}

export default FeedbackManagement