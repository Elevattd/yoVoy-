import { useEffect, useState } from 'react';
import { useGetTicketsQuery } from '../../slices/app/usersApiSlice';
import Loading from '../Loading/Loading';
import Tickets from '../Tickets/Tickets';
import style from "./UserPurchaseDetail.module.css"

const UserPurchaseDetail = () => {
	const [tickets, setTickets] = useState<any>([]);
	let { data, isError, isFetching } = useGetTicketsQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	useEffect(() => {
		if (!isFetching) {
			isError ? setTickets(['No hay Tickets']) : setTickets(data);
		}
	}, [isFetching]);

	const content = isFetching ? (
		<Loading />
	) : (
		<div className={style.container}>
			<div className={style.container_bg}>
				{tickets &&
					tickets?.length > 0 &&
					tickets?.map((ticket: any) => {
						if (ticket == 'No hay Tickets') {
							return (
								<div key="No hay Tickets">
									<h1 style={{ color: 'white', textAlign: "center" }}>No hay Tickets</h1>
								</div>
							);
						} else return <div className={style.container_tickets}><Tickets ticket={ticket} /> </div>;
					})}
			</div>
		</div>
	);
	return <div>{content}</div>;
};

export default UserPurchaseDetail;
