import { useEffect, useState } from 'react';

function App() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        fetch('http://localhost:8080/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data.content))  //PageResponse의 content
            .catch(e => setError(e.message));
    }, []);

    return (
        <div>
            <h1>칼슐랭로드</h1>
            {error && <p>에러: {error}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} - {post.authorName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App;