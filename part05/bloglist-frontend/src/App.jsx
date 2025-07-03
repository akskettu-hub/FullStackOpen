import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    console.log(blogs)
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    } 
   }, [])

  const handleLogin = async (event) => {    
    event.preventDefault()

    console.log('got to handleLogin', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials', true)
    }     
  }
  
  const createBlog = async (newBlog) => {
        
    try {
      const blog = await blogService.create( newBlog )
      console.log('blog created:', blog)
      notifyWith(`a new blog ${blog.title} by ${blog.author} added`)
      setBlogs(blogs.concat(blog))
      
    } catch (exception) {
      notifyWith('creation failed', true) 
    }
  }

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  if (user === null) {
    return (
      <div>
        
        <Notification notification={notification} />
        
        {loginForm()}
        
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification}/>

      <p>
        {`${user.name} logged in`}
        <button onClick={logoutHandler}>logout</button>
      </p>

      {
        <div>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App