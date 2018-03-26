import Head from 'next/head'

export default ({ og }) =>
	<Head>
		{og['og:title'] &&
			<title>{og['og:title']}</title>
		}
		{og['og:url'] &&
			<link rel="canonical" href={og['og:url']} />
		}
		{Object.keys(og).map((m, i) => {
			if (og[m]) {
				return (
					<meta key={i} property={m} content={og[m]} />
				)
			}
			return null
		})}
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" href="/static/lib/nprogress.css"/>

		<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
		<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
		<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
		<link rel="manifest" href="/static/favicon/manifest.json"/>
		<link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
		<link rel="shortcut icon" href="/static/favicon/favicon.ico"/>
		<meta name="msapplication-config" content="/static/favicon/browserconfig.xml"/>
		<meta name="theme-color" content="#ffffff"/>
	</Head>
