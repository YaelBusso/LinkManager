import React, {useState, useEffect} from 'react';
import Parser from 'html-react-parser';
import {useDispatch, useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {createLink, updateLink} from '../actions/links';
import  UTM from './UTM';

export default function AddLink({currentId, setCurrentId}) {
    const dispatch=useDispatch();
    const link =useSelector((state)=> currentId? state.links.find((link)=> link._id===currentId): null);
    
    const icons = {
        plusIcon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                   </svg>`,
        infoIcon: `<svg width="0.7em" height="0.7em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                    style="color: #384364; opacity: 0.3;">
                   <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                   </svg>`
    };
    const [show, setShow] = useState(false);
    const [urlData, setUrlDate] = useState({});

    useEffect(() => {
        if(link) {
            setShow(true);
            setUrlDate(link);
        }
    }, [link])

    const checkUrl=(url)=>{
        try {
            new URL(url);
        } catch (_) {
          console.error("Please enter valid URL. A valid URL starts with 'http://'.");
          return false;  
      }
      return true;
    };

    const clear=()=>{
        setCurrentId(null);
        setUrlDate({
        // full: '',
        // short: 'default',
        // clicks:0,
        // date: Date.now(),
        // title: '',
        // tags: '',
        // star: false 
     });  
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit=(e) => {
        e.preventDefault();
        if(checkUrl(urlData.full)===false){
            let alertError=document.querySelector(".alert-danger");
            alertError.classList.remove("d-none");
            setTimeout(()=>{
                alertError.classList.add("d-none");    
            }, 1500)
        }
        else{
            setShow(false);
        }
        if(currentId){
            dispatch(updateLink(currentId, urlData));
        } else{
            dispatch(createLink(urlData));
            // dispatch(shortenLink(urlData));            
        }
        clear();
    }

    return (
        <>
        <button className="css-btn css-add-btn" 
                onClick={handleShow}>
            {Parser(icons.plusIcon)}
        </button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
    <Modal.Title>{currentId? `Editing "${urlData.full}"`: 'Short a new link'}</Modal.Title>
            </Modal.Header>
        <Form autoComplete="off"
              noValidate
              onSubmit={handleSubmit}>               
        <Modal.Body>
                    <Form.Group controlId="inuptLink">
                <Form.Row>
                <Form.Label>
                    Destination URL 
                    &nbsp;
                    <OverlayTrigger key="top"
                                    placement="top"
                                    overlay={
                                                <Tooltip id="tooltip-top">
                                                    Destination URL is the long link you want to shorten
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="url"
                              placeholder="Type or paste a link (URL)"
                              required
                              as="textarea"
                              rows={1}
                              className="css-input-important"
                              value={urlData.full}
                              onChange={e=> setUrlDate({...urlData, full: e.target.value})}/>
                </Form.Row>
            </Form.Group>
            <Form.Group controlId="link-title">
            <Form.Row>
                <Form.Label>
                    Title 
                    &nbsp;
                    <OverlayTrigger key="top"
                                    placement="top"
                                    overlay={
                                                <Tooltip id="tooltip-top">
                                                    Adding a title to your link helps you to identify it
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="text"
                              placeholder="Add a title."
                              required
                              className="css-input"
                              value={urlData.title}
                              onChange={e=> setUrlDate({...urlData, title: e.target.value})}/>
                </Form.Row>
            </Form.Group>
            <Form.Group controlId="link-tags">
            <Form.Row>
                <Form.Label>
                    Tags 
                    &nbsp;
                    <OverlayTrigger key="top"
                                    placement="top"
                                    overlay={
                                                <Tooltip id="tooltip-top">
                                                    Adding a tag to your link helps you to identify it
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="text"
                              placeholder="Add or create tags (coma separated)"
                              required
                              className="css-input"
                              value={urlData.tags}
                              onChange={e=> setUrlDate({...urlData, tags: e.target.value.split(',')})}/>
                </Form.Row>
            </Form.Group>  
            <div className="alert alert-danger d-none"
                 role="alert">
                    Please enter valid URL
            </div>        
        </Modal.Body>
            <Modal.Footer>
                <UTM urlData={urlData} setUrlDate={setUrlDate}/>
                <Button variant="outline-dark"
                        type="submit">
                        {currentId? `Save`: 'Create Shorten Link'}    
                </Button>                 
            </Modal.Footer>
        </Form>
        </Modal>
       </>         
    )
}
