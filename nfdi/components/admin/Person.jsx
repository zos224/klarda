import Image from "next/image"
import Link from "next/link"
const Person = ({person}) => {
    return (
        <div className="bg-white text-black rounded-lg shadow-md dark:bg-bodydark p-3 flex gap-4 items-center">
            <div>
                <Image src={person.avatar} width={100} height={100} className="rounded-full object-cover w-15 h-15" />
            </div>
            <div>
                <p className="font-bold">{person.academicTitle != "no" ? person.academicTitle : ""} {person.name}</p>
                <p>{person.company || person.workAt}</p>
                {
                    person.website && (
                        <Link target="_blank" href={person.website}>Website</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Person