import { test } from '@japa/runner'
//import User from '../../../app/Models/User'

test.group('User tests for the success', () => {
  // Write your test here
  test('create user and logged', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'Alou',
      email: 'alou@gmail.com',
      passsword: '@test@',
      passsword_2: '@test@',
    })
    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })
  // test('logged user', async ({ client }) => {})
  // test('logout user', async ({ client }) => {})
})
