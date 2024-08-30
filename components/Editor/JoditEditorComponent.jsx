import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
import PropTypes from 'prop-types';
import GalleryBtn from '../Media/GalleryBtn'

/**
 * A generic Jodit WYSIWYG editor React component.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.value - The initial content of the editor.
 * @param {Function} props.onChange - A callback function to handle content changes.
 * @returns {JSX.Element} - The rendered JoditEditor component.
 */
const GenericJoditEditor = ({ value, onChange, placeholder }) => {
  // Create a reference to the JoditEditor component
  const editorRef = useRef(null);

  // Configuration options for the JoditEditor
  const joditConfig = {
    buttons:
      'bold,italic,underline,strikethrough,|,' +
      'ul,ol,|,' +
      'outdent,indent,|,font,fontsize,brush,|,' +
      'table,link,|,align,undo,redo,|,' +
      'cut,copy,paste,image',
    image: {
      upload: false, // Disable image uploading
      url: true, // Enable image URL insertion
    },
    placeholder: placeholder || 'Start typings...'
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <GalleryBtn />
      </div>
      <div className=' p-0' style={{ minWidth: '500px', overflowY: 'auto', maxHeight: '500px' }}>
        {/* JoditEditor component */}
        <JoditEditor
          ref={editorRef}
          value={value}
          config={joditConfig}
          tabIndex={1}
          onBlur={(newContent) => {
            // Call the provided onChange callback when the editor content changes
            if (onChange) {
              onChange(newContent);
            }
          }}
        />
      </div>
    </>

  );
};

// Define prop types for the component's props
GenericJoditEditor.propTypes = {
  value: PropTypes.string, // The initial content of the editor (adjust the prop type as needed)
  onChange: PropTypes.func, // Callback function to handle content changes (adjust the prop type as needed)
};

export default GenericJoditEditor;
