import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

async function startApolloServer() {
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:5173'],
      credentials: true,
    }),
    express.json(),
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let currentUser = null;
        const token = req.cookies?.auth_token;
        if (token) {
          try {
            const payload = jwt.verify(
              token,
              process.env.JWT_SECRET!
            ) as JwtPayload;
            currentUser = {
              id: payload.id,
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
            };
          } catch (err) {
            console.warn(err);
          }
        }
        return { currentUser, req, res };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer().catch(console.error);
