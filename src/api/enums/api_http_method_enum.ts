export const ApiHttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type ApiHttpMethod = typeof ApiHttpMethod[keyof typeof ApiHttpMethod];

export default ApiHttpMethod;
