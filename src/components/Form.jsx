import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';

const Form = () => {
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      position: '',
      locality: '',
      target: '',
      numberOfTargets: '',
      range: '',
      azimuth: '',
      course: '',
      speed: '',
      time: '',
      found: '',
      fire: '',
      result: '',
      weapon: [],
      consumption: '',
    },
  });

  useFormPersist('targetForm', { watch, setValue, storage: window.localStorage });

  const [isTrackingAzimuth, setIsTrackingAzimuth] = useState(false);
  const [isTrackingCourse, setIsTrackingCourse] = useState(false);
  const [fixedAzimuth, setFixedAzimuth] = useState(null);
  const [fixedCourse, setFixedCourse] = useState(null);

  useEffect(() => {
    const savedPosition = localStorage.getItem('position');
    reset({
      position: savedPosition || '',
      locality: '',
      target: '',
      numberOfTargets: '',
      range: '',
      azimuth: '',
      course: '',
      speed: '',
      time: '',
      found: '',
      fire: '',
      result: '',
      weapon: [],
      consumption: '',
    });
  }, [reset]);

  useEffect(() => {
    const subscription = watch(value => {
      if (value.position !== undefined) {
        localStorage.setItem('position', value.position);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setValue('time', getCurrentTime());
  }, [setValue]);

  const fetchLocality = () => {
    if (!navigator.geolocation) {
      alert('Геолокація не підтримується вашим браузером!');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Неможливо отримати дані про місцезнаходження!');
          }

          const data = await response.json();
          const locality =
            data.address.city || data.address.town || data.address.village || 'Невідоме місце';

          setValue('locality', locality);
        } catch (error) {
          console.error('Помилка при отриманні населеного пункту:', error);
          alert('Не вдалось отримати населений пункт.');
        }
      },
      error => {
        console.error('Помилка геолокації:', error);
        alert('Не вдалося одержати дані геолокації.');
      }
    );
  };

  const startAzimuthTracking = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission !== 'granted') {
        alert('Доступ до компаса відхилено!');
        return;
      }
    }

    setIsTrackingAzimuth(true);

    window.addEventListener('deviceorientation', updateAzimuth);
  };

  const stopAzimuthTracking = () => {
    window.removeEventListener('deviceorientation', updateAzimuth);
    setIsTrackingAzimuth(false);
    setFixedAzimuth(watch('azimuth'));
  };

  const updateAzimuth = event => {
    if (event.alpha !== null) {
      setValue('azimuth', Math.round(360 - event.alpha));
    }
  };

  const startCourseTracking = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission !== 'granted') {
        alert('Доступ до компаса відхилено!');
        return;
      }
    }

    setIsTrackingCourse(true);
    window.addEventListener('deviceorientation', updateCourse);
  };

  const stopCourseTracking = () => {
    window.removeEventListener('deviceorientation', updateCourse);
    setIsTrackingCourse(false);
    setFixedCourse(watch('course'));
  };

  const updateCourse = event => {
    if (event.alpha !== null) {
      setValue('course', Math.round(360 - event.alpha));
    }
  };

  const onSubmit = data => {
    const sanitizedData = {
      П: data.position || '-',
      'н.п.': data.locality || '-',
      Ціль: data.target || '-',
      Кількість: data.numberOfTargets || '-',
      Відстань: data.range || '-',
      А: fixedAzimuth || '-',
      К: fixedCourse || '-',
      Швидкість: data.speed || '-',
      Час: data.time || '-',
      Виявив: data.found || '-',
      Вогонь: data.fire || '-',
      Результат: data.result || '-',
      'Робота суміжних підрозділів': data.weapon.length > 0 ? data.weapon.join(', ') : '-',
      Розхід: data.consumption || '-',
    };

    const message = [
      `Сектор "Захід" (1020 зрап)`,
      `зрадн в/ч 3027`,
      ...Object.entries(sanitizedData).map(([key, value]) => `${key}: ${value}`),
    ].join('\n');

    if (navigator.share) {
      navigator
        .share({
          title: 'Повідомлення',
          text: message,
        })
        .then(() => console.log('Повідомлення надіслано'))
        .catch(error => console.error('Помилка при надсиланні:', error));
    } else {
      navigator.clipboard.writeText(message).then(() => {
        alert('Дані скопійовано у буфер обміну!');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
      <p className="dark:text-gray-400">Сектор "Захід" (1020 зрап)</p>
      <p className="pb-4 dark:text-gray-400">зрадн в/ч 3027</p>

      <div className="pb-4">
        <label className="label" htmlFor="position">
          Позиція:
        </label>
        <input className="input" id="position" {...register('position')} />
      </div>

      <div className="pb-4">
        <div className="flex justify-between pb-2">
          <label className="label" htmlFor="locality">
            Населений пункт:
          </label>
          <button type="button" className="button py-0" onClick={fetchLocality}>
            Отримати населений пункт
          </button>
        </div>
        <input className="input" id="locality" {...register('locality')} />
      </div>

      <div className="pb-4">
        <label className="label pb-2">Ціль:</label>
        <div className="grid grid-cols-2">
          {[
            'КР (Крилата Ракета)',
            'ЛМ (Літак Малий)',
            'Б (БПЛА)',
            'Г (Гелікоптер)',
            'К (Квадрокоптер)',
            'ЛВ (Літак Великий)',
            'Постріли',
            'З (Зонд)',
            'Вибухи',
            'Виходи',
          ].map(target => (
            <label key={target} className="label-radio">
              <input
                className="input-radio"
                type="radio"
                value={target}
                checked={watch('target') === target}
                onClick={() => {
                  const currentValue = watch('target');
                  setValue('target', currentValue === target ? '' : target);
                }}
              />
              {target}
            </label>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <label className="label" htmlFor="numberOfTargets">
          Кількість цілей:
        </label>
        <input className="input" id="numberOfTargets" {...register('numberOfTargets')} />
      </div>

      <div className="pb-4">
        <div className="flex justify-between">
          <label className="label mr-2" htmlFor="range">
            Відстань до цілі (м):
          </label>
          <div>
            <button
              type="button"
              className="button mr-2"
              onClick={() => setValue('range', '2000+')}
            >
              2+ км
            </button>
            <button
              type="button"
              className="button mr-2"
              onClick={() => setValue('range', '5000+')}
            >
              5+ км
            </button>
            <button type="button" className="button" onClick={() => setValue('range', '10000+')}>
              10+ км
            </button>
          </div>
        </div>
        <input
          className="input"
          type="text"
          id="range"
          {...register('range')}
          value={watch('range')}
          onChange={e => setValue('range', e.target.value)}
        />
      </div>

      <div className="pb-4">
        <div className="flex justify-between">
          <label className="label" htmlFor="azimuth">
            Азимут цілі:
          </label>
          <div>
            {isTrackingAzimuth ? (
              <button type="button" className="red" onClick={stopAzimuthTracking}>
                Зупинити
              </button>
            ) : (
              <button type="button" className="button" onClick={startAzimuthTracking}>
                Отримати дані з компасу
              </button>
            )}
          </div>
        </div>
        <input
          className="input"
          id="azimuth"
          type="number"
          value={fixedAzimuth !== null ? fixedAzimuth : watch('azimuth')}
          onChange={e => {
            setFixedAzimuth(e.target.value);
            setValue('azimuth', e.target.value);
          }}
        />
      </div>

      <div className="pb-4">
        <div className="flex justify-between">
          <label className="label" htmlFor="course">
            Курс цілі:
          </label>
          <div>
            {isTrackingCourse ? (
              <button type="button" className="red" onClick={stopCourseTracking}>
                Зупинити
              </button>
            ) : (
              <button type="button" className="button" onClick={startCourseTracking}>
                Отримати дані з компасу
              </button>
            )}
          </div>
        </div>
        <input
          className="input"
          id="course"
          type="number"
          value={fixedCourse !== null ? fixedCourse : watch('course')}
          onChange={e => {
            setFixedCourse(e.target.value);
            setValue('course', e.target.value);
          }}
        />
      </div>

      <div className="pb-4">
        <div className="flex justify-between">
          <label className="label" htmlFor="speed">
            Швидкість цілі:
          </label>
        </div>
        <input className="input" id="speed" {...register('speed')} />
      </div>

      <div className="pb-4">
        <div className="flex justify-between">
          <label className="label" htmlFor="time">
            Час виявлення цілі:
          </label>
        </div>
        <input className="input" id="time" {...register('time')} defaultValue={getCurrentTime()} />
      </div>

      <div className="pb-4">
        <label className="label">Виявив:</label>
        <div className="grid grid-cols-2">
          {['Акустично', 'Візуально', 'Радіолокаційно'].map(found => (
            <label key={found} className="label-radio">
              <input
                className="input-radio"
                type="radio"
                value={found}
                checked={watch('found') === found}
                onClick={() => {
                  const currentValue = watch('found');
                  setValue('found', currentValue === found ? '' : found);
                }}
              />
              {found}
            </label>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <label className="label">Вогонь:</label>
        <div className="grid grid-cols-2">
          {['Відкривали', 'Не відкривали'].map(fire => (
            <label key={fire} className="label-radio">
              <input
                className="input-radio"
                type="radio"
                value={fire}
                checked={watch('fire') === fire}
                onClick={() => {
                  const currentValue = watch('fire');
                  setValue('fire', currentValue === fire ? '' : fire);
                }}
              />
              {fire}
            </label>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <label className="label">Результат:</label>
        <div className="grid grid-cols-2">
          {['Знищена', 'Обстріляна'].map(result => (
            <label key={result} className="label-radio">
              <input
                className="input-radio"
                type="radio"
                value={result}
                checked={watch('result') === result}
                onClick={() => {
                  const currentValue = watch('result');
                  setValue('result', currentValue === result ? '' : result);
                }}
              />
              {result}
            </label>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <label className="label">Робота суміжних підрозділів:</label>
        <div className="grid grid-cols-2">
          {['ППО', 'ПЗРК', 'ЗУ', 'Кулемет'].map(weapon => (
            <label key={weapon} className="label-radio">
              <input
                className="input-radio"
                type="checkbox"
                value={weapon}
                {...register('weapon')}
              />
              {weapon}
            </label>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <label className="label" htmlFor="consumption">
          Розхід БК:
        </label>
        <input className="input" id="consumption" {...register('consumption')} />
      </div>

      <button
        type="submit"
        className="flex bg-indigo-500 rounded text-white px-2 text-xl m-auto hover:bg-indigo-600 focus:bg-indigo-600"
      >
        Поширити
      </button>
    </form>
  );
};

export default Form;
