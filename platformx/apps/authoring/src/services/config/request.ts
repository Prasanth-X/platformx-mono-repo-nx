import axios from 'axios';
import { logoutUrl } from '../../utils/authConstants';
import { getSelectedSite } from '../../utils/helperFunctions';

const handleLogout = () => {
  const keycloakURL = logoutUrl;
  localStorage.removeItem('path');
  window.location.replace(keycloakURL);
};

export const getRequest = async (url) => {
  try {
    const res = await axios.get(process.env.REACT_APP_API_URI + url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401 && !url.includes('verify')) {
      handleLogout();
    }
    return err;
  }
};
export const getRequestFromDelivery = async (url) => {
  try {
    const res = await axios.get(process.env.REACT_APP_DELIVERY_URI + url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        sitename: getSelectedSite(),
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401 && !url.includes('verify')) {
      handleLogout();
    }
    return err;
  }
};

export const putRequest = async (url, payload) => {
  try {
    const res = await axios.put(process.env.REACT_APP_API_URI + url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
      withCredentials: true,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401) {
      handleLogout();
    }
    return err;
  }
};

export const postRequest = async (url, payload = {}) => {
  try {
    const res = await axios.post(process.env.REACT_APP_API_URI + url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
      withCredentials: true,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401) {
      handleLogout();
    }
    return err;
  }
};

export const commonPostApiCall = (url, payload = {}) => {
  try {
    return axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    return err.response;
  }
};

export const commonPutApiCall = (url, payload = {}) => {
  try {
    return axios.put(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    return err.response;
  }
};