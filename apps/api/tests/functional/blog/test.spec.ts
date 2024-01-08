import { test } from '@japa/runner'
//import User from '../../../app/Models/User'
import { userFactory, blogFactory } from '../../../database/factories/index'

test.group('Blog test', () => {
  // Write your test here

  test('display all blogs', async ({ client }) => {
    await userFactory.createMany(3)
    const blog = await blogFactory.create()
    const response = await client.get('/all-blog')
    response.assertStatus(200)
    response.assertBodyContains([{ title: blog.title }])
  })

  test('get one blog', async ({ client }) => {
    const blog = await blogFactory.create()
    const response = await client.get('/blog/2')
    response.assertStatus(200)
    response.assertBodyContains({ title: blog.title })
  })
})
