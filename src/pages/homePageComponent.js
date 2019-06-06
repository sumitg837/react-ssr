import React from "react"
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class HomePage extends React.Component{
	
	exampleMethod(){
		console.log('text')
	}
	head(){
		return(
			<Helmet>
				<title>Home</title>
			</Helmet>
		)
	}
	
	render(){
		return(
			<div>
				{this.head()}
					<h1>world</h1>
					<p>World</p>
					<button onClick={()=>this.exampleMethod()}>click</button>
					<Link to="/about">About</Link>
			</div>
		)
	};
}


export default HomePage;