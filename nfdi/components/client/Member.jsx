import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const Member = ({ member, size }) => {
    return (
        <div className="flex gap-3 items-center">
            {
                size === "small" ? (
                    <Image className="rounded-full w-12 h-12 object-cover" src={member.avatar || member.image} width={50} height={50} alt={member.name} /> 
                ) : (
                    <Image className="rounded-full w-20 h-20 object-cover" src={member.avatar || member.image} width={50} height={50} alt={member.name} />
                ) 
            }
            <div className="">
                <div className="font-bold text-lg">{member.academicTitle + " " + member.name}</div>
                <div>{member.organization || member.company || member.workAt}</div>
                {member.website && (
                    <Link className="flex gap-1 items-center text-sm decoration-primary-500 underline mt-1 hover:decoration-primary-600" href={member.website}>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        Website
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Member;