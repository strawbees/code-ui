const s3 = require('s3')
const path = require('path')
const execute = require('../utils/execute')
// eslint-disable-next-line import/no-dynamic-require
const awsConfig = require(`../../aws-config-${process.env.CONFIG || 'dev'}.json`)

const client = s3.createClient({
	s3Options : {
		accessKeyId     : awsConfig.key,
		secretAccessKey : awsConfig.secret,
		region          : awsConfig.region,
	}
})

const upload = () => new Promise((resolve, reject) => {
	const uploader = client.uploadDir({
		localDir      : 'out',
		deleteRemoved : true,
		s3Params      : {
			Bucket : awsConfig.bucket
		},
		getS3Params : (localFile, stat, callback) => {
			const longCacheControl = 'max-age=604800, public, no-transform'
			const quickCacheControl = 'max-age=120, public, no-transform'
			let CacheControl
			switch (path.extname(localFile)) {
				case '.html':
				case '.json':
					CacheControl = quickCacheControl
					break
				default:
					CacheControl = longCacheControl
			}
			// eslint-disable-next-line no-console
			console.log(`Uploading -> ${localFile}`)
			callback(null, { CacheControl })
		}
	})
	uploader.on('error', err => reject(err))
	uploader.on('end', () => resolve())
})

execute(async ({ fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// upload
	await upload()
})
