import React from 'react'
import './Home.css';
import ictk from './ictk.png'
export const Home = () => {
  return (
    <div>
        <h1 className='head1'>ICT ACADEMY</h1>
<p className='content'>ICT Academy of Kerala is a Social Enterprise created in a Public Private Partnership model (PPP) for imparting ICT skills to the youths of Kerala and improve their employability opportunities in the Industry. The Company is supported by Govt. of India , partnered by Govt. of Kerala and the IT industry.
<img className='poster1' src={ictk} alt="ICTAK poster"/><br/>
    <blockquote className='content1'>
    <h2>Key Focus Areas</h2>
    <ul >
        <li>Industry focused enablement programmes for Faculty members</li>
    <li>Industry focused ICT Skills development programmes for Students</li>
    <li>Project assignments related to capability building for Institutions and Corporate.</li>
    <li>Creating Intellectual Property on niche skill areas and emerging technologies.</li>
    </ul>
    </blockquote>
</p>
    </div>
  )
}
