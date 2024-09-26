import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
   server: {
      PORT: z.string(),
      TURSO_URL: z.string().regex(/^(libsql:\/\/|https:\/\/|wss:\/\/)/),
      TURSO_AUTH_TOKEN: z.string().regex(/^ey.+/),
   },
   runtimeEnv: process.env,
});

export default env;
