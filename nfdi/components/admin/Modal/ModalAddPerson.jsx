"use client"

import { useEffect, useState } from "react"

const ModalAddPerson = ({isOpen, onClose, data}) => {
    const [errorAlert, setErrorAlert] = useState(null)

    const [person, setperson] = useState({
        id: '',
        name: '',
        academicTitle: '',
        avatar: '',
        company: '',
        role: '',
        avatarUpload: null
    })

    useEffect(() => {   
        if (data) {
            setperson({
                id: data.id,
                name: data.name,
                academicTitle: data.academicTitle ? data.academicTitle : 'no',
                avatar: data.avatar,
                company: data.company,
                role: data.role ? data.role : 'host',
                avatarUpload: data.avatarUpload || null
            })
        }
    }, [data])

    const uploadImage = (e) => {
        const imageAccept = ['jpg', 'jpeg', 'png', 'webp'];
        if (e.target.files && e.target.files[0]) {
            const fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
            if (imageAccept.includes(fileExtension)) {
                const src = URL.createObjectURL(e.target.files[0]);
                setperson({...person, avatar: src, avatarUpload: e.target.files[0]})
                setErrorAlert(null)
            }
            else {
                setErrorAlert("Vui lòng chọn ảnh phù hợp với định dạng yêu cầu!")
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (person.name === '' || (person.avatar === '' && person.avatarUpload == null) || person.role === '' || person.company === '' || person.academicTitle === '') {
            setErrorAlert("Vui lòng điền đầy đủ thông tin!")
            return
        }
        setErrorAlert(null)
        onClose(person)
    }
    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-boxdark">
                    <button onClick={() => {onClose(null)}} type="button" className="absolute top-3 right-2.5 dark:text-white text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <div class="px-4 lg:px-10 py-10 w-full ">
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Học vị
                                    </label>
                                    <select className="p-2 text-black rounded-md" onChange={(e) => setperson({...person, academicTitle: e.target.value})}>
                                        <option value={"no"}>Không</option>
                                        <option value={"ThS"}>Thạc sĩ</option>
                                        <option value={"TS"}>Tiến sĩ</option>
                                        <option value={"PGS"}>Phó giáo sư</option>
                                        <option value={"GS"}>Giáo sư</option>
                                    </select>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Họ tên
                                </label>
                                <input value={person.name} type="text" onChange={(e) => {setperson({...person, name: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="w-full px-4 mx-auto mt-3">
                                <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-200 text-xs font-bold mb-5">
                                    Avatar
                                </label>
                                {person.avatar ? (
                                    <img src={person.avatar} className="rounded-full m-auto w-20 h-20 object-cover"></img>
                                ) : (
                                    <></>
                                )}
                                <input accept=".jpg, .jpeg, .webp, .png" id="inputImage" type="file" name="myImage" onChange={uploadImage} hidden/>
                                <label className="cursor-pointer dark:bg-white dark:text-black text-white bg-black px-3 py-2 rounded-xl flex mt-3 w-fit mx-auto" type="button" htmlFor="inputImage">Chọn ảnh</label>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Công ty
                                </label>
                                <input value={person.company} type="text" onChange={(e) => {setperson({...person, company: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Vai trò
                                </label>
                                <select value={person.role} className="p-2 text-black rounded-md" onChange={(e) => setperson({...person, role: e.target.value})}>
                                    <option value={"host"}>Chủ trì</option>
                                    <option value={"invitee"} >Khách mời</option>
                                </select>
                                </div>
                            </div>
                            <div>
                                <button className="bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-2" onClick={(e) => handleSubmit(e)}>Xác nhận</button>
                            </div>
                            {errorAlert ? (
                                <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                    {errorAlert}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ModalAddPerson