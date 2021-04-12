import React, {Component} from 'react';

import {strings} from '../../assets/constants';

const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    ADDRESS1,
    ADDRESS2,
    CITY,
    STATE,
    POSTAL_CODE,
    PHONE_NUMBER,
    PREFERRED_SHOP,
    PREFERRED_START_TIME,
    PARTY_SIZE,
    NOTES,
    NOTE_PLACEHOLDER,
    SUBMIT
} = strings;

export default class EventDetailView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, description, dividerIcon} = this.props;

        return (
            <div className="event-detail">
                <div className="content">
                    <div className="row flex-column align-items-center">
                        <div className="divider row align-items-center w-100">
                            <div className="dash-line flex-grow-1"/>
                            <img src={dividerIcon} alt="Divider Icon"/>
                            <div className="dash-line flex-grow-1"/>
                        </div>
                        <h2>{title.toUpperCase()}</h2>
                        <div className="detail-section w-100">
                            {description.map((item, index) => {
                                return <>
                                    {item['type'] === 'paragraph' &&
                                    <span className="top d-block w-100" key={index}>{item['content']}</span>}
                                    {item['type'] === 'list' &&
                                    <ul key={index}>
                                        {item['content'].map((listItem, index) => {
                                            return <li key={index}>{listItem}</li>;
                                        })}
                                    </ul>}
                                </>
                                {/*<span className="note">{note}</span>*/
                                }
                            })}
                        </div>
                        <div className="contact-section w-100">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{FIRST_NAME}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <label>{LAST_NAME}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label>{EMAIL}</label>
                                    <input className="form-control" type="email"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <label>{ADDRESS1}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-3">
                                    <label>{ADDRESS2}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{CITY}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <label>{STATE}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{POSTAL_CODE}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <label>{PHONE_NUMBER}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>{PREFERRED_SHOP}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-4">
                                    <label>{PREFERRED_START_TIME}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="col-md-4">
                                    <label>{PARTY_SIZE}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="emphas">{NOTES.toUpperCase()}</label>
                                    <textarea className="form-control" placeholder={NOTE_PLACEHOLDER} rows="5"/>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100">{SUBMIT}</button
                        >
                    </div>
                </div>
            </div>
        );
    }
}
