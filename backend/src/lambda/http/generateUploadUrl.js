import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

import { createAttachmentPresignedUrl } from '../../businessLogic/todos.mjs';
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('Todos logger');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('generate upload url');
    const todoId = event.pathParameters.todoId;

    const urlAttach = await createAttachmentPresignedUrl(todoId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        upload: urlAttach
      })
    };
  });
