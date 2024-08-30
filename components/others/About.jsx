import React from 'react'

function About() {
    const currentDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
    });


    return (
        <div className="about-list">
            <div className="about-list-container">
                <div className="about-list-header">
                    <h4>About KandraDigital</h4>
                </div>

                <div className="about-list-body p-3">
                    <p className='blockquote'>
                        KandraDigital is a distinguished agency dedicated to crafting and delivering cutting-edge technological solutions for businesses. We serve as the ultimate destination for comprehensive tech and digital marketing solutions, offering a seamless one-stop experience for businesses seeking to elevate their digital presence and capabilities.
                    </p>
                    <br />
                    <p>
                        Email : <a href='mailto:lahari.r@mca.christuniversity.in'><strong>lahari.r@mca.christuniversity.in</strong></a>
                    </p>
                    <p>
                        Phone : <a href="tel:8296494941"><strong>+91 8296494941</strong></a>
                    </p>
                    <a href="/brochure.pdf" download="CompanyBrochure">
                        <button className="darkbtn">Download Company Profile</button>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default About
