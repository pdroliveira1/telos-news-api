const uuid = require('uuid')

const {generateHash} = require("../utils/hashProvider")

const authors = []

const list = (request, response) => {

  return response.json(authors);

}

const getById = (request, response) => {
  const { id } = request.parans;

  const author = authors.find((u) => u.id === id);

  if(!author){
    return response.status(400).json({
      error: '@author/getById',
      message: `author not found ${id}`
    })
  }
  
  return response.json(author);
}

const create = async (request, response) => {
  const {name, biography, email, password} = request.body;
  const id = uuid.v4()
  const createdAt = new Date()
  const modifiedAt = new Date()
  const hashedPassword = await generateHash(password)

  const author = authors.find((u) => u.email === email);
  if(author){
    return response.status(422).json({
      error: '@author/create',
      message: `author already registered`
    })
  }

  const newAuthor = {
    id,
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt,
    modifiedAt,
  }
  
  authors.push(newAuthor)

  return response.status(201).json(newAuthor)
}

const update = async (request, response) => {
  const { id } = request.params;
  const { name, biography, email, password } = request.body;
  const modifiedAt = new Date();
  const hashedPassword = await generateHash(password)
  
  const authorIndex = authors.findIndex(a => a.id === id);
  if(authorIndex < 0 ){
    return response.status(400).json({
      erro: `@author/update`,
      message: `Author not foud ${id}`
    })
  }

  const createdAt = authors[authorIndex].createdAt;
  const authorUpdated = {
    id,
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt,
    modifiedAt
  }


  authors[authorIndex] = authorUpdated;

  return response.status(201).json(authorUpdated)
}

const remove = (request, response) => {
  const { id } =  request.params
  
  const authorIndex = authors.findIndex((a) => a.id === id)

  if(authorIndex < 0){
    return response.status(400).json({
      erro: '@author/remove',
      message:`author not found ${id}`
    })
  }

  authors.splice(authorIndex, 1)

  return response.send()

}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  authorsDatabase: authors,
};