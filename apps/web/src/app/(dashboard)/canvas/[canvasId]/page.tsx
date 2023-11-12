import React from 'react';
import dynamic from 'next/dynamic';

// Define the props that the Canvas component will accept
interface CanvasProps {
  canvasId: string;
}

// Use dynamic import with no SSR for the Canvas component
// and specify the CanvasProps interface for its props
const Canvas = dynamic<CanvasProps>(() => import('views/canvas'), {
  ssr: false,
}) as React.FC<CanvasProps>;

type Params = {
  params: {
    canvasId: string;
  };
};

const page: React.FC<{ params: Params['params'] }> = ({ params: { canvasId } }) => {
  return <Canvas canvasId={canvasId} />;
};

export default page;
