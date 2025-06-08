const express = require('express')
const cors = require('cors')
const app = express()

const authMiddleware = require('./routes/authMiddleware')
const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')
const blogRouter = require('./routes/blogRouter')

app.use(cors())
app.use('/images', express.static('images'));

app.use(express.json())
app.use(authMiddleware)


app.use('/blog', blogRouter)
app.use('/category', categoryRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

