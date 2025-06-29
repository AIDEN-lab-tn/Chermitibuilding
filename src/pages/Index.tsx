import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { ScrollController } from '@/components/ScrollController';
import { Scene3D } from '@/components/Scene3D';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ContentSections } from '@/components/ContentSections';
import { Navigation } from '@/components/Navigation';
import { Preloader } from '@/components/Preloader';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Footer } from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThreeErrorBoundary } from '@/components/ThreeErrorBoundary';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setIsLoading(true);
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setShowMainContent(true);
  };

  return (
    <ThemeProvider>
      <div className="relative">
        {/* Welcome Screen */}
        {showWelcome && (
          <WelcomeScreen onStart={handleWelcomeStart} />
        )}

        {/* Preloader */}
        {isLoading && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}

        {/* Main Content */}
        {showMainContent && (
          <>
            {/* Fixed 3D Canvas */}
            <div className="fixed inset-0 z-0">
              <ThreeErrorBoundary>
                <Canvas
                  shadows
                  camera={{ position: [109, 5, 109], fov: 60 }}
                  gl={{ antialias: true, alpha: true }}
                  onCreated={({ gl }) => {
                    gl.setClearColor('#000000', 0);
                  }}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <Scene3D />
                    <ScrollController />
                  </Suspense>
                </Canvas>
              </ThreeErrorBoundary>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Scrollable Content */}
            <div className="relative z-10">
              <ContentSections />
              <Footer />
            </div>

            {/* Progress Bar */}
            <ScrollProgressBar />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;