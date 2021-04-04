import React from 'react';
import Parser from 'html-react-parser';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import Copy from './features/Copy';
import QR from './features/QR';
import Share from './features/Share';
import 'bootstrap/dist/css/bootstrap.min.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {deleteLink, starLink} from '../actions/links';

export default function Link({link, setCurrentId}) {
  const dispatch = useDispatch();
  const shortLink=`http://localhost:5005/${link.short}`;
    const icons = {
        deleteIcon: `<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
      </svg>`,
        editIcon: `<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>`,
      starIcon: `<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>`
    };
    return (
        <>
        <tr>
        <td><i className="css-hashtag">{link.tags.map((tag) =>tag?`#${tag} `:' ')}</i><br/>
            <b>{link.title}</b><br/>
            <a
               href={shortLink}>
                 {shortLink}
            </a><br/>
            <p className="css-small-txt">{link.full}</p></td>
        <td className="css-small-txt"><br/>{link.clicks} clicks</td>
        <td className="css-small-txt"><br/>{moment(link.date).fromNow()}</td>
        <td>
          <OverlayTrigger placement="top"
                          overlay={
                            <Tooltip>
                               Star
                            </Tooltip>
                          }>
              <button onClick={()=>{
                dispatch(starLink(link._id))
              }}
                 className={"css-btn star "+
                 (link.star===true ? "star-show": "")}
                 id={link._id}>
                {Parser(icons.starIcon)}
              </button>        
          </OverlayTrigger>  
        <Copy url={shortLink}/>
        <QR url={shortLink}/>
        <Share url={shortLink} title={link.title}/>
          <OverlayTrigger placement="top"
                          overlay={
                            <Tooltip>
                               Edit
                            </Tooltip>
                          }>
              <button onClick={() => setCurrentId(link._id)}
                      className="css-btn">
                {Parser(icons.editIcon)}
              </button>        
          </OverlayTrigger>
          <OverlayTrigger placement="top"
                          overlay={
                            <Tooltip>
                               Delete
                            </Tooltip>
                          }>
              <button onClick={() =>dispatch(deleteLink(link._id))}
                      className="css-btn delete">
                {Parser(icons.deleteIcon)}
              </button>        
          </OverlayTrigger>
          </td>
        </tr>
        </>
    )
}
