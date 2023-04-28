const uuid = require('uuid')

const news = []

const list = (request, response) =>{
  const {author_id, publish_date} = request.query


  if (author_id && publish_date) {
    newsFilter = news.filter(n => n.author_id === author_id && n.publish_date === publish_date)

    return response.json(newsFilter);
  }else if (author_id) {
    newsFilter = news.filter(n => n.author_id === author_id)

    return response.json(newsFilter);
  }else if(publish_date) {
    newsFilter = news.filter(n => n.publish_date === publish_date)

    return response.json(newsFilter);
  }


  return response.json(news);

}

const getById = (request, response) => {
  const { id } = request.params

  const newsId = news.find(n => n.id === id)

  if(!newsId){
    return response.status(400).json({
      error: '@news/getById',
      message: `news not found ${id}`
    })

  }

  return response.json(newsId)
}

const create = (request, response) => {
  const {title, brief, content, image, publish_date,} = request.body
  const id = uuid.v4()
  const author_id = request.author.id
  const createdAt = new Date()
  const modifiedAt = new Date()

  const newNews = {
    id,
    title,
    brief,
    content,
    author_id,
    image,
    publish_date,
    createdAt,
    modifiedAt,
  }
  
  news.push(newNews)

  return response.status(201).json(newNews)
}

const update = (request, response) => {
  const { id } = request.params;
  const {title, brief, content, image,} = request.body
  const modifiedAt = new Date();
  const newsIndex = news.findIndex(n => n.id === id)

  if(newsIndex < 0 ){
    return response.status(400).json({
      erro: `@news/update`,
      message: `news not foud ${id}`
    })
  }

  const createdAt = news[newsIndex].createdAt;
  const publish_date = news[newsIndex].publish_date;
  const author_id = news[newsIndex].author_id;

  const newsUpdated = {
    id,
    title,
    brief,
    content,
    author_id,
    image,
    publish_date,
    createdAt,
    modifiedAt,
  }

  news[newsIndex] = newsUpdated

  return response.status(201).json(newsUpdated)

}

const remove = (request, response) => {
  const { id } = request.params;
  
  const newsIndex = news.findIndex(n => n.id === id)

  if(newsIndex < 0 ){
    return response.status(400).json({
      erro: `@news/update`,
      message: `news not foud ${id}`
    })
  }

  news.splice(newsIndex, 1)

  return response.send()
} 

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};