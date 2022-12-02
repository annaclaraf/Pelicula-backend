import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import pkg from '@prisma/client';
import express from 'express';

const { PrismaClient } = pkg;

const app = express();

app.use(express.json());

app.get('/', function (_req, res) {
  res.send('hello')
});

app.get('/user/:id', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id }
    })

    res.json(user)
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.post('/user', async function (req, res) {
  const prisma = new PrismaClient();
  try {
    const {
      id,
      name,
      givenName,
      email,
      photo,
    } = req.body

    const userExists = await prisma.user.findUnique({
      where: { id }
    })

    if (userExists) return;

    const user = await prisma.user.create({
      data: {
        id,
        name,
        givenName,
        email,
        photo,
      }
    })

    res.json(user)
  } catch (err) {
    res.json(err)
  } finally {
    await prisma.$disconnect()
  }
})

app.listen(5000, () => console.log('Servidor iniciado na porta 3003'));