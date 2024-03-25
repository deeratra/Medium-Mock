import { Link } from "react-router-dom"

interface PostCardProps {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: Date
}

export const PostCard = ({ authorName, title, content, publishedDate, id }: PostCardProps) => {
    const date = new Date(publishedDate);
    const formattedDate = date.toISOString().split('T')[0];
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
    const longMonthName = monthName(date);
    const [year, , day] = formattedDate.split('-');
    const formattedDateString = `${day} ${longMonthName} ${year}`;
    return <Link to={`/post/${id}`}>
        <div className="border-b border-slate-200 p-4 cursor-pointer">
            <div className="flex gap-x items-center">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2">
                    {authorName}
                </div>
                <div>&#8226;</div>
                <div className="pl-2 font-thin text-slate-500">
                    {formattedDateString}
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-md font-thin">{content.length > 100 ? content.slice(0, 100) + "..." : content}</div>
            </div>
            <div className="text-slate-400 text-sm p-3">
                {`${Math.ceil(content.length / 100)} minutes read`}
            </div>
        </div>
    </Link>
}


export function Avatar({ name, size = 'big' }: { name?: string, size?: string }) {
    return <div className={`relative inline-flex items-center justify-center ${size} w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name ? name[0] : "A"}</span>
    </div>
}