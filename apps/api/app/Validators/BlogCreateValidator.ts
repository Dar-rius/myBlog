import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string(),
    label: schema.array().members(schema.string()),
    preface: schema.string(),
    content: schema.string(),
  })

  public messages: CustomMessages = {
    require: 'This {{field}} is important to create a new blog',
  }
}
