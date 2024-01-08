import { test } from '@japa/runner'
import { file } from '@ioc:Adonis/Core/Helpers'
import { userFactory, blogFactory } from '../../../database/factories/index'
import User from '../../../app/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'

test.group('Blog test', () => {
  // Write your test here

  test('display all blogs', async ({ client }) => {
    await userFactory.create()
    await blogFactory.createMany(2)
    const response = await client.get('/all-blog')
    response.assertStatus(200)
  })

  test('get one blog', async ({ client }) => {
    const blog = await blogFactory.create()
    const response = await client.get('/blog/3')
    response.assertStatus(200)
    response.assertBodyContains({ title: blog.title })
  })

  test('create blog', async ({ client }) => {
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
