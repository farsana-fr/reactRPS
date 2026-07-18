export function GameSelect({ image }) {
  return (
    <img key={image} src={image} className="selection" alt="Player Selection" />
  );
}
