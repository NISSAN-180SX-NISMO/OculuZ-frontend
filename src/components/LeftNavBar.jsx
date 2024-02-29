import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/LeftNavBar.css';

const LeftNavBar = () => {
    return (
        <ListGroup className="LeftNavBar">
            <ListGroup.Item action href="#link1" className="LeftNavBarItem">Пункт меню 1</ListGroup.Item>
            <ListGroup.Item action href="#link2" className="LeftNavBarItem">Пункт меню 2</ListGroup.Item>
            <ListGroup.Item action href="#link3" className="LeftNavBarItem">Пункт меню 3</ListGroup.Item>
        </ListGroup>
    );
};

export default LeftNavBar;