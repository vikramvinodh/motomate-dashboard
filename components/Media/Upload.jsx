import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Upload() {
    return (
        <div className="gallery-upload">
            <div className="d-flex align-items-center ">
                <Link to="/media">
                    <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                </Link>
                <h4 className='m-0 mx-4'>Upload </h4>
            </div>

            <div className="upload-template mt-5">
                <h6 className='m-0'>Upload Images </h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <input type="file" id="img" name="img" accept="image/png, image/jpeg, image/jpg" />
                        <small>Allowed extensions: png, jpeg, jpg </small>
                    </div>
                    <button className="purplebtn"><AiOutlineCloudUpload /> Upload</button>
                </div>
            </div>

            <div className="upload-template mt-5">
                <h6 className='m-0'>Upload Tools</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <input type="file" id="img" name="img" accept="image/png, image/jpeg, image/jpg, image/svg" />
                        <small>Allowed extensions:  png, jpeg, jpg, svg </small>
                    </div>
                    <button className="purplebtn"><AiOutlineCloudUpload /> Upload</button>
                </div>
            </div>
        </div>
    )
}

export default Upload
