import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './custom-popover.scss';

const ActionData = [
    {
        title: 'View',
    },
    {
        title: 'Edit',
    },
    {
        title: 'Delete',
    },
]

export default function CustomPopover({ anchorEl, setAnchorEl, popoverId,ActionData }) {

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? popoverId : undefined;

    return (
        <div>
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button> */}
            <Popover
                id={id}
                open={open}
                className='custom-popover-component'
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {
                    ActionData?.map((action, index) => {
                        return (
                            <Typography key={`${id}-${index + 9999}`} onClick={() => setAnchorEl(null)} sx={{ p: 1 }}>{action?.label}</Typography>
                        )
                    })
                }
            </Popover>
        </div>
    );
}
