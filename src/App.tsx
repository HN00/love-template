import React, { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import ValentineCard from './components/ValentineCard';
import LoveStory from './components/LoveStory';

const HeartSVG = ({ style = {}, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CustomCursor: React.FC = () => {
  const mainCircle = useRef<HTMLDivElement>(null);
  const followCircle = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [cursorColor, setCursorColor] = useState('#ff6b6b');
  const bubbleId = useRef(0);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followX = mouseX;
    let followY = mouseY;
    let lastBubble = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mainCircle.current) {
        mainCircle.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (followCircle.current) {
        followCircle.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      // Detect hovered element color
      const el = document.elementFromPoint(e.clientX, e.clientY);
      let color = '#ff6b6b';
      if (el && el instanceof HTMLElement) {
        const attr = el.getAttribute('data-cursor-color');
        if (attr) color = attr;
      }
      setCursorColor(color);
      // Bubble every ~60ms
      const now = Date.now();
      if (now - lastBubble > 60) {
        setBubbles((b) => [
          ...b,
          {
            id: bubbleId.current++,
            x: mouseX + (Math.random() * 20 - 10),
            y: mouseY + (Math.random() * 20 - 10),
            size: 16 + Math.random() * 12,
            duration: 1200 + Math.random() * 600,
            dx: Math.random() * 40 - 20,
            color: color,
          },
        ]);
        lastBubble = now;
      }
    };

    const animate = () => {
      followX += (mouseX - followX) * 0.15;
      followY += (mouseY - followY) * 0.15;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Remove bubbles after animation
  useEffect(() => {
    if (!bubbles.length) return;
    const timers = bubbles.map((bubble) =>
      setTimeout(() => {
        setBubbles((b) => b.filter((x) => x.id !== bubble.id));
      }, bubble.duration)
    );
    return () => timers.forEach(clearTimeout);
  }, [bubbles]);

  return (
    <div
      className="overflow-wrapper pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
    >
      {/* Main heart cursor */}
      <div
        ref={mainCircle}
        className="circle"
        style={{
          position: 'fixed',
          left: -12,
          top: -12,
          width: 24,
          height: 24,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'background 0.2s',
        }}
      >
        <HeartSVG
          style={{
            width: 24,
            height: 24,
            color: cursorColor,
            filter: `drop-shadow(0 0 6px ${cursorColor}88)`,
          }}
        />
      </div>
      {/* Trailing glow */}
      <div
        ref={followCircle}
        className="circle-follow"
        style={{
          position: 'fixed',
          left: -18,
          top: -18,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: cursorColor + '22',
          pointerEvents: 'none',
          zIndex: 9999,
          filter: 'blur(6px)',
        }}
      />
      {/* Heart bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            position: 'fixed',
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: 0.7,
            animation: `bubbleUp${bubble.id} ${bubble.duration}ms linear forwards`,
          }}
        >
          <HeartSVG
            style={{
              width: bubble.size,
              height: bubble.size,
              color: bubble.color,
              opacity: 0.7,
            }}
          />
          <style>{`
            @keyframes bubbleUp${bubble.id} {
              0% { transform: translateY(0) scale(1); opacity: 0.7; }
              80% { opacity: 0.7; }
              100% { transform: translateY(-60px) translateX(${bubble.dx}px) scale(0.7); opacity: 0; }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showLoveStory, setShowLoveStory] = React.useState(false);

  return (
    <>
      <CustomCursor />
      {isLoading ? (
        <Loading onComplete={() => setIsLoading(false)} />
      ) : showLoveStory ? (
        <LoveStory />
      ) : (
        <ValentineCard onHeartClick={() => setShowLoveStory(true)} />
      )}
    </>
  );
};

export default App;
