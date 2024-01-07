import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../Models/User'
import { checkPassword } from './utils'

export default class UserController {
  // method to create and login user
  public async register(ctx: HttpContextContract) {
    const { username, email, password, password_2 } = ctx.request.body()
    console.log(username, email, password, password_2)
    try {
      checkPassword(password, password_2)
      const user = await User.create({
        username: username,
        email: email,
        password: password,
      })
      await ctx.auth.use('api').login(user)
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'User not authentificated' })
    }
  }

  // method to verify if user exist and authentificated user
  public async login(ctx: HttpContextContract) {
    const { email, password } = ctx.request.body()
    try {
      await ctx.auth.use('api').attempt(email, password)
      ctx.response.ok({ message: 'Success' })
    } catch {
      ctx.response.badRequest({ message: 'User not authentificated' })
    }
  }

  // method to logout user
  public async logout(ctx: HttpContextContract) {
    if (ctx.auth.use('api').isAuthenticated) {
      ctx.auth.use('api').logout()
      ctx.response.ok({ message: 'user is deconnected' })
    } else {
      ctx.response.badRequest({ message: 'failed' })
    }
  }
}
