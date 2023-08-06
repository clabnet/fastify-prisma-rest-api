import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { JWT } from "@fastify/jwt";
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { withRefResolver } from "fastify-zod";
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import { version } from "../package.json";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  const server = Fastify();

  server.register(fjwt, {
    secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'PostgreSQL, Prisma, Fastify and Swagger REST APIs',
          version: version,
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
        servers: [{ url: 'http://localhost:5003' }],
        components: {
          securitySchemes: {
            // apiKey: {
            //   type: 'apiKey',
            //   name: 'apiKey',
            //   in: 'header',
            // },
            bearerAuth: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
          },
        },
        // security: [{ apiKey: [] }],
        security: [{ bearerAuth: [] }],
      },
    })
  )

  /**
   * Definition API to address the swagger start page
   */
  const pathPrefix = `/swagger`

  void server.register(fastifySwaggerUI, {
    routePrefix: pathPrefix,
    staticCSP: false,
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
    },
  })

  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });

  return server;
}

export default buildServer;
