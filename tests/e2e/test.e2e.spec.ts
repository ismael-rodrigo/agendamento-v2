import supertest from 'supertest';
import { describe, it } from "vitest";
import { app } from '../../src/main/server';



describe('post create', () => {
    it('should create a post', async () => {
      
      //expect(await prismaMocked.user.count()).toBe(0);
      const response = await supertest(app)
        .post(`/users`)
        .send({
          username:'ismaelRodrigos',
          password:'Senha@bael1'
        })
  
      //expect(await prismaMocked.user.count()).toBe(1);

    });

  
  });