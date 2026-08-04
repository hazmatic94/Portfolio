import "./ProductAdoptionGamesGrid.css";

export const ADOPTION_GAMES = [
  {
    key: "mines",
    label: "Mines game shell",
    src: "/images/design-system-adoption-mines.png",
    srcSet:
      "/images/design-system-adoption-mines.png 1366w, /images/design-system-adoption-mines@2x.png 2732w",
    width: 1366,
    height: 902,
  },
  {
    key: "hilo",
    label: "Hi Lo game shell",
    src: "/images/design-system-adoption-hilo.png",
    srcSet:
      "/images/design-system-adoption-hilo.png 1366w, /images/design-system-adoption-hilo@2x.png 2732w",
    width: 1366,
    height: 902,
  },
  {
    key: "coin-flip",
    label: "Coin Flip game shell",
    src: "/images/design-system-adoption-coin-flip.png",
    srcSet:
      "/images/design-system-adoption-coin-flip.png 1366w, /images/design-system-adoption-coin-flip@2x.png 2732w",
    width: 1366,
    height: 902,
  },
  {
    key: "roulette",
    label: "Roulette game shell",
    src: "/images/design-system-adoption-roulette.png",
    srcSet:
      "/images/design-system-adoption-roulette.png 1366w, /images/design-system-adoption-roulette@2x.png 2732w",
    width: 1366,
    height: 902,
  },
];

export function ProductAdoptionGamesGrid() {
  return (
    <div className="product-adoption-games-grid">
      <div className="product-adoption-games-grid__grid">
        {ADOPTION_GAMES.map((game) => (
          <div key={game.key} className="product-adoption-games-grid__tile">
            <div className="product-adoption-games-grid__frame">
              <div className="product-adoption-games-grid__media">
                <img
                  className="product-adoption-games-grid__image"
                  src={game.src}
                  srcSet={game.srcSet}
                  sizes="(max-width: 800px) 100vw, 468px"
                  width={game.width}
                  height={game.height}
                  alt={game.label}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
