import React, { useState,useEffect } from 'react'
import { Container,PostCard } from '../components'
import DatabaseServices from '../appwrite/database'

const AllPost = () => {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        DatabaseServices.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])
        
  return (
    <Container>
       <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
  )
}

export default AllPost
