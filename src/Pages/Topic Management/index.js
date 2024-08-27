import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import { tableTopicManagementAllColumns } from 'constants/TableConstants'
import { tableTopicManagementDummyData } from 'constants/TableConstants'
import routerConstants from 'constants/routerConstants'
import { useQuery, useQueryClient } from 'react-query'
import toaster from 'utility/toaster/toaster'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { toasterMessage } from 'constants/toasterMessage'
import SearchCustom from 'components/search-custom/SearchCustom'

const TopicManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(100);
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);
    const [topicRowData, setTopicRowData] = useState('');

    const topicRowDataCallback = (rowData) => {
        setTopicRowData(rowData)
    }

    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewTopicRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editTopicRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: topicRowDataCallback,
        },
    ]

    const transormTopicData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            topic_name: item?.name,
            topic_id: item?.client_topic_id,
        }))
    }

    const queryClient = useQueryClient();

    const fetchTopicList = () => {
        return getRequest(apiurl?.TOPIC_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: topicList, isError, error } = useQuery(
        ['topic-management-list', currentPage, rowsPerPage,searchTerm],
        fetchTopicList,
        {
            select: (data) => {
                return data?.data?.result
            },
        }
    )

    useEffect(() => {
        if (isError) {
            toaster('error', error?.message)
        }
    }, [isError])

    useEffect(() => {
        setTotalRecords(topicList?.totalCount ?? '')
    }, [topicList])

    const handleRefetch = () => {
        queryClient.invalidateQueries('topic-management-list');
    };


    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Topic</span>
                        <Grid className='page-text-buttons-with-table'>
                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addTopicRoute}
                                variant="gradient"
                                size="small"
                                color={'secondary'}
                            >
                                {'Add'}
                            </ArgonButton>
                        </Grid>
                    </Grid>
                    <CustomAdvanceTable
                        ActionData={ActionData}
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableTopicManagementAllColumns}
                        tableData={transormTopicData(topicList) ?? []}
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

            {
                openConfirmationCaptchaDialog &&
                <ConfirmationWithCaptcha
                    open={openConfirmationCaptchaDialog}
                    setOpen={setOpenConfirmationCaptchaDialog}
                    confirmationMessage={'Are You sure want to delete?'}
                    apiurl={`${apiurl?.TOPIC_DELETE_URL}/${topicRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_TOPIC_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default TopicManagement