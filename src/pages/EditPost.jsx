import React,{useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import DatabaseServices from '../appwrite/database'
import { useNavigate,useParams } from 'react-router-dom'


const EditPost = () => {
    const [post,setPost]=useState([])
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(()=>{
        if(slug){
            setPost(DatabaseServices.getPost(slug))
            // const post = DatabaseServices.getAllPosts(slug).then((post)=>{
            //     if(post)
            //         setPost(post)
            // })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div>
        <Container>
             <PostForm post={post} />
        </Container>
    </div>
  ):null
//   TOdo 404 Page not found to build
}

export default EditPost