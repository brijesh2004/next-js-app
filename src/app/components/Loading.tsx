import style from '@/app/style/profile.module.css';
import Image from 'next/image';
export default function Loading(){
    return (
        <div className={style.loading_style}>
             <Image src="/loading-white.gif" alt="" />
        </div>
    )
}