import Factory from '@ioc:Adonis/Lucid/Factory'
import User from '../../app/Models/User'
import Blog from '../../app/Models/Blog'

export const userFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('user', () => blogFactory)
  .build()

export const blogFactory = Factory.define(Blog, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    label: faker.lorem.sentence(),
    preface: faker.lorem.sentence(),
    content: faker.lorem.sentence(),
  }
}).build()
