import React from 'react';
import DeleteButton from './OriginItemButtons/deleteButton';
import EditButton from './OriginItemButtons/editButton';

function OriginItem(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.whichPage_func(`${props.origin.origin_id}`);
    }
    return (
        <li id={props.origin.origin_id}>
            <button className="origins" onClick={handleClick}>{props.origin.origin_name}</button>
            <EditButton whichPage_func={props.whichPage_func} origin={props.origin}/>
            <DeleteButton origin={props.origin} />
        </li>
    );
}

export default OriginItem;