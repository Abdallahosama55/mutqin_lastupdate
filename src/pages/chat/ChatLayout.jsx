import React from 'react';

import {Row, Col, Stack} from 'react-bootstrap';
import {Outlet} from "react-router-dom";
import ChatSideBar from "./_components/ChatSideBar";
import {Toaster} from "react-hot-toast";
import styled from "styled-components";
import Navbar from '../../Util/dashboardLayout/Navbar';

const RightCol = styled(Col)`
    border-left: 1px solid rgba(105, 43, 239, 0.2);
    padding: 16px;
    @media (max-width: 768px) {
        display: none;
    }
`

function ChatLayout() {
    return (
        <div className='py-2'>
        <Navbar/>
            <Toaster/>
  
            <Row>
                <Col>
                    <Outlet/>
                </Col>
                <RightCol md={"2"} className={'d-none d-lg-block'}>
                    <ChatSideBar/>
                </RightCol>
            </Row>
        </div>
    );
}

export default ChatLayout;