
import React from 'react';

import img1 from '../assets/image/facebook.jpeg';
import img2 from '../assets/image/instagram.jpeg';
import img3 from '../assets/image/LinkedIn.jpeg';

function Footer() {
  return (
    <footer className="footer">
      <div className="contact-section">
        <label htmlFor="email">Contact Us:</label>
        <input type="email" id="email" placeholder="Write Your Email" />
        <textarea placeholder="Write your message"></textarea>
        <button type="submit">Submit</button>
      </div>

      <div className="social-section">
        <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <img src={img1} alt="Facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={img2} alt="Google" />
        </a>
        <a href="https://www.LinkedIn.com" target="_blank" rel="noopener noreferrer">
          <img src={img3} alt="Apple" />
        </a>
      </div>

      <div className="contact-info">
        <p>99024567833, <a href="mailto:parq1010@gmail.com">parq1010@gmail.com</a></p>
      </div>

      <div className="copyright">
        <p>copyright@2022; DesignedbyParq.Shruti</p>
      </div>
    </footer>
  );
}

export default Footer;



