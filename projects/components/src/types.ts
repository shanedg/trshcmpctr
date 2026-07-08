import type { HTMLAttributes } from 'react';

/**
 * A component should extend this interface if it accepts arbitrary styles
 * to be applied to its containing element
 */
export interface StyleProps<T = HTMLElement> {
  /**
   * React CSS-in-JS HTML style attribute
   */
  style: HTMLAttributes<T>['style'];
}
