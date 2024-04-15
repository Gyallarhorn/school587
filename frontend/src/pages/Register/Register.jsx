import { useState } from 'react';
import Select from '../../components/Select/Select';
import { errorText, inputRegexp, letters } from '../../utils/constants';
import './index.css';
import { useNavigate } from "react-router-dom";
import { useFetchEcomonicActivitiesQuery } from '../../redux/api/activities';
import { toast } from 'react-toastify';
import useDelayedApiQuery from '../../hooks/useDelayedApiQuery';
import PopUp from '../../components/PopUp/PopUp';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import { validateForm } from '../../utils/validator';
import { useCreateUserMutation, useUploadImageMutation } from '../../redux/api/users';

const Register = () => {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    year: '',
    letter: '',
    phone: '',
    email: '',
    social: '',
    almaMater: '',
    position: '',
    workplace: '',
    economic: '',
    success: '',
    isSuccess: '',
    achievement: '',
    defineSuccess: '',
    successSource: '',
    mistakes: '',
    wish: '',
    wishToGraduates: '',
    photo: '',
    isPermitted: false,
  });
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: economic, isSuccess: isSuccessEconomic, isError: isEconomicError } = useFetchEcomonicActivitiesQuery();
  const { data: universities, isSuccess: isSuccessUniversities } = useDelayedApiQuery({ university: info.almaMater }, 500);

  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();

  if (isEconomicError) {
    toast.error('Не удалось получить экономическую деятельность');
  }

  const handlePopupClick = (e) => {
    if (e.target && e.target.closest('.popup-option')) {
      setOpen(false);
      setInfo((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.textContent,
      }));
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      e.target.value = e.target.value.replace(/\D/g, '');
      let newValue = `+${e.target.value.slice(0, 1)} ${e.target.value.slice(1, 4)} ${e.target.value.slice(4, 7)} ${e.target.value.slice(7, 9)} ${e.target.value.slice(9, 11)}`;

      if (e.target.value.length > 11) {
        newValue = `+${e.target.value.slice(0, 2)} ${e.target.value.slice(2, 5)} ${e.target.value.slice(5, 8)} ${e.target.value.slice(8, 10)} ${e.target.value.slice(10, 12)}`;
      }

      e.target.value = newValue.trim();
    }

    if (e.target.name === 'almaMater') {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (e.target.name === 'isPermitted') {
      setInfo((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.checked,
      }));
      return;
    }


    setInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSelectClick = (e) => {
    setInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.textContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(info, inputRegexp, errorText);

    if (!isValid) {
      return;
    }

    try {
      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.photo;
        } else {
          toast.error('Не удалось загрузиь изображение');
          return;
        }
      }

      const createUserResponse = await createUser({
        ...info,
        photo: uploadedImagePath,
      });

      if (createUserResponse.error) {
        toast.error(createUserResponse.error.data?.message);
        return;
      }

      navigate('/');
      scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      setInfo({
        firstName: '',
        lastName: '',
        middleName: '',
        year: '',
        letter: '',
        phone: '',
        email: '',
        social: '',
        almaMater: '',
        position: '',
        workplace: '',
        economic: '',
        success: '',
        isSuccess: '',
        achievement: '',
        defineSuccess: '',
        successSource: '',
        mistakes: '',
        wish: '',
        wishToGraduates: '',
        photo: '',
        isPermitted: false,
      });

      toast.success('Вы успешно добавлены в систему');
    } catch (err) {
      toast.error('Не удалось создать выпускника');
      return;
    }
  };

  return (
    <>
      <h1 className="main-header form-header">Регистрация профиля выпусника</h1>
      <form
        className="register-form"
        onClick={(e) => handlePopupClick(e)}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="form-title">персональная информация</h2>
        <fieldset className="personal-info fieldset">
          <div className="form-wrapper">
            <label htmlFor="lastName" className="input-label">Фамилия *</label>
            <input
              className="input register-input"
              type="text"
              placeholder="Иванов"
              id="lastName"
              name="lastName"
              required={true}
              value={info.lastName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="firstName" className="input-label">Имя *</label>
            <input
              className="input register-input"
              type="text"
              placeholder="Иван"
              id="firstName"
              name="firstName"
              required={true}
              value={info.firstName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="middleName" className="input-label">Отчество</label>
            <input
              className="input register-input"
              type="text"
              placeholder="Иванович"
              id="middleName"
              name="middleName"
              value={info.middleName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="email" className="input-label">Электронная почта *</label>
            <input
              className="input register-input"
              type="text"
              placeholder="testmail@mail.ru"
              id="email"
              name="email"
              required={true}
              value={info.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="year" className="input-label">Год выпуска *</label>
            <input
              className="input register-input"
              type="number"
              placeholder="2023"
              id="year"
              name="year"
              required={true}
              value={info.year}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <span className="input-label">Класс *</span>
            <Select field="Класс"
              data={letters}
              isSuccess={true}
              nameValue="letter"
              defaultName="letter"
              onFieldClick={(e) => handleSelectClick(e)}
              registerClassName={true}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="phone" className="input-label">Мобильный телефон *</label>
            <input
              className="input register-input"
              type="text"
              placeholder="+1 234 567 89 10"
              id="phone"
              name="phone"
              required={true}
              value={info.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="social" className="input-label">Ссылка на социальную сеть</label>
            <input
              className="input register-input"
              type="text"
              placeholder="https://examplelink"
              id="social"
              name="social"
              value={info.social}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <ImageUploader
            uploadedImage={selectedImage}
            onImageChange={(newValue) => setSelectedImage(newValue)}
          />
        </fieldset>
        <h2 className="form-title">работа и учеба</h2>
        <fieldset className="work-info fieldset">
          <div className="form-wrapper">
            <label htmlFor="almaMater" className="input-label">Место учебы</label>
            <input
              className="input register-input"
              type="text"
              placeholder="СПбГУ"
              id="almaMater"
              name="almaMater"
              value={info.almaMater}
              onChange={(e) => handleChange(e)}
            />
            {isSuccessUniversities && universities.length > 0 && <PopUp
              isOpen={isOpen}
              isDefault={false}
              nameValue="almaMater"
              data={universities}
              registerClassName={true}
            />}
          </div>
          <div className="form-wrapper">
            <label htmlFor="position" className="input-label">Должность</label>
            <input
              className="input register-input"
              type="text"
              placeholder="Аналитик по безопаности"
              id="position"
              name="position"
              value={info.position}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="workplace" className="input-label">Место работы</label>
            <input
              className="input register-input"
              type="text"
              placeholder="Сбербанк"
              id="workplace"
              name="workplace"
              value={info.workplace}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <span className="input-label">Сфера деятельности *</span>
            <Select field="Сфера деятельности"
              data={economic}
              isSuccess={isSuccessEconomic}
              nameValue="economic"
              defaultName="economic"
              onFieldClick={(e) => handleSelectClick(e)}
              registerClassName={true}
            />
          </div>
        </fieldset>

        <h2 className="form-title open-questions-title">открытые вопросы</h2>
        <p className="form-subtitle">Просим Вас ответить на&nbsp;них вдумчиво. Нынешним гимназистам важны ваши мысли о&nbsp;жизни.</p>
        <fieldset className="additional-info fieldset">
          <div className="form-wrapper">
            <label htmlFor="success" className="input-label">Что для Вас успех?</label>
            <textarea
              className="input register-input"
              id="success"
              name="success"
              value={info.success}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="isSuccess" className="input-label">Вы считаете себя успешным человеком?</label>
            <textarea
              className="input register-input"
              id="isSuccess"
              name="isSuccess"
              value={info.isSuccess}
              onChange={(e) => handleChange(e)}
              rows={1}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="achievement" className="input-label">Перечислите три своих главных достижения в&nbsp;жизни</label>
            <textarea
              className="input register-input"
              id="achievement"
              name="achievement"
              value={info.achievement}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="defineSuccess" className="input-label">Как изменилось Ваше представление об&nbsp;успехе с&nbsp;момента выпуска из&nbsp;школы?</label>
            <textarea
              className="input register-input"
              id="defineSuccess"
              name="defineSuccess"
              value={info.defineSuccess}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="successSource" className="input-label">Что помогло Вам добиться успеха?</label>
            <textarea
              className="input register-input"
              id="successSource"
              name="successSource"
              value={info.successSource}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="mistakes" className="input-label">Были&nbsp;ли ошибки, которые помогли Вам добиться успеха?</label>
            <textarea
              className="input register-input"
              id="mistakes"
              name="mistakes"
              value={info.mistakes}
              onChange={(e) => handleChange(e)}
              rows={1}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="wish" className="input-label">Ваше пожелание Гимназии</label>
            <textarea
              className="input register-input"
              id="wish"
              name="wish"
              value={info.wish}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="wishToGraduates" className="input-label">Ваше пожелание выпускникам Гимназии текущего года</label>
            <textarea
              className="input register-input"
              id="wishToGraduates"
              name="wishToGraduates"
              value={info.wishToGraduates}
              onChange={(e) => handleChange(e)}
              rows={6}
            />
          </div>
          <div className="permission-wrapper">
            <input
              type="checkbox"
              name="isPermitted"
              id="isPermitted"
              className="input-checkbox visually-hidden"
              checked={info.isPermitted}
              onChange={(e) => handleChange(e)}
            />
            <label className="input-label checkbox-label" htmlFor="isPermitted">Можно&nbsp;ли опубликовать Ваши данные (кроме номера телефона) и фотографию на&nbsp;сайт?</label>
          </div>
        </fieldset>
        <button
          type="submit"
          className="submit-button"
          disabled={!info.firstName || !info.lastName || !info.year || !info.phone || !info.email || isCreatingUser || isUploadingImage || !info.economic}
        >
          {isCreatingUser || isUploadingImage ? 'Загрузка' : 'Отправить'}
        </button>
      </form>
    </>
  );
};

export default Register;
