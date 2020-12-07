import React from 'react';
import {useSelector} from 'react-redux';
import Link from './Link';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Spinner} from 'react-bootstrap';

export default function Links({setCurrentId}) {
    const links =useSelector((state)=>state.links)
    return (
        !links.length? <Spinner animation="border" variant="secondary" /> : (
            <Table hover responsive>
                <tbody>
                {links.map((link)=>(
                    <Link link={link} setCurrentId={setCurrentId} id={link._id} key={link._id}/>
                ))
                }
                </tbody>
            </Table>
        ) 

    )
}