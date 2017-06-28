import { connect } from 'react-redux'
import Box from '../atoms/Box'
import { centerContent } from '../styles/mixins'
import Image from '../atoms/Image'
import Text from '../atoms/Text' 
import { StoreShape } from '../types'
import ImageCard from './ImageCard'

type GalleryProps = {
  pictures: {
    image: string,
    description?: string,
  }[]
}

class Gallery extends React.Component<GalleryProps, {}> {
  constructor(props: GalleryProps) {
    super(props)
  }

  render() {
    const { pictures }: GalleryProps = this.props
    return (
      <Box width="100%" css={theme => centerContent()}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box flexDirection="column" padding={1}>
            {pictures.filter((p, i) => i % 3 == 0).map(
               (picture, i) => <ImageCard key={i} {...picture} />)} 
          </Box>
          <Box flexDirection="column" padding={1} marginHorizontal={-2}> 
            {pictures.filter((p, i) => i % 3 == 1).map(
               (picture, i) => <ImageCard key={i} {...picture} />)}
          </Box>
          <Box flexDirection="column" padding={1}>
            {pictures.filter((p, i) => i % 3 == 2).map(
               (picture, i) => <ImageCard key={i} {...picture} />)}
          </Box> 
        </Box>
      </Box>
    )
  }
}
export default Gallery
