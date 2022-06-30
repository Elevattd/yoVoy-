import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../hooks/usePagination/usePagination';
import { AppDispatch, State } from '../../redux/store/store';
import Events from '../Events/Events';
import FilterEvent from '../FilterEvents/FilterEvents';
import Loading from '../Loading/Loading';
import PageButtons from '../PageButtons/PageButtons';
import SearchBar from '../SearchBar/SearchBar';



import home from './home.module.css';

const Home = () => {
  const { events }: any = useSelector((state: State) => state.global.allEvents);
  const pagination = usePagination(30, 'events');
  const content = !events 
  ? <Loading /> 
  : (
    <div >

      <div className={home.searchbar}>
        <SearchBar searchEventQuery={pagination.searchEventQuery} />
      </div>
      <div>
        <FilterEvent filters={pagination.filters} setFilters={pagination.setFilters} refresh={pagination.refresh} />
        <div className={home.line}></div>
      </div>
      <div className={home.home}>
        {events?.length > 0 ? events[0] !== "no hay eventos" ? (
          <>
            <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
            <Events events={events} />
          </>
        ) : (events[1] === "byFilter" ? <h1 className={home.text_alert}>No hay eventos con estas caracteristicas</h1> :
          <h1 className={home.text_alert}>0 resultados de busqueda</h1>) : (
          <h1 className={home.text_alert}>Cargando...</h1>
        )}
      </div>
    </div>
  );

	return content
};

export default Home;
