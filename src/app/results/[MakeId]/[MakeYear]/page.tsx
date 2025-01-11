import fetchMakes from '@/actions/fetchMakes';
import fetchModels from '@/actions/fetchModels';
import ResultPage from './result-page';
import NotFound from './not-found';
import { Make } from '@/types/types';

type Params = {
  MakeId: string;
  MakeYear: string;
};

type Props = {
  params: Params;
};

export default async function Page({ params: { MakeId, MakeYear } }: Props) {
  try {
    const models = await fetchModels(MakeId, MakeYear);
    const makes = await fetchMakes();

    const make = makes.find((make: Make) => make.MakeId.toString() === MakeId);

    if (!make || models.length === 0) {
      return <NotFound />;
    }

    return <ResultPage data={{ models, MakeId, MakeYear }} />;
  } catch (error) {
    console.error('Error:', error);
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  try {
    const makes = await fetchMakes();
    const currentYear = new Date().getFullYear();
    const startYear = 2015;

    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
      (currentYear - i).toString()
    );

    const paths = makes.flatMap((make: Make) =>
      years.map((year) => ({
        params: {
          MakeId: make.MakeId.toString(),
          MakeYear: year,
        },
      }))
    );

    return paths;
  } catch (error) {
    console.error('Error with static params:', error);
    return [];
  }
}
