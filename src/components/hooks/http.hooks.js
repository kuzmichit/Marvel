import {useState, useCallback} from 'react';

export const useHttp= () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body=null, headers = {'Content-Type': 'Application/json'} ) => {
    setLoading(true);

    try {
      const response = await fetch(url, {method, body, headers} );
      
      if(!response.ok) {
        throw new Error(`Non e stato trovato ${url}`);
      }
      const data = response.json();
      setLoading(false);

      return data;

    }
    catch (e) {
      setLoading(false);
      setError(e.message);
      throw(e);
    }
  }, [] );

  const clearError = () => setError(null), [] ); 

  return {loading, error, request, clearError};
};