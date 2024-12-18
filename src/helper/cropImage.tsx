import { Area } from 'react-easy-crop';

export const getCroppedImg = (imageSrc: string, crop: Area): Promise<string> => {
    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', error => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    return new Promise(async (resolve, reject) => {
        try {
            const image = await createImage(imageSrc);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) return null;

            const maxSize = Math.max(image.width, image.height);
            const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

            // set each dimensions to double largest dimension to allow for a safe area for the
            // image to rotate in without being clipped by canvas context
            canvas.width = safeArea;
            canvas.height = safeArea;

            // translate canvas context to a central location to allow rotating around the center.
            ctx.translate(safeArea / 2, safeArea / 2);
            ctx.translate(-safeArea / 2, -safeArea / 2);

            ctx.drawImage(
                image,
                safeArea / 2 - image.width * 0.5,
                safeArea / 2 - image.height * 0.5
            );

            const data = ctx.getImageData(0, 0, safeArea, safeArea);

            // set canvas width to final desired crop size - this will clear existing context
            canvas.width = crop.width;
            canvas.height = crop.height;

            // paste generated rotate image with correct offsets for x,y crop values.
            ctx.putImageData(
                data,
                0 - safeArea / 2 + image.width * 0.5 - crop.x,
                0 - safeArea / 2 + image.height * 0.5 - crop.y
            );

            // As Base64 string
            resolve(canvas.toDataURL('image/jpeg'));

            // As a blob
            // canvas.toBlob((file) => {
            //   resolve(URL.createObjectURL(file));
            // }, 'image/jpeg');
        } catch (error) {
            reject(error);
        }
    });
};
