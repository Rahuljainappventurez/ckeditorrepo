import React, { useEffect, useState } from 'react'
import './sidebar-name-icon.scss';
import { useArgonController } from 'context';

const SidebarNameIcon = ({ name }) => {
    const [controller, dispatch] = useArgonController();
    const { miniSidenav, darkSidenav, layout } = controller;


    return (
        <div className='sidebar-name-icon-container' style={{ display: `${!miniSidenav ? 'none' : ''}` }}>
            <span>{name[0]?.toUpperCase()}</span>
        </div>
    )
}

export default SidebarNameIcon
