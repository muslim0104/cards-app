import error404 from 'assets/Icon/error-404.png'
import s from './Error-404.module.css'


export const Error404 = () =>{
    return (
        <div className={s.error404}>
            <h1 className={s.title}>404: PAGE NOT FOUND</h1>
            <img src={error404} alt={'Page not found'}/>
        </div>
    )
}