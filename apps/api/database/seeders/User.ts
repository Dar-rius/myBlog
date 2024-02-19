import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'Dar_rius',
        email: 'dar@gmail.com',
        password: '@20test20@',
      },
      {
        username: 'Alhamded',
        email: 'Al@gmail.com',
        password: '@20test20@',
      },
    ])
  }
}
