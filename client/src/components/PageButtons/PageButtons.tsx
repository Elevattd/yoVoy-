import { Pagination } from '@mui/material'
import styles from './PageButtons.module.css'

const PageButtons = ({pageButtonHandler, limit, page} : any) => {

  return (
    <div className={styles.container}>
      {/* {pageButtons} */}
      <div className={styles.buttons_container}>
        <Pagination page={page+1} count={limit} showFirstButton showLastButton color='primary' size='large' onChange={pageButtonHandler}/>
      </div>
    </div>
  )
}

export default PageButtons