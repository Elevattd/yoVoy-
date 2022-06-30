import styleFilter from './filter-user.module.css';

const FilterUser = ({userOrder, setUserOrder} : any) => {

   const onChange = async (e: any) => {
    setUserOrder(e.target.value)
   } 
  return (
    <div>
        <select onChange={(e)=> onChange(e)} className={styleFilter.select_filters}>
            <option value="" className={styleFilter.select_filter}>Ordenar usuario</option>
            <option value="AZ" className={styleFilter.select_filter}>Ascendente</option>
            <option value="ZA" className={styleFilter.select_filter}>Descendente</option>
        </select>
    </div>
  )
}

export default FilterUser