import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import { tableSubscriptionManagementAllColumns } from 'constants/TableConstants'
import { tableSubscriptionManagementDummyData } from 'constants/TableConstants'

const SubscriptionManagement = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(100);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewSubscriptionRoute,
        },
    ]

    return (
        <Grid className='page-main-container-layout'>

            <Grid className='table-wrapper-with-text'>
                <Grid className='table-heading-text-top-container'>
                    <span>Subscription Management</span>
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
                    allColumns={tableSubscriptionManagementAllColumns}
                    tableData={tableSubscriptionManagementDummyData}
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
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SubscriptionManagement