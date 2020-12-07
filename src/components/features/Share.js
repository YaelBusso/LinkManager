import React, {useState, useEffect} from 'react'
import Parser from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,

  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  LivejournalIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

export default function Share(props) {
    const {url, title}=props;    
    const [show, setShow] = useState(false);
    const icons = {
        shareIcon: `<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-share-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
      </svg>`
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(function(){
        if(url===''){
            console.error("Please enter URL.");
            handleClose();
            return;
        }
    }, [show]);

    return (
    <>
        <OverlayTrigger key="top"
                        placement="top"
                        overlay={
                        <Tooltip id="tooltip-top">
                           Share
                        </Tooltip>
                        }>
            <button variant="outline-dark"
                    onClick={handleShow}
                    className="css-btn">
                {Parser(icons.shareIcon)}
            </button>
        </OverlayTrigger>            
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{url}</Modal.Title>
            </Modal.Header>
            <Modal.Body  className="css-center">
                    <FacebookShareButton url={url} title={title}>
                        <FacebookIcon size={45} round />
                    </FacebookShareButton>
                    &nbsp;&nbsp;
                    <TwitterShareButton url={url} title={title}>
                        <TwitterIcon size={45} round />
                    </TwitterShareButton>
                    &nbsp;&nbsp;
                    <TelegramShareButton url={url} title={title}>
                        <TelegramIcon size={45} round />
                    </TelegramShareButton>
                    &nbsp;&nbsp;
                    <WhatsappShareButton url={url} title={title}>
                        <WhatsappIcon size={45} round />
                    </WhatsappShareButton>
                    &nbsp;&nbsp;
                    <LinkedinShareButton url={url} title={title}>
                        <LinkedinIcon size={45} round />
                    </LinkedinShareButton>
                    &nbsp;&nbsp;
                    <LivejournalShareButton url={url} title={title}>
                        <LivejournalIcon size={45} round />
                    </LivejournalShareButton>
                    &nbsp;&nbsp;
                    <EmailShareButton url={url} subject={title}>
                        <EmailIcon size={45} round />
                    </EmailShareButton>
            </Modal.Body>
        </Modal>
    </>
    )
}
