import Route from '@ioc:Adonis/Core/Route'

// Route group for User
Route.group(() => {
  Route.post('/signup', 'UserContoller.register'),
    Route.post('/signin', 'UserContoller.login'),
    Route.get('/logout', 'UserContoller.logout')
}).namespace('App/Controllers')

// Route group for blog
Route.group(() => {
  Route.get('/all-blog', 'BlogController.index'), Route.get('/blog/:id', 'BlogController.getBlog')
}).namespace('App/Controllers')

Route.group(() => {
  Route.post('/create-blog', 'BlogController.createBlog'),
    Route.put('/edit-blog/:id', 'BlogController.updateBlog'),
    Route.delete('/delete-blog/:id', 'BlogController.delete')
}).namespace('App/Controllers')
