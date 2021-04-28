import React from 'react'
import './VaccineDetails.css'
import DownloadSVG from '../../Icons/download.svg'
import EditSVG from '../../Icons/edit.svg'

export default function VaccineDetails() {
    return (
        <div className = 'vaccine-dose-wrapper'>
            <h1 className = 'vaccine-dose-label '>First Dose</h1>
            <h1 className="vaccine-dose-date">18-02-2021</h1>
            <img src={DownloadSVG} alt="" className="vaccine-dose-download-attachment"/>
            <img src={EditSVG} alt="" className="vaccine-dose-edit"/>
        </div>
    )
}
