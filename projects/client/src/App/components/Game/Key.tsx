import { Flex } from '@trshcmpctr/components';

interface KeyProps {
  /**
   * Name of the key
   */
  keyName: string;
  /**
   * Whether or not the key is currently pressed
   */
  isPressed: boolean | undefined;
}

export const Key = ({ keyName, isPressed }: KeyProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: isPressed ? 'blanchedalmond' : 'black',
        borderColor: 'blanchedalmond',
        borderStyle: 'dashed',
        borderWidth: '1.5px',
        color: isPressed ? 'black' : 'blanchedalmond',
        height: '25px',
        width: '25px',
      }}
    >
      {keyName}
    </Flex>
  );
};
