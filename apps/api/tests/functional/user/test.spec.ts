import { test } from '@japa/runner'
import User from '../../../app/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'

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
    response.assertBody({ message: 'Success' })
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
    response.assertBody({ message: 'Success' })
  })

  test('create blog', async ({ client, assert }) => {
    const user = User.find(1)
    //const drive = Drive.fake()
    const fileTest = await file.generatePdf('1mb', 'test')

    const response = await client
      .post('/create-blog')
      .fields({
        title: 'test',
        label: 'Go test',
        preface: 'Je meurt',
      })
      .file('content', fileTest.contents, { filename: fileTest.name })
      .guard('api')
      .loginAs(user)
    //assert.isTrue(await drive.exists(fileTest.name))
    //
    Drive.restore()
    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })

  test('update blog metadata', async ({ client }) => {
    const user = User.find(1)

    const response = await client
      .put('/edit-blog-metadata/1')
      .fields({
        title: 'hoo merde',
        label: 'pass test',
        preface: 'Je meurt',
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })

  test('update blog file', async ({ client }) => {
    const user = User.find(1)
    const fileTest = await file.generatePdf('1mb', 'test')

    const response = await client
      .put('/edit-blog-file/1')
      .file('content', fileTest.contents, { filename: fileTest.name })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })

  test('delete blog', async ({ client }) => {
    const user = User.find(1)
    const response = await client.delete('/delete-blog/1').guard('api').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ message: 'Success' })
  })
})
