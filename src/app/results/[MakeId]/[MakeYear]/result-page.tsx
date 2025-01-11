import React from 'react';
import NotFound from './not-found';
import { Model } from '@/types/types';
import Link from 'next/link';

type Props = {
  data: {
    models: Array<Model>;
    MakeId: string;
    MakeYear: string;
  };
};

function ResultPage({ data: { models, MakeYear } }: Props) {
  if (!models || models.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-start p-10 lg:p-20">
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between w-full mb-4">
        <div className="text-xl font-bold flex gap-2 uppercase text-center">
          <p>
            {models[0]?.Make_Name} models made in {MakeYear}:
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 w-full text-black my-10">
        {models.map((model) => (
          <div
            key={model.Model_ID}
            className="bg-white h-40 rounded-lg p-6 flex flex-col gap-5 hover:bg-transparent hover:border-2 hover:text-white cursor-pointer"
          >
            <p className="text-3xl font-semibold">{model.Model_Name}</p>
            <p className="text-gray-400">
              {model.Make_Name} - {MakeYear}
            </p>
          </div>
        ))}
      </div>
      <Link href="/" className="flex justify-center w-full">
        <button className="bg-white text-black h-14 w-1/4 rounded-lg hover:bg-transparent hover:border-2 hover:text-white">
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default ResultPage;
