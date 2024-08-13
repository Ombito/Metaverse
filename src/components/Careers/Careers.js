import React from 'react';
import './careers.css';

const Careers = () => {
  return (
    <div className="careers-container">
      <h2>Join Our Team!</h2>
      <p>We're always looking for talented individuals to join our team and help us achieve our mission. Check out our current job openings below:</p>
      
      <div className="job-listing">
        <h3>Associate Product Manager</h3>
        <p><strong>Employment Type:</strong> Full-time (Remote)</p>
        <p><strong>Responsibilities:</strong></p>
        <ul>
          <li>Lead product initiatives across engineering, design, marketing, and go-to-market.</li>
          <li>Own end-to-end product development by understanding customer pain points, defining product requirements, managing development and testing.</li>
          <li>Develop product roadmap by achieving alignment with key stakeholders and execute to achieve aligned outcomes.</li>
          <li>Determine and analyze KPIs at a product level to establish digital experience success, failures, and next steps through iteration.</li>
          <li>Articulate business goals, strategies, and logic across internal and external teams.</li>
          <li>Independently convey product thought leadership clearly through written and verbal communication.</li>
        </ul>
        <p><strong>The ideal candidate should have:</strong></p>
        <ul>
            <li>Have a BSc in Pure and Applied Science, Industrial Psychology, or a related field.</li>
            <li>Minimum 2-4 years of experience in product management with technical background.</li>
            <li>Strong understanding of agile development methodologies.</li>
            <li>A proven experience working on CRM workflows and triggers.</li>
            <li>High analytical and a data-driven mindset with excellent Excel skills.</li>
        </ul>
        <button className="apply-button">Apply Now</button>
        <input type="file" accept=".pdf,.doc,.docx" className="upload-button" />
      </div>

      <div className="job-listing">
        <h3>Graphics Designer</h3>
        <p><strong>Employment Type:</strong> Full-time (Remote)</p>
        <p><strong>Responsibilities:</strong></p>
        <ul>
          <li>Be able to interpret user and programming strategy to deliver compelling graphics and visuals to that strategy.</li>
          <li>Research and evaluate industry trends to help streamline, improve, and support the creative workflow.</li>
          <li>Create graphic elements as needed, and work with appropriate parties to ensure that the design is in sync with the brand style guide and brand identity.</li>
          <li>Must demonstrate a high level of graphic understanding across multiple platforms and products.</li>
        </ul>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>2+ yrs experience in a Graphic Design, Art Direction, or related role in Print Production.</li>
          <li>Specialization in Adobe InDesign, Photoshop, and Illustrator software, with experience in prepping clean, print-ready files.</li>
          <li>Ability to multitask and prioritize tasks in a fast-paced creative environment.</li>
          <li>Can use brand strategy to produce strong, conceptual, creative solutions.</li>
          <li>Strong portfolio with verifiable graphic design skills - a digital portfolio submission is required.</li>
          <li>Experience with After Effects, Sketch, or Figma is not required but is a bonus.</li>
        </ul>
        <button className="apply-button">Apply Now</button>
        <input type="file" accept=".pdf,.doc,.docx" className="upload-button" />
      </div>
    </div>
  )
}

export default Careers;