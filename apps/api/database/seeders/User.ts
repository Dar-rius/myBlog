import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'Dar_rius',
        email: 'mohamedtine077@gmail.com',
        password: Env.get('PASSWORD'),
      },
      {
        username: 'Dar_rius_',
        email: 'mohamedtine17@gmail.com',
        password: Env.get('PASSWORD'),
      },
    ])
  }
}
