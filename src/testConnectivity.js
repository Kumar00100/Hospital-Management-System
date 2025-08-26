import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:3000/api/health';

const testConnectivity = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    console.log('Connectivity Test:', data);
  } catch (error) {
    console.error('Error connecting to the backend:', error);
  }
};

testConnectivity();
