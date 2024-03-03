import React from 'react';
import {Dropdown, ListGroup} from 'react-bootstrap';
import '../styles/LeftNavBar.css';

const LeftNavBar = () => {
    return (
        <ListGroup className="LeftNavBar">
            <ListGroup.Item action href="#link1" className="LeftNavBarItem">В тренде</ListGroup.Item>
            <ListGroup.Item action href="#link2" className="LeftNavBarItem">Рекомендации</ListGroup.Item>
            <ListGroup.Item action href="#link3" className="LeftNavBarItem">Подписки</ListGroup.Item>
            <br/>
            <ListGroup.Item action href="#link3" className="LeftNavBarItem">История</ListGroup.Item>
            <ListGroup.Item action href="#link3" className="LeftNavBarItem">Мой канал</ListGroup.Item>
        </ListGroup>
    );
};

export default LeftNavBar;