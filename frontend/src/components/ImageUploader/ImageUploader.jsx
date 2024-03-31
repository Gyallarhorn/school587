import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import UploadIcon from '../../assets/upload.svg?react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import './index.css';
import { toast } from "react-toastify";
import cropImage from "../../utils/cropImage";

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 0.83;

const ImageUploader = ({ uploadedImage, onImageChange }) => {
  const inputRef = useRef(null);
  const imageRef = useRef(null);
  const [crop, setCrop] = useState();
  const [isOpenModal, setOpenModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          toast.error('Изображение не может быть меньше 150x150 пикселей');
          setOpenModal(false);
          setImageSrc('');
          onImageChange(null);
          return;
        }
      });
      setDisabled(false);
      onImageChange(file);
      setOpenModal(true);
      setImageSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const handleImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWithInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWithInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleImageCrop = (e) => {
    if (e.target.disabled) {
      return;
    }
    const imageCanvas = cropImage(imageRef.current, convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height));
    const dataUrl = imageCanvas.toDataURL(uploadedImage.type);
    let newFile = null;
    imageCanvas.toBlob((blob) => {
      if (blob) {
        newFile = new File([blob], uploadedImage.name, { type: uploadedImage.type });
        onImageChange(newFile);
      }
    }, uploadedImage.type, 1);

    setDisabled(true);
    setImageSrc(dataUrl);
    setOpenModal(false);
  };

  return (
    <div className="form-wrapper uploader-wrapper">
      {!uploadedImage ?
        (<>
          <p className="uploader-wrapper-text">Выберите фотографию и&nbsp;приложите&nbsp;ее</p>
          <p className="uploader-wrapper-text uploader-text-additional">Спозиционируйте изображение так, чтобы лицо было расположено в верхней трети фотографии</p>
          <button
            type="button"
            className="upload-button"
            onPointerDown={() => inputRef.current.click()}
            onKeyDown={(e) => {
              if (e.code === 'Enter' || e.code === 'Space') {
                inputRef.current.click();
              }
            }}
          >
            <UploadIcon className="upload-icon" />
            <span>Загрузить</span>
          </button>
        </>
        )
        :
        (
          <>
            <p className="uploader-wrapper-text">Фотография успешно загружена</p>
            {imageSrc && !isOpenModal && (
              <div className="preview-conainer">
                <img className="preview-image" src={imageSrc} alt="Загруженная фото" />
              </div>
            )}
            <button
              className="preview-delete-button"
              type="button"
              onClick={() => {
                onImageChange(null);
                setImageSrc('');
              }}
            >
              Удалить
            </button>
          </>

        )
      }
      {imageSrc && (
        <div className={`modal-container ${isOpenModal ? 'modal-open' : ''}`}>
          <div className="modal">
            <div className="modal-content">
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <img ref={imageRef} src={imageSrc} alt="Фотография для обработки" onLoad={handleImageLoad} />
              </ReactCrop>
              <button
                type="button"
                className="modal-button upload-button"
                onPointerDown={(e) => handleImageCrop(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    handleImageCrop(e);
                  }
                }}
                disabled={isDisabled}
              >
                Обрезать
              </button>
            </div>
          </div>
        </div>
      )}

      <label htmlFor="image" className="visually-hidden">Загрузите фотографию</label>
      <input
        className="input-file"
        ref={inputRef}
        type="file"
        name="image"
        id="image"
        onChange={(e) => handleInputChange(e)}
        accept="image/webp,image/png,image/jpeg,image/jpg"
      />
    </div>
  );
};

ImageUploader.propTypes = {
  uploadedImage: PropTypes.object,
  onImageChange: PropTypes.func,
};

export default ImageUploader;
