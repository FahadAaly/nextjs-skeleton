import Head from 'next/head';
// import Link from 'next/link'
import {Link} from 'root/nexti18nextconfig';
import React from 'react';
type LayoutProps = {
    title?: string;
}
const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
};
const Layout: React.FunctionComponent<LayoutProps> = ({children, title}) => (
    <div style={layoutStyle}>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> */}
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>{' '}
                |{' '}
                <Link href="/about">
                    <a>About</a>
                </Link>{' '}
                |{' '}
                <Link href="/users">
                    <a>Users</a>
                </Link>{' '}
                |{' '}
            </nav>
        </header>
        {children}
    </div>
);
export default Layout;
