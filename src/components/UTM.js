import React, {useState, useEffect} from 'react';
import Parser from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';

export default function UTM(props) {
    const { urlData,
            setUrlDate }=props;
    const icons = {
        infoIcon: `<svg width="0.7em" height="0.7em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                    style="color: #384364; opacity: 0.3;">
                   <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                   </svg>`};
    let url=urlData.full;                          
    let onriginalUrl;
    let customUrl;
    const [source, setSource] = useState('');
    const [medium, setMedium] = useState('');
    const [campaign, setCampaign] = useState('');
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');
    const [show, setShow] = useState(false);
    const [urlWithUTM, setUrlWithUTM] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(function(){
        try {
              new URL(url);
        } catch (_) {
            console.error("Please enter valid URL. A valid URL starts with 'http://'.");
            handleClose();
            return;  
        }
        onriginalUrl=new URL(url);
        setUrlWithUTM(url);
        customUrl=new URL(url);
        if(source)
            customUrl.searchParams.set("utm_source", source);
        if(medium)
            customUrl.searchParams.set("utm_medium", medium);
        if(campaign) 
            customUrl.searchParams.set("utm_campaign", campaign);
        if(term)
            customUrl.searchParams.set("utm_term", term);
        if(content)
            customUrl.searchParams.set("utm_content", content);        
        setUrlWithUTM(customUrl.href); 
    }, [show, source, medium, campaign, term, content])

    const handleUTM= () =>{        
        setUrlDate({...urlData, full: urlWithUTM});  
        handleClose();
    }

    return (
        <> 
        <Button variant="outline-dark"
                onClick={handleShow}>Add UTM Tags</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>URL parameters builder</Modal.Title>
            </Modal.Header>           
            <Modal.Body>
            <Form>
            <Form.Group controlId="SourceTag">
                <Form.Row> 
                <Form.Label>
                    Campaign Source 
                    &nbsp;
                    <OverlayTrigger placement="top"
                                    overlay={
                                                <Tooltip>
                                                    This field is required
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="text"
                              placeholder="e.g: Twitter, Google"
                              value={source}
                              className="css-input"
                              onChange={e=> setSource(e.target.value)}
                              required/>
                </Form.Row>
            </Form.Group>                
            <Form.Group controlId="MuediumTag">
                <Form.Row>
                <Form.Label>
                    Campaign Medium 
                    &nbsp;
                    <OverlayTrigger placement="top"
                                    overlay={
                                                <Tooltip>
                                                    This field is required
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="text"
                              placeholder="e.g: cpc, Social, Banner, Email"
                              value={medium}
                              className="css-input"
                              onChange={e=> setMedium(e.target.value)}
                              required/>
                </Form.Row>
            </Form.Group>
            <Form.Group controlId="NameTag">
                <Form.Row>
                <Form.Label>
                    Campaign Name
                    &nbsp;
                    <OverlayTrigger placement="top"
                                    overlay={
                                                <Tooltip>
                                                    This field is required
                                                </Tooltip>
                                    }>
                        {Parser(icons.infoIcon)}
                    </OverlayTrigger>
                </Form.Label>
                <Form.Control type="text"
                              placeholder="e.g: Promotion, Spring_sale"
                              value={campaign}
                              className="css-input"
                              onChange={e=> setCampaign(e.target.value)}
                              required/>
                </Form.Row>
            </Form.Group>
            <Form.Group controlId="TermTag">
                <Form.Row>
                <Form.Label>Campaign Term</Form.Label>
                <Form.Control type="text"
                              placeholder="e.g: Paid keywords"
                              value={term}
                              className="css-input"
                              onChange={e=> setTerm(e.target.value)}/>
                </Form.Row>
            </Form.Group>
            <Form.Group controlId="ContentTag">
                <Form.Row>
                <Form.Label>Campaign Content</Form.Label>
                <Form.Control type="text"
                              placeholder="e.g: Buy-now, textlink"
                              value={content}
                              className="css-input"
                              onChange={e=> setContent(e.target.value)}/>
                </Form.Row>
            </Form.Group> 
            <Form.Group>
                    <Form.Label>The Custom Link:</Form.Label>
                    <Form.Control type="url"
                                  placeholder="URL not provided"
                                  value={urlWithUTM}
                                  className="css-input-important"
                                  disabled
                                  as="textarea"
                                   rows={3}/>
            </Form.Group>      
            </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="outline-dark"
                        onClick={handleUTM}>Save</Button>               
            </Modal.Footer>
        </Modal>
        </>
    )
}
