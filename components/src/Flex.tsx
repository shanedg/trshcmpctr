import type { CSSProperties, PropsWithChildren } from 'react';

import type { StyleProps } from './types.ts';

type FlexDisplayProperty = Extract<CSSProperties['display'],
  'flex' |
  'inherit' |
  'inline-flex' |
  'none'
>;

interface FlexAwareProps extends StyleProps<HTMLDivElement> {
  /**
   * Item alignment on the cross axis (perpendicular to flex direction)
   * Sets the align-self property on all direct children
   */
  alignItems: CSSProperties['alignItems'];
  display: FlexDisplayProperty;
  flexDirection: CSSProperties['flexDirection'];
  gap: CSSProperties['gap'];
  /**
   * Content spacing on the main axis (flex direction)
   */
  justifyContent: CSSProperties['justifyContent'];
}

/**
 * Use Flexbox rules to control layout of children
 */
export const Flex = ({
  children,
  style,
  ...flexProps
}: PropsWithChildren<Partial<FlexAwareProps>>) => {
  return (
    <div
      style={{
        display: 'flex',
        ...flexProps,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
