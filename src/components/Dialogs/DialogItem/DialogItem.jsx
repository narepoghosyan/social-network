import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return (
       <div className={s.dialog + ' ' + s.active}>
           <img src="https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;