import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import QRCode from "react-qr-code";
import { exportComponentAsPNG } from "react-component-export-image";
import qrIcon from "../../img/qrIcon.png";

export default function QR(props) {
  const { url } = props;

  /*const icons = {
      qrIcon: `<img src={qrIcon} width="22.4px" height="22.4px"/>`
    };*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(
    function () {
      if (url === "") {
        console.error("Please enter URL.");
        handleClose();
        return;
      }
    },
    [show]
  );
  const componentRef = useRef("");
  return (
    <>
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={<Tooltip id="tooltip-top">QR Code</Tooltip>}
      >
        <button onClick={handleShow} className="css-btn">
          <img src={qrIcon} width="15px" height="15px" alt="" />
        </button>
      </OverlayTrigger>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{url}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={componentRef} className="css-center">
          <QRCode value={url} size={300} level={"H"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => exportComponentAsPNG(componentRef)}
          >
            Download QR Code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/*          <Button variant="outline-dark"
                  onClick={() => exportComponentAsJPEG(componentRef)}>
            Download JPEG
          </Button>
                    <Button variant="outline-dark"
                  onClick={() => exportComponentAsPDF(componentRef)}>
            Download PDF
          </Button> 
*/
