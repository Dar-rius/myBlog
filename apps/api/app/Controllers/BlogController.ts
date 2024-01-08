import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from '../Models/Blog'
import { saveFile, changeFile } from './utils'
import Drive from '@ioc:Adonis/Core/Drive'

export default class BlogController {
  // method to display all blog
  public async index(ctx: HttpContextContract) {
    const blogs = await Blog.all()
    ctx.response.send(blogs)
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
      console.log(user.id, title, label, preface, fileMK?.fileName)
      await Blog.create({
        author_id: user.id,
        title: title,
        label: label,
        preface: preface,
        content: fileMK?.filePath,
      })
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'Failed' })
    }
  }

  // method to edit blog
  public async updateBlog(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    const { title, label, preface } = ctx.request.body()
    const fileMK = ctx.request.file('content')
    try {
      const blog = await Blog.findOrFail(idBlog)
      changeFile(fileMK)
      blog
        .merge({
          title: title,
          label: label,
          preface: preface,
          content: fileMK?.filePath,
        })
        .save()
    } catch {
      ctx.response.badRequest({ message: 'updated data failed' })
    }
  }

  // method to delete blog
  public async deleteBlog(ctx: HttpContextContract) {
    const idBlog = ctx.request.param('id')
    try {
      const blog = await Blog.findOrFail(idBlog)
      await Drive.delete(blog.content)
      await blog.delete()
      ctx.response.ok({ message: 'success' })
    } catch {
      ctx.response.badRequest({ message: 'failed' })
    }
  }
}
