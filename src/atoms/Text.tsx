import Box, { BoxProps, withStyle, Style } from './Box'
import { Color, Theme } from '../theme'
import { withTheme, ThemeContext } from './Theme'

export type TextProps = BoxProps & {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  italic?: boolean, 
  color?: string,
  decoration?: 'none' | 'underline' | 'line-through',
  fontFamily?: string,
  lineHeight?: number,
  display?: string
  size?: number,
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit',
  css?: Style | Array<Style>
}

/**
 * A simple implementation of the mixin from 
 * http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
 */
const computeFontSizeAndLineHeight = ({ typography }: Theme, size: number) => {
  const fontSize = typography.fontSize(size)
  const lines = Math.ceil(fontSize / typography.lineHeight)
  const lineHeight = (lines * typography.lineHeight) + 'px' 
  return { fontSize, lineHeight }
}

/**
 * The actual text building block, I should point out any changes here will
 * DRAMATICALLY change the entire workflow of the application, enough said.
 */
const Text: React.SFC<TextProps> =
  (props, { theme }: ThemeContext) => {
    const {
      // Other variables.
      align,  
      bold,
      color = theme.text.color, 
      decoration,
      fontFamily = theme.text.fontFamily,
      italic,
      display = 'inline',
      lineHeight, 
      size = 0, // Will default to the standrad font size
      transform,
      children,
      css = () => ({}),
      ...restProps
    } = props
    
    return (
      <Box as="span" {...restProps} css={withStyle((theme) => ({
          color, 
          display,
          fontFamily: fontFamily === 'alt' ? theme.text.fontFamilyAlt : fontFamily, 
          ...computeFontSizeAndLineHeight(theme, size),
          ...(transform ? { textTransform: transform } : null),
          ...(align ? { textAlign: align } : null), 
          ...(bold ? { fontWeight: 'bold' } : null), 
          ...(decoration ? { textDecoration: decoration } : null), 
          ...(italic ? { fontStyle: 'italic' } : null), 
          ...(lineHeight ? { lineHeight } : null),
      }), css)} emulateReactNative={false}>
      {children} 
    </Box>
    )
} 

export default withTheme<TextProps>(Text)
