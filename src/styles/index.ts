import { css } from 'glamor'
import globalRules from './global'
import './plugins'

// Adds a reset.css
import 'glamor/reset'

// Render the global rules. 
globalRules(css.global)

// Export the renderRule command to be passed to all components.
export const renderRule = (rule: Object) => css(rule).toString()
