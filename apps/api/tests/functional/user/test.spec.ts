import { test } from '@japa/runner'
import User from '../../../app/Models/User'

test.group('User tests for the success', () => {
  // Write your test here

  // test to create and log user
  test('create user and logged', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'Alou',
      email: 'alou@gmail.com',
      password: '@32test32@',
      password_2: '@32test32@',
    })
    response.assertStatus(200)
    response.assertBodyContains({ message: 'Success' })
  })

  //Test to logout user
  test('logout user', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/logout').guard('api').loginAs(user)
    response.assertStatus(200)
    response.assertBodyContains({ message: 'user is deconnected' })
  })

  test('logged user', async ({ client }) => {
    const response = await client.post('/signin').json({
      email: 'alou@gmail.com',
      password: '@32test32@',
    })
    response.assertStatus(200)
    response.assertBodyContains({ message: 'Success' })
  })
})
