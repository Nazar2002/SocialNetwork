import { Field, Form, Formik } from "formik"
type UsersSearchFormType= {
    onFilterChange:(filter:FilterType)=>void
}
export type FilterType={
    term:string
    friend:null|boolean
}
const UsersSearchForm:React.FC<UsersSearchFormType> = (props)=> {
    const submit = (values:FilterType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
        props.onFilterChange(values)
        setSubmitting(false)
    }
    return(
        <div>
            <Formik 
                initialValues={{
                    term:'',
                    friend:null
                }}
                onSubmit={submit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Field  type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type='submit' disabled={isSubmitting}> Find</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default UsersSearchForm