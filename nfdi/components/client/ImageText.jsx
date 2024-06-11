import Image from "next/image";
import Link from "next/link";

const ImageText = ({ image, text, url, subText, newTab }) => (
    <Link target={newTab == "true" ? "_blank" : "_self"} href={url}>
        <div className="relative cursor-pointer max-w-100 hover:scale-105 duration-200">
            <Image className="shadow-lg w-full aspect-7/5 object-cover rounded-md" src={image} width={300} height={200} alt={text} />
            <div className="absolute -bottom-7 w-full">
                <div className="bg-primary-500 opacity-45 rotate-0 mx-auto skew-y-3 rounded-md h-5 w-[calc(75%)]">d </div>
            </div>
            <div className="absolute -bottom-7 w-full">
                <div className="mx-auto text-center bg-white w-[calc(75%)] shadow-lg p-2 rounded-md">
                    <div className="uppercase text-lg font-bold">{text}</div>
                    <div className="text-sm mt-2">{subText}</div>
                </div>
            </div>
            
        </div>
    </Link>
);


export default ImageText;