
import supertest from 'supertest';
import { describe, expect, it } from "vitest";
import { app } from '../../src/server';



describe('post create', () => {
    it('should create a post', async () => {
      //expect(await prisma.service.count()).toBe(4);
      const response = await supertest(app)
        .post(`/users`)
        .send({
          username:'ismael',
          password:'Senha@bael1'
        })
    });

  
  });