import { GraphQLError } from 'graphql/error';
import { ZodError } from 'zod';

export function formatZodErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
}

export class AuthenticationError extends GraphQLError {
  constructor(message = 'Пользователь не авторизован') {
    super(message, { extensions: { code: 'UNAUTHENTICATED' } });
  }
}

export class ForbiddenError extends GraphQLError {
  constructor(message = 'Доступ запрещен') {
    super(message, { extensions: { code: 'FORBIDDEN' } });
  }
}

export class NotFoundError extends GraphQLError {
  constructor(message = 'Сущность не найдена') {
    super(message, { extensions: { code: 'NOT_FOUND' } });
  }
}
