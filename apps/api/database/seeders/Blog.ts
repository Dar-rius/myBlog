import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'
import Blog from '../../app/Models/Blog'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.create({
      username: 'Tine',
      email: 'tine@gmail.com',
      password: '@test@',
    })

    await Blog.createMany([
      {
        author_id: 1,
        title: 'test',
        label: 'test',
        preface: 'test',
        content: 'test',
      },
      {
        author_id: 1,
        title: 'test',
        label: 'test',
        preface: 'test',
        content: 'test',
      },
    ])
  }
}
