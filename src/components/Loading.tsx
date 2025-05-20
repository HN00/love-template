import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import mojs from '@mojs/core';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fff0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 50rem;
  height: 20rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  font-size: 2.5rem;
  background: transparent;
  color: #ff69b4;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 10000;

  &:hover {
    background: transparent;
    transform: translateX(-50%) scale(1.15);
  }
`;

const SVGContainer = styled.svg`
  z-index: 2;
  position: absolute;
`;

const MoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Line = styled.line`
  fill: none;
  stroke: #ffb6c1;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-miterlimit: 10;
`;

const Letter = styled.path`
  fill: #e75480;
`;

const Name = styled.text`
  fill: #e75480;
  font-size: 24px;
  font-weight: bold;
  text-anchor: middle;
`;

const SoundButton = styled.div`
  position: fixed;
  color: #e75480;
  font-size: 1.6rem;
  bottom: 1rem;
  right: 1rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }

  &.sound--off {
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

const Heart = styled(motion.div)`
  position: absolute;
  will-change: transform, opacity;
  pointer-events: none;
  user-select: none;
`;

interface LoadingProps {
  onComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blupRef = useRef<HTMLAudioElement>(null);
  const blopRef = useRef<HTMLAudioElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    // Set initial volume for audio
    if (blupRef.current) blupRef.current.volume = 0.2;
    if (blopRef.current) blopRef.current.volume = 0.2;
  };

  useEffect(() => {
    if (!containerRef.current || !isStarted) return;

    const easingHeart = mojs.easing.path(
      'M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0'
    );

    class Heart extends mojs.CustomShape {
      getShape() {
        return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
      }
      getLength() {
        return 200;
      }
    }
    mojs.addShape('heart', Heart);

    const el = {
      container: containerRef.current,
      i: document.querySelector('.lttr--I') as HTMLElement,
      l: document.querySelector('.lttr--L') as HTMLElement,
      o: document.querySelector('.lttr--O') as HTMLElement,
      v: document.querySelector('.lttr--V') as HTMLElement,
      e: document.querySelector('.lttr--E') as HTMLElement,
      y: document.querySelector('.lttr--Y') as HTMLElement,
      o2: document.querySelector('.lttr--O2') as HTMLElement,
      u: document.querySelector('.lttr--U') as HTMLElement,
      lineLeft: document.querySelector('.line--left') as HTMLElement,
      lineRight: document.querySelector('.line--rght') as HTMLElement,
      colTxt: '#e75480',
      colHeart: '#fa4843',
      blup: blupRef.current,
      blop: blopRef.current,
    };

    const crtBoom = (delay = 0, x = 0, rd = 46) => {
      const parent = el.container;
      if (!parent) return [];

      const crcl = new mojs.Shape({
        shape: 'circle',
        fill: 'none',
        stroke: el.colTxt,
        strokeWidth: { 5: 0 },
        radius: { [rd]: rd + 20 },
        easing: 'quint.out',
        duration: 500 / 3,
        parent,
        delay,
        x,
      });

      const brst = new mojs.Burst({
        radius: { [rd + 15]: 110 },
        angle: 'rand(60, 180)',
        count: 3,
        timeline: { delay },
        parent,
        x,
        children: {
          radius: [5, 3, 7],
          fill: el.colTxt,
          scale: { 1: 0, easing: 'quad.in' },
          pathScale: [0.8, null],
          degreeShift: ['rand(13, 60)', null],
          duration: 1000 / 3,
          easing: 'quint.out',
        },
      });

      return [crcl, brst];
    };

    const crtLoveTl = () => {
      const move = 1000;
      const boom = 200;
      const easing = 'sin.inOut';
      const easingBoom = 'sin.in';
      const easingOut = 'sin.out';
      const opts = { duration: move, easing, opacity: 1 };
      const delta = 150;

      return new mojs.Timeline().add([
        new mojs.Tween({
          duration: move,
          onStart: () => {
            [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((el) => {
              if (el) {
                el.style.opacity = '1';
                el.style.transform =
                  'translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1)';
              }
            });
          },
          onComplete: () => {
            [el.l, el.o, el.v, el.e].forEach((el) => {
              if (el) el.style.opacity = '0';
            });
            if (el.blop) el.blop.play();
          },
        }),

        new mojs.Tween({
          duration: move * 2 + boom,
          onComplete: () => {
            [el.y, el.o2].forEach((el) => {
              if (el) el.style.opacity = '0';
            });
            if (el.blop) el.blop.play();
          },
        }),

        new mojs.Tween({
          duration: move * 3 + boom * 2 - delta,
          onComplete: () => {
            if (el.i) el.i.style.opacity = '0';
            if (el.blop) el.blop.play();
          },
        }),

        new mojs.Tween({
          duration: move * 3 + boom * 2,
          onComplete: () => {
            if (el.u) el.u.style.opacity = '0';
            if (el.blup) el.blup.play();
            onComplete();
          },
        }),

        new mojs.Html({
          ...opts,
          el: el.lineLeft,
          x: { 0: 52 },
        })
          .then({
            duration: boom + move,
            easing,
            x: { to: 52 + 54 },
          })
          .then({
            duration: boom + move,
            easing,
            x: { to: 52 + 54 + 60 },
          })
          .then({
            duration: 150,
            easing,
            x: { to: 52 + 54 + 60 + 10 },
          })
          .then({
            duration: 300,
          })
          .then({
            duration: 350,
            x: { to: 0 },
            easing: easingOut,
          }),

        new mojs.Html({
          ...opts,
          el: el.lineRight,
          x: { 0: -52 },
        })
          .then({
            duration: boom + move,
            easing,
            x: { to: -52 - 54 },
          })
          .then({
            duration: boom + move,
            easing,
            x: { to: -52 - 54 - 60 },
          })
          .then({
            duration: 150,
            easing,
            x: { to: -52 - 54 - 60 - 10 },
          })
          .then({
            duration: 300,
          })
          .then({
            duration: 350,
            x: { to: 0 },
            easing: easingOut,
          }),

        new mojs.Html({
          ...opts,
          el: el.i,
          x: { 0: 34 },
        })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: 34 + 19 },
          })
          .then({
            duration: move,
            easing,
            x: { to: 34 + 19 + 40 },
          })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: 34 + 19 + 40 + 30 },
          })
          .then({
            duration: move,
            easing,
            x: { to: 34 + 19 + 40 + 30 + 30 },
          }),

        new mojs.Html({
          ...opts,
          el: el.l,
          x: { 0: 15 },
        }),

        new mojs.Html({
          ...opts,
          el: el.o,
          x: { 0: 11 },
        }),

        new mojs.Html({
          ...opts,
          el: el.v,
          x: { 0: 3 },
        }),

        new mojs.Html({
          ...opts,
          el: el.e,
          x: { 0: -3 },
        }),

        new mojs.Html({
          ...opts,
          el: el.y,
          x: { 0: -20 },
        })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: -20 - 33 },
          })
          .then({
            duration: move,
            easing,
            x: { to: -20 - 33 - 24 },
          }),

        new mojs.Html({
          ...opts,
          el: el.o2,
          x: { 0: -27 },
        })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: -27 - 27 },
          })
          .then({
            duration: move,
            easing,
            x: { to: -27 - 27 - 30 },
          }),

        new mojs.Html({
          ...opts,
          el: el.u,
          x: { 0: -32 },
        })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: -32 - 21 },
          })
          .then({
            duration: move,
            easing,
            x: { to: -32 - 21 - 36 },
          })
          .then({
            duration: boom,
            easing: easingBoom,
            x: { to: -32 - 21 - 36 - 31 },
          })
          .then({
            duration: move,
            easing,
            x: { to: -32 - 21 - 36 - 31 - 27 },
          }),

        new mojs.Shape({
          parent: el.container,
          shape: 'heart',
          delay: move,
          fill: el.colHeart,
          x: -84,
          scale: { 0: 0.95, easing: easingHeart },
          duration: 500,
        })
          .then({
            x: { to: -82, easing },
            scale: { to: 0.65, easing },
            duration: boom + move - 500,
          })
          .then({
            duration: boom - 50,
            x: { to: -82 + 68 },
            scale: { to: 0.9 },
            easing: easingBoom,
          })
          .then({
            duration: 125,
            scale: { to: 0.8 },
            easing: easingOut,
          })
          .then({
            duration: 125,
            scale: { to: 0.85 },
            easing: easingOut,
          })
          .then({
            duration: move - 200,
            scale: { to: 0.45 },
            easing,
          })
          .then({
            delay: -75,
            duration: 150,
            x: { to: 20 },
            scale: { to: 0.9 },
            easing: easingBoom,
          })
          .then({
            duration: 125,
            scale: { to: 0.8 },
            easing: easingOut,
          })
          .then({
            duration: 125,
            scale: { to: 0.85 },
            easing: easingOut,
          })
          .then({
            duration: 125,
          })
          .then({
            duration: 350,
            scale: { to: 0 },
            easing: easingOut,
          }),

        ...crtBoom(move, -84, 46),
        ...crtBoom(move * 2 + boom, 38, 34),
        ...crtBoom(move * 3 + boom * 2 - delta, -84, 34),
        ...crtBoom(move * 3 + boom * 2, 65, 34),
      ]);
    };

    const loveTl = crtLoveTl();
    loveTl.play();
  }, [onComplete, isStarted]);

  const heartIcons = [
    '💗', // pink heart
    '💖', // sparkling heart
    '💓', // beating heart
    '💞', // revolving hearts
    '💕', // two hearts
    '💝', // heart with ribbon
    '❤️', // red heart
  ];

  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <Container ref={containerRef}>
      {!isStarted && (
        <StartButton onClick={handleStart}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#ff69b4">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </StartButton>
      )}
      <ContentWrapper>
        <SVGContainer
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 200"
        >
          <Line className="line line--left" x1="10" y1="17" x2="10" y2="183" />
          <Line
            className="line line--rght"
            x1="490"
            y1="17"
            x2="490"
            y2="183"
          />
          <g>
            <Letter
              className="lttr lttr--I"
              d="M42.2,73.9h11.4v52.1H42.2V73.9z"
            />
            <Letter
              className="lttr lttr--L"
              d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z"
            />
            <Letter
              className="lttr lttr--O"
              d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z"
            />
            <Letter
              className="lttr lttr--V"
              d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z"
            />
            <Letter
              className="lttr lttr--E"
              d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z"
            />
            <Letter
              className="lttr lttr--Y"
              d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z"
            />
            <Letter
              className="lttr lttr--O2"
              d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z"
            />
            <Letter
              className="lttr lttr--U"
              d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z"
            />
          </g>
          <Name x="250" y="160">
            Hong Ngat
          </Name>
        </SVGContainer>
        <MoContainer>
          {hearts.map((i) => (
            <Heart
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  textShadow: '0 2px 8px #e75480, 0 0 2px #fff',
                  filter: 'drop-shadow(0 0 4px #fff0f5)',
                }}
              >
                {heartIcons[Math.floor(Math.random() * heartIcons.length)]}
              </span>
            </Heart>
          ))}
        </MoContainer>
      </ContentWrapper>
      <audio ref={blupRef} className="blup" style={{ display: 'none' }}>
        <source
          src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3"
          type="audio/ogg"
        />
      </audio>
      <audio ref={blopRef} className="blop" style={{ display: 'none' }}>
        <source
          src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3"
          type="audio/ogg"
        />
      </audio>
    </Container>
  );
};

export default Loading;
