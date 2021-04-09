import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors'
import { createServer } from 'http'
import dotenv from 'dotenv'
import routes from "./routes"

dotenv.load()

const SECRET1 = process.env.SECRET1
const SECRET2 = process.env.SECRET2
const PORT = process.env.PORT

const start = async () => {
  console.log('----------------------------')
  console.log('Server started')
  console.log('----------------------------')

  const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')))
  const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))
  const executableSchema = makeExecutableSchema({ typeDefs,resolvers })

  const app = express()
  app.use(cors({ credentials: true, origin: '*' }))

  const graphqlEndpoint = '/graphql'
  const subscriptionsEndpoint = '/subscriptions'

  const server = createServer(app)

  const router = express.Router()
  
  const theRoutes = async (req, res, next) => {
    routes(app, { router })
    next()
  }

  app.use(theRoutes)

  // set the view engine to ejs
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '/views'))

  const apolloServer = new ApolloServer({
    schema: executableSchema,
    subscriptions: {
      path: subscriptionsEndpoint,
    },
    playground: {
      subscriptionEndpoint: subscriptionsEndpoint
    },
    context: async ({ req }) => {
      return {
        language: (req && req.headers['x-language']) || '',
        SECRET1,
        SECRET2,
        serverUrl: (req && `${req.protocol}://${req.get('host')}`) || ''
      }
    }
  })

  apolloServer.applyMiddleware({
    app,
    path: graphqlEndpoint,
    cors: true
  })

  app.use(express.static(path.join(__dirname, '../public')))

  apolloServer.installSubscriptionHandlers(server)

  server
    .listen(`${PORT}`, () => {
      console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`)
      console.log(`View GraphiQL at http://localhost:${PORT}/graphql`)
    })
    .on('error', function(err) {
      console.log('on error handler')
      console.log(err)
    })

  process.on('uncaughtException', function(err) {
    console.log('process.on handler')
    console.log(err)
  })

  process.on('SIGINT', function() {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)")
    process.exit(1)
  })
}

start()
