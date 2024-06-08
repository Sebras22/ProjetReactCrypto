import { useEffect, useState } from "react";

const useApi = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMoneyInfo = async (url = "assets") => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.coincap.io/v2/${url}`);
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMoneyInfo(url);
  }, [url]);

  return { data, setData, getMoneyInfo, loading };
};

export default useApi;
