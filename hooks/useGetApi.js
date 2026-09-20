import { useEffect, useState } from 'react';

export default function useGetApi(callback) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const response = await callback();
      return response;
    };

    if (!data) {
      getData().then(data => {
        setData(data);
        setIsLoading(false);
      });
    }
  }, [data, callback]);
  return { data, isLoading };
}
