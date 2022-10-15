import React from 'react';
import {withRouter, Router} from 'next/router';
import Layout from 'src/components/Layout';

type PostProps = {
	router: Router;
}
const Post: React.FunctionComponent<PostProps> = ({router}) => {
	return (
		<Layout>
			<h1>{router.query.title}</h1>
			<p>This is the blog post content.</p>
		</Layout>
	);
};
export default withRouter(Post);
