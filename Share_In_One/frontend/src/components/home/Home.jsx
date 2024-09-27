import React from 'react';
import '../../App.css';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';

function Home() {
	return (
		<div className='gradient'>
			<Navbar />
			<Hero />
			<Features />
			<Footer />
		</div>
	);
}

export default Home;
