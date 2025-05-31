// backend/src/__tests__/api.test.ts
import request from 'supertest';
import { app } from '../index';

describe('API Health Check', () => {
  it('should respond with API running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/RideShare API is running/);
  });
});
