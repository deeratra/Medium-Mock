import { AppBar } from "../components/AppBar"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { PostCard } from "../components/PostCard"
import { useBlogs } from "../hooks"

export const Posts = () => {


    const { loading, posts } = useBlogs()
    // setTimeout(() => {
    //     console.log("hi")
    // }, 10000)

    if (loading) {
        return <div>
            <AppBar name={'A'} />
            <div className="flex justify-center p-4">
                <div className="w-5/12"><BlogSkeleton /> </div>
            </div>
        </div>
    }
    return <div>
        <AppBar name={'A'} />
        <div className="flex justify-center p-4">
            <div className="max-w-xl">
                {posts.map(post =>
                    <PostCard
                        id={post.id}
                        authorName={post.author.name || "Anonymous"}
                        title={post.title}
                        content={post.content}
                        publishedDate={post.date}

                    />
                )}
            </div>
        </div>
    </div>
}