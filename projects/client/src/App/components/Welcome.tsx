interface WelcomeProps {
  message?: string;
}

export const Welcome = ({
  message = 'welcome to the trash compactor'
}: WelcomeProps) => {
  return (
    <p>{message}</p>
  );
};
