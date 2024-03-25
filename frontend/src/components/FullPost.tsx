
import { Post } from "../hooks/index"

export const FullPost = ({ post }: { post: Post }) => {
    return <div className=" flex justify-center">

        <div className="grid grid-cols-12 px-10 pt-4 max-w-6xl  ">
            <div className="col-span-8 px-5 justify-center">
                <div className="text-4xl font-bold pt-2">
                    {post.title}
                </div>
                <div className="text-slate-500 pt-2">
                    Posted on 23 April 2023
                </div>
                <div className="pt-4">
                    {post.content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-xl font-normal">
                    Author
                </div>
                <div className="flex items-center">
                    <div className="text-slate-400 pr-4">&#11044;</div>
                    <div>
                        <div className="text-3xl font-bold">{post.author.name || "Anonymous"}</div>
                        <div className="text-slate-500">Master of mirth, purveyor of puns, and the funniest person in kingdom.</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}