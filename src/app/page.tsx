'use client';
import fetchMakes from '@/actions/fetchMakes';
import { Button, Select } from '@/styled/styled';
import { Make } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const isButtonDisabled = !selectedMake || !selectedYear;

  const router = useRouter();

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2015;

    const yearRange = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    );
    setYears(yearRange);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/results/${selectedMake}/${selectedYear}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMakes();
        setMakes(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    getYears();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-11/12 md:w-8/12 lg:w-2/4 h-max p-5 md:p-10 text-black rounded-xl">
        <h1 className="text-3xl">Car Dealer App</h1>
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Car Brand</label>
            <Select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
              }}
            >
              <option value="">Select Brand</option>
              {makes &&
                makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Establish Year</label>
            <Select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
            >
              <option value="">Select Year</option>
              {years &&
                years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex justify-center mt-5">
            <Button disabled={isButtonDisabled}>Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
