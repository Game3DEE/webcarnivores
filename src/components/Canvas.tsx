//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
import React from 'react';

interface CanvasProps {
    width?: number;
    height?: number;
    drawContent?: (context: CanvasRenderingContext2D) => void;
}

const Canvas: React.FC<CanvasProps> = ({drawContent, width, height, ...props}) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (canvas && context) {
            if (width !== undefined) {
                context.canvas.width = width;
            }
            if (height !== undefined) {
                context.canvas.height = height;
            }
            if (drawContent) {
                drawContent(context);
            } else {
                context.fillStyle = '#000000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
        }
    }, [drawContent, height, width])


    return (
        <canvas
            ref={canvasRef}
            {...props}
        />
    );
}

export default Canvas;
