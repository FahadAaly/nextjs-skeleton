import React from 'react';
import Layout from 'src/components/Layout';
import {connect} from 'react-redux';

const Index = ({custom}: {custom: string}): JSX.Element => {
	return (
		<Layout title="Home">
			<h1>Hello Next.js 👋</h1>
			<h6>Custom Props: {custom}</h6>
		</Layout>
	);
};

export default connect(state => state)(Index);
