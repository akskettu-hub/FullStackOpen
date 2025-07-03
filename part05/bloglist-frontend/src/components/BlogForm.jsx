const BlogForm = ({
    onSubmit,
    handleTitleChange, 
    handleAuthorChange, 
    handleUrlChange, 
    title, author, url
    }) => {
        return (
            <div>
                <h2>Create new</h2>

                <form onSubmit={onSubmit}>
                    <div>
                        Title
                        <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        Author
                        <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleAuthorChange}
                        />
                    </div>
                    <div>
                        Url
                        <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleUrlChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }

export default BlogForm