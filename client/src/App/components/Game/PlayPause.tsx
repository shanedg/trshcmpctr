export const PlayPause = ({ isPaused, togglePaused }: {
  isPaused: boolean;
  togglePaused: () => void;
}) => {
  return (
    <button onClick={togglePaused}>
      {isPaused ? 'play' : 'pause'}
    </button>
  );
};
