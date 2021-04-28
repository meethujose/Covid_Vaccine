import React from 'react'
import './TestDetails.css'
import DownloadSVG from '../../Icons/download.svg'
import EditSVG from '../../Icons/edit.svg'

export default function VaccineDetails() {
    return (
        <div className = 'test-wrapper'>
            <h1 className = 'test-label '>PCR Negative</h1>
            <h1 className="test-date">18-02-2021</h1>
            <img src={DownloadSVG} alt="" className="test-download-attachment"/>
            <img src={EditSVG} alt="" className="test-edit"/>
        </div>
    )
}
