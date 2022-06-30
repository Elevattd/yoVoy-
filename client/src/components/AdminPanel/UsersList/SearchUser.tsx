import styleUserList from './user-list.module.css';
type FormElement = React.FormEvent<HTMLFormElement>;
type Input = React.ChangeEvent<HTMLInputElement>

const SearchUser = ({email, setEmail, searchUserQuery}: any) => {

    const onSubmit = async (e: FormElement) => {
        e.preventDefault();
        searchUserQuery(e, email)

    };
    function onInputChange(e: Input) {
        setEmail(e.target.value)
    }

    const handleClear = (e: any) => {
      setEmail('')
      searchUserQuery(e, '')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                    <input className="searchBar-bg-input1"  type="text" onChange={onInputChange} value={email} placeholder="Buscar por email..." />
                    <input className="searchBar-bg-input2" type="submit" value="🔍" />
            </form>
            <button className={styleUserList.buttom_style} onClick={handleClear}>Clear</button>
        </div>
    )
}

export default SearchUser;