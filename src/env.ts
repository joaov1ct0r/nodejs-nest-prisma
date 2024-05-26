import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string({
    required_error: 'VARIAVEL DE AMBIENTE "NODE_ENV" É OBRIGATÓRIA',
    invalid_type_error:
      'VARIAVEL DE AMBIENE "NODE_ENV" DEVE ESTAR NO FORMATO STRING',
  }),
  JWT_TOKEN_SECRET: z.string({
    required_error: 'VARIAVEL DE AMBIENTE "JWT_TOKEN_SECRET" É OBRIGATÓRIA',
    invalid_type_error:
      'VARIAVEL DE AMBIENTE "JWT_TOKEN_SECRET" DEVE ESTAR NO FORMATO STRING',
  }),
  SERVER_PORT: z.coerce
    .number({
      required_error: 'VARIAVEL DE AMBIENTE "SERVER_PORT" É OBRIGATÓRIA',
      invalid_type_error:
        'VARIAVEL DE AMBIENTE "SERVER_PORT" DEVE ESTAR NO FORMATO STRING/NUMBER',
    })
    .optional()
    .default(3000),
  SERVER_HOST: z
    .string({
      required_error: 'VARIAVEL DE AMBIENTE "SERVER_HOST" É OBRIGATÓRIA',
      invalid_type_error:
        'VARIAVEL DE AMBIENTE "SERVER_HOST" DEVE ESTAR NO FORMATO STRING',
    })
    .optional()
    .default('localhost'),
  DATABASE_URL: z
    .string({
      required_error: 'VARIAVEL DE AMBIENTE "DATABASE_URL" É OBRIGATÓRIA',
    })
    .optional()
    .default(
      'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
    ),
  DB_HOST: z
    .string({
      required_error: 'VARIAVEL DE AMBIENTE "DB_HOST" É OBRIGATÓRIA',
      invalid_type_error:
        'VARIAVEL DE AMBIENTE "DB_HOST" DEVE ESTAR NO FORMATO STRING',
    })
    .optional()
    .default('localhost'),
  DB_PORT: z.coerce
    .number({
      required_error: 'VARIAVEL DE AMBIENTE "DB_PORT" É OBRIGATÓRIA',
      invalid_type_error: 'VARIAVEL DE AMBIENTE "DB_PORT" É OBRIGATÓRIA',
    })
    .optional()
    .default(5432),
});

export type EnvSchema = z.infer<typeof envSchema>;
