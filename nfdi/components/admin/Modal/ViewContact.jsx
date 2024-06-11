const ViewContact = ({isOpen, onClose, data}) => {
    const submitDone = async () => {
        const response = await fetch('/api/contact/' + data.id, {
            method: "PATCH"
        })
        if (response.ok) {
            const updatedData = await response.json()
            onClose(updatedData)
        }
    }
    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white overflow-auto max-h-[calc(80%)] rounded-lg shadow-md dark:bg-bodydark">
                    <button onClick={() => onClose(null)} type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center text-black">
                        <div className="uppercase font-semibold">
                            Liên hệ    
                        </div> 
                        {
                            data && (
                                <div className="mt-5">
                                    <div>
                                        <span>Tiêu đề: </span>
                                        <span className="font-semibold">{data.title}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span>Giới tính: </span>
                                        <span className="font-semibold">{data.gender}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span>Họ tên: </span>
                                        <span className="font-semibold">{data.firstName + " " + data.lastName}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span>Lĩnh vực: </span>
                                        <span className="font-semibold">{data.researchArea}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span>Lời nhắn: </span>
                                        <span className="font-semibold">{data.messages}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span>Trạng thái: </span>
                                        <span className="font-semibold">{data.status ? "Đã xử lý" : "Chưa xử lý"}</span>
                                    </div>
                                    {!data.status &&
                                    <button onClick={submitDone} className="bg-black text-white px-3 py-2 rounded-md mt-4">Xác nhận</button>}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ViewContact