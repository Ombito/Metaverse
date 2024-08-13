import React, { useState } from 'react';
import './newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmitNewsletter = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://127.0.0.1:5555/newsletters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
          });
      
          if (response.ok) {
            console.log('You have successfully subscribed to our newsletter!');
          } else {
            console.log("Failed to subscribe!")
          }
        } catch (error) {
          setError('Error: ' + error.message);
          console.error('Error', error);
        }
      };

    return (
        <div class="newsletter">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay up to date with our latest news and get updates on new arrivals.</p>
            <form onSubmit={handleSubmitNewsletter}>
                <div className='newsletter-email-input'>
                    <input className='newsletter-input' type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit">Subscribe</button>
                </div>
                <div className='subscribe-checkbox'>
                    <input type="checkbox" required/>
                    <label>I have read and agreed to the <a href="" target="_blank">Terms and Conditions</a>.</label>
                </div>

            </form>
        </div>
    )
}
export default Newsletter;