import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { Quiz, Visibility, Whatshot } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import Swal from 'sweetalert2'
import NavTabsHoriz from 'components/NavTabsHoriz'
import routerConstants from 'constants/routerConstants'
import { tableQuestionReportAllColumns } from 'constants/TableConstants'
import { tableQuestionReportDummyData } from 'constants/TableConstants'
import CustomPopover from 'components/CustomPopover/CustomPopover'

const tabsArray = [
    {
        label: 'Questions Reported',
        icon: <Quiz />,
        route: routerConstants?.questionReportManagementRoute,
    },
    {
        label: 'Streaks Reported',
        icon: <Whatshot />,
        route: routerConstants?.streakReportManagementRoute,
    },
]

const ReportManagement = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(100);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const ActionData = [
        {
            label: 'View',
        },
        {
            label: 'Reassign',
        },
        {
            label: 'Publish',
        },
        {
            label: 'Unpublish',
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMoreAction = (event, rowSelectionObj) => {
        setAnchorEl(event.currentTarget);
    }

    const statusChangeHandler = (status) => {
        Swal.fire({
            title: `Are you sure you want to change the status to ${status ? 'Close' : 'Open'}?`,
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Changed!",
                    text: "Your status has been changed.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <Grid className='page-main-container-layout'>
                <NavTabsHoriz
                    tabsArray={tabsArray}
                    currentTab={0}
                />

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>Report Management</span>
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
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        // hideColumns={tableHideColumns}
                        allColumns={tableQuestionReportAllColumns}
                        tableData={tableQuestionReportDummyData}
                        isLoading={false}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={false}
                        enableSelectAll={false}
                        statusChangeHandler={statusChangeHandler}
                        handleClickMoreAction={handleClickMoreAction}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
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
            <CustomPopover
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                popoverId={'popover-custom-id-question-report'}
                ActionData={ActionData}
            />
        </>
    )
}

export default ReportManagement