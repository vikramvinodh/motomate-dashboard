import { RiGalleryFill } from 'react-icons/ri'
import { IoCloudUploadSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Media() {
  return (
    <div className="media-container">
      <div className="d-flex row mt-4">
        <Link to='gallery' className="gallery-box">
          <h6 className="m-0 col-6">Gallery</h6>
          <div className="col-6 gallery-box-icon">
            <RiGalleryFill size={40} fill='#a4abc5' />
          </div>
        </Link>
        <Link to='upload' className="gallery-box">
          <h6 className="m-0 col-6">Upload</h6>
          <div className="col-6">
            <IoCloudUploadSharp size={40} fill='#a4abc5' />
          </div>
        </Link>
      </div>

    </div>
  )
}

export default Media
