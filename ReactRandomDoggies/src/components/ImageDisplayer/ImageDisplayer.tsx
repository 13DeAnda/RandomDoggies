import React from 'react';
import './ImageDisplayer.css';
import { IDog } from '../../Interfaces/IDog';
export default function ImageDisplayer(props: { dog: IDog; mainPicture?: boolean }) {
    return (
        <>
            <img src={props.dog.image} className="image" alt="Dog Picture" />
            <div className="title">
                {props.mainPicture ? null : (
                    <a href={props.dog.image} target="_blank" rel="noopener noreferrer">
                        {props.dog.breed}
                    </a>
                )}
            </div>
        </>
    );
}
