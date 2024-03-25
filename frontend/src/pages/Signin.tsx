import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = (
    // { setIsLoggedIn } : {setIsLoggedIn : any}
    ) => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div > <Auth type={"signin"} /></div>
            <div className="hiddle lg:flex "><Quote /></div>
        </div>

    </div>
}