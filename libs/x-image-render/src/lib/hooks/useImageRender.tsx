// useImageRender.js
import { useState, useEffect } from 'react';
import { usePostImageCrop } from './usePostImageCrop';
import { useTranslation } from 'react-i18next';
import { ShowToastError, ShowToastSuccess, nullToObject } from '@platformx/utilities';
export type UseImageRenderProps = {
    content: any;
    imgOrder: number;
    updateField: (value: any) => void; // Replace 'any' with the actual type of value
    originalImage: any; // Replace 'string' with the actual type of originalImage
    publishedImages: any[]; // Replace 'string' with the actual type of items in publishedImages array
    operationType: string; // Replace 'string' with the actual type of operationType
    resetSelectedImage: () => void;
    isArticleCrop: boolean;
    isCropLoading: boolean;
    isUploadArticle: boolean;
    count: React.MutableRefObject<number>;
    setShowCropPreview: (show: boolean) => void;
    setManualCropShow: (show: boolean) => void;
}
export const useImageRender = ({
    content,
    imgOrder,
    updateField,
    originalImage,
    publishedImages,
    operationType,
    resetSelectedImage,
    isArticleCrop,
    isCropLoading,
    isUploadArticle,
    count,
    setShowCropPreview,
    setManualCropShow
}: UseImageRenderProps) => {
    const { t } = useTranslation();

    const { postData, data, error: postError, isLoading } = usePostImageCrop();
    const { Thumbnail, bitStreamId } = content || {};
    const [processing, setProcessing] = useState(false);
    const [imageExtension, setImageExtension] = useState('');
    const [autoCropDone, setAutoCropDone] = useState(false);
    const [manualCropDone, setManualCropDone] = useState(false);
    const [selectedContent, setSelectedContent] = useState({});
    const [autoCroppedImages, setAutoCroppedImages] = useState<any>([]);
    const [manualCroppedImages, setManualCroppedImages] = useState<any>([]);

    const autoCrop = async () => {
        setProcessing(true);
        const payload = {
            url: Thumbnail,
            bitstreamId: bitStreamId,
            visibility: 'public',
        };

        try {
            await postData('api/v1/assets/image/auto-crop', payload);
            const { images = [], ext, original_image_relative_path = '', visibility = '' } = nullToObject(data)

            if (images?.length > 0) {
                setAutoCroppedImages(images);
                setImageExtension(ext);
                setAutoCropDone(true);
                setProcessing(false);
                setManualCropDone(false);

                if (isUploadArticle) {
                    count.current++;
                    count.current === 1 && ShowToastSuccess(`${t('auto_cropped_successfully')}`);
                } else {
                    ShowToastSuccess(`${t('auto_cropped_successfully')}`);
                }

                updateField({
                    Banner: Thumbnail,
                    published_images: images,
                    original_image: { original_image_relative_path, bitStreamId, auto: true, ext, visibility },
                });
            } else {
                ShowToastError(`${t('auto_cropping_failed')}`);
                setProcessing(false);
            }
        } catch (error) {
            console.error('Auto crop error:', error);
            ShowToastError(`${t('auto_cropping_failed')}`);
            setProcessing(false);
        }
    };

    const handleEdit = () => {
        setShowCropPreview(false);
        setManualCropShow(true);
    };

    const changeCrop = () => {
        setShowCropPreview(true);
    };

    useEffect(() => {
        if (isArticleCrop) {
            changeCrop();
        }
    }, [isArticleCrop]);

    useEffect(() => {
        if (publishedImages && publishedImages.length > 0 && operationType !== 'replace') {
            const { auto, ext } = originalImage || {};
            setImageExtension(ext);
            setSelectedContent(originalImage);

            if (auto) {
                setAutoCropDone(true);
                setManualCropDone(false);
                setAutoCroppedImages(publishedImages);
            } else {
                setManualCropDone(true);
                setAutoCropDone(false);
                setManualCroppedImages(publishedImages);
            }
        } else {
            if (bitStreamId) {
                setSelectedContent({});
                if (Thumbnail && originalImage?.original_image_relative_path !== Thumbnail) {
                    autoCrop();
                }
            }
        }
    }, [content]);

    return {
        processing,
        imageExtension,
        autoCropDone,
        manualCropDone,
        autoCroppedImages,
        manualCroppedImages,
        selectedContent,
        autoCrop,
        handleEdit,
        changeCrop,
    };
};
