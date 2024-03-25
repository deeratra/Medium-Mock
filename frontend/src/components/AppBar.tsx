import { Link } from "react-router-dom"
import { Avatar } from "./PostCard"
import { Button } from "./Button"

export const AppBar = ({ name }: { name: string }) => {
    return <div className="border-b flex items-center justify-between px-10 py-4 max-h-min">
        <div>
            <Link to={"/posts"} >
                Medium
            </Link>
        </div>
        <div className="flex items-center">
            <div className="mr-5">
                <Link to={"/publish"}>
                    <Button type="publish" name="New" />
                </Link>
            </div>

            <div ><Avatar name={name} size={'big'} /></div>
        </div>
    </div >
}