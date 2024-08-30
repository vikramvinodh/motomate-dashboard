import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import convertStartToIso, { convertEndToIso } from './functions/DatetoIso';


function DownloadLogs() {

    const [state, setState] = useState({
        startDate: '',
        endDate: ''
    })

    const [disablebtn, setDisablebtn] = useState(false)

    useEffect(() => {
        if (state.startDate && state.endDate) {
            setDisablebtn(true)
        }
    }, [state])


    return (
        <div className='download-logs'>
            <h4>Download User Logs</h4>
            <div className="download-container">
                <DatePicker className='input-text' calendarIcon={null} maxDate={new Date()}
                    clearIcon={null}
                    yearPlaceholder="yyyy"
                    monthPlaceholder='mm'
                    dayPlaceholder='dd'
                    onChange={(e) => setState({ ...state, startDate: e })} value={state.startDate} name='startDate' />
                <DatePicker className='input-text'
                    calendarIcon={null} maxDate={new Date()}
                    clearIcon={null}
                    yearPlaceholder="yyyy"
                    monthPlaceholder='mm'
                    dayPlaceholder='dd'
                    onChange={(e) => setState({ ...state, endDate: e })} value={state.endDate} name='endDate' />
                {
                    disablebtn && convertStartToIso(state.startDate) < convertEndToIso(state.endDate) ?
                        <a href={`${import.meta.env.VITE_URL}/download/logs-data/?startDate=${convertStartToIso(state.startDate)}&endDate=${convertEndToIso(state.endDate)}`}>
                            <button className="download-btn">Download Logs</button>
                        </a>
                        :
                        <button className="download-btn" disabled>Download Logs</button>
                }
            </div>
        </div>
    )
}

export default DownloadLogs
