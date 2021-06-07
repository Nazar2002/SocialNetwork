import style from './Preloader.module.css'
let Preloader: React.FC = () => {
    return(
        <img className={style.fetchingGif} src={"https://acegif.com/wp-content/uploads/loading-25.gif"}/>
    )
}
export default Preloader