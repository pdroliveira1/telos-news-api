const uuid = require('uuid')

const {generateHash} = require("../utils/hashProvider")

const autors = []

const list = (request, response) => {
  const {autor_id} = request.query
  if (autor_id) {
    autors
  }
  return response.json(autors);
  
}

const getById = (request, response) => {
  const { id } = request.params;

  const autor = autors.find((u) => u.id === id);

  if(!autor){
    return response.status(400).json({
      error: '@autor/getById',
      message: `autor not found ${id}`
    })
  }
  
  return response.json(autor);
}

const create = async (request, response) => {
  const {name, biography, email, password} = request.body;
  const id = uuid.v4()
  const createdAt = new Date()
  const modifiedAt = new Date()
  const hashedPassword = await generateHash(password)

  const autor = autors.find((u) => u.email === email);
  if(autor){
    return response.status(422).json({
      error: '@autor/create',
      message: `author already registered`
    })
  }

  const newAutor = {
    id,
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt,
    modifiedAt,
  }
  
  autors.push(newAutor)

  return response.status(201).json(newAutor)
}

const update = async (request, response) => {
  const { id } = request.params;
  const { name, biography, email, password } = request.body;
  const modifiedAt = new Date();
  const hashedPassword = await generateHash(password)
  
  const autorIndex = autors.findIndex(a => a.id === id);
  if(autorIndex < 0 ){
    return response.status(400).json({
      erro: `@autor/update`,
      message: `Autor not foud ${id}`
    })
  }

  const createdAt = autors[autorIndex].createdAt;
  const autorUpdated = {
    id,
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt,
    modifiedAt
  }


  autors[autorIndex] = autorUpdated;

  return response.status(201).json(autorUpdated)
}

const remove = (request, response) => {
  const { id } =  request.params
  
  const autorIndex = autors.findIndex((a) => a.id === id)

  if(autorIndex < 0){
    return response.status(400).json({
      erro: '@autor/remove',
      message:`autor not found ${id}`
    })
  }

  autors.splice(autorIndex, 1)

  return response.send()

}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  authorsDatabase: autors,
};