import { Html, useProgress } from '@react-three/drei';
import logo from '/public/logo.png';

export const LoadingSpinner = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <img src={logo} alt="Chermiti Logo" className="h-20 w-auto mb-6 object-contain bg-transparent" />
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-sm text-gray-300 mt-2">{Math.round(progress)}% complete</div>
      </div>
    </Html>
  );
};
