import Image from "next/image"

const Program = ({program}) => {
    function formatDate(dateString) {
        const parts = dateString.split('-'); // Tách chuỗi theo dấu gạch ngang
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // Đảo vị trí và nối lại với dấu gạch ngang
    }
    return (
        <div className="bg-white text-black rounded-lg shadow-md dark:bg-bodydark p-3 text-sm">
            <div className="flex gap-3 items-center">
                <p>Thời gian:</p>
                <p className="font-bold">{program.time + " " + formatDate(program.date)}</p>
            </div>
            <div className="flex gap-3 items-center">
                <p>Diễn ra trong:</p>
                <p className="font-bold">{program.duration + " phút"}</p>
            </div>
            <div>
                <p>Hoạt động</p>
                <div className="flex gap-3 items-center mt-2">
                    <Image src={program.icon.icon} width={100} height={100} className="rounded-full w-10 h-10" />
                    <p className="font-bold">{program.activity}</p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <p>Địa điểm:</p>
                <p className="font-bold">{program.location}</p>
            </div>
            <div className="flex gap-3 items-center">
                <p>Nội dung chính:</p>
                <p className="font-bold">{program.mainContent}</p>
            </div>
            <div className="flex gap-3 items-center">
                <p>Chi tiết:</p>
                <p className="font-bold">{program.description}</p>
            </div>
        </div>
    )
}

export default Program