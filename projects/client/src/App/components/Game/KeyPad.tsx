import { Flex } from '@trshcmpctr/components';

import { Key } from './Key';

interface KeysProps {
  /**
   * Whether or not keys are added only when typed
   * If false, keys are always shown
   * @default true
   */
  isEmptyFirst?: boolean;
  /**
   * FIXME:
   */
  keyPresses: Map<string, boolean>;
  /**
   * Keyboard keys the component should highlight,
   * grouped into rows, i.e. keyRows[row][key]
   */
  keyRows: string[][];
}

/**
 * Highlight gameplay keys when pressed
 */
export const KeyPad = ({
  isEmptyFirst = false,
  keyPresses,
  keyRows,
}: KeysProps) => {
  return (
    <Flex
      flexDirection="column"
      gap="5px"
      style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
      }}
    >
      {keyRows.map((row, rowIndex) => (
        <Flex
          gap="inherit"
          key={`${String(rowIndex)}-${row.join(',')}`}
          style={{ marginLeft: `${String(rowIndex * 5)}px` }}
        >
          {row.map(keyName => {
            if (!isEmptyFirst || keyPresses.has(keyName)) {
              return (
                <Key
                  isPressed={keyPresses.get(keyName)}
                  key={keyName}
                  keyName={keyName}
                />
              );
            }
            return null;
          })}
        </Flex>
      ))}
    </Flex>
  );
};
