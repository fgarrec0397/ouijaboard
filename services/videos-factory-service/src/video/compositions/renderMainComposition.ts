import { CanvasRenderingContext2D, Image } from "canvas";

import { interpolateKeyframes } from "../utils/interpolateKeyFrames";
import { renderOutro } from "./renderOutro";
import { renderThreePictures } from "./renderThreePictures";

export function renderMainComposition(
    context: CanvasRenderingContext2D,
    image1: Image,
    image2: Image,
    image3: Image,
    logo: Image,
    width: number,
    height: number,
    time: number
) {
    // Interpolate the x position to create a slide effect between the polaroid pictures scene
    // and the outro scene
    const slideProgress = interpolateKeyframes(
        [
            { time: 6.59, value: 0 },
            { time: 7.63, value: 1, easing: "cubic-in-out" },
        ],
        time
    );

    // Scene 1 – The three polaroid pictures

    // Move the slide over 25% of the canvas width while adjusting its opacity with globalAlpha
    context.save();
    context.translate(0.25 * width * -slideProgress, 0);
    context.globalAlpha = 1 - slideProgress;

    // Render the polaroid picture scene using relative sizes
    renderThreePictures(context, image1, image2, image3, 0.9636 * width, 0.8843 * height, time);

    context.restore();

    // Scene 2 – The outro

    // Move the slide over 25% of the canvas width while adjusting its opacity with globalAlpha
    context.save();
    context.translate(0.25 * width * (1 - slideProgress), 0);
    context.globalAlpha = slideProgress;
    context.fillStyle = "black";

    renderOutro(context, logo, width, height, time - 6.59);

    context.restore();
}
