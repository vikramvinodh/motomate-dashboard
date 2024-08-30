import React, { useContext } from 'react'
import { AppContext } from '../Context';
import kandraLogo from '../../public/kandraLogo.png'

function StickyBottom() {
    const { collapsed, adminData } = useContext(AppContext);
    return (
        <div className={`admin-sticky-bottom ${adminData === undefined ? '' : collapsed ? 'remove-padding-admin-sticky' : 'padding-admin-sticky'}`}>
            <div className="body">
                <div className="email">
                    email: lahari.r@mca.christuniversity.in
                </div>
                <div className="phone">
                    Phone: +918296627169
                </div>
                <button type="button" className="clearbtn" data-bs-toggle="tooltip" data-bs-placement="top" title="KandraDigital is a distinguished agency dedicated to crafting and delivering cutting-edge technological solutions for businesses. We serve as the ultimate destination for comprehensive tech and digital marketing solutions, offering a seamless one-stop experience for businesses seeking to elevate their digital presence and capabilities.">
                </button>
            </div>

        </div>
    )
}

export default StickyBottom