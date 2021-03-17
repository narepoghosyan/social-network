import styles from './FormsControls.module.css';
import { Field } from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError =  touched && error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (name, component, validators, placeholder, props={}, text="") => (
    <div>
        <Field
          name={name}
          component={Input}
          validate={validators}
          placeholder={placeholder}
          {...props}
        ></Field> {text}
    </div>
)

