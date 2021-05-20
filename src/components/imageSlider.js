import { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import arrowPreviousIcon from 'src/assets/icons/general/arrowPrevious.svg'
import arrowNextIcon from 'src/assets/icons/general/arrowNext.svg'
import {
	GRAY,
} from 'src/constants/colors'

const ImageSlider = ({
	items,
	className,
}) => {
	const [index, setIndex] = useState(0)
	const length = items && items.length
	// const changeIndex = (i) => setIndex(Math.abs(length + i) % length)
	if (!length) {
		return null
	}
	return (
		<div className={`root imageSlider ${className}`}>
			<style jsx>{`
				.root {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: stretch;
				}
				.image {
					width: 100%;
					height: auto;
				}
				.control {
					margin-top: 1rem;
					width: 100%;
					height: 2rem;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
				.control .title {
					box-sizing: border-box;
					margin: 0 0.5rem;
				}
				.control .title .counter {
					margin-right: 0.5rem;
				}
				.control .title .text {
					color: ${GRAY};
				}
			`}</style>
			{length &&
				<img
					className='image'
					alt={items[index].title}
					src={items[index].url}
				/>
			}
			{length &&
				<div className='control'>
					{length > 1 &&
						<IconButton
							disabled={index === 0}
							icon={arrowPreviousIcon}
							onClick={() => setIndex(index - 1)}
						/>
					}
					<div className='title'>
						{length > 1 &&
							<span className='counter'>
								{index + 1}/{length}
							</span>
						}
						<span className='text'>
							{items[index].title}
						</span>
					</div>
					{length > 1 &&
						<IconButton
							disabled={index === (length - 1)}
							icon={arrowNextIcon}
							onClick={() => setIndex(index + 1)}
						/>
					}
				</div>
			}
		</div>
	)
}
ImageSlider.defaultProps = {
	className : '',
	items     : [],
}

ImageSlider.propTypes = {
	className : PropTypes.string,
	items     : PropTypes.arrayOf(PropTypes.shape({
		title : PropTypes.string,
		url   : PropTypes.string,
	})),
}

export default ImageSlider
