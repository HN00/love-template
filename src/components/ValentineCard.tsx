import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeartSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CardContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 90%;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const Message = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const Heart = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2rem;
`;

const HeartButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  margin-top: 2rem;
  color: white;
  font-size: 3rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

interface ValentineCardProps {
  onHeartClick?: () => void;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onHeartClick }) => {
  const hearts = Array.from({ length: 10 }, (_, i) => i);

  const handleHeartClick = () => {
    if (onHeartClick) onHeartClick();
  };

  return (
    <CardContainer>
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
          <HeartSVG />
        </Heart>
      ))}
      <Card
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Happy Birthday, My Love!
        </Title>
        <Message
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Wishing the most wonderful birthday to the most wonderful person in my
          life. May your day be filled with laughter, love, and all your
          favorite things. I love you more than words can say!
        </Message>
        <HeartButton
          onClick={handleHeartClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <HeartSVG />
        </HeartButton>
      </Card>
    </CardContainer>
  );
};

export default ValentineCard;
