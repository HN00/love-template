import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const WelcomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled(motion.img)`
  width: 200px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: 'Sacramento', cursive;
`;

const Instructions = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const ContinueButton = styled(motion.button)`
  background: white;
  color: #ff6b6b;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 2rem;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

interface WelcomeProps {
  onContinue: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onContinue }) => {
  return (
    <WelcomeContainer>
      <Logo
        src="/logo.svg"
        alt="Love Template Logo"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <Title
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Love Template!
      </Title>
      <Instructions>
        <h2>Get Connected</h2>
        <p>
          <strong>Wifi:</strong> Love Network
        </p>
        <p>
          <strong>Password:</strong> Love123
        </p>
        <hr />
        <h2>Download & Install</h2>
        <ol>
          <li>Download the template files</li>
          <li>Install dependencies with npm install</li>
          <li>Run the project with npm start</li>
        </ol>
      </Instructions>
      <ContinueButton
        onClick={onContinue}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Continue to Valentine's Card
      </ContinueButton>
    </WelcomeContainer>
  );
};

export default Welcome;
