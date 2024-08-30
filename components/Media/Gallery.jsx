import { MdDeleteForever } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../others/Alert';
import Modal from '../others/Modal';
import { LogsFunction } from '../functions';
import { DELETE_IMAGE, GALLERY } from '../others/Messages';

function Gallery() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([]);
    const [copyStatusMessage, setCopyStatusMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    // Function to handle file input change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to fetch images from the server
    const fetchImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/gallery/main-gallery/all`);
            setImages(response.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    // Function to copy text to clipboard
    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyStatusMessage('Image Link copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
                setCopyStatusMessage('Failed to copy text.');
            });
        setTimeout(() => {
            setCopyStatusMessage('');
        }, 3000);
    };

    // Function to handle image upload
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            await axios.post(`${import.meta.env.VITE_URL}/gallery/main-gallery/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": sessionStorage.getItem('token')
                },
            });
            LogsFunction(GALLERY)
            setUploadMessage("Image uploaded successfully.");
            fetchImages(); // Fetch images after a successful upload
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle the error, e.g., show an error message
        }
        setTimeout(() => {
            setUploadMessage('');
        }, 3000);
    };

    // Function to handle image deletion
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_URL}/gallery/main-gallery/delete/${deleteId}`, {
                headers: {
                    "auth-token": sessionStorage.getItem('token')
                }
            });
            LogsFunction(DELETE_IMAGE)
            setDeleteMessage("Image deleted successfully.");
            fetchImages(); // Fetch images after a successful delete
        } catch (error) {
            console.error("Error deleting image:", error);
            // Handle the error, e.g., show an error message
        } finally {
            setDeleteModal(false);
            setTimeout(() => {
                setDeleteMessage('');
            }, 3000);
        }
    };

    // Function to open the delete modal
    const deleteImage = (id) => {
        setDeleteModal(true);
        setDeleteId(id);
    };

    useEffect(() => {
        fetchImages(); // Fetch images when the component mounts
    }, []);

    return (
        <div className="gallery-container">
            <div className="d-flex justify-content-between align-items-center ">
                <h4 className='m-0 mx-4'>Gallery</h4>
                <div>
                    <input type="file" id="img" name="img" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                    <button className='purplebtn' onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className="gallery-box row">
                {images.map((value) => (
                    <div className="gallery-box-item" key={value._id} >
                        <button className="deletebtn" onClick={() => deleteImage(value._id)}><MdDeleteForever fill='white' /></button>
                        <img src={`${value.imagesLink}`} alt='image' onClick={() => copyTextToClipboard(value.imagesLink)} />
                    </div>
                ))}
            </div>
            {copyStatusMessage && <Alert message={copyStatusMessage} />}
            {uploadMessage && <Alert message={uploadMessage} />}
            {deleteModal && deleteId && <Modal setModal={setDeleteModal} message={'Proceed to Delete Image?'} confirmAction={handleDelete} />}
            {deleteMessage && <Alert message={deleteMessage} />}
        </div>
    );
}

export default Gallery;