const checkImg = async (url: string): Promise<boolean> => {
  const status = await fetch(url, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => res.ok)
    .catch(() => false);

  return status;
};

export { checkImg };
