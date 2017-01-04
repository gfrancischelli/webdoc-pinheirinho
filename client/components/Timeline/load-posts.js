const load = (page) => {
  const page_query = `?page=${page ? page : 0}`;

  const url =
    `http://104.236.198.234/api/timeline${page_query}`;

  return fetch( url )
    .then(res => {
      console.log(res)
      return res.json()
    })
}

export default load;
