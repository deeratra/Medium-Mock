import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Post {
    content: string,
    title: string,
    id: string,
    date: Date,
    author: {
        name: string
    }
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
                setLoading(false)
            })
    }, [])

    return {
        loading, posts
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();
    console.log("Here")
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setPost(response.data.post);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        post
    }

}