import React from 'react';
import {Button, Col, Container, Dropdown, Form, FormControl, Image, Navbar, Row} from "react-bootstrap";
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Row className="w-100 flex-nowrap align-items-center">
                    <Col xs={2} className="mr-2">
                        <Navbar.Brand href="">
                            <img src="/images/logo_v3.png" alt="Logo" width={"auto"} height={50}/> {/* Замените "logo.png" на путь к вашему логотипу */}
                        </Navbar.Brand>
                    </Col>
                    <Col xs={8} className="mx-2">
                        <Form className="d-flex justify-content-center w-100">
                            <FormControl type="text" placeholder="Поиск" className="mr-sm-2 mx-2 form-control-border" />
                            <Button variant="success" className="mx-2 btn-search">Поиск</Button>
                        </Form>
                    </Col>
                    <Col xs={2} className="d-flex justify-content-end">
                        <Link to="/upload">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-success" className="border-0">
                                    <Image src="/images/download.png" alt="upload" width={30} height={30}/> {/* Замените "upload.png" на путь к вашему изображению кнопки загрузки */}
                                </Dropdown.Toggle>
                            </Dropdown>
                        </Link>
                        <Dropdown className="mx-2">
                            <Dropdown.Toggle variant="outline-success" className="border-0 ">
                                <Image src="/images/bell_v2.png" alt="notify" width={30} height={30}/> {/* Замените "bell.png" на путь к вашему изображению колокольчика */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" className="mt-3">
                                {/* Здесь будет ваш компонент "notify" */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="ml-2">
                            <Dropdown.Toggle variant="outline-success" className="border-0">

                                <Image src="/images/burger_v3.png" alt="menu" width={30} height={30}/> {/* Замените "burger.png" на путь к вашему изображению бургер-меню */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" className="mt-3">
                                <Dropdown.Item as={Link} to="/login">Мой аккаунт</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">В тренде</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Рекомендации</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Подписки</Dropdown.Item>
                                <br/>
                                <Dropdown.Item href="#/action-3">История</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Мой канал</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Header;