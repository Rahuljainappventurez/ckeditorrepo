import { Grid } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import { tableDummyData } from 'constants/TableConstants'
import { tableAllColumns } from 'constants/TableConstants'
import { tableHideColumns } from 'constants/TableConstants'
import PlatformSettings from 'layouts/profile/components/PlatformSettings'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(100);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
        },
        {
            label: 'Edit',
            icon: <Edit />,
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
            <h2 style={{color:'#ffffff'}}>Development In progress ...</h2>
        </Grid>
    )
}

export default Dashboard
