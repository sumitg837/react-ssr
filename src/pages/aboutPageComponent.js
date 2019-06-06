import React from "react"
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet'

class AboutPage extends React.Component{
	
	exampleMethod(){
		console.log('abouttext')
	}
	head(){
		return(
			<Helmet>
				<title>About</title>
			</Helmet>
		)
	}
	
	render(){
		return(
			<div>
				{this.head()}
				<h1>About</h1>
				<p>Page</p>
				<button onClick={()=>this.exampleMethod()}>click</button>
				<Link to="/">Home</Link>
			</div>
		)
	};
}


export default AboutPage;