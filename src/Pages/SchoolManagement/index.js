import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import { tableDifficultyTypeAllColumns, tableDifficultyTypeDummyData } from 'constants/TableConstants'
import { tableSchoolManagementAllColumns } from 'constants/TableConstants'
import { tableSchoolManagementDummyData } from 'constants/TableConstants'
import Swal from 'sweetalert2'

const SchoolManagement = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowPerPage] = useState(10)
    const [totalRecords, setTotalRecords] = useState(100);
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewSchoolRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editSchoolRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />
        },
    ]

    const statusChangeHandler = (status) => {
        Swal.fire({
            title: `Are you sure you want to change the status to ${status ? 'Inactive' : 'Active'}?`,
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
        <Grid className='page-main-container-layout'>

            <Grid className='table-wrapper-with-text'>
                <Grid className='table-heading-text-top-container'>
                    <span>List of Schools</span>
                    <Grid className='page-text-buttons-with-table'>
                        <ArgonInput
                            placeholder="Type here..."
                            startAdornment={
                                <Icon fontSize="small" style={{ marginRight: "6px" }}>
                                    search
                                </Icon>
                            }
                        />
                        <ArgonButton
                            component={Link}
                            to={routerConstants?.addSchoolRoute}
                            variant="gradient"
                            secendary size="small"
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
                    // hideColumns={tableHideColumns}
                    allColumns={tableSchoolManagementAllColumns}
                    tableData={tableSchoolManagementDummyData}
                    isLoading={false}
                    enableRowAction={false}
                    enableTopToolbar={false}
                    enableSorting={false}
                    enableColumnAction={false}
                    enableRowSelection={false}
                    enableSelectAll={false}
                    statusChangeHandler={statusChangeHandler}
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

export default SchoolManagement