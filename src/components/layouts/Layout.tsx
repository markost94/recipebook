import AuthSidebar from 'components/sidebars/AuthSidebar';
import Head from 'next/head';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

import Navbar from '../navigation/Navbar';

type Props = {
	children: ReactNode;
	meta: {
		title: string;
		description: string;
		image: string;
		type: string;
	};
};

export default function Layout({ children, meta }: Props) {
	const [sidebarActive, setSidebarActive] = useState<boolean>(false);

	const closeSidebar = () => {
		setSidebarActive(false);
	};

	const openSidebar = () => {
		setSidebarActive(true);
	};

	return (
		<React.Fragment>
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={`https://recipebooktest.netlify.app`} />
				<link rel="canonical" href={`https://recipebooktest.netlify.app`} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Recipebook" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="https://recipebooktest.netlify.app" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
			</Head>
			<Navbar openSidebar={openSidebar} />
			<AuthSidebar active={sidebarActive} handleSidebarActive={closeSidebar} />
			<main className="overflow-hidden bg-[#E5F4EC]">{children}</main>
		</React.Fragment>
	);
}
