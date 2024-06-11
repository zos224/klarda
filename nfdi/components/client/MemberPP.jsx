import Image from "next/image";

const MemberPP = ({ member }) => {
    return (
        <div className="flex gap-3 items-center">
            <Image className="rounded-md w-20 h-20 object-cover hover:scale-105 duration-200" src={member.avatar} width={100} height={100} alt={member.name} />
            <div className="">
                <div className="font-bold">Liên hệ</div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm">{member.organization}</div>
            </div>
        </div>
    );
}

export default MemberPP;