// replace this with your server implementation...
const express = require('express');
const server = express();
const {v4 : uuidv4} = require('uuid')

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

let repoData = {}


//PUT /data/{repository}
server.put('/data/:repository', (req, res) => {
  const repo = req.params.repository
  const repoKeys = Object.keys(repoData)
  const name = req.body.name;
  const newEntry = {
    oid: uuidv4(),
    name: name
  }
  if(repoKeys.includes(repo)){
    repoData[repo].forEach(val => {
      if(val.name === name){
        val.oid = uuidv4()
        res.status(201).json(val)
      }
    })
    repoData[repo].push(newEntry)
  } else {
    repoData[repo] = [newEntry]
  }
  res.status(201).json(newEntry)
})

//GET /data/{repository}/{objectID}
server.get('/data/:repository/:oid', (req, res) => {
  const repo = req.params.repository
  const oid = req.params.oid
  const repoNames = Object.keys(repoData)
  let selectedEntry
  if(repoNames.includes(repo)){
    selectedEntry = repoData[repo].find(r => r.oid === oid);
  }
  if(selectedEntry){
    const result = {name: selectedEntry.name}
    res.status(200).json(result)
  } else {
    res.status(404).send("Not Found")
  }
})


//DELETE /data/{repository}/{objectID}
server.delete('/data/:repository/:oid', (req, res) => {
  const repo = req.params.repository
  const oid = req.params.oid
  const repoNames = Object.keys(repoData)
  let selectedEntry
  if(repoNames.includes(repo)){
    selectedEntry = repoData[repo].find(r => r.oid === oid);
  }
  if(selectedEntry){
    repoData[repo] = repoData[repo].filter(r => r.oid !== oid)
    res.status(200).send("Ok")
  } else {
    res.status(404).send("Not Found")
  }
})


// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server





// The existing tests in this file should not be modified,
// but you can add more tests if needed.

const supertest = require('supertest')
const server = require('./server.js')

test('data-storage-api-node', async () => {
  // PUT
  const putResult = await supertest(server)
    .put('/data/cats')
    .send({ name: 'Copernicus' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  // GET
  const hash = putResult.body.oid
  await supertest(server)
    .get(`/data/cats/${hash}`)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual({ name: 'Copernicus' })
    })

  // DELETE
  await supertest(server)
    .delete(`/data/cats/${hash}`)
    .expect(200)

  await supertest(server)
    .get(`/data/cats/${hash}`)
    .expect(404)
})

test('updates object if exists', async () => {

  const firstPutResult = await supertest(server)
    .put('/data/cats')
    .send({ name: 'Copernicus' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
 
  await supertest(server)
    .put('/data/cats')
    .send({ name: 'Copernicus' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .then(res => {
      expect(firstPutResult.body.oid !== res.body.oid)
    })
  
})
