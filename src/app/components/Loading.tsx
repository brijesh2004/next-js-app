import style from '@/app/style/profile.module.css';
export default function Loading(){
    return (
        <div className={style.loading_style}>
             <img src="/loading-white.gif" alt="" />
        </div>
    )
}