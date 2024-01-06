import { test } from '@japa/runner'
//import User from '../../../app/Models/User'

test.group('User tests for the success', () => {
  // Write your test here
  test('create user and logged', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'Abou',
      email: 'abou@gmail.com',
      password: '@32test32@',
      password_2: '@32test32@',
    })
    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })
  // test('logged user', async ({ client }) => {})
  // test('logout user', async ({ client }) => {})
})
