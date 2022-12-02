import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import pkg from '@prisma/client';
import express from 'express';

const { PrismaClient } = pkg;

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('hello')
});

app.post('/movies/watch', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id, poster_path } = req.body
    const movieToWatch = await prisma.moviesToWatch.create({
      data: {
        userId,
        id, 
        poster_path
      }
    })
    res.json(movieToWatch)
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.get('/movies/watch/:userId/:id', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id } = req.params
    const moviesToWatch = await prisma.moviesToWatch.findFirst({
      where: {
        AND: [
          { userId: userId },
          { id: parseInt(id) }
        ]
      }
    })
    res.json(moviesToWatch)
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.get('/movies/watch/:userId', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId } = req.params
    const moviesToWatch = await prisma.moviesToWatch.findMany({
      where: { userId }
    })

    res.json(moviesToWatch)
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.delete('/movies/watch/:userId/:id', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { userId, id } = req.params
    await prisma.moviesToWatch.deleteMany({
      where: {
        AND: [
          { userId: userId },
          { id: parseInt(id) }
        ]
      }
    })

    res.json('deleted')
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.listen(5000, () => console.log('Server iniciado na porta 3001'));