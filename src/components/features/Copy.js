import React from 'react';
import Parser from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';


export default function Copy(props) {
  const {url}=props;
  const icons = {
    copyIcon: `<svg width="0.8em" height="0.8em"
                    viewBox="0 0 16 16"
                    class="bi bi-files"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
    <path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
    </svg>`
  };

  const handleCopy=()=>{
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);      
  }
   return (
          <OverlayTrigger key="top"
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">
                               Copy to Clipboard
                            </Tooltip>
                          }>
              <button onClick={handleCopy}
                      className="css-btn">
                {Parser(icons.copyIcon)}
              </button>        
          </OverlayTrigger>
    )
}