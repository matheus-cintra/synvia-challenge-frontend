import { toast } from 'react-toastify';
import api from '../../services/api';

async function handleSubmit(data, formRef, profile, dispatch, setProfile) {
  try {
    formRef.current.setErrors({});

    const userData = await api.put(`/api/v1/update-account/${profile._id}`, {
      ...data,
    });

    const profileInfo = {
      user: userData.data.account,
    };

    if (data.oldPassword) formRef.current.setFieldValue('oldPassword', '');
    if (data.newPassword) formRef.current.setFieldValue('newPassword', '');

    dispatch(setProfile(profileInfo));
    toast.success('Perfil Atualizado.');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export { handleSubmit };
