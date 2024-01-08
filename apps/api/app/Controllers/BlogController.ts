import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from '../Models/Blog'
import { saveFile, changeFile } from './utils'
import Drive from '@ioc:Adonis/Core/Drive'

export default class BlogController {
  // method to display all blog
  public async index(ctx: HttpContextContract) {
    const blogs = await Blog.all()
    ctx.response.ok(blogs)
  }

  // method to get one blog
  public async getBlog(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    try {
      const blog = await Blog.findOrFail(idBlog)
      ctx.response.ok(blog)
    } catch {
      ctx.response.badRequest({ message: "blog don't found" })
    }
  }

  // method to create one blog
  public async createBlog(ctx: HttpContextContract) {
    const { title, label, preface } = ctx.request.body()
    const user = ctx.auth.user
    const fileMK = ctx.request.file('content')
    try {
      await saveFile(fileMK)
      await Blog.create({
        author_id: user.id,
        title: title,
        label: label,
        preface: preface,
        content: fileMK?.fileName,
      })
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'Failed' })
    }
  }

  // method to edit blog
  public async updateMetaData(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    const body = ctx.request.body()
    try {
      const blog = await Blog.findOrFail(idBlog)
      blog.merge(body).save()
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'updated data failed' })
    }
  }

  // method to edit blog
  public async updateFile(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    const fileMK = ctx.request.file('content')
    try {
      const blog = await Blog.findOrFail(idBlog)
      await changeFile(fileMK)
      blog.content = fileMK?.fileName
      blog.save()
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'Failed' })
    }
  }

  // method to delete blog
  public async deleteBlog(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    try {
      const blog = await Blog.findOrFail(idBlog)
      await Drive.delete(blog.content)
      await blog.delete()
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'Failed' })
    }
  }
}
