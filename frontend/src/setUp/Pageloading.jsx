import { LoaderIcon } from "lucide-react"

function Pageloading (){
    return (

        <div className="flex justify-center items-center  min-h-screen bg-white dark:bg-slate-700">

            <LoaderIcon className="size-10 animate-spin"/>

        </div>
        

    )
}
export default Pageloading