const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const convertBlobToBase64s = async (images: string[]): Promise<string[]> => {
    const processedImages = await Promise.all(images.map(async (image) => {
        if (image?.startsWith('blob:')) {
            const base64Image = await convertBlobToBase64(image);
            return base64Image;
        }
        return image;
    }));
    return processedImages;
};

const convertBase64ToBlob = (base64: string): Blob => {
    const byteCharacters = atob(base64?.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
};

const convertBase64ImagesToBlobs = (base64Images: string[]): string[] => {
    return base64Images.map(base64Image => {
        if (base64Image?.startsWith('blob:')) {
            return base64Image;
        } else {
            return URL.createObjectURL(convertBase64ToBlob(base64Image));
        }
    });
};

const convertBase64ImageToBlob = (base64Image: string): string => {
    if (base64Image.startsWith('blob:')) {
        return base64Image;
    } else {
        return URL.createObjectURL(convertBase64ToBlob(base64Image));
    }
};

const blobToFile = async (blobUrl: string, filename: string) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}

export {
    convertBlobToBase64,
    convertBlobToBase64s,
    convertBase64ToBlob,
    convertBase64ImagesToBlobs,
    blobToFile,
    convertBase64ImageToBlob
}