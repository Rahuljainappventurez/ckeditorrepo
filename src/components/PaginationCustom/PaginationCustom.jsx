import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import './paginationCustom.scss';
import { Grid, Pagination } from '@mui/material';
import FilterTableRowLimit from 'components/FilterCustom/FilterTableRowLimit';

export default function PaginationCustom({ currentPage, setCurrentPage, totalRecords, rowsPerPage, setRowsPerPage }) {

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };

    const tableLimitArr = [10, 25, 50, 100, 250, 500]

    return (
        <div className='custom-pagination-container'>
            <Grid className='custom-pagination-left-container'>
                <FilterTableRowLimit
                    filterListArray={tableLimitArr}
                    filterKeysArray={tableLimitArr}
                    label={'Select'}
                    setFilterKey={setRowsPerPage}
                    filterKey={rowsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                <p className='custom-pagination-heading'>Showing Results:</p>
                <TablePagination
                    component="div"
                    count={+totalRecords}
                    page={currentPage - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
            <Pagination count={Math.ceil(totalRecords / rowsPerPage)} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" />
        </div>
    );
}