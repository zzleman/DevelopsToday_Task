import { Model } from '@/types/types';
import axios from 'axios';

export default async function fetchModels(MakeId: string, MakeYear: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/GetModelsForMakeIdYear/makeId/${MakeId}/modelyear/${MakeYear}?format=json`;

  if (!apiUrl) {
    throw new Error('The Api URL is not right!');
  }

  try {
    const response = await axios.get(apiUrl);
    const data = response.data?.Results;

    if (!data) {
      return [];
    }

    const uniqueData = data.filter(
      (model: Model, index: number, self: Model[]) =>
        index === self.findIndex((m) => m.Model_ID === model.Model_ID)
    );

    return uniqueData;
  } catch (error) {
    console.error('Error fetching models:', error);

    return [];
  }
}
