import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import { tableAnswerTypeManagementAllColumns } from 'constants/TableConstants'
import { tableAnswerTypeDummyData } from 'constants/TableConstants'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { useQuery } from 'react-query'
import toaster from 'utility/toaster/toaster'
import SearchCustom from 'components/search-custom/SearchCustom'

const AnswerTypeManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // ********* for fetch the answer-type list and transform data according to requirement *********
    const transormAnswerTypeData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            answer_type: item?.name,
        }))
    }

    const fetchAnswerTypeList = () => {
        return getRequest(apiurl?.ANSWER_TYPE_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: answerTypeList, isError, error } = useQuery(
        ['answer-type-management-list', currentPage, rowsPerPage,searchTerm],
        fetchAnswerTypeList,
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
        setTotalRecords(answerTypeList?.totalCount ?? '')
    }, [answerTypeList])

    return (
        <Grid className='page-main-container-layout'>

            <Grid className='table-wrapper-with-text'>
                <Grid className='table-heading-text-top-container'>
                    <span>List of Answer Type</span>
                    <Grid className='page-text-buttons-with-table'>
                        <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                    </Grid>
                </Grid>
                <CustomAdvanceTable
                    tableMinHeight={"580px"}
                    tableMaxHeight={"580px"}
                    allColumns={tableAnswerTypeManagementAllColumns}
                    tableData={transormAnswerTypeData(answerTypeList) ?? []}
                    isLoading={isLoading}
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

export default AnswerTypeManagement