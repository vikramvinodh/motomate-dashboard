import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor (you can choose a different theme if needed)

/**
 * A generic ReactQuill WYSIWYG editor React component.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.value - The initial content of the editor.
 * @param {Function} props.onChange - A callback function to handle content changes.
 * @returns {JSX.Element} - The rendered ReactQuill component.
 */
const GenericReactQuillEditor = ({ value, onChange, placeholder }) => {
    // Create a reference to the ReactQuill component
    const quillRef = useRef(null);

    // Configuration options for the ReactQuill editor
    const quillConfig = {
        modules: {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link'],
                [{ 'code-block': 'code' }],
                ['clean']
            ],
        },
        formats: ['header', 'bold', 'italic', 'underline', 'strike', 'link', 'image', 'list'],
        placeholder: placeholder || 'Start typing...',
    };

    const handleQuillBlur = () => {
        if (quillRef.current && quillRef.current.editor) {
            const htmlContent = quillRef.current.editor.root.innerHTML;
            if (onChange) {
                onChange(htmlContent);
            }
        }
    };

    return (
        <div className='container-fulid p-0' style={{ minWidth: '500px', overflowY: 'auto', maxHeight: '500px' }}>
            {/* ReactQuill component */}
            <ReactQuill
                ref={quillRef}
                value={value}
                modules={quillConfig.modules}
                formats={quillConfig.formats}
                placeholder={quillConfig.placeholder}
                onChange={handleQuillBlur}
            />
        </div>
    );
};

// Define prop types for the component's props
GenericReactQuillEditor.propTypes = {
    value: PropTypes.string, // The initial content of the editor (adjust the prop type as needed)
    onChange: PropTypes.func, // Callback function to handle content changes (adjust the prop type as needed)
    modules: PropTypes.object, // Configuration for ReactQuill modules (optional)
    formats: PropTypes.array, // Allowed formats for the editor (optional)
    placeholder: PropTypes.string, // Placeholder text (optional)
};

export default GenericReactQuillEditor;