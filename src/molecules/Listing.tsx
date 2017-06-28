import { rgba } from '../styles/functions'
import Box from '../atoms/Box'
import LineBreak from '../atoms/LineBreak'
import Text from '../atoms/Text'
import Button from './Button'
import Icon from '../atoms/FAIcon'
import Heading from '../atoms/Heading'
import Image from '../atoms/Image' 
import ImageCard from './ImageCard'
import { ListingType, Language } from '../types'
import { connect } from 'react-redux'
import { MdAddAPhoto } from 'react-icons/lib/md'
import { Link } from 'react-router-dom'

interface ListingProps {  
  listing: ListingType,
  color?: string,
  index: number
}

interface ListingState {
  galleryVisible: boolean
}

// const Listing: React.SFC<ListingProps> = ({ listing, color = '#000' }) => (
export default class Listing extends React.Component<ListingProps, ListingState> {
  constructor(props: ListingProps) {
    super(props)
    this.state = { galleryVisible: false } 
  } 

  private _changeGalleryVisibility(visible: boolean): void {
    this.setState({ galleryVisible: visible })
    console.log(this.state)
  } 
  
  render() {
    const { listing, color = '#000', index }: ListingProps = this.props
    return (
      <Box padding={1}> 
        <Box borderRadius={5} overflow="hidden"> 
          <Box position="relative"> 
            <Image src={listing.primaryPicture} css={theme => ({
                width: '100%',
                height: 'auto', 
              })} />
            <Box css={theme => ({ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: rgba('#fff', 0),
                opacity: 0,
                cursor: 'pointer',
                ':hover': {
                  opacity: 1,
                  backgroundColor: rgba(color, 0.5),
                }
              })} onClick={() => this._changeGalleryVisibility(true)}> 
              <MdAddAPhoto size={150} color="white" />
            </Box>
          </Box> 
          <Box css={theme => ({ backgroundColor: rgba(color, 0.05) })}> 
            <Box padding={1} flexDirection="row" justifyContent="space-between" alignItems="center">
              <Heading size={1} color="primary" align="left">{listing.name}</Heading>
              <Box flexDirection="row" marginLeft={2}>
                {listing.amenities.map((amenity: string, i:number) =>
                  <Icon iconName={amenity.toLowerCase().trim()} key={i} margin={1 / 4} />)}
              </Box>
            </Box>
            <LineBreak color="white" marginVertical={0} />
            <Box padding={1}>
              <Text>{listing.description}</Text> 
            </Box>
            <LineBreak color="white" marginVertical={0} />
            <Box padding={1} flexDirection="row" alignItems="center" justifyContent="space-between"> 
              <Text marginLeft="2px">{listing.price}</Text>
              <Link to={`/listing/${index}`}>
                <Button enTitle="Learn More" frTitle="plus" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box> 
    ) 
  }
}
