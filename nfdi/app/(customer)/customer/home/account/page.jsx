"use client"
import ModalAddBirthday from "@/components/client/ModalAddBirthday";
import ModalChangePassword from "@/components/client/ModalChangePassword";
import { CameraIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
const AccountPage = () => {
    const {data: session, update} = useSession()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchUser = async (id) => {
            const response = await fetch('/api/auth/getUser/' + id)
            if (response.ok) {
                const user = await response.json()
                setUser(user)
            }
        }
        if (session?.user) {
            fetchUser(session.user.id)
        }
    }, [session])
    const [openModalAddBirthday, setOpenModalAddBirthday] = useState(false)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false)
    const [focus, setFocus] = useState(false)
    const handleSubmit = async () => {
        const response = await fetch('/api/auth/update', {
            method: "POST",
            body: JSON.stringify({
                id: user.id,
                aboutMe: user.aboutMe
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            setUser(data)
            setFocus(false)
        }
    }
    const uploadImage = async (e) => {
        const imageAccept = ['jpg', 'jpeg', 'png', 'webp'];
        if (e.target.files && e.target.files[0]) {
            const fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
            if (imageAccept.includes(fileExtension)) {
                const formData = new FormData();
                formData.append("id", user.id)
                formData.append("avatar", e.target.files[0])
                const response = await fetch('/api/auth/update', {
                    method: "POST",
                    body: formData
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                }
            }
            else {
                alert("Vui lòng chọn ảnh phù hợp với định dạng yêu cầu!")
            }
        }
    }

    useEffect(() => {
        if (user) {
            update({
                ...session,
                user: {
                    ...session.user,
                    avatar: user.avatar,
                    birthday: user.birthday
                }
            })
        }
    }, [user])
    return (
        user && <section className="md:w-8/12 md:mx-auto mx-10 my-20">
            <div className="flex gap-3 items-center">
                <label htmlFor="inputImage" className="relative w-fit cursor-pointer hover:scale-105 duration-100">
                    <Image className="w-20 h-20 rounded-full shadow-inner" src={user.avatar != null ? user.avatar : "/assets/avatar.svg"} width={40} height={40}></Image>
                    <CameraIcon className="h-7 w-7 absolute left-1/2 -translate-x-1/2 -bottom-3 bg-bodydark1 rounded-full p-1 shadow-md"/>
                </label>
                <input accept=".jpg, .jpeg, .webp, .png" id="inputImage" type="file" name="myImage" onChange={uploadImage} hidden/>
                <div>
                    <div className="md:text-3xl text-xl font-bold">{user.academicTitle + ". " + user.name}</div>
                    <div className="font-semibold">{user.department + " - " + user.organization}</div>
                </div>
            </div>
            <div className="mt-10 rounded-md border border-bodydark1 p-7">
                <div className="flex md:flex-row flex-col border-b border-bodydark1 pb-7">
                    <div className="w-full">
                        <p className="font-semibold">Email</p>
                        <p className="mt-2">{user.email}</p>
                    </div>
                    <div className="w-full">
                        <p className="font-semibold">Ngày sinh</p>
                        <p className="mt-2">{user.birthday ? user.birthday : (
                            <div onClick={() => setOpenModalAddBirthday(true)} className="bg-pink-100 text-red hover:scale-105 duration-100 rounded-md w-fit p-1 cursor-pointer flex items-center gap-1 text-sm">
                                <PencilSquareIcon className="h-4 w-4"/>
                                Thêm ngày sinh
                            </div>
                        )}</p>
                    </div>
                </div>
                <div className="mt-7 pb-7 border-b border-bodydark1">
                    <button onClick={() => setOpenModalChangePassword(true)} className="bg-primary-500 hover:bg-primary-600 text-white rounded-md px-4 py-2">Đổi mật khẩu</button>
                </div>
                <div className="mt-7">
                    <p className="font-semibold">Giới thiệu bản thân</p>
                    <textarea onChange={(e) => setUser({...user, aboutMe: e.target.value})} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className="w-full p-2 mt-2 placeholder:text-primary-600 focus:outline-primary-500 border-primary-500 border rounded-md" placeholder="Cập nhật thông tin của bạn để kết nối với mọi người...">
                        {user.aboutMe}
                    </textarea>
                    {
                        focus && (
                            <div className="flex justify-end">
                                <button onMouseDown={(e) => e.preventDefault()}  onClick={handleSubmit} className="bg-primary-500 px-4 py-2 rounded-md text-white hover:bg-primary-600 duration-100 mt-2">Cập nhật</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <ModalAddBirthday isOpen={openModalAddBirthday} id={user.id} onClose={(data) => {data ? setUser(data) : null; setOpenModalAddBirthday(false)}}></ModalAddBirthday>
            <ModalChangePassword isOpen={openModalChangePassword} onClose={() => {setOpenModalChangePassword(false)}} id={user.id}></ModalChangePassword>
        </section>
    )
}

export default AccountPage;