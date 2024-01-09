import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string(),
    email: schema.string([rules.email]),
    password: schema.string([rules.confirmed, rules.minLength(8)]),
    password_2: schema.string([rules.confirmed, rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'require': 'This {{field}} is important to create user',
    'email.unique': 'This email already exist',
  }
}
