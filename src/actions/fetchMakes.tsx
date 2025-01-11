import axios from 'axios';

export default async function fetchMakes() {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/GetMakesForVehicleType/car?format=json`;

  if (!apiUrl) {
    throw new Error('The Api URL is not correct!');
  }

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data.Results || [];
  } catch (error) {
    console.log(error);
  }
}
