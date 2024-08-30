import React from 'react';

function ParentComponent() {
  // Function to open the popup window
  const openPopup = () => {

    // const popupWindow = window.open(`http://localhost:4000/pop-gallery`, '_blank', 'width=800,height=600');
    const popupWindow = window.open(`/pop-gallery`, '_blank', 'width=800,height=600');

    if (!popupWindow) {
      alert('Popup blocked by the browser. Please enable popups.');
    }
  };

  return (
    <div>
      <button className='greenbtn' onClick={openPopup}>Open Gallery</button>
    </div>
  );
}

export default ParentComponent;
