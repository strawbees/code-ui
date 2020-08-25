import PropTypes from 'prop-types'
import DocumentHead from 'next/head'

const Head = ({
	rootPath,
	ogTitle,
	ogUrl,
	ogDescription,
	ogImage,
	ogType
}) =>
	<DocumentHead>
		{ogTitle &&
			<title>{ogTitle}</title>
		}
		{ogUrl &&
			<link rel="canonical" href={ogUrl} />
		}
		{ogTitle &&
			<meta property="og:title" content={ogTitle} />
		}
		{ogUrl &&
			<meta property="og:url" content={ogUrl} />
		}
		{ogDescription &&
			<meta property="og:description" content={ogDescription} />
		}
		{ogImage &&
			<meta property="og:image" content={ogImage} />
		}
		{ogType &&
			<meta property="og:type" content={ogType} />
		}
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="apple-touch-icon" sizes="180x180" href={`${rootPath}/static/favicon/apple-touch-icon.png`}/>
		<link rel="icon" type="image/png" sizes="32x32" href={`${rootPath}/static/favicon/favicon-32x32.png`}/>
		<link rel="icon" type="image/png" sizes="16x16" href={`${rootPath}/static/favicon/favicon-16x16.png`}/>
		<link rel="manifest" href={`${rootPath}/static/site.webmanifest`}/>
		<link rel="mask-icon" href={`${rootPath}/static/favicon/safari-pinned-tab.svg`} color="#5bbad5"/>
		<link rel="shortcut icon" href={`${rootPath}/static/favicon/favicon.ico`}/>
		<meta name="msapplication-TileColor" content="#da532c"/>
		<meta name="msapplication-config" content={`${rootPath}/static/favicon/browserconfig.xml`}/>
		<meta name="theme-color" content="#ffffff"/>

		<script src={`${rootPath}/static/lib/scratch-blocks/vertical.js`}/>
	</DocumentHead>

Head.propTypes = {
	rootPath      : PropTypes.string,
	ogTitle       : PropTypes.string,
	ogUrl         : PropTypes.string,
	ogDescription : PropTypes.string,
	ogImage       : PropTypes.string,
	ogType        : PropTypes.string
}

export default Head
