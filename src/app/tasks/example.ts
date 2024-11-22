import { logger, task, wait } from '@trigger.dev/sdk/v3';

const HelloWorldKey = 'hello-world';

export const helloWorldTask = task({
  id: 'hello-world',
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    logger.log('Hello, world!', { payload, ctx });

    await wait.for({ seconds: 5 });

    return {
      message: 'Hello, world!',
    };
  },
});
