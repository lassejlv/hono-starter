import pino from 'pino';

const log = pino({
   transport: {
      target: 'pino-pretty',
      options: {
         prettyPrint: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
         },
      },
   },
});

export default log;
