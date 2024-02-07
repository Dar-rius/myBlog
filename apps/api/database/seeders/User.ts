import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'Dar_rius',
        email: 'mous@gmail.com',
        password: '@19test90@',
      },
      {
        username: 'Alhamded',
        email: 'Alamed@gmail.com',
        password: '@19test90@',
      },
    ])
  }
}
