const get_query_data = (query) => {
  const {limit=10,skip=0,...restQueryData}=query
  const filter_aggregation={}
  const filter={}
  Object.keys(restQueryData).map(key=>{
    filter_aggregation[key]={ $regex: restQueryData[key]||'', $options: 'i' }
    filter[key]=restQueryData
  })
  return {
    limit: parseInt(limit) || 10,
    skip: parseInt(skip) || 0,
    filter_aggregation,
    filter
  }
};

const get_params_data = (params) => ({
  _id: params.id || '',
});

module.exports = {get_query_data,get_params_data};
