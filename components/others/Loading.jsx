import { ScaleLoader } from "react-spinners";


function Loading({ height }) {
    return (
        <div className="loader" style={{ height: height ? height : '' }}>
            <ScaleLoader color="#2c3652" />
        </div>
    )
}

export default Loading
