import React from 'react';

const Tooltip = ({ text, children }) => {
    return (
        <div className="tooltip-new">
            {children}
            <span className="tooltipText">{text}</span>
        </div>
    );
};

export default Tooltip;
