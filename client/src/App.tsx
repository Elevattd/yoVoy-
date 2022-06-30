import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event'; // ->Usarlo dentro de EventsLocation
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth.ts/RequireAuth';
import { Welcome } from './components/Welcome/Welcome';
import UsersList from './components/AdminPanel/UsersList/UsersList';
import { useGetUserAuthQuery } from './slices/authentication/authApiSlice';
import CreateCategory from './components/AdminPanel/CreateCategory/CreateCategory';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';
import Unauthorized from './components/Unauthorized/Unauthorized';
import ROLES_LIST from './slices/authentication/rolesList';
import CreateEvent from './components/CreateEvent/CreateEvent';
import LoadingAuth from './components/LoadingAuth/LoadingAuth';
import Favorites from './components/Favorites/Favorites';
import Updateuser from './components/AdminPanel/UpdateUser/UpdateUser';
import EventsConfig from './components/AdminPanel/EventsConfig/EventsConfig';
import CreateOrganization from './components/CreateOrganization/CreateOrganization';
import OrganizationList from './components/AdminPanel/OrganizationList/OrganizationList';
import UpdateOrganization from './components/AdminPanel/UpdateOrganization/updateOrganization';
import UserPurchaseDetail from './components/UserPurchaseDetail/UserPurchaseDetail';
import DetailPayment from './components/AdminPanel/DetailPayment/DetailPayment';
import UpdateRol from './components/AdminPanel/UpdateRol/UpdateRol';
import OrganizationEvents from './components/OrganizationEvents/OrganizationEvents';
import EventLocations from './components/EventLocations/EventLocations';
import DetailProessPayment from './components/AdminPanel/DetailPayment/DetailProcessPayment';
import UserData from './components/UserData/UserData';
import UnbanUser from './components/AdminPanel/UnbanUser/UnbanUser';
import ChangePassword from './components/ChangePassword/ChangePassword';
import CategoriesList from './components/AdminPanel/CategoriesList/CategoriesList';
import UpdateCategory from './components/AdminPanel/UpdateCategories/UpdateCategories';
import LocationsList from './components/AdminPanel/LocationsList/LocationsList';
import UpdateLocation from './components/AdminPanel/UpdateLocations/UpdateLocation';
import ProvincesList from './components/AdminPanel/ProvincesList/ProvincesList';
import CreateLocation from './components/AdminPanel/CreateLocation/CreateLocation';
import RequestsList from './components/AdminPanel/RequestsList/RequestsList';
import UpdateRequests from './components/AdminPanel/UpdateRequests/UpdateRequests';
import StartCheckout from './components/Checkout/CheckoutProcess/StartCheckout';
import DeliveryCheckout from './components/Checkout/CheckoutProcess/DeliveryCheckout';
import PaymentCheckout from './components/Checkout/CheckoutProcess/PaymentCheckout';
import OrganizationEventSales from './components/OrganizationEventSales/OrganizationEventSales';
import MyRequests from './components/MyRequests/MyRequests';
import FinishCheckout from './components/Checkout/CheckoutProcess/FinishCheckout';

function App(): JSX.Element {
	useGetUserAuthQuery();

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="events/:id/:location" element={<Event />} />
				<Route path="events/:id" element={<EventLocations />} />
				<Route path="unauthorized" element={<Unauthorized />} />
				<Route path="loading-auth" element={<LoadingAuth />} />

				{/* protected routes */}

				<Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]} />}>
					<Route path="welcome" element={<Welcome />} />
					<Route path="favorites" element={<Favorites />} />
					<Route path="create-Organization" element={<CreateOrganization />} />
					<Route path="purchase-detail" element={<UserPurchaseDetail />} />
					<Route path="user/information" element={<UserData />} />
					<Route path="change-password" element={<ChangePassword />} />
					<Route path="my-requests" element={<MyRequests />} />
				</Route>

				<Route
					element={<RequireAuth allowedRoles={[ROLES_LIST.Organization]} />}
				>
					<Route path="update-event/:eventId" element={<UpdateEvent />} />
					<Route path="create-event" element={<CreateEvent />} />
					<Route path="organization-events" element={<OrganizationEvents />} />
					<Route
						path="organization-events-sales/:id"
						element={<OrganizationEventSales />}
					/>
				</Route>
				{/* 404 */}
				<Route path="*" element={<Home />} />
			</Route>
			<Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]} />}>
				<Route path="checkout" element={<StartCheckout />} />
				<Route path="/checkout/delivery" element={<DeliveryCheckout />} />
				<Route path="/checkout/payment" element={<PaymentCheckout />} />
				<Route path="/checkout/:resolve" element={<FinishCheckout />} />
			</Route>
			<Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}>
				<Route path="userslist" element={<UsersList />} />
				<Route path="create-category" element={<CreateCategory />} />
				<Route path="update-user/:id" element={<Updateuser />} />
				<Route path="events-config" element={<EventsConfig />} />
				<Route path="organization-list" element={<OrganizationList />} />
				<Route
					path="update-organization/:id"
					element={<UpdateOrganization />}
				/>
				<Route path="detail-payment" element={<DetailPayment />} />
				<Route path="update-rol/:id" element={<UpdateRol />} />
				<Route
					path="detail-process-payment/:id"
					element={<DetailProessPayment />}
				/>
				<Route path="list-categories" element={<CategoriesList />} />
				<Route path="update-category/:id" element={<UpdateCategory />} />
				<Route path="list-locations" element={<LocationsList />} />
				<Route path="create-location" element={<CreateLocation />} />
				<Route path="update-location/:id" element={<UpdateLocation />} />
				<Route path="list-provinces" element={<ProvincesList />} />
				<Route path="unban-user" element={<UnbanUser />} />
				<Route path="list-requests" element={<RequestsList />} />
				<Route path="update-request/:id" element={<UpdateRequests />} />
			</Route>
		</Routes>
	);
}

export default App;
