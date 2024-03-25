interface ButtonType {
    name: string,
    onClick?: (e: any) => void,
    type: string
}

export const Button = ({ name, onClick, type }: ButtonType) => {
    let buttonClassName = ""
    if (type === "auth")
        buttonClassName = "w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    else if (type === "publish")
        buttonClassName = "items-center w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    return <div><button onClick={onClick} type="button"
        className={buttonClassName}>{name}</button>
    </div>
}