import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./custom-advance-table.scss";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useNavigate } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";


const CustomAdvanceTable = ({
  ActionData,
  tableMaxHeight,
  tableMinHeight,
  hideColumns,
  allColumns,
  tableData,
  isLoading,
  enableSorting,
  enableColumnAction,
  enableRowAction,
  enableTopToolbar,
  // filterOptionForStatus,
  enableColumnFilters,
  enableRowSelection,
  enableSelectAll,
  statusChangeHandler,
  handleClickMoreAction,
  tableRowSelectionDataCallback,
  currentPage,
  rowsPerPage,
  rowSelection = {}, // Default to an empty object if not provided
  setRowSelection = () => { }, // Default to a no-op function if not provided
}) => {

  const navigate = useNavigate();

  const handleActionPerform = (actionObj, rowData) => {
    if (actionObj.navigationAddress) {
      navigate(actionObj.navigationAddress, { state: rowData });
    }
    if (actionObj?.setOpen) {
      actionObj?.setOpen(!actionObj?.open);
      actionObj?.callback(rowData);
    }
    if (actionObj?.isTaskType && actionObj?.navigationAddressObj) {
      if (rowData?.task_type === 'questions') {
        navigate(actionObj.navigationAddressObj?.questionView, { state: rowData });
      }
      else if (rowData?.task_type === 'flashcard') {
        navigate(actionObj.navigationAddressObj?.flashCardView, { state: rowData });
      }
      else {
        navigate(actionObj.navigationAddressObj?.NCERTView, { state: rowData });
      }
    }
  }


  //should be memoized or stable
  const columns = useMemo(
    () =>
      allColumns?.map((item, index) => {
        if (item?.accessorKey === "slNo") {
          return {
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => (
              <>
                <span key={`${item?.accessorKey}-${index + 1}`}>
                  {rowsPerPage ? (rowsPerPage * (currentPage - 1) + (row?.index + 1)) : (row?.index + 1)}
                </span>
              </>
            ),
          };
        }
        else if (item?.accessorKey === "actions") {
          return {
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => (
              <Grid key={`${item?.accessorKey}-${index + 1}`} className='custom-advance-table-action-container'>
                {
                  ActionData?.map((action, index) => (
                    <IconButton
                      key={`table-spread-action-${index + 1}`}
                      className="custom-table-more-horiz-icon"
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      onClick={() => handleActionPerform(action, row?.original)}
                      disabled={rowSelection && rowSelection[`${row.index}`]}
                    >
                      {action?.icon}
                    </IconButton>
                  ))
                }
              </Grid>
            ),
          };
        }
        else if (item?.accessorKey === "more_action") {
          return {
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => {
              return (
                <>
                  <IconButton
                    key={`${item?.accessorKey}-${index + 1}`}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    onClick={(e) => handleClickMoreAction(e, rowSelection)}
                    disabled={rowSelection && rowSelection[`${row.index}`]}
                  >
                    <MoreHoriz className="custom-table-more-horiz-icon" />
                  </IconButton>
                </>
              )
            },
          };
        }
        else if (item?.accessorKey === "report_status") {
          return {
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => (
              <Grid key={`${item?.accessorKey}-${index + 1}`} className='custom-advance-table-status-container'>
                <button onClick={() => statusChangeHandler(row?.original[`${item?.accessorKey}`])} className={`${row.original[`${item?.accessorKey}`] ? "status-active" : "status-inactive"}`} type="button">{row.original[`${item?.accessorKey}`] ? "Open" : "Close"}</button>
              </Grid>
            ),
          };
        }
        else if (item?.accessorKey === "status") {
          return {
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => (
              <Grid key={`${item?.accessorKey}-${index + 1}`} className='custom-advance-table-status-container'>
                <button onClick={() => statusChangeHandler(row?.original[`${item?.accessorKey}`])} className={`${row.original[`${item?.accessorKey}`] ? "status-active" : "status-inactive"}`} type="button">{row.original[`${item?.accessorKey}`] ? "Active" : "Inactive"}</button>
              </Grid>
            ),
          };
        }
        else if (item?.accessorKey === "remark") {
          return {
            accessorKey: item?.accessorKey,
            header: item?.header,
            size: item?.size,
            enableSorting: item?.enableSorting,
            enableColumnActions: item?.enableColumnActions,
            enableHiding: item?.enableHiding,
            Cell: ({ row }) => {
              const text = row?.original[`${item?.accessorKey}`] || "-";
              const isLongText = text?.length >= 88;

              return (
                <>
                  {isLongText ? (
                    <Tooltip
                      title={text}
                      placement="bottom-start"
                    >
                      <span key={`${item?.accessorKey}-${index + 1}`}>
                        {`${text.substring(0, 85)}...`}
                      </span>
                    </Tooltip>
                  ) : (
                    <p>
                      {text}
                    </p>
                  )}
                </>
              );
            },
          };
        }
        return {
          accessorKey: item?.accessorKey,
          header: item?.header,
          size: item?.size,
          enableSorting: item?.enableSorting,
          enableColumnActions: item?.enableColumnActions,
          enableHiding: item?.enableHiding,
          Cell: ({ row }) => {
            const text = row?.original[`${item?.accessorKey}`] ?? "-";
            return (
              <>
                <Tooltip
                  title={text}
                  placement="bottom-start"
                >
                  <span key={`${item?.accessorKey}-${index + 1}`}>
                    {text}
                  </span>
                </Tooltip>
              </>
            )
          },
        };
      }),
    [allColumns, rowSelection, currentPage, rowsPerPage]
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableBottomToolbar: false,
    enableTopToolbar: enableTopToolbar,
    enablePagination: false,
    enableRowSelection: enableRowSelection,
    enableFullScreenToggle: false,
    enableColumnFilters: enableColumnFilters,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnActions: enableColumnAction,
    enableSorting: enableSorting,
    enableStickyHeader: true,
    enableSelectAll: enableSelectAll,
    muiTableContainerProps: {
      sx: { maxHeight: tableMaxHeight, minHeight: tableMinHeight },
    },
    icons: {
      ViewColumnIcon: () => (
        <div>
          <img src="./images/table-controls-3.svg" alt="column" />
        </div>
      ),
      FilterListOffIcon: () => <FilterAltOffIcon />,
      FilterListIcon: () => <FilterAltIcon />,
      MoreHorizIcon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    enableRowActions: enableRowAction,
    onRowSelectionChange: setRowSelection,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ closeMenu, row }) =>
      ActionData?.map((action, index) => {
        return (
          <li key={`table-action-${index + 1}`}>
            <button
              disabled={action?.isPermission}
              className="custom-advance-table-action-menu"
              onClick={() => closeMenu()}
            >
              {action?.label}
            </button>
          </li>
        )
      }),
    // enableRowNumbers: true,
    // state: { isLoading },
    state: { isLoading, rowSelection },
    muiCircularProgressProps: {
      thickness: 0,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "wave",
      height: 25,
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Action",
      },
    },

  });

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection)?.map(key => tableData[key]?._id);
    if (tableRowSelectionDataCallback) {
      tableRowSelectionDataCallback(rowSelection, selectedRowIds);
    }
  }, [rowSelection])


  return (
    <div className="custom-advance-table-container">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default CustomAdvanceTable;
