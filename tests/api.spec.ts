import { test, expect } from '@playwright/test';

test.describe('API Testing - JSONPlaceholder', () => {

  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('GET All Posts - Return status 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    
    const firstPost = body[0];
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
  });

  test('POST Create Post - Return status 201', async ({ request }) => {
    const newPost = {
      title: 'QA Intern',
      body: 'Toi dang hoc Automation Test voi Playwright',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log('Created Post:', body);

    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
    expect(body.id).toBeGreaterThan(0);
  });

  test('PUT Update Post - Update data', async ({ request }) => {
    const updatedData = {
      id: 1,
      title: 'Updated Title by Thuan',
      body: 'Updated Body Content',
      userId: 1,
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: updatedData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Updated Post:', body);
    
    expect(body.title).toBe(updatedData.title);
  });

  test('DELETE Post - Return status 200', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toEqual({});
  });

});