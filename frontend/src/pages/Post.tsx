import { useParams } from "react-router-dom"
import { FullPost } from "../components/FullPost"
import { useBlog } from "../hooks"
import { AppBar } from "../components/AppBar"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Post = () => {
    const { id } = useParams();
    const { loading, post } = useBlog({
        id: id || ""
    })

    if (loading) {
        return <div>
            <AppBar name={'A'} /><BlogSkeleton /></div>
    }
    if (post) {
        return <div>
            <AppBar name={'A'} />
            <FullPost post={post} />
        </div>
    }
}