import React from 'react';
import './styles/carousel.css';

const slideWidth = 30;

// eslint-disable-next-line no-underscore-dangle
const _items = [
  {
    player: {
      title: 'Hammad Akbar',
      desc:
                'Software Developer',
      desc2:
                'Loves to play soccer, cook and watch Netflix all day',
      image: 'https://web.njit.edu/~haa38/Resume/IMG_4808.jpeg',
    },
  },
  {
    player: {
      title: 'Jay Amin',
      desc:
                'Software Developer',
      desc2:
                'Loves to play video games, watch cricket, and sleep',
      image: 'https://ca.slack-edge.com/T017JP7PHFY-U019QQQ8H98-b8cb8ade5e14-512',
    },
  },
  {
    player: {
      title: 'Shivani Patel',
      desc:
                'Software Developer',
      desc2:
                'Loves to travel to adventurous places',
      image: 'https://ca.slack-edge.com/T017JP7PHFY-U019S9U228K-edc13d3af846-512',
    },
  },
  {
    player: {
      title: 'Akhil Samarth',
      desc:
                'Software Developer',
      desc2:
                'Enjoys motorsports, gardening, and relaxing.',
      image: 'https://ca.slack-edge.com/T017JP7PHFY-U01A3H3A6GZ-750822c5f57a-512',
    },
  },
];

const { length } = _items;
_items.push(..._items);

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const createItem = (position, idx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    player: _items[idx].player,
  };

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' };
      break;
    case length:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <li className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        <img src={item.player.image} alt={item.player.title} />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.player.title}</h4>
        <p><em>{item.player.desc}</em></p>
        <p>{item.player.desc2}</p>
      </div>
    </li>
  );
};

const keys = Array.from(Array(_items.length).keys());

const Carousel = () => {
  const [items, setItems] = React.useState(keys);
  const [isTicking, setIsTicking] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => prev.map((_, i) => prev[(i + jump) % bigLength]));
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => prev.map(
        (_, i) => prev[(i - jump + bigLength) % bigLength],
      ));
    }
  };

  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  React.useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  React.useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length); // prettier-ignore
  }, [items]);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => prevClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos, i) => (
              <CarouselSlideItem
                /* eslint-disable-next-line react/no-array-index-key */
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => nextClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        <div className="carousel__dots">
          {items.slice(0, length).map((pos, i) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              /* eslint-disable-next-line react/no-array-index-key */
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
