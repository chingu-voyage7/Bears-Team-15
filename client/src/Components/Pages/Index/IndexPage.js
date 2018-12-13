import React from 'react'
import './IndexPage.css'
import image from '../../Images/arcUnsplash.jpg'
import chips from '../../Images/chips.jpeg'
const tempImgData = [1, 1, 1, 1, 1];
const IndexPage = () => (
	<div className="fillPage">
		<img className="bannerImage" src={image} alt="some splash"></img>

		<div className="banner">
			<h1>Activity And Resource Coordinator for Everyone!</h1>
		</div>
		<div className="homeContent">
			<h2>Why ARC?</h2>
			<h2>ARC allows you to create events, assign tasks, assign roles, and create supply lists for your events.
		  </h2>
			<h2>Assign volunteers or allow attendees to pick up these tasks to coordinate an event.
			 </h2>
			<div className="flexMid">
				<div className="leftImage">
					<p>Don't forget the chips!</p>
				<img src={chips} alt="chips"></img>
			
				</div>
				<h2>How does it work?</h2>
			</div>
			<h2>Explore</h2>
			<div className="categories">
				{tempImgData.map((item) => {
					return (<div className="sampleImage">Category</div>);
				})}
			</div>



			{/* <button className="ctaButton">Creat An Account</button> */}
		</div>
	</div>
)

export default IndexPage
