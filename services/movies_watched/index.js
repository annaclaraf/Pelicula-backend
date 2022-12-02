import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import pkg from '@prisma/client';
import express from 'express';

const { PrismaClient } = pkg;

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('hello')
});

app.post('/movies/watched', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id, poster_path } = req.body
    const movieWatched = await prisma.moviesWatched.create({
      data: {
        userId,
        id, 
        poster_path
      }
    })

    res.json(movieWatched)
  } catch (err) {
    console.log(err)
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.get('/movies/watched/:userId', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId } = req.params
    const moviesWatched = await prisma.moviesWatched.findMany({
      where: {
        userId
      }
    })

    res.json(moviesWatched)
  } catch (err) {
    console.log(err)
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.get('/movies/watched/:userId/:id', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id } = req.params
    const moviesWatched = await prisma.moviesWatched.findFirst({
      where: {
        AND: [
          { userId: userId },
          { id: parseInt(id) }
        ]
      }
    })

    res.json(moviesWatched)
  } catch (err) {
    console.log(err)
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.delete('/movies/watched/:userId/:id', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id } = req.params
    await prisma.moviesWatched.deleteMany({
      where: {
        AND: [
          { userId: userId },
          { id: parseInt(id) }
        ]
      }
    })

    res.json('deleted')
  } catch (err) {
    console.log(err)
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.listen(5000, () => console.log('Servidor iniciado na porta 3002'));