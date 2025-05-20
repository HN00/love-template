import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
`;

const Header = styled.header<{ sticky: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  transition: box-shadow 0.3s, background 0.3s;
  box-shadow: ${({ sticky }) =>
    sticky ? '0 2px 16px 0 rgba(0,0,0,0.12)' : 'none'};
  background: ${({ sticky }) =>
    sticky ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'};
`;

const HeaderText = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;
`;

const HeaderWord = styled(motion.span)`
  cursor: pointer;
  transition: transform 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: scale(1.1);
  }
`;

const HeartIcon = styled(motion.img)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  pointer-events: none;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 64rem 2rem 4rem;
`;

const ConnectionSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const StoryCard = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  width: 100%;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 400px;
  background-image: linear-gradient(#e5e5e5 1px, transparent 1px),
    linear-gradient(90deg, #e5e5e5 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: center center;
  border-left: 4px solid #ff6b6b;
`;

const StoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: #fff;
`;

const StoryContent = styled.div`
  padding: 0.5rem;
`;

const StoryTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
  font-family: 'Caveat', cursive;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ff6b6b;
    transform: rotate(-1deg);
  }
`;

const StoryDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  font-family: 'Caveat', cursive;
  position: relative;
  padding-left: 1rem;
  border-left: 2px solid #ff6b6b;
  margin-left: 1rem;
`;

const DateStamp = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: 'Caveat', cursive;
  color: #ff6b6b;
  font-size: 1.2rem;
  transform: rotate(5deg);
  opacity: 0.8;
`;

const LoveStory: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const gridRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    Array<{
      id: number;
      start: { x: number; y: number };
      end: { x: number; y: number };
      control1: { x: number; y: number };
      control2: { x: number; y: number };
    }>
  >([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  // Create scroll-based animations for each word
  const hoOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const thiOpacity = useTransform(scrollY, [50, 150], [1, 0]);
  const hongOpacity = useTransform(scrollY, [100, 200], [1, 0]);
  const ngatOpacity = useTransform(scrollY, [150, 250], [1, 0]);

  // Reverse animations for scroll up
  const hoOpacityUp = useTransform(scrollY, [250, 150], [0, 1]);
  const thiOpacityUp = useTransform(scrollY, [200, 100], [0, 1]);
  const hongOpacityUp = useTransform(scrollY, [150, 50], [0, 1]);
  const ngatOpacityUp = useTransform(scrollY, [100, 0], [0, 1]);

  // Heart icon animation
  const heartOpacity = useTransform(scrollY, [150, 250], [0, 1]);
  const heartScale = useTransform(scrollY, [150, 250], [0.5, 1]);

  const stories = useMemo(
    () => [
      {
        id: 1,
        image: '/photos/IMG_1072.JPG',
        title: 'Radiant Beauty',
        // description:
        // 'Your natural beauty shines in every moment. This photo captures your warmth and the light you bring into my life.',
        date: 'Cherished Memory',
      },
      {
        id: 2,
        image: '/photos/beauty_1589637736203.JPG',
        title: 'Charming Smile',
        // description:
        // 'Your smile is truly infectious. Every time I see it, my heart feels lighter and my day gets brighter.',
        date: 'Cherished Memory',
      },
      {
        id: 3,
        image: '/photos/beauty_1649498572034.JPG',
        title: 'Elegant Moments',
        // description:
        //   'You have a grace and elegance that is unmatched. This photo reminds me of your gentle and loving spirit.',
        date: 'Cherished Memory',
      },
      {
        id: 4,
        image: '/photos/beauty_1649497517782.JPG',
        title: 'Playful Vibes',
        // description:
        //   'Your playful side always brings joy and laughter. I love every silly and sweet moment we share.',
        date: 'Cherished Memory',
      },
      {
        id: 5,
        image: '/photos/IMG_6730.JPG',
        title: 'Adventurous Heart',
        // description:
        //   'You are always ready for a new adventure. This photo is a reminder of all the journeys we have taken together.',
        date: 'Cherished Memory',
      },
      {
        id: 6,
        image: '/photos/beauty_1746170682737.JPG',
        title: 'Lovely Portrait',
        // description:
        //   'This portrait captures your essence so beautifully. I am grateful for every moment I get to spend with you.',
        date: 'Cherished Memory',
      },
      {
        id: 7,
        image: '/photos/IMG_6644.JPG',
        title: 'Cozy Days',
        // description:
        //   'Some of my favorite memories are the quiet, cozy days spent together. This photo brings back those peaceful times.',
        date: 'Cherished Memory',
      },
      {
        id: 8,
        image: '/photos/IMG_9090.JPG',
        title: 'Forever Us',
        // description:
        //   'No matter where life takes us, I know we will always have each other. This photo is a symbol of our unbreakable bond.',
        date: 'Cherished Memory',
      },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateLines = () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.getElementsByClassName('story-card');
      const gridRect = gridRef.current.getBoundingClientRect();
      setSvgSize({ width: gridRect.width, height: gridRect.height });
      const newLines = [];
      const cardPositions = Array.from(cards).map((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        return {
          left: rect.left - gridRect.left,
          right: rect.right - gridRect.left,
          top: rect.top - gridRect.top,
          bottom: rect.bottom - gridRect.top,
          centerX: rect.left + rect.width / 2 - gridRect.left,
          centerY: rect.top + rect.height / 2 - gridRect.top,
          width: rect.width,
          height: rect.height,
        };
      });
      for (let i = 0; i < cardPositions.length - 1; i++) {
        const current = cardPositions[i];
        const next = cardPositions[i + 1];
        const isNextRow = Math.abs(next.top - current.top) > current.height / 2;
        let start, end, control1, control2;
        if (isNextRow) {
          // Bottom center to top center, subtle vertical curve
          start = { x: current.centerX, y: current.bottom };
          end = { x: next.centerX, y: next.top };
          control1 = { x: current.centerX, y: current.bottom + 20 };
          control2 = { x: next.centerX, y: next.top - 20 };
        } else {
          // Right center to left center, subtle horizontal curve
          start = { x: current.right, y: current.centerY };
          end = { x: next.left, y: next.centerY };
          control1 = { x: current.right + 20, y: current.centerY };
          control2 = { x: next.left - 20, y: next.centerY };
        }
        newLines.push({ id: i, start, end, control1, control2 });
      }
      setLines(newLines);
    };
    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [stories]);

  return (
    <Container>
      <Header ref={headerRef} sticky={isSticky}>
        <HeaderText>
          <HeartIcon
            src="/photos/beauty_1746170682737.JPG"
            alt="Birthday Icon"
            style={{
              opacity: heartOpacity,
              scale: heartScale,
            }}
          />
          <HeaderWord
            style={{
              opacity: scrollY.get() > 150 ? hoOpacityUp : hoOpacity,
              y: useTransform(scrollY, [0, 100], [0, -20]),
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Ho
          </HeaderWord>
          <HeaderWord
            style={{
              opacity: scrollY.get() > 150 ? thiOpacityUp : thiOpacity,
              y: useTransform(scrollY, [50, 150], [0, -20]),
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Thi
          </HeaderWord>
          <HeaderWord
            style={{
              opacity: scrollY.get() > 150 ? hongOpacityUp : hongOpacity,
              y: useTransform(scrollY, [100, 200], [0, -20]),
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Hong
          </HeaderWord>
          <HeaderWord
            style={{
              opacity: scrollY.get() > 150 ? ngatOpacityUp : ngatOpacity,
              y: useTransform(scrollY, [150, 250], [0, -20]),
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Ngat
          </HeaderWord>
        </HeaderText>
      </Header>

      <Content>
        <StoryGrid ref={gridRef}>
          <ConnectionSVG width={svgSize.width} height={svgSize.height}>
            {lines.map((line) => (
              <path
                key={line.id}
                d={`M${line.start.x},${line.start.y} C${line.control1.x},${line.control1.y} ${line.control2.x},${line.control2.y} ${line.end.x},${line.end.y}`}
                stroke="#ff1a1a"
                strokeWidth="6"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(255,26,26,0.7))',
                  opacity: 0.9,
                  transition:
                    'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)',
                  strokeDasharray: 1000,
                  strokeDashoffset: 0,
                }}
              />
            ))}
          </ConnectionSVG>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              className="story-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
            >
              <DateStamp>{story.date}</DateStamp>
              <StoryImage src={story.image} alt={story.title} />
              <StoryContent>
                <StoryTitle>{story.title}</StoryTitle>
                {/* <StoryDescription>{story.description}</StoryDescription> */}
              </StoryContent>
            </StoryCard>
          ))}
        </StoryGrid>
      </Content>
    </Container>
  );
};

export default LoveStory;
