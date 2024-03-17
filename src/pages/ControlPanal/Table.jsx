import React, { useState } from 'react'
import './Table.css'
import { Checkbox } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import setting from '../../assets/Images/control/Vector.svg';
import menu from '../../assets/Images/control/menu-vertical.svg'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function TableC() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const initialCheckboxes = [
        { id: 1, label: 'افضل دكتور...', checked: false, created: 'مند 5 ساعة', condtion: false },
        { id: 2, label: 'افضل دكتور...', checked: false, created: 'مند 5 ساعة', condtion: false },
        { id: 3, label: 'افضل دكتور...', checked: false, created: 'مند 5 ساعة', condtion: false },
        { id: 4, label: 'افضل دكتور...', checked: false, created: 'مند 5 ساعة', condtion: false },
        { id: 5, label: 'افضل دكتور...', checked: false, created: 'مند 5 ساعة', condtion: false },

        // Add more checkboxes as needed
    ];

    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = checkboxes.map((checkbox) =>
            checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setCheckboxes(updatedCheckboxes);
    };

    const handleSelectAllChange = () => {
        const allChecked = checkboxes.every((checkbox) => checkbox.checked);
        const updatedCheckboxes = checkboxes.map((checkbox) => ({
            ...checkbox,
            checked: !allChecked,
        }));
        setCheckboxes(updatedCheckboxes);
    };
    return (
        <div className='table-c mt-5 font-basic'>
            <div className='d-flex   ' dir="rtl">
                <div className='col-1 ms-2 d-flex justify-content-start '>
                    <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault" onChange={handleSelectAllChange} checked={checkboxes.every((checkbox) => checkbox.checked)} />
                </div>
                <div className='col-xl-5 col-lg-7 col-md-5 col-sm-5 col-3'><p>الاسم</p></div>
                <div className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-2'><p>الحالة</p></div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-1 col-5  pe-3 pe-md-5'><p>تم انشاءه</p></div>
                <div className='col-1  d-flex  justify-content-end  '>
                    <LazyLoadImage src={setting} className='img ms-3' />
                </div>
            </div>
            {checkboxes.map(item => {
                return (
                    <div className='d-flex w-100  mt-3 '>
                    <div className='d-flex '>
                        <div className='col-1  align-items-center  d-flex justify-content-center '>
                        <div className=' border p-2 rounded'>
                            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault" onChange={() => handleCheckboxChange(item.id)} checked={item.checked} />
                            </div>
                            </div>
                            </div>
<div className='d-flex w-100 border rounded align-items-center py-2 pb-0 '>
                        <div className=' col-xl-6 col-lg-6 col-xxl-6 col-md-6 col-7 pb-0   '><p className=' pe-3  pb-0 me-md-0'>{item.label}</p></div>
                        <div className='col-2  pb-0'><p>{item.condtion ? <p>not empty</p> : <p className='condtion w-50 text-center'>فارغ</p>}</p></div>
                        <div className='col-4  pb-0'><p>{item.created}</p></div>
                        </div>
                        <div className=' p-'>
                        <div className=' d-flex justify-content-center  p-0'>
                        
                        <div>
                        <Button
                            id=""
                            className=' basic-button  '
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                          >
                          <LazyLoadImage src={menu} className='img d-block text-end me-auto ' />      
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Remove</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                          </Menu>
                        
                        
                        
                        
                        </div>
                        
                        
                        
                        
                        </div>
  
                            
                           
                            
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

