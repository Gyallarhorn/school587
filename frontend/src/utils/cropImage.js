const isiOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const getMaxCanvasSize = () => isiOS() ? 4096 * 4096 : 10000 * 10000;

const limitSize = (size, maximumPixels) => {
  const { width, height } = size;
  const requiredPixels = width * height;

  if (requiredPixels <= maximumPixels) {
    return { width, height, scalar: 1 };
  }

  const scalar = Math.sqrt(maximumPixels) / Math.sqrt(requiredPixels);

  return {
    width: Math.floor(width * scalar),
    height: Math.floor(height * scalar),
    scalar,
  };
};

const cropImage = (image, crop) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const { width, height, scalar } = limitSize({
    width: Math.floor(crop.width * scaleX * pixelRatio),
    height: Math.floor(crop.height * scaleY * pixelRatio),
  }, getMaxCanvasSize());

  canvas.width = width;
  canvas.height = height;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();

  const cropX = crop.x * scaleX * scalar;
  const cropY = crop.y * scaleY * scalar;

  ctx.translate(-cropX, - cropY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth * scalar,
    image.naturalHeight * scalar,
  );

  ctx.restore();

  return canvas;
};

export default cropImage;
